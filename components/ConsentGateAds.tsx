"use client"

import { useEffect } from "react"
import { hasMarketingConsent } from "@/lib/tracking"

const ConsentGateAds = () => {
  useEffect(() => {
    if (typeof window === "undefined") return // Server-side check

    const loadPixels = () => {
      if (hasMarketingConsent()) {
        // Load Facebook Pixel
        if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
          !((f, b, e, v, n, t, s) => {
            if (f.fbq) return
            n = f.fbq = (...args: any[]) => {
              n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
            }
            if (!f._fbq) f._fbq = n
            n.push = n
            n.loaded = !0
            n.version = "2.0"
            n.queue = []
            t = b.createElement(e)
            t.async = !0
            t.src = v
            s = b.getElementsByTagName(e)[0]
            s.parentNode.insertBefore(t, s)
          })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

          window.fbq("init", process.env.NEXT_PUBLIC_FB_PIXEL_ID)
          window.fbq("track", "PageView")
        }

        // Load Twitter Pixel
        !((e, t, n, s, u, a) => {
          e.twq ||
            ((s = e.twq =
              (...args: any[]) => {
                s.exe ? s.exe.apply(s, args) : s.queue.push(args)
              }),
            (s.version = "1.1"),
            (s.queue = []),
            (u = t.createElement(n)),
            (u.async = !0),
            (u.src = "https://static.ads-twitter.com/uwt.js"),
            (a = t.getElementsByTagName(n)[0]),
            a.parentNode.insertBefore(u, a))
        })(window, document, "script")
        window.twq("init", "pork0")
        window.twq("track", "PageView")
      }
    }

    loadPixels()
  }, [])

  return null
}

export default ConsentGateAds
