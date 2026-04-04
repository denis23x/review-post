import { Link2, Palette, Download } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function HowItWorks() {
  const t = await getTranslations('landing.howItWorks');

  const HOW_IT_WORKS = [
    { step: 1, Icon: Link2, title: t('step1Title'), body: t('step1Body') },
    { step: 2, Icon: Palette, title: t('step2Title'), body: t('step2Body') },
    { step: 3, Icon: Download, title: t('step3Title'), body: t('step3Body') },
  ];

  return (
    <section
      id="how-it-works"
      className="flex scroll-mt-16 flex-col items-center gap-12 bg-[#F7F8FA] px-6 py-20 md:px-12 lg:px-[120px]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">{t('title')}</h2>
          <p className="mt-4 text-base text-[#666666]">{t('subtitle')}</p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, Icon, title, body }) => (
              <div
                key={step}
                className="flex max-w-[368px] flex-col items-center gap-2 text-center"
              >
                <Icon size={28} className="text-[#4A9FD8]" />
                <h3 className="text-xl font-semibold text-[#1a1a1a]">{title}</h3>
                <p className="text-sm leading-normal text-[#666666]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
