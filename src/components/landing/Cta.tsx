import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section className="flex flex-col items-center gap-12 bg-[#4A9FD8] px-6 py-16 text-center md:px-12 lg:px-[120px]">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-geist text-[32px] font-bold tracking-tight text-white">
          Ready to turn reviews into revenue?
        </h2>
        <p className="max-w-[560px] text-base leading-relaxed text-white/80">
          Join 2,000+ businesses already using ReviewPost. Start free &mdash; no credit card
          required.
        </p>
      </div>
      <Link
        href="/signup"
        className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-[#1a1a1a] transition-opacity hover:opacity-90"
      >
        Get Started Free <ArrowRight size={16} />
      </Link>
    </section>
  )
}
