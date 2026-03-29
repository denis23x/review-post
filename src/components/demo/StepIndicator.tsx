'use client';

import { CheckCircle } from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';

const STEPS = [
  { id: 'input', label: 'Paste URL' },
  { id: 'loading', label: 'Generating' },
  { id: 'result', label: 'Your Post' },
];

export function StepIndicator() {
  const step = useDemoStore((s) => s.step);
  const activeIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <div
            className="text-md flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all"
            style={{
              background: i <= activeIndex ? '#4A9FD8' : '#F7F8FA',
              color: i <= activeIndex ? '#ffffff' : '#888888',
            }}
          >
            {i < activeIndex ? <CheckCircle size={16} /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="h-0.5 w-20 rounded transition-all"
              style={{ background: i < activeIndex ? '#4A9FD8' : '#E5E7EB' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
