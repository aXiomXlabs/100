"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Animation Varianten für Container-Elemente
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Animation Varianten für einzelne Elemente
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-[#141414] border-t border-gray-800 py-3 shadow-md" role="contentinfo">
      <motion.div
        className="container-custom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Main footer content - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center">
          {/* Logo and copyright - full width on mobile, normal on larger screens */}
          <motion.div
            className="flex flex-col items-center sm:items-start col-span-1 order-1 sm:order-1"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              aria-label="Rust Rocket Home"
              id="footer-logo-link"
              data-tracking-id="footer_logo_click"
            >
              <div className="relative h-[85px] w-[107px]">
                <Image
                  src="/images/rust-rocket-logo.gif"
                  alt="Rust Rocket Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Social media - centered on mobile, right-aligned on larger screens */}
          <motion.div className="flex flex-col items-center sm:items-end order-2 sm:order-2" variants={itemVariants}>
            <h2 className="font-medium text-text-primary mb-2 text-lg">Connect With Us</h2>
            <div className="flex justify-center lg:justify-end gap-4">
              {/* Telegram */}
              <SocialLink
                href="https://t.me/rust_rocket"
                label="Telegram Channel"
                id="footer-telegram-link"
                trackingId="footer_telegram_click"
                bgColor="bg-[#0088cc]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </SocialLink>

              {/* X (formerly Twitter) */}
              <SocialLink
                href="https://x.com/ax_rustrocket"
                label="X Profile"
                id="footer-x-link"
                trackingId="footer_x_click"
                bgColor="bg-black"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </SocialLink>

              {/* Discord */}
              <SocialLink
                href="https://discord.gg/9nVZAEWJfc"
                label="Discord Server"
                id="footer-discord-link"
                trackingId="footer_discord_click"
                bgColor="bg-[#5865F2]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a17.27 17.27 0 0 0-5.487 0 12.623 12.623 0 0 0-.617-1.414.077.077 0 0 0-.079-.036 19.798 19.798 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.203 13.203 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
                </svg>
              </SocialLink>
            </div>
          </motion.div>
        </div>

        {/* Legal links */}
        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
          <Link href="/legal/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal/imprint" className="hover:text-white transition-colors">
            Legal Notice
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        {/* Copyright text in a separate row */}
        <div className="mt-1 text-center">
          <p className="text-gray-400 text-xs">© {currentYear} Rust Rocket. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  )
}

// Helper component for social links to reduce repetition
interface SocialLinkProps {
  href: string
  label: string
  id: string
  trackingId: string
  bgColor: string
  hoverEffect: string
  children: React.ReactNode
}

function SocialLink({ href, label, id, trackingId, bgColor, hoverEffect, children }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${bgColor} text-white w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${hoverEffect}`}
        aria-label={`${label} (opens in a new tab)`}
        id={id}
        data-tracking-id={trackingId}
      >
        {children}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  )
}
