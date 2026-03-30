import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Proof } from '@/components/landing/Proof';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { Cta } from '@/components/landing/Cta';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Review to Post — Turn Google Reviews into Social Posts',
  },
  alternates: { canonical: '/' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Review to Post work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply paste your Google Maps business URL, choose a design theme, and Review to Post will automatically generate a branded social media graphic featuring your best review, complete with an AI-written caption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the design to match my brand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! On Business and Agency plans you can set your own brand colors and logo. All plans include multiple theme options to match your aesthetic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which social media platforms are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Review to Post generates 1080×1080 images optimized for Instagram, Facebook, and LinkedIn. The AI-written caption is ready to copy and post.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need design skills to use Review to Post?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all. Everything is automated — just paste a URL and download your finished graphic. No design experience required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel my subscription anytime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can cancel anytime from your account settings. No contracts, no cancellation fees.',
      },
    },
  ],
};

export default function LandingPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
