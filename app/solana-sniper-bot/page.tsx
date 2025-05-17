import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ArrowRight, Clock, Shield, Zap, BarChart3, Rocket, Users } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
  description:
    "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium. Maximize your profits on meme coin launches.",
  keywords: [
    "Solana Sniper Bot",
    "Pump.fun Sniper",
    "Raydium Sniper",
    "Same-Block Execution",
    "Copy Trading Solana",
    "Meme Coin Bot",
    "Solana Trading Bot",
    "Fastest Sniper Bot",
    "25ms Latency Bot",
    "Solana Meme Coins",
  ],
  openGraph: {
    title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
    description:
      "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium.",
    url: "https://rust-rocket.com/solana-sniper-bot",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rust Rocket Solana Sniper Bot",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Sniper Bot | 25ms Execution Time & Same-Block Execution",
    description:
      "The ultimate Solana Sniper Bot with 25ms latency, same-block execution and advanced copy-trading for Pump.fun and Raydium.",
    images: ["/images/twitter-image.png"],
    creator: "@rustrocket",
  },
  alternates: {
    canonical: "https://rust-rocket.com/solana-sniper-bot",
  },
}

export default function SolanaSniperBotPage() {
  return (
    <>
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

      <main className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background-secondary">
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
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-16 relative w-full max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
            <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border">
              <Image
                src="/images/Dashboard.png"
                alt="Rust Rocket Solana Sniper Bot Dashboard"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
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
                    <Image
                      src="/solana-sniper-bot-telegram.png"
                      alt="Solana Sniper Bot in Action"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="copy" className="bg-background-secondary p-6 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border">
                    <Image
                      src="/copy-trading-explained.png"
                      alt="Copy Trading Explained"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
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
                  <div className="relative bg-background-tertiary rounded-xl overflow-hidden border border-border p-4">
                    <Image
                      src="/solana-trading-future.png"
                      alt="BDN Network Architecture"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
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
                    <span>Customizable risk profiles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-custom py-16 md:py-24 bg-background-tertiary rounded-3xl my-8" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Answers to the most common questions about our Solana Sniper Bot
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-background-secondary border-border">
              <CardHeader>
                <CardTitle>What is a Solana Sniper Bot?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A Solana Sniper Bot is an automated trading tool that executes trades on the Solana blockchain with
                  extremely low latency. The Rust Rocket Sniper Bot achieves 25 ms execution time and same-block
                  execution, allowing you to get into new token launches on platforms like Pump.fun before price surges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary border-border">
              <CardHeader>
                <CardTitle>How does Rust Rocket's copy-trading feature work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Rust Rocket's intelligent copy-trading feature automatically identifies and mirrors successful Solana
                  traders' strategies. You can set custom parameters like stop-loss and auto-sell conditions to protect
                  your investments and maximize profits while the bot handles the execution with 25 ms latency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary border-border">
              <CardHeader>
                <CardTitle>What makes Rust Rocket faster than other Solana bots?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Rust Rocket achieves superior speed through our network of 15 private BDN (Block Distribution Network)
                  gateways that provide direct, low-latency connections to the Solana blockchain. While standard bots
                  rely on public RPCs with 400+ ms latency, our infrastructure delivers 25 ms execution time and
                  same-block execution capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary border-border">
              <CardHeader>
                <CardTitle>Does Rust Rocket work with Pump.fun?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Yes, Rust Rocket is specifically optimized for Pump.fun and Raydium, the most popular Solana meme coin
                  launchpads. Our 25 ms execution time ensures you can participate in new token launches at the earliest
                  possible moment, often in the same block as the launch transaction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background-secondary border-border">
              <CardHeader>
                <CardTitle>How does Rust Rocket protect against rug pulls?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Rust Rocket includes built-in rug-pull protection that analyzes token contracts and liquidity patterns
                  in real-time. The bot can automatically set stop-loss levels and execute emergency sells if suspicious
                  activity is detected, helping to safeguard your investments in the volatile meme coin market.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-custom py-16 md:py-24">
          <div className="bg-background-tertiary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-70"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to take your Solana trading to the next level?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                Join the waitlist to be one of the first to get access to our Solana Sniper Bot
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="container-custom py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Content</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Discover more resources about Solana trading and meme coins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src="/solana-trading-future.png"
                  alt="The Future of Solana Trading"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>The Future of Solana Trading</CardTitle>
                <CardDescription>A look at upcoming trends and technologies in the Solana ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/future-of-solana-trading" className="text-primary hover:underline flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src="/meme-coin-strategies.png"
                  alt="Meme Coin Trading Strategies"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Meme Coin Trading Strategies</CardTitle>
                <CardDescription>
                  Proven strategies for successful trading in the volatile meme coin market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/meme-coin-strategies" className="text-primary hover:underline flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="bg-background-secondary border-border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image src="/copy-trading-explained.png" alt="Copy Trading Explained" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Copy Trading Explained</CardTitle>
                <CardDescription>A comprehensive guide to copy trading on Solana</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog/copy-trading-explained" className="text-primary hover:underline flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
