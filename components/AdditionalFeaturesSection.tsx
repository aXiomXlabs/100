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
      className="glass-card p-4 sm:p-6 hover:translate-y-[-2px] transition-all duration-300 group h-full"
    >
      <div
        className={`p-2 sm:p-3 rounded-lg ${accentColor} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-text-primary group-hover:text-primary transition-colors duration-300">
        {title}
      </h4>
      <p className="text-sm sm:text-base text-text-secondary group-hover:text-text-primary transition-colors duration-300">
        {description}
      </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
      </div>
    </section>
  )
}
