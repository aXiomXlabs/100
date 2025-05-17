"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Definiere den Typ für die Daten
interface LeadSourceData {
  referral_source: string
  count: number
}

// Farben für das Diagramm
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function LeadSourcePieChart({ data }: { data: LeadSourceData[] }) {
  // Stelle sicher, dass wir Daten haben
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lead-Quellen</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Keine Daten verfügbar</p>
        </CardContent>
      </Card>
    )
  }

  // Formatiere die Daten für das Diagramm
  const chartData = data.map((item) => ({
    name: item.referral_source || "Unbekannt",
    value: item.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead-Quellen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Leads`, "Anzahl"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
