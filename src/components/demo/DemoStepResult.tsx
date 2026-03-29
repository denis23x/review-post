'use client';

import { ArrowLeft, Copy, Check, RefreshCw, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { CardPreview } from '@/components/CardPreview';
import { DownloadButton } from '@/components/DownloadButton';
import { StarRating } from '@/components/ui/StarRating';
import { useDemoStore } from '@/store/demoStore';

export function DemoStepResult() {
  const {
    result,
    theme,
    error,
    isRegenerating,
    copied,
    setTheme,
    handleRegenerate,
    handleCopy,
    handleReset,
  } = useDemoStore();

  if (!result) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 self-start text-sm text-[#666666] transition-colors hover:text-[#1a1a1a]"
      >
        <ArrowLeft size={16} />
        Try another URL
      </button>

      <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
        <h2 className="mb-6 text-xl font-semibold text-[#1a1a1a]">Step 3: Your post is ready!</h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex shrink-0 flex-col gap-4 lg:w-[400px]">
            <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-2">
              <CardPreview
                src={result.blobUrl}
                businessName={result.businessName}
                rating={result.rating}
                className="max-w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-[#F6A700]" fill="currentColor" />
                <p className="text-sm font-semibold text-[#1a1a1a]">{result.businessName}</p>
              </div>
              <StarRating rating={result.rating} size="sm" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#1a1a1a]">AI-Generated Caption</p>
              <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-4">
                <p className="text-sm leading-relaxed text-[#1a1a1a]">{result.caption}</p>
                <button
                  onClick={handleCopy}
                  className="mt-3 flex items-center gap-1.5 text-sm transition-colors"
                  style={{ color: copied ? '#32D583' : '#4A9FD8' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Caption'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-[#1a1a1a]">Change theme</p>
              <ThemeSelector value={theme} onChange={setTheme} />
            </div>

            {error && (
              <div className="rounded-[8px] border-l-4 border-[#ef4444] bg-[#fef2f2] p-3 text-sm text-[#ef4444]">
                {error}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <DownloadButton blobUrl={result.blobUrl} />
              <Button
                variant="secondary"
                size="md"
                onClick={handleRegenerate}
                loading={isRegenerating}
                loadingText="Regenerating..."
                className="gap-1.5"
              >
                <RefreshCw size={15} />
                Change Theme
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[16px] border border-[#E5E7EB] bg-white p-5">
              <p className="text-[15px] font-medium text-[#1a1a1a]">Want unlimited posts?</p>
              <a href="/signup" className="text-sm font-medium whitespace-nowrap text-[#4A9FD8]">
                Sign up free &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
