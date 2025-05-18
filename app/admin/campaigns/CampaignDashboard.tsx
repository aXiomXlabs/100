"use client"

import { useState, useEffect } from "react"
import { getCampaignPerformance } from "@/lib/waitlist"
import type { CampaignPerformance } from "@/types/waitlist"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function CampaignDashboard() {
  const [campaigns, setCampaigns] = useState<CampaignPerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCampaignPerformance()
        setCampaigns(data)
      } catch (error) {
        console.error("Fehler beim Laden der Kampagnendaten:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Daten für die Diagramme aufbereiten
  const sourceData = campaigns
    .reduce(
      (acc, campaign) => {
        const existingSource = acc.find((item) => item.name === campaign.source)
        if (existingSource) {
          existingSource.signups += campaign.signups
          existingSource.value += campaign.total_value
        } else {
          acc.push({
            name: campaign.source,
            signups: campaign.signups,
            value: campaign.total_value,
          })
        }
        return acc
      },
      [] as { name: string; signups: number; value: number }[],
    )
    .sort((a, b) => b.signups - a.signups)
    .slice(0, 10)

  const mediumData = campaigns
    .reduce(
      (acc, campaign) => {
        const existingMedium = acc.find((item) => item.name === campaign.medium)
        if (existingMedium) {
          existingMedium.signups += campaign.signups
          existingMedium.value += campaign.total_value
        } else {
          acc.push({
            name: campaign.medium,
            signups: campaign.signups,
            value: campaign.total_value,
          })
        }
        return acc
      },
      [] as { name: string; signups: number; value: number }[],
    )
    .sort((a, b) => b.signups - a.signups)
    .slice(0, 10)

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kampagnen-Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gesamtanmeldungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.reduce((sum, campaign) => sum + campaign.signups, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gesamtwert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, campaign) => sum + campaign.total_value, 0).toFixed(2)} €
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aktive Kampagnen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(campaigns.map((c) => c.campaign)).size}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="sources">Quellen</TabsTrigger>
          <TabsTrigger value="mediums">Medien</TabsTrigger>
          <TabsTrigger value="campaigns">Kampagnen</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top-Quellen nach Anmeldungen</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="signups" fill="#8AE234" name="Anmeldungen" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quellen-Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8AE234" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="signups" fill="#8AE234" name="Anmeldungen" />
                    <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Wert (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Quellen-Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quelle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Anmeldungen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wert
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wert pro Anmeldung
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sourceData.map((source, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{source.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{source.signups}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{source.value.toFixed(2)} €</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(source.value / source.signups).toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mediums" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medien-Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mediumData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="signups" fill="#8AE234" name="Anmeldungen" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampagnen-Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kampagne
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quelle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medium
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Anmeldungen
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Erster Signup
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Letzter Signup
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaigns.map((campaign, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.campaign}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.source}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.medium}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.signups}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.total_value.toFixed(2)} €</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(campaign.first_signup).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(campaign.last_signup).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
