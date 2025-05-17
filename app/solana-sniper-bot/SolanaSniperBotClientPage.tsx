"use client"

import { useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Shield, Zap, BarChart3, Rocket, Users } from "lucide-react"
import Script from "next/script"
// Füge diese Zeile nach den Imports hinzu
// import { useEffect } from "react"

export default function SolanaSniperBotClientPage() {
  const shadowGlowRef = useRef<HTMLStyleElement | null>(null)
  // Füge diese Zeile am Anfang der SolanaSniperBotPage-Funktion hinzu
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
            <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border">
              <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border">
                <div className="relative aspect-video w-full flex items-center justify-center bg-gradient-to-br from-background-secondary to-background p-6">
                  <div className="grid grid-cols-3 gap-4 w-full h-full">
                    {/* Chart Panel */}
                    <div className="col-span-2 bg-background/80 rounded-lg p-3 border border-border/50 shadow-lg flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-xs font-medium">SOL/USDC</span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">25ms</span>
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Live</span>
                        </div>
                      </div>

                      {/* Chart Visualization */}
                      <div className="flex-1 relative">
                        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-primary/5 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/20"></div>
                        <div className="absolute bottom-[30%] left-0 right-0 h-px bg-border/30"></div>
                        <div className="absolute bottom-[60%] left-0 right-0 h-px bg-border/30"></div>
                        <div className="absolute bottom-[90%] left-0 right-0 h-px bg-border/30"></div>

                        {/* Chart Line */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0,50 L5,48 L10,52 L15,45 L20,47 L25,40 L30,35 L35,30 L40,35 L45,25 L50,28 L55,20 L60,15 L65,25 L70,20 L75,15 L80,10 L85,15 L90,5 L95,10 L100,5"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Control Panel */}
                    <div className="col-span-1 flex flex-col space-y-4">
                      {/* Sniper Module */}
                      <div className="bg-background/80 rounded-lg p-3 border border-border/50 shadow-lg">
                        <div className="text-xs font-semibold mb-2 flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-primary" />
                          <span>Sniper Module</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-background-tertiary rounded-sm w-full"></div>
                          <div className="h-4 bg-background-tertiary rounded-sm w-3/4"></div>
                          <div className="mt-3 h-6 bg-primary rounded-sm w-full"></div>
                        </div>
                      </div>

                      {/* Copy Trading */}
                      <div className="bg-background/80 rounded-lg p-3 border border-border/50 shadow-lg flex-1">
                        <div className="text-xs font-semibold mb-2 flex items-center">
                          <Users className="h-3 w-3 mr-1 text-primary" />
                          <span>Copy Trading</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="h-3 bg-background-tertiary rounded-sm w-3/4"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <div className="h-3 bg-background-tertiary rounded-sm w-1/2"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <div className="h-3 bg-background-tertiary rounded-sm w-2/3"></div>
                          </div>
                        </div>
                      </div>

                      {/* Network Status */}
                      <div className="bg-background/80 rounded-lg p-3 border border-border/50 shadow-lg">
                        <div className="text-xs font-semibold mb-2 flex items-center">
                          <Shield className="h-3 w-3 mr-1 text-primary" />
                          <span>Network Status</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {[...Array(15)].map((_, i) => (
                            <div key={i} className="h-2 bg-green-500 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                      <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border p-4">
                        <div className="aspect-video w-full bg-background/80 rounded-lg p-4">
                          {/* Blockchain Visualization */}
                          <div className="flex flex-col h-full">
                            <div className="text-xs font-semibold mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <Zap className="h-3 w-3 mr-1 text-primary" />
                                <span>Solana Blockchain - Same-Block Execution</span>
                              </div>
                              <div className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs">Live</div>
                            </div>

                            {/* Blockchain Blocks */}
                            <div className="flex-1 flex items-center justify-between space-x-2 mb-4">
                              <div className="flex-1 flex space-x-2">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`flex-1 h-16 rounded border ${i === 2 ? "border-primary bg-primary/10" : "border-border bg-background/50"} flex flex-col items-center justify-center text-xs`}
                                  >
                                    <div className="font-mono">Block</div>
                                    <div className="font-mono">{123456 + i}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Transaction Flow */}
                            <div className="flex-1 relative">
                              <div className="absolute left-[42%] right-0 top-0 h-12 flex items-center">
                                <div className="h-0.5 w-full bg-primary"></div>
                                <div className="absolute right-0 h-2 w-2 rounded-full bg-primary"></div>
                              </div>

                              <div className="absolute left-0 top-0 w-[40%] flex justify-between">
                                <div className="bg-background/80 border border-border rounded p-2 shadow-lg">
                                  <div className="text-xs font-semibold mb-1">Token Launch</div>
                                  <div className="text-xs text-text-secondary">Detected</div>
                                </div>

                                <div className="bg-primary/10 border border-primary/30 rounded p-2 shadow-lg">
                                  <div className="text-xs font-semibold mb-1">Sniper Bot</div>
                                  <div className="text-xs text-primary">25ms Response</div>
                                </div>
                              </div>

                              <div className="absolute right-0 bottom-0 w-[40%]">
                                <div className="bg-green-500/10 border border-green-500/30 rounded p-2 shadow-lg">
                                  <div className="text-xs font-semibold mb-1">Transaction</div>
                                  <div className="text-xs text-green-500">Successfully Executed</div>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="mt-4 h-6 bg-background/50 rounded-lg relative">
                              <div className="absolute inset-y-0 left-0 w-[42%] bg-primary/20 rounded-l-lg"></div>
                              <div className="absolute inset-y-0 left-[42%] w-[3%] bg-primary rounded-sm"></div>
                              <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px]">
                                <span>Token Launch</span>
                                <span className="ml-[38%] text-primary font-bold">25ms</span>
                                <span className="ml-auto">Same Block Execution</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="copy" className="bg-background-secondary p-6 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border p-4">
                    <div className="order-2 md:order-1 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                      <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border p-4">
                        <div className="aspect-video w-full bg-background/80 rounded-lg p-4">
                          {/* Copy Trading Visualization */}
                          <div className="flex flex-col h-full">
                            <div className="text-xs font-semibold mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1 text-primary" />
                                <span>Intelligent Copy Trading System</span>
                              </div>
                              <div className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs">Active</div>
                            </div>

                            {/* Traders and Performance */}
                            <div className="flex-1 grid grid-cols-3 gap-3">
                              {/* Master Traders Column */}
                              <div className="col-span-1 flex flex-col space-y-2">
                                <div className="text-xs font-semibold mb-1 text-center">Top Traders</div>

                                {/* Trader Cards */}
                                {[
                                  { name: "Trader A", profit: "+142%", color: "green" },
                                  { name: "Trader B", profit: "+87%", color: "green" },
                                  { name: "Trader C", profit: "+53%", color: "green" },
                                  { name: "Trader D", profit: "-12%", color: "red" },
                                ].map((trader, i) => (
                                  <div
                                    key={i}
                                    className="bg-background/70 border border-border rounded p-2 flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      <div className={`h-2 w-2 rounded-full bg-${trader.color}-500 mr-1`}></div>
                                      <span className="text-xs">{trader.name}</span>
                                    </div>
                                    <span className={`text-xs text-${trader.color}-500`}>{trader.profit}</span>
                                  </div>
                                ))}
                              </div>

                              {/* AI Analysis Column */}
                              <div className="col-span-1 flex flex-col">
                                <div className="text-xs font-semibold mb-1 text-center">AI Analysis</div>
                                <div className="flex-1 bg-background/70 border border-border rounded p-2 flex flex-col">
                                  <div className="flex-1 flex flex-col space-y-2">
                                    <div className="text-[10px] flex justify-between">
                                      <span>Risk Level:</span>
                                      <span className="text-yellow-500">Medium</span>
                                    </div>
                                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                      <div className="h-full w-[60%] bg-yellow-500 rounded-full"></div>
                                    </div>

                                    <div className="text-[10px] flex justify-between">
                                      <span>Success Rate:</span>
                                      <span className="text-green-500">78%</span>
                                    </div>
                                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                      <div className="h-full w-[78%] bg-green-500 rounded-full"></div>
                                    </div>

                                    <div className="text-[10px] flex justify-between">
                                      <span>Avg. Profit:</span>
                                      <span className="text-primary">+67%</span>
                                    </div>
                                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                                      <div className="h-full w-[67%] bg-primary rounded-full"></div>
                                    </div>
                                  </div>

                                  <div className="mt-2 text-[10px] text-center bg-primary/10 text-primary rounded py-1">
                                    AI Recommendation: Copy Traders A & B
                                  </div>
                                </div>
                              </div>

                              {/* Your Portfolio Column */}
                              <div className="col-span-1 flex flex-col">
                                <div className="text-xs font-semibold mb-1 text-center">Your Portfolio</div>
                                <div className="flex-1 bg-background/70 border border-border rounded p-2 flex flex-col">
                                  <div className="text-center mb-2">
                                    <div className="text-lg font-bold text-primary">+94%</div>
                                    <div className="text-[10px] text-text-secondary">30-day return</div>
                                  </div>

                                  <div className="flex-1 relative">
                                    {/* Mini Chart */}
                                    <svg className="w-full h-16" viewBox="0 0 100 40" preserveAspectRatio="none">
                                      <path
                                        d="M0,35 L5,33 L10,34 L15,30 L20,32 L25,28 L30,25 L35,20 L40,22 L45,18 L50,15 L55,10 L60,12 L65,8 L70,5 L75,7 L80,3 L85,5 L90,2 L95,1 L100,0"
                                        fill="none"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth="1"
                                        vectorEffect="non-scaling-stroke"
                                      />
                                      <path
                                        d="M0,35 L5,33 L10,34 L15,30 L20,32 L25,28 L30,25 L35,20 L40,22 L45,18 L50,15 L55,10 L60,12 L65,8 L70,5 L75,7 L80,3 L85,5 L90,2 L95,1 L100,0 V40 H0 Z"
                                        fill="hsl(var(--primary))"
                                        fillOpacity="0.1"
                                      />
                                    </svg>

                                    <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 text-[8px] text-text-secondary">
                                      <div>30d ago</div>
                                      <div className="text-center">15d ago</div>
                                      <div className="text-right">Today</div>
                                    </div>
                                  </div>

                                  <div className="mt-2 grid grid-cols-2 gap-1">
                                    <div className="text-[10px] bg-green-500/10 text-green-500 rounded py-0.5 text-center">
                                      Auto Take-Profit
                                    </div>
                                    <div className="text-[10px] bg-red-500/10 text-red-500 rounded py-0.5 text-center">
                                      Smart Stop-Loss
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Connection Lines */}
                            <div className="h-6 relative mt-2">
                              <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 300 24"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M50,0 C80,12 120,24 150,12 C180,0 220,12 250,0"
                                  fill="none"
                                  stroke="hsl(var(--primary))"
                                  strokeWidth="1"
                                  strokeDasharray="2 2"
                                  vectorEffect="non-scaling-stroke"
                                />
                                <circle cx="50" cy="0" r="2" fill="hsl(var(--primary))" />
                                <circle cx="150" cy="12" r="2" fill="hsl(var(--primary))" />
                                <circle cx="250" cy="0" r="2" fill="hsl(var(--primary))" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                    <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border p-4">
                      <div className="aspect-video w-full bg-background/80 rounded-lg p-4">
                        {/* BDN Network Visualization */}
                        <div className="flex flex-col h-full">
                          <div className="text-xs font-semibold mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Rocket className="h-3 w-3 mr-1 text-primary" />
                              <span>15 Private BDN Gateways</span>
                            </div>
                            <div className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs">All Online</div>
                          </div>

                          {/* World Map with Nodes */}
                          <div className="flex-1 relative bg-background/50 rounded-lg border border-border/50 p-2">
                            {/* Simplified World Map Outlines */}
                            <svg
                              className="absolute inset-0 w-full h-full opacity-20"
                              viewBox="0 0 100 50"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M20,10 Q30,5 40,10 T60,10 T80,10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                              <path
                                d="M10,15 Q20,12 30,15 T50,15 T70,15 T90,15"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                              <path
                                d="M15,20 Q25,17 35,20 T55,20 T75,20 T95,20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                              <path
                                d="M10,25 Q20,22 30,25 T50,25 T70,25 T90,25"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                              <path
                                d="M20,30 Q30,27 40,30 T60,30 T80,30"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                              />
                            </svg>

                            {/* Gateway Nodes */}
                            <div className="absolute inset-0">
                              {/* North America Nodes */}
                              <div className="absolute top-[20%] left-[20%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[30%] left-[25%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[25%] left-[15%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* Europe Nodes */}
                              <div className="absolute top-[15%] left-[45%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[20%] left-[40%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[25%] left-[48%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* Asia Nodes */}
                              <div className="absolute top-[20%] left-[70%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[30%] left-[75%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[25%] left-[65%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[35%] left-[80%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* Australia Node */}
                              <div className="absolute top-[60%] left-[80%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* South America Node */}
                              <div className="absolute top-[50%] left-[30%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* Africa Nodes */}
                              <div className="absolute top-[40%] left-[45%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>
                              <div className="absolute top-[50%] left-[50%] h-2 w-2 bg-primary rounded-full shadow-glow"></div>

                              {/* Connection Lines - Animated */}
                              <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <defs>
                                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                  </linearGradient>
                                </defs>

                                {/* Connection Lines */}
                                <g stroke="url(#lineGradient)" strokeWidth="0.2" fill="none">
                                  <path d="M20,20 L45,15" />
                                  <path d="M25,30 L45,15" />
                                  <path d="M15,25 L45,15" />
                                  <path d="M45,15 L70,20" />
                                  <path d="M45,15 L75,30" />
                                  <path d="M45,15 L65,25" />
                                  <path d="M45,15 L80,35" />
                                  <path d="M45,15 L80,60" />
                                  <path d="M45,15 L30,50" />
                                  <path d="M45,15 L45,40" />
                                  <path d="M45,15 L50,50" />
                                </g>
                              </svg>
                            </div>

                            {/* Central Node */}
                            <div className="absolute top-[15%] left-[45%] h-4 w-4 bg-primary rounded-full shadow-glow flex items-center justify-center">
                              <div className="h-2 w-2 bg-white rounded-full"></div>
                            </div>

                            {/* Solana Logo */}
                            <div className="absolute bottom-2 right-2 text-xs font-bold text-primary">SOLANA</div>
                          </div>

                          {/* Stats */}
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            <div className="bg-background/70 border border-border rounded p-2">
                              <div className="text-[10px] text-text-secondary">Average Latency</div>
                              <div className="text-sm font-bold text-primary">25ms</div>
                            </div>
                            <div className="bg-background/70 border border-border rounded p-2">
                              <div className="text-[10px] text-text-secondary">Uptime</div>
                              <div className="text-sm font-bold text-green-500">99.9%</div>
                            </div>
                            <div className="bg-background/70 border border-border rounded p-2">
                              <div className="text-[10px] text-text-secondary">Active Gateways</div>
                              <div className="text-sm font-bold text-primary">15/15</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Use Cases Section */}
        <section className="container-custom py-16 md:py-24">
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
      </main>
      <Footer />
    </>
  )
}
