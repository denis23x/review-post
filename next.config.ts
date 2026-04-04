import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/generate-card': ['./public/fonts/**/*'],
  },
};

export default withNextIntl(nextConfig);
