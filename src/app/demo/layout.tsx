import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Demo — Try Review to Post',
  description:
    'Paste any Google Maps business link and get a branded social media card in seconds. No sign-up required. Free to try.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/demo' },
  openGraph: {
    title: 'Free Demo — Try Review to Post',
    description:
      'Paste any Google Maps business link and get a branded social media card in seconds. No sign-up required.',
    url: '/demo',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
