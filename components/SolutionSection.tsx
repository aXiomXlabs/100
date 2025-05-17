"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Rocket, BarChart3, Shield } from "lucide-react"
import { motion, useInView } from "framer-motion"
import SolanaDataFlowAnimation from "./SolanaDataFlowAnimation"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  index: number
}

function FeatureCard({ icon, title, description, color, index }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card p-6 hover:${color} transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-lg ${color.replace("border-", "bg-").replace("/30", "/10")} ${color.replace("border-", "text-").replace("/30", "")} group-hover:${color.replace("border-", "bg-").replace("/30", "/20")} transition-all duration-300`}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <h3
            className={`text-lg font-semibold mb-2 text-text-primary group-hover:${color.replace("border-", "text-").replace("/30", "")} transition-colors duration-300`}
          >
            {title}
          </h3>
          <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function SolutionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [showDescription, setShowDescription] = useState(false)

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="solution">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl"></div>

        {/* Particle effect */}
        <div className="absolute inset-0">
          <div
            className="particle particle-orange w-2 h-2 absolute"
            style={{ top: "20%", left: "10%", animationDuration: "15s" }}
          ></div>
          <div
            className="particle particle-green w-3 h-3 absolute"
            style={{ top: "70%", left: "20%", animationDuration: "25s" }}
          ></div>
          <div
            className="particle particle-purple w-2 h-2 absolute"
            style={{ top: "30%", right: "20%", animationDuration: "20s" }}
          ></div>
          <div
            className="particle particle-blue w-3 h-3 absolute"
            style={{ top: "80%", right: "10%", animationDuration: "18s" }}
          ></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Gesamtes Grid-Layout auf eine Spalte geändert */}
        <div className="max-w-3xl mx-auto">
          {/* Text content */}
          <div className="flex flex-col">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-solana-green mr-2"></span>
                The Solution
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-text-primary cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => setShowDescription(!showDescription)}
              >
                Rust Rocket – <span className="text-gradient">25 ms Solana Sniper Bot</span> inside Telegram
              </h2>

              {showDescription && (
                <>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="text-text-secondary text-lg mb-6"
                  >
                    Same-block execution on Pump.fun & Raydium, intelligent copy-trading and rug-pull protection – all
                    in a single chat.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8 rounded-lg overflow-hidden shadow-lg"
                  >
                    <SolanaDataFlowAnimation />
                  </motion.div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <FeatureCard
                icon={<Rocket className="h-6 w-6" />}
                title="Same-Block Execution on Pump.fun"
                description="Execute trades in the exact same Solana block as the original event → average latency 25 ms."
                color="border-primary/30"
                index={0}
              />

              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Intelligent Copy Trading"
                description="Mirror whale wallets automatically, set custom stop-loss & auto-sell to maximize profits."
                color="border-solana-purple/30"
                index={1}
              />

              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="15 Private BDN Gateways"
                description="Our global network routes your TXs via the fastest paths – zero congestion, maximum reliability."
                color="border-solana-green/30"
                index={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
