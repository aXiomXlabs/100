"use client"

import { useEffect } from "react"
import Script from "next/script"

// Google Tag Manager ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX" // Platzhalter-ID wird verwendet, wenn keine Umgebungsvariable gesetzt ist

export default function GoogleTagManager() {
  useEffect(() => {
    // Dataschicht initialisieren
    window.dataLayer = window.dataLayer || []

    // Seiten-Informationen in die Dataschicht pushen
    window.dataLayer.push({
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      site_type: "nextjs",
      site_version: "1.0.0",
    })
  }, [])

  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Google Tag Manager - NoScript (für Nutzer ohne JavaScript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
