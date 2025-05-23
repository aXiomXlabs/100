// Remarketing Audiences Configuration and Tracking
interface AudienceConfig {
  id: string
  name: string
  description: string
  conditions: AudienceCondition[]
  platforms: Platform[]
  value: number
  priority: number
}

interface AudienceCondition {
  type: "page_view" | "event" | "time_on_site" | "scroll_depth" | "form_interaction"
  operator: "equals" | "contains" | "greater_than" | "less_than"
  value: string | number
  timeframe?: number // in days
}

interface Platform {
  name: "google" | "facebook" | "twitter" | "linkedin"
  audience_id?: string
  pixel_id?: string
}

// Remarketing Audiences Configuration
export const REMARKETING_AUDIENCES: AudienceConfig[] = [
  {
    id: "high_intent_visitors",
    name: "High Intent Visitors",
    description: "Users who spent significant time on key pages",
    conditions: [
      { type: "time_on_site", operator: "greater_than", value: 120 },
      { type: "scroll_depth", operator: "greater_than", value: 75 },
      { type: "page_view", operator: "contains", value: "/solana-sniper-bot" },
    ],
    platforms: [
      { name: "google", audience_id: "high_intent_visitors" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
      { name: "twitter", audience_id: "high_intent_visitors" },
    ],
    value: 10,
    priority: 1,
  },
  {
    id: "waitlist_abandoners",
    name: "Waitlist Abandoners",
    description: "Users who started but did not complete waitlist signup",
    conditions: [
      { type: "event", operator: "equals", value: "waitlist_modal_opened" },
      { type: "event", operator: "equals", value: "email_input_focused" },
    ],
    platforms: [
      { name: "google", audience_id: "waitlist_abandoners" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
      { name: "twitter", audience_id: "waitlist_abandoners" },
    ],
    value: 8,
    priority: 2,
  },
  {
    id: "blog_readers",
    name: "Blog Readers",
    description: "Users who read blog content about Solana trading",
    conditions: [
      { type: "page_view", operator: "contains", value: "/blog" },
      { type: "time_on_site", operator: "greater_than", value: 60 },
    ],
    platforms: [
      { name: "google", audience_id: "blog_readers" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
    ],
    value: 6,
    priority: 3,
  },
  {
    id: "feature_explorers",
    name: "Feature Explorers",
    description: "Users who explored specific features like copy trading",
    conditions: [
      { type: "page_view", operator: "contains", value: "/copy-trading" },
      { type: "scroll_depth", operator: "greater_than", value: 50 },
      { type: "event", operator: "equals", value: "feature_interaction" },
    ],
    platforms: [
      { name: "google", audience_id: "feature_explorers" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
    ],
    value: 7,
    priority: 2,
  },
  {
    id: "landing_page_visitors",
    name: "Landing Page Visitors",
    description: "Users who visited ads landing pages but did not convert",
    conditions: [
      { type: "page_view", operator: "contains", value: "/landing/ads" },
      { type: "time_on_site", operator: "greater_than", value: 30 },
    ],
    platforms: [
      { name: "google", audience_id: "landing_page_visitors" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
      { name: "twitter", audience_id: "landing_page_visitors" },
    ],
    value: 9,
    priority: 1,
  },
  {
    id: "mobile_users",
    name: "Mobile Users",
    description: "Users who primarily browse on mobile devices",
    conditions: [
      { type: "event", operator: "equals", value: "mobile_device_detected" },
      { type: "page_view", operator: "greater_than", value: 2 },
    ],
    platforms: [
      { name: "google", audience_id: "mobile_users" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
    ],
    value: 5,
    priority: 4,
  },
  {
    id: "returning_visitors",
    name: "Returning Visitors",
    description: "Users who have visited the site multiple times",
    conditions: [
      { type: "event", operator: "equals", value: "returning_visitor" },
      { type: "page_view", operator: "greater_than", value: 3 },
    ],
    platforms: [
      { name: "google", audience_id: "returning_visitors" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
    ],
    value: 8,
    priority: 2,
  },
  {
    id: "video_watchers",
    name: "Video Watchers",
    description: "Users who watched demo videos or tutorials",
    conditions: [
      { type: "event", operator: "equals", value: "video_play" },
      { type: "event", operator: "equals", value: "video_25_percent" },
    ],
    platforms: [
      { name: "google", audience_id: "video_watchers" },
      { name: "facebook", pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID },
      { name: "twitter", audience_id: "video_watchers" },
    ],
    value: 7,
    priority: 3,
  },
]

// User behavior tracking for audience segmentation
class AudienceTracker {
  private userBehavior: Map<string, any> = new Map()
  private sessionData: any = {}

  constructor() {
    this.initializeTracking()
  }

  private initializeTracking() {
    if (typeof window === "undefined") return

    // Track session start
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      events: [],
      scrollDepth: 0,
      timeOnSite: 0,
      deviceType: this.getDeviceType(),
      isReturningVisitor: this.isReturningVisitor(),
    }

    // Set up event listeners
    this.setupEventListeners()

    // Track initial page view
    this.trackPageView()
  }

  private setupEventListeners() {
    // Scroll tracking
    let maxScrollDepth = 0
    window.addEventListener("scroll", () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      )
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        this.sessionData.scrollDepth = maxScrollDepth
        this.checkAudienceConditions()
      }
    })

    // Time tracking
    setInterval(() => {
      this.sessionData.timeOnSite = Math.round((Date.now() - this.sessionData.startTime) / 1000)
      this.checkAudienceConditions()
    }, 10000) // Check every 10 seconds

    // Form interactions
    document.addEventListener("focusin", (e) => {
      if (e.target instanceof HTMLInputElement && e.target.type === "email") {
        this.trackEvent("email_input_focused")
      }
    })

    // Modal tracking
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-waitlist-trigger]")) {
        this.trackEvent("waitlist_modal_opened")
      }
    })
  }

  private getDeviceType(): string {
    const userAgent = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return "tablet"
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent))
      return "mobile"
    return "desktop"
  }

  private isReturningVisitor(): boolean {
    const visitCount = Number.parseInt(localStorage.getItem("visit_count") || "0")
    localStorage.setItem("visit_count", (visitCount + 1).toString())
    return visitCount > 0
  }

  public trackPageView(path?: string) {
    this.sessionData.pageViews++
    const currentPath = path || window.location.pathname

    this.trackEvent("page_view", { path: currentPath })

    // Track device type
    if (this.sessionData.deviceType === "mobile") {
      this.trackEvent("mobile_device_detected")
    }

    // Track returning visitor
    if (this.sessionData.isReturningVisitor) {
      this.trackEvent("returning_visitor")
    }

    this.checkAudienceConditions()
  }

  public trackEvent(eventName: string, data?: any) {
    this.sessionData.events.push({
      name: eventName,
      timestamp: Date.now(),
      data: data,
    })

    this.checkAudienceConditions()
  }

  private checkAudienceConditions() {
    REMARKETING_AUDIENCES.forEach((audience) => {
      if (this.meetsAudienceConditions(audience)) {
        this.addToAudience(audience)
      }
    })
  }

  private meetsAudienceConditions(audience: AudienceConfig): boolean {
    return audience.conditions.every((condition) => {
      switch (condition.type) {
        case "time_on_site":
          return this.evaluateCondition(this.sessionData.timeOnSite, condition.operator, condition.value)

        case "scroll_depth":
          return this.evaluateCondition(this.sessionData.scrollDepth, condition.operator, condition.value)

        case "page_view":
          if (condition.operator === "contains") {
            return this.sessionData.events.some(
              (event: any) => event.name === "page_view" && event.data?.path?.includes(condition.value),
            )
          }
          return this.evaluateCondition(this.sessionData.pageViews, condition.operator, condition.value)

        case "event":
          return this.sessionData.events.some((event: any) => event.name === condition.value)

        default:
          return false
      }
    })
  }

  private evaluateCondition(value: number, operator: string, target: string | number): boolean {
    const numericTarget = typeof target === "string" ? Number.parseFloat(target) : target

    switch (operator) {
      case "greater_than":
        return value > numericTarget
      case "less_than":
        return value < numericTarget
      case "equals":
        return value === numericTarget
      default:
        return false
    }
  }

  private addToAudience(audience: AudienceConfig) {
    // Prevent duplicate additions
    const audienceKey = `audience_${audience.id}`
    if (this.userBehavior.has(audienceKey)) return

    this.userBehavior.set(audienceKey, {
      audienceId: audience.id,
      addedAt: Date.now(),
      value: audience.value,
    })

    // Track to all configured platforms
    audience.platforms.forEach((platform) => {
      this.trackAudienceToPlatform(platform, audience)
    })

    console.log(`User added to audience: ${audience.name}`)
  }

  private trackAudienceToPlatform(platform: Platform, audience: AudienceConfig) {
    switch (platform.name) {
      case "google":
        this.trackGoogleAudience(audience)
        break
      case "facebook":
        this.trackFacebookAudience(audience)
        break
      case "twitter":
        this.trackTwitterAudience(audience)
        break
    }
  }

  private trackGoogleAudience(audience: AudienceConfig) {
    if (typeof window.gtag === "function") {
      window.gtag("event", "audience_membership", {
        audience_id: audience.id,
        audience_name: audience.name,
        audience_value: audience.value,
        custom_parameter_audience: audience.id,
      })
    }
  }

  private trackFacebookAudience(audience: AudienceConfig) {
    if (typeof window.fbq === "function") {
      window.fbq("track", "CustomEvent", {
        audience_id: audience.id,
        audience_name: audience.name,
        audience_value: audience.value,
        content_category: "remarketing_audience",
      })
    }
  }

  private trackTwitterAudience(audience: AudienceConfig) {
    if (typeof window.twq === "function") {
      window.twq("track", "Custom", {
        audience_id: audience.id,
        audience_name: audience.name,
        audience_value: audience.value,
      })
    }
  }

  public getActiveAudiences(): string[] {
    return Array.from(this.userBehavior.keys())
      .map((key) => this.userBehavior.get(key)?.audienceId)
      .filter(Boolean)
  }

  public getSessionData() {
    return this.sessionData
  }
}

// Global audience tracker instance
let audienceTracker: AudienceTracker | null = null

export function initializeAudienceTracking() {
  if (typeof window !== "undefined" && !audienceTracker) {
    audienceTracker = new AudienceTracker()

    // Make it globally available for debugging
    ;(window as any).audienceTracker = audienceTracker
  }
  return audienceTracker
}

export function getAudienceTracker(): AudienceTracker | null {
  return audienceTracker
}

// Export functions for manual tracking
export function trackAudienceEvent(eventName: string, data?: any) {
  audienceTracker?.trackEvent(eventName, data)
}

export function trackAudiencePageView(path?: string) {
  audienceTracker?.trackPageView(path)
}

export function getActiveAudiences(): string[] {
  return audienceTracker?.getActiveAudiences() || []
}
