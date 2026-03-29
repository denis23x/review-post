import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Navbar() {
  return (
    <header 
      className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white/50 backdrop-blur-sm backdrop-filter px-6 md:px-10"
    >
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center ">
              <MapPin size={16} className="text-white fill-[#4A9FD8] h-8 w-8" />
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
      </div>
    </header>
  )
}
