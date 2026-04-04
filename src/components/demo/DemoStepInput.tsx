'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { ThemeSelector } from '@/components/ThemeSelector';
import { createGoogleMapsUrlSchema } from '@/lib/validators';
import { useDemoStore } from '@/store/demoStore';
import { Fragment, useEffect } from 'react';
import { cn } from '@/lib/cn';

export function DemoStepInput() {
  const t = useTranslations('demo.stepInput');
  const tValidation = useTranslations('validation');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') ?? '';
  const { theme, error, setTheme, handleGenerate } = useDemoStore();

  const urlSchema = createGoogleMapsUrlSchema({
    required: tValidation('urlRequired'),
    invalid: tValidation('urlInvalid'),
  });

  const form = useForm({
    defaultValues: { url: initialUrl },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await handleGenerate(value.url, locale);
    },
  });

  useEffect(() => {
    if (initialUrl) {
      form.setFieldValue('url', initialUrl);
      form.handleSubmit();
    }
  }, [form, initialUrl]);

  return (
    <div className="w-full rounded-[16px] border border-[#E5E7EB] bg-[#F7F8FA] p-8">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">{t('title')}</h2>
      <form
        className="mt-6 flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="url" validators={{ onChange: urlSchema }}>
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1a1a1a]" htmlFor="url-input">
                {t('label')}
              </label>
              <div className="relative flex items-center">
                <input
                  id="url-input"
                  type="url"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('placeholder')}
                  className={cn(
                    'h-11 w-full rounded-full border border-[#E5E7EB] bg-white px-5 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none',
                    field.state.meta.errors.length &&
                      'border-[#ef4444] transition-all focus:border-[#ef4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                  )}
                  autoComplete="off"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-[#ef4444]">{String(field.state.meta.errors[0])}</p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-[#1a1a1a]">{t('chooseTheme')}</p>
          <ThemeSelector value={theme} onChange={setTheme} />
        </div>

        {error && (
          <div className="rounded-[8px] border-l-4 border-[#ef4444] bg-[#fef2f2] p-3 text-sm text-[#ef4444]">
            {error}
          </div>
        )}

        <form.Subscribe selector={(state) => state.isValid}>
          {(isValid) => (
            <button
              disabled={!isValid}
              type="submit"
              className={cn(
                'flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#4A9FD8] px-4 text-sm font-medium text-white transition-opacity hover:opacity-80',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <Fragment>{t('submit')}</Fragment>
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
