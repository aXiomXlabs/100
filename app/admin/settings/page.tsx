"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Allgemeine Einstellungen gespeichert")
    }, 1000)
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Benachrichtigungseinstellungen gespeichert")
    }, 1000)
  }

  const handleSaveIntegrations = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Integrationseinstellungen gespeichert")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Einstellungen</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="integrations">Integrationen</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Einstellungen</CardTitle>
              <CardDescription>
                Konfigurieren Sie die grundlegenden Einstellungen für das Admin-Dashboard.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveGeneral}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Website-Name</Label>
                  <Input id="site-name" defaultValue="Rust Rocket" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin-E-Mail</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@rust-rocket.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Einträge pro Seite</Label>
                  <Input id="items-per-page" type="number" defaultValue="25" min="10" max="100" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Wartungsmodus aktivieren</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Wird gespeichert..." : "Speichern"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungseinstellungen</CardTitle>
              <CardDescription>
                Konfigurieren Sie, wann und wie Sie Benachrichtigungen erhalten möchten.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotifications}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-lead-notification">Neue Lead-Benachrichtigung</Label>
                      <p className="text-sm text-muted-foreground">
                        Erhalten Sie eine Benachrichtigung, wenn sich ein neuer Lead anmeldet.
                      </p>
                    </div>
                    <Switch id="new-lead-notification" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-summary">Tägliche Zusammenfassung</Label>
                      <p className="text-sm text-muted-foreground">
                        Erhalten Sie eine tägliche Zusammenfassung der Lead-Aktivitäten.
                      </p>
                    </div>
                    <Switch id="daily-summary" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-report">Wöchentlicher Bericht</Label>
                      <p className="text-sm text-muted-foreground">
                        Erhalten Sie einen wöchentlichen Bericht über die Lead-Performance.
                      </p>
                    </div>
                    <Switch id="weekly-report" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Wird gespeichert..." : "Speichern"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrationseinstellungen</CardTitle>
              <CardDescription>Verbinden Sie Ihr Admin-Dashboard mit anderen Diensten.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveIntegrations}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crm-integration">CRM-Integration</Label>
                  <Switch id="crm-integration" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-service-integration">E-Mail-Dienst-Integration</Label>
                  <Switch id="email-service-integration" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analytics-integration">Analytik-Dienst-Integration</Label>
                  <Switch id="analytics-integration" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Wird gespeichert..." : "Speichern"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
