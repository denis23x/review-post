'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import type { Theme } from '@/lib/validators';

interface ThemeSelectorProps {
  value: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const t = useTranslations('themes');

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: t('light') },
    { value: 'dark', label: t('dark') },
    { value: 'brand', label: t('brand') },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {themes.map((theme) => (
        <button
          key={theme.value}
          type="button"
          onClick={() => onChange(theme.value)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium',
            'overflow-hidden border transition-all duration-150 outline-none',
            'focus-visible:ring-2 focus-visible:ring-[#4A9FD8]/50',
            value === theme.value
              ? 'border-[#4A9FD8] bg-[#EDF6FC] text-[#4A9FD8]'
              : 'border-[#E5E7EB] bg-transparent text-[#666666] hover:border-[#4A9FD8]/50 hover:text-[#1a1a1a]'
          )}
          aria-pressed={value === theme.value}
        >
          <span
            className={cn(
              'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
              value === theme.value ? 'border-[#4A9FD8] bg-[#4A9FD8]' : 'border-[#4A9FD8] bg-white'
            )}
          >
            {value === theme.value && <span className="h-1 w-1 rounded-full bg-white" />}
          </span>
          <span className="truncate">{theme.label}</span>
        </button>
      ))}
    </div>
  );
}
