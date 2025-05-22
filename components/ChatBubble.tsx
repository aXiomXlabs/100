"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send } from "lucide-react"

// Define categories for detailed information
type InfoCategory =
  | "copy-trading"
  | "bloxroute"
  | "same-block"
  | "bdn-network"
  | "advantages"
  | "security"
  | "pricing"
  | "technical"
  | "getting-started"

// Detailed information by category
const detailedInfo: Record<InfoCategory, string> = {
  "copy-trading": `# Copy Trading with Rust Rocket

Our Copy Trading System is a revolutionary feature that allows you to automatically copy the trades of successful traders.

## How it works:

1. **Real-time Wallet Analysis**: Our AI continuously analyzes thousands of Solana wallets to identify top performers.

2. **Advanced Filtering**: We filter based on various metrics including:
   • Historical returns
   • Risk management
   • Trading volume
   • Performance consistency
   • Asset diversification

3. **Same-Block Execution**: When a top trader opens a position, our system copies the trade in the same Solana block - meaning no delay!

4. **Customizable Parameters**: You can set:
   • Maximum investment per trade
   • Stop-loss and take-profit levels
   • Which types of assets to copy
   • Maximum number of simultaneous positions

5. **Risk Management**: Our system automatically implements risk management strategies to protect your capital.

## Advantages over traditional copy trading systems:

• **Speed**: Through Same-Block Execution, there is no delay between the original trade and your copied trade.
• **Precision**: Exact replication of trades without slippage or price differences.
• **Scalability**: You can copy multiple top traders simultaneously.
• **Transparency**: Complete insight into trader performance metrics.
• **Customizability**: Extensive settings options for your individual needs.

Our Copy Trading System is particularly effective for memecoins on Solana, where speed and precision are crucial.`,

  bloxroute: `# Bloxroute Integration with Rust Rocket

Rust Rocket utilizes advanced Bloxroute technology to provide a decisive advantage in the Solana ecosystem.

## What is Bloxroute?

Bloxroute is a specialized Blockchain Distribution Network (BDN) designed to transmit transactions with minimal latency. It functions as a kind of "fast lane" for blockchain transactions.

## How we implement Bloxroute:

1. **Direct Integration**: Rust Rocket has a direct integration with Bloxroute's BDN, giving us privileged access to a high-speed network for transaction submission.

2. **Optimized Routing Algorithms**: Our proprietary algorithms automatically select the fastest path through the Bloxroute network for each transaction.

3. **Strategic Server Placement**: We operate servers at strategic locations near Solana validators to further reduce latency.

4. **Prioritized Transaction Processing**: Through Bloxroute, our transactions receive priority in the processing queue.

5. **Redundant Paths**: We use multiple redundant paths through the Bloxroute network to ensure 100% reliability.

## Technical Advantages:

• **Latency reduction up to 95%**: Compared to standard RPC endpoints.
• **Guaranteed block priority**: Your transactions are included in the earliest possible block.
• **Frontrunning protection**: Direct connections to validators minimize the risk of frontrunning.
• **Scalability**: The system can easily process thousands of concurrent transactions.

The Bloxroute integration is a central component of our Same-Block-Execution technology and gives Rust Rocket a technological edge that other trading bots simply cannot match.`,

  "same-block": `# Same-Block Execution Technology

Same-Block Execution is the heart of Rust Rocket and revolutionizes trading on Solana.

## What is Same-Block Execution?

In Solana, transactions are grouped in "blocks" that are generated approximately every 400 milliseconds. Same-Block Execution means that Rust Rocket can place your transaction in exactly the same block as the target transaction.

## How we achieve it:

1. **Ultra-fast Detection**: Our system detects relevant transactions in the mempool before they are included in a block.

2. **Optimized Transaction Structure**: We use a highly optimized transaction structure that requires minimal processing time.

3. **Direct Validator Connections**: Rust Rocket maintains direct connections to leading Solana validators.

4. **Prioritized Fee Structure**: Our system automatically calculates the optimal transaction fee to get priority.

5. **Parallelized Execution**: Multiple redundant transaction paths are used simultaneously to guarantee success.

## Technical Details:

• **Latency: <10ms**: From detection to transaction submission.
• **Success Rate: >99.8%**: For Same-Block Execution under normal network conditions.
• **Scalability**: Can process hundreds of simultaneous transactions.
• **Customizable Priority**: You can choose how aggressively the system should prioritize your transactions.

## Why it's crucial:

With volatile memecoins, the difference between the same block and the next block can mean the difference between profit and loss. Price movements can happen within milliseconds, and Same-Block Execution gives you the decisive edge.

No other trading bot on the market can consistently guarantee Same-Block Execution with our success rate.`,

  "bdn-network": `# The Block Dependent Network (BDN) of Rust Rocket

Our proprietary Block Dependent Network (BDN) is a global network of strategically placed Solana gateways that gives Rust Rocket an unprecedented speed advantage.

## Network Architecture:

1. **15 Global Locations**: Our BDN nodes are strategically placed on 5 continents to ensure minimal latency:
   • North America (4 locations)
   • Europe (4 locations)
   • Asia (4 locations)
   • Australia (2 locations)
   • South America (1 location)

2. **Direct Validator Connections**: Each BDN node maintains direct high-speed connections to multiple Solana validators.

3. **Redundant Paths**: Every transaction is sent through multiple paths to ensure 100% reliability.

4. **Adaptive Routing**: Our system automatically selects the fastest path based on current network conditions.

5. **Proprietary Hardware**: We use specialized hardware with optimized network cards and CPUs for minimal latency.

## Technical Specifications:

• **Average Latency: <15ms** worldwide
• **Network Capacity: >10,000 TPS** (Transactions per second)
• **Availability: 99.99%** through redundant systems
• **Automatic Failover**: If a node fails, transactions are automatically rerouted

## Advantages over standard RPC endpoints:

• **5-10x faster transaction submission**
• **Prioritized processing** through direct validator connections
• **Reduced frontrunning risk**
• **Higher success rate** for transactions during network congestion

Our BDN network is a crucial component of our technology and enables the Same-Block Execution that distinguishes Rust Rocket from other trading bots.`,

  advantages: `# Why Rust Rocket is Better Than All Other Trading Bots

Rust Rocket stands out from the competition through several decisive advantages:

## 1. Technological Edge

• **Same-Block Execution**: As the only bot, we guarantee execution in the same block - other bots are at least 1-2 blocks slower.
• **Proprietary BDN Network**: Our global network provides speed advantages that other bots cannot achieve.
• **Bloxroute Integration**: Direct access to a specialized high-speed network.
• **Optimized Codebase**: Written in Rust for maximum performance and minimal latency.

## 2. Advanced Copy Trading

• **AI-powered Trader Selection**: Our AI identifies the most profitable wallets in real-time.
• **Customizable Parameters**: Extensive configuration options that other bots don't offer.
• **Risk Management Algorithms**: Automatic protection against excessive losses.
• **Multi-Wallet Tracking**: Track multiple successful traders simultaneously.

## 3. Security and Reliability

• **Non-Custodial**: Your capital always remains under your control.
• **Open-Source Audit**: Our code has been reviewed by independent security experts.
• **Encrypted Connections**: All data is transmitted with military-grade encryption.
• **99.9% Uptime**: Our infrastructure is designed for maximum reliability.

## 4. User-Friendliness

• **Intuitive User Interface**: Easy to use, even for beginners.
• **Comprehensive Documentation**: Detailed instructions for all features.
• **Responsive Support**: Our team is available 24/7.
• **Regular Updates**: Continuous improvements and new features.

## 5. Transparency and Fairness

• **Clear Pricing Structure**: No hidden fees or surprises.
• **Performance Metrics**: Complete transparency about the system's performance.
• **Community Focus**: We listen to feedback and implement it.
• **No Favoritism**: All users receive the same performance and priority.

While other bots may offer individual features, Rust Rocket is the only one that combines all these advantages in a single platform, optimized for the unique speed and volatility of the Solana ecosystem.`,

  security: `# Security Features of Rust Rocket

Security is our highest priority at Rust Rocket. Our comprehensive security measures protect your capital and data.

## Architectural Security

1. **Non-Custodial Design**: Rust Rocket never has direct access to your funds. You maintain full control over your private keys.

2. **Secure Wallet Integration**: Support for hardware wallets like Ledger and Trezor for maximum security.

3. **Isolated Execution Environment**: Each user instance runs in an isolated container environment.

4. **Multi-layered Firewall**: Advanced firewall systems protect against unauthorized access.

5. **DDoS Protection**: Robust defense mechanisms against Distributed Denial of Service attacks.

## Data Security

1. **End-to-End Encryption**: All data is encrypted with AES-256.

2. **Zero-Knowledge Architecture**: Sensitive data is processed locally, not on our servers.

3. **Regular Security Audits**: Independent experts regularly review our code.

4. **Bug Bounty Program**: We reward the discovery of security vulnerabilities.

5. **Privacy Compliance**: Full compliance with GDPR and other privacy regulations.

## Transaction Security

1. **Transaction Validation**: Multiple verification of each transaction before execution.

2. **Automatic Anomaly Detection**: AI-powered detection of suspicious activities.

3. **Customizable Risk Levels**: You determine how conservative or aggressive the system acts.

4. **Emergency Killswitch**: Immediate deactivation of all activities in case of emergency.

5. **Transaction Limits**: Define maximum trading volumes per time unit.

## Operational Security

1. **Redundant Infrastructure**: Multiple redundant servers and network connections.

2. **Regular Backups**: Automatic backup of all critical data.

3. **Disaster Recovery Plan**: Comprehensive strategies for various emergency scenarios.

4. **24/7 Monitoring**: Our security team monitors the system around the clock.

5. **Regular Security Updates**: Continuous updating of all security components.

Rust Rocket sets new standards for security in the field of trading bots and gives you the assurance that your capital and data are protected in the best possible way.`,

  pricing: `# Pricing and Availability of Rust Rocket

Rust Rocket offers flexible pricing plans tailored to various trading needs and budgets.

## Current Plans

### Starter Plan
• **Price**: $99/month
• **Features**:
  - Same-Block Execution
  - Basic Copy Trading (up to 3 wallets)
  - Standard API limits
  - Email support
  - Daily trading reports

### Pro Plan
• **Price**: $249/month
• **Features**:
  - Everything in the Starter Plan
  - Advanced Copy Trading (up to 10 wallets)
  - Higher API limits
  - Priority support
  - Hourly trading reports
  - Customizable trading strategies
  - Telegram notifications

### Enterprise Plan
• **Price**: $499/month
• **Features**:
  - Everything in the Pro Plan
  - Unlimited Copy Trading
  - Highest API priority
  - Dedicated account manager
  - Real-time trading reports
  - Custom integrations
  - Phone support
  - Advanced risk management tools

## Payment Options

• **Cryptocurrencies**: BTC, ETH, SOL, USDT, USDC
• **Traditional Payment Methods**: Credit card, PayPal, bank transfer
• **Discounts**: 20% discount for annual payment

## Availability

Rust Rocket is currently in the final testing phase. The official launch is planned for Q2 2023.

### Waitlist Benefits

By joining the waitlist, you'll receive:
• **Early Access**: Access before the official release
• **25% Discount**: On your first month
• **Free Trial**: 14-day free trial
• **Exclusive Tutorials**: Access to special training materials
• **Priority Onboarding**: Personal setup assistance

## Money-Back Guarantee

We offer a 30-day money-back guarantee for all plans. If you're not satisfied with Rust Rocket, we'll refund the full amount.

## Enterprise Solutions

For institutional clients, we offer customized solutions with:
• Dedicated infrastructure
• Custom features
• SLA guarantees
• Compliance documentation
• Integration support

Contact our sales team for an individual quote.`,

  technical: `# Technical Details of Rust Rocket

Rust Rocket is designed for maximum performance and reliability, with a highly optimized architecture.

## Programming Languages and Frameworks

• **Backend**: Developed in Rust for maximum speed and memory efficiency
• **Smart Contracts**: Solana Program Library (SPL) with custom optimizations
• **Frontend**: React with TypeScript for type safety
• **API**: GraphQL for flexible and efficient data queries
• **Database**: TimescaleDB for high-speed time series data

## Infrastructure

• **Servers**: Bare-metal servers with Intel Xeon processors and NVIDIA GPUs for ML calculations
• **Network**: 10 Gbit/s network connections with redundant paths
• **Storage**: NVMe SSDs in RAID configuration for maximum I/O performance
• **Caching**: Redis and Memcached for high-speed data access
• **Load Balancing**: HAProxy with custom routing algorithms

## Solana Integration

• **RPC Connections**: Direct connections to over 50 Solana validators
• **Transaction Processing**: Proprietary pipelining technology for minimal latency
• **Block Synchronization**: Real-time synchronization with the Solana network
• **Mempool Monitoring**: Continuous monitoring of the mempool for early transaction detection
• **Fee Optimization**: Dynamic adjustment of transaction fees based on network conditions

## Algorithms and AI

• **Trader Identification**: Proprietary ML algorithms for identifying successful traders
• **Price Prediction**: Time series analysis with LSTM networks
• **Risk Assessment**: Monte Carlo simulations for risk quantification
• **Anomaly Detection**: Unsupervised learning for detecting unusual market conditions
• **Optimization**: Genetic algorithms for continuous strategy optimization

## Performance Metrics

• **Latency**: <10ms from event detection to transaction submission
• **Throughput**: Processing >1000 transactions per second
• **Success Rate**: >99.8% successful Same-Block Execution
• **Uptime**: 99.99% system availability
• **Scalability**: Horizontal scaling for unlimited user capacity

## Security Implementation

• **Encryption**: AES-256 for data at rest, TLS 1.3 for data in motion
• **Authentication**: Multi-factor authentication with hardware token support
• **Network Security**: IDS/IPS systems with AI-powered threat detection
• **Code Security**: Static and dynamic code analysis, regular penetration tests
• **Compliance**: SOC 2 Type II compliant, GDPR compliant

Rust Rocket uses cutting-edge technology in every component to create a trading bot that is unrivaled in terms of speed, reliability, and security.`,

  "getting-started": `# Getting Started with Rust Rocket

Follow this guide to get started with Rust Rocket and get the most out of our trading bot.

## 1. Registration and Onboarding

• **Join Waitlist**: Sign up for the waitlist on our website.
• **Invitation**: You'll receive an invitation email once access is available.
• **Create Account**: Follow the link in the email to create your account.
• **KYC Process**: Complete the Know-Your-Customer process (if required).
• **Choose Subscription**: Select the pricing plan that suits you.

## 2. Wallet Setup

• **Supported Wallets**: Phantom, Solflare, Ledger, Trezor
• **Connect Wallet**: Connect your Solana wallet to Rust Rocket.
• **Set Permissions**: Configure trading permissions.
• **Allocate Capital**: Determine how much capital should be available for the trading bot.
• **Security Settings**: Configure additional security measures.

## 3. Configure Trading Strategy

• **Set Up Copy Trading**:
  - Choose wallets to copy from our curated list.
  - Or enter specific wallet addresses you want to track.
  - Set allocation parameters (e.g., 10% of your capital per copied trade).

• **Risk Management**:
  - Set maximum loss limits per trade and per day.
  - Configure stop-loss and take-profit parameters.
  - Set maximum position sizes.

• **Asset Filters**:
  - Choose which token types should be traded.
  - Set minimum liquidity thresholds.
  - Configure market capitalization filters.

## 4. Monitoring and Optimization

• **Dashboard**: Monitor your trades in real-time via the dashboard.
• **Set Up Notifications**:
  - Email notifications
  - Telegram notifications
  - Push notifications in the app

• **Performance Analysis**:
  - Review daily/weekly performance reports.
  - Analyze successful and unsuccessful trades.
  - Identify optimization opportunities.

• **Adjust Strategy**:
  - Adjust parameters based on performance data.
  - Test different copy trading sources.
  - Refine your risk management settings.

## 5. Advanced Features

• **API Integration**: Use our API for custom integrations.
• **Backtesting**: Test strategies with historical data.
• **Tax Reports**: Generate reports for tax purposes.
• **Portfolio Analysis**: Gain insights into your overall portfolio performance.

## Support and Resources

• **Documentation**: Comprehensive documentation at docs.rustrocket.io
• **Video Tutorials**: Step-by-step guides on our YouTube channel
• **Community Forum**: Exchange with other users and the team
• **Support Team**: Reachable via email, chat, and phone (Enterprise Plan)

Start with Rust Rocket today and experience the difference that Same-Block Execution and advanced Copy Trading can make for your trading results.`,
}

