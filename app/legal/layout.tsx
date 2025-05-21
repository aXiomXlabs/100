import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import Footer from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Legal Information | Rust Rocket",
  description: "Legal information, terms of service, and privacy policy for Rust Rocket.",
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen flex flex-col ${inter.variable} bg-background text-white`}>
      <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/rust-rocket-logo.gif" alt="Rust Rocket Logo" className="h-10 w-10" />
            <span className="font-bold text-xl">Rust Rocket</span>
          </Link>

          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  )
}
