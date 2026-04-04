'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function WaitlistForm() {
  const t = useTranslations('signup.form');
  const tValidation = useTranslations('validation');

  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [agreedError, setAgreedError] = useState('');

  const validateEmail = (value: string): string => {
    if (!value.trim()) return tValidation('emailRequired');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return tValidation('emailInvalid');
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
    if (agreedError) setAgreedError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const agreedErr = agreed ? '' : tValidation('agreeRequired');

    if (emailErr || agreedErr) {
      setEmailError(emailErr);
      setAgreedError(agreedErr);
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message || t('errorDefault'));
      }

      setFormState('success');
    } catch (err) {
      setFormState('error');
      setErrorMessage(err instanceof Error ? err.message : t('errorDefault'));
    }
  };

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[32px] border border-[#E5E7EB] p-4 py-8 text-center">
        <CheckCircle size={48} className="text-[#4A9FD8]" />
        <h2 className="text-[22px] font-bold text-[#1a1a1a]">{t('successTitle')}</h2>
        <p className="max-w-[320px] text-sm text-[#666666]">
          {t('successBody', { email })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[13px] font-medium text-[#1a1a1a]">
            {t('emailLabel')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={t('emailPlaceholder')}
            autoComplete="email"
            disabled={formState === 'loading'}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            className={cn(
              'h-11 w-full rounded-full border border-[#E5E7EB] bg-white px-5 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none',
              emailError &&
                'border-[#ef4444] transition-all focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
            )}
          />
          {emailError && (
            <p id="email-error" role="alert" className="text-[12px] text-[#ef4444]">
              {emailError}
            </p>
          )}
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleAgreedChange}
          disabled={formState === 'loading'}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E5E7EB] accent-[#4A9FD8]"
        />
        <span className={cn('text-[13px] text-[#666666]', agreedError && 'text-[#ef4444]')}>
          {t('agreeText')}
        </span>
      </label>

      {formState === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded-[8px] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#ef4444]"
        >
          {errorMessage}
        </p>
      )}

      <Button
        variant="primary"
        type="submit"
        size="md"
        loading={formState === 'loading'}
        loadingText={t('loadingText')}
        className="mt-6 w-full"
      >
        {t('submitButton')}
      </Button>
    </form>
  );
}
