import type React from "react"
import ConsentGateAds from "@/components/ConsentGateAds"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ThanksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ConsentGateAds />
    </>
  )
}
