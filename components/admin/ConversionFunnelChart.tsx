"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface ConversionFunnelChartProps {
  data: Array<{ name: string; value: number }>
}

export function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  // Konversionsraten berechnen
  const dataWithRates = data.map((item, index, arr) => {
    const rate = index === 0 ? 100 : (item.value / arr[0].value) * 100
    return {
      ...item,
      rate: rate.toFixed(1),
    }
  })

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataWithRates} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, "Anzahl"]}
            labelFormatter={(name) => `${name}`}
          />
          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[0, 4, 4, 0]}
            label={{
              position: "right",
              formatter: (item: any) => `${item.rate}%`,
              fontSize: 12,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
