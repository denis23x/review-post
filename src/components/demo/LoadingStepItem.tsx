import { CheckCircle, Loader2, Circle } from 'lucide-react';

interface LoadingStepItemProps {
  state: 'pending' | 'active' | 'done';
  label: string;
}

export function LoadingStepItem({ state, label }: LoadingStepItemProps) {
  return (
    <div className="flex items-center gap-2.5">
      {state === 'done' && <CheckCircle size={18} className="shrink-0 text-[#32D583]" />}
      {state === 'active' && <Loader2 size={18} className="shrink-0 animate-spin text-[#4A9FD8]" />}
      {state === 'pending' && <Circle size={18} className="shrink-0 text-[#E5E7EB]" />}
      <span
        className={
          state === 'active' || state === 'done'
            ? 'text-sm text-[#1a1a1a]'
            : 'text-sm text-[#888888]'
        }
      >
        {label}
      </span>
    </div>
  );
}
