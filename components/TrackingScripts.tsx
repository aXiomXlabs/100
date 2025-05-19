"use client"

import { useEffect } from "react"
import { useConsent } from "@/hooks/useConsent"

export default function TrackingScripts() {
  const { consent, hasInteracted } = useConsent()

  // Lade Google Analytics
  useEffect(() => {
    if (typeof window === "undefined" || !hasInteracted || !consent.statistics) return

    // Entferne vorhandenes Script, falls es existiert
    const existingScript = document.getElementById("ga-script")
    if (existingScript) existingScript.remove()

    // Füge neues Script hinzu
    const script = document.createElement("script")
    script.id = "ga-script"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID || "G-XXXXXXX"}`
    document.head.appendChild(script)

    // Initialisiere Google Analytics
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag("js", new Date())
    gtag("config", process.env.NEXT_PUBLIC_GTM_ID || "G-XXXXXXX", { anonymize_ip: true })

    // Definiere gtag global
    window.gtag = gtag

    return () => {
      // Cleanup beim Unmount
      if (document.getElementById("ga-script")) {
        document.getElementById("ga-script")?.remove()
      }
    }
  }, [consent.statistics, hasInteracted])

  // Lade Twitter Pixel
  useEffect(() => {
    if (typeof window === "undefined" || !hasInteracted || !consent.marketing) return

    // Entferne vorhandenes Script, falls es existiert
    const existingScript = document.getElementById("twitter-pixel")
    if (existingScript) existingScript.remove()

    // Definiere eine einfache twq-Funktion
    window.twq = (command: string, ...args: any[]) => {
      // Speichere Befehle in einer Queue
      window._twqQueue = window._twqQueue || []
      window._twqQueue.push([command, ...args])
    }

    // Initialisiere Twitter Pixel
    window.twq("init", "pork0")

    // Verarbeite gespeicherte Events
    if (window._twqQueue && window._twqQueue.length > 0) {
      console.log("Processing queued Twitter events:", window._twqQueue.length)
    }

    return () => {
      // Cleanup beim Unmount
      if (document.getElementById("twitter-pixel")) {
        document.getElementById("twitter-pixel")?.remove()
      }
      delete window.twq
    }
  }, [consent.marketing, hasInteracted])

  // Lade Facebook Pixel
  useEffect(() => {
    if (typeof window === "undefined" || !hasInteracted || !consent.marketing) return

    const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
    if (!fbPixelId) return

    // Entferne vorhandenes Script, falls es existiert
    const existingScript = document.getElementById("fb-pixel")
    if (existingScript) existingScript.remove()

    // Definiere eine einfache fbq-Funktion
    window.fbq = (command: string, ...args: any[]) => {
      // Speichere Befehle in einer Queue
      window._fbqQueue = window._fbqQueue || []
      window._fbqQueue.push([command, ...args])
    }

    // Initialisiere Facebook Pixel
    window.fbq("init", fbPixelId)

    // Verarbeite gespeicherte Events
    if (window._fbqQueue && window._fbqQueue.length > 0) {
      console.log("Processing queued Facebook events:", window._fbqQueue.length)
    }

    return () => {
      // Cleanup beim Unmount
      if (document.getElementById("fb-pixel")) {
        document.getElementById("fb-pixel")?.remove()
      }
      delete window.fbq
    }
  }, [consent.marketing, hasInteracted])

  return null
}