export default function ChatBubble() {
  // Basic states
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to Rust Rocket! I'm your AI assistant. I can provide information about our Solana Trading Bot, copy-trading features, and same-block execution. Just ask me what you'd like to know!",
    },
  ])
  const [input, setInput] = useState("")

  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Automatically send a follow-up message after opening the chat
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I can provide information on topics like Copy Trading, Bloxroute Technology, Same-Block Execution, and more. What interests you the most?",
          },
        ])
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, messages])

  // Simple function to toggle chat
  function handleChatToggle() {
    setIsOpen(!isOpen)
  }

  // Simple function to close chat
  function handleCloseChat() {
    setIsOpen(false)
  }

  // Simple function to send a message
  function handleSendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Add bot response (simplified)
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "I understand you're interested in Rust Rocket. Let me provide some information about our features. Is there something specific you'd like to know more about?",
      },
    ])

    // Reset input field
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        // Chat window
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-80 sm:w-96 h-[500px] flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-purple-600/20">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-500" />
              <div>
                <span className="font-medium text-white block">Rust Rocket Assistant</span>
                <span className="text-xs text-gray-400">AI-powered • Always available</span>
              </div>
            </div>
            <button
              onClick={handleCloseChat}
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] rounded-lg px-4 py-2 ${
                    msg.role === "user" ? "bg-purple-900/10 text-white" : "bg-purple-600/10 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Rust Rocket..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-2 rounded-md transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Chat button
        <button
          onClick={handleChatToggle}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 border border-gray-800 shadow-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Chat with Rust Rocket Assistant"
        >
          <Bot className="h-6 w-6 text-purple-500" />
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping opacity-30"></div>
        </button>
      )}
    </div>
  )
}
