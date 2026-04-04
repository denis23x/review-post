import { getTranslations } from 'next-intl/server';

export async function Proof() {
  const t = await getTranslations('landing.proof');

  const STATS = [
    { value: '50K+', label: t('postsGenerated'), color: '#4A9FD8' },
    { value: '4.9', label: t('averageRating'), color: '#FFD700' },
    { value: '12M+', label: t('socialImpressions'), color: '#32D583' },
  ];

  const PILL_ROWS = [
    [t('pill1'), t('pill2'), t('pill3')],
    [t('pill4'), t('pill5'), t('pill6')],
    [t('pill7'), t('pill8')],
  ];

  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-20 md:px-12 lg:px-[120px]">
      <div className="text-center">
        <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">{t('title')}</h2>
        <p className="mt-4 text-center text-base text-[#666666]">{t('subtitle')}</p>
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
            {pills.map((text) => (
              <span
                key={text}
                className="rounded-full bg-[#4A9FD8] px-5 py-2 text-sm text-white"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } as React.CSSProperties}
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
