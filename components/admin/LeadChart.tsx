"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface LeadChartProps {
  data: Array<{ date: string; count: number }>
}

export function LeadChart({ data }: LeadChartProps) {
  // Formatierung des Datums für die X-Achse
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getDate()}.${date.getMonth() + 1}`
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Lead-Entwicklung (30 Tage)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Datum</span>
                          <span className="font-bold text-muted-foreground">
                            {new Date(data.date).toLocaleDateString("de-DE")}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Leads</span>
                          <span className="font-bold">{data.count}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
              activeDot={{ r: 6, style: { fill: "#2563eb" } }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
