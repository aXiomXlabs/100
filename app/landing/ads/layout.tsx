import type React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="ads-layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
