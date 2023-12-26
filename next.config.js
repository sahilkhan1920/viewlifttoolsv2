/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  distDir: 'build',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_V1_API_URL: process.env.NEXT_PUBLIC_V1_API_URL,
    NEXT_PUBLIC_V2_API_URL: process.env.NEXT_PUBLIC_V2_API_URL,
    NEXT_PUBLIC_REPORTING_API_URL: process.env.NEXT_PUBLIC_REPORTING_API_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'appcmsstaging.viewlift.com',
        port: '',
      },
    ],
  },
}
