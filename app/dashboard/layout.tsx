"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Einfache Passwortauthentifizierung (in Produktion solltest du eine richtige Auth-Lösung verwenden)
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("dashboard_auth")
      if (authToken === "authenticated") {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Einfaches Passwort für Demo-Zwecke (in Produktion solltest du eine richtige Auth-Lösung verwenden)
    if (password === "admin123") {
      localStorage.setItem("dashboard_auth", "authenticated")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Falsches Passwort")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("dashboard_auth")
    setIsAuthenticated(false)
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard Login</h1>
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
    <div>
      <div className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Waitlist Dashboard</h1>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
          >
            Abmelden
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
