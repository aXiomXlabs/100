"use client"

import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/useMobile"

export default function SolanaDataFlowAnimation() {
  const [animationStep, setAnimationStep] = useState(0)
  const isMobile = useMobile()

  // Automatische Animation in Schritten mit angepasster Geschwindigkeit für Mobilgeräte
  useEffect(() => {
    const interval = setInterval(
      () => {
        setAnimationStep((prev) => (prev + 1) % 4)
      },
      isMobile ? 2000 : 1500,
    ) // Längere Intervalle auf Mobilgeräten

    return () => clearInterval(interval)
  }, [isMobile])

  // Reduziere die Komplexität der Animation auf Mobilgeräten
  const strokeWidth = isMobile ? 1 : 1.5
  const fontSize = isMobile ? 10 : 12
  const smallFontSize = isMobile ? 8 : 10
  const circleRadius = isMobile ? 3 : 4
  const animationDuration = isMobile ? 1.2 : 1.5

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width="400" height="300" viewBox="0 0 400 300">
        {/* Rectangle 1: Solana */}
        <rect x="50" y="50" width="80" height="40" stroke="black" strokeWidth={strokeWidth} fill="white" />
        <text x="90" y="75" fontSize={fontSize} textAnchor="middle">
          Solana
        </text>

        {/* Rectangle 2: Validator */}
        <rect x="270" y="50" width="80" height="40" stroke="black" strokeWidth={strokeWidth} fill="white" />
        <text x="310" y="75" fontSize={fontSize} textAnchor="middle">
          Validator
        </text>

        {/* Rectangle 3: Smart Contract */}
        <rect x="50" y="210" width="120" height="40" stroke="black" strokeWidth={strokeWidth} fill="white" />
        <text x="110" y="235" fontSize={fontSize} textAnchor="middle">
          Smart Contract
        </text>

        {/* Rectangle 4: User */}
        <rect x="270" y="210" width="80" height="40" stroke="black" strokeWidth={strokeWidth} fill="white" />
        <text x="310" y="235" fontSize={fontSize} textAnchor="middle">
          User
        </text>

        {/* Arrows and Animation */}
        {/* Solana to Validator */}
        <line
          x1="130"
          y1="70"
          x2="270"
          y1="70"
          stroke="black"
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
          style={{
            animation: animationStep === 0 ? `dash ${animationDuration}s linear forwards` : "none",
            strokeDasharray: 20,
            strokeDashoffset: 20,
          }}
        />
        <text x="200" y="60" fontSize={smallFontSize} textAnchor="middle">
          Transaction
        </text>

        {/* Validator to Smart Contract */}
        <line
          x1="310"
          y1="90"
          x2="310"
          y2="210"
          stroke="black"
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
          style={{
            animation: animationStep === 1 ? `dash ${animationDuration}s linear forwards` : "none",
            strokeDasharray: 20,
            strokeDashoffset: 20,
          }}
        />
        <text x="320" y="150" fontSize={smallFontSize} textAnchor="middle" transform="rotate(90,320,150)">
          Execution
        </text>

        {/* Smart Contract to User */}
        <line
          x1="170"
          y1="230"
          x2="270"
          y1="230"
          stroke="black"
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
          style={{
            animation: animationStep === 2 ? `dash ${animationDuration}s linear forwards` : "none",
            strokeDasharray: 20,
            strokeDashoffset: 20,
          }}
        />
        <text x="220" y="220" fontSize={smallFontSize} textAnchor="middle">
          Result
        </text>

        {/* User to Solana */}
        <line
          x1="290"
          y1="210"
          x2="90"
          y2="90"
          stroke="black"
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
          style={{
            animation: animationStep === 3 ? `dash ${animationDuration}s linear forwards` : "none",
            strokeDasharray: 20,
            strokeDashoffset: 20,
          }}
        />
        <text x="190" y="160" fontSize={smallFontSize} textAnchor="middle">
          Update
        </text>

        {/* Arrowhead Definition */}
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="black" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
