// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Skip emitting ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // You already have this to skip TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // …any other existing settings…
}

export default nextConfig
