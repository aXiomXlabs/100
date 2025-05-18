"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Zap,
  LineChart,
  X,
  Maximize2,
  Smartphone,
  Monitor,
  Chrome,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

const roadmapData = [
  {
    phase: "Phase 1",
    title: "Copy Trading",
    date: "Q2 2025",
    status: "planned",
    description: "Launch of the Rust Rocket Copy Trading functionality.",
    items: [
      "Automated trade copying",
      "Performance analytics",
      "Trader selection algorithm",
      "Risk management settings",
    ],
    icon: <LineChart className="h-6 w-6" />,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-900/20 via-blue-800/10 to-transparent",
    visual: {
      title: "Copy Trading System",
      description: "Follow top traders and replicate their strategies automatically.",
      elements: [
        { label: "Traders", value: "200+" },
        { label: "Copy Delay", value: "<50ms" },
        { label: "Analytics", value: "Real-time" },
        { label: "Risk Management", value: "Customizable" },
      ],
    },
  },
  {
    phase: "Phase 1",
    title: "Advanced Dashboard",
    date: "Q2 2025",
    status: "planned",
    description: "Launch of the enhanced trading dashboard with advanced analytics.",
    items: ["Real-time performance metrics", "Customizable widgets", "Advanced charting tools", "Portfolio management"],
    icon: <Monitor className="h-6 w-6" />,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-900/20 via-blue-800/10 to-transparent",
    visual: {
      title: "Advanced Dashboard",
      description: "Comprehensive trading dashboard with real-time analytics and customizable interface.",
      elements: [
        { label: "Widgets", value: "20+" },
        { label: "Update Rate", value: "Real-time" },
        { label: "Chart Types", value: "15+" },
        { label: "Layouts", value: "Customizable" },
      ],
    },
  },
  {
    phase: "Phase 2",
    title: "Sniping Function",
    date: "Q3 2025",
    status: "planned",
    description: "Implementation of high-speed token sniping functionality.",
    items: ["MEV protection", "Ultra-low latency execution", "Multi-DEX support", "Customizable triggers"],
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-900/20 via-purple-800/10 to-transparent",
    visual: {
      title: "Sniping Function",
      description: "High-speed token sniping with MEV protection and optimized execution.",
      elements: [
        { label: "Transaction Speed", value: "25ms" },
        { label: "Success Rate", value: "95%" },
        { label: "DEX Support", value: "All major" },
        { label: "Slippage Control", value: "0.1-5%" },
      ],
    },
  },
  {
    phase: "Phase 2",
    title: "Web & Extension",
    date: "Q3 2025",
    status: "planned",
    description: "Launch of the web interface and Chrome extension.",
    items: [
      "Responsive web application",
      "Chrome extension for quick access",
      "Real-time notifications",
      "Cross-device synchronization",
    ],
    icon: <Chrome className="h-6 w-6" />,
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-900/20 via-purple-800/10 to-transparent",
    visual: {
      title: "Web Interface & Extension",
      description: "Seamless trading experience across web and browser extension.",
      elements: [
        { label: "Platforms", value: "Web & Chrome" },
        { label: "Sync", value: "Real-time" },
        { label: "Notifications", value: "Instant" },
        { label: "Accessibility", value: "One-click" },
      ],
    },
  },
  {
    phase: "Phase 3",
    title: "Mobile Apps",
    date: "Q4 2025",
    status: "planned",
    description: "Launch of Android and iOS mobile applications.",
    items: ["Android application", "iOS application", "Push notifications", "Biometric authentication"],
    icon: <Smartphone className="h-6 w-6" />,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-900/20 via-orange-800/10 to-transparent",
    visual: {
      title: "Mobile Applications",
      description: "Trade on the go with native Android and iOS applications.",
      elements: [
        { label: "Platforms", value: "Android & iOS" },
        { label: "Features", value: "Full parity" },
        { label: "Security", value: "Biometric" },
        { label: "Offline Mode", value: "Supported" },
      ],
    },
  },
]

export default function RoadmapSection() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)

  return (
    <section id="roadmap" className="py-16 bg-gradient-to-b from-background to-background-secondary">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our vision for the future of the Solana Sniper Bot and planned development milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {roadmapData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
              onClick={() => setSelectedPhase(index)}
            >
              <div className="relative overflow-hidden rounded-xl cursor-pointer group h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-80`}></div>

                {/* Glowing Border */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-4 backdrop-blur-sm bg-card/80 rounded-xl border border-white/10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        `bg-gradient-to-r ${item.gradient} text-white`,
                      )}
                    >
                      {item.status === "completed"
                        ? "Completed"
                        : item.status === "in-progress"
                          ? "In Progress"
                          : "Planned"}
                    </span>
                    <span className="text-xs bg-black/30 text-white px-2 py-1 rounded-full flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${item.gradient}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{item.title}</h3>
                      <p className="text-xs text-white/70">{item.phase}</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 mb-3 flex-grow">{item.description}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-white/60">{item.items.length} milestones</span>
                    <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md flex items-center transition-colors">
                      <Maximize2 className="w-3 h-3 mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/20"
          >
            Join the Waitlist
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>

        {/* Detail Dialog */}
        <Dialog open={selectedPhase !== null} onOpenChange={() => setSelectedPhase(null)}>
          <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-background to-background-secondary border-none">
            {selectedPhase !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${roadmapData[selectedPhase].gradient}`}
                    >
                      {roadmapData[selectedPhase].icon}
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{roadmapData[selectedPhase].title}</span>
                      <span className="text-sm text-muted-foreground ml-2">{roadmapData[selectedPhase].phase}</span>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    {roadmapData[selectedPhase].visual.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {roadmapData[selectedPhase].visual.elements.map((element, i) => (
                      <div key={i} className="bg-card/30 p-4 rounded-lg border border-white/5">
                        <div className="text-sm text-muted-foreground">{element.label}</div>
                        <div className="text-xl font-bold">{element.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-card/30 p-4 rounded-lg border border-white/5 mb-6">
                    <h4 className="font-medium mb-2">Key Milestones</h4>
                    <ul className="space-y-2">
                      {roadmapData[selectedPhase].items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {roadmapData[selectedPhase].status === "completed" ||
                          (roadmapData[selectedPhase].status === "in-progress" && i < 2) ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-1 rounded-full",
                          `bg-gradient-to-r ${roadmapData[selectedPhase].gradient} text-white`,
                        )}
                      >
                        {roadmapData[selectedPhase].status === "completed"
                          ? "Completed"
                          : roadmapData[selectedPhase].status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                      </span>
                      <span className="text-xs ml-2">{roadmapData[selectedPhase].date}</span>
                    </div>
                    <DialogClose className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md flex items-center transition-colors">
                      <X className="w-4 h-4 mr-1" />
                      Close
                    </DialogClose>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
