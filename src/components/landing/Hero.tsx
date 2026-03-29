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
    <section className="flex flex-col items-center gap-8 bg-white px-6 py-20 text-center md:px-12 lg:px-[120px]">
      <div className="flex items-center gap-1.5 rounded-full border border-[#4A9FD833] bg-[#4A9FD815] px-4 py-1.5">
        <div className="h-2 w-2 rounded-full bg-[#4A9FD8]" />
        <span className="text-xs font-medium text-[#4A9FD8]">Now with AI-powered captions</span>
      </div>

      <h1 className="font-geist mx-auto max-w-[900px] text-[56px] font-extrabold leading-[1.1] tracking-[-2px] text-[#1a1a1a]">
        Turn your Google reviews
        <br />
        into branded social posts.
      </h1>

      <p className="mx-auto max-w-[640px] text-lg leading-relaxed text-[#666666]">
        Paste a Google Maps link. Pick a style. Get a stunning, share-ready graphic with
        caption &mdash; in seconds.
      </p>

      <div
        className="flex items-center gap-3 rounded-full bg-[#4A9FD8] p-1.5"
        style={{ boxShadow: '0 4px 16px rgba(74,159,216,0.20)' }}
      >
        <div className="flex h-11 w-[300px] items-center rounded-full bg-white px-5 sm:w-[420px]">
          <span className="truncate text-sm text-[#1a1a1a]/40">
            Paste your Google Maps URL...
          </span>
        </div>
        <Link
          href="/demo"
          className="flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-[#1a1a1a] whitespace-nowrap transition-opacity hover:opacity-80"
        >
          Generate Post &rarr;
        </Link>
      </div>

      <div
        id="examples"
        className="flex w-full max-w-[1100px] gap-6 overflow-x-auto pb-2 pt-4 lg:grid lg:grid-cols-3"
      >
        {EXAMPLE_CARDS.map((card, i) => (
          <div
            key={i}
            className="flex min-w-[280px] flex-col gap-4 rounded-[16px] p-6 lg:min-w-0"
            style={{
              background: card.featured ? '#F0F7FC' : '#FFFFFF',
              border: card.featured ? '1.5px solid #4A9FD8' : '1px solid #E5E7EB',
              boxShadow: card.featured
                ? '0 2px 8px rgba(74,159,216,0.10)'
                : '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <StarRating rating={card.rating} size="sm" />
            <p className="text-sm font-medium leading-relaxed text-[#1a1a1a]">
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
  )
}
