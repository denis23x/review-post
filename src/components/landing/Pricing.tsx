import Link from 'next/link';

const PRICING = [
  {
    name: 'Free',
    amount: '$0',
    desc: 'Perfect for trying it out',
    features: ['✓ 3 posts per month', '✓ 1 theme', '✓ Watermark included'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Solo',
    amount: '$19',
    desc: 'For solopreneurs & freelancers',
    features: ['✓ 30 posts per month', '✓ All themes', '✓ No watermark', '✓ AI captions'],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    name: 'Business',
    amount: '$49',
    desc: 'For growing businesses',
    features: [
      '✓ Unlimited posts',
      '✓ All themes + custom branding',
      '✓ AI captions',
      '✓ Auto-schedule to social',
      '✓ Priority support',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Agency',
    amount: '$149',
    desc: 'For agencies & multi-location',
    features: [
      '✓ Everything in Business',
      '✓ 10 business locations',
      '✓ Team collaboration',
      '✓ White-label exports',
      '✓ API access',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="flex scroll-mt-16 flex-col items-center gap-12 bg-[#F7F8FA] px-6 py-20 md:px-12 lg:px-[120px]"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">
          Simple, transparent pricing
        </h2>
        <p className="text-base text-[#666666]">Start free. Upgrade when you&rsquo;re ready.</p>
      </div>

      <div className="grid w-full max-w-[1100px] items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PRICING.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col gap-5 rounded-[16px] bg-white p-7"
            style={{
              border: plan.featured ? '2px solid #4A9FD8' : '1px solid #E5E7EB',
              boxShadow: plan.featured ? '0 1px 3px rgba(0,0,0,0.04)' : undefined,
            }}
          >
            {plan.featured && (
              <span className="self-start rounded bg-[#4A9FD8] px-2 py-1 text-[12px] leading-[1.4] font-semibold text-[#F7F8FA]">
                Most Popular
              </span>
            )}

            <p className="text-[18px] font-semibold text-[#1a1a1a]">{plan.name}</p>

            <div className="flex items-center gap-0.5">
              <span className="font-geist-mono text-[30px] font-extrabold text-[#1a1a1a]">
                {plan.amount}
              </span>
              <span className="text-base font-medium text-[#666666]">/month</span>
            </div>

            <p className="text-[13px] text-[#666666]">{plan.desc}</p>

            <div className="h-px bg-[#E5E7EB]" />

            {plan.features.map((f) => (
              <span key={f} className="text-[13px] text-[#666666]">
                {f}
              </span>
            ))}

            <Link
              href={'/demo'}
              className="mt-auto flex h-11 items-center justify-center rounded-full text-[14px] font-medium transition-opacity hover:opacity-80"
              style={
                plan.featured
                  ? { background: '#4A9FD8', color: '#fff' }
                  : {
                      background: '#fff',
                      color: '#1a1a1a',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 1px 1.75px rgba(0,0,0,0.08)',
                    }
              }
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
