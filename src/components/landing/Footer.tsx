import { MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white px-6 pt-12 pb-8 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-[260px]">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="h-8 w-8 fill-[#4A9FD8] text-white" />
              <span className="text-sm font-bold text-[#1a1a1a]">Review to Post</span>
            </div>
            <p className="mt-3 text-sm text-[#666666]">
              Turn your Google reviews into social posts. Automatically.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">Product</p>
              <Link href="/demo" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                Demo
              </Link>
              <Link
                href="#pricing"
                className="text-[#666666] transition-colors hover:text-[#1a1a1a]"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">Company</p>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                About
              </a>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#1a1a1a]">Legal</p>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                Terms
              </a>
              <a href="#" className="text-[#666666] transition-colors hover:text-[#1a1a1a]">
                Privacy
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-xs text-[#888888]">
          &copy; 2026 Review to Post. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
