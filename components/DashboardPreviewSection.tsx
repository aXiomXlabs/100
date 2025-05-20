"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
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

                  {/* Bottom metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {["Total Profit", "Win Rate", "Avg. Hold Time"].map((label, i) => (
                      <div key={i} className="p-3 rounded-lg bg-background border border-border">
                        <div className="text-xs text-text-secondary mb-1">{label}</div>
                        <div className="text-sm font-bold text-text-primary flex items-center">
                          {i === 0 && "+$"}
                          {i === 0 ? "12,438" : i === 1 ? "87.5%" : "1.4h"}
                          {i === 1 && <span className="ml-1 text-xs text-solana-green">↑4.2%</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlay gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-tertiary to-transparent opacity-10 pointer-events-none"></div>

                {/* Add custom animation styles */}
                <style jsx>{`
                  @keyframes drawLine {
                    0% { stroke-dashoffset: 1000; }
                    100% { stroke-dashoffset: 0; }
                  }
                  
                  @keyframes fillArea {
                    0% { opacity: 0; }
                    60% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                  
                  @keyframes pulseSlow {
                    0% { r: 4; opacity: 1; }
                    50% { r: 6; opacity: 0.7; }
                    100% { r: 4; opacity: 1; }
                  }
                  
                  .animate-draw-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: drawLine 3s ease-in-out forwards;
                  }
                  
                  .animate-fill-area {
                    opacity: 0;
                    animation: fillArea 3s ease-in-out forwards;
                  }
                  
                  .animate-pulse-slow {
                    animation: pulseSlow 2s infinite;
                  }
                `}</style>
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
