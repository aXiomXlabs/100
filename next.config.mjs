/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect old paths to new locations
      {
        source: '/privacy',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terms',
        permanent: true,
      },
      {
        source: '/roadmap',
        destination: '/#roadmap',
        permanent: true,
      },
      // Add any other redirects needed for 404s
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/terms.html',
        destination: '/legal/terms',
        permanent: true,
      },
    ]
  }
}

export default nextConfig
