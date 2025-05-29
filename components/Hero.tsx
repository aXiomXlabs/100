"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Rocket, Target, Clock, Users } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(heroRef)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  // Dynamic statistics
  const stats = [
    { label: "Execution Speed", value: "25ms", icon: Clock, color: "text-solana-green" },
    { label: "Success Rate", value: "95%+", icon: Target, color: "text-solana-purple" },
    { label: "Active Users", value: "200+", icon: Users, color: "text-primary" },
  ]

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animated particles background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    const particles: Particle[] = []
    const particleCount = 80

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#14F195" : "#9945FF",
      })
    }

    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = ((100 - distance) / 100) * 0.2
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  // Animation controls
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      id="hero"
      aria-labelledby="hero-heading"
      role="banner"
      itemScope
      itemType="http://schema.org/WebPageElement"
    >
      {/* Animated particles background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Dynamic gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(20, 241, 149, 0.1) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-solana-green/20 blur-3xl"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-40 h-40 rounded-full bg-solana-purple/20 blur-3xl"
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-20 py-20 md:py-32">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left column - Enhanced text content with SEO optimization */}
          <article className="flex flex-col items-start text-left space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-solana-green/20 to-solana-purple/20 border border-solana-green/30 text-solana-green text-sm font-medium backdrop-blur-sm">
                <Rocket className="w-4 h-4 mr-2 animate-pulse" aria-hidden="true" />
                Launching Soon – Beta Live Since May 9th
              </span>
            </motion.div>

            {/* SEO-optimized H1 with enhanced keywords */}
            <motion.div variants={itemVariants}>
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                itemProp="headline"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="block bg-gradient-to-r from-white via-solana-green to-solana-purple bg-clip-text text-transparent">
                  Solana Sniper Bot with 25ms Same-Block Execution
                </span>
                <motion.span
                  className="block text-2xl md:text-3xl lg:text-4xl mt-2 bg-gradient-to-r from-primary to-solana-green bg-clip-text text-transparent font-extrabold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Rust Rocket
                </motion.span>
              </h1>
            </motion.div>

            {/* SEO-enhanced subtitle with additional keywords */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-lg md:text-xl text-gray-300 font-medium">
                Dominate Meme Coin Trading with Automated Trading Platform
              </h2>
              <p className="text-base text-gray-400">Lightning-fast • Copy Trading • DeFi Trading • 95% Success Rate</p>
            </motion.div>

            {/* Enhanced description with expanded keywords */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl" itemProp="description">
                The #1 Solana trading bot for <strong className="text-solana-green">Pump.fun</strong> and{" "}
                <strong className="text-solana-purple">Raydium</strong> with lightning-fast execution, intelligent copy
                trading, and 95% success rate. TVTG-licensed & MPC-secure for safe automated cryptocurrency trading.
              </p>

              {/* Enhanced KPI strip with SEO keywords */}
              <div className="flex flex-wrap gap-6 text-sm" role="list" aria-label="Key performance indicators">
                {[
                  { label: "95% same-block fills", color: "bg-solana-green", description: "Same-block execution rate" },
                  { label: "25ms avg latency", color: "bg-solana-purple", description: "Average execution speed" },
                  { label: "200+ beta users", color: "bg-primary", description: "Active beta testers" },
                ].map((kpi, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="listitem"
                    aria-label={kpi.description}
                  >
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${kpi.color} mr-3 group-hover:animate-pulse`}
                      aria-hidden="true"
                    ></span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{kpi.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* SEO-optimized CTAs with descriptive text */}
            </motion.div>
          </article>

          {/* Right column - Interactive visual element with enhanced accessibility */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Dynamic background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-solana-green/30 via-solana-purple/20 to-transparent rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                aria-hidden="true"
              />

              {/* Interactive rocket visualization */}
              <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center"
                animate={{
                  x: mousePosition.x * 10,
                  y: mousePosition.y * 10,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <motion.div
                  className="relative w-4/5 h-4/5"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/rust-rocket-logo.gif"
                    alt="Rust Rocket Solana Trading Bot Dashboard showing 25ms execution speed and copy trading features for meme coin sniping"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    loading="eager"
                  />
                </motion.div>
              </motion.div>

              {/* Interactive orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                {[1, 0.8, 0.6].map((scale, index) => (
                  <motion.div
                    key={index}
                    className="absolute border border-gray-700/30 rounded-full"
                    style={{
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20 + index * 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      direction: index % 2 === 0 ? "normal" : "reverse",
                    }}
                  />
                ))}
              </div>

              {/* Dynamic stats display */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl shadow-2xl border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                role="status"
                aria-live="polite"
                aria-label={`Current metric: ${stats[currentStat].label} - ${stats[currentStat].value}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r from-solana-green/20 to-solana-purple/20 flex items-center justify-center`}
                  >
                    {React.createElement(stats[currentStat].icon, {
                      className: `w-5 h-5 ${stats[currentStat].color}`,
                      "aria-hidden": "true",
                    })}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{stats[currentStat].label}</div>
                    <div className={`text-lg font-bold ${stats[currentStat].color}`}>{stats[currentStat].value}</div>
                  </div>
                </div>
              </motion.div>

              {/* Performance indicator */}
              <motion.div
                className="absolute -top-6 -right-6 glass-effect p-4 rounded-xl shadow-2xl border border-white/10"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(20, 241, 149, 0.3)",
                    "0 0 30px rgba(20, 241, 149, 0.5)",
                    "0 0 20px rgba(20, 241, 149, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                role="status"
                aria-label="Trading bot status: Live and operational"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-solana-green animate-pulse" aria-hidden="true"></div>
                  <div>
                    <div className="text-xs text-gray-400">Status</div>
                    <div className="text-sm font-bold text-solana-green">Live</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        whileHover={{ scale: 1.1 }}
        role="button"
        aria-label="Scroll down to explore more features"
        tabIndex={0}
      >
        <span className="text-gray-400 text-sm mb-2 group-hover:text-solana-green transition-colors">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1 group-hover:border-solana-green transition-colors">
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full group-hover:bg-solana-green transition-colors"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  )
}
