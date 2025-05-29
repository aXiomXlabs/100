import type React from "react"

const AdsLandingPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <section className="hero-section text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Solana Sniper Bot - Lightning Fast Trading</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Unleash the power of automated trading on the Solana blockchain.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started Now
        </button>
      </section>

      <section className="features-section py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature">
            <h2 className="text-2xl font-semibold mb-4">Lightning Fast</h2>
            <p className="text-gray-600">Execute trades in milliseconds with our optimized Solana bot.</p>
          </div>
          <div className="feature">
            <h2 className="text-2xl font-semibold mb-4">Automated Trading</h2>
            <p className="text-gray-600">Set your parameters and let the bot trade for you 24/7.</p>
          </div>
          <div className="feature">
            <h2 className="text-2xl font-semibold mb-4">Customizable Strategies</h2>
            <p className="text-gray-600">Tailor your trading strategies to maximize your profits.</p>
          </div>
        </div>
      </section>

      <section className="cta-section bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Supercharge Your Trading?</h2>
        <p className="text-lg text-gray-700 mb-8">Join our community and start trading smarter today.</p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Join Now</button>
      </section>
    </div>
  )
}

export default AdsLandingPage
