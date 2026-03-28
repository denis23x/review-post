'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, iconLeft, iconRight, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] text-[#1a1a1a] font-medium leading-snug"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <span className="absolute left-3 text-[#888888] pointer-events-none">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-11 rounded-[8px] bg-white border text-[#1a1a1a] placeholder:text-[#888888]',
              'text-sm font-normal px-4 py-3 outline-none transition-all duration-150',
              'focus:border-[#4A9FD8] focus:shadow-[0_0_0_3px_rgba(74,159,216,0.15)]',
              error
                ? 'border-[#ef4444]'
                : 'border-[#E5E7EB]',
              'disabled:bg-[#F7F8FA] disabled:text-[#888888] disabled:cursor-not-allowed',
              iconLeft && 'pl-11',
              iconRight && 'pr-11',
              className
            )}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 text-[#888888]">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p className="text-[12px] text-[#ef4444] leading-snug">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-[12px] text-[#888888] leading-snug">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
