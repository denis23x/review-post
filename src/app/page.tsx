import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Proof } from '@/components/landing/Proof';
import { Pricing } from '@/components/landing/Pricing';
import { Faq } from '@/components/landing/Faq';
import { Cta } from '@/components/landing/Cta';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Proof />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
