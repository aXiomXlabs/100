"use client"
import { useConsent } from "@/hooks/useConsent"
import Script from "next/script"

export default function GoogleAnalytics() {
  const { consent, hasInteracted } = useConsent()
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "G-XXXXXXX"

  // Nur Google Analytics laden, wenn der Benutzer zugestimmt hat
  if (!hasInteracted || !consent.statistics) {
    return null
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtmId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
