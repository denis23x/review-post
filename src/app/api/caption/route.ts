import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `
You are a social media manager for local businesses.
Given a single customer review, write a new caption and hashtags for a social media post.

Rules:
- Caption: max 150 chars, no hashtags, no emojis unless natural
- Hashtags: 3-5 relevant hashtags as plain words (no # prefix)
- Always respond in the same language as the review provided. Never translate any text.

Return a valid JSON object with exactly:
- "caption": string
- "hashtags": string[]
`.trim();

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'groq not configured' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.reviewText?.trim()) {
    return Response.json({ error: 'no reviewText provided' }, { status: 400 });
  }

  const groq = new Groq({ apiKey });

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      max_tokens: 256,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Review:\n${body.reviewText}` },
      ],
    });
  } catch (error) {
    console.error('👉 ~ caption error:', error);
    return Response.json({ error: 'ai caption generation failed' }, { status: 500 });
  }

  let parsed: { caption?: string; hashtags?: string[] } = {};
  try {
    parsed = JSON.parse(completion.choices[0].message.content ?? '{}');
  } catch {
    // fall through with empty parsed
  }

  return Response.json({
    caption: parsed.caption ?? '',
    hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
  });
}
