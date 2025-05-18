"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SolanaSniperAnimation() {
  const [animationStep, setAnimationStep] = useState(0)

  // Automatische Animation in Schritten
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 5)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-b from-black via-gray-900 to-black rounded-lg p-4 relative overflow-hidden">
      {/* Hintergrund-Elemente */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Solana-Blockchain Visualisierung */}
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Solana Logo als Hintergrund */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 2 }} className="absolute">
          <path d="M400 80 L480 200 L400 320 L320 200 Z" fill="none" stroke="#14F195" strokeWidth="2" opacity="0.3" />
        </motion.g>

        {/* Blockchain-Blöcke */}
        <g>
          {/* Blockchain-Linie */}
          <line
            x1="100"
            y1="200"
            x2="700"
            y2="200"
            stroke="#9945FF"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
          />

          {/* Blöcke auf der Blockchain */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <rect
                x={100 + i * 120}
                y="180"
                width="40"
                height="40"
                rx="4"
                fill="#14F195"
                fillOpacity="0.2"
                stroke="#14F195"
                strokeWidth="1.5"
              />
              <text x={120 + i * 120} y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                {i}
              </text>
            </motion.g>
          ))}
        </g>

        {/* Sniper Bot Visualisierung */}
        <motion.g
          initial={{ x: -50, opacity: 0 }}
          animate={{
            x: animationStep === 4 ? 650 : 100 + animationStep * 120,
            opacity: 1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Bot Körper */}
          <circle cx="0" cy="120" r="25" fill="#FF5700" fillOpacity="0.7" />

          {/* Bot Visier */}
          <line x1="0" y1="120" x2="0" y2="200" stroke="#FF5700" strokeWidth="2" strokeDasharray="5,5" />

          {/* Bot Zielkreis */}
          <circle
            cx="0"
            cy="200"
            r="15"
            fill="none"
            stroke="#FF5700"
            strokeWidth="2"
            strokeDasharray={animationStep === 4 ? "0" : "5,5"}
          />

          {/* Bot Zielkreis innerer Punkt */}
          <circle cx="0" cy="200" r="3" fill="#FF5700" opacity={animationStep === 4 ? "1" : "0.5"} />

          {/* Bot Text */}
          <text x="0" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            Rust Rocket
          </text>
          <text x="0" y="105" textAnchor="middle" fill="white" fontSize="10">
            25ms Sniper
          </text>
        </motion.g>

        {/* Transaktion Animation */}
        {animationStep === 4 && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="580" cy="200" r="30" fill="#FF5700" fillOpacity="0.3" />
            <text x="580" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              BUY
            </text>
          </motion.g>
        )}

        {/* Erklärungstext */}
        <g>
          <rect
            x="200"
            y="300"
            width="400"
            height="60"
            rx="5"
            fill="rgba(0,0,0,0.7)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text x="400" y="325" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            {animationStep === 0 && "1. Scanning Solana Blockchain"}
            {animationStep === 1 && "2. Detecting New Token Launch"}
            {animationStep === 2 && "3. Analyzing Token Contract"}
            {animationStep === 3 && "4. Preparing Transaction"}
            {animationStep === 4 && "5. Executing in Same Block (25ms)"}
          </text>
          <text x="400" y="345" textAnchor="middle" fill="#14F195" fontSize="12">
            {animationStep === 0 && "Monitoring 15,000+ TPS in real-time"}
            {animationStep === 1 && "Identifying promising tokens instantly"}
            {animationStep === 2 && "Checking for honeypots and rugpulls"}
            {animationStep === 3 && "Optimizing gas and slippage settings"}
            {animationStep === 4 && "Securing position before price impact"}
          </text>
        </g>

        {/* Performance Metriken */}
        <g>
          <rect
            x="650"
            y="80"
            width="120"
            height="80"
            rx="5"
            fill="rgba(0,0,0,0.5)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text x="710" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            PERFORMANCE
          </text>
          <text x="710" y="125" textAnchor="middle" fill="#FF5700" fontSize="14" fontWeight="bold">
            25ms
          </text>
          <text x="710" y="140" textAnchor="middle" fill="white" fontSize="10">
            Execution Time
          </text>
          <text x="710" y="155" textAnchor="middle" fill="#14F195" fontSize="10">
            95% Success Rate
          </text>
        </g>
      </svg>
    </div>
  )
}
