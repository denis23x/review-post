import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Sparkles, Star } from 'lucide-react';
import WaitlistForm from '@/components/signup/WaitlistForm';

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description:
    'Join the Review to Post early access waitlist. Be first in line when we launch and use the product for free during development.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/signup' },
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <aside
        aria-label="Review to Post branding"
        className="hidden flex-1 flex-col items-center justify-center gap-8 bg-[#F7F8FA] px-10 py-12 lg:flex"
      >
        <div className="flex items-center gap-2">
          <MapPin size={16} className="h-8 w-8 fill-[#4A9FD8] text-[#F7F8FA]" />
          <span className="text-[22px] font-bold text-[#1a1a1a]">Review to Post</span>
        </div>

        <p className="max-w-[400px] text-center text-[20px] leading-relaxed font-medium text-[#1a1a1a]">
          We&rsquo;re building something great
          <br /> Here&rsquo;s what&rsquo;s coming
        </p>

        <ul className="flex w-[340px] flex-col gap-3">
          {[
            'AI-powered review scoring',
            'Multiple themes and detailed customization',
            'Bulk export for teams and agencies',
            'Scheduled posting to social platforms',
            'Multi-location business support',
          ].map((feature) => (
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
          <h1 className="text-[28px] font-bold text-[#1a1a1a]">Join the waitlist</h1>
          <p className="mt-2 text-sm text-[#666666]">
            Be among the first to get access. Whitelist members get free use of the product while
            it&rsquo;s in development.
          </p>

          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </main>
    </div>
  );
}
