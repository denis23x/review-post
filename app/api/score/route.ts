import OpenAI from 'openai'

const SYSTEM_PROMPT = `
You are a social media manager for local businesses.
Given a list of customer reviews, pick the single best one to turn into a social media post.

Scoring criteria:
- Specific details beat vague praise ("Dr. Smith fixed my tooth painlessly in 20 mins" > "Great place!")
- Emotional language scores higher
- Story-driven reviews score higher
- Minimum 3 stars — discard anything below 3 stars

Return a valid JSON object with exactly two fields:
- "review": the full text of the chosen review (do not truncate or paraphrase)
- "caption": an Instagram/Facebook caption (max 150 chars, no hashtags, no emojis unless natural)
`.trim()

interface ReviewInput {
  authorName: string
  rating: number
  text: string
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'openai not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.reviews?.length) {
    return Response.json({ error: 'no reviews provided' }, { status: 400 })
  }

  const qualifying: ReviewInput[] = (body.reviews as ReviewInput[]).filter(
    (r) => r.rating >= 3 && r.text?.trim()
  )

  if (!qualifying.length) {
    return Response.json({ error: 'no qualifying reviews' }, { status: 200 })
  }

  const openai = new OpenAI({ apiKey })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    max_tokens: 300,
    temperature: 0.4,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Reviews:\n${JSON.stringify(qualifying, null, 2)}`,
      },
    ],
  })

  const parsed = JSON.parse(completion.choices[0].message.content ?? '{}')

  const selectedReview =
    qualifying.find((r) => r.text === parsed.review) ?? qualifying[0]

  return Response.json({
    selectedReview,
    caption: parsed.caption ?? '',
  })
}
