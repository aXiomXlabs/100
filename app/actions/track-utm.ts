"use server"

import { cookies } from "next/headers"

export async function trackUTMParameters(searchParams: string) {
  const params = new URLSearchParams(searchParams)

  const utmSource = params.get("utm_source")
  const utmMedium = params.get("utm_medium")
  const utmCampaign = params.get("utm_campaign")
  const utmTerm = params.get("utm_term")
  const utmContent = params.get("utm_content")

  // Only save if at least one UTM parameter is present
  if (utmSource || utmMedium || utmCampaign || utmTerm || utmContent) {
    const utmParams = {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    }

    // Store in cookies for server-side access
    const cookieStore = cookies()
    cookieStore.set("utm_params", JSON.stringify(utmParams), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
  }
}
