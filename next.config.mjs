/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/landing',
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig 