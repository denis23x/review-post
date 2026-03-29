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

export function Proof() {
  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[120px]">
      <div className="text-center">
        <h2 className="font-geist text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">
          Trusted by 2,000+ businesses
        </h2>
        <p className="mt-3 text-base text-[#666666]">
          Join local businesses turning their best reviews into social media content
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-16">
        {STATS.map(({ value, label, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className="font-geist-mono text-[40px] font-extrabold leading-none tracking-tight"
              style={{ color }}
            >
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
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <p className="text-sm italic leading-relaxed text-[#1a1a1a]">
              &ldquo;{quote}&rdquo;
            </p>
            <span className="text-[13px] text-[#666666]">&mdash; {author}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
