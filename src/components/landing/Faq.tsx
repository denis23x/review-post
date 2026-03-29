const FAQS = [
  {
    q: 'How does Review to Post work?',
    a: 'Simply paste your Google Maps business URL, choose a design theme, and Review to Post will automatically generate a branded social media graphic featuring your best review, complete with an AI-written caption.',
  },
  {
    q: 'Can I customize the design to match my brand?',
    a: 'Yes! On Business and Agency plans you can set your own brand colors and logo. All plans include multiple theme options to match your aesthetic.',
  },
  {
    q: 'Which social media platforms are supported?',
    a: 'Review to Post generates 1080×1080 images optimized for Instagram, Facebook, and LinkedIn. The AI-written caption is ready to copy and post.',
  },
  {
    q: 'Do I need design skills to use Review to Post?',
    a: 'Not at all. Everything is automated — just paste a URL and download your finished graphic. No design experience required.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. You can cancel anytime from your account settings. No contracts, no cancellation fees.',
  },
];

import { ChevronDown, ChevronUp } from 'lucide-react';

export function Faq() {
  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[200px]">
      <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">
        Frequently Asked Questions
      </h2>

      <div className="w-full max-w-[720px]">
        {FAQS.map(({ q, a }, i) => (
          <details
            key={q}
            className="group border-b border-[#E5E7EB]"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] py-4">
              <span className="text-base font-medium text-[#1a1a1a]">{q}</span>
              <ChevronDown
                size={16}
                className="shrink-0 text-[#888888] transition-transform group-open:hidden"
              />
              <ChevronUp size={16} className="hidden shrink-0 text-[#888888] group-open:block" />
            </summary>
            <p className="pb-4 text-sm leading-[1.43] text-[#666666]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
