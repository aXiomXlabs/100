import type { Metadata } from "next"
import CampaignDashboard from "./CampaignDashboard"

export const metadata: Metadata = {
  title: "Campaign Performance | Rust Rocket Admin",
  description: "Analyse der Kampagnen-Performance für Rust Rocket",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CampaignsPage() {
  return <CampaignDashboard />
}
