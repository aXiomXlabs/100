"use client"

import { useConsent } from "@/hooks/useConsent"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ConsentBanner() {
  const { isModalOpen, hasInteracted, openModal, closeModal, consent, updateConsent, acceptAll, essentialOnly } =
    useConsent()
  const [localConsent, setLocalConsent] = useState({
    essential: true,
    statistics: false,
  })

  // Wenn der Benutzer noch nicht interagiert hat, zeige den Banner an
  if (!hasInteracted) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Cookie Settings</h3>
              <p className="text-sm text-gray-300">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={essentialOnly} className="border-white text-white hover:text-black">
                Essential Only
              </Button>
              <Button onClick={acceptAll} className="bg-green-600 hover:bg-green-700">
                Accept All
              </Button>
              <Button variant="ghost" onClick={openModal} className="text-white hover:text-gray-300">
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Wenn der Dialog geöffnet werden soll
  if (isModalOpen) {
    return (
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. Essential cookies are always active as they are necessary for the
              website to function properly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="essential" className="font-medium">
                  Essential Cookies
                </Label>
                <p className="text-sm text-gray-500">Required for the website to function properly.</p>
              </div>
              <Switch id="essential" checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="statistics" className="font-medium">
                  Statistics
                </Label>
                <p className="text-sm text-gray-500">Help us improve by collecting anonymous usage data.</p>
              </div>
              <Switch
                id="statistics"
                checked={localConsent.statistics}
                onCheckedChange={(checked) => setLocalConsent((prev) => ({ ...prev, statistics: checked }))}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => {
                updateConsent({ statistics: false })
                closeModal()
              }}
            >
              Essential Only
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  updateConsent(localConsent)
                  closeModal()
                }}
              >
                Save Preferences
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  acceptAll()
                  closeModal()
                }}
              >
                Accept All
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Wenn der Banner nicht angezeigt werden soll und der Dialog nicht geöffnet ist
  return (
    <button
      onClick={openModal}
      className="fixed bottom-4 right-4 z-40 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      aria-label="Cookie Settings"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
      </svg>
    </button>
  )
}
