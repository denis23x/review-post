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

export function Faq() {
  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[200px]">
      <h2 className="font-geist text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">
        Frequently Asked Questions
      </h2>

      <div className="w-full max-w-[720px] divide-y divide-[#E5E7EB]">
        {FAQS.map(({ q, a }, i) => (
          <details key={q} className="group py-4" {...(i === 0 ? { open: true } : {})}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1">
              <span className="text-base font-medium text-[#1a1a1a]">{q}</span>
              <span className="shrink-0 text-[#888888] transition-transform group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm leading-[1.43] text-[#666666]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
