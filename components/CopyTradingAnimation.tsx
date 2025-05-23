"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/useMobile"

export default function CopyTradingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Animation variables
    const wallets = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: isMobile ? 6 : 8, color: "#9B59D0" },
      { x: canvas.width * 0.2, y: canvas.height * 0.5, radius: isMobile ? 6 : 8, color: "#FF5733" },
      { x: canvas.width * 0.2, y: canvas.height * 0.7, radius: isMobile ? 6 : 8, color: "#8AE234" },
    ]

    const yourWallet = { x: canvas.width * 0.8, y: canvas.height * 0.5, radius: isMobile ? 10 : 12, color: "#8AE234" }

    // Reduziere die Animationsgeschwindigkeit auf Mobilgeräten
    const animationSpeed = isMobile ? 0.7 : 1.0

    // Animation loop
    let animationFrame: number
    let lastFrameTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      animationFrame = requestAnimationFrame(animate)

      // Throttle FPS on mobile
      const elapsed = currentTime - lastFrameTime
      if (elapsed < frameInterval) return

      lastFrameTime = currentTime - (elapsed % frameInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw wallets
      wallets.forEach((wallet) => {
        ctx.beginPath()
        ctx.arc(wallet.x, wallet.y, wallet.radius || 8, 0, Math.PI * 2)
        ctx.fillStyle = wallet.color
        ctx.fill()
      })

      // Draw your wallet
      ctx.beginPath()
      ctx.arc(yourWallet.x, yourWallet.y, yourWallet.radius || 12, 0, Math.PI * 2)
      ctx.fillStyle = yourWallet.color
      ctx.fill()

      // Draw connections
      wallets.forEach((wallet, index) => {
        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(wallet.x, wallet.y)
        ctx.lineTo(yourWallet.x, yourWallet.y)
        ctx.strokeStyle = `${wallet.color}40`
        ctx.lineWidth = isMobile ? 0.5 : 1
        ctx.stroke()

        // Animate data packet
        const time = Date.now() / 1000
        const speed = (0.5 + index * 0.2) * animationSpeed
        const progress = (Math.sin(time * speed) + 1) / 2

        const packetX = wallet.x + (yourWallet.x - wallet.x) * progress
        const packetY = wallet.y + (yourWallet.y - wallet.y) * progress

        ctx.beginPath()
        ctx.arc(packetX, packetY, isMobile ? 3 : 4, 0, Math.PI * 2)
        ctx.fillStyle = wallet.color
        ctx.fill()
      })
    }

    animate(0)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-32 md:h-40 lg:h-60">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <div className="text-xs md:text-sm text-text-secondary">Pro Traders</div>
        <div className="text-xs md:text-sm text-text-secondary">Your Wallet</div>
      </div>
    </div>
  )
}
