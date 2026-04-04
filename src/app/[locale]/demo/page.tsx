import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { DemoPageContent } from '@/components/demo/DemoPageContent';

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'demo' });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto flex max-w-[1040px] flex-col items-center gap-12 px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">{t('pageTitle')}</h1>
          <p className="mt-3 text-base text-[#666666]">{t('pageSubtitle')}</p>
        </div>

        <DemoPageContent />
      </main>
    </div>
  );
}
