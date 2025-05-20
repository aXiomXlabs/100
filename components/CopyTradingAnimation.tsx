"use client"

import { motion } from "framer-motion"

export default function CopyTradingAnimation() {
  return (
    <div className="w-full h-64 md:h-80 relative overflow-hidden rounded-xl bg-gradient-to-br from-background-secondary to-background p-4 border border-solana-purple/20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-solana-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-solana-purple/10 rounded-full blur-3xl"></div>

      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pro Wallets */}
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Pro Wallet 1 */}
            <motion.circle
              cx="600"
              cy="80"
              r="30"
              fill="rgba(147, 112, 219, 0.8)"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.circle
              cx="600"
              cy="80"
              r="40"
              stroke="rgba(147, 112, 219, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{ r: [40, 50, 40] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <text x="600" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              PRO 1
            </text>

            {/* Pro Wallet 2 */}
            <motion.circle
              cx="650"
              cy="150"
              r="30"
              fill="rgba(147, 112, 219, 0.8)"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.circle
              cx="650"
              cy="150"
              r="40"
              stroke="rgba(147, 112, 219, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{ r: [40, 50, 40] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <text x="650" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              PRO 2
            </text>

            {/* Pro Wallet 3 */}
            <motion.circle
              cx="600"
              cy="220"
              r="30"
              fill="rgba(147, 112, 219, 0.8)"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.circle
              cx="600"
              cy="220"
              r="40"
              stroke="rgba(147, 112, 219, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{ r: [40, 50, 40] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <text x="600" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              PRO 3
            </text>
          </motion.g>

          {/* User Wallet */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.circle
              cx="150"
              cy="150"
              r="40"
              fill="rgba(138, 226, 52, 0.8)"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.circle
              cx="150"
              cy="150"
              r="50"
              stroke="rgba(138, 226, 52, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{ r: [50, 60, 50] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <text x="150" y="155" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              YOU
            </text>
          </motion.g>

          {/* Trade Lines */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            {/* Line from Pro 1 to User */}
            <line x1="570" y1="80" x2="190" y2="150" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

            {/* Line from Pro 2 to User */}
            <line x1="620" y1="150" x2="190" y2="150" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

            {/* Line from Pro 3 to User */}
            <line x1="570" y1="220" x2="190" y2="150" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          </motion.g>

          {/* Trade Packets */}
          <motion.g>
            {/* Packet from Pro 1 to User */}
            <motion.circle
              cx="570"
              cy="80"
              r="6"
              fill="#8AE234"
              initial={{ cx: 570, cy: 80 }}
              animate={{ cx: 190, cy: 150 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Packet from Pro 2 to User */}
            <motion.circle
              cx="620"
              cy="150"
              r="6"
              fill="#8AE234"
              initial={{ cx: 620, cy: 150 }}
              animate={{ cx: 190, cy: 150 }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                ease: "easeInOut",
                delay: 0.7,
              }}
            />

            {/* Packet from Pro 3 to User */}
            <motion.circle
              cx="570"
              cy="220"
              r="6"
              fill="#8AE234"
              initial={{ cx: 570, cy: 220 }}
              animate={{ cx: 190, cy: 150 }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.2,
                ease: "easeInOut",
                delay: 1.4,
              }}
            />
          </motion.g>
        </svg>

        {/* Title Overlay */}
        <div className="absolute top-4 left-0 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block bg-background/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-solana-purple/20"
          >
            <h3 className="text-xl font-bold text-center text-gradient">Copy Trading in Action</h3>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
