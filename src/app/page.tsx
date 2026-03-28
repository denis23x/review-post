import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'

const EXAMPLE_CARDS = [
  {
    quote: 'Best coffee in town! The pour-over is incredible and the staff is always so friendly.',
    author: 'Maria S. · Local Guide',
    business: 'Blue Bottle Coffee',
    rating: 5,
    platforms: ['IG', 'FB'],
  },
  {
    quote: 'Absolutely transformed my morning routine. The atmosphere is unmatched anywhere else.',
    author: 'Jake T. · 52 reviews',
    business: 'Verve Coffee Roasters',
    rating: 5,
    featured: true,
    platforms: ['IG', 'LI'],
  },
  {
    quote: "Five stars isn't enough! Every visit has been perfect. The team truly cares.",
    author: 'Linda K. · 20 reviews',
    business: 'Ritual Coffee',
    rating: 5,
    platforms: ['FB', 'LI'],
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Paste your link',
    body: "Drop in your Google Maps business URL. We'll fetch all your latest reviews instantly.",
  },
  {
    step: '2',
    title: 'Pick your style',
    body: 'Choose from dark, light, or branded themes. Customize colors to match your brand identity.',
  },
  {
    step: '3',
    title: 'Download & share',
    body: 'Get a ready-to-post image with AI-written caption. Share to Instagram, Facebook, or LinkedIn.',
  },
]

const STATS = [
  { value: '50K+', label: 'Posts Generated', color: '#4A9FD8' },
  { value: '4.9', label: 'Average Rating', color: '#F6A700' },
  { value: '12M+', label: 'Social Impressions', color: '#32D583' },
]

const TESTIMONIALS = [
  {
    quote:
      'ReviewPost saved us hours every week. Our social engagement increased 3x in the first month.',
    author: 'Alex Chen, Owner, Sunrise Café',
  },
  {
    quote:
      'I used to spend an hour making graphics. Now it takes 30 seconds. Absolute game-changer for our marketing.',
    author: 'Priya Patel, Marketing Dir, FreshBite',
  },
]

const PRICING = [
  {
    name: 'Free',
    amount: '$0',
    desc: 'Perfect for trying it out',
    features: ['✓ 3 posts per month', '✓ 1 theme', '✓ Watermark included'],
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
  },
  {
    name: 'Solo',
    amount: '$19',
    desc: 'For solopreneurs & freelancers',
    features: ['✓ 30 posts per month', '✓ All themes', '✓ No watermark', '✓ AI captions'],
    cta: 'Start Free Trial',
    ctaVariant: 'secondary' as const,
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
    ctaVariant: 'primary' as const,
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
    ctaVariant: 'secondary' as const,
  },
]

const FAQS = [
  {
    q: 'How does ReviewPost work?',
    a: 'Simply paste your Google Maps business URL, choose a design theme, and ReviewPost will automatically generate a branded social media graphic featuring your best review, complete with an AI-written caption.',
  },
  {
    q: 'Can I customize the design to match my brand?',
    a: 'Yes! On Business and Agency plans you can set your own brand colors and logo. All plans include multiple theme options to match your aesthetic.',
  },
  {
    q: 'Which social media platforms are supported?',
    a: 'ReviewPost generates 1080×1080 images optimized for Instagram, Facebook, and LinkedIn. The AI-written caption is ready to copy and post.',
  },
  {
    q: 'Do I need design skills to use ReviewPost?',
    a: 'Not at all. Everything is automated — just paste a URL and download your finished graphic. No design experience required.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. You can cancel anytime from your account settings. No contracts, no cancellation fees.',
  },
]

