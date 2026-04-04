'use client';

import { Suspense, useEffect } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { StepIndicator } from '@/components/demo/StepIndicator';
import { DemoStepInput } from '@/components/demo/DemoStepInput';
import { DemoStepLoading } from '@/components/demo/DemoStepLoading';
import { DemoStepResult } from '@/components/demo/DemoStepResult';

export function DemoPageContent() {
  const step = useDemoStore((s) => s.step);
  const handleReset = useDemoStore((s) => s.handleReset);

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <>
      <StepIndicator />

      <Suspense>{step === 'input' && <DemoStepInput />}</Suspense>
      {step === 'loading' && <DemoStepLoading />}
      <Suspense>{step === 'result' && <DemoStepResult />}</Suspense>
    </>
  );
}
