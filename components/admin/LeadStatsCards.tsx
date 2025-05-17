import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Award } from "lucide-react"

interface LeadStatsCardsProps {
  totalLeads: number
  newLeads: number
  leadsBySource: Array<{ referral_source: string; count: number }>
}

export function LeadStatsCards({ totalLeads, newLeads, leadsBySource }: LeadStatsCardsProps) {
  // Beste Quelle ermitteln
  let topSource = { source: "Keine", count: 0 }

  if (leadsBySource.length > 0) {
    const sorted = [...leadsBySource].sort((a, b) => b.count - a.count)
    topSource = {
      source: sorted[0].referral_source || "Direkt",
      count: sorted[0].count,
    }
  }

  // Konversionsrate berechnen (Beispiel: Besucher zu Leads)
  // In einer echten Anwendung würden Sie hier Daten aus Analytics verwenden
  const conversionRate = totalLeads > 0 ? ((newLeads / totalLeads) * 100).toFixed(1) : "0.0"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gesamte Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{newLeads} in den letzten 24 Stunden</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Konversionsrate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate}%</div>
          <p className="text-xs text-muted-foreground">Basierend auf neuen Leads</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Beste Quelle</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topSource.source}</div>
          <p className="text-xs text-muted-foreground">{topSource.count} Leads generiert</p>
        </CardContent>
      </Card>
    </div>
  )
}
