import type { Metadata } from "next"
import CampaignDashboard from "./CampaignDashboard"
import { requireAdmin } from "@/lib/admin-auth"

export const metadata: Metadata = {
  title: "Campaign Performance | Rust Rocket Admin",
  description: "Analyse der Kampagnen-Performance für Rust Rocket",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CampaignsPage() {
  // Prüfe, ob der Benutzer ein Admin ist
  await requireAdmin()

  return <CampaignDashboard />
}
