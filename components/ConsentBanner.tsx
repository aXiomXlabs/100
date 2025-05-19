"use client"

import { useState, useEffect, useRef } from "react"
import { useConsent } from "@/hooks/useConsent"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export default function ConsentBanner() {
  const { consent, isModalOpen, hasInteracted, updateConsent, openModal, closeModal, acceptAll, essentialOnly } =
    useConsent()

  const [showBanner, setShowBanner] = useState(false)
  const initialFocusRef = useRef<HTMLButtonElement>(null)

  // Local state for checkboxes in modal
  const [modalConsent, setModalConsent] = useState({
    statistics: consent.statistics,
    marketing: consent.marketing,
  })

  // Show banner if user hasn't interacted yet
  useEffect(() => {
    setShowBanner(!hasInteracted)
  }, [hasInteracted])

  // Update modal consent when global consent changes
  useEffect(() => {
    setModalConsent({
      statistics: consent.statistics,
      marketing: consent.marketing,
    })
  }, [consent])

  // Save consent
  const saveModalConsent = () => {
    updateConsent(modalConsent)
    closeModal()
  }

  // Set focus on first button when modal opens
  useEffect(() => {
    if (isModalOpen && initialFocusRef.current) {
      initialFocusRef.current.focus()
    }
  }, [isModalOpen])

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white border-t border-gray-700 shadow-lg"
          role="alertdialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 id="cookie-consent-title" className="text-lg font-semibold mb-1">
                  Cookie Settings
                </h2>
                <p id="cookie-consent-description" className="text-sm text-gray-300 mb-2">
                  We use cookies to provide you with the best experience on our website. Some are essential for the
                  operation of the site, while others help us improve the user experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-white border-gray-600 hover:bg-gray-800"
                  onClick={openModal}
                >
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent text-white border-gray-600 hover:bg-gray-800"
                  onClick={essentialOnly}
                >
                  Essential Only
                </Button>
                <Button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={acceptAll}
                  ref={initialFocusRef}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <div
          className={`fixed inset-0 z-50 bg-black/50 ${isModalOpen ? "block" : "hidden"}`}
          onClick={closeModal}
          aria-hidden="true"
        />
        <div
          className={`fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-gray-900 text-white p-6 shadow-lg rounded-lg ${isModalOpen ? "block" : "hidden"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 id="cookie-settings-title" className="text-xl font-semibold">
              Cookie Settings
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              aria-label="Close"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Essential Cookies */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox id="essential-cookies" checked={true} disabled={true} />
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="essential-cookies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Essential (always active)
                </label>
                <p className="text-sm text-gray-400">
                  These cookies are necessary for the basic functions of the website and cannot be disabled.
                </p>
              </div>
            </div>

            {/* Statistics Cookies */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="statistics-cookies"
                checked={modalConsent.statistics}
                onCheckedChange={(checked) => setModalConsent((prev) => ({ ...prev, statistics: checked === true }))}
              />
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="statistics-cookies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Statistics (Google Analytics 4)
                </label>
                <p className="text-sm text-gray-400">
                  These cookies help us understand how visitors interact with our website by collecting information
                  anonymously.
                </p>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="marketing-cookies"
                checked={modalConsent.marketing}
                onCheckedChange={(checked) => setModalConsent((prev) => ({ ...prev, marketing: checked === true }))}
              />
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="marketing-cookies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marketing (Twitter/X Pixel, Facebook Pixel)
                </label>
                <p className="text-sm text-gray-400">
                  These cookies are used to make advertising more relevant to you and to measure the effectiveness of
                  our marketing campaigns.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={closeModal}
              className="bg-transparent text-white border-gray-600 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={saveModalConsent} className="bg-blue-600 hover:bg-blue-700 text-white">
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
