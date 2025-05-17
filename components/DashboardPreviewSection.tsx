"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function DashboardPreviewSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [showDescription, setShowDescription] = useState(false)

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="dashboard-preview">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-solana-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-solana-blue mr-2"></span>
            Dashboard Preview
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-text-primary cursor-pointer hover:text-solana-blue transition-colors duration-300"
            onClick={() => setShowDescription(!showDescription)}
          >
            Discover Top Traders & Hot Meme Coins: Your <span className="text-gradient">Rust Rocket</span> Dashboard
          </h2>

          {showDescription && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="text-text-secondary text-lg"
            >
              This page shows a <span className="text-primary font-semibold">demo with sample data</span> of how Rust
              Rocket will help you identify the most profitable wallets on Solana. Filter, analyze, and choose who to
              copy.
            </motion.p>
          )}
        </motion.div>

        {/* Dashboard Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-primary/5 glass-card"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
            <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
              <div className="animate-subtle-zoom">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Rust Rocket Advanced Trading Dashboard"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
              <div className="gradient-overlay"></div>
            </div>
          </div>
        </motion.div>

        {/* Features highlight */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Real-Time Analytics</h4>
              <p className="text-text-secondary">Track wallet performance and market trends as they happen</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 hover:border-solana-purple/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-solana-purple/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-solana-purple"
                >
                  <path
                    d="M22 12H18L15 21L9 3L6 12H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Performance Metrics</h4>
              <p className="text-text-secondary">Detailed statistics on wallet performance and trading patterns</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 hover:border-solana-green/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-solana-green/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-solana-green"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9H9.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 9H15.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Customizable Interface</h4>
              <p className="text-text-secondary">Personalize your dashboard to focus on what matters to you</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors group"
          >
            <span>Get early access to the full dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
