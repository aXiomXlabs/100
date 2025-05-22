"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function TestWaitlistPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState<{
    loading: boolean
    success?: boolean
    message?: string
    testEmail?: string
    insertedData?: any
    retrievedData?: any
    error?: any
  }>({ loading: false })

  const [recentEntries, setRecentEntries] = useState<any[]>([])
  const [loadingEntries, setLoadingEntries] = useState(false)

  // Überprüfen, ob der Benutzer bereits authentifiziert ist
  useEffect(() => {
    const authStatus = localStorage.getItem("test_waitlist_auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  // Funktion zum Überprüfen des Passworts
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      localStorage.setItem("test_waitlist_auth", "authenticated")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Falsches Passwort")
    }
  }

  // Funktion zum Testen der Waitlist-Verbindung
  const testWaitlistConnection = async () => {
    setStatus({ loading: true })

    try {
      const response = await fetch("/api/test-waitlist")
      const data = await response.json()

      setStatus({
        loading: false,
        success: data.success,
        message: data.message,
        testEmail: data.testEmail,
        insertedData: data.insertedData,
        retrievedData: data.retrievedData,
        error: data.error,
      })

      // Nach erfolgreicher Einfügung die Liste der neuesten Einträge aktualisieren
      if (data.success) {
        fetchRecentEntries()
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message: "Fehler beim Aufrufen der Test-API",
        error: String(error),
      })
    }
  }

  // Funktion zum Abrufen der neuesten Einträge
  const fetchRecentEntries = async () => {
    setLoadingEntries(true)

    try {
      const response = await fetch("/api/test-waitlist/recent")
      const data = await response.json()

      if (data.success) {
        setRecentEntries(data.entries || [])
      } else {
        console.error("Fehler beim Abrufen der neuesten Einträge:", data.error)
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der neuesten Einträge:", error)
    } finally {
      setLoadingEntries(false)
    }
  }

  // Beim ersten Laden die neuesten Einträge abrufen
  useEffect(() => {
    if (isAuthenticated) {
      fetchRecentEntries()
    }
  }, [isAuthenticated])

  // Wenn nicht authentifiziert, Login-Formular anzeigen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Test Waitlist Login</h1>
          <form onSubmit={handleLogin}>
            {error && <div className="bg-red-900/30 border border-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded transition-colors"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Supabase Waitlist-Verbindungstest</h1>
          <button
            onClick={() => {
              localStorage.removeItem("test_waitlist_auth")
              setIsAuthenticated(false)
            }}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Abmelden
          </button>
        </div>

        <div className="mb-8">
          <button
            onClick={testWaitlistConnection}
            disabled={status.loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.loading ? "Teste Verbindung..." : "Teste Supabase Waitlist-Verbindung"}
          </button>
        </div>

        {/* Testergebnisse anzeigen */}
        {status.message && (
          <div
            className={`p-6 rounded-lg mb-8 ${status.success ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"}`}
          >
            <h2 className="text-xl font-medium mb-4">
              {status.success ? "✅ " : "❌ "}
              {status.message}
            </h2>

            {status.testEmail && (
              <p className="mb-2">
                Test-E-Mail: <span className="font-mono">{status.testEmail}</span>
              </p>
            )}

            {status.error && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Fehlerdetails:</h3>
                <pre className="bg-black/30 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(status.error, null, 2)}
                </pre>
              </div>
            )}

            {status.insertedData && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Eingefügte Daten:</h3>
                <pre className="bg-black/30 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(status.insertedData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Neueste Einträge anzeigen */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Neueste Waitlist-Einträge</h2>

          <button
            onClick={fetchRecentEntries}
            disabled={loadingEntries}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded mb-4 text-sm"
          >
            {loadingEntries ? "Lade..." : "Aktualisieren"}
          </button>

          {loadingEntries ? (
            <p>Lade neueste Einträge...</p>
          ) : recentEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 text-left">E-Mail</th>
                    <th className="p-2 text-left">Telegram</th>
                    <th className="p-2 text-left">Quelle</th>
                    <th className="p-2 text-left">Erstellt am</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEntries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}>
                      <td className="p-2">{entry.email}</td>
                      <td className="p-2">{entry.telegram_username || "-"}</td>
                      <td className="p-2">{entry.referral_source || "-"}</td>
                      <td className="p-2">{new Date(entry.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Keine Einträge gefunden.</p>
          )}
        </div>
      </div>
    </div>
  )
}
