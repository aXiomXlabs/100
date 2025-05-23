"use client"

import { useEffect, useState } from "react"
import { initializeAudienceTracking } from "@/lib/remarketing-audiences"

export default function AudienceTracker() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize audience tracking
    const tracker = initializeAudienceTracking()

    if (tracker) {
      setIsInitialized(true)

      // Track initial page view
      tracker.trackPageView()

      // Set up route change tracking for Next.js
      const handleRouteChange = () => {
        tracker.trackPageView()
      }

      // Listen for navigation events
      window.addEventListener("popstate", handleRouteChange)

      // Track video interactions if any videos are present
      const videos = document.querySelectorAll("video")
      videos.forEach((video) => {
        video.addEventListener("play", () => {
          tracker.trackEvent("video_play", { src: video.src })
        })

        video.addEventListener("timeupdate", () => {
          const percent = (video.currentTime / video.duration) * 100
          if (percent >= 25 && !video.dataset.tracked25) {
            video.dataset.tracked25 = "true"
            tracker.trackEvent("video_25_percent", { src: video.src })
          }
          if (percent >= 50 && !video.dataset.tracked50) {
            video.dataset.tracked50 = "true"
            tracker.trackEvent("video_50_percent", { src: video.src })
          }
          if (percent >= 75 && !video.dataset.tracked75) {
            video.dataset.tracked75 = "true"
            tracker.trackEvent("video_75_percent", { src: video.src })
          }
        })
      })

      // Track feature interactions
      const featureElements = document.querySelectorAll("[data-feature]")
      featureElements.forEach((element) => {
        element.addEventListener("click", () => {
          tracker.trackEvent("feature_interaction", {
            feature: element.getAttribute("data-feature"),
          })
        })
      })

      return () => {
        window.removeEventListener("popstate", handleRouteChange)
      }
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
