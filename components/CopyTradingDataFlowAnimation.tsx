"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function CopyTradingDataFlowAnimation() {
  const [animationStep, setAnimationStep] = useState(0)

  // Automatische Animation in Schritten
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 6)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-64 bg-background-secondary rounded-lg p-4 relative overflow-hidden">
      <div className="absolute top-2 left-2 text-xs text-text-secondary">Copy Trading Datenfluss</div>

      {/* Komponenten */}
      <svg viewBox="0 0 500 200" className="w-full h-full">
        {/* Hintergrund-Raster */}
        <pattern id="copy-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
        <rect width="500" height="200" fill="url(#copy-grid)" />

        {/* Pro Wallet */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <rect
            x="20"
            y="40"
            width="80"
            height="40"
            rx="5"
            fill="#9945FF"
            fillOpacity="0.2"
            stroke="#9945FF"
            strokeWidth="1.5"
          />
          <text x="60" y="65" textAnchor="middle" fill="white" fontSize="12">
            Pro Wallet
          </text>
        </motion.g>

        {/* Solana Blockchain */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <rect
            x="20"
            y="120"
            width="80"
            height="40"
            rx="5"
            fill="#14F195"
            fillOpacity="0.2"
            stroke="#14F195"
            strokeWidth="1.5"
          />
          <text x="60" y="145" textAnchor="middle" fill="white" fontSize="12">
            Solana
          </text>
        </motion.g>

        {/* Rust Rocket Monitoring */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <rect
            x="160"
            y="80"
            width="80"
            height="40"
            rx="5"
            fill="#FF5700"
            fillOpacity="0.2"
            stroke="#FF5700"
            strokeWidth="1.5"
          />
          <text x="200" y="100" textAnchor="middle" fill="white" fontSize="12">
            Rust Rocket
          </text>
          <text x="200" y="112" textAnchor="middle" fill="white" fontSize="10">
            Monitoring
          </text>
        </motion.g>

        {/* Analysis Engine */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <rect
            x="300"
            y="80"
            width="80"
            height="40"
            rx="5"
            fill="#E42575"
            fillOpacity="0.2"
            stroke="#E42575"
            strokeWidth="1.5"
          />
          <text x="340" y="100" textAnchor="middle" fill="white" fontSize="12">
            Analysis
          </text>
          <text x="340" y="112" textAnchor="middle" fill="white" fontSize="10">
            Engine
          </text>
        </motion.g>

        {/* Your Wallet */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <rect
            x="420"
            y="40"
            width="60"
            height="40"
            rx="5"
            fill="#00C2FF"
            fillOpacity="0.2"
            stroke="#00C2FF"
            strokeWidth="1.5"
          />
          <text x="450" y="65" textAnchor="middle" fill="white" fontSize="12">
            Your Wallet
          </text>
        </motion.g>

        {/* DEX (Raydium/Pump.fun) */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
          <rect
            x="420"
            y="120"
            width="60"
            height="40"
            rx="5"
            fill="#FFD700"
            fillOpacity="0.2"
            stroke="#FFD700"
            strokeWidth="1.5"
          />
          <text x="450" y="145" textAnchor="middle" fill="white" fontSize="12">
            DEX
          </text>
        </motion.g>

        {/* Verbindungslinien */}
        <g stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="5,5">
          <line x1="100" y1="60" x2="160" y2="80" />
          <line x1="100" y1="140" x2="160" y2="100" />
          <line x1="240" y1="100" x2="300" y2="100" />
          <line x1="380" y1="80" x2="420" y2="60" />
          <line x1="380" y1="100" x2="420" y2="120" />
        </g>

        {/* Animierte Datenpakete */}
        {/* Pro Wallet → Rust Rocket */}
        <motion.circle
          cx="100"
          cy="60"
          r="4"
          fill="#9945FF"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 0 ? 1 : 0,
            x: animationStep === 0 ? [0, 60] : 0,
            y: animationStep === 0 ? [0, 20] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Solana → Rust Rocket */}
        <motion.circle
          cx="100"
          cy="140"
          r="4"
          fill="#14F195"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 1 ? 1 : 0,
            x: animationStep === 1 ? [0, 60] : 0,
            y: animationStep === 1 ? [0, -40] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Rust Rocket → Analysis Engine */}
        <motion.circle
          cx="240"
          cy="100"
          r="4"
          fill="#FF5700"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 2 ? 1 : 0,
            x: animationStep === 2 ? [0, 60] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Analysis Engine → Your Wallet */}
        <motion.circle
          cx="380"
          cy="80"
          r="4"
          fill="#E42575"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 3 ? 1 : 0,
            x: animationStep === 3 ? [0, 40] : 0,
            y: animationStep === 3 ? [0, -20] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Analysis Engine → DEX */}
        <motion.circle
          cx="380"
          cy="100"
          r="4"
          fill="#E42575"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 4 ? 1 : 0,
            x: animationStep === 4 ? [0, 40] : 0,
            y: animationStep === 4 ? [0, 20] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* DEX → Your Wallet (Bestätigung) */}
        <motion.circle
          cx="450"
          cy="120"
          r="4"
          fill="#FFD700"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 5 ? 1 : 0,
            x: animationStep === 5 ? [0, 0] : 0,
            y: animationStep === 5 ? [0, -80] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Legende für den aktuellen Schritt */}
      <div className="absolute bottom-2 left-2 right-2 text-xs text-text-secondary bg-background-primary bg-opacity-70 p-2 rounded">
        {animationStep === 0 && "1. Überwachung der Aktivitäten erfolgreicher Trader-Wallets"}
        {animationStep === 1 && "2. Echtzeit-Monitoring der Solana-Blockchain nach neuen Transaktionen"}
        {animationStep === 2 && "3. Rust Rocket sendet Daten an die Analyse-Engine"}
        {animationStep === 3 && "4. Analyse-Engine sendet Handelssignale an deine Wallet"}
        {animationStep === 4 && "5. Analyse-Engine initiiert automatische Trades auf DEX"}
        {animationStep === 5 && "6. Gewinn wird in deine Wallet übertragen"}
      </div>
    </div>
  )
}
