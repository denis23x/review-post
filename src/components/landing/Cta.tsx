import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Cta() {
  const t = await getTranslations('landing.cta');

  return (
    <section className="flex flex-col items-center gap-12 bg-[#4A9FD8] px-6 py-16 text-center md:px-12 lg:px-[120px]">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-[32px] font-bold tracking-tight text-white">{t('headline')}</h2>
        <p className="max-w-[560px] text-base leading-normal text-white">{t('body')}</p>
      </div>
      <Link
        href="/demo"
        className="flex h-12 items-center gap-1.5 rounded-full bg-white px-4 text-[15px] font-medium text-[#1a1a1a] transition-opacity hover:opacity-90"
      >
        {t('button')} <ArrowRight size={16} />
      </Link>
    </section>
  );
}
