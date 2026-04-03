import { create } from 'zustand';
import type { Theme } from '@/lib/validators';

const USAGE_COOKIE = 'rp_weekly_usage';
export const USAGE_LIMIT = 300;

export function getWeeklyUsageCount(): number {
  if (typeof document === 'undefined') return 0;
  const match = document.cookie.match(new RegExp(`(?:^|; )${USAGE_COOKIE}=([^;]*)`));
  return match ? parseInt(match[1], 10) || 0 : 0;
}

function incrementWeeklyUsageCount(): void {
  const count = getWeeklyUsageCount() + 1;
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${USAGE_COOKIE}=${count}; expires=${expires}; path=/; SameSite=Lax`;
}

export type Step = 'input' | 'loading' | 'result';

export interface LoadingStepState {
  reviews: 'pending' | 'active' | 'done';
  score: 'pending' | 'active' | 'done';
  card: 'pending' | 'active' | 'done';
}

export interface ResultData {
  blobUrl: string;
  businessName: string;
  rating: number;
  caption: string;
  hashtags: string[];
  reviewText: string;
  authorName: string;
}

interface DemoState {
  step: Step;
  theme: Theme;
  error: string | null;
  isRegenerating: boolean;
  isRegeneratingCaption: boolean;
  loadingSteps: LoadingStepState;
  results: ResultData[];
  activeCardIndex: number;
  copied: boolean;
}

interface DemoActions {
  setTheme: (theme: Theme) => void;
  setActiveCardIndex: (index: number) => void;
  handleGenerate: (url: string) => Promise<void>;
  handleRegenerate: () => Promise<void>;
  handleRegenerateCaption: () => Promise<void>;
  handleCopy: () => Promise<void>;
  handleReset: () => void;
}

const INITIAL_LOADING_STEPS: LoadingStepState = {
  reviews: 'pending',
  score: 'pending',
  card: 'pending',
};

export const useDemoStore = create<DemoState & DemoActions>((set, get) => ({
  step: 'input',
  theme: 'light',
  error: null,
  isRegenerating: false,
  isRegeneratingCaption: false,
  loadingSteps: INITIAL_LOADING_STEPS,
  results: [],
  activeCardIndex: 0,
  copied: false,

  setTheme: (theme) => set({ theme }),

  setActiveCardIndex: (index) => set({ activeCardIndex: index, copied: false }),

  handleGenerate: async (url) => {
    if (getWeeklyUsageCount() >= USAGE_LIMIT) {
      set({ error: 'Only 3 reviews per week are available during the MVP stage.' });
      return;
    }

    incrementWeeklyUsageCount();

    set({
      error: null,
      step: 'loading',
      loadingSteps: { reviews: 'active', score: 'pending', card: 'pending' },
    });

    try {
      const reviewsRes = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!reviewsRes.ok) {
        const data = await reviewsRes.json().catch(() => ({}));
        throw new Error(data.error ?? 'Could not find this business. Try a different URL.');
      }
      const reviewsData = await reviewsRes.json();

      if (!reviewsData.reviews?.length) {
        throw new Error('This business has no reviews yet. Try a different URL.');
      }

      set({ loadingSteps: { reviews: 'done', score: 'active', card: 'pending' } });

      const scoreRes = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: reviewsData.reviews }),
      });
      if (!scoreRes.ok) {
        const data = await scoreRes.json().catch(() => ({}));
        throw new Error(data.error ?? 'AI scoring failed. Try again.');
      }
      const scoreData = await scoreRes.json();
      if (scoreData.error) {
        throw new Error(scoreData.error);
      }

      set({ loadingSteps: { reviews: 'done', score: 'done', card: 'active' } });

      const { theme } = get();
      const results = await Promise.all(
        (
          scoreData.scoredReviews as Array<{
            selectedReview: { text: string; rating: number; authorName: string };
            caption: string;
            hashtags: string[];
            authorName: string;
          }>
        ).map(async (scored) => {
          const cardRes = await fetch('/api/generate-card', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quote: scored.selectedReview.text,
              businessName: reviewsData.name,
              rating: scored.selectedReview.rating,
              authorName: scored.authorName,
              theme,
            }),
          });
          if (!cardRes.ok) throw new Error('Card generation failed. Try again.');
          const blob = await cardRes.blob();
          return {
            blobUrl: URL.createObjectURL(blob),
            businessName: reviewsData.name,
            rating: scored.selectedReview.rating,
            caption: scored.caption,
            hashtags: scored.hashtags,
            reviewText: scored.selectedReview.text,
            authorName: scored.authorName,
          };
        })
      );

      set({
        loadingSteps: { reviews: 'done', score: 'done', card: 'done' },
        results,
        activeCardIndex: 0,
      });

      setTimeout(() => set({ step: 'result' }), 400);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      set({ error: msg, step: 'input', loadingSteps: INITIAL_LOADING_STEPS });
    }
  },

  handleRegenerate: async () => {
    const { results, isRegenerating, theme } = get();
    if (!results.length || isRegenerating) return;
    set({ isRegenerating: true, error: null });

    try {
      const newResults = await Promise.all(
        results.map(async (result) => {
          const cardRes = await fetch('/api/generate-card', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quote: result.reviewText,
              businessName: result.businessName,
              rating: result.rating,
              authorName: result.authorName,
              theme,
            }),
          });
          if (!cardRes.ok) throw new Error('Card generation failed. Try again.');
          const blob = await cardRes.blob();
          const newBlobUrl = URL.createObjectURL(blob);
          URL.revokeObjectURL(result.blobUrl);
          return { ...result, blobUrl: newBlobUrl };
        })
      );
      set({ results: newResults });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      set({ error: msg });
    } finally {
      set({ isRegenerating: false });
    }
  },

  handleRegenerateCaption: async () => {
    const { results, activeCardIndex, isRegeneratingCaption } = get();
    const result = results[activeCardIndex];
    if (!result || isRegeneratingCaption) return;
    set({ isRegeneratingCaption: true, error: null });

    try {
      const res = await fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText: result.reviewText }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Caption regeneration failed. Try again.');
      }
      const data = await res.json();
      const updatedResults = results.map((r, i) =>
        i === activeCardIndex ? { ...r, caption: data.caption, hashtags: data.hashtags } : r
      );
      set({ results: updatedResults });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      set({ error: msg });
    } finally {
      set({ isRegeneratingCaption: false });
    }
  },

  handleCopy: async () => {
    const { results, activeCardIndex } = get();
    const result = results[activeCardIndex];
    if (!result?.caption) return;
    try {
      await navigator.clipboard.writeText(result.caption);
      set({ copied: true });
      setTimeout(() => set({ copied: false }), 2000);
    } catch {
      // clipboard API not available (e.g. non-HTTPS)
    }
  },

  handleReset: () => {
    const { results } = get();
    results.forEach((r) => URL.revokeObjectURL(r.blobUrl));
    set({
      step: 'input',
      results: [],
      activeCardIndex: 0,
      error: null,
      loadingSteps: INITIAL_LOADING_STEPS,
    });
  },
}));
