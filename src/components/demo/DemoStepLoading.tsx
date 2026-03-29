'use client';

import { LoadingStepItem } from '@/components/demo/LoadingStepItem';
import { useDemoStore } from '@/store/demoStore';

const LOADING_STEPS: { key: 'reviews' | 'score' | 'card'; label: string }[] = [
  { key: 'reviews', label: 'Fetching business reviews...' },
  { key: 'score', label: 'Selecting best review...' },
  { key: 'card', label: 'Generating branded graphic...' },
];

export function DemoStepLoading() {
  const loadingSteps = useDemoStore((s) => s.loadingSteps);

  return (
    <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Step 2: Generating your post</h2>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {LOADING_STEPS.map(({ key, label }) => (
          <LoadingStepItem key={key} state={loadingSteps[key]} label={label} />
        ))}
      </div>
    </div>
  );
}
