import { createServerSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadChart } from "@/components/admin/LeadChart"
import { LeadSourcePieChart } from "@/components/admin/LeadSourcePieChart"
import { ConversionFunnelChart } from "@/components/admin/ConversionFunnelChart"
import { GrowthMetricsTable } from "@/components/admin/GrowthMetricsTable"

export default async function AnalyticsPage() {
  const supabase = createServerSupabaseClient()

  // Leads der letzten 30 Tage für Diagramm abrufen
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: leadsTimeSeries } = await supabase
    .from("waitlist")
    .select("created_at")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: true })

  // Leads nach Quelle gruppieren
  const { data: leadsBySource } = await supabase
    .from("waitlist")
    .select("referral_source, count")
    .group("referral_source")

  // Wachstumsmetriken berechnen
  const now = new Date()
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const twoWeeksAgo = new Date(now)
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  // Leads der letzten Woche
  const { count: lastWeekLeads } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .gte("created_at", oneWeekAgo.toISOString())

  // Leads der Woche davor
  const { count: previousWeekLeads } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .gte("created_at", twoWeeksAgo.toISOString())
    .lt("created_at", oneWeekAgo.toISOString())

  // Wachstumsrate berechnen
  const growthRate = previousWeekLeads ? ((lastWeekLeads - previousWeekLeads) / previousWeekLeads) * 100 : 100

  // Daten für Zeitreihendiagramm aufbereiten
  const leadsByDay = leadsTimeSeries ? processTimeSeriesData(leadsTimeSeries) : []

  // Beispieldaten für den Conversion Funnel
  // In einer echten Anwendung würden diese Daten aus Analytics oder anderen Quellen kommen
  const funnelData = [
    { name: "Seitenaufrufe", value: 10000 },
    { name: "Formular geöffnet", value: 3000 },
    { name: "Formular abgeschickt", value: 1500 },
    { name: "Bestätigt", value: 1200 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wachstumsübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">{growthRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Wachstum im Vergleich zur Vorwoche</p>
            </div>
            <GrowthMetricsTable currentWeek={lastWeekLeads || 0} previousWeek={previousWeekLeads || 0} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionFunnelChart data={funnelData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadChart data={leadsByDay} />
        <LeadSourcePieChart data={leadsBySource || []} />
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
