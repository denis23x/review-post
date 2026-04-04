import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type PlanKey = 'free' | 'solo' | 'business' | 'agency';

const PLAN_FEATURE_COUNTS: Record<PlanKey, number> = {
  free: 3,
  solo: 4,
  business: 5,
  agency: 5,
};

const FEATURED_PLAN: PlanKey = 'business';

export async function Pricing() {
  const t = await getTranslations('landing.pricing');

  const plans: { key: PlanKey; featured: boolean }[] = [
    { key: 'free', featured: false },
    { key: 'solo', featured: false },
    { key: 'business', featured: true },
    { key: 'agency', featured: false },
  ];

  return (
    <section
      id="pricing"
      className="flex scroll-mt-16 flex-col items-center gap-12 bg-[#F7F8FA] px-6 py-20 md:px-12 lg:px-[120px]"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">{t('title')}</h2>
        <p className="text-base text-[#666666]">{t('subtitle')}</p>
      </div>

      <div className="grid w-full max-w-[1100px] items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map(({ key, featured }) => {
          const featureCount = PLAN_FEATURE_COUNTS[key];

          return (
            <div
              key={key}
              className="flex flex-col gap-5 rounded-[16px] bg-white p-7"
              style={{
                border: featured ? '2px solid #4A9FD8' : '1px solid #E5E7EB',
                boxShadow: featured ? '0 1px 3px rgba(0,0,0,0.04)' : undefined,
              }}
            >
              {featured && (
                <span className="self-start rounded bg-[#4A9FD8] px-2 py-1 text-[12px] leading-[1.4] font-semibold text-[#F7F8FA]">
                  {t('mostPopular')}
                </span>
              )}

              <p className="text-[18px] font-semibold text-[#1a1a1a]">{t(`${key}.name`)}</p>

              <div className="flex items-center gap-0.5">
                <span className="font-geist-mono text-[30px] font-extrabold text-[#1a1a1a]">
                  {t(`${key}.amount`)}
                </span>
                <span className="text-base font-medium text-[#666666]">{t('perMonth')}</span>
              </div>

              <p className="text-[13px] text-[#666666]">{t(`${key}.desc`)}</p>

              <div className="h-px bg-[#E5E7EB]" />

              {Array.from({ length: featureCount }, (_, i) => (
                <span key={i} className="text-[13px] text-[#666666]">
                  {t(`${key}.feature${i}`)}
                </span>
              ))}

              <Link
                href="/demo"
                className="mt-auto flex h-11 items-center justify-center rounded-full text-[14px] font-medium transition-opacity hover:opacity-80"
                style={
                  featured
                    ? { background: '#4A9FD8', color: '#fff' }
                    : {
                        background: '#fff',
                        color: '#1a1a1a',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 1.75px rgba(0,0,0,0.08)',
                      }
                }
              >
                {t(`${key}.cta`)}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