const PLATFORM_COLORS: Record<string, string> = {
  IG: '#E1306C',
  FB: '#1877F2',
  LI: '#0A66C2',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-6 py-20 text-center md:px-12 lg:px-[120px] lg:py-20">
        {/* Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#4A9FD833] bg-[#4A9FD815] px-4 py-1.5">
          <div className="h-2 w-2 rounded-full bg-[#4A9FD8]" />
          <span className="text-xs font-medium text-[#4A9FD8]">
            Now with AI-powered captions
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-[900px] text-5xl font-extrabold leading-[1.1] tracking-[-2px] text-[#1a1a1a] md:text-6xl lg:text-[56px]">
          Turn your best Google reviews
          <br />
          into branded social posts.
          <br />
          <span className="text-[#4A9FD8]">Automatically.</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-[640px] text-lg text-[#666666] leading-relaxed">
          Paste a Google Maps link. Pick a style. Get a stunning, share-ready graphic with
          caption &mdash; in seconds.
        </p>

        {/* Input + CTA row */}
        <div className="flex w-full max-w-[540px] flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-12 flex-1 items-center rounded-full border border-[#E5E7EB] bg-white px-5">
            <span className="text-sm text-[#888888] truncate">
              Paste your Google Maps URL...
            </span>
          </div>
          <Link href="/demo">
            <Button size="lg" className="w-full rounded-full sm:w-auto whitespace-nowrap">
              Generate Post &rarr;
            </Button>
          </Link>
        </div>

        {/* Example cards row */}
        <div
          id="examples"
          className="flex w-full max-w-[1100px] gap-6 overflow-x-auto pb-2 pt-4 lg:grid lg:grid-cols-3"
        >
          {EXAMPLE_CARDS.map((card, i) => (
            <div
              key={i}
              className="flex min-w-[280px] flex-col gap-4 rounded-[16px] bg-[#F7F8FA] p-6 lg:min-w-0"
              style={{
                border: card.featured ? '1px solid #4A9FD8' : '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <StarRating rating={card.rating} size="sm" />
              <p className="text-sm italic leading-relaxed text-[#1a1a1a]">
                &ldquo;{card.quote}&rdquo;
              </p>
              <span className="text-xs text-[#666666]">&mdash; {card.author}</span>
              <div className="mt-auto flex items-center gap-1.5">
                {card.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: PLATFORM_COLORS[p] }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="flex flex-col items-center gap-12 px-6 py-20 md:px-12 lg:px-[120px]"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">How It Works</h2>
          <p className="mt-3 text-base text-[#666666]">
            Three simple steps to turn reviews into social gold
          </p>
        </div>

        <div className="grid w-full max-w-[1100px] gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div
              key={step}
              className="flex flex-col gap-4 rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-[#4A9FD8]"
              >
                <span className="text-base font-bold text-[#1a1a1a]">{step}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#666666]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="flex flex-col items-center gap-12 bg-[#F7F8FA] px-6 py-20 md:px-12 lg:px-[120px]">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            Trusted by 2,000+ businesses
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Join local businesses turning their best reviews into social media content
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16">
          {STATS.map(({ value, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-mono text-5xl font-extrabold" style={{ color }}>
                {value}
              </span>
              <span className="text-sm text-[#888888]">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid w-full max-w-[1100px] gap-6 md:grid-cols-2">
          {TESTIMONIALS.map(({ quote, author }) => (
            <div
              key={author}
              className="flex flex-col gap-4 rounded-[16px] border border-[#E5E7EB] bg-white p-6"
            >
              <p className="text-sm italic leading-relaxed text-[#1a1a1a]">
                &ldquo;{quote}&rdquo;
              </p>
              <span className="text-[13px] text-[#666666]">&mdash; {author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="flex flex-col items-center gap-12 px-6 py-20 md:px-12 lg:px-[120px]"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Start free. Upgrade when you&rsquo;re ready.
          </p>
        </div>

        <div className="grid w-full max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col gap-5 rounded-[16px] bg-[#F7F8FA] p-7 relative"
              style={{
                border: plan.featured ? '2px solid #4A9FD8' : '1px solid #E5E7EB',
              }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#4A9FD8] px-3 py-1 text-[11px] font-bold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <p className="text-lg font-semibold text-[#1a1a1a]">{plan.name}</p>

              <div className="flex items-end gap-1">
                <span className="font-mono text-4xl font-extrabold text-[#1a1a1a]">
                  {plan.amount}
                </span>
                <span className="mb-1 text-sm text-[#888888]">/month</span>
              </div>

              <p className="text-[13px] text-[#666666]">{plan.desc}</p>

              <div className="h-px bg-[#E5E7EB]" />

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-[13px] text-[#666666]">
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/demo" className="mt-auto">
                <Button variant={plan.ctaVariant} size="md" className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="flex flex-col items-center gap-12 px-6 py-20 md:px-12 lg:px-[200px]">
        <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
          Frequently Asked Questions
        </h2>

        <div className="w-full max-w-[720px] divide-y divide-[#E5E7EB]">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-base font-medium text-[#1a1a1a]">{q}</span>
                <span className="shrink-0 text-[#888888] transition-transform group-open:rotate-180">
                  &#8964;
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-6 bg-[#4A9FD8] px-6 py-16 text-center md:px-12 lg:px-[120px]">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Ready to turn reviews into revenue?
        </h2>
        <p className="max-w-[560px] text-base leading-relaxed text-white/80">
          Join 2,000+ businesses already using ReviewPost. Start free &mdash; no credit card required.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="rounded-[12px] bg-white text-[#1a1a1a] hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Get Started Free <ArrowRight size={18} className="ml-1" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-[260px]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4A9FD8]">
                  <span className="text-xs font-bold text-[#F6A700]">★</span>
                </div>
                <span className="text-sm font-bold text-[#1a1a1a]">ReviewPost</span>
              </div>
              <p className="mt-3 text-sm text-[#666666]">
                Turn your Google reviews into social posts. Automatically.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#1a1a1a]">Product</p>
                <Link href="/demo" className="text-[#666666] hover:text-[#1a1a1a]">Demo</Link>
                <Link href="#pricing" className="text-[#666666] hover:text-[#1a1a1a]">Pricing</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#1a1a1a]">Account</p>
                <Link href="/login" className="text-[#666666] hover:text-[#1a1a1a]">Log in</Link>
                <Link href="/signup" className="text-[#666666] hover:text-[#1a1a1a]">Sign up</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#1a1a1a]">Legal</p>
                <a href="#" className="text-[#666666] hover:text-[#1a1a1a]">Terms</a>
                <a href="#" className="text-[#666666] hover:text-[#1a1a1a]">Privacy</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-xs text-[#888888]">
            &copy; 2026 ReviewPost. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
