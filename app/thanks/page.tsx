import Link from "next/link"
import Image from "next/image"
import Script from "next/script"

export const metadata = {
  title: "Thank You for Joining | Rust Rocket",
  description:
    "Thank you for joining the Rust Rocket waitlist. We'll be in touch soon with more information about our beta program.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThanksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/rust-rocket-logo.png"
                alt="Rust Rocket Logo"
                width={100}
                height={100}
                className="rounded-full"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Thanks for Joining!</h1>
            <p className="text-xl text-gray-300 mb-8">
              You've successfully joined the Rust Rocket waitlist. We'll be in touch soon with more information about
              our beta program.
            </p>
            <Link
              href="/"
              className="inline-block py-3 px-6 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Conversion tracking scripts */}
      <Script id="conversion-events" strategy="afterInteractive">
        {`
          // This script fires conversion events for Google Analytics and Twitter/X
          if (typeof gtag === 'function') {
            gtag('event', 'beta_signup', {value: 0});
          }
          if (typeof twq === 'function') {
            twq('event', 'tw-ooo', {currency: 'EUR', value: 0});
          }
        `}
      </Script>
    </div>
  )
}
