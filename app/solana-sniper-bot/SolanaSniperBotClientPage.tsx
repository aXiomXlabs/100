"use client"

import { useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Shield, Zap, BarChart3, Rocket, Users, Bell } from "lucide-react"
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
              <div className="animate-subtle-zoom relative">
                <div className="dashboard-animation w-full h-full rounded-xl overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-background-secondary border-b border-border p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE TRADING</span>
                    </div>
                    <div className="flex space-x-4">
                      <div className="px-3 py-1 bg-background rounded-md border border-border text-sm">24h</div>
                      <div className="px-3 py-1 bg-primary/10 rounded-md border border-primary/30 text-primary text-sm">
                        Sniper Mode
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-background">
                    {/* Left Panel - Token List */}
                    <div className="col-span-3 bg-background-secondary rounded-lg p-3 border border-border h-[300px] overflow-hidden">
                      <div className="text-sm font-medium mb-3 text-primary">Active Snipers</div>

                      {/* Token Items */}
                      {[
                        { name: "PUMP", change: "+142.3%", active: true },
                        { name: "BONK", change: "+27.8%", active: false },
                        { name: "SOL", change: "+5.2%", active: false },
                        { name: "MEME", change: "+63.1%", active: false },
                      ].map((token, i) => (
                        <div
                          key={i}
                          className={`flex justify-between items-center p-2 rounded-md mb-2 ${token.active ? "bg-primary/10 border border-primary/30" : "hover:bg-background-tertiary"}`}
                        >
                          <span>{token.name}</span>
                          <span className="text-green-500">{token.change}</span>
                        </div>
                      ))}

                      <div className="animate-pulse mt-4 flex justify-center">
                        <div className="text-xs text-primary">Scanning for new tokens...</div>
                      </div>
                    </div>

                    {/* Center Panel - Chart */}
                    <div className="col-span-6 bg-background-secondary rounded-lg p-3 border border-border h-[300px] flex flex-col">
                      <div className="flex justify-between mb-3">
                        <div className="text-sm font-medium">
                          PUMP/SOL <span className="text-green-500">+142.3%</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                          <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        </div>
                      </div>

                      {/* Animated Chart */}
                      <div className="flex-1 relative">
                        <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
                          {/* Background Grid */}
                          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                          {/* Chart Line */}
                          <path
                            d="M0,180 C20,170 40,120 60,110 C80,100 100,90 120,85 C140,80 160,50 180,40 C200,30 220,25 240,20 C260,15 280,10 300,5"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="3"
                            strokeDasharray="300"
                            strokeDashoffset="0"
                            className="animate-draw-line"
                          />

                          {/* Chart Area Fill */}
                          <path
                            d="M0,180 C20,170 40,120 60,110 C80,100 100,90 120,85 C140,80 160,50 180,40 C200,30 220,25 240,20 C260,15 280,10 300,5 V200 H0 Z"
                            fill="url(#chartGradient)"
                            opacity="0.3"
                            className="animate-fill-area"
                          />

                          {/* Highlight Point */}
                          <circle cx="240" cy="20" r="4" fill="hsl(var(--primary))" className="animate-pulse" />

                          {/* Gradient Definition */}
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Buy Point Marker */}
                        <div className="absolute left-[20%] top-[55%] flex flex-col items-center">
                          <div className="h-4 w-4 rounded-full bg-green-500 animate-ping absolute opacity-30"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500 z-10"></div>
                          <div className="mt-1 text-xs bg-green-500/20 text-green-500 px-1 rounded">Entry</div>
                        </div>
                      </div>

                      {/* Time Labels */}
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>12:00</span>
                        <span>12:05</span>
                        <span>12:10</span>
                        <span>12:15</span>
                        <span>12:20</span>
                        <span>Now</span>
                      </div>
                    </div>

                    {/* Right Panel - Stats */}
                    <div className="col-span-3 bg-background-secondary rounded-lg p-3 border border-border h-[300px] flex flex-col">
                      <div className="text-sm font-medium mb-3">Performance</div>

                      {/* Stats */}
                      <div className="space-y-4 flex-1">
                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-gray-400">Execution Time</div>
                          <div className="text-lg font-bold text-primary">25ms</div>
                        </div>

                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-gray-400">Success Rate</div>
                          <div className="text-lg font-bold text-green-500">99.7%</div>
                        </div>

                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-gray-400">Profit (24h)</div>
                          <div className="text-lg font-bold text-green-500">+2.83 SOL</div>
                        </div>

                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-gray-400">Active Snipers</div>
                          <div className="text-lg font-bold">4</div>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center justify-between mt-2 bg-green-500/10 p-2 rounded-md border border-green-500/30">
                        <span className="text-sm text-green-500">System Operational</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Notification */}
                  <div className="absolute bottom-4 right-4 bg-green-500/10 border border-green-500/30 p-3 rounded-lg max-w-xs animate-fade-in-up">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Trade Executed</div>
                        <div className="text-xs text-gray-400">Bought 3000 PUMP at 0.00014 SOL</div>
                        <div className="text-xs text-green-500 mt-1">Execution time: 25ms</div>
                      </div>
                    </div>
                  </div>
                </div>

                <style jsx>{`
                  @keyframes draw-line {
                    0% { stroke-dashoffset: 300; }
                    100% { stroke-dashoffset: 0; }
                  }

                  @keyframes fill-area {
                    0% { opacity: 0; }
                    60% { opacity: 0; }
                    100% { opacity: 0.3; }
                  }

                  @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(10px); }
                    70% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }

                  .animate-draw-line {
                    animation: draw-line 3s ease-out forwards;
                  }

                  .animate-fill-area {
                    animation: fill-area 3s ease-out forwards;
                  }

                  .animate-fade-in-up {
                    animation: fade-in-up 4s ease-out forwards;
                  }
                `}</style>
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
                    <div className="animate-subtle-glow relative h-[300px] w-full">
                      <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                        {/* Background Grid */}
                        <defs>
                          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          </pattern>
                          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="url(#smallGrid)" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          </pattern>
                          <linearGradient id="executionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Background */}
                        <rect width="600" height="400" fill="url(#grid)" />

                        {/* Blockchain Timeline */}
                        <line
                          x1="50"
                          y1="200"
                          x2="550"
                          y2="200"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />

                        {/* Block Markers */}
                        {[100, 200, 300, 400, 500].map((x, i) => (
                          <g key={i}>
                            <circle cx={x} cy="200" r="8" fill="rgba(255,255,255,0.1)" />
                            <text x={x} y="230" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12">
                              Block {i + 1}
                            </text>
                          </g>
                        ))}

                        {/* Execution Point */}
                        <circle
                          cx="200"
                          cy="200"
                          r="15"
                          fill="hsl(var(--primary))"
                          className="animate-ping-slow opacity-30"
                        />
                        <circle cx="200" cy="200" r="8" fill="hsl(var(--primary))" filter="url(#glow)" />

                        {/* Execution Line */}
                        <line
                          x1="200"
                          y1="200"
                          x2="300"
                          y2="200"
                          stroke="url(#executionGradient)"
                          strokeWidth="4"
                          strokeDasharray="100"
                          strokeDashoffset="100"
                          className="animate-dash"
                        />

                        {/* Execution Time */}
                        <g className="animate-fade-in">
                          <rect x="220" y="150" width="60" height="30" rx="5" fill="rgba(0,0,0,0.5)" />
                          <text
                            x="250"
                            y="170"
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            25ms
                          </text>
                        </g>

                        {/* Competitor Bot (slower) */}
                        <g className="animate-competitor-delay">
                          <circle cx="200" cy="200" r="6" fill="rgba(255,100,100,0.8)" />
                          <line
                            x1="200"
                            y1="200"
                            x2="300"
                            y2="200"
                            stroke="rgba(255,100,100,0.5)"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            className="animate-dash-slow"
                          />
                          <g className="animate-fade-in-slow">
                            <rect x="220" y="110" width="80" height="30" rx="5" fill="rgba(0,0,0,0.5)" />
                            <text x="260" y="130" textAnchor="middle" fill="rgba(255,100,100,0.8)" fontSize="14">
                              400ms
                            </text>
                          </g>
                        </g>

                        {/* Labels */}
                        <text x="50" y="50" fill="white" fontSize="18" fontWeight="bold">
                          Solana Sniper Execution
                        </text>
                        <text x="50" y="80" fill="rgba(255,255,255,0.7)" fontSize="14">
                          Same-block execution technology
                        </text>

                        <text x="200" y="260" fill="hsl(var(--primary))" fontSize="14" fontWeight="bold">
                          Our Bot
                        </text>
                        <text x="200" y="320" fill="rgba(255,100,100,0.8)" fontSize="14">
                          Competitor
                        </text>

                        {/* Target Token */}
                        <g className="animate-pulse-slow">
                          <circle cx="300" cy="200" r="12" fill="rgba(100,255,100,0.3)" />
                          <circle cx="300" cy="200" r="8" fill="rgba(100,255,100,0.8)" />
                          <text x="300" y="180" textAnchor="middle" fill="white" fontSize="12">
                            Target
                          </text>
                        </g>

                        {/* Success Indicator */}
                        <g className="animate-success">
                          <rect x="320" y="170" width="100" height="40" rx="5" fill="rgba(0,0,0,0.5)" />
                          <text x="370" y="195" textAnchor="middle" fill="rgba(100,255,100,0.8)" fontSize="14">
                            SUCCESS
                          </text>
                        </g>
                      </svg>

                      <style jsx>{`
                        @keyframes ping-slow {
                          0% { transform: scale(1); opacity: 0.3; }
                          50% { transform: scale(1.5); opacity: 0.1; }
                          100% { transform: scale(1); opacity: 0.3; }
                        }

                        @keyframes dash {
                          to {
                            stroke-dashoffset: 0;
                          }
                        }

                        @keyframes dash-slow {
                          0% { stroke-dashoffset: 100; }
                          30% { stroke-dashoffset: 100; }
                          100% { stroke-dashoffset: 0; }
                        }

                        @keyframes fade-in {
                          0% { opacity: 0; }
                          50% { opacity: 0; }
                          100% { opacity: 1; }
                        }

                        @keyframes fade-in-slow {
                          0% { opacity: 0; }
                          70% { opacity: 0; }
                          100% { opacity: 1; }
                        }

                        @keyframes pulse-slow {
                          0% { transform: scale(1); }
                          50% { transform: scale(1.2); }
                          100% { transform: scale(1); }
                        }

                        @keyframes success-appear {
                          0% { opacity: 0; transform: translateX(-20px); }
                          70% { opacity: 0; transform: translateX(-20px); }
                          100% { opacity: 1; transform: translateX(0); }
                        }

                        .animate-ping-slow {
                          animation: ping-slow 2s infinite;
                        }

                        .animate-dash {
                          animation: dash 1s forwards;
                        }

                        .animate-dash-slow {
                          animation: dash-slow 2s forwards;
                        }

                        .animate-fade-in {
                          animation: fade-in 1.5s forwards;
                        }

                        .animate-fade-in-slow {
                          animation: fade-in-slow 2.5s forwards;
                        }

                        .animate-pulse-slow {
                          animation: pulse-slow 2s infinite;
                        }

                        .animate-competitor-delay {
                          animation-delay: 1s;
                          opacity: 0;
                          animation: fade-in 0.5s 1s forwards;
                        }

                        .animate-success {
                          opacity: 0;
                          animation: success-appear 2s forwards;
                        }
                      `}</style>
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
                    <div className="animate-float animate-delay-1 relative h-[300px] w-full">
                      <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                        {/* Background Grid */}
                        <defs>
                          <pattern id="copyTradingGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          </pattern>
                          <linearGradient id="profitGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="rgba(100,255,100,0)" />
                            <stop offset="100%" stopColor="rgba(100,255,100,0.5)" />
                          </linearGradient>
                          <linearGradient id="lossGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,100,100,0)" />
                            <stop offset="100%" stopColor="rgba(255,100,100,0.5)" />
                          </linearGradient>
                          <filter id="traderGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Background */}
                        <rect width="600" height="400" fill="url(#copyTradingGrid)" />

                        {/* Title */}
                        <text x="50" y="50" fill="white" fontSize="18" fontWeight="bold">
                          Intelligent Copy Trading System
                        </text>
                        <text x="50" y="80" fill="rgba(255,255,255,0.7)" fontSize="14">
                          Automatically copy successful traders
                        </text>

                        {/* Pro Trader Section */}
                        <g className="animate-fade-in">
                          <rect
                            x="50"
                            y="120"
                            width="200"
                            height="180"
                            rx="10"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                          />
                          <text x="150" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                            Pro Traders
                          </text>

                          {/* Trader 1 - Profitable */}
                          <g className="animate-trader-1">
                            <circle cx="100" cy="180" r="15" fill="rgba(100,255,100,0.2)" />
                            <circle cx="100" cy="180" r="10" fill="rgba(100,255,100,0.8)" filter="url(#traderGlow)" />
                            <text x="100" y="215" textAnchor="middle" fill="white" fontSize="12">
                              Trader 1
                            </text>
                            <text x="100" y="235" textAnchor="middle" fill="rgba(100,255,100,0.8)" fontSize="12">
                              +142%
                            </text>

                            {/* Profit Chart */}
                            <polyline
                              points="80,200 85,190 90,195 95,180 100,175 105,165 110,160 115,155 120,150"
                              fill="none"
                              stroke="rgba(100,255,100,0.8)"
                              strokeWidth="2"
                            />
                          </g>

                          {/* Trader 2 - Profitable */}
                          <g className="animate-trader-2">
                            <circle cx="170" cy="180" r="15" fill="rgba(100,255,100,0.2)" />
                            <circle cx="170" cy="180" r="10" fill="rgba(100,255,100,0.8)" filter="url(#traderGlow)" />
                            <text x="170" y="215" textAnchor="middle" fill="white" fontSize="12">
                              Trader 2
                            </text>
                            <text x="170" y="235" textAnchor="middle" fill="rgba(100,255,100,0.8)" fontSize="12">
                              +87%
                            </text>

                            {/* Profit Chart */}
                            <polyline
                              points="150,190 155,185 160,180 165,175 170,180 175,170 180,165 185,160 190,155"
                              fill="none"
                              stroke="rgba(100,255,100,0.8)"
                              strokeWidth="2"
                            />
                          </g>

                          {/* Trader 3 - Loss Making */}
                          <g className="animate-trader-3">
                            <circle cx="240" cy="180" r="15" fill="rgba(255,100,100,0.2)" />
                            <circle
                              cx="240"
                              cy="180"
                              r="10"
                              fill="rgba(255,100,100,0.8)"
                              filter="url(#traderGlow)"
                              opacity="0.5"
                            />
                            <text x="240" y="215" textAnchor="middle" fill="white" fontSize="12">
                              Trader 3
                            </text>
                            <text x="240" y="235" textAnchor="middle" fill="rgba(255,100,100,0.8)" fontSize="12">
                              -23%
                            </text>

                            {/* Loss Chart */}
                            <polyline
                              points="220,170 225,175 230,180 235,185 240,190 245,195 250,190 255,200 260,205"
                              fill="none"
                              stroke="rgba(255,100,100,0.8)"
                              strokeWidth="2"
                            />
                          </g>
                        </g>

                        {/* AI Analysis Section */}
                        <g className="animate-ai-analysis">
                          <rect
                            x="300"
                            y="170"
                            width="100"
                            height="80"
                            rx="10"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                          />
                          <text
                            x="350"
                            y="195"
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            AI Analysis
                          </text>
                          <text x="350" y="220" textAnchor="middle" fill="white" fontSize="12">
                            Performance
                          </text>
                          <text x="350" y="240" textAnchor="middle" fill="white" fontSize="12">
                            Risk Profile
                          </text>
                        </g>

                        {/* Connection Lines */}
                        <g className="animate-connection-1">
                          <line
                            x1="120"
                            y1="180"
                            x2="290"
                            y2="210"
                            stroke="rgba(100,255,100,0.5)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <circle cx="120" cy="180" r="5" fill="rgba(100,255,100,0.8)" className="animate-pulse-slow" />
                        </g>
                        <g className="animate-connection-2">
                          <line
                            x1="190"
                            y1="180"
                            x2="290"
                            y2="210"
                            stroke="rgba(100,255,100,0.5)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <circle cx="190" cy="180" r="5" fill="rgba(100,255,100,0.8)" className="animate-pulse-slow" />
                        </g>
                        <g className="animate-connection-3">
                          <line
                            x1="240"
                            y1="180"
                            x2="290"
                            y2="210"
                            stroke="rgba(255,100,100,0.3)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                          />
                          <text x="260" y="170" fill="rgba(255,100,100,0.8)" fontSize="12">
                            Filtered
                          </text>
                        </g>

                        {/* Your Portfolio */}
                        <g className="animate-your-portfolio">
                          <rect
                            x="450"
                            y="120"
                            width="100"
                            height="180"
                            rx="10"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                          />
                          <text x="500" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                            Your Portfolio
                          </text>

                          {/* Portfolio Stats */}
                          <rect x="460" y="160" width="80" height="30" rx="5" fill="rgba(100,255,100,0.2)" />
                          <text
                            x="500"
                            y="180"
                            textAnchor="middle"
                            fill="rgba(100,255,100,0.8)"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            +112%
                          </text>

                          {/* Portfolio Chart */}
                          <polyline
                            points="460,250 465,245 470,240 475,235 480,230 485,225 490,220 495,215 500,210 505,215 510,210 515,205 520,200 525,195 530,190"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="3"
                            className="animate-draw-chart"
                          />
                          <path
                            d="M460,250 L465,245 L470,240 L475,235 L480,230 L485,225 L490,220 L495,215 L500,210 L505,215 L510,210 L515,205 L520,200 L525,195 L530,190 L530,250 Z"
                            fill="url(#profitGradient)"
                            opacity="0.5"
                            className="animate-fill-chart"
                          />
                        </g>

                        {/* Connection from AI to Portfolio */}
                        <g className="animate-ai-to-portfolio">
                          <line
                            x1="400"
                            y1="210"
                            x2="440"
                            y2="210"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            className="animate-dash"
                          />
                          <polygon
                            points="440,210 430,205 430,215"
                            fill="hsl(var(--primary))"
                            opacity="0"
                            className="animate-arrow"
                          />
                        </g>

                        {/* Settings */}
                        <g className="animate-settings">
                          <rect
                            x="450"
                            y="270"
                            width="100"
                            height="40"
                            rx="5"
                            fill="rgba(255,255,255,0.1)"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="1"
                          />
                          <text x="500" y="295" textAnchor="middle" fill="white" fontSize="12">
                            Risk Settings
                          </text>
                          <circle cx="470" cy="290" r="5" fill="hsl(var(--primary))" />
                          <rect x="485" y="285" width="30" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
                          <circle cx="515" cy="290" r="5" fill="white" />
                        </g>
                      </svg>

                      <style jsx>{`
                        @keyframes fade-in {
                          0% { opacity: 0; }
                          100% { opacity: 1; }
                        }

                        @keyframes pulse-slow {
                          0% { opacity: 0.5; transform: scale(1); }
                          50% { opacity: 1; transform: scale(1.5); }
                          100% { opacity: 0.5; transform: scale(1); }
                        }

                        @keyframes draw-chart {
                          0% { stroke-dasharray: 200; stroke-dashoffset: 200; }
                          100% { stroke-dasharray: 200; stroke-dashoffset: 0; }
                        }

                        @keyframes fill-chart {
                          0% { opacity: 0; }
                          60% { opacity: 0; }
                          100% { opacity: 0.5; }
                        }

                        @keyframes dash {
                          to { stroke-dashoffset: 0; }
                        }

                        @keyframes arrow-appear {
                          0% { opacity: 0; }
                          80% { opacity: 0; }
                          100% { opacity: 1; }
                        }

                        .animate-fade-in {
                          animation: fade-in 1s forwards;
                        }

                        .animate-trader-1 {
                          animation: fade-in 1s 0.5s forwards;
                          opacity: 0;
                        }

                        .animate-trader-2 {
                          animation: fade-in 1s 1s forwards;
                          opacity: 0;
                        }

                        .animate-trader-3 {
                          animation: fade-in 1s 1.5s forwards;
                          opacity: 0;
                        }

                        .animate-ai-analysis {
                          animation: fade-in 1s 2s forwards;
                          opacity: 0;
                        }

                        .animate-connection-1 {
                          animation: fade-in 1s 2.5s forwards;
                          opacity: 0;
                        }

                        .animate-connection-2 {
                          animation: fade-in 1s 3s forwards;
                          opacity: 0;
                        }

                        .animate-connection-3 {
                          animation: fade-in 1s 3.5s forwards;
                          opacity: 0;
                        }

                        .animate-your-portfolio {
                          animation: fade-in 1s 4s forwards;
                          opacity: 0;
                        }

                        .animate-ai-to-portfolio {
                          animation: fade-in 0.1s 4.5s forwards;
                          opacity: 0;
                        }

                        .animate-settings {
                          animation: fade-in 1s 5s forwards;
                          opacity: 0;
                        }

                        .animate-pulse-slow {
                          animation: pulse-slow 2s infinite;
                        }

                        .animate-draw-chart {
                          animation: draw-chart 2s 4.5s forwards;
                          stroke-dasharray: 200;
                          stroke-dashoffset: 200;
                        }

                        .animate-fill-chart {
                          animation: fill-chart 2s 4.5s forwards;
                          opacity: 0;
                        }

                        .animate-dash {
                          animation: dash 1s 4.5s forwards;
                        }

                        .animate-arrow {
                          animation: arrow-appear 1s 5s forwards;
                        }
                      `}</style>
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
                    <div className="animate-subtle-rotate animate-delay-2 relative h-[300px] w-full">
                      <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                        {/* Definitions */}
                        <defs>
                          <pattern id="bdnGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          </pattern>
                          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                          </radialGradient>
                          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Background */}
                        <rect width="600" height="400" fill="url(#bdnGrid)" />
                        <circle
                          cx="300"
                          cy="200"
                          r="150"
                          fill="url(#centerGlow)"
                          opacity="0.2"
                          className="animate-pulse-slow"
                        />

                        {/* Title */}
                        <text x="50" y="50" fill="white" fontSize="18" fontWeight="bold">
                          15 Private BDN Gateways
                        </text>
                        <text x="50" y="75" fill="rgba(255,255,255,0.7)" fontSize="14">
                          Global network for ultra-low latency
                        </text>

                        {/* Central Solana Node */}
                        <g className="animate-central-node">
                          <circle
                            cx="300"
                            cy="200"
                            r="25"
                            fill="rgba(20,20,30,0.8)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                          />
                          <text x="300" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            SOLANA
                          </text>
                          <circle
                            cx="300"
                            cy="200"
                            r="40"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            className="animate-rotate"
                          />
                        </g>

                        {/* BDN Gateway Nodes */}
                        {[
                          { id: 1, x: 150, y: 100, label: "US East", delay: 0.5, latency: "28ms" },
                          { id: 2, x: 100, y: 200, label: "US West", delay: 1, latency: "32ms" },
                          { id: 3, x: 150, y: 300, label: "Brazil", delay: 1.5, latency: "45ms" },
                          { id: 4, x: 300, y: 100, label: "London", delay: 2, latency: "31ms" },
                          { id: 5, x: 300, y: 300, label: "Singapore", delay: 2.5, latency: "38ms" },
                          { id: 6, x: 450, y: 100, label: "Frankfurt", delay: 3, latency: "29ms" },
                          { id: 7, x: 500, y: 200, label: "Tokyo", delay: 3.5, latency: "42ms" },
                          { id: 8, x: 450, y: 300, label: "Sydney", delay: 4, latency: "48ms" },
                        ].map((node) => (
                          <g key={node.id} className={`animate-node-${node.id}`}>
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r="15"
                              fill="rgba(20,20,30,0.8)"
                              stroke="hsl(var(--primary))"
                              strokeWidth="1.5"
                            />
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r="8"
                              fill="hsl(var(--primary))"
                              filter="url(#nodeGlow)"
                              className="animate-pulse-slow"
                            />
                            <text x={node.x} y={node.y + 30} textAnchor="middle" fill="white" fontSize="10">
                              {node.label}
                            </text>
                            <text
                              x={node.x}
                              y={node.y + 45}
                              textAnchor="middle"
                              fill="hsl(var(--primary))"
                              fontSize="10"
                            >
                              {node.latency}
                            </text>
                          </g>
                        ))}

                        {/* Connection Lines */}
                        {[
                          { from: { x: 150, y: 100 }, to: { x: 300, y: 200 }, delay: 0.8, active: true },
                          { from: { x: 100, y: 200 }, to: { x: 300, y: 200 }, delay: 1.3, active: true },
                          { from: { x: 150, y: 300 }, to: { x: 300, y: 200 }, delay: 1.8, active: true },
                          { from: { x: 300, y: 100 }, to: { x: 300, y: 200 }, delay: 2.3, active: true },
                          { from: { x: 300, y: 300 }, to: { x: 300, y: 200 }, delay: 2.8, active: true },
                          { from: { x: 450, y: 100 }, to: { x: 300, y: 200 }, delay: 3.3, active: true },
                          { from: { x: 500, y: 200 }, to: { x: 300, y: 200 }, delay: 3.8, active: true },
                          { from: { x: 450, y: 300 }, to: { x: 300, y: 200 }, delay: 4.3, active: true },
                          // Cross connections between nodes
                          { from: { x: 150, y: 100 }, to: { x: 300, y: 100 }, delay: 4.8, active: false },
                          { from: { x: 300, y: 100 }, to: { x: 450, y: 100 }, delay: 5.0, active: false },
                          { from: { x: 100, y: 200 }, to: { x: 500, y: 200 }, delay: 5.2, active: false },
                          { from: { x: 150, y: 300 }, to: { x: 300, y: 300 }, delay: 5.4, active: false },
                          { from: { x: 300, y: 300 }, to: { x: 450, y: 300 }, delay: 5.6, active: false },
                        ].map((connection, i) => (
                          <g key={i} className={`animate-connection-${i + 1}`}>
                            <line
                              x1={connection.from.x}
                              y1={connection.from.y}
                              x2={connection.to.x}
                              y2={connection.to.y}
                              stroke={connection.active ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)"}
                              strokeWidth={connection.active ? 1.5 : 1}
                              strokeDasharray={connection.active ? "none" : "5,5"}
                            />
                            {connection.active && (
                              <circle
                                cx={(connection.from.x + connection.to.x) / 2}
                                cy={(connection.from.y + connection.to.y) / 2}
                                r="3"
                                fill="white"
                                className="animate-data-packet"
                              />
                            )}
                          </g>
                        ))}

                        {/* Data Packets */}
                        {[1, 2, 3, 4, 5].map((i) => (
                          <circle key={i} cx="300" cy="200" r="5" fill="white" className={`animate-packet-${i}`} />
                        ))}

                        {/* Stats Boxes */}
                        <g className="animate-stats-1">
                          <rect
                            x="50"
                            y="320"
                            width="120"
                            height="50"
                            rx="5"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                          />
                          <text x="110" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            Network Uptime
                          </text>
                          <text
                            x="110"
                            y="360"
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            99.9%
                          </text>
                        </g>

                        <g className="animate-stats-2">
                          <rect
                            x="240"
                            y="320"
                            width="120"
                            height="50"
                            rx="5"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                          />
                          <text x="300" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            Avg. Latency
                          </text>
                          <text
                            x="300"
                            y="360"
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            25ms
                          </text>
                        </g>

                        <g className="animate-stats-3">
                          <rect
                            x="430"
                            y="320"
                            width="120"
                            height="50"
                            rx="5"
                            fill="rgba(0,0,0,0.3)"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                          />
                          <text x="490" y="340" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            Success Rate
                          </text>
                          <text
                            x="490"
                            y="360"
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            99.7%
                          </text>
                        </g>

                        {/* Live Status Indicator */}
                        <g className="animate-live-status">
                          <rect
                            x="430"
                            y="50"
                            width="120"
                            height="30"
                            rx="15"
                            fill="rgba(0,0,0,0.3)"
                            stroke="rgba(100,255,100,0.5)"
                            strokeWidth="1"
                          />
                          <circle cx="450" cy="65" r="5" fill="rgba(100,255,100,0.8)" className="animate-blink" />
                          <text
                            x="490"
                            y="70"
                            textAnchor="middle"
                            fill="rgba(100,255,100,0.8)"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            NETWORK ACTIVE
                          </text>
                        </g>
                      </svg>

                      <style jsx>{`
                        @keyframes fade-in {
                          0% { opacity: 0; }
                          100% { opacity: 1; }
                        }

                        @keyframes pulse-slow {
                          0% { transform: scale(1); opacity: 0.7; }
                          50% { transform: scale(1.1); opacity: 1; }
                          100% { transform: scale(1); opacity: 0.7; }
                        }

                        @keyframes rotate {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }

                        @keyframes blink {
                          0% { opacity: 0.5; }
                          50% { opacity: 1; }
                          100% { opacity: 0.5; }
                        }

                        @keyframes data-packet-animation {
                          0% { transform: scale(0.5); opacity: 0.8; }
                          50% { transform: scale(1.5); opacity: 1; }
                          100% { transform: scale(0.5); opacity: 0.8; }
                        }

                        @keyframes packet-move-1 {
                          0%, 100% { transform: translate(0, 0); opacity: 0; }
                          10% { transform: translate(-100px, -80px); opacity: 1; }
                          20% { transform: translate(-150px, -100px); opacity: 0; }
                        }

                        @keyframes packet-move-2 {
                          0%, 100% { transform: translate(0, 0); opacity: 0; }
                          30% { transform: translate(120px, -70px); opacity: 1; }
                          40% { transform: translate(150px, -100px); opacity: 0; }
                        }

                        @keyframes packet-move-3 {
                          0%, 100% { transform: translate(0, 0); opacity: 0; }
                          50% { transform: translate(150px, 80px); opacity: 1; }
                          60% { transform: translate(200px, 100px); opacity: 0; }
                        }

                        @keyframes packet-move-4 {
                          0%, 100% { transform: translate(0, 0); opacity: 0; }
                          70% { transform: translate(-120px, 70px); opacity: 1; }
                          80% { transform: translate(-150px, 100px); opacity: 0; }
                        }

                        @keyframes packet-move-5 {
                          0%, 100% { transform: translate(0, 0); opacity: 0; }
                          90% { transform: translate(-50px, -120px); opacity: 1; }
                          95% { transform: translate(-70px, -150px); opacity: 0; }
                        }

                        .animate-central-node {
                          animation: fade-in 1s forwards;
                        }

                        .animate-rotate {
                          transform-origin: center;
                          animation: rotate 20s linear infinite;
                        }

                        .animate-pulse-slow {
                          animation: pulse-slow 3s infinite;
                        }

                        .animate-blink {
                          animation: blink 1.5s infinite;
                        }

                        .animate-data-packet {
                          animation: data-packet-animation 2s infinite;
                        }

                        .animate-node-1 {
                          opacity: 0;
                          animation: fade-in 0.5s 0.5s forwards;
                        }

                        .animate-node-2 {
                          opacity: 0;
                          animation: fade-in 0.5s 1s forwards;
                        }

                        .animate-node-3 {
                          opacity: 0;
                          animation: fade-in 0.5s 1.5s forwards;
                        }

                        .animate-node-4 {
                          opacity: 0;
                          animation: fade-in 0.5s 2s forwards;
                        }

                        .animate-node-5 {
                          opacity: 0;
                          animation: fade-in 0.5s 2.5s forwards;
                        }

                        .animate-node-6 {
                          opacity: 0;
                          animation: fade-in 0.5s 3s forwards;
                        }

                        .animate-node-7 {
                          opacity: 0;
                          animation: fade-in 0.5s 3.5s forwards;
                        }

                        .animate-node-8 {
                          opacity: 0;
                          animation: fade-in 0.5s 4s forwards;
                        }

                        .animate-connection-1 {
                          opacity: 0;
                          animation: fade-in 0.5s 0.8s forwards;
                        }

                        .animate-connection-2 {
                          opacity: 0;
                          animation: fade-in 0.5s 1.3s forwards;
                        }

                        .animate-connection-3 {
                          opacity: 0;
                          animation: fade-in 0.5s 1.8s forwards;
                        }

                        .animate-connection-4 {
                          opacity: 0;
                          animation: fade-in 0.5s 2.3s forwards;
                        }

                        .animate-connection-5 {
                          opacity: 0;
                          animation: fade-in 0.5s 2.8s forwards;
                        }

                        .animate-connection-6 {
                          opacity: 0;
                          animation: fade-in 0.5s 3.3s forwards;
                        }

                        .animate-connection-7 {
                          opacity: 0;
                          animation: fade-in 0.5s 3.8s forwards;
                        }

                        .animate-connection-8 {
                          opacity: 0;
                          animation: fade-in 0.5s 4.3s forwards;
                        }

                        .animate-connection-9 {
                          opacity: 0;
                          animation: fade-in 0.5s 4.8s forwards;
                        }

                        .animate-connection-10 {
                          opacity: 0;
                          animation: fade-in 0.5s 5s forwards;
                        }

                        .animate-connection-11 {
                          opacity: 0;
                          animation: fade-in 0.5s 5.2s forwards;
                        }

                        .animate-connection-12 {
                          opacity: 0;
                          animation: fade-in 0.5s 5.4s forwards;
                        }

                        .animate-connection-13 {
                          opacity: 0;
                          animation: fade-in 0.5s 5.6s forwards;
                        }

                        .animate-stats-1 {
                          opacity: 0;
                          animation: fade-in 0.5s 6s forwards;
                        }

                        .animate-stats-2 {
                          opacity: 0;
                          animation: fade-in 0.5s 6.2s forwards;
                        }

                        .animate-stats-3 {
                          opacity: 0;
                          animation: fade-in 0.5s 6.4s forwards;
                        }

                        .animate-live-status {
                          opacity: 0;
                          animation: fade-in 0.5s 6.6s forwards;
                        }

                        .animate-packet-1 {
                          animation: packet-move-1 8s 7s infinite;
                        }

                        .animate-packet-2 {
                          animation: packet-move-2 8s 7.5s infinite;
                        }

                        .animate-packet-3 {
                          animation: packet-move-3 8s 8s infinite;
                        }

                        .animate-packet-4 {
                          animation: packet-move-4 8s 8.5s infinite;
                        }

                        .animate-packet-5 {
                          animation: packet-move-5 8s 9s infinite;
                        }
                      `}</style>
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Control Everything from Telegram</h2>
            <p className="text-lg text-text-secondary mb-8">
              Our Solana Sniper Bot is fully integrated with Telegram, allowing you to execute trades, monitor
              performance, and receive alerts directly in your favorite messaging app.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-background-secondary p-5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Simple Command Interface</h3>
                <p className="text-text-secondary">Execute trades with simple, intuitive commands</p>
              </div>

              <div className="bg-background-secondary p-5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                <Bell className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Alerts</h3>
                <p className="text-text-secondary">Get notified about price movements and opportunities</p>
              </div>

              <div className="bg-background-secondary p-5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Secure Authentication</h3>
                <p className="text-text-secondary">Protect your wallet with advanced security features</p>
              </div>

              <div className="bg-background-secondary p-5 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Detailed Reports</h3>
                <p className="text-text-secondary">Access comprehensive performance analytics</p>
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
