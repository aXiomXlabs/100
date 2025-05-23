import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Terms of Service | Rust Rocket",
  description: "Terms of service for Rust Rocket - the fastest Solana sniper bot with intelligent copy trading.",
}

export default function TermsOfService() {
  return (
    <>
      <div className="bg-[#0a0a0f] min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-primary">Terms of</span> Service
              </h1>

              <div className="bg-background-secondary/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  These Terms of Service and Use (the "Terms") are entered into between you (hereinafter referred to as
                  the "User", "you" or "your") and Axiom Enterprise GmbH (the "Service Provider") with respect to your
                  use of Rust Rocket services, which includes Rust Rocket Bot and related services provided by Service
                  Provider on Telegram (collectively, the "Services").
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                <p className="text-yellow-200 font-medium">
                  Please review these terms carefully as they govern your use of the Service. THE SERVICE PROVIDER'S
                  EXPOSURE TO LIABILITY UNDER THESE TERMS IS LIMITED AND YOUR ABILITY TO COMMENCE ACTION AGAINST THE
                  SERVICE PROVIDER IS SUBJECT TO RESTRICTIONS.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <p className="text-gray-400">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing or using Rust Rocket services, you agree to be bound by these Terms of Service. If you do
                  not agree to these terms, you may not use our services. These terms apply to all users of the service,
                  including without limitation users who are browsers, vendors, customers, merchants, and/or
                  contributors of content.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Rust Rocket is a Solana blockchain trading bot service that provides:
                </p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Automated trading and sniping capabilities on the Solana blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Copy trading functionality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Real-time market analysis and trading signals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Portfolio management tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Educational content and trading insights</span>
                  </li>
                </ul>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                <p className="text-gray-300 leading-relaxed mb-4">As a user of Rust Rocket services, you agree to:</p>
                <ul className="text-gray-300 space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Provide accurate and complete information when creating an account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Use the service in compliance with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Not engage in any fraudulent, abusive, or illegal activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Not attempt to reverse engineer, hack, or compromise our systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Take full responsibility for your trading decisions and their consequences</span>
                  </li>
                </ul>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">4. Financial Risk Disclaimer</h2>
                <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                  <p className="text-red-200 font-medium mb-4">
                    IMPORTANT: Trading cryptocurrencies involves substantial risk of loss and is not suitable for all
                    investors.
                  </p>
                  <ul className="text-red-200 space-y-2 ml-6">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Past performance does not guarantee future results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>You may lose some or all of your invested capital</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Cryptocurrency markets are highly volatile and unpredictable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>Our service provides tools and information, but all trading decisions are yours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>We do not provide financial advice or investment recommendations</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">5. Service Availability</h2>
                <p className="text-gray-300 leading-relaxed">
                  We strive to maintain high service availability, but we do not guarantee uninterrupted access to our
                  services. The service may be temporarily unavailable due to maintenance, updates, technical issues, or
                  circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any part of
                  our service at any time.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                  <p className="text-yellow-200 leading-relaxed">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, AXIOM ENTERPRISE GMBH SHALL NOT BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                    PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE,
                    REGARDLESS OF THE THEORY OF LIABILITY.
                  </p>
                </div>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Rust Rocket service and its original content, features, and functionality are and will remain the
                  exclusive property of Axiom Enterprise GmbH and its licensors. The service is protected by copyright,
                  trademark, and other laws. You may not reproduce, distribute, modify, create derivative works of,
                  publicly display, publicly perform, republish, download, store, or transmit any of the material on our
                  service.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">8. Privacy and Data Protection</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference. By using our service, you consent
                  to the collection and use of your information as outlined in our Privacy Policy.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever, including without
                  limitation if you breach the Terms. You may also terminate your account at any time by contacting us.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of Germany, without regard to its conflict
                  of law provisions. Any disputes arising from these Terms or your use of the service shall be subject
                  to the exclusive jurisdiction of the courts of Germany.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  provide at least 30 days notice prior to any new terms taking effect. What constitutes a material
                  change will be determined at our sole discretion. By continuing to access or use our service after any
                  revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section className="bg-background-secondary rounded-xl p-6 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                  <br />
                  <a
                    href="mailto:legal@rust-rocket.com"
                    className="text-primary hover:text-primary-hover transition-colors"
                  >
                    legal@rust-rocket.com
                  </a>
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-800">
                <Link
                  href="/"
                  className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
