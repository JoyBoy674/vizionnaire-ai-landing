/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? undefined : 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  }
}

export default nextConfig 