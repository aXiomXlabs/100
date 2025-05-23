"use client"

import { useRef, useState } from "react"
import { Search, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import CopyTradingDataFlowAnimation from "./CopyTradingDataFlowAnimation"
import CopyTradingAnimation from "./CopyTradingAnimation"

export default function CopyTradingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [showDescription, setShowDescription] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="copy-trading"
      aria-labelledby="copy-trading-heading"
      itemScope
      itemType="http://schema.org/WebPageElement"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-solana-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Add the animated visualization at the top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <CopyTradingAnimation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-solana-purple mr-2" aria-hidden="true"></span>
            Copy Trading
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-text-primary cursor-pointer hover:text-solana-purple transition-colors duration-300"
            id="copy-trading-heading"
            itemProp="headline"
            onClick={() => setShowDescription(!showDescription)}
          >
            Stop Guessing, Start Copying: <span className="text-gradient">Intelligent Copy Trading</span>
          </h2>

          {showDescription && (
            <>
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="text-text-secondary text-lg mb-6"
                itemProp="description"
              >
                Why spend hours analyzing wallets when Rust Rocket can find top performers and
                <span className="text-primary font-semibold"> automatically</span> execute their trades for you,
                <span className="text-primary font-semibold"> lightning-fast</span>?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8 rounded-lg overflow-hidden shadow-lg"
              >
                <CopyTradingDataFlowAnimation />
              </motion.div>
            </>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-500"
          >
            <h3 className="text-xl font-semibold mb-8 text-center text-text-primary">How Copy Trading Works</h3>

            <div className="space-y-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-purple/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-solana-purple" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Pro Wallet Identification</h4>
                  <p className="text-text-secondary text-sm">
                    Our system identifies and tracks top-performing wallets in real-time
                  </p>
                </div>
              </motion.div>

              {/* Connector Line */}
              <div
                className="w-0.5 h-8 bg-gradient-to-b from-solana-purple to-primary mx-auto"
                aria-hidden="true"
              ></div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Instant Analysis & Execution</h4>
                  <p className="text-text-secondary text-sm">
                    Our algorithm instantly analyzes and executes the same trades with precision
                  </p>
                </div>
              </motion.div>

              {/* Connector Line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-solana-green mx-auto" aria-hidden="true"></div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-green/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-solana-green" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Profit Generation</h4>
                  <p className="text-text-secondary text-sm">
                    You benefit from professional trading strategies without the work
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 relative"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-full h-64 flex items-center justify-center relative bg-gradient-to-br from-background-secondary via-background-secondary to-background-secondary/80 rounded-xl overflow-hidden"
              >
                {/* Copy Trading Dashboard Mockup */}
                <div className="w-full h-full relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-primary"></div>
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary">Copy Trading Dashboard</h4>
                        <p className="text-xs text-text-secondary">Real-time performance</p>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 px-2 py-1 rounded-full bg-background-secondary/80 border border-transparent hover:border-solana-green/30 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-solana-green animate-pulse"></div>
                      <span className="text-xs text-solana-green font-medium">Live</span>
                    </motion.div>
                  </div>

                  {/* Performance Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <motion.div
                      className={`bg-background-tertiary p-3 rounded-lg border border-solana-green/20 transition-all duration-300 cursor-pointer ${expandedCard === 0 ? "ring-2 ring-solana-green" : "hover:border-solana-green/50 hover:shadow-lg hover:shadow-solana-green/10"}`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-xs text-text-secondary mb-1">Total Profit</div>
                      <div className="text-lg font-bold text-solana-green">+$12,847</div>
                      <div className="text-xs text-solana-green">+34.2%</div>
                      {expandedCard === 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 pt-2 border-t border-solana-green/20"
                        >
                          <div className="text-xs text-text-secondary">
                            Last 24h: <span className="text-solana-green">+$1,240</span>
                          </div>
                          <div className="text-xs text-text-secondary">
                            Last 7d: <span className="text-solana-green">+$5,632</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className={`bg-background-tertiary p-3 rounded-lg border border-primary/20 transition-all duration-300 cursor-pointer ${expandedCard === 1 ? "ring-2 ring-primary" : "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"}`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-xs text-text-secondary mb-1">Active Copies</div>
                      <div className="text-lg font-bold text-primary">23</div>
                      <div className="text-xs text-text-secondary">Wallets</div>
                      {expandedCard === 1 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 pt-2 border-t border-primary/20"
                        >
                          <div className="text-xs text-text-secondary">
                            Top Performer: <span className="text-primary">Wallet #8</span>
                          </div>
                          <div className="text-xs text-text-secondary">
                            New Today: <span className="text-primary">+3</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className={`bg-background-tertiary p-3 rounded-lg border border-solana-purple/20 transition-all duration-300 cursor-pointer ${expandedCard === 2 ? "ring-2 ring-solana-purple" : "hover:border-solana-purple/50 hover:shadow-lg hover:shadow-solana-purple/10"}`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-xs text-text-secondary mb-1">Win Rate</div>
                      <div className="text-lg font-bold text-solana-purple">87%</div>
                      <div className="text-xs text-text-secondary">Success</div>
                      {expandedCard === 2 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 pt-2 border-t border-solana-purple/20"
                        >
                          <div className="text-xs text-text-secondary">
                            Trades: <span className="text-solana-purple">142 total</span>
                          </div>
                          <div className="text-xs text-text-secondary">
                            Avg. Hold: <span className="text-solana-purple">3.2h</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Recent Trades */}
                  <div className="space-y-2 relative">
                    <div className="text-xs font-medium text-text-secondary mb-2">Recent Copy Trades</div>

                    <motion.div
                      className={`flex items-center justify-between p-2 bg-background-tertiary/50 rounded border transition-all duration-300 cursor-pointer ${selectedTrade === 0 ? "border-solana-green ring-1 ring-solana-green" : "border-solana-green/10 hover:border-solana-green/30 hover:bg-background-tertiary"}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      onClick={() => setSelectedTrade(selectedTrade === 0 ? null : 0)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-solana-green to-primary flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-text-primary">BONK/SOL</div>
                          <div className="text-xs text-text-secondary">Copied from Pro Trader #1</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-solana-green">+$247</div>
                        <div className="text-xs text-text-secondary">2m ago</div>
                      </div>
                      {selectedTrade === 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="absolute left-0 right-0 top-full mt-1 p-2 bg-background-tertiary rounded-b border border-solana-green/20 z-10"
                        >
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-text-secondary">
                              Entry Price: <span className="text-text-primary">0.00000124 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Exit Price: <span className="text-text-primary">0.00000152 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Amount: <span className="text-text-primary">2,500,000 BONK</span>
                            </div>
                            <div className="text-text-secondary">
                              Profit: <span className="text-solana-green">+22.58%</span>
                            </div>
                          </div>
                          <div className="mt-1 pt-1 border-t border-solana-green/10 flex justify-end">
                            <button className="text-xs text-solana-green hover:underline">View Transaction</button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className={`flex items-center justify-between p-2 bg-background-tertiary/50 rounded border transition-all duration-300 cursor-pointer ${selectedTrade === 1 ? "border-primary ring-1 ring-primary" : "border-primary/10 hover:border-primary/30 hover:bg-background-tertiary"}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                      onClick={() => setSelectedTrade(selectedTrade === 1 ? null : 1)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-solana-purple flex items-center justify-center">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-text-primary">WIF/SOL</div>
                          <div className="text-xs text-text-secondary">Copied from Pro Trader #2</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-solana-green">+$156</div>
                        <div className="text-xs text-text-secondary">5m ago</div>
                      </div>
                      {selectedTrade === 1 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="absolute left-0 right-0 top-full mt-1 p-2 bg-background-tertiary rounded-b border border-primary/20 z-10"
                        >
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-text-secondary">
                              Entry Price: <span className="text-text-primary">0.00000342 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Exit Price: <span className="text-text-primary">0.00000398 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Amount: <span className="text-text-primary">1,200,000 WIF</span>
                            </div>
                            <div className="text-text-secondary">
                              Profit: <span className="text-solana-green">+16.37%</span>
                            </div>
                          </div>
                          <div className="mt-1 pt-1 border-t border-primary/10 flex justify-end">
                            <button className="text-xs text-primary hover:underline">View Transaction</button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className={`flex items-center justify-between p-2 bg-background-tertiary/50 rounded border transition-all duration-300 cursor-pointer ${selectedTrade === 2 ? "border-solana-purple ring-1 ring-solana-purple" : "border-solana-purple/10 hover:border-solana-purple/30 hover:bg-background-tertiary"}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 2 }}
                      onClick={() => setSelectedTrade(selectedTrade === 2 ? null : 2)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-text-primary">PEPE/SOL</div>
                          <div className="text-xs text-text-secondary">Copied from Pro Trader #3</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-solana-green">+$89</div>
                        <div className="text-xs text-text-secondary">8m ago</div>
                      </div>
                      {selectedTrade === 2 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="absolute left-0 right-0 top-full mt-1 p-2 bg-background-tertiary rounded-b border border-solana-purple/20 z-10"
                        >
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-text-secondary">
                              Entry Price: <span className="text-text-primary">0.00000089 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Exit Price: <span className="text-text-primary">0.00000102 SOL</span>
                            </div>
                            <div className="text-text-secondary">
                              Amount: <span className="text-text-primary">3,800,000 PEPE</span>
                            </div>
                            <div className="text-text-secondary">
                              Profit: <span className="text-solana-green">+14.61%</span>
                            </div>
                          </div>
                          <div className="mt-1 pt-1 border-t border-solana-purple/10 flex justify-end">
                            <button className="text-xs text-solana-purple hover:underline">View Transaction</button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  className="absolute top-4 right-4 bg-solana-green/10 border border-solana-green/30 rounded-lg p-2 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    delay: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-solana-green animate-pulse"></div>
                    <span className="text-xs text-solana-green font-medium">New trade copied!</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Add a subtle glow effect behind the dashboard */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 0.7, 0.5] } : { opacity: 0 }}
                transition={{
                  duration: 2,
                  times: [0, 0.5, 1],
                  delay: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -inset-4 bg-gradient-to-r from-solana-purple/20 via-primary/20 to-solana-green/20 rounded-xl blur-xl -z-10"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-text-primary text-lg">
                While other trading bots focus solely on sniping, Rust Rocket empowers you with intelligent Copy Trading
                – your definitive advantage in the market.
              </p>

              <p className="text-text-secondary">
                Our system identifies wallets with proven success and automatically executes their trades for you with
                lightning speed.
              </p>
            </div>

            {/* Feature cards */}
            <div className="space-y-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="glass-card p-4 border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-solana-purple/10 text-solana-purple">
                    <Search className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Feature Title</h4>
                    <p className="text-text-secondary">Feature description goes here.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
