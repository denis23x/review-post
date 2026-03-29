'use client'

import { useState, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, CheckCircle, Loader2, Circle, Copy, Check, RefreshCw, ArrowLeft, Star } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ThemeSelector } from '@/components/ThemeSelector'
import { CardPreview } from '@/components/CardPreview'
import { DownloadButton } from '@/components/DownloadButton'
import { StarRating } from '@/components/ui/StarRating'
import { googleMapsUrlSchema } from '@/lib/validators'
import type { Theme } from '@/lib/validators'

type Step = 'input' | 'loading' | 'result'

interface LoadingStepState {
  reviews: 'pending' | 'active' | 'done'
  score: 'pending' | 'active' | 'done'
  card: 'pending' | 'active' | 'done'
}

interface ResultData {
  blobUrl: string
  businessName: string
  rating: number
  caption: string
  reviewText: string
}

const LOADING_STEPS: { key: keyof LoadingStepState; label: string }[] = [
  { key: 'reviews', label: 'Fetching business reviews...' },
  { key: 'score', label: 'Selecting best review...' },
  { key: 'card', label: 'Generating branded graphic...' },
]

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const steps = [
    { id: 'input', label: 'Paste URL' },
    { id: 'loading', label: 'Generating' },
    { id: 'result', label: 'Your Post' },
  ]
  const activeIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all"
            style={{
              background: i <= activeIndex ? '#4A9FD8' : '#F7F8FA',
              color: i <= activeIndex ? '#ffffff' : '#888888',
            }}
          >
            {i < activeIndex ? <CheckCircle size={16} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div
              className="h-0.5 w-20 rounded transition-all"
              style={{ background: i < activeIndex ? '#4A9FD8' : '#E5E7EB' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function LoadingStepItem({
  state,
  label,
}: {
  state: 'pending' | 'active' | 'done'
  label: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      {state === 'done' && <CheckCircle size={18} className="text-[#32D583] shrink-0" />}
      {state === 'active' && (
        <Loader2 size={18} className="animate-spin text-[#4A9FD8] shrink-0" />
      )}
      {state === 'pending' && <Circle size={18} className="text-[#E5E7EB] shrink-0" />}
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
  )
}

export default function DemoPage() {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') ?? ''
  const [step, setStep] = useState<Step>('input')
  const [theme, setTheme] = useState<Theme>('dark')
  const [error, setError] = useState<string | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [loadingSteps, setLoadingSteps] = useState<LoadingStepState>({
    reviews: 'pending',
    score: 'pending',
    card: 'pending',
  })
  const [result, setResult] = useState<ResultData | null>(null)
  const [copied, setCopied] = useState(false)

  // ref keeps the latest theme accessible inside stable callbacks
  const themeRef = useRef(theme)
  themeRef.current = theme

  // ── Full generation pipeline ────────────────────────────────────────────────
  const handleGenerate = useCallback(async (url: string) => {
    setError(null)
    setStep('loading')
    setLoadingSteps({ reviews: 'active', score: 'pending', card: 'pending' })

    try {
      // Step 1: fetch reviews
      const reviewsRes = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!reviewsRes.ok) {
        const data = await reviewsRes.json().catch(() => ({}))
        throw new Error(data.error ?? 'Could not find this business. Try a different URL.')
      }
      const reviewsData = await reviewsRes.json()

      if (!reviewsData.reviews?.length) {
        throw new Error('This business has no reviews yet. Try a different URL.')
      }

      setLoadingSteps({ reviews: 'done', score: 'active', card: 'pending' })

      // Step 2: score + caption
      const scoreRes = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: reviewsData.reviews }),
      })
      if (!scoreRes.ok) {
        const data = await scoreRes.json().catch(() => ({}))
        throw new Error(data.error ?? 'AI scoring failed. Try again.')
      }
      const scoreData = await scoreRes.json()
      if (scoreData.error) {
        throw new Error(scoreData.error)
      }

      setLoadingSteps({ reviews: 'done', score: 'done', card: 'active' })

      // Step 3: generate card (use ref to always read the current theme)
      const cardRes = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: scoreData.selectedReview.text,
          businessName: reviewsData.name,
          rating: scoreData.selectedReview.rating,
          theme: themeRef.current,
        }),
      })
      if (!cardRes.ok) {
        throw new Error('Card generation failed. Try again.')
      }
      const blob = await cardRes.blob()
      const blobUrl = URL.createObjectURL(blob)

      setLoadingSteps({ reviews: 'done', score: 'done', card: 'done' })
      setResult({
        blobUrl,
        businessName: reviewsData.name,
        rating: scoreData.selectedReview.rating,
        caption: scoreData.caption,
        reviewText: scoreData.selectedReview.text,
      })

      setTimeout(() => setStep('result'), 400)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setError(msg)
      setStep('input')
      setLoadingSteps({ reviews: 'pending', score: 'pending', card: 'pending' })
    }
  }, [])

  // ── Re-generate card only (theme change) ────────────────────────────────────
  const handleRegenerate = useCallback(async () => {
    if (!result || isRegenerating) return
    setIsRegenerating(true)
    setError(null)

    try {
      const cardRes = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: result.reviewText,
          businessName: result.businessName,
          rating: result.rating,
          theme: themeRef.current,
        }),
      })
      if (!cardRes.ok) throw new Error('Card generation failed. Try again.')

      const blob = await cardRes.blob()
      const newBlobUrl = URL.createObjectURL(blob)

      // revoke the previous blob URL to free memory
      URL.revokeObjectURL(result.blobUrl)
      setResult((prev) => (prev ? { ...prev, blobUrl: newBlobUrl } : prev))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setError(msg)
    } finally {
      setIsRegenerating(false)
    }
  }, [result, isRegenerating])

  const handleCopy = useCallback(async () => {
    if (!result?.caption) return
    try {
      await navigator.clipboard.writeText(result.caption)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API not available (e.g. non-HTTPS)
    }
  }, [result?.caption])

  const handleReset = useCallback(() => {
    if (result?.blobUrl) URL.revokeObjectURL(result.blobUrl)
    setStep('input')
    setResult(null)
    setError(null)
    setLoadingSteps({ reviews: 'pending', score: 'pending', card: 'pending' })
    form.reset()
  }, [result]) // eslint-disable-line react-hooks/exhaustive-deps

  const form = useForm({
    defaultValues: { url: initialUrl },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await handleGenerate(value.url)
    },
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto flex max-w-[800px] flex-col items-center gap-12 px-6 py-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">
            Try ReviewPost &mdash; Free
          </h1>
          <p className="mt-3 text-base text-[#666666]">
            See how your reviews look as branded social posts. No sign-up required.
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={step} />

        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              Step 1: Paste your Google Maps URL
            </h2>

            <form
              className="mt-6 flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field
                name="url"
                validators={{ onChange: googleMapsUrlSchema }}
              >
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#1a1a1a]" htmlFor="url-input">
                      Business URL
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-[#888888] pointer-events-none">
                        <MapPin size={18} />
                      </span>
                      <input
                        id="url-input"
                        type="url"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="https://maps.google.com/..."
                        className="h-11 w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm
                          text-[#1a1a1a] placeholder:text-[#888888] outline-none
                          focus:border-[#4A9FD8] focus:shadow-[0_0_0_3px_rgba(74,159,216,0.15)] transition-all"
                        autoComplete="off"
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-[#ef4444]">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#1a1a1a]">Choose a theme</p>
                <ThemeSelector value={theme} onChange={setTheme} />
              </div>

              {error && (
                <div className="rounded-[8px] border-l-4 border-[#ef4444] bg-[#fef2f2] p-3 text-sm text-[#ef4444]">
                  {error}
                </div>
              )}

              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button
                    type="submit"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Fetching reviews..."
                    className="w-full"
                  >
                    Generate Post &rarr;
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </div>
        )}

        {/* Step 2: Loading */}
        {step === 'loading' && (
          <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
            <div className="flex items-center gap-3">
              <Spinner size="md" className="text-[#4A9FD8]" />
              <h2 className="text-xl font-semibold text-[#1a1a1a]">
                Step 2: Generating your post...
              </h2>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {LOADING_STEPS.map(({ key, label }) => (
                <LoadingStepItem key={key} state={loadingSteps[key]} label={label} />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && result && (
          <div className="w-full flex flex-col gap-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 self-start text-sm text-[#666666] hover:text-[#1a1a1a] transition-colors"
            >
              <ArrowLeft size={16} />
              Try another URL
            </button>

            <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
              <h2 className="mb-6 text-xl font-semibold text-[#1a1a1a]">
                Step 3: Your post is ready!
              </h2>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
                {/* Card preview column */}
                <div className="flex flex-col gap-4 lg:w-[400px] shrink-0">
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

                {/* Right column */}
                <div className="flex flex-1 flex-col gap-5">
                  {/* Caption */}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#1a1a1a]">AI-Generated Caption</p>
                    <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-4">
                      <p className="text-sm text-[#1a1a1a] leading-relaxed">
                        {result.caption}
                      </p>
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

                  {/* Theme re-picker */}
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-[#1a1a1a]">Change theme</p>
                    <ThemeSelector value={theme} onChange={setTheme} />
                  </div>

                  {error && (
                    <div className="rounded-[8px] border-l-4 border-[#ef4444] bg-[#fef2f2] p-3 text-sm text-[#ef4444]">
                      {error}
                    </div>
                  )}

                  {/* Action buttons */}
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

                  {/* Upsell */}
                  <div className="flex items-center justify-between gap-3 rounded-[16px] bg-white border border-[#E5E7EB] p-5">
                    <p className="text-[15px] font-medium text-[#1a1a1a]">
                      Want unlimited posts?
                    </p>
                    <a href="/signup" className="text-sm font-medium text-[#4A9FD8] whitespace-nowrap">
                      Sign up free &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
