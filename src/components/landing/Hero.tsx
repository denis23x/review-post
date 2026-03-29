import Link from 'next/link'
import { StarRating } from '@/components/ui/StarRating'

const EXAMPLE_CARDS = [
  {
    quote: 'Best coffee in town! The pour-over is incredible and the staff is always so friendly.',
    author: 'Maria S. · Local Guide',
    rating: 5,
    platforms: ['IG', 'FB'],
  },
  {
    quote: 'Absolutely transformed my morning routine. The atmosphere is unmatched anywhere else.',
    author: 'Jake T. · 52 reviews',
    rating: 5,
    featured: true,
    platforms: ['IG', 'LI'],
  },
  {
    quote: "Five stars isn't enough! Every visit has been perfect. The team truly cares.",
    author: 'Linda K. · 20 reviews',
    rating: 5,
    platforms: ['FB', 'LI'],
  },
]

const PLATFORM_COLORS: Record<string, string> = {
  IG: '#E1306C',
  FB: '#1877F2',
  LI: '#0A66C2',
}

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center gap-8 overflow-hidden px-6 py-20 md:px-12 lg:px-[120px]"
      style={{
        background: [
          'radial-gradient(80% 60% at 50% 25%, rgba(74,159,216,0.20) 0%, rgba(74,159,216,0) 100%)',
          'linear-gradient(180deg, #E8F2FB 0%, #F0F6FC 35%, #FAFCFE 70%, #FFFFFF 100%)',
        ].join(', '),
      }}
    >
      {/* Decorative rings — top right */}
      <div className="pointer-events-none absolute" style={{ width: 450, height: 450, right: -130, top: -256, borderRadius: '50%', border: '18px solid #4A9FD8', opacity: 0.04 }} />
      <div className="pointer-events-none absolute" style={{ width: 320, height: 320, right: -65,  top: -191, borderRadius: '50%', border: '16px solid #4A9FD8', opacity: 0.05 }} />
      <div className="pointer-events-none absolute" style={{ width: 200, height: 200, right: -5,   top: -131, borderRadius: '50%', border: '12px solid #4A9FD8', opacity: 0.06 }} />

      {/* Decorative diamonds */}
      <div className="pointer-events-none absolute" style={{ width: 280, height: 280, left: -80, top: -30,  backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.06, transform: 'rotate(45deg)' }} />
      <div className="pointer-events-none absolute" style={{ width: 363, height: 363, right: -4,  top: 759, backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.08, transform: 'rotate(45deg)' }} />
      <div className="pointer-events-none absolute" style={{ width: 180, height: 180, right: 227, top: 493, backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.04, transform: 'rotate(45deg)' }} />

      {/* Badge */}
      <div className="relative flex items-center gap-1.5 rounded-full border border-[#4A9FD833] bg-[#4A9FD815] px-4 py-1.5">
        <div className="h-2 w-2 rounded-full bg-[#4A9FD8]" />
        <span className="text-xs font-medium text-[#4A9FD8]">Now with AI-powered captions</span>
      </div>

      {/* Headline */}
      <h1 className="font-geist relative mx-auto max-w-[900px] text-center text-[56px] font-extrabold leading-[1.1] tracking-[-2px] text-[#1a1a1a]">
        Turn your Google reviews
        <br />
        into branded social posts.
      </h1>

      {/* Subheadline */}
      <p className="relative mx-auto max-w-[640px] text-center text-lg leading-normal text-[#666666]">
        Paste a Google Maps link. Pick a style. Get a stunning, share-ready graphic with
        caption &mdash; in seconds.
      </p>

      {/* Input + CTA */}
      <div
        className="relative flex items-center gap-3 rounded-full bg-[#4A9FD8] p-1.5"
        style={{ boxShadow: '0 4px 16px rgba(74,159,216,0.20)' }}
      >
        <div className="flex h-11 w-[300px] items-center rounded-full bg-white px-5 sm:w-[420px]">
          <span className="truncate text-sm text-[#1a1a1a]/40">
            Paste your Google Maps URL...
          </span>
        </div>
        <Link
          href="/demo"
          className="flex h-11 items-center rounded-full bg-white px-4 text-[15px] font-medium text-[#1a1a1a] whitespace-nowrap transition-opacity hover:opacity-80"
        >
          Generate Post &rarr;
        </Link>
      </div>

      {/* Example review cards — fixed 320 px each, scrollable on mobile */}
      <div className="relative flex gap-6 overflow-x-auto pb-2">
        {EXAMPLE_CARDS.map((card, i) => (
          <div
            key={i}
            className="flex w-[320px] shrink-0 flex-col gap-4 rounded-[16px] p-6"
            style={{
              background: card.featured ? '#F0F7FC' : '#FFFFFF',
              border: card.featured ? '1.5px solid #4A9FD8' : '1px solid #E5E7EB',
              boxShadow: card.featured
                ? '0 2px 8px rgba(74,159,216,0.10)'
                : '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <StarRating rating={card.rating} size="sm" />
            <p className="text-sm font-medium leading-normal text-[#1a1a1a]">
              &ldquo;{card.quote}&rdquo;
            </p>
            <span className="text-xs font-semibold text-[#1a1a1a]">&mdash; {card.author}</span>
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
  )
}
