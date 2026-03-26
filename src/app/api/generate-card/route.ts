import React from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

const THEMES = {
  dark: { bg: '#1a1a2e', text: '#ffffff', stars: '#FFD700', meta: '#aaaaaa' },
  light: { bg: '#ffffff', text: '#1a1a2e', stars: '#FFD700', meta: '#555555' },
  brand: { bg: '#0f172a', text: '#f8fafc', stars: '#38bdf8', meta: '#94a3b8' },
}

function starElement(color: string, size = 36) {
  return React.createElement(
    'svg',
    { width: size, height: size, viewBox: '0 0 24 24', style: { display: 'block' } },
    React.createElement('path', {
      fill: color,
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    })
  )
}

function renderStars(count: number, color: string, size = 36) {
  return React.createElement(
    'div',
    { style: { display: 'flex', gap: 4, marginTop: 40 } },
    ...Array.from({ length: count }, (_, i) => React.cloneElement(starElement(color, size), { key: i }))
  )
}

function truncateQuote(text: string, maxChars = 220): string {
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars).trimEnd() + '\u2026'
}

let interRegular: Buffer | null = null
let interBold: Buffer | null = null

function getFonts() {
  if (!interRegular) {
    interRegular = readFileSync(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
  }
  if (!interBold) {
    interBold = readFileSync(join(process.cwd(), 'public/fonts/Inter-Bold.ttf'))
  }
  return { interRegular, interBold }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)

  if (!body?.quote || !body?.businessName) {
    return Response.json({ error: 'quote and businessName required' }, { status: 400 })
  }

  const { quote, businessName, rating = 5, theme = 'dark' } = body as {
    quote: string
    businessName: string
    rating: number
    theme: keyof typeof THEMES
  }

  const colors = THEMES[theme] ?? THEMES.dark
  const starCount = Math.min(5, Math.max(1, Math.round(rating)))
  const truncated = truncateQuote(quote)

  let fonts
  try {
    fonts = getFonts()
  } catch {
    return Response.json({ error: 'fonts not found' }, { status: 500 })
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
          fontFamily: 'Inter',
          position: 'relative',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            fontSize: 48,
            color: colors.text,
            lineHeight: 1.4,
            fontWeight: 700,
          },
        },
        `\u201c${truncated}\u201d`
      ),
      renderStars(starCount, colors.stars),
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
            fontSize: 18,
            color: colors.text,
            opacity: 0.1,
          },
        },
        'ReviewPost'
      )
    )

    const svg = await satori(
      element,
      {
        width: 1080,
        height: 1080,
        fonts: [
          { name: 'Inter', data: fonts.interRegular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
          { name: 'Inter', data: fonts.interBold.buffer as ArrayBuffer, weight: 700, style: 'normal' },
        ],
      }
    )

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } })
    const pngBuffer = resvg.render().asPng()
    const png = Buffer.from(pngBuffer)

    return new Response(png as unknown as BodyInit, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="reviewpost-${Date.now()}.png"`,
      },
    })
  } catch (err) {
    console.error('Card generation error:', err)
    return Response.json({ error: 'card generation failed' }, { status: 500 })
  }
}
