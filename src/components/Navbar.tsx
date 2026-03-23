import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-[#2a2a4a] bg-[#0d0d1a]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f46e5]">
            <Star size={16} fill="currentColor" className="text-[#ffd700]" />
          </div>
          <span className="text-[15px] font-bold tracking-tight">ReviewPost</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#how-it-works"
            className="text-sm text-[#94a3b8] hover:text-white transition-colors"
          >
            Product
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-[#94a3b8] hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Link href="/demo">
            <Button size="sm">
              Try Free &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
