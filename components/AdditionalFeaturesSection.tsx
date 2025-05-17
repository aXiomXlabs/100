"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Target, GitBranch, MessageCircle, Shield, Zap, Rocket } from "lucide-react"
import { motion, useInView } from "framer-motion"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
  index: number
}

function FeatureCard({ icon, title, description, accentColor, index }: FeatureProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover:translate-y-[-2px] transition-all duration-300 group h-full"
    >
      <div className={`p-3 rounded-lg ${accentColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors duration-300">
        {title}
      </h4>
      <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">{description}</p>
    </motion.div>
  )
}

export default function AdditionalFeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [showDescription, setShowDescription] = useState(false)

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div
            className="particle particle-orange w-2 h-2 absolute"
            style={{ top: "10%", left: "20%", animationDuration: "15s" }}
          ></div>
          <div
            className="particle particle-green w-3 h-3 absolute"
            style={{ top: "60%", left: "10%", animationDuration: "25s" }}
          ></div>
          <div
            className="particle particle-purple w-2 h-2 absolute"
            style={{ top: "20%", right: "10%", animationDuration: "20s" }}
          ></div>
          <div
            className="particle particle-blue w-3 h-3 absolute"
            style={{ top: "70%", right: "20%", animationDuration: "18s" }}
          ></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Features
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-text-primary cursor-pointer hover:text-primary transition-colors duration-300"
            onClick={() => setShowDescription(!showDescription)}
          >
            More Than Just Speed – A Full <span className="text-gradient">Trading Arsenal</span>
          </h2>

          {showDescription && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="text-text-secondary text-lg"
            >
              Rust Rocket combines cutting-edge technology with user-friendly features to give you the ultimate trading
              advantage on Solana.
            </motion.p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="Pump.fun Specialist"
            description="Configure Rust Rocket to automatically snipe new pump.fun listings with your custom strategy."
            accentColor="bg-primary/10"
            index={0}
          />

          <FeatureCard
            icon={<GitBranch className="h-6 w-6 text-solana-purple" />}
            title="Multi-Route Transactions"
            description="Intelligent order routing for maximum transaction success rates even during network congestion."
            accentColor="bg-solana-purple/10"
            index={1}
          />

          <FeatureCard
            icon={<MessageCircle className="h-6 w-6 text-solana-green" />}
            title="Telegram-Native Interface"
            description="Control all features conveniently and intuitively directly through your Telegram client."
            accentColor="bg-solana-green/10"
            index={2}
          />

          <FeatureCard
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="Security & Reliability"
            description="Developed with a strong focus on stability and the security of your operations (further details forthcoming)."
            accentColor="bg-primary/10"
            index={3}
          />

          <FeatureCard
            icon={<Zap className="h-6 w-6 text-solana-purple" />}
            title="Advanced Trading Algorithms"
            description="Utilize sophisticated trading algorithms that adapt to market conditions for optimal entry and exit points."
            accentColor="bg-solana-purple/10"
            index={4}
          />

          <FeatureCard
            icon={<Rocket className="h-6 w-6 text-solana-green" />}
            title="Customizable Risk Management"
            description="Set your own risk parameters including stop-loss, take-profit, and maximum allocation per trade."
            accentColor="bg-solana-green/10"
            index={5}
          />
        </div>

        {/* Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-gradient"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 0%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              Roadmap
            </motion.span>
            : The Future of Rust Rocket
          </motion.h3>

          <div className="relative">
            {/* Vertical line for timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-solana-purple to-solana-green"></div>

            {/* Q2 - Telegram Launch */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative mb-16 md:mb-24"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <div className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow text-center">
                    <h4 className="text-xl font-bold text-primary mb-2">Q2 2025</h4>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">Launch via Telegram</h5>
                    <motion.div
                      className="w-24 h-24 mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-primary"
                      >
                        <motion.path
                          d="M21.5 4.5L2.5 12.5L11.5 14.5L14.5 21.5L21.5 4.5Z"
                          fill="rgba(138, 226, 52, 0.2)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        ></motion.path>
                        <motion.path
                          d="M11.5 14.5L16.5 9.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: 0.8 }}
                        ></motion.path>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-background"
                  >
                    <path d="M21.5 4.5L2.5 12.5L11.5 14.5L14.5 21.5L21.5 4.5Z"></path>
                    <path d="M11.5 14.5L16.5 9.5"></path>
                  </svg>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </motion.div>

            {/* Q3 - Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative mb-16 md:mb-24"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-solana-purple flex items-center justify-center z-10 border-4 border-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-background"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left">
                  <div className="glass-card p-6 border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-300 hover:shadow-glow-purple text-center">
                    <h4 className="text-xl font-bold text-solana-purple mb-2">Q3 2025</h4>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">Advanced Dashboard</h5>
                    <motion.div
                      className="w-24 h-24 mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-solana-purple"
                      >
                        <motion.rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          fill="rgba(153, 69, 255, 0.2)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1 }}
                        ></motion.rect>
                        <motion.line
                          x1="3"
                          y1="9"
                          x2="21"
                          y2="9"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                        ></motion.line>
                        <motion.line
                          x1="9"
                          y1="21"
                          x2="9"
                          y2="9"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                        ></motion.line>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Q3 - Sniping */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="relative mb-16 md:mb-24"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <div className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow text-center">
                    <h4 className="text-xl font-bold text-primary mb-2">Q3 2025</h4>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">Advanced Sniping</h5>
                    <motion.div
                      className="w-24 h-24 mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-primary"
                      >
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="rgba(138, 226, 52, 0.2)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        ></motion.circle>
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="6"
                          fill="rgba(138, 226, 52, 0.1)"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        ></motion.circle>
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                        ></motion.circle>
                        <motion.line
                          x1="22"
                          y1="12"
                          x2="18"
                          y2="12"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        ></motion.line>
                        <motion.line
                          x1="6"
                          y1="12"
                          x2="2"
                          y2="12"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                        ></motion.line>
                        <motion.line
                          x1="12"
                          y1="6"
                          x2="12"
                          y2="2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        ></motion.line>
                        <motion.line
                          x1="12"
                          y1="22"
                          x2="12"
                          y2="18"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 1.1 }}
                        ></motion.line>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 border-4 border-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-background"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="22" y1="12" x2="18" y2="12"></line>
                    <line x1="6" y1="12" x2="2" y2="12"></line>
                    <line x1="12" y1="6" x2="12" y2="2"></line>
                    <line x1="12" y1="22" x2="12" y2="18"></line>
                  </svg>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </motion.div>

            {/* Q3 - Web Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="relative mb-16 md:mb-24"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-solana-purple flex items-center justify-center z-10 border-4 border-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-background"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left">
                  <div className="glass-card p-6 border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-300 hover:shadow-glow-purple text-center">
                    <h4 className="text-xl font-bold text-solana-purple mb-2">Q3 2025</h4>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">Web Interface</h5>
                    <motion.div
                      className="w-24 h-24 mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-solana-purple"
                      >
                        <motion.rect
                          x="2"
                          y="3"
                          width="20"
                          height="14"
                          rx="2"
                          ry="2"
                          fill="rgba(153, 69, 255, 0.2)"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        ></motion.rect>
                        <motion.line
                          x1="8"
                          y1="21"
                          x2="16"
                          y2="21"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        ></motion.line>
                        <motion.line
                          x1="12"
                          y1="17"
                          x2="12"
                          y2="21"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                        ></motion.line>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Q4 - Mobile Apps */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <div className="glass-card p-6 border-solana-green/20 hover:border-solana-green/40 transition-all duration-300 hover:shadow-glow-green text-center">
                    <h4 className="text-xl font-bold text-solana-green mb-2">Q4 2025</h4>
                    <h5 className="text-lg font-semibold text-text-primary mb-4">iOS & Android Apps</h5>
                    <motion.div
                      className="w-24 h-24 mx-auto"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full text-solana-green"
                      >
                        <motion.rect
                          x="5"
                          y="2"
                          width="14"
                          height="20"
                          rx="2"
                          ry="2"
                          fill="rgba(138, 226, 52, 0.2)"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                        ></motion.rect>
                        <motion.line
                          x1="12"
                          y1="18"
                          x2="12.01"
                          y2="18"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        ></motion.line>
                        <motion.path
                          d="M8 2v2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                        ></motion.path>
                        <motion.path
                          d="M16 2v2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        ></motion.path>
                        <motion.circle
                          cx="12"
                          cy="10"
                          r="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        ></motion.circle>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-solana-green flex items-center justify-center z-10 border-4 border-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-background"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
            </motion.div>
          </div>

          {/* Future hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-text-secondary text-lg italic">
              And this is just the beginning...{" "}
              <span className="text-primary">Stay tuned for more exciting features!</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
