"use client"

import type React from "react"
import { useState, useEffect, useCallback, createContext, useContext } from "react"

type ConsentState = {
  essential: boolean
  statistics: boolean
}

type ConsentContextType = {
  consent: ConsentState
  isModalOpen: boolean
  hasInteracted: boolean
  updateConsent: (newConsent: Partial<ConsentState>) => void
  openModal: () => void
  closeModal: () => void
  acceptAll: () => void
  essentialOnly: () => void
}

const defaultConsent: ConsentState = {
  essential: true, // Always active
  statistics: false,
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(true) // Default true, set to false if no consent found

  // Load consent from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedConsent = localStorage.getItem("rr_consent")
      if (savedConsent) {
        const parsedConsent = JSON.parse(savedConsent)
        setConsent({
          essential: true, // Always active
          statistics: !!parsedConsent.stat,
        })
      } else {
        // No consent found, show banner
        setHasInteracted(false)
      }
    } catch (error) {
      console.error("Error loading consent status:", error)
      setHasInteracted(false)
    }
  }, [])

  // Update consent
  const updateConsent = useCallback((newConsent: Partial<ConsentState>) => {
    if (typeof window === "undefined") return

    setConsent((prev) => {
      const updated = { ...prev, ...newConsent }

      // Save to localStorage
      try {
        localStorage.setItem(
          "rr_consent",
          JSON.stringify({
            stat: updated.statistics,
          }),
        )
      } catch (error) {
        console.error("Error saving consent:", error)
      }

      return updated
    })
    setHasInteracted(true)
  }, [])

  // Accept all cookies
  const acceptAll = useCallback(() => {
    updateConsent({ statistics: true })
    setIsModalOpen(false)
  }, [updateConsent])

  // Accept only essential cookies
  const essentialOnly = useCallback(() => {
    updateConsent({ statistics: false })
    setIsModalOpen(false)
  }, [updateConsent])

  // Open modal
  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const value = {
    consent,
    isModalOpen,
    hasInteracted,
    updateConsent,
    openModal,
    closeModal,
    acceptAll,
    essentialOnly,
  }

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export const useConsent = () => {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    console.warn("useConsent is being used outside of a ConsentProvider. Fallback values will be used.")
    // Return fallback values
    return {
      consent: { essential: true, statistics: false },
      isModalOpen: false,
      hasInteracted: true,
      updateConsent: () => {},
      openModal: () => {},
      closeModal: () => {},
      acceptAll: () => {},
      essentialOnly: () => {},
    }
  }
  return context
}
