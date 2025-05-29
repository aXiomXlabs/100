import fs from "fs"

const BASE_URL = "https://rust-rocket.com"
const CRAWL_DEPTH = 8
const THREAD_LIMIT = 5

class SEOAuditor {
  constructor() {
    this.crawledUrls = new Set()
    this.results = []
    this.errors = {
      404: [],
      redirectChains: [],
      duplicates: [],
      notIndexed: [],
    }
  }

  async crawlSite() {
    console.log("🚀 Starting SEO audit for rust-rocket.com...")

    // Parse existing sitemap
    await this.parseSitemap()

    // Crawl domain
    await this.crawlDomain()

    // Generate reports
    await this.generateReports()

    console.log("✅ SEO audit completed!")
  }

  async parseSitemap() {
    try {
      const sitemapUrl = `${BASE_URL}/sitemap.xml`
      console.log(`📋 Parsing sitemap: ${sitemapUrl}`)

      const response = await fetch(sitemapUrl)
      if (response.ok) {
        const sitemapContent = await response.text()
        // Parse XML and extract URLs
        const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g)
        if (urlMatches) {
          urlMatches.forEach((match) => {
            const url = match.replace(/<\/?loc>/g, "")
            this.crawledUrls.add(url)
          })
        }
      }
    } catch (error) {
      console.warn("⚠️ Could not parse sitemap:", error.message)
    }
  }

  async crawlDomain() {
    const startUrls = [BASE_URL, `${BASE_URL}/`, `https://www.rust-rocket.com`, `https://www.rust-rocket.com/`]

    for (const url of startUrls) {
      await this.crawlUrl(url, 0)
    }
  }

  async crawlUrl(url, depth) {
    if (depth > CRAWL_DEPTH || this.crawledUrls.has(url)) {
      return
    }

    this.crawledUrls.add(url)

    try {
      console.log(`🔍 Crawling: ${url} (depth: ${depth})`)

      const response = await fetch(url, {
        method: "HEAD",
        redirect: "manual",
      })

      const result = {
        url,
        statusCode: response.status,
        canonical: response.headers.get("link")?.match(/rel="canonical"/)?.[0] || "",
        redirectTarget: response.headers.get("location") || "",
        contentType: response.headers.get("content-type") || "",
        lastModified: response.headers.get("last-modified") || "",
        title: "",
        h1: "",
      }

      // Analyze response
      this.analyzeResponse(result)
      this.results.push(result)

      // If it's a redirect, follow it
      if (response.status >= 300 && response.status < 400 && result.redirectTarget) {
        await this.crawlUrl(result.redirectTarget, depth + 1)
      }
    } catch (error) {
      console.error(`❌ Error crawling ${url}:`, error.message)
      this.results.push({
        url,
        statusCode: 0,
        error: error.message,
      })
    }
  }

  analyzeResponse(result) {
    const { statusCode, url, redirectTarget } = result

    // 404 errors
    if (statusCode === 404) {
      this.errors["404"].push(result)
    }

    // Redirect chains
    if (statusCode >= 300 && statusCode < 400) {
      this.errors.redirectChains.push(result)
    }

    // Potential duplicates (same content, different URLs)
    if (statusCode === 200) {
      // Check for www vs non-www duplicates
      const wwwUrl = url.replace("https://", "https://www.")
      const nonWwwUrl = url.replace("https://www.", "https://")

      if (url !== wwwUrl && this.crawledUrls.has(wwwUrl)) {
        this.errors.duplicates.push({ original: url, duplicate: wwwUrl })
      }
    }
  }

  async generateReports() {
    // Generate CSV report
    await this.generateCSVReport()

    // Generate error dashboard
    await this.generateErrorDashboard()

    // Generate recommendations
    await this.generateRecommendations()
  }

  async generateCSVReport() {
    const csvHeader = "URL,StatusCode,Canonical,RedirectTarget,ContentType,LastModified,Error\n"
    const csvRows = this.results
      .map(
        (result) =>
          `"${result.url}",${result.statusCode},"${result.canonical}","${result.redirectTarget}","${result.contentType}","${result.lastModified}","${result.error || ""}"`,
      )
      .join("\n")

    const csvContent = csvHeader + csvRows
    fs.writeFileSync("reports/crawl-report.csv", csvContent)
    console.log("📊 CSV report generated: reports/crawl-report.csv")
  }

  async generateErrorDashboard() {
    const dashboard = {
      summary: {
        totalUrls: this.results.length,
        errors404: this.errors["404"].length,
        redirectChains: this.errors.redirectChains.length,
        duplicates: this.errors.duplicates.length,
        timestamp: new Date().toISOString(),
      },
      errors: this.errors,
    }

    fs.writeFileSync("reports/error-dashboard.json", JSON.stringify(dashboard, null, 2))
    console.log("📈 Error dashboard generated: reports/error-dashboard.json")
  }

  async generateRecommendations() {
    const recommendations = []

    // 404 recommendations
    this.errors["404"].forEach((error) => {
      recommendations.push({
        type: "404",
        url: error.url,
        action: "Create 301 redirect or return 410 Gone",
        priority: "high",
      })
    })

    // Redirect chain recommendations
    this.errors.redirectChains.forEach((redirect) => {
      recommendations.push({
        type: "redirect_chain",
        url: redirect.url,
        target: redirect.redirectTarget,
        action: "Create direct 301 redirect",
        priority: "medium",
      })
    })

    // Duplicate recommendations
    this.errors.duplicates.forEach((duplicate) => {
      recommendations.push({
        type: "duplicate",
        url: duplicate.original,
        duplicate: duplicate.duplicate,
        action: "Add canonical tag or 301 redirect",
        priority: "medium",
      })
    })

    fs.writeFileSync("reports/recommendations.json", JSON.stringify(recommendations, null, 2))
    console.log("💡 Recommendations generated: reports/recommendations.json")
  }
}

// Create reports directory
if (!fs.existsSync("reports")) {
  fs.mkdirSync("reports")
}

// Run audit
const auditor = new SEOAuditor()
auditor.crawlSite().catch(console.error)
