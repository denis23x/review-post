'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Bot, Layers2 } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';

const PLATFORM_BADGES: Record<string, { color: string; path: string }> = {
  IG: {
    color: '#E4405F',
    path: 'M7.0301 0.084c-1.2768 0.0602-2.1487 0.264-2.911 0.5634-0.7888 0.3075-1.4575 0.72-2.1228 1.3877-0.6652 0.6677-1.075 1.3368-1.3802 2.127-0.2954 0.7638-0.4956 1.6365-0.552 2.914-0.0564 1.2775-0.0689 1.6882-0.0626 4.947 0.0062 3.2586 0.0206 3.6671 0.0825 4.9473 0.061 1.2765 0.264 2.1482 0.5635 2.9107 0.308 0.7889 0.72 1.4573 1.388 2.1228 0.6679 0.6655 1.3365 1.0743 2.1285 1.38 0.7632 0.295 1.6361 0.4961 2.9134 0.552 1.2773 0.056 1.6884 0.069 4.9462 0.0627 3.2578-0.0062 3.668-0.0207 4.9478-0.0814 1.28-0.0607 2.147-0.2652 2.9098-0.5633 0.7889-0.3086 1.4578-0.72 2.1228-1.3881 0.665-0.6682 1.0745-1.3378 1.3795-2.1284 0.2957-0.7632 0.4966-1.636 0.552-2.9124 0.056-1.2809 0.0692-1.6898 0.063-4.948-0.0063-3.2583-0.021-3.6668-0.0817-4.9465-0.0607-1.2797-0.264-2.1487-0.5633-2.9117-0.3084-0.7889-0.72-1.4568-1.3876-2.1228-0.6677-0.666-1.3379-1.0752-2.1281-1.3795-0.7638-0.2955-1.6361-0.4968-2.9134-0.552-1.2773-0.0552-1.6884-0.0695-4.9474-0.0631-3.259 0.0062-3.667 0.0201-4.9469 0.0825m0.1402 21.6932c-1.17-0.0509-1.8053-0.2453-2.2287-0.408-0.5606-0.216-0.96-0.4771-1.3819-0.895-0.422-0.4178-0.6811-0.8186-0.9-1.378-0.1644-0.4234-0.3624-1.058-0.4171-2.228-0.0595-1.2645-0.072-1.6442-0.079-4.848-0.007-3.2037 0.0053-3.583 0.0607-4.848 0.05-1.169 0.2456-1.805 0.408-2.2282 0.216-0.5613 0.4762-0.96 0.895-1.3816 0.4188-0.4217 0.8184-0.6814 1.3783-0.9003 0.423-0.1651 1.0575-0.3614 2.227-0.4171 1.2655-0.06 1.6447-0.072 4.848-0.079 3.2033-0.007 3.5835 0.005 4.8495 0.0608 1.169 0.0508 1.8053 0.2445 2.228 0.408 0.5608 0.216 0.96 0.4754 1.3816 0.895 0.4217 0.4194 0.6816 0.8176 0.9005 1.3787 0.1653 0.4217 0.3617 1.056 0.4169 2.2263 0.0602 1.2655 0.0739 1.645 0.0796 4.848 0.0058 3.203-0.0055 3.5834-0.061 4.848-0.051 1.17-0.245 1.8055-0.408 2.2294-0.216 0.5604-0.4763 0.96-0.8954 1.3814-0.419 0.4215-0.8181 0.6811-1.3783 0.9-0.4224 0.1649-1.0577 0.3617-2.2262 0.4174-1.2656 0.0595-1.6448 0.072-4.8493 0.079-3.2045 0.007-3.5825-0.006-4.848-0.0608m9.7825-16.1907a1.44 1.44 0 1 0 1.437-1.4424 1.44 1.44 0 0 0-1.437 1.4424m-11.1145 6.4256c0.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-0.0065 6.157-2.7701 6.1506-6.1733-0.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403 0.0067-6.156 2.771-6.1496 6.1738m2.1615-0.0043a4 4 0 1 1 4.008 3.9921 3.9996 3.9996 0 0 1-4.008-3.9921',
  },
  FB: {
    color: '#0866FF',
    path: 'M9.101 23.691v-7.98h-2.474v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978 0.401 0 0.955 0.042 1.468 0.103a8.68 8.68 0 0 1 1.141 0.195v3.325a8.623 8.623 0 0 0-0.653-0.036 26.805 26.805 0 0 0-0.733-0.009c-0.707 0-1.259 0.096-1.675 0.309a1.686 1.686 0 0 0-0.679 0.622c-0.258 0.42-0.374 0.995-0.374 1.752v1.297h3.919l-0.386 2.103-0.287 1.564h-3.246v8.245c5.942-0.718 10.546-5.777 10.546-11.912 0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z',
  },
  LI: {
    color: '#0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-0.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h0.046c0.477-0.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z m-15.11-13.019c-1.144 0-2.063-0.926-2.063-2.065 0-1.138 0.92-2.063 2.063-2.063 1.14 0 2.064 0.925 2.064 2.063 0 1.139-0.925 2.065-2.064 2.065z m1.782 13.019h-3.564v-11.452h3.564v11.452z m15.106-20.452h-20.454c-0.979 0-1.771 0.774-1.771 1.729v20.542c0 0.956 0.792 1.729 1.771 1.729h20.451c0.978 0 1.778-0.773 1.778-1.729v-20.542c0-0.955-0.8-1.729-1.778-1.729h0.003z',
  },
};

