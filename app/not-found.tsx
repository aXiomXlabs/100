import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Rust Rocket",
  description: "The page you are looking for could not be found. Return to Rust Rocket homepage.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-solana-green mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-solana-green hover:bg-solana-green/80 text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>

          <div className="text-gray-500">
            <p>Or try these popular pages:</p>
            <div className="mt-4 space-x-4">
              <Link href="/solana-sniper-bot" className="text-solana-green hover:underline">
                Solana Sniper Bot
              </Link>
              <Link href="/faq" className="text-solana-green hover:underline">
                FAQ
              </Link>
              <Link href="/blog" className="text-solana-green hover:underline">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
