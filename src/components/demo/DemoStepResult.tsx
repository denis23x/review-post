'use client';

import { ArrowLeft, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { CardPreview } from '@/components/CardPreview';
import { DownloadButton } from '@/components/DownloadButton';
import { useDemoStore } from '@/store/demoStore';
import { cn } from '@/lib/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function DemoStepResult() {
  const {
    results,
    activeCardIndex,
    theme,
    error,
    isRegenerating,
    copied,
    setTheme,
    setActiveCardIndex,
    handleRegenerate,
    handleCopy,
    handleReset,
  } = useDemoStore();

  const result = results[activeCardIndex];

  if (!results.length || !result) return null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') ?? '';

  useEffect(() => {
    if (initialUrl) {
      router.replace(pathname, { scroll: false });
    }
  }, []);

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
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-1 rounded-[16px] border border-[#E5E7EB]">
              <CardPreview
                src={result.blobUrl}
                businessName={result.businessName}
                rating={result.rating}
                className="max-w-full"
              />
            </div>
            {results.length > 1 && (
              <div className="flex items-center justify-center gap-3">
                {results.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCardIndex(i)}
                    className={cn(
                      'h-3 w-3 rounded-full transition-colors',
                      i === activeCardIndex ? 'bg-[#1a1a1a]' : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm font-semibold text-[#1a1a1a]">AI-Generated Caption</p>
              <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white p-4">
                <p className="font-regular text-sm leading-relaxed text-[#1a1a1a]">
                  {result.caption}
                </p>
                <p className="font-regular text-sm leading-relaxed text-[#4A9FD8]">
                  {result.hashtags.map((hashtag) => `#${hashtag}`).join(' ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className={cn(
                    'flex h-10 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#4A9FD8] px-4 text-sm font-medium text-white transition-opacity hover:opacity-80'
                  )}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Caption'}
                </button>
                <Button
                  variant="secondary"
                  size="md"
                  // onClick={handleRegenerateCaption}
                  // loading={isRegeneratingCaption}
                  loadingText="Regenerating..."
                  className="gap-1.5"
                >
                  <RefreshCw size={15} />
                  Change Caption
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
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
              <div className="flex items-center justify-between gap-3 rounded-[16px] border border-[#E5E7EB] bg-white px-5 py-3">
                <p className="text-[15px] font-medium text-[#1a1a1a]">Want unlimited posts?</p>
                <a href="/signup" className="text-sm font-medium whitespace-nowrap text-[#4A9FD8]">
                  Sign up free &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
