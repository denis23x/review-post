# ReviewPost — Phase 3 Payments Plan

> Stripe subscriptions. Four plans: Free, Solo, Business, Agency.
> Webhooks handle plan activation, cancellation, and renewal.

---

## Plans

| Plan | Price | Post Limit | Locations | Platforms | Watermark |
| --- | --- | --- | --- | --- | --- |
| Free | $0 | 5/mo | 1 | 1 | Yes |
| Solo | $19/mo | 30/mo | 1 | 2 | No |
| Business | $49/mo | Unlimited | 3 | All | No |
| Agency | $149/mo | Unlimited | Unlimited | All + white-label | No |

Break-even: **4 Solo customers** (~$65/mo infra costs).

---

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create Products + Prices in the Stripe Dashboard (or via CLI):

```bash
stripe products create --name="Solo" --description="30 posts/mo, 2 platforms"
stripe prices create --product={product_id} --unit-amount=1900 --currency=usd --recurring[interval]=month

stripe products create --name="Business" --description="Unlimited posts, 3 locations"
stripe prices create --product={product_id} --unit-amount=4900 --currency=usd --recurring[interval]=month

stripe products create --name="Agency" --description="Unlimited locations, white-label"
stripe prices create --product={product_id} --unit-amount=14900 --currency=usd --recurring[interval]=month
```

---

## Environment Variables

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Stripe Price IDs (add after creating prices above)
STRIPE_PRICE_SOLO=price_...
STRIPE_PRICE_BUSINESS=price_...
STRIPE_PRICE_AGENCY=price_...
```

---

## Checkout Flow

```ts
// app/api/stripe/checkout/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { priceId, userId } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId },
  })

  return Response.json({ url: session.url })
}
```

---

## Webhook Handler

```ts
// app/api/stripe/webhook/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

  switch (event.type) {
    case 'checkout.session.completed':
      // Activate plan for user
      break
    case 'customer.subscription.updated':
      // Handle plan upgrade / downgrade
      break
    case 'customer.subscription.deleted':
      // Downgrade user to Free plan
      break
  }

  return Response.json({ received: true })
}
```

Register webhook in Stripe Dashboard → Webhooks:
- URL: `https://reviewpost.io/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## Plan Enforcement

Store the current plan in Supabase. Check plan limits in API routes:

```sql
-- Add to users table (or as a separate subscriptions table)
ALTER TABLE auth.users ADD COLUMN plan TEXT DEFAULT 'free';
ALTER TABLE auth.users ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE auth.users ADD COLUMN stripe_subscription_id TEXT;
```

Or use a separate `subscriptions` table:

```sql
CREATE TABLE subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES auth.users NOT NULL UNIQUE,
  plan                  TEXT DEFAULT 'free' CHECK (plan IN ('free', 'solo', 'business', 'agency')),
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  current_period_end    TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Customer Portal

Allow users to manage their subscription (upgrade, cancel, update payment method):

```ts
// app/api/stripe/portal/route.ts
const session = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
})
return Response.json({ url: session.url })
```

---

## Dependency

```bash
npm install stripe
```

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 Pricing section*
