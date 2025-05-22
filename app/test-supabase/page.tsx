"use client"

import { useState, useEffect } from "react"

export default function TestSupabasePage() {
  const [status, setStatus] = useState<{
    loading: boolean
    success?: boolean
    message?: string
    details?: any
  }>({ loading: true })

  useEffect(() => {
    async function testConnection() {
      try {
        const response = await fetch("/api/test-supabase")
        const data = await response.json()

        setStatus({
          loading: false,
          success: data.success,
          message: data.message,
          details: data,
        })
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          message: "Error testing connection",
          details: error,
        })
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

        {status.loading ? (
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-xl">Testing connection...</p>
          </div>
        ) : status.success ? (
          <div className="bg-green-900/30 border border-green-700 p-6 rounded-lg">
            <p className="text-xl font-medium text-green-400">✅ {status.message}</p>
            <pre className="mt-4 bg-black/30 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(status.details, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="bg-red-900/30 border border-red-700 p-6 rounded-lg">
            <p className="text-xl font-medium text-red-400">❌ {status.message}</p>
            <pre className="mt-4 bg-black/30 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(status.details, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Troubleshooting Steps</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Check if your Supabase environment variables are correctly set</li>
            <li>Verify that the waitlist table exists in your Supabase database</li>
            <li>Make sure the table has the correct columns (email, telegram_username, etc.)</li>
            <li>Check if your Supabase service role key has the necessary permissions</li>
            <li>Verify that your Supabase project is active and not in maintenance mode</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
