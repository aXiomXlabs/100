"use client"

import { useState, useEffect } from "react"
import { createSupabaseClient } from "@/lib/supabase"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ExportButton from "@/components/ExportButton"

export default function WaitlistDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [waitlistEntries, setWaitlistEntries] = useState<any[]>([])
  const [dailySignups, setDailySignups] = useState<any[]>([])
  const [referralStats, setReferralStats] = useState<any[]>([])
  const [campaignStats, setCampaignStats] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const supabase = createSupabaseClient()

        // Waitlist-Einträge abrufen (neueste 10)
        const { data: entries, error: entriesError } = await supabase
          .from("waitlist")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10)

        if (entriesError) throw new Error(`Fehler beim Abrufen der Waitlist-Einträge: ${entriesError.message}`)
        setWaitlistEntries(entries || [])

        // Tägliche Anmeldungen abrufen
        const { data: daily, error: dailyError } = await supabase
          .from("daily_signups")
          .select("*")
          .order("signup_date", { ascending: false })
          .limit(14)

        if (dailyError) throw new Error(`Fehler beim Abrufen der täglichen Anmeldungen: ${dailyError.message}`)
        setDailySignups(daily?.reverse() || [])

        // Referral-Statistiken abrufen
        const { data: referrals, error: referralsError } = await supabase
          .from("referral_source_stats")
          .select("*")
          .order("total_signups", { ascending: false })

        if (referralsError) throw new Error(`Fehler beim Abrufen der Referral-Statistiken: ${referralsError.message}`)
        setReferralStats(referrals || [])

        // Kampagnen-Statistiken abrufen
        const { data: campaigns, error: campaignsError } = await supabase
          .from("campaign_analytics")
          .select("*")
          .order("total_signups", { ascending: false })

        if (campaignsError) throw new Error(`Fehler beim Abrufen der Kampagnen-Statistiken: ${campaignsError.message}`)
        setCampaignStats(campaigns || [])
      } catch (err: any) {
        console.error("Fehler beim Laden der Daten:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Waitlist Dashboard</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Waitlist Dashboard</h1>
          <div className="bg-red-900/30 border border-red-700 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-red-400">Fehler beim Laden der Daten</h2>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Waitlist Dashboard</h1>
          <ExportButton />
        </div>

        {/* Übersicht */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-400">Gesamtanmeldungen</h2>
            <p className="text-4xl font-bold mt-2">{dailySignups.reduce((sum, day) => sum + day.total_signups, 0)}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-400">Anmeldungen heute</h2>
            <p className="text-4xl font-bold mt-2">
              {dailySignups.length > 0 ? dailySignups[dailySignups.length - 1].total_signups : 0}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-400">Hauptquelle</h2>
            <p className="text-4xl font-bold mt-2">
              {referralStats.length > 0 ? referralStats[0].referral_source : "N/A"}
            </p>
          </div>
        </div>

        {/* Tägliche Anmeldungen Chart */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Tägliche Anmeldungen</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySignups}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="signup_date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="total_signups" name="Anmeldungen" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Referral-Quellen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Referral-Quellen</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4">Quelle</th>
                    <th className="py-3 px-4">Anmeldungen</th>
                    <th className="py-3 px-4">Prozent</th>
                  </tr>
                </thead>
                <tbody>
                  {referralStats.map((source, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-4">{source.referral_source || "Direkt"}</td>
                      <td className="py-3 px-4">{source.total_signups}</td>
                      <td className="py-3 px-4">{Math.round(source.percentage)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kampagnen-Leistung */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Kampagnen-Leistung</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4">Quelle</th>
                    <th className="py-3 px-4">Medium</th>
                    <th className="py-3 px-4">Kampagne</th>
                    <th className="py-3 px-4">Anmeldungen</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignStats.map((campaign, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-4">{campaign.source || "Direkt"}</td>
                      <td className="py-3 px-4">{campaign.medium || "Keine"}</td>
                      <td className="py-3 px-4">{campaign.campaign || "Keine"}</td>
                      <td className="py-3 px-4">{campaign.total_signups}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Neueste Anmeldungen */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Neueste Anmeldungen</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4">E-Mail</th>
                  <th className="py-3 px-4">Telegram</th>
                  <th className="py-3 px-4">Quelle</th>
                  <th className="py-3 px-4">Datum</th>
                </tr>
              </thead>
              <tbody>
                {waitlistEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{entry.email}</td>
                    <td className="py-3 px-4">{entry.telegram_username || "-"}</td>
                    <td className="py-3 px-4">{entry.referral_source || "Direkt"}</td>
                    <td className="py-3 px-4">
                      {new Date(entry.created_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
