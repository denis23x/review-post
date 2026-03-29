'use client';

import { cn } from '@/lib/cn';

interface CardPreviewProps {
  src: string;
  businessName: string;
  rating: number;
  className?: string;
}

export function CardPreview({ src, businessName, rating, className }: CardPreviewProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[16px] bg-[#F7F8FA]',
        'aspect-square w-full max-w-[400px]',
        className
      )}
    >
      {/* plain <img> is required: next/image does not support blob: URLs */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Generated post card for ${businessName} — ${rating} stars`}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}
