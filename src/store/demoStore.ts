import { create } from 'zustand';
import type { Theme } from '@/lib/validators';

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
}

interface DemoState {
  step: Step;
  theme: Theme;
  error: string | null;
  isRegenerating: boolean;
  loadingSteps: LoadingStepState;
  result: ResultData | null;
  copied: boolean;
}

interface DemoActions {
  setTheme: (theme: Theme) => void;
  handleGenerate: (url: string) => Promise<void>;
  handleRegenerate: () => Promise<void>;
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
  loadingSteps: INITIAL_LOADING_STEPS,
  result: null,
  copied: false,

  setTheme: (theme) => set({ theme }),

  handleGenerate: async (url) => {
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
      const cardRes = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: scoreData.selectedReview.text,
          businessName: reviewsData.name,
          rating: scoreData.selectedReview.rating,
          theme,
        }),
      });
      if (!cardRes.ok) {
        throw new Error('Card generation failed. Try again.');
      }
      const blob = await cardRes.blob();
      const blobUrl = URL.createObjectURL(blob);

      set({
        loadingSteps: { reviews: 'done', score: 'done', card: 'done' },
        result: {
          blobUrl,
          businessName: reviewsData.name,
          rating: scoreData.selectedReview.rating,
          caption: scoreData.caption,
          hashtags: scoreData.hashtags,
          reviewText: scoreData.selectedReview.text,
        },
      });

      setTimeout(() => set({ step: 'result' }), 400);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      set({ error: msg, step: 'input', loadingSteps: INITIAL_LOADING_STEPS });
    }
  },

  handleRegenerate: async () => {
    const { result, isRegenerating, theme } = get();
    if (!result || isRegenerating) return;
    set({ isRegenerating: true, error: null });

    try {
      const cardRes = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote: result.reviewText,
          businessName: result.businessName,
          rating: result.rating,
          theme,
        }),
      });
      if (!cardRes.ok) throw new Error('Card generation failed. Try again.');

      const blob = await cardRes.blob();
      const newBlobUrl = URL.createObjectURL(blob);

      URL.revokeObjectURL(result.blobUrl);
      set((state) => ({
        result: state.result ? { ...state.result, blobUrl: newBlobUrl } : null,
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      set({ error: msg });
    } finally {
      set({ isRegenerating: false });
    }
  },

  handleCopy: async () => {
    const { result } = get();
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
    const { result } = get();
    if (result?.blobUrl) URL.revokeObjectURL(result.blobUrl);
    set({ step: 'input', result: null, error: null, loadingSteps: INITIAL_LOADING_STEPS });
  },
}));
