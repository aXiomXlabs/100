"use client"

import { useState, useEffect } from "react"
import { REMARKETING_AUDIENCES, getAudienceTracker } from "@/lib/remarketing-audiences"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Target, Eye } from "lucide-react"

export default function AudiencesAdminPage() {
  const [sessionData, setSessionData] = useState<any>(null)
  const [activeAudiences, setActiveAudiences] = useState<string[]>([])
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    const tracker = getAudienceTracker()
    if (tracker) {
      setIsTracking(true)
      setSessionData(tracker.getSessionData())
      setActiveAudiences(tracker.getActiveAudiences())

      // Update data every 5 seconds
      const interval = setInterval(() => {
        setSessionData(tracker.getSessionData())
        setActiveAudiences(tracker.getActiveAudiences())
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [])

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "google":
        return "🔍"
      case "facebook":
        return "📘"
      case "twitter":
        return "🐦"
      case "linkedin":
        return "💼"
      default:
        return "📊"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Remarketing Audiences</h1>
          <p className="text-muted-foreground">Monitor and manage your remarketing audience segments</p>
        </div>
        <Badge variant={isTracking ? "default" : "destructive"}>
          {isTracking ? "Tracking Active" : "Tracking Inactive"}
        </Badge>
      </div>

      {/* Current Session Data */}
      {sessionData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Current Session Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionData.timeOnSite}s</div>
                <div className="text-sm text-muted-foreground">Time on Site</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionData.pageViews}</div>
                <div className="text-sm text-muted-foreground">Page Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionData.scrollDepth}%</div>
                <div className="text-sm text-muted-foreground">Max Scroll</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessionData.events.length}</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="audiences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audiences">All Audiences</TabsTrigger>
          <TabsTrigger value="active">Active Audiences</TabsTrigger>
          <TabsTrigger value="setup">Platform Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="audiences" className="space-y-4">
          <div className="grid gap-4">
            {REMARKETING_AUDIENCES.map((audience) => (
              <Card key={audience.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {audience.name}
                        {activeAudiences.includes(audience.id) && <Badge variant="default">Active</Badge>}
                      </CardTitle>
                      <CardDescription>{audience.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Value: ${audience.value}</Badge>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(audience.priority)}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Conditions:</h4>
                      <div className="space-y-1">
                        {audience.conditions.map((condition, index) => (
                          <div key={index} className="text-sm bg-muted p-2 rounded">
                            {condition.type} {condition.operator} {condition.value}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Platforms:</h4>
                      <div className="flex gap-2">
                        {audience.platforms.map((platform, index) => (
                          <Badge key={index} variant="outline">
                            {getPlatformIcon(platform.name)} {platform.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {activeAudiences.length > 0 ? (
              REMARKETING_AUDIENCES.filter((audience) => activeAudiences.includes(audience.id)).map((audience) => (
                <Card key={audience.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Target className="h-5 w-5" />
                      {audience.name}
                      <Badge variant="default">Currently Active</Badge>
                    </CardTitle>
                    <CardDescription className="text-green-700">{audience.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-800">
                      <strong>Value:</strong> ${audience.value} |<strong> Priority:</strong> {audience.priority} |
                      <strong> Platforms:</strong> {audience.platforms.map((p) => p.name).join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Audiences</h3>
                  <p className="text-muted-foreground">Continue browsing to qualify for remarketing audiences</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🔍 Google Ads Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Required Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to Google Ads → Tools & Settings → Audience Manager</li>
                    <li>Create Custom Audiences based on website visitors</li>
                    <li>Set up audience rules matching our tracking events</li>
                    <li>Link audiences to your campaigns</li>
                  </ol>
                </div>
                <div className="text-sm">
                  <strong>Tracking Events:</strong> audience_membership, page_view, custom events
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📘 Facebook Ads Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Required Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to Facebook Ads Manager → Audiences</li>
                    <li>Create Custom Audiences from Website Traffic</li>
                    <li>Set up pixel events for audience segmentation</li>
                    <li>Create Lookalike Audiences from high-value segments</li>
                  </ol>
                </div>
                <div className="text-sm">
                  <strong>Pixel ID:</strong> {process.env.NEXT_PUBLIC_FB_PIXEL_ID || "Not configured"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🐦 Twitter Ads Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Required Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to Twitter Ads → Tools → Audience Manager</li>
                    <li>Create Tailored Audiences from website visitors</li>
                    <li>Set up conversion tracking for audience events</li>
                    <li>Create campaigns targeting specific audience segments</li>
                  </ol>
                </div>
                <div className="text-sm">
                  <strong>Pixel ID:</strong> pork0 (configured)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
