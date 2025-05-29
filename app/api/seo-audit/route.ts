import { type NextRequest, NextResponse } from "next/server"

interface SEOAuditResult {
  url: string
  title?: string
  description?: string
  h1?: string
  canonical?: string
  robots?: string
  openGraph?: {
    title?: string
    description?: string
    image?: string
  }
  issues: string[]
  score: number
}

async function auditPage(url: string): Promise<SEOAuditResult> {
  const issues: string[] = []
  let score = 100

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Rust-Rocket-SEO-Audit/1.0",
      },
    })

    if (!response.ok) {
      issues.push(`HTTP ${response.status}: ${response.statusText}`)
      score -= 50
    }

    const html = await response.text()

    // Extract meta information
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch?.[1]?.trim()

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    const description = descMatch?.[1]?.trim()

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    const h1 = h1Match?.[1]?.trim()

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    const canonical = canonicalMatch?.[1]?.trim()

    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)
    const robots = robotsMatch?.[1]?.trim()

    // Open Graph
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)

    // SEO Checks
    if (!title) {
      issues.push("Missing title tag")
      score -= 20
    } else if (title.length < 30 || title.length > 60) {
      issues.push(`Title length (${title.length}) should be 30-60 characters`)
      score -= 10
    }

    if (!description) {
      issues.push("Missing meta description")
      score -= 15
    } else if (description.length < 120 || description.length > 160) {
      issues.push(`Meta description length (${description.length}) should be 120-160 characters`)
      score -= 10
    }

    if (!h1) {
      issues.push("Missing H1 tag")
      score -= 15
    }

    if (!canonical) {
      issues.push("Missing canonical tag")
      score -= 10
    }

    if (!ogTitleMatch) {
      issues.push("Missing Open Graph title")
      score -= 5
    }

    if (!ogDescMatch) {
      issues.push("Missing Open Graph description")
      score -= 5
    }

    if (!ogImageMatch) {
      issues.push("Missing Open Graph image")
      score -= 5
    }

    // Check for common issues
    if (html.includes("noindex")) {
      issues.push("Page has noindex directive")
      score -= 30
    }

    const imageCount = (html.match(/<img[^>]*>/gi) || []).length
    const imagesWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`)
      score -= Math.min(imagesWithoutAlt * 2, 20)
    }

    return {
      url,
      title,
      description,
      h1,
      canonical,
      robots,
      openGraph: {
        title: ogTitleMatch?.[1]?.trim(),
        description: ogDescMatch?.[1]?.trim(),
        image: ogImageMatch?.[1]?.trim(),
      },
      issues,
      score: Math.max(0, score),
    }
  } catch (error) {
    issues.push(`Audit failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    return {
      url,
      issues,
      score: 0,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required" }, { status: 400 })
    }

    if (urls.length > 10) {
      return NextResponse.json({ error: "Maximum 10 URLs per request" }, { status: 400 })
    }

    const results = await Promise.all(urls.map((url: string) => auditPage(url)))

    const summary = {
      totalPages: results.length,
      averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
      totalIssues: results.reduce((sum, r) => sum + r.issues.length, 0),
      pagesWithIssues: results.filter((r) => r.issues.length > 0).length,
    }

    return NextResponse.json({
      summary,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("SEO audit error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
