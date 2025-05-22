/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['rust-rocket.com'],
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirects für 404-Fehler
      {
        source: '/privacy',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/#faq',
        permanent: true,
      },
      {
        source: '/roadmap',
        destination: '/#roadmap',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/#features',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terms',
        permanent: true,
      },
      {
        source: '/blog/index',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
      // Weitere 404-Fehler aus der Liste
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/robots',
        destination: '/robots.txt',
        permanent: true,
      },
      {
        source: '/api/docs',
        destination: '/gone',
        permanent: true,
      },
      {
        source: '/old-content/:path*',
        destination: '/gone',
        permanent: true,
      },
      {
        source: '/legacy/:path*',
        destination: '/gone',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Für 410 Gone-Antworten
      {
        source: '/gone',
        destination: '/api/gone',
      },
    ]
  },
}

export default nextConfig
