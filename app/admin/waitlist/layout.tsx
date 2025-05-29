import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waitlist Admin | Rust Rocket",
  description: "Verwaltung der Rust Rocket Waitlist-Einträge",
  robots: "noindex, nofollow",
}

export default function WaitlistAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
