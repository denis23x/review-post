import { ChevronDown, ChevronUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function Faq() {
  const t = await getTranslations('landing.faq');

  const FAQS = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
  ];

  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[200px]">
      <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">{t('title')}</h2>

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
