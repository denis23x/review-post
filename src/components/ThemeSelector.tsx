'use client'

import { cn } from '@/lib/cn'
import type { Theme } from '@/lib/validators'

interface ThemeSelectorProps {
  value: Theme
  onChange: (theme: Theme) => void
}

const themes: { value: Theme; label: string; dot: string }[] = [
  { value: 'dark', label: 'Dark', dot: '#1a1a2e' },
  { value: 'light', label: 'Light', dot: '#ffffff' },
  { value: 'brand', label: 'Brand', dot: '#0f172a' },
]

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {themes.map((theme) => (
        <button
          key={theme.value}
          type="button"
          onClick={() => onChange(theme.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium',
            'border transition-all duration-150 outline-none',
            'focus-visible:ring-2 focus-visible:ring-[#4A9FD8]/50',
            value === theme.value
              ? 'bg-[#EDF6FC] border-[#4A9FD8] text-[#4A9FD8]'
              : 'bg-transparent border-[#E5E7EB] text-[#666666] hover:border-[#4A9FD8]/50 hover:text-[#1a1a1a]'
          )}
          aria-pressed={value === theme.value}
        >
          <span
            className="w-3 h-3 rounded-full border border-[#E5E7EB] shrink-0"
            style={{ backgroundColor: theme.dot }}
          />
          {theme.label}
        </button>
      ))}
    </div>
  )
}