export function Hero() {
  const t = useTranslations('landing.hero');
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = React.useRef(1);

  const EXAMPLE_CARDS = [
    { quote: t('card1Quote'), author: t('card1Author'), rating: 5, platforms: ['IG', 'FB'] },
    { quote: t('card2Quote'), author: t('card2Author'), rating: 5, platforms: ['IG', 'LI'] },
    { quote: t('card3Quote'), author: t('card3Author'), rating: 5, platforms: ['FB', 'LI'] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= EXAMPLE_CARDS.length - 1) directionRef.current = -1;
        if (prev <= 0) directionRef.current = 1;
        return prev + directionRef.current;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dest = url.trim() ? `/demo?url=${encodeURIComponent(url.trim())}` : '/demo';
    router.push(dest);
  }

  return (
    <section
      className="overflow-hidden"
      style={{
        background: [
          'radial-gradient(80% 60% at 50% 25%, rgba(74,159,216,0.10) 0%, rgba(74,159,216,0) 100%)',
        ].join(', '),
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-6 py-20 md:px-12 lg:px-[120px]">
        {/* Decorative rings — top right */}
        <div
          className="pointer-events-none absolute"
          style={{ width: 450, height: 450, right: -170, top: -256, borderRadius: '50%', border: '18px solid #4A9FD8', opacity: 0.04 }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ width: 320, height: 320, right: -105, top: -191, borderRadius: '50%', border: '16px solid #4A9FD8', opacity: 0.05 }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ width: 200, height: 200, right: -45, top: -131, borderRadius: '50%', border: '12px solid #4A9FD8', opacity: 0.06 }}
        />

        {/* Decorative diamonds */}
        <div
          className="pointer-events-none absolute"
          style={{ width: 280, height: 280, left: -70, top: -150, backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.06, transform: 'rotate(45deg)' }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ width: 363, height: 363, right: -104, top: 759, backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.08, transform: 'rotate(45deg)' }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ width: 180, height: 180, right: 127, top: 493, backgroundColor: '#4A9FD8', borderRadius: 4, opacity: 0.04, transform: 'rotate(45deg)' }}
        />

        {/* Badges */}
        <div className="relative flex gap-4">
          <div className="flex items-center gap-1.5 rounded-full border border-[#4A9FD8] bg-[#4A9FD8] px-4 py-1.5">
            <Bot size={16} className="text-white" />
            <span className="text-xs font-medium text-white">{t('badgeAi')}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#4A9FD8] bg-[#F7F8FA] px-4 py-1.5">
            <Layers2 size={16} className="text-[#4A9FD8]" />
            <span className="text-xs font-medium text-[#4A9FD8]">{t('badgeBeta')}</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="relative mx-auto max-w-[900px] whitespace-pre-line text-center text-[56px] leading-[1.1] font-extrabold tracking-[-2px] text-[#1a1a1a]">
          {t('headline')}
        </h1>

        {/* Subheadline */}
        <p className="relative mx-auto max-w-[640px] text-center text-lg leading-normal text-[#666666]">
          {t('subheadline')}
        </p>

        {/* Input + CTA */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center gap-3 rounded-full bg-[#4A9FD8] p-1.5"
          style={{ boxShadow: '0 4px 16px rgba(74,159,216,0.20)' }}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('placeholder')}
            className="h-11 w-[300px] rounded-full bg-white px-5 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none sm:w-[420px]"
          />
          <button
            type="submit"
            className="flex h-11 items-center rounded-full bg-white px-4 text-[15px] font-medium whitespace-nowrap text-[#1a1a1a] transition-opacity hover:opacity-80"
          >
            {t('cta')}
          </button>
        </form>

        {/* Example review cards */}
        <div className="relative mt-4 flex gap-6 overflow-x-auto pb-2">
          {EXAMPLE_CARDS.map((card, i) => (
            <div
              key={i}
              className="flex w-[320px] shrink-0 flex-col gap-4 rounded-[16px] p-6"
              style={{
                background: i === activeIndex ? '#F0F7FC' : '#FFFFFF',
                border: i === activeIndex ? '1.5px solid #4A9FD8' : '1px solid #E5E7EB',
                boxShadow: i === activeIndex ? '0 2px 8px rgba(74,159,216,0.10)' : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              <StarRating rating={card.rating} size="lg" />
              <p className="text-sm leading-normal font-medium text-[#1a1a1a] italic">
                &ldquo;{card.quote}&rdquo;
              </p>
              <span className="font-regular text-xs text-[#666666]">&mdash; {card.author}</span>
              <div className="mt-auto flex items-center gap-1.5">
                {card.platforms.map((p) => (
                  <span
                    key={p}
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ backgroundColor: PLATFORM_BADGES[p].color }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-label={p}>
                      <path d={PLATFORM_BADGES[p].path} />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
