import { useMutation } from '@tanstack/react-query'
import type { Theme } from '@/lib/validators'

interface GenerateCardPayload {
  quote: string
  businessName: string
  rating: number
  theme: Theme
}

async function generateCard(payload: GenerateCardPayload): Promise<string> {
  const res = await fetch('/api/generate-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error('Card generation failed')
  }
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

export function useGenerateCard() {
  return useMutation({
    mutationFn: generateCard,
  })
}
