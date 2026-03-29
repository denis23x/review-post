import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <aside className="hidden w-[576px] shrink-0 flex-col items-center justify-center gap-8 bg-[#F7F8FA] px-10 py-12 lg:flex">
        <div className="flex items-center gap-2">
          <Star size={28} fill="currentColor" className="text-[#F6A700]" />
          <span className="text-[22px] font-bold text-[#1a1a1a]">ReviewPost</span>
        </div>

        <p className="max-w-[400px] text-center text-[20px] leading-relaxed font-medium text-[#666666]">
          Your reviews deserve to be seen.
        </p>

        <div className="w-[340px] rounded-[16px] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <StarRating rating={5} size="md" />
          <p className="mt-4 text-sm leading-relaxed text-[#1a1a1a] italic">
            &ldquo;Outstanding service from start to finish. Couldn&rsquo;t recommend them more
            highly!&rdquo;
          </p>
          <p className="mt-3 text-[13px] text-[#666666]">&mdash; James R.</p>
        </div>
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

        <div className="w-full max-w-[400px]">
          <h1 className="text-[28px] font-bold text-[#1a1a1a]">Welcome back</h1>
          <p className="mt-2 text-sm text-[#666666]">Sign in to your ReviewPost account</p>

          {/* Google SSO */}
          <button
            type="button"
            className="mt-6 flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#F7F8FA] focus:ring-2 focus:ring-[#4A9FD8]/30 focus:outline-none"
          >
            <span className="text-lg font-bold">G</span>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-xs text-[#888888]">or</span>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
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
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[13px] font-medium text-[#1a1a1a]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] text-[#4A9FD8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 w-full rounded-[8px] border border-[#E5E7EB] bg-white px-4 text-sm text-[#1a1a1a] transition-all outline-none placeholder:text-[#888888] focus:border-[#4A9FD8] focus:shadow-[0_0_0_3px_rgba(74,159,216,0.15)]"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit */}
          <Button size="md" className="mt-6 h-11 w-full rounded-[8px]">
            Sign In
          </Button>

          <p className="mt-4 text-center text-[13px] text-[#666666]">
            Don&rsquo;t have an account?{' '}
            <Link href="/signup" className="text-[#4A9FD8] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
