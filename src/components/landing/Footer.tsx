import { MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-[#E5E7EB] bg-white px-6 pt-12 pb-8 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-[260px]">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="h-8 w-8 fill-[#4A9FD8] text-white" />
              <span className="text-sm font-bold text-[#1a1a1a]">Review to Post</span>
            </div>
            <p className="mt-3 text-sm text-[#666666]">{t('tagline')}</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">{t('product')}</p>
              <Link href="/demo" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                {t('demo')}
              </Link>
              <Link
                href="/#pricing"
                className="text-[#666666] transition-colors hover:text-[#1a1a1a]"
              >
                {t('pricing')}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">{t('company')}</p>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                {t('about')}
              </a>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                {t('contact')}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">{t('legal')}</p>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                {t('terms')}
              </a>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                {t('privacy')}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-xs text-[#888888]">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
