'use client';

import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { StepIndicator } from '@/components/demo/StepIndicator';
import { DemoStepInput } from '@/components/demo/DemoStepInput';
import { DemoStepLoading } from '@/components/demo/DemoStepLoading';
import { DemoStepResult } from '@/components/demo/DemoStepResult';
import { useDemoStore } from '@/store/demoStore';

export default function DemoPage() {
  const step = useDemoStore((s) => s.step);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto flex max-w-[1040px] flex-col items-center gap-12 px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            Try Review to Post &mdash; Free
          </h1>
          <p className="mt-3 text-base text-[#666666]">
            See how your reviews look as branded social posts. No sign-up required.
          </p>
        </div>

        <StepIndicator />

        <Suspense>{step === 'input' && <DemoStepInput />}</Suspense>
        {step === 'loading' && <DemoStepLoading />}
        {step === 'result' && <DemoStepResult />}
      </main>
    </div>
  );
}
