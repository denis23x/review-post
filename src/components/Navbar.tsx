import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-[#1a1a1a] hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A9FD8]">
            <Star size={16} fill="currentColor" className="text-[#F6A700]" />
          </div>
          <span className="text-[15px] font-bold tracking-tight">ReviewPost</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#how-it-works"
            className="text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors"
          >
            Product
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">
              Sign up free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
