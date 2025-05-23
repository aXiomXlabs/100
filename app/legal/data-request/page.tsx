import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Data Request | Rust Rocket",
  description: "Request your personal data from Rust Rocket or exercise your data protection rights.",
}

export default function DataRequestPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-green-500">Data Request Form</h1>

      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-gray-300">
          Under data protection laws, you have the right to access, correct, update or request deletion of your personal
          information. Use this form to submit your request.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-gray-300 mb-1">
                Request Type
              </label>
              <select
                id="requestType"
                name="requestType"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select a request type</option>
                <option value="access">Access my data</option>
                <option value="rectification">Correct my data</option>
                <option value="erasure">Delete my data</option>
                <option value="restriction">Restrict processing of my data</option>
                <option value="portability">Data portability request</option>
                <option value="objection">Object to processing</option>
                <option value="withdraw">Withdraw consent</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                We'll use this to verify your identity and respond to your request
              </p>
            </div>

            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">
                Wallet Address (optional)
              </label>
              <input
                type="text"
                id="walletAddress"
                name="walletAddress"
                placeholder="Your Solana wallet address"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                If your request relates to a specific wallet, please provide the address
              </p>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-1">
                Request Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Please provide any additional details about your request"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="verification"
                  name="verification"
                  type="checkbox"
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="verification" className="text-gray-300">
                  I confirm that I am the data subject or authorized to act on their behalf, and the information
                  provided is accurate
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">What to Expect</h2>
        <p>After submitting your request, we will:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Verify your identity to ensure we're providing information to the right person</li>
          <li>Process your request within 30 days (we'll notify you if we need more time)</li>
          <li>Provide a response via email to the address you've provided</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">Your Rights</h2>
        <p>Under data protection laws, you have the following rights:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-green-400">Right to access</strong> - You can request copies of your personal data
          </li>
          <li>
            <strong className="text-green-400">Right to rectification</strong> - You can request that we correct
            inaccurate information
          </li>
          <li>
            <strong className="text-green-400">Right to erasure</strong> - You can request that we delete your data in
            certain circumstances
          </li>
          <li>
            <strong className="text-green-400">Right to restrict processing</strong> - You can request that we limit how
            we use your data
          </li>
          <li>
            <strong className="text-green-400">Right to data portability</strong> - You can request that we transfer
            your data to another organization
          </li>
          <li>
            <strong className="text-green-400">Right to object</strong> - You can object to our processing of your data
            in certain circumstances
          </li>
          <li>
            <strong className="text-green-400">Rights related to automated decision making</strong> - You have rights
            related to how we use your data for automated decisions
          </li>
        </ul>

        <p className="mt-4">
          For more information about how we handle your personal data, please see our{" "}
          <Link href="/legal/privacy" className="text-green-500 hover:text-green-400">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-12 border-t border-gray-700 pt-6">
          <Link href="/" className="text-green-500 hover:text-green-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
