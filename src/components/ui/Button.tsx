'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { Spinner } from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#4A9FD8] text-white hover:bg-[#3b8ec4] focus-visible:ring-2 focus-visible:ring-[#4A9FD8]/50',
  secondary:
    'bg-[#F7F8FA] text-[#1a1a1a] border border-[#E5E7EB] hover:bg-[#eef0f3] focus-visible:ring-2 focus-visible:ring-[#E5E7EB]',
  ghost:
    'bg-transparent text-[#666666] hover:text-[#1a1a1a] hover:bg-[#F7F8FA] focus-visible:ring-2 focus-visible:ring-[#E5E7EB]',
  destructive:
    'bg-[#ef4444] text-white hover:bg-[#dc2626] focus-visible:ring-2 focus-visible:ring-[#ef4444]/50',
  outline:
    'bg-transparent text-[#4A9FD8] border border-[#4A9FD8] hover:bg-[#4A9FD8]/10 focus-visible:ring-2 focus-visible:ring-[#4A9FD8]/50',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-[13px] font-semibold gap-1.5',
  md: 'h-10 px-4 text-sm font-semibold gap-2',
  lg: 'h-12 px-6 text-base font-semibold gap-2',
  xl: 'h-14 px-8 text-lg font-bold gap-2.5',
};

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
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-150',
          'outline-none focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-40',
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
    );
  }
);

Button.displayName = 'Button';
