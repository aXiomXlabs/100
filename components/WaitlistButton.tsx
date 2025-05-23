"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { trackButtonClick } from "@/lib/tracking"

interface WaitlistButtonProps {
  className?: string
  onClick?: () => void
  children?: React.ReactNode
  id?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}

export default function WaitlistButton({
  className = "",
  onClick,
  children = "Join Waitlist",
  id = "waitlist-button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
}: WaitlistButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary-hover text-white"
      case "secondary":
        return "bg-secondary hover:bg-secondary-hover text-white"
      case "outline":
        return "bg-transparent border border-primary text-primary hover:bg-primary/10"
      case "ghost":
        return "bg-transparent text-primary hover:bg-primary/10"
      default:
        return "bg-primary hover:bg-primary-hover text-white"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-1.5 px-3 text-sm"
      case "md":
        return "py-2.5 px-5 text-base"
      case "lg":
        return "py-3 px-6 text-lg"
      default:
        return "py-2.5 px-5 text-base"
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track button click with enhanced tracking
    trackButtonClick(id, String(children))

    // Call the original onClick handler if provided
    if (onClick) onClick()
  }

  if (!mounted) return null

  return (
    <button
      id={id}
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${getVariantClasses()} 
        ${getSizeClasses()} 
        ${fullWidth ? "w-full" : ""} 
        font-medium rounded-lg transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-primary/50 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      data-tracking-id={id}
    >
      {children}
    </button>
  )
}
