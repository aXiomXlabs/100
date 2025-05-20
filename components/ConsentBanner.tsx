"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useConsent } from "@/hooks/useConsent"

export default function ConsentBanner() {
  const { consent, consentShown, updateConsent, acceptAll, rejectAll } = useConsent()
  const [showDetails, setShowDetails] = useState(false)

  if (consentShown) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 border-t border-gray-800 shadow-lg"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
              aria-expanded={showDetails}
            >
              {showDetails ? (
                <>
                  Hide details <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show details <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-4">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
            clicking "Accept All", you consent to our use of cookies as described in our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {showDetails && (
            <div className="mb-4 bg-gray-800 rounded-lg p-4">
              <div className="space-y-4">
                <ConsentOption
                  title="Essential Cookies"
                  description="Required for the website to function properly. Cannot be disabled."
                  checked={consent.essential}
                  onChange={() => {}} // Cannot be changed
                  disabled={true}
                />

                <ConsentOption
                  title="Statistics Cookies"
                  description="Help us understand how visitors interact with our website through Google Analytics."
                  checked={consent.statistics}
                  onChange={(checked) => updateConsent({ statistics: checked })}
                />

                <ConsentOption
                  title="Marketing Cookies"
                  description="Used to deliver advertisements more relevant to you and your interests (Twitter, Facebook)."
                  checked={consent.marketing}
                  onChange={(checked) => updateConsent({ marketing: checked })}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="flex items-center">
              <a
                href="/privacy"
                className="text-xs text-primary hover:underline mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a
                href="/cookies"
                className="text-xs text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookie Policy
              </a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded hover:bg-gray-800 hover:text-white transition-colors"
              >
                Reject All
              </button>
              {showDetails && (
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 text-sm text-primary border border-primary rounded hover:bg-primary/10 transition-colors"
                >
                  Save Preferences
                </button>
              )}
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-white rounded transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

interface ConsentOptionProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

function ConsentOption({ title, description, checked, onChange, disabled = false }: ConsentOptionProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
          ${disabled ? "opacity-50" : "peer-checked:bg-primary"} 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:rounded-full after:h-5 after:w-5 
          after:transition-all peer-checked:after:translate-x-full`}
        ></div>
      </label>
    </div>
  )
}
