import { useQuery } from '@tanstack/react-query';
import type { ReviewsResponse } from '@/lib/validators';

async function fetchReviews(url: string): Promise<ReviewsResponse> {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'Failed to fetch reviews');
  }
  return res.json();
}

export function useReviews(url: string | null) {
  return useQuery({
    queryKey: ['reviews', url],
    queryFn: () => fetchReviews(url!),
    enabled: !!url,
  });
}
