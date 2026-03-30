import React from 'react';
import { ImageResponse } from '@vercel/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

const THEMES = {
  dark: { bg: '#1a1a2e', text: '#ffffff', stars: '#FFD700', meta: '#aaaaaa' },
  light: { bg: '#ffffff', text: '#1a1a2e', stars: '#FFD700', meta: '#555555' },
  brand: { bg: '#FFF0F5', text: '#1a1a2e', stars: '#DC2626', meta: '#555555' },
};

function starElement(color: string, size = 36) {
  return React.createElement(
    'svg',
    { width: size, height: size, viewBox: '0 0 24 24', style: { display: 'block' } },
    React.createElement('path', {
      fill: color,
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    })
  );
}

function heartElement(color: string, size = 36) {
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'none',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { display: 'block' },
    },
    React.createElement('path', {
      fill: color,
      d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
    })
  );
}

function renderStars(count: number, color: string, size = 48, useHearts = false) {
  return React.createElement(
    'div',
    { style: { display: 'flex', gap: 4, marginTop: 40 } },
    ...Array.from({ length: count }, (_, i) =>
      React.cloneElement(useHearts ? heartElement(color, size) : starElement(color, size), {
        key: i,
      })
    )
  );
}

function truncateQuote(text: string, maxChars = 220): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + '\u2026';
}

let interRegular: Buffer | null = null;
let interBold: Buffer | null = null;
let lobsterRegular: Buffer | null = null;

function getFonts() {
  if (!interRegular) {
    interRegular = readFileSync(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'));
  }
  if (!interBold) {
    interBold = readFileSync(join(process.cwd(), 'public/fonts/Inter-Bold.ttf'));
  }
  if (!lobsterRegular) {
    lobsterRegular = readFileSync(join(process.cwd(), 'public/fonts/Lobster-Regular.ttf'));
  }
  return { interRegular, interBold, lobsterRegular };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.quote || !body?.businessName) {
    return Response.json({ error: 'quote and businessName required' }, { status: 400 });
  }

  const {
    quote,
    businessName,
    rating = 5,
    theme = 'dark',
  } = body as {
    quote: string;
    businessName: string;
    rating: number;
    theme: keyof typeof THEMES;
  };

  const colors = THEMES[theme] ?? THEMES.dark;
  const starCount = Math.min(5, Math.max(1, Math.round(rating)));
  const truncated = truncateQuote(quote);

  let fonts;
  try {
    fonts = getFonts();
  } catch {
    return Response.json({ error: 'fonts not found' }, { status: 500 });
  }

  try {
    const element = React.createElement(
      'div',
      {
        style: {
          width: 1080,
          height: 1080,
          background: colors.bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          fontFamily: theme === 'brand' ? 'Lobster' : 'Inter',
          position: 'relative',
        },
      },
      renderStars(starCount, colors.stars, 48, theme === 'brand'),
      React.createElement(
        'div',
        {
          style: {
            marginTop: 16,
            fontSize: theme === 'brand' ? 64 : 48,
            color: colors.text,
            lineHeight: 1.4,
            fontWeight: 700,
          },
        },
        `\u201c${truncated}\u201d`
      ),
      React.createElement(
        'div',
        { style: { marginTop: 16, fontSize: 24, color: colors.meta } },
        `\u2014 ${businessName}`
      ),
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 32,
            color: colors.text,
            opacity: 0.25,
          },
        },
        'Review to Post'
      )
    );

    return new ImageResponse(element, {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: 'Inter',
          data: fonts.interRegular.buffer as ArrayBuffer,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.interBold.buffer as ArrayBuffer,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Lobster',
          data: fonts.lobsterRegular.buffer as ArrayBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
      headers: {
        'Content-Disposition': `attachment; filename="Review to Post-${Date.now()}.png"`,
      },
    });
  } catch (err) {
    console.error('👉 ~ generate-card error:', err);
    return Response.json({ error: 'card generation failed' }, { status: 500 });
  }
}
