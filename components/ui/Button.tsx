'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline-indigo'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingText?: string
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#4f46e5] text-white hover:bg-[#4338ca] focus-visible:ring-2 focus-visible:ring-[#4f46e5]/50',
  secondary:
    'bg-[#1a1a2e] text-white border border-[#2a2a4a] hover:bg-[#222240] focus-visible:ring-2 focus-visible:ring-[#2a2a4a]',
  ghost:
    'bg-transparent text-[#94a3b8] hover:text-white hover:bg-[#222240] focus-visible:ring-2 focus-visible:ring-[#2a2a4a]',
  destructive:
    'bg-[#ef4444] text-white hover:bg-[#dc2626] focus-visible:ring-2 focus-visible:ring-[#ef4444]/50',
  'outline-indigo':
    'bg-transparent text-[#4f46e5] border border-[#4f46e5] hover:bg-[#4f46e5]/10 focus-visible:ring-2 focus-visible:ring-[#4f46e5]/50',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-[13px] font-semibold gap-1.5',
  md: 'h-10 px-4 text-sm font-semibold gap-2',
  lg: 'h-12 px-6 text-base font-semibold gap-2',
  xl: 'h-14 px-8 text-lg font-bold gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center rounded-[8px] transition-all duration-150',
          'outline-none focus-visible:outline-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'active:scale-[0.97]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {loading && loadingText ? loadingText : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
