'use client';

import { useTranslations } from 'next-intl';
import { LoadingStepItem } from '@/components/demo/LoadingStepItem';
import { useDemoStore, getWeeklyUsageCount, USAGE_LIMIT } from '@/store/demoStore';
import { Shield } from 'lucide-react';

export function DemoStepLoading() {
  const t = useTranslations('demo.stepLoading');
  const loadingSteps = useDemoStore((s) => s.loadingSteps);
  const usageCount = getWeeklyUsageCount();
  const remaining = USAGE_LIMIT - usageCount;

  const LOADING_STEPS: { key: 'reviews' | 'score' | 'card'; label: string }[] = [
    { key: 'reviews', label: t('fetchingReviews') },
    { key: 'score', label: t('selectingReview') },
    { key: 'card', label: t('generatingGraphic') },
  ];

  return (
    <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">{t('title')}</h2>
      </div>
      <p className="mt-4 text-xs text-[#666666]">
        {t('remaining', { remaining, limit: USAGE_LIMIT })}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {LOADING_STEPS.map(({ key, label }) => (
          <LoadingStepItem key={key} state={loadingSteps[key]} label={label} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-[32px] border border-[#E5E7EB] bg-[#FFFFFF] p-3">
        <Shield size={16} className="shrink-0 text-[#000000]" />
        <p className="text-sm text-[#000000]">{t('disclaimer')}</p>
      </div>
    </div>
  );
}
