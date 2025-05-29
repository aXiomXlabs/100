import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rust Rocket",
  description:
    "Get answers to common questions about Rust Rocket's 25ms Solana sniper bot, copy trading features, and same-block execution.",
}

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">What is a Solana sniper bot?</h2>
          <p className="text-gray-300">
            A Solana sniper bot is an automated trading tool that executes trades on the Solana blockchain with
            extremely low latency. Rust Rocket achieves 25 ms execution time and same-block execution, allowing you to
            be among the first to buy new tokens as soon as they launch or when specific market conditions are met.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">How does Rust Rocket's copy-trading feature work?</h2>
          <p className="text-gray-300">
            Rust Rocket's intelligent copy-trading automatically identifies and mirrors successful Solana traders'
            strategies with custom stop-loss and auto-sell conditions. Our system analyzes on-chain data to find
            profitable traders and allows you to automatically follow their trades with your own risk parameters.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">What makes Rust Rocket faster than other Solana bots?</h2>
          <p className="text-gray-300">
            Rust Rocket achieves superior speed through 15 private BDN gateways providing direct, low-latency
            connections to Solana, delivering 25 ms execution time. Our infrastructure is optimized for minimal latency,
            and our code is written in Rust for maximum performance.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">When will Rust Rocket be available?</h2>
          <p className="text-gray-300">
            Rust Rocket's beta version launches on May 9, 2025. Join our waitlist now to get early access to our 25 ms
            Solana sniper bot. Early waitlist members will receive priority access and special pricing.
          </p>
        </section>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
