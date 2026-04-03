'use client';

import { LoadingStepItem } from '@/components/demo/LoadingStepItem';
import { useDemoStore, getWeeklyUsageCount, USAGE_LIMIT } from '@/store/demoStore';
import { Shield } from 'lucide-react';

const LOADING_STEPS: { key: 'reviews' | 'score' | 'card'; label: string }[] = [
  { key: 'reviews', label: 'Fetching business reviews...' },
  { key: 'score', label: 'Selecting best review...' },
  { key: 'card', label: 'Generating branded graphic...' },
];

export function DemoStepLoading() {
  const loadingSteps = useDemoStore((s) => s.loadingSteps);
  const usageCount = getWeeklyUsageCount();
  const remaining = USAGE_LIMIT - usageCount;

  return (
    <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Step 2: Generating your post</h2>
      </div>
      <p className="mt-4 text-xs text-[#666666]">
        {remaining} of {USAGE_LIMIT} free reviews remaining today
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {LOADING_STEPS.map(({ key, label }) => (
          <LoadingStepItem key={key} state={loadingSteps[key]} label={label} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-[32px] border border-[#E5E7EB] bg-[#FFFFFF] p-3">
        <Shield size={16} className="shrink-0 text-[#000000]" />
        <p className="text-sm text-[#000000]">
          This service relies on xAI infrastructure, which may have regional availability
          restrictions. Verify that your location is supported.
        </p>
      </div>
    </div>
  );
}
