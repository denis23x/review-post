'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'

interface CardPreviewProps {
  src: string
  businessName: string
  rating: number
  className?: string
}

export function CardPreview({ src, businessName, rating, className }: CardPreviewProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[16px] bg-[#12122a]',
        'aspect-square w-full max-w-[400px]',
        className
      )}
    >
      <Image
        src={src}
        alt={`Generated post card for ${businessName} — ${rating} stars`}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  )
}
