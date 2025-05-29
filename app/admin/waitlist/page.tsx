"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createSupabaseClient } from "@/lib/supabase"
import {
  Search,
  Download,
  Trash2,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Copy,
  MessageSquare,
} from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

interface WaitlistEntry {
  id: string
  email: string
  telegram_username?: string
  referral_source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  consent_marketing: boolean
  consent_terms: boolean
  created_at: string
  updated_at?: string
}

interface Stats {
  total: number
  today: number
  thisWeek: number
  withTelegram: number
  marketingConsent: number
  topSources: { source: string; count: number }[]
}

export default function WaitlistAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Data states
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSource, setFilterSource] = useState("all")
  const [filterConsent, setFilterConsent] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  // Auth check
  useEffect(() => {
    const authStatus = localStorage.getItem("waitlist_admin_auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWaitlistData()
      calculateStats()
    }
  }, [isAuthenticated])

  // Apply filters
  useEffect(() => {
    let filtered = [...entries]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.telegram_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.referral_source?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Source filter
    if (filterSource !== "all") {
      filtered = filtered.filter((entry) => entry.utm_source === filterSource)
    }

    // Consent filter
    if (filterConsent === "marketing") {
      filtered = filtered.filter((entry) => entry.consent_marketing)
    } else if (filterConsent === "no-marketing") {
      filtered = filtered.filter((entry) => !entry.consent_marketing)
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "email":
          return a.email.localeCompare(b.email)
        default:
          return 0
      }
    })

    setFilteredEntries(filtered)
    setCurrentPage(1)
  }, [entries, searchTerm, filterSource, filterConsent, sortBy])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      localStorage.setItem("waitlist_admin_auth", "authenticated")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Falsches Passwort")
    }
  }

  const loadWaitlistData = async () => {
    setLoading(true)
    try {
      const supabase = createSupabaseClient()
      const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setEntries(data || [])
    } catch (error) {
      console.error("Fehler beim Laden der Waitlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = async () => {
    try {
      const supabase = createSupabaseClient()

      // Total count
      const { count: total } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

      // Today's signups
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: todayCount } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString())

      // This week's signups
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const { count: weekCount } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString())

      // With Telegram
      const { count: telegramCount } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .not("telegram_username", "is", null)

      // Marketing consent
      const { count: marketingCount } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("consent_marketing", true)

      // Top sources
      const { data: sources } = await supabase
        .from("referral_source_stats")
        .select("referral_source, total_signups")
        .order("total_signups", { ascending: false })
        .limit(5)

      setStats({
        total: total || 0,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
        withTelegram: telegramCount || 0,
        marketingConsent: marketingCount || 0,
        topSources:
          sources?.map((s) => ({
            source: s.referral_source || "Direct",
            count: s.total_signups,
          })) || [],
      })
    } catch (error) {
      console.error("Fehler beim Berechnen der Statistiken:", error)
    }
  }

  const deleteEntry = async (id: string) => {
    if (!confirm("Möchten Sie diesen Eintrag wirklich löschen?")) return

    try {
      const supabase = createSupabaseClient()
      const { error } = await supabase.from("waitlist").delete().eq("id", id)

      if (error) throw error

      await loadWaitlistData()
      await calculateStats()
    } catch (error) {
      console.error("Fehler beim Löschen:", error)
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Email",
      "Telegram",
      "Quelle",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Marketing Consent",
      "Erstellt am",
    ]

    const rows = filteredEntries.map((entry) => [
      entry.email,
      entry.telegram_username || "",
      entry.referral_source || "Direct",
      entry.utm_source || "",
      entry.utm_medium || "",
      entry.utm_campaign || "",
      entry.consent_marketing ? "Ja" : "Nein",
      format(new Date(entry.created_at), "dd.MM.yyyy HH:mm", { locale: de }),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `waitlist_export_${format(new Date(), "yyyy-MM-dd")}.csv`
    link.click()
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
  }

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage)

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Waitlist Admin Login</h1>
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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Waitlist Verwaltung</h1>
            <p className="text-gray-400">Verwalten Sie Ihre Rust Rocket Waitlist-Einträge</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadWaitlistData}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Aktualisieren
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              CSV Export
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("waitlist_admin_auth")
                setIsAuthenticated(false)
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <p className="text-gray-400">Gesamt Anmeldungen</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold">{stats.today}</span>
              </div>
              <p className="text-gray-400">Heute</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold">{stats.thisWeek}</span>
              </div>
              <p className="text-gray-400">Diese Woche</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold">{stats.withTelegram}</span>
              </div>
              <p className="text-gray-400">Mit Telegram</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Mail className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold">{stats.marketingConsent}</span>
              </div>
              <p className="text-gray-400">Marketing Consent</p>
            </div>
          </div>
        )}

        {/* Top Sources */}
        {stats && stats.topSources.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Top Referral-Quellen</h2>
            <div className="space-y-3">
              {stats.topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(source.count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-12 text-right">{source.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Suche nach Email, Telegram..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Quellen</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="discord">Discord</option>
              <option value="direct">Direct</option>
            </select>
            <select
              value={filterConsent}
              onChange={(e) => setFilterConsent(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle Consents</option>
              <option value="marketing">Mit Marketing</option>
              <option value="no-marketing">Ohne Marketing</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Neueste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
              <option value="email">Email (A-Z)</option>
            </select>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            {filteredEntries.length} von {entries.length} Einträgen
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p>Lade Waitlist-Daten...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Telegram
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Quelle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Kampagne
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Consent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{entry.email}</span>
                          <button onClick={() => copyEmail(entry.email)} className="text-gray-400 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{entry.telegram_username || "-"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm">{entry.utm_source || entry.referral_source || "Direct"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{entry.utm_campaign || "-"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {entry.consent_marketing ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {format(new Date(entry.created_at), "dd.MM.yyyy HH:mm", { locale: de })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedEntry(entry)} className="text-gray-400 hover:text-white">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button onClick={() => deleteEntry(entry.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Zurück
            </button>
            <span className="px-4 py-2 text-gray-400">
              Seite {currentPage} von {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Waitlist-Eintrag Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="font-medium">{selectedEntry.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Telegram</label>
                    <p className="font-medium">{selectedEntry.telegram_username || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Referral-Quelle</label>
                    <p className="font-medium">{selectedEntry.referral_source || "Direct"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Erstellt am</label>
                    <p className="font-medium">
                      {format(new Date(selectedEntry.created_at), "dd.MM.yyyy HH:mm:ss", { locale: de })}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">UTM Parameter</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-700/50 p-4 rounded-lg">
                    <div>
                      <label className="text-sm text-gray-400">Source</label>
                      <p className="font-medium">{selectedEntry.utm_source || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Medium</label>
                      <p className="font-medium">{selectedEntry.utm_medium || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Campaign</label>
                      <p className="font-medium">{selectedEntry.utm_campaign || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Content</label>
                      <p className="font-medium">{selectedEntry.utm_content || "-"}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Term</label>
                      <p className="font-medium">{selectedEntry.utm_term || "-"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Einwilligungen</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {selectedEntry.consent_marketing ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                      <span>Marketing-Einwilligung</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedEntry.consent_terms ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                      <span>AGB akzeptiert</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
