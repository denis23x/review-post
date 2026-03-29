import Link from 'next/link';
import { Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <aside className="hidden w-[576px] shrink-0 flex-col items-center justify-center gap-8 bg-[#F7F8FA] px-10 py-12 lg:flex">
        <div className="flex items-center gap-2">
          <Star size={28} fill="currentColor" className="text-[#F6A700]" />
          <span className="text-[22px] font-bold text-[#1a1a1a]">ReviewPost</span>
        </div>

        <p className="max-w-[400px] text-center text-[20px] leading-relaxed font-medium text-[#666666]">
          Secure your account in seconds.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-12">
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A9FD8]">
            <Star size={16} fill="currentColor" className="text-[#F6A700]" />
          </div>
          <span className="text-[15px] font-bold text-[#1a1a1a]">ReviewPost</span>
        </Link>

        <div className="flex w-full max-w-[400px] flex-col items-center gap-6">
          {/* Lock icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#EDF6FC]">
            <Lock size={24} className="text-[#4A9FD8]" />
          </div>

          <div className="text-center">
            <h1 className="text-[28px] font-bold text-[#1a1a1a]">Reset your password</h1>
            <p className="mt-2 text-sm text-[#666666]">
              Enter your email and we&rsquo;ll send you a reset link
            </p>
          </div>

          {/* Email field */}
          <div className="flex w-full flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] font-medium text-[#1a1a1a]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11 w-full rounded-[8px] border border-[#E5E7EB] bg-white px-4 text-sm text-[#1a1a1a] transition-all outline-none placeholder:text-[#888888] focus:border-[#4A9FD8] focus:shadow-[0_0_0_3px_rgba(74,159,216,0.15)]"
              autoComplete="email"
            />
          </div>

          {/* Submit */}
          <Button size="md" className="h-11 w-full rounded-[8px]">
            Send Reset Link
          </Button>

          <Link href="/login" className="text-[13px] text-[#4A9FD8] hover:underline">
            &larr; Back to sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
