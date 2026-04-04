import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `
You are a social media manager for local businesses.
Given a list of customer reviews, pick the top 3 best ones to turn into social media posts.

Scoring criteria:
- Specific details beat vague praise ("Dr. Smith fixed my tooth painlessly in 20 mins" > "Great place!")
- Emotional language scores higher
- Story-driven reviews score higher
- Minimum 3 stars — discard anything below 3 stars
- Review text length should be less than 220 characters
- Each selected review must be unique — do not repeat the same review

Return a valid JSON object with exactly this field:
- "reviews": an array of up to 3 objects (return as many qualifying reviews as exist, maximum 3), each with:
  - "review": the full text of the chosen review (do not truncate, paraphrase, or translate — preserve the original language exactly)
  - "caption": an Instagram/Facebook caption (max 150 chars, no hashtags, no emojis unless natural)
  - "hashtags": an array of 3-5 relevant hashtags for the post
  - "authorName": the name of the author of the chosen review

IMPORTANT: Always respond in the same language as the reviews provided. Never translate any text.
`.trim();

interface ReviewInput {
  authorName: string;
  rating: number;
  text: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'groq not configured' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.reviews?.length) {
    return Response.json({ error: 'no reviews provided' }, { status: 400 });
  }

  const qualifying: ReviewInput[] = (body.reviews as ReviewInput[]).filter(
    (r) => r.rating >= 3 && r.text?.trim()
  );

  if (!qualifying.length) {
    return Response.json({ error: 'no qualifying reviews' }, { status: 200 });
  }

  const groq = new Groq({ apiKey });

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      max_tokens: 1024,
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Reviews:\n${JSON.stringify(qualifying, null, 2)}`,
        },
      ],
    });
  } catch (error) {
    console.error('👉 ~ score error:', error);
    return Response.json({ error: 'ai scoring failed' }, { status: 500 });
  }

  interface ParsedReview {
    review?: string;
    caption?: string;
    hashtags?: string[];
    authorName?: string;
  }

  let parsed: { reviews?: ParsedReview[] } = {};
  try {
    parsed = JSON.parse(completion.choices[0].message.content ?? '{}');
  } catch {
    // AI returned non-JSON — fall back to first qualifying review
  }

  const seenTexts = new Set<string>();
  const usedQualifying = new Set<ReviewInput>();
  const scoredReviews = ((parsed.reviews ?? []) as ParsedReview[])
    .slice(0, 3)
    .reduce<{ selectedReview: ReviewInput; caption: string; hashtags: string[]; authorName: string }[]>(
      (acc, item) => {
        const text = item.review ?? '';
        if (!text || seenTexts.has(text)) return acc;
        seenTexts.add(text);

        const selectedReview =
          qualifying.find((r) => !usedQualifying.has(r) && r.text === item.review) ??
          qualifying.find((r) => !usedQualifying.has(r) && r.authorName === item.authorName) ??
          qualifying.find((r) => !usedQualifying.has(r));

        if (!selectedReview) return acc;
        usedQualifying.add(selectedReview);

        acc.push({
          selectedReview,
          caption: item.caption ?? '',
          hashtags: item.hashtags ?? [],
          authorName: item.authorName ?? selectedReview.authorName ?? '',
        });
        return acc;
      },
      []
    );

  if (!scoredReviews.length) {
    scoredReviews.push({
      selectedReview: qualifying[0],
      caption: '',
      hashtags: [],
      authorName: qualifying[0].authorName ?? '',
    });
  }

  return Response.json({ scoredReviews });
}
