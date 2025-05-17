"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SolanaDataFlowAnimation() {
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
      <div className="absolute top-2 left-2 text-xs text-text-secondary">Datenfluss-Visualisierung</div>

      {/* Komponenten */}
      <svg viewBox="0 0 500 200" className="w-full h-full">
        {/* Hintergrund-Raster */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
        <rect width="500" height="200" fill="url(#grid)" />

        {/* Telegram */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <rect
            x="20"
            y="80"
            width="80"
            height="40"
            rx="5"
            fill="#2AABEE"
            fillOpacity="0.2"
            stroke="#2AABEE"
            strokeWidth="1.5"
          />
          <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12">
            Telegram
          </text>
        </motion.g>

        {/* Rust Rocket Bot */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
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
          <text x="200" y="105" textAnchor="middle" fill="white" fontSize="12">
            Rust Rocket
          </text>
        </motion.g>

        {/* BDN Network */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <rect
            x="300"
            y="40"
            width="80"
            height="40"
            rx="5"
            fill="#9945FF"
            fillOpacity="0.2"
            stroke="#9945FF"
            strokeWidth="1.5"
          />
          <text x="340" y="65" textAnchor="middle" fill="white" fontSize="12">
            BDN Network
          </text>
        </motion.g>

        {/* Solana Blockchain */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <rect
            x="300"
            y="120"
            width="80"
            height="40"
            rx="5"
            fill="#14F195"
            fillOpacity="0.2"
            stroke="#14F195"
            strokeWidth="1.5"
          />
          <text x="340" y="145" textAnchor="middle" fill="white" fontSize="12">
            Solana
          </text>
        </motion.g>

        {/* Pump.fun / Raydium */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <rect
            x="420"
            y="80"
            width="60"
            height="40"
            rx="5"
            fill="#E42575"
            fillOpacity="0.2"
            stroke="#E42575"
            strokeWidth="1.5"
          />
          <text x="450" y="105" textAnchor="middle" fill="white" fontSize="12">
            DEX
          </text>
        </motion.g>

        {/* Verbindungslinien */}
        <g stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="5,5">
          <line x1="100" y1="100" x2="160" y2="100" />
          <line x1="240" y1="100" x2="300" y2="60" />
          <line x1="240" y1="100" x2="300" y2="140" />
          <line x1="380" y1="60" x2="450" y2="80" />
          <line x1="380" y1="140" x2="450" y2="120" />
        </g>

        {/* Animierte Datenpakete */}
        {/* Telegram → Rust Rocket */}
        <motion.circle
          cx="100"
          cy="100"
          r="4"
          fill="#2AABEE"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 0 ? 1 : 0,
            x: animationStep === 0 ? [0, 60] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Rust Rocket → BDN Network */}
        <motion.circle
          cx="240"
          cy="100"
          r="4"
          fill="#FF5700"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 1 ? 1 : 0,
            x: animationStep === 1 ? [0, 60] : 0,
            y: animationStep === 1 ? [0, -40] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Rust Rocket → Solana */}
        <motion.circle
          cx="240"
          cy="100"
          r="4"
          fill="#FF5700"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 2 ? 1 : 0,
            x: animationStep === 2 ? [0, 60] : 0,
            y: animationStep === 2 ? [0, 40] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* BDN Network → DEX */}
        <motion.circle
          cx="380"
          cy="60"
          r="4"
          fill="#9945FF"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 3 ? 1 : 0,
            x: animationStep === 3 ? [0, 70] : 0,
            y: animationStep === 3 ? [0, 20] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Solana → DEX */}
        <motion.circle
          cx="380"
          cy="140"
          r="4"
          fill="#14F195"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 4 ? 1 : 0,
            x: animationStep === 4 ? [0, 70] : 0,
            y: animationStep === 4 ? [0, -20] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* DEX → Rust Rocket (Bestätigung) */}
        <motion.circle
          cx="450"
          cy="100"
          r="4"
          fill="#E42575"
          initial={{ opacity: 0 }}
          animate={{
            opacity: animationStep === 5 ? 1 : 0,
            x: animationStep === 5 ? [0, -250] : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Legende für den aktuellen Schritt */}
      <div className="absolute bottom-2 left-2 right-2 text-xs text-text-secondary bg-background-primary bg-opacity-70 p-2 rounded">
        {animationStep === 0 && "1. Benutzer sendet Befehl über Telegram"}
        {animationStep === 1 && "2. Rust Rocket verarbeitet Befehl und leitet ihn an BDN weiter"}
        {animationStep === 2 && "3. Rust Rocket bereitet Transaktion für Solana vor"}
        {animationStep === 3 && "4. BDN Network leitet Transaktion an DEX weiter"}
        {animationStep === 4 && "5. Solana validiert Transaktion auf der Blockchain"}
        {animationStep === 5 && "6. Transaktion wird bestätigt und Ergebnis zurückgemeldet"}
      </div>
    </div>
  )
}
