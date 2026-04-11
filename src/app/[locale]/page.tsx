import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Proof } from '@/components/landing/Proof';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { Cta } from '@/components/landing/Cta';
import { Footer } from '@/components/landing/Footer';
import { Analytics } from '@vercel/analytics/next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: { absolute: t('title') },
    alternates: { canonical: `/${locale}` },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'landing.faq' });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('q1'), acceptedAnswer: { '@type': 'Answer', text: t('a1') } },
      { '@type': 'Question', name: t('q2'), acceptedAnswer: { '@type': 'Answer', text: t('a2') } },
      { '@type': 'Question', name: t('q3'), acceptedAnswer: { '@type': 'Answer', text: t('a3') } },
      { '@type': 'Question', name: t('q4'), acceptedAnswer: { '@type': 'Answer', text: t('a4') } },
      { '@type': 'Question', name: t('q5'), acceptedAnswer: { '@type': 'Answer', text: t('a5') } },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Proof />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
