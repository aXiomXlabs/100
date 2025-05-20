"use client"

import { useRef, useState } from "react"
import { Search, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import WaitlistButton from "./WaitlistButton"
import CopyTradingDataFlowAnimation from "./CopyTradingDataFlowAnimation"
import CopyTradingAnimation from "./CopyTradingAnimation"

export default function CopyTradingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [showDescription, setShowDescription] = useState(false)

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
                animate={
                  isInView
                    ? { scale: 1, opacity: 1, filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  filter: {
                    times: [0, 0.5, 1],
                    duration: 2,
                    repeat: 0,
                    repeatType: "reverse",
                  },
                }}
                className="w-full h-full flex items-center justify-center relative"
              >
                {/* Copy Trading Animation */}
                <div className="w-full h-full relative">
                  {/* Background elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-background-secondary to-background-secondary/80 z-0"></div>

                  {/* Connection lines */}
                  <svg
                    className="absolute inset-0 w-full h-full z-10"
                    viewBox="0 0 400 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Pro Trader to You connections */}
                    <motion.path
                      d="M 80,50 C 180,50 220,100 320,50"
                      stroke="#8AE234"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{
                        duration: 2,
                        delay: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                      }}
                    />
                    <motion.path
                      d="M 80,100 C 180,100 220,100 320,100"
                      stroke="#9B59D0"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{
                        duration: 2,
                        delay: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                      }}
                    />
                    <motion.path
                      d="M 80,150 C 180,150 220,100 320,150"
                      stroke="#8AE234"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{
                        duration: 2,
                        delay: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                      }}
                    />

                    {/* Animated trade packets */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill="#8AE234"
                      initial={{ cx: 80, cy: 50, opacity: 0 }}
                      animate={{
                        cx: [80, 200, 320],
                        cy: [50, 75, 50],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                        times: [0, 0.5, 1],
                      }}
                    />
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill="#9B59D0"
                      initial={{ cx: 80, cy: 100, opacity: 0 }}
                      animate={{
                        cx: [80, 200, 320],
                        cy: [100, 100, 100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.7,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                        times: [0, 0.5, 1],
                      }}
                    />
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill="#8AE234"
                      initial={{ cx: 80, cy: 150, opacity: 0 }}
                      animate={{
                        cx: [80, 200, 320],
                        cy: [150, 125, 150],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 2.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        repeatDelay: 3,
                        times: [0, 0.5, 1],
                      }}
                    />
                  </svg>

                  {/* Pro Traders */}
                  <div className="absolute left-[15%] top-[20%] z-20">
                    <motion.div
                      className="bg-background-tertiary p-3 rounded-lg border border-solana-purple/30 shadow-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="text-xs font-medium text-solana-purple mb-1">PRO TRADER</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-solana-purple"></div>
                        <div className="text-sm font-medium">Wallet #1</div>
                      </div>
                      <div className="text-xs text-text-tertiary mt-1">+42.3% 7d</div>
                    </motion.div>
                  </div>

                  <div className="absolute left-[15%] top-[45%] z-20">
                    <motion.div
                      className="bg-background-tertiary p-3 rounded-lg border border-primary/30 shadow-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="text-xs font-medium text-primary mb-1">PRO TRADER</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="text-sm font-medium">Wallet #2</div>
                      </div>
                      <div className="text-xs text-text-tertiary mt-1">+28.7% 7d</div>
                    </motion.div>
                  </div>

                  <div className="absolute left-[15%] top-[70%] z-20">
                    <motion.div
                      className="bg-background-tertiary p-3 rounded-lg border border-solana-green/30 shadow-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="text-xs font-medium text-solana-green mb-1">PRO TRADER</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-solana-green"></div>
                        <div className="text-sm font-medium">Wallet #3</div>
                      </div>
                      <div className="text-xs text-text-tertiary mt-1">+35.1% 7d</div>
                    </motion.div>
                  </div>

                  {/* Your Wallet */}
                  <div className="absolute right-[15%] top-[45%] z-20">
                    <motion.div
                      className="bg-background-tertiary p-4 rounded-lg border border-solana-green/30 shadow-lg"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        boxShadow: [
                          "0 0 0 rgba(138, 226, 52, 0)",
                          "0 0 15px rgba(138, 226, 52, 0.3)",
                          "0 0 0 rgba(138, 226, 52, 0)",
                        ],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8,
                        boxShadow: {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          repeatDelay: 1,
                        },
                      }}
                    >
                      <div className="text-xs font-medium text-solana-green mb-1">YOUR WALLET</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-solana-green"></div>
                        <div className="text-sm font-medium">Auto-Copy</div>
                      </div>
                      <div className="text-xs text-solana-green mt-2">+35.4% 7d</div>
                      <motion.div
                        className="text-xs mt-2 bg-solana-green/10 text-solana-green px-2 py-1 rounded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 3,
                          delay: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          repeatDelay: 2,
                          times: [0, 0.1, 0.9, 1],
                        }}
                      >
                        Trade copied successfully
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="text-sm font-medium text-text-secondary bg-background-secondary/80 px-3 py-1 rounded-full inline-block mb-2">
                        Copy Trading in Action
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Add a subtle glow effect behind the image */}
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
                Other bots like Maestro, Bonk Bot, or Trojan might offer sniping, but only Rust Rocket empowers you with
                true Copy Trading – your definitive advantage.
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
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
                  <div>
                    <h4 className="font-medium text-text-primary">Real-Time Tracking</h4>
                    <p className="text-text-secondary text-sm">
                      Monitor top wallets 24/7 without missing a single trade
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="glass-card p-4 border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
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
                  <div>
                    <h4 className="font-medium text-text-primary">Performance Analytics</h4>
                    <p className="text-text-secondary text-sm">
                      Detailed metrics on each wallet's trading history and success rate
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="glass-card p-4 border-solana-green/20 hover:border-solana-green/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-solana-green/10 text-solana-green">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
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
                  <div>
                    <h4 className="font-medium text-text-primary">Customizable Parameters</h4>
                    <p className="text-text-secondary text-sm">Set your own risk tolerance and trading preferences</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 glass-card p-6 border-gray-800/50"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-solana-purple flex-shrink-0"
                  aria-hidden="true"
                ></div>
                <div>
                  <p className="text-text-secondary italic mb-2" itemProp="reviewBody">
                    "Rust Rocket's copy trading feature has completely transformed my trading experience. I've seen a
                    300% increase in my portfolio in just two weeks."
                  </p>
                  <p className="text-text-primary font-medium" itemProp="author">
                    Alex K.
                  </p>
                  <p className="text-text-tertiary text-sm">Early Beta Tester</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <WaitlistButton
                id="copy-trading-waitlist-button"
                data-tracking-id="copy_trading_waitlist_click"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors group"
              >
                <span>Learn more about our copy trading features</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </WaitlistButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
