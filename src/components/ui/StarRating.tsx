import { cn } from '@/lib/cn'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
}

export function StarRating({ rating, maxStars = 5, size = 'md', className }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <span
      className={cn('inline-flex items-center gap-0.5 text-[#ffd700]', sizeMap[size], className)}
      aria-label={`${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }).map((_, i) => {
        if (i < fullStars) return <span key={i}>★</span>
        if (i === fullStars && hasHalf) return <span key={i} className="opacity-60">★</span>
        return <span key={i} className="opacity-25">★</span>
      })}
    </span>
  )
}
