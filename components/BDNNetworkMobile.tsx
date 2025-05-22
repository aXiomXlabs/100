"use client"

import { useRef } from "react"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function BDNNetworkMobile() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])

  // Vereinfachte Gateway-Knoten für mobile Ansicht
  const mobileGateways = [
    { id: 1, name: "North America", color: "#8AE234" },
    { id: 2, name: "Europe", color: "#9945FF" },
    { id: 3, name: "Asia", color: "#8AE234" },
    { id: 4, name: "Australia", color: "#9945FF" },
    { id: 5, name: "South America", color: "#8AE234" },
  ]

  return (
    <div className="md:hidden">
      <div className="glass-card p-6 border-primary/20 mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-3">Global BDN Network</h3>
        <p className="text-text-secondary text-sm mb-4">
          Our network of 15 optimized Solana gateways ensures your transactions are routed through the fastest paths.
        </p>

        {/* Simplified network visualization */}
        <div className="relative h-[180px] border border-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 bg-background-tertiary opacity-30"></div>

          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-white"></div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-white">Solana</div>
          </div>

          {/* Gateway nodes */}
          {mobileGateways.map((gateway, index) => {
            // Calculate position in a circle around the center
            const angle = (index / mobileGateways.length) * Math.PI * 2
            const radius = 60
            const x = Math.cos(angle) * radius + 50
            const y = Math.sin(angle) * radius + 50

            return (
              <motion.div
                key={gateway.id}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: gateway.color }}></div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: "100%" } : { width: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="absolute top-1/2 left-0 h-[1px] bg-gray-600 origin-left"
                  style={{
                    width: `${radius}px`,
                    transform: `rotate(${angle}rad)`,
                  }}
                ></motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-primary">15</div>
            <div className="text-xs text-text-secondary">Gateways</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">0.4s</div>
            <div className="text-xs text-text-secondary">Execution</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">95%+</div>
            <div className="text-xs text-text-secondary">Success</div>
          </div>
        </div>
      </div>
    </div>
  )
}
