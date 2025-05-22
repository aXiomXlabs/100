"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { trackUTMParameters } from "@/lib/waitlist"

export default function UTMTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      // Create a URLSearchParams object from the search params
      const params = new URLSearchParams()

      // Add UTM parameters if they exist
      const utmSource = searchParams.get("utm_source")
      const utmMedium = searchParams.get("utm_medium")
      const utmCampaign = searchParams.get("utm_campaign")
      const utmTerm = searchParams.get("utm_term")
      const utmContent = searchParams.get("utm_content")

      if (utmSource) params.set("utm_source", utmSource)
      if (utmMedium) params.set("utm_medium", utmMedium)
      if (utmCampaign) params.set("utm_campaign", utmCampaign)
      if (utmTerm) params.set("utm_term", utmTerm)
      if (utmContent) params.set("utm_content", utmContent)

      // Track UTM parameters
      trackUTMParameters(params)
    }
  }, [searchParams])

  return null
}
