import Link from 'next/link'
import { Wand2 } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-6 md:px-10">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#4A9FD8]">
            <Wand2 size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-[#1A1A1A]">Review to Post</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#how-it-works" className="text-sm text-[#666666] transition-colors hover:text-[#1A1A1A]">
            Product
          </Link>
          <Link href="/#pricing" className="text-sm text-[#666666] transition-colors hover:text-[#1A1A1A]">
            Pricing
          </Link>
        </nav>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden h-10 items-center rounded-full border border-[#E5E7EB] px-4 font-geist text-sm font-medium text-[#1A1A1A] transition-opacity hover:opacity-80 md:flex"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="flex h-10 items-center rounded-full bg-[#4A9FD8] px-4 font-geist text-sm font-medium text-white transition-opacity hover:opacity-80"
        >
          Try Free →
        </Link>
      </div>
    </header>
  )
}
