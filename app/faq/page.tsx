import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Rust Rocket Solana Sniper Bot",
  description:
    "Get comprehensive answers to common questions about Rust Rocket's lightning-fast 25ms Solana sniper bot, advanced copy trading features, and same-block execution technology.",
}

const FAQPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What is Rust Rocket?</h2>
        <p>
          Rust Rocket is a high-performance Solana sniper bot built with Rust, designed for speed and efficiency in
          trading.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How fast is the Rust Rocket bot?</h2>
        <p>
          The Rust Rocket bot boasts a lightning-fast 25ms execution speed, allowing you to snipe tokens with
          unparalleled speed.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What are the copy trading features?</h2>
        <p>
          Our advanced copy trading features allow you to automatically copy the trades of successful traders,
          maximizing your potential profits.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What is same-block execution?</h2>
        <p>
          Same-block execution ensures that your trades are executed within the same block as the target transaction,
          minimizing slippage and maximizing your chances of success.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Where can I find more information?</h2>
        <p>For more information, please visit our documentation or contact our support team.</p>
      </div>
    </div>
  )
}

export default FAQPage
