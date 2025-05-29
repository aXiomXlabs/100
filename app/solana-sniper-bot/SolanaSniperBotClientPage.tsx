"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ParticlesBackground from "@/components/ParticlesBackground"
import SectionDivider from "@/components/SectionDivider"
import ScrollToTop from "@/components/ScrollToTop"
import Image from "next/image"
import { CheckCircle, Zap, Shield, TrendingUp, Users, Lock } from "lucide-react"

export default function SolanaSniperBotClientPage() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-solana-green to-solana-purple bg-clip-text text-transparent">
                Solana Sniper Bot
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The ultimate Solana sniper bot for Pump.fun and Raydium.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/solana-trading-bot-dashboard.png"
                  alt="Rust Rocket Solana Sniper Bot Dashboard Interface"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Rust Rocket?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the fastest and most reliable Solana trading bot with enterprise-grade features
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-solana-green transition-colors"
                >
                  <feature.icon className="w-12 h-12 text-solana-green mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Performance Stats */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Unmatched Performance</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-time statistics from our live trading operations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-solana-green mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Security Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Security</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Your assets are protected with state-of-the-art security measures and regulatory compliance.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-solana-green flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">TVTG Licensed</strong>
                      <p className="text-gray-400">Fully compliant with Liechtenstein blockchain regulations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-solana-green flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">MPC Wallet Security</strong>
                      <p className="text-gray-400">Multi-party computation for maximum asset protection</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-solana-green flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Non-Custodial</strong>
                      <p className="text-gray-400">You maintain full control of your private keys</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-solana-green/20 to-solana-purple/20 blur-3xl" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <Shield className="w-24 h-24 text-solana-green mx-auto mb-6" />
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100% Secure</div>
                    <div className="text-gray-400">Your funds, your control</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of traders using Rust Rocket to dominate the Solana ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#waitlist"
                className="px-8 py-4 bg-gradient-to-r from-solana-green to-solana-purple rounded-xl font-bold text-black hover:shadow-lg hover:shadow-solana-green/25 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.a>
              <motion.a
                href="/docs"
                className="px-8 py-4 bg-gray-800 rounded-xl font-bold text-white border border-gray-700 hover:border-solana-green transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

const features = [
  {
    icon: Zap,
    title: "25ms Execution Speed",
    description: "Lightning-fast order execution with same-block guarantees for maximum profitability",
  },
  {
    icon: TrendingUp,
    title: "95% Success Rate",
    description: "Industry-leading success rate with intelligent order routing and MEV protection",
  },
  {
    icon: Users,
    title: "Copy Trading",
    description: "Follow successful traders automatically with customizable risk management",
  },
  {
    icon: Shield,
    title: "TVTG Licensed",
    description: "Fully regulated and compliant with Liechtenstein blockchain laws",
  },
  {
    icon: Lock,
    title: "MPC Security",
    description: "Multi-party computation wallets for enterprise-grade asset protection",
  },
  {
    icon: CheckCircle,
    title: "Non-Custodial",
    description: "Maintain full control of your assets with our secure infrastructure",
  },
]

const stats = [
  { value: "25ms", label: "Avg Latency" },
  { value: "95%", label: "Success Rate" },
  { value: "200+", label: "Active Traders" },
  { value: "$10M+", label: "Volume Traded" },
]
