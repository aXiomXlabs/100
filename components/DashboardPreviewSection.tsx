"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

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
              <div className="relative w-full h-full">
                {/* Animated Dashboard Visualization */}
                <div className="absolute inset-0 bg-background-tertiary flex flex-col p-4">
                  {/* Header with metrics */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-solana-green/20 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#8AE234"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 6V12L16 14"
                            stroke="#8AE234"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-text-primary">Rust Rocket Dashboard</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-solana-green/10 rounded text-xs font-medium text-solana-green animate-pulse">
                        LIVE
                      </div>
                      <div className="px-2 py-1 bg-background rounded text-xs font-medium text-text-secondary">24h</div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex flex-1 space-x-4">
                    {/* Left column - Wallets */}
                    <div className="w-1/3 flex flex-col space-y-3">
                      <div className="text-xs font-medium text-text-secondary mb-1">TOP WALLETS</div>

                      {/* Wallet items with animation */}
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border border-border ${i === 1 ? "bg-solana-green/5" : "bg-background"} flex items-center justify-between`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-6 h-6 rounded-full ${i === 1 ? "bg-solana-green/20" : "bg-solana-purple/20"} flex items-center justify-center text-xs font-bold`}
                            >
                              {i}
                            </div>
                            <div className="text-xs font-medium text-text-primary">Wallet {i}</div>
                          </div>
                          <div className="text-xs font-medium text-solana-green">
                            +{(Math.random() * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right column - Chart */}
                    <div className="w-2/3 flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-medium text-text-secondary">PERFORMANCE</div>
                        <div className="text-xs font-medium text-solana-green">+42.3%</div>
                      </div>

                      {/* Animated chart */}
                      <div className="flex-1 relative">
                        <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8AE234" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#8AE234" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Chart background grid */}
                          <g className="chart-grid">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={i}
                                x1="0"
                                y1={i * 50}
                                x2="400"
                                y2={i * 50}
                                stroke="#2A2D3A"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                              />
                            ))}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={i}
                                x1={i * 100}
                                y1="0"
                                x2={i * 100}
                                y2="200"
                                stroke="#2A2D3A"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                              />
                            ))}
                          </g>

                          {/* Animated chart line */}
                          <g className="chart-line">
                            <path
                              d="M0,150 C50,140 100,160 150,120 C200,80 250,100 300,60 C350,40 400,20 400,20"
                              fill="none"
                              stroke="#8AE234"
                              strokeWidth="2"
                              className="animate-draw-line"
                            />

                            {/* Area under the line */}
                            <path
                              d="M0,150 C50,140 100,160 150,120 C200,80 250,100 300,60 C350,40 400,20 400,20 L400,200 L0,200 Z"
                              fill="url(#chartGradient)"
                              className="animate-fill-area"
                            />

                            {/* Animated data point */}
                            <circle cx="300" cy="60" r="4" fill="#8AE234" className="animate-pulse-slow" />
                          </g>
                        </svg>

                        {/* Time labels */}
                        <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs text-text-secondary">
                          <span>00:00</span>
                          <span>06:00</span>
                          <span>12:00</span>
                          <span>18:00</span>
                          <span>24:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
