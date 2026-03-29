const STATS = [
  { value: '50K+', label: 'Posts Generated', color: '#4A9FD8' },
  { value: '4.9', label: 'Average Rating', color: '#FFD700' },
  { value: '12M+', label: 'Social Impressions', color: '#32D583' },
];

const PILL_ROWS = [
  ['Link → post in 30 seconds', 'Publish real reviews', 'See the before & after'],
  ['Your clients already wrote your posts', '30 seconds', 'No designer, no copywriter'],
  ['Content without a budget', 'Free content'],
];

export function Proof() {
  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[120px]">
      <div className="text-center">
        <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">
          Trusted by 2,000+ businesses
        </h2>
        <p className="mt-4 text-center text-base text-[#666666]">
          Join local businesses turning their best reviews into social media content
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-16">
        {STATS.map(({ value, label, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className="font-geist-mono text-[40px] leading-none font-extrabold tracking-tight"
              style={{ color }}
            >
              {value}
            </span>
            <span className="text-sm text-[#666666]">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[1100px] flex-col items-center gap-3">
        {PILL_ROWS.map((pills, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap items-center justify-center gap-3">
            {pills.map((text, i) => (
              <span
                key={text}
                className="rounded-full bg-[#4A9FD8] px-5 py-2 text-sm text-white"
                style={
                  {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  } as React.CSSProperties
                }
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
