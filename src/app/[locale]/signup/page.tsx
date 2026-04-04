import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Sparkles, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import WaitlistForm from '@/components/signup/WaitlistForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.signup' });

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/signup`,
      languages: { en: '/en/signup', ru: '/ru/signup' },
    },
  };
}

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'signup' });
  const features = [t('feature0'), t('feature1'), t('feature2'), t('feature3'), t('feature4')];

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <aside
        aria-label={t('brandingAside')}
        className="hidden flex-1 flex-col items-center justify-center gap-8 bg-[#F7F8FA] px-10 py-12 lg:flex"
      >
        <div className="flex items-center gap-2">
          <MapPin size={16} className="h-8 w-8 fill-[#4A9FD8] text-[#F7F8FA]" />
          <span className="text-[22px] font-bold text-[#1a1a1a]">Review to Post</span>
        </div>

        <p className="max-w-[400px] text-center text-[20px] leading-relaxed font-medium text-[#1a1a1a]">
          {t('comingTitle')}
          <br />
          {t('comingSub')}
        </p>

        <ul className="flex w-[340px] flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Sparkles size={16} className="text-[#ffd700]" />
              <span className="text-[14px] text-[#1a1a1a]">{feature}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-12">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A9FD8]">
            <Star size={16} fill="currentColor" className="text-[#F6A700]" />
          </div>
          <span className="text-[15px] font-bold text-[#1a1a1a]">Review to Post</span>
        </Link>

        <div className="w-full max-w-[400px]">
          <h1 className="text-[28px] font-bold text-[#1a1a1a]">{t('heading')}</h1>
          <p className="mt-2 text-sm text-[#666666]">{t('subheading')}</p>

          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </main>
    </div>
  );
}
