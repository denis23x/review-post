import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/generate-card': ['./public/fonts/**/*'],
  },
}

export default nextConfig
