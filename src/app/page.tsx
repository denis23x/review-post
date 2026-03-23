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
  },
  {
    quote: 'Absolutely transformed my morning routine. The atmosphere is unmatched anywhere else.',
    author: 'Jake T. · 52 reviews',
    business: 'Verve Coffee Roasters',
    rating: 5,
    featured: true,
  },
  {
    quote: "Five stars isn't enough! Every visit has been perfect. The team truly cares.",
    author: 'Linda K. · 20 reviews',
    business: 'Ritual Coffee',
    rating: 5,
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Paste your link',
    body: 'Drop any Google Maps business URL. We pull your latest reviews automatically.',
  },
  {
    step: '2',
    title: 'AI picks the best',
    body: 'Our AI scores all reviews for specificity, emotion, and story. Selects the winner.',
  },
  {
    step: '3',
    title: 'Download & post',
    body: 'Get a 1080×1080 PNG card + caption ready to publish on Instagram or Facebook.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center gap-8 px-6 py-20 text-center md:px-12 lg:px-20 lg:py-24">
        {/* Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#4f46e5]/30 bg-[#1e1b4b] px-4 py-1.5">
          <div className="h-2 w-2 rounded-full bg-[#4f46e5]" />
          <span className="text-xs font-medium text-[#818cf8]">
            Now with AI-powered captions
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-[900px] text-5xl font-extrabold leading-[1.1] tracking-[-2px] text-white md:text-6xl lg:text-[56px]">
          Turn your best Google reviews
          <br />
          into branded social posts.
          <br />
          <span className="text-[#818cf8]">Automatically.</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-[640px] text-lg text-[#94a3b8] leading-relaxed">
          Paste a Google Maps link. Pick a style. Get a stunning, share-ready graphic with
          caption &mdash; in seconds.
        </p>

        {/* Input + CTA row */}
        <div className="flex w-full max-w-[540px] flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-12 flex-1 items-center rounded-full border border-[#2a2a4a] bg-[#0d0d1a] px-5">
            <span className="text-sm text-[#4a5568] truncate">
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
              className="flex min-w-[280px] flex-col gap-4 rounded-[16px] bg-[#16161a] p-6 lg:min-w-0"
              style={{
                border: card.featured
                  ? '1px solid #4f46e5'
                  : '1px solid #2a2a2e',
                boxShadow: card.featured
                  ? '0 12px 32px rgba(99,102,241,0.27)'
                  : '0 8px 24px rgba(99,102,241,0.2)',
              }}
            >
              <StarRating rating={card.rating} size="sm" />
              <p className="text-sm italic leading-relaxed text-[#fafaf9]">
                &ldquo;{card.quote}&rdquo;
              </p>
              <span className="text-xs text-[#6b6b70]">&mdash; {card.author}</span>
              <div className="mt-auto flex items-center gap-2">
                <span className="rounded-full bg-[#e1306c] px-2 py-0.5 text-[10px] font-bold text-white">
                  IG
                </span>
                <span className="rounded-full bg-[#1877f2] px-2 py-0.5 text-[10px] font-bold text-white">
                  FB
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="flex flex-col items-center gap-12 bg-[#1a1a2e] px-6 py-20 md:px-12 lg:px-20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">How It Works</h2>
          <p className="mt-3 text-base text-[#94a3b8]">
            Three simple steps to turn reviews into social gold
          </p>
        </div>

        <div className="grid w-full max-w-[1100px] gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div
              key={step}
              className="flex flex-col gap-4 rounded-[16px] border border-[#2a2a2e] bg-[#16161a] p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4f46e5]">
                <span className="text-base font-bold text-white">{step}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-[#94a3b8]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="flex flex-col items-center gap-12 px-6 py-20 md:px-12 lg:px-20"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-lg text-[#94a3b8]">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid w-full max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Free */}
          <div className="flex flex-col gap-4 rounded-[16px] border border-[#2a2a2e] bg-[#16161a] p-7">
            <div>
              <p className="text-xl font-semibold text-white">Free</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="mb-1 text-sm text-[#94a3b8]">/month</span>
              </div>
              <p className="mt-1 text-sm text-[#94a3b8]">Perfect for trying it out</p>
            </div>
            <div className="h-px bg-[#2a2a2e]" />
            <ul className="flex flex-col gap-2 text-[13px]">
              <li className="text-white">&#10003; 3 posts per month</li>
              <li className="text-white">&#10003; 1 theme (Dark)</li>
              <li className="text-white">&#10003; Watermark included</li>
              <li className="text-[#94a3b8]">&#10007; No AI captions</li>
              <li className="text-[#94a3b8]">&#10007; No custom branding</li>
            </ul>
            <Link href="/demo" className="mt-auto">
              <Button variant="secondary" size="md" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Solo */}
          <div className="flex flex-col gap-4 rounded-[16px] border border-[#2a2a2e] bg-[#16161a] p-7">
            <div>
              <p className="text-xl font-semibold text-white">Solo</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="mb-1 text-sm text-[#94a3b8]">/month</span>
              </div>
              <p className="mt-1 text-sm text-[#94a3b8]">For solo business owners</p>
            </div>
            <div className="h-px bg-[#2a2a2e]" />
            <ul className="flex flex-col gap-2 text-[13px]">
              <li className="text-white">&#10003; 30 posts per month</li>
              <li className="text-white">&#10003; 3 themes</li>
              <li className="text-white">&#10003; No watermark</li>
              <li className="text-white">&#10003; AI captions</li>
              <li className="text-[#94a3b8]">&#10007; No custom branding</li>
            </ul>
            <Link href="/demo" className="mt-auto">
              <Button size="md" className="w-full">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Business — featured */}
          <div
            className="flex flex-col gap-4 rounded-[16px] p-7 relative"
            style={{
              background: '#16161a',
              border: '1px solid #4f46e5',
              boxShadow: '0 0 0 1px #4f46e5, 0 8px 32px rgba(79,70,229,0.3)',
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-[#ffd700] px-3 py-1 text-[11px] font-bold text-[#0d0d1a]">
                Most Popular
              </span>
            </div>
            <div>
              <p className="text-xl font-semibold text-white">Business</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="mb-1 text-sm text-[#94a3b8]">/month</span>
              </div>
              <p className="mt-1 text-sm text-[#94a3b8]">For growing businesses</p>
            </div>
            <div className="h-px bg-[#2a2a4a]" />
            <ul className="flex flex-col gap-2 text-[13px]">
              <li className="text-white">&#10003; Unlimited posts</li>
              <li className="text-white">&#10003; 3 locations</li>
              <li className="text-white">&#10003; All platforms</li>
              <li className="text-white">&#10003; Brand colors + logo</li>
              <li className="text-white">&#10003; Priority support</li>
            </ul>
            <Link href="/demo" className="mt-auto">
              <Button size="md" className="w-full">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Agency */}
          <div className="flex flex-col gap-4 rounded-[16px] border border-[#2a2a2e] bg-[#16161a] p-7">
            <div>
              <p className="text-xl font-semibold text-white">Agency</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-white">$149</span>
                <span className="mb-1 text-sm text-[#94a3b8]">/month</span>
              </div>
              <p className="mt-1 text-sm text-[#94a3b8]">For agencies managing multiple clients</p>
            </div>
            <div className="h-px bg-[#2a2a2e]" />
            <ul className="flex flex-col gap-2 text-[13px]">
              <li className="text-white">&#10003; Unlimited locations</li>
              <li className="text-white">&#10003; White-label</li>
              <li className="text-white">&#10003; Team access (5 seats)</li>
              <li className="text-white">&#10003; Custom domain</li>
              <li className="text-white">&#10003; API access</li>
            </ul>
            <Link href="/demo" className="mt-auto">
              <Button size="md" className="w-full">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-6 bg-[#222240] px-6 py-20 text-center md:px-12">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Ready to turn your reviews into reach?
        </h2>
        <p className="text-lg text-[#94a3b8]">
          Try ReviewPost free &mdash; no credit card required.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/demo">
            <Button size="xl" className="rounded-[12px]">
              Try it free <ArrowRight size={20} className="ml-1" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="lg" className="rounded-[12px]">
              See demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a4a] bg-[#1a1a2e] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-[260px]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4f46e5]">
                  <span className="text-xs font-bold text-[#ffd700]">★</span>
                </div>
                <span className="text-sm font-bold text-white">ReviewPost</span>
              </div>
              <p className="mt-3 text-sm text-[#94a3b8]">
                Turn your Google reviews into social posts. Automatically.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-white">Product</p>
                <Link href="/demo" className="text-[#94a3b8] hover:text-white">Demo</Link>
                <Link href="#pricing" className="text-[#94a3b8] hover:text-white">Pricing</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-white">Legal</p>
                <a href="#" className="text-[#94a3b8] hover:text-white">Terms</a>
                <a href="#" className="text-[#94a3b8] hover:text-white">Privacy</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#2a2a4a] pt-6 text-xs text-[#4a5568]">
            &copy; 2026 ReviewPost. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
