"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ExternalLink, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import WaitlistButton from "../WaitlistButton"

const navLinks = [
  { name: "Funktionen", href: "#features", id: "nav-features" },
  { name: "Copy Trading", href: "#copy-trading", id: "nav-copy-trading" },
  { name: "Netzwerk", href: "#bdn-network", id: "nav-network" },
  { name: "Dashboard", href: "#dashboard-preview", id: "nav-dashboard" },
  { name: "FAQ", href: "#faq", id: "nav-faq" },
]

export default function NavbarDE() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

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
            href="/de"
            className="flex items-center gap-2 group"
            aria-label="Rust Rocket Home"
            id="logo-link"
            data-tracking-id="logo_click"
            onClick={() => trackNavClick("logo")}
          >
            <div className="bg-transparent p-1 rounded-md group-hover:bg-primary/10 transition-all duration-300">
              <Image
                src="/images/rust-rocket-logo.png"
                alt="Rust Rocket Logo"
                width={48}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </div>
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
        </motion.nav>

        {/* CTA Button and Language Selector */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center gap-1 text-text-primary hover:text-primary transition-colors p-2"
              aria-expanded={languageMenuOpen}
              aria-haspopup="true"
              aria-label="Sprache wählen"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">DE</span>
            </button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {languageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-background-secondary border border-gray-800 rounded-md shadow-lg z-50"
                  onMouseLeave={() => setLanguageMenuOpen(false)}
                >
                  <div className="py-1">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary hover:text-primary transition-colors"
                      onClick={() => {
                        setLanguageMenuOpen(false)
                        trackNavClick("language_en")
                      }}
                      lang="en"
                      hrefLang="en"
                    >
                      English
                    </Link>
                    <Link
                      href="/de"
                      className="block px-4 py-2 text-sm text-primary bg-background-tertiary/50"
                      onClick={() => {
                        setLanguageMenuOpen(false)
                        trackNavClick("language_de")
                      }}
                      lang="de"
                      hrefLang="de"
                      aria-current="true"
                    >
                      Deutsch
                    </Link>
                    <Link
                      href="/es"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary hover:text-primary transition-colors"
                      onClick={() => {
                        setLanguageMenuOpen(false)
                        trackNavClick("language_es")
                      }}
                      lang="es"
                      hrefLang="es"
                    >
                      Español
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <WaitlistButton
            id="nav-waitlist-button"
            data-tracking-id="nav_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md"
          >
            Warteliste
          </WaitlistButton>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobile Language Selector */}
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="flex items-center gap-1 text-text-primary hover:text-primary transition-colors"
            aria-expanded={languageMenuOpen}
            aria-haspopup="true"
            aria-label="Sprache wählen"
          >
            <Globe className="w-5 h-5" />
          </button>

          <WaitlistButton
            id="nav-mobile-waitlist-button"
            data-tracking-id="nav_mobile_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-md"
          >
            Warteliste
          </WaitlistButton>
          <button
            type="button"
            className="text-text-primary hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-button"
            data-tracking-id={mobileMenuOpen ? "mobile_menu_close" : "mobile_menu_open"}
          >
            <span className="sr-only">Menü umschalten</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile language menu */}
      <AnimatePresence>
        {languageMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background-secondary/90 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container-custom py-2 space-y-1">
              <Link
                href="/"
                className="block text-base font-medium py-2 px-3 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors"
                onClick={() => {
                  setLanguageMenuOpen(false)
                  trackNavClick("mobile_language_en")
                }}
                lang="en"
                hrefLang="en"
              >
                English
              </Link>
              <Link
                href="/de"
                className="block text-base font-medium py-2 px-3 rounded-md text-primary bg-background-tertiary/50"
                onClick={() => {
                  setLanguageMenuOpen(false)
                  trackNavClick("mobile_language_de")
                }}
                lang="de"
                hrefLang="de"
                aria-current="true"
              >
                Deutsch
              </Link>
              <Link
                href="/es"
                className="block text-base font-medium py-2 px-3 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors"
                onClick={() => {
                  setLanguageMenuOpen(false)
                  trackNavClick("mobile_language_es")
                }}
                lang="es"
                hrefLang="es"
              >
                Español
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <nav className="container-custom py-4 space-y-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  id={`mobile-${link.id}`}
                  data-tracking-id={`mobile_nav_${link.name.toLowerCase().replace(/\s+/g, "_")}_click`}
                  onClick={() => trackNavClick(`mobile_${link.name}`)}
                  className="block text-base font-medium py-2 px-3 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors"
                  aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-800 mt-4"></div>
              <div className="pt-2 border-t border-gray-800 mt-2">
                <a
                  href="https://t.me/rustxrocket"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-telegram-link"
                  data-tracking-id="mobile_telegram_click"
                  onClick={() => trackNavClick("telegram")}
                  className="flex items-center justify-between py-2 px-3 text-text-primary hover:text-primary hover:bg-background-tertiary rounded-md transition-colors"
                  aria-label="Telegram Kanal (öffnet in einem neuen Tab)"
                >
                  <span>Telegram Kanal</span>
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
