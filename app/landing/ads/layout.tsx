import type React from "react"
import ConsentGateAds from "@/components/ConsentGateAds"

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ConsentGateAds />
    </>
  )
}
