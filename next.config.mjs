import { getAllRedirects } from './lib/redirects.js'

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
  
  // Enhanced redirect configuration
  async redirects() {
    return [
      // Import redirects from redirect management system
      ...getAllRedirects(),
      
      // WWW to non-WWW redirect (canonical domain)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.rust-rocket.com',
          },
        ],
        destination: 'https://rust-rocket.com/:path*',
        permanent: true,
      },
      
      // HTTP to HTTPS redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://rust-rocket.com/:path*',
        permanent: true,
      }
    ]
  },
  
  // Custom headers for SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          }
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          }
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          }
        ],
      }
    ]
  },
  
  // Trailing slash configuration
  trailingSlash: false,
  
  // Experimental features for better SEO
  experimental: {
    optimizeCss: true,
  }
}

export default nextConfig
