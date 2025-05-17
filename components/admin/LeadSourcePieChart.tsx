"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface LeadSourcePieChartProps {
  data: Array<{ referral_source: string; count: number }>
}

export function LeadSourcePieChart({ data }: LeadSourcePieChartProps) {
  // Daten für das Diagramm aufbereiten
  const chartData = data.map((item) => ({
    name: item.referral_source || "Direkt",
    value: item.count,
  }))

  // Farben für die verschiedenen Quellen
  const COLORS = ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#0891b2", "#4f46e5", "#db2777"]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Leads nach Quelle</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} Leads`, "Anzahl"]}
              labelFormatter={(name) => `Quelle: ${name}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
