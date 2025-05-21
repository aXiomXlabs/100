"use client"

import type React from "react"
import { useState } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Thank you for joining the waitlist!")
        setEmail("") // Clear the email input
      } else {
        setMessage(data.message || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Join the Waitlist</h2>
        <p className="mb-4">
          Be the first to know when we launch! Enter your email address below to join our waitlist.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`mb-4 ${message.startsWith("Thank") ? "text-green-500" : "text-red-500"}`}>{message}</div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Join Waitlist"}
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-primary hover:underline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-500">
          By joining, you agree to our{" "}
          <a
            href="https://www.rust-rocket.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-tracking-id="privacy_policy_link"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://www.rust-rocket.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-tracking-id="terms_of_service_link"
          >
            Terms of Service
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default WaitlistModal
