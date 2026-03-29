'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, iconLeft, iconRight, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[13px] leading-snug font-medium text-[#1a1a1a]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <span className="pointer-events-none absolute left-3 text-[#888888]">{iconLeft}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full rounded-[8px] border bg-white text-[#1a1a1a] placeholder:text-[#888888]',
              'px-4 py-3 text-sm font-normal transition-all duration-150 outline-none',
              'focus:border-[#4A9FD8] focus:shadow-[0_0_0_3px_rgba(74,159,216,0.15)]',
              error ? 'border-[#ef4444]' : 'border-[#E5E7EB]',
              'disabled:cursor-not-allowed disabled:bg-[#F7F8FA] disabled:text-[#888888]',
              iconLeft && 'pl-11',
              iconRight && 'pr-11',
              className
            )}
            {...props}
          />
          {iconRight && <span className="absolute right-3 text-[#888888]">{iconRight}</span>}
        </div>
        {error && <p className="text-[12px] leading-snug text-[#ef4444]">{error}</p>}
        {helperText && !error && (
          <p className="text-[12px] leading-snug text-[#888888]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
