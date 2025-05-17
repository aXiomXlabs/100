"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Shield, Zap, BarChart3, Rocket, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import WaitlistButton from "@/components/WaitlistButton"
import Script from "next/script"

export default function SolanaSniperBotClientPage() {
  const shadowGlowRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    // Add shadow-glow class for the BDN network visualization
    const style = document.createElement("style")
    style.innerHTML = `
  .shadow-glow {
    box-shadow: 0 0 8px 2px hsl(var(--primary) / 0.3);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 8px 2px hsl(var(--primary) / 0.3); }
    50% { box-shadow: 0 0 12px 4px hsl(var(--primary) / 0.5); }
    100% { box-shadow: 0 0 8px 2px hsl(var(--primary) / 0.3); }
  }
  
  .image-glow {
    position: relative;
  }
  
  .image-glow::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0.75rem;
    box-shadow: 0 0 25px 2px hsl(var(--primary) / 0.3);
    z-index: 1;
    pointer-events: none;
  }
  
  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, hsl(var(--background)) 100%);
    z-index: 2;
    pointer-events: none;
    border-radius: 0.75rem;
  }

  /* Neue Animationen für Bilder */
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }

  @keyframes subtle-zoom {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  @keyframes subtle-glow {
    0% { filter: brightness(1) saturate(1); }
    50% { filter: brightness(1.1) saturate(1.1); }
    100% { filter: brightness(1) saturate(1); }
  }

  @keyframes subtle-rotate {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(0.5deg); }
    75% { transform: rotate(-0.5deg); }
    100% { transform: rotate(0deg); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-subtle-zoom {
    animation: subtle-zoom 8s ease-in-out infinite;
  }

  .animate-subtle-glow {
    animation: subtle-glow 4s ease-in-out infinite;
  }

  .animate-subtle-rotate {
    animation: subtle-rotate 10s ease-in-out infinite;
    transform-origin: center;
  }

  .animate-delay-1 {
    animation-delay: 1s;
  }

  .animate-delay-2 {
    animation-delay: 2s;
  }

  .animate-delay-3 {
    animation-delay: 3s;
  }

  /* Hover-Effekte für Bilder */
  .hover-scale {
    transition: transform 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.03);
  }
`
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <Navbar />
      <Script
        id="schema-solana-sniper-bot"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://rust-rocket.com/solana-sniper-bot",
            },
            headline: "Solana Sniper Bot with 25ms Execution Time & Same-Block Execution",
            description:
              "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium.",
            image: "https://rust-rocket.com/images/og-image.png",
            author: {
              "@type": "Organization",
              name: "Rust Rocket Team",
            },
            publisher: {
              "@type": "Organization",
              name: "Rust Rocket",
              logo: {
                "@type": "ImageObject",
                url: "https://rust-rocket.com/favicon-512.png",
              },
            },
            datePublished: "2025-05-17T12:00:00+00:00",
            dateModified: "2025-05-17T12:00:00+00:00",
          }),
        }}
      />

      <main className="bg-background text-text-primary overflow-hidden">
        {/* Hero Section */}
        <section className="container-custom py-24 md:py-32 flex flex-col items-center text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
              Solana Sniper Bot
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
              The fastest Solana Trading Bot with <span className="text-primary font-semibold">25ms latency</span> and
              same-block execution
            </p>
          </div>

          <div className="mt-16 relative w-full max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
            <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
              <div className="animate-subtle-zoom">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Solana Sniper Bot Advanced Trading Dashboard"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
              <div className="gradient-overlay"></div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="container-custom py-16 md:py-24" id="key-features">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Solana Sniper Bot Is The Best</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Designed for maximum speed and reliability to give you a decisive advantage in the Solana ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>25ms Execution Time</CardTitle>
                <CardDescription>
                  Lightning-fast execution through optimized infrastructure and direct blockchain connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Up to 16x faster than standard bots</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Optimized transaction processing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Minimal slippage due to fast execution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Same-Block Execution</CardTitle>
                <CardDescription>Execute trades in the same Solana block as the original event</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Perfect for token launches on Pump.fun</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Buy new tokens at the lowest price</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Maximize your profits through early entry</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Intelligent Copy-Trading</CardTitle>
                <CardDescription>Automatically identify successful traders and copy their strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Automatic detection of profitable traders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customizable stop-loss and take-profit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Risk management through intelligent filters</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Rug-Pull Protection</CardTitle>
                <CardDescription>Built-in security features to protect against fraudulent projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Automatic contract analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-time monitoring of liquidity changes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Emergency sell function for suspicious activities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Rocket className="h-10 w-10 text-primary mb-2" />
                <CardTitle>15 Private BDN Gateways</CardTitle>
                <CardDescription>Global network of private Block Distribution Network gateways</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Direct connections to the Solana blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>No congestion during high transaction volume</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Geographically distributed servers for minimal latency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-background-secondary border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Detailed insights into your trading performance and market trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-time performance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Historical data analysis for better decisions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customizable dashboards and reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container-custom py-16 md:py-24 bg-background-tertiary rounded-3xl my-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Solana Sniper Bot Works</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A look behind the scenes of our advanced technology
            </p>
          </div>

          <Tabs defaultValue="sniper" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="sniper">Sniper Mode</TabsTrigger>
              <TabsTrigger value="copy">Copy Trading</TabsTrigger>
              <TabsTrigger value="network">BDN Network</TabsTrigger>
            </TabsList>

            <TabsContent value="sniper" className="bg-background-secondary p-6 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Same-Block Execution Technology</h3>
                  <p className="mb-4 text-text-secondary">
                    Our Sniper Bot uses proprietary technology to execute transactions in the same Solana block as the
                    triggering event. This allows you to buy new token launches at the earliest possible moment.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Detection of new token launches in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Optimized transaction routes for minimal latency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automatic adjustment of gas fees for guaranteed execution</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
                    <div className="animate-subtle-glow">
                      <Image
                        src="/images/solana-sniper-execution.png"
                        alt="Solana Sniper Bot Execution Technology"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                    <div className="gradient-overlay"></div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="copy" className="bg-background-secondary p-6 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
                    <div className="animate-float animate-delay-1">
                      <Image
                        src="/images/solana-copy-trading-dashboard.png"
                        alt="Solana Copy Trading Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                    <div className="gradient-overlay"></div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Intelligent Copy-Trading System</h3>
                  <p className="mb-4 text-text-secondary">
                    Our copy-trading system automatically identifies successful traders on Solana and copies their
                    strategies with customizable parameters for risk management and profit maximization.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>AI-powered detection of profitable traders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Individual customization of stop-loss and take-profit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automatic diversification across multiple traders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="bg-background-secondary p-6 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">15 Private BDN Gateways</h3>
                  <p className="mb-4 text-text-secondary">
                    Our global network of 15 private Block Distribution Network (BDN) gateways provides direct,
                    low-latency connections to the Solana blockchain for maximum speed and reliability.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Strategically placed servers in data centers worldwide</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Redundant connections for 99.9% uptime</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automatic routing through the fastest available connection</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
                    <div className="animate-subtle-rotate animate-delay-2">
                      <Image
                        src="/images/solana-bdn-network.png"
                        alt="Solana BDN Network Visualization"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                    <div className="gradient-overlay"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Telegram Integration Section */}
        <section className="container-custom py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Control Everything from Telegram</h2>
              <p className="text-lg text-text-secondary mb-6">
                Our Solana Sniper Bot is fully integrated with Telegram, allowing you to execute trades, monitor
                performance, and receive alerts directly in your favorite messaging app.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Simple command interface for executing trades</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Real-time alerts for price movements and opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Secure authentication system to protect your wallet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detailed performance reports and analytics</span>
                </li>
              </ul>

              <Button asChild>
                <a href="https://t.me/rustrocket_bot" target="_blank" rel="noopener noreferrer" className="gap-2">
                  Try Demo Bot <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
              <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border image-glow hover-scale">
                <div className="animate-float animate-delay-3">
                  <Image
                    src="/images/solana-telegram-bot.png"
                    alt="Solana Telegram Bot Interface"
                    width={600}
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="gradient-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container-custom py-16 md:py-24 bg-background-tertiary rounded-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases for Our Solana Sniper Bot</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover how our bot can give you an advantage in various trading scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Pump.fun Token Launches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Be one of the first to get in on new token launches on Pump.fun. With our same-block execution, you
                  can buy new tokens at the lowest price and benefit from the initial price surges.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Automatic detection of new listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Lightning-fast execution at launch price</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Use Case 2 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Meme Coin Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Maximize your profits in the volatile meme coin market. Our bot allows you to quickly react to market
                  movements and profit from short-term price fluctuations.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Quick response to market trends</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Built-in rug-pull protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Use Case 3 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Expert Copy Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Benefit from the strategies of successful Solana traders without having to actively trade yourself.
                  Our intelligent copy-trading system automatically identifies and copies the best traders.
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Access to professional strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customizable risk management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-custom py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Dominate Solana Trading?</h2>
            <p className="text-lg text-text-secondary mb-8">
              Join our waitlist today to be among the first to access our Solana Sniper Bot when we launch. Limited
              spots available for our beta program.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <WaitlistButton size="lg" className="px-8">
                Join Waitlist <ExternalLink className="ml-2 h-4 w-4" />
              </WaitlistButton>
              <Button variant="outline" size="lg" className="px-8" asChild>
                <a href="https://t.me/rustrocket_bot" target="_blank" rel="noopener noreferrer">
                  Try Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
