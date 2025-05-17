import { createServerSupabaseClient } from "@/lib/supabase"
import { LeadStatsCards } from "@/components/admin/LeadStatsCards"
import { LeadChart } from "@/components/admin/LeadChart"
import { LeadSourcePieChart } from "@/components/admin/LeadSourcePieChart"
import { RecentLeadsTable } from "@/components/admin/RecentLeadsTable"

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient()

  // Gesamtzahl der Leads abrufen
  const { count: totalLeads } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

  // Leads der letzten 24 Stunden abrufen
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const { count: newLeads } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString())

  // Leads nach Quelle gruppieren
  const { data: leadsBySource } = await supabase
    .from("waitlist")
    .select("referral_source, count")
    .group("referral_source")

  // Leads der letzten 30 Tage für Diagramm abrufen
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const { data: leadsTimeSeries } = await supabase
    .from("waitlist")
    .select("created_at")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: true })

  // Neueste Leads für Tabelle abrufen
  const { data: recentLeads } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  // Daten für Zeitreihendiagramm aufbereiten
  const leadsByDay = leadsTimeSeries ? processTimeSeriesData(leadsTimeSeries) : []

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin-Dashboard</h1>

      {/* Statistik-Karten */}
      <LeadStatsCards totalLeads={totalLeads || 0} newLeads={newLeads || 0} leadsBySource={leadsBySource || []} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zeitreihendiagramm */}
        <LeadChart data={leadsByDay} />

        {/* Quellen-Tortendiagramm */}
        <LeadSourcePieChart data={leadsBySource || []} />
      </div>

      {/* Tabelle mit neuesten Leads */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Neueste Anmeldungen</h2>
          <RecentLeadsTable leads={recentLeads || []} />
        </div>
      </div>
    </div>
  )
}

// Hilfsfunktion zur Aufbereitung der Zeitreihendaten
function processTimeSeriesData(data: any[]) {
  const dayMap = new Map<string, number>()

  data.forEach((entry) => {
    const day = new Date(entry.created_at).toISOString().split("T")[0]
    dayMap.set(day, (dayMap.get(day) || 0) + 1)
  })

  // Sicherstellen, dass alle Tage im Zeitraum vorhanden sind
  const result = []
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = d.toISOString().split("T")[0]
    result.push({
      date: day,
      count: dayMap.get(day) || 0,
    })
  }

  return result
}
