import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

interface GrowthMetricsTableProps {
  currentWeek: number
  previousWeek: number
}

export function GrowthMetricsTable({ currentWeek, previousWeek }: GrowthMetricsTableProps) {
  // Wachstumsrate berechnen
  const growthRate = previousWeek ? ((currentWeek - previousWeek) / previousWeek) * 100 : 100

  // Täglicher Durchschnitt
  const currentDailyAvg = currentWeek / 7
  const previousDailyAvg = previousWeek / 7
  const dailyAvgGrowth = previousDailyAvg ? ((currentDailyAvg - previousDailyAvg) / previousDailyAvg) * 100 : 100

  // Hochrechnung für den Monat (4 Wochen)
  const currentMonthProjection = currentWeek * 4
  const previousMonthProjection = previousWeek * 4
  const monthlyGrowth = previousMonthProjection
    ? ((currentMonthProjection - previousMonthProjection) / previousMonthProjection) * 100
    : 100

  const metrics = [
    {
      name: "Leads pro Woche",
      current: currentWeek,
      previous: previousWeek,
      growth: growthRate,
    },
    {
      name: "Täglicher Durchschnitt",
      current: currentDailyAvg.toFixed(1),
      previous: previousDailyAvg.toFixed(1),
      growth: dailyAvgGrowth,
    },
    {
      name: "Monatliche Prognose",
      current: currentMonthProjection,
      previous: previousMonthProjection,
      growth: monthlyGrowth,
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metrik</TableHead>
          <TableHead className="text-right">Letzte Woche</TableHead>
          <TableHead className="text-right">Vorwoche</TableHead>
          <TableHead className="text-right">Änderung</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.name}>
            <TableCell className="font-medium">{metric.name}</TableCell>
            <TableCell className="text-right">{metric.current}</TableCell>
            <TableCell className="text-right">{metric.previous}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end">
                {metric.growth > 0 ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                ) : metric.growth < 0 ? (
                  <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                ) : (
                  <MinusIcon className="mr-1 h-4 w-4 text-gray-500" />
                )}
                <span
                  className={
                    metric.growth > 0 ? "text-green-600" : metric.growth < 0 ? "text-red-600" : "text-gray-600"
                  }
                >
                  {Math.abs(metric.growth).toFixed(1)}%
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
