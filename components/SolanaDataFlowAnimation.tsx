"use client"

import { useEffect, useRef } from "react"

export default function SolanaDataFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const nodes = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: undefined, color: "#9B59D0", label: "Validator 1" },
      { x: canvas.width * 0.3, y: canvas.height * 0.7, radius: undefined, color: "#FF5733", label: "Validator 2" },
      { x: canvas.width * 0.5, y: canvas.height * 0.2, radius: undefined, color: "#8AE234", label: "Validator 3" },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: undefined, color: "#3498DB", label: "Validator 4" },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, radius: undefined, color: "#F1C40F", label: "Validator 5" },
    ]

    // Fix the radius issue by setting default values
    nodes.forEach((node) => {
      node.radius = 6 // Set default radius
    })

    // Central node
    const centralNode = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      radius: 10,
      color: "#8AE234",
      label: "Rust Rocket",
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node) => {
        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(centralNode.x, centralNode.y)
        ctx.strokeStyle = `${node.color}40`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius || 6, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      // Draw central node
      ctx.beginPath()
      ctx.arc(centralNode.x, centralNode.y, centralNode.radius, 0, Math.PI * 2)
      ctx.fillStyle = centralNode.color
      ctx.fill()

      // Animate data packets
      const time = Date.now() / 1000
      nodes.forEach((node, index) => {
        const speed = 0.5 + index * 0.1
        const progress = (Math.sin(time * speed) + 1) / 2

        const packetX = node.x + (centralNode.x - node.x) * progress
        const packetY = node.y + (centralNode.y - node.y) * progress

        ctx.beginPath()
        ctx.arc(packetX, packetY, 3, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="relative w-full h-40 md:h-60 bg-background-secondary/50 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="text-sm font-medium text-text-primary bg-background-secondary/70 px-3 py-1 rounded-full">
          Solana Network
        </div>
      </div>
    </div>
  )
}
