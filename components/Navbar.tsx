"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import WaitlistButton from "./WaitlistButton"

const navLinks = [
  { name: "Features", href: "#features", id: "nav-features" },
  { name: "Copy Trading", href: "#copy-trading", id: "nav-copy-trading" },
  { name: "Network", href: "#bdn-network", id: "nav-network" },
  { name: "Dashboard", href: "#dashboard-preview", id: "nav-dashboard" },
  { name: "FAQ", href: "#faq", id: "nav-faq" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Find active section
      const sections = navLinks.map((link) => link.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const trackNavClick = (linkName: string) => {
    // Google Analytics tracking
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag is not typed
      window.gtag("event", "nav_click", {
        event_category: "navigation",
        event_label: linkName,
      })
    }

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-gray-800/50 py-2" : "bg-transparent py-4"
      }`}
      role="banner"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Rust Rocket Home"
            id="logo-link"
            data-tracking-id="logo_click"
            onClick={() => trackNavClick("logo")}
          >
            <Image
              src="/images/rust-rocket-logo.png"
              alt="Rust Rocket Logo"
              width={40}
              height={40}
              className="mr-2"
              priority={true}
              itemProp="logo"
            />
            <span className="text-primary font-bold text-xl">Rust Rocket</span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              id={link.id}
              data-tracking-id={`nav_${link.name.toLowerCase().replace(/\s+/g, "_")}_click`}
              onClick={() => trackNavClick(link.name)}
              className={`nav-link text-sm font-medium transition-colors ${
                activeSection === link.href.substring(1)
                  ? "text-primary after:scale-x-100"
                  : "text-text-primary after:scale-x-0"
              }`}
              aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/solana-sniper-bot"
            className="nav-link text-sm font-medium transition-colors text-text-primary after:scale-x-0"
            id="nav-solana-sniper-bot"
            data-tracking-id="nav_solana_sniper_bot_click"
            onClick={() => trackNavClick("Solana Sniper Bot")}
          >
            Solana Sniper Bot
          </Link>
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          <WaitlistButton
            id="nav-waitlist-button"
            data-tracking-id="nav_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md"
          >
            Join Waitlist
          </WaitlistButton>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <WaitlistButton
            id="nav-mobile-waitlist-button"
            data-tracking-id="nav_mobile_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-md"
          >
            Join Waitlist
          </WaitlistButton>
          <button
            type="button"
            className="text-text-primary hover:text-primary transition-colors p-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-button"
            data-tracking-id={mobileMenuOpen ? "mobile_menu_close" : "mobile_menu_open"}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background-secondary/90 backdrop-blur-md border-t border-gray-800"
            aria-labelledby="mobile-menu-button"
          >
            <nav className="container-custom py-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  id={`mobile-${link.id}`}
                  data-tracking-id={`mobile_nav_${link.name.toLowerCase().replace(/\s+/g, "_")}_click`}
                  onClick={() => trackNavClick(`mobile_${link.name}`)}
                  className="block text-base font-medium py-3 px-3 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors"
                  aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/solana-sniper-bot"
                id="mobile-nav-solana-sniper-bot"
                data-tracking-id="mobile_nav_solana_sniper_bot_click"
                onClick={() => trackNavClick("mobile_Solana Sniper Bot")}
                className="block text-base font-medium py-2 px-3 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors"
              >
                Solana Sniper Bot
              </Link>
              <div className="pt-2 border-t border-gray-800 mt-4"></div>
              <div className="pt-2 border-t border-gray-800 mt-2">
                <a
                  href="https://t.me/rust_rocket"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-telegram-link"
                  data-tracking-id="mobile_telegram_click"
                  onClick={() => trackNavClick("telegram")}
                  className="flex items-center justify-between py-2 px-3 text-text-primary hover:text-primary hover:bg-background-tertiary rounded-md transition-colors"
                  aria-label="Telegram Channel (opens in a new tab)"
                >
                  <span>Telegram Channel</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
