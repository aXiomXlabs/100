import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProblemSection from "@/components/ProblemSection"
import SolutionSection from "@/components/SolutionSection"
import CopyTradingSection from "@/components/CopyTradingSection"
import BDNNetworkSection from "@/components/BDNNetworkSection"
import DashboardPreviewSection from "@/components/DashboardPreviewSection"
import AdditionalFeaturesSection from "@/components/AdditionalFeaturesSection"
import VisionSection from "@/components/VisionSection"
import RoadmapSection from "@/components/RoadmapSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"
import ParticlesBackground from "@/components/ParticlesBackground"
import SectionDivider from "@/components/SectionDivider"
import ScrollToTop from "@/components/ScrollToTop"
import UTMTracker from "@/components/UTMTracker"

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <ProblemSection />
        <SectionDivider />
        <SolutionSection />
        <SectionDivider />
        <CopyTradingSection />
        <SectionDivider />
        <BDNNetworkSection />
        <SectionDivider />
        <DashboardPreviewSection />
        <SectionDivider />
        <AdditionalFeaturesSection />
        <SectionDivider />
        <RoadmapSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <VisionSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Suspense fallback={null}>
        <UTMTracker />
      </Suspense>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
