"use client"

import { useRef, useState } from "react"
import { Search, Zap, TrendingUp, Users, Target, Shield, Rocket } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/useMobile"

export default function CopyTradingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [selectedTrade, setSelectedTrade] = useState<number | null>(null)

  const isMobile = useMobile()

  const features = [
    {
      icon: Search,
      title: "Smart Wallet Discovery",
      description: "AI-powered identification of top-performing wallets with proven track records",
      color: "solana-purple",
      stats: "200+ Pro Wallets Tracked",
    },
    {
      icon: Zap,
      title: "Lightning Execution",
      description: "Copy trades in under 25ms with our advanced execution engine",
      color: "primary",
      stats: "25ms Average Speed",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Built-in protection against MEV attacks and failed transactions",
      color: "solana-green",
      stats: "99.7% Success Rate",
    },
    {
      icon: Target,
      title: "Precision Copying",
      description: "Exact replication of successful trading strategies with customizable parameters",
      color: "blue-500",
      stats: "1:1 Trade Accuracy",
    },
  ]

  const recentTrades = [
    {
      token: "BONK/SOL",
      trader: "Pro Trader #1",
      profit: "+$2,847",
      percentage: "+34.2%",
      time: "2m ago",
      color: "solana-green",
    },
    {
      token: "WIF/SOL",
      trader: "Pro Trader #2",
      profit: "+$1,563",
      percentage: "+28.7%",
      time: "5m ago",
      color: "primary",
    },
    {
      token: "PEPE/SOL",
      trader: "Pro Trader #3",
      profit: "+$892",
      percentage: "+19.4%",
      time: "8m ago",
      color: "solana-purple",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="copy-trading"
      aria-labelledby="copy-trading-heading"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-solana-green/10 to-primary/10 rounded-full ${isMobile ? "blur-xl" : "blur-3xl"} ${isMobile ? "" : "animate-pulse"}`}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-solana-purple/10 to-blue-500/10 rounded-full ${isMobile ? "blur-xl" : "blur-3xl"} ${isMobile ? "" : "animate-pulse delay-1000"}`}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-primary/5 to-solana-green/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-solana-purple/20 to-primary/20 border border-solana-purple/30 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2 text-solana-purple" />
            <span className="bg-gradient-to-r from-solana-purple to-primary bg-clip-text text-transparent">
              Intelligent Copy Trading
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" id="copy-trading-heading">
            <span className="text-white">Stop Guessing,</span>
            <br />
            <span className="bg-gradient-to-r from-solana-green via-primary to-solana-purple bg-clip-text text-transparent">
              Start Copying Winners
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Why spend hours analyzing when you can automatically copy the strategies of
            <span className="text-solana-green font-semibold"> top-performing traders</span> with
            <span className="text-primary font-semibold"> lightning speed</span>?
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-solana-green animate-pulse"></div>
              <span className="text-gray-400">200+ Pro Wallets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
              <span className="text-gray-400">25ms Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-solana-purple animate-pulse delay-700"></div>
              <span className="text-gray-400">99.7% Success Rate</span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: isMobile ? 0.4 : 0.6,
                  delay: isMobile ? Math.min(0.2, 0.05 * index) : 0.1 * index,
                }}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`
                  relative p-6 rounded-2xl border transition-all duration-500
                  ${
                    activeFeature === index
                      ? `border-${feature.color}/50 bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 shadow-lg shadow-${feature.color}/20`
                      : "border-gray-800 bg-background-secondary/50 hover:border-gray-700"
                  }
                `}
                >
                  <div
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500
                    ${
                      activeFeature === index
                        ? `bg-${feature.color}/20 text-${feature.color}`
                        : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                    }
                  `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>

                  <div
                    className={`
                    text-xs font-medium px-3 py-1 rounded-full inline-block transition-all duration-500
                    ${
                      activeFeature === index
                        ? `bg-${feature.color}/20 text-${feature.color}`
                        : "bg-gray-800 text-gray-400"
                    }
                  `}
                  >
                    {feature.stats}
                  </div>

                  {/* Animated border */}
                  <div
                    className={`
                    absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none
                    ${activeFeature === index ? `ring-2 ring-${feature.color}/30` : ""}
                  `}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Real-Time Copy Trading Dashboard</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Monitor your copy trading performance with our advanced dashboard featuring live updates, detailed
              analytics, and comprehensive trade history.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Dashboard Container */}
            <div className="relative bg-gradient-to-br from-background-secondary via-background-secondary to-background-tertiary rounded-3xl p-8 border border-gray-800 shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-solana-purple to-primary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Copy Trading Hub</h4>
                    <p className="text-gray-400 text-sm">Live Performance Tracking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-solana-green/20 border border-solana-green/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-2 h-2 rounded-full bg-solana-green animate-pulse"></div>
                    <span className="text-solana-green font-medium text-sm"></span>
                  </motion.div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="bg-gradient-to-br from-solana-green/10 to-solana-green/5 rounded-2xl p-6 border border-solana-green/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-solana-green" />
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">24h</span>
                  </div>
                  <div className="text-3xl font-bold text-solana-green mb-1">+$18,247</div>
                  <div className="text-sm text-gray-400">Total Profit</div>
                  <div className="text-xs text-solana-green mt-2">+42.8% ↗</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-primary" />
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">47</div>
                  <div className="text-sm text-gray-400">Copied Wallets</div>
                  <div className="text-xs text-primary mt-2">+12 today ↗</div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-solana-purple/10 to-solana-purple/5 rounded-2xl p-6 border border-solana-purple/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-solana-purple" />
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Win Rate</span>
                  </div>
                  <div className="text-3xl font-bold text-solana-purple mb-1">94.2%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                  <div className="text-xs text-solana-purple mt-2">+2.1% ↗</div>
                </motion.div>
              </div>

              {/* Recent Trades */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-lg font-semibold text-white">Recent Copy Trades</h5>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{
                        duration: isMobile ? 0.3 : 0.5,
                        delay: isMobile ? 0.3 + index * 0.05 : 0.6 + index * 0.1,
                      }}
                      className={`
                        flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer
                        ${
                          selectedTrade === index
                            ? `border-${trade.color}/50 bg-${trade.color}/5`
                            : "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900"
                        }
                      `}
                      onClick={() => setSelectedTrade(selectedTrade === index ? null : index)}
                      whileHover={isMobile ? {} : { scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-r from-${trade.color} to-${trade.color}/70 flex items-center justify-center`}
                        >
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{trade.token}</div>
                          <div className="text-sm text-gray-400">{trade.trader}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-bold text-${trade.color}`}>{trade.profit}</div>
                        <div className="text-sm text-gray-400">{trade.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating notification removed */}
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-solana-purple/20 via-primary/20 to-solana-green/20 rounded-3xl blur-2xl opacity-50 -z-10" />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are already profiting from intelligent copy trading. Start copying the best
            performers today.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
