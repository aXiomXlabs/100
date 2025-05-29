import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

interface SEOAuditResult {
  url: string
  title?: string
  meta_description?: string
  h1_tag?: string
  canonical_url?: string
  robots_meta?: string
  og_title?: string
  og_description?: string
  og_image?: string
  issues: string[]
  score: number
  response_time?: number
  status_code?: number
  content_length?: number
}

async function auditPage(url: string): Promise<SEOAuditResult> {
  const issues: string[] = []
  let score = 100
  const startTime = Date.now()

  try {
    console.log(`🔍 Auditing: ${url}`)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Rust-Rocket-SEO-Audit/1.0 (https://rust-rocket.com)",
      },
      timeout: 10000, // 10 second timeout
    })

    const responseTime = Date.now() - startTime
    const statusCode = response.status

    if (!response.ok) {
      issues.push(`HTTP ${response.status}: ${response.statusText}`)
      score -= 50

      return {
        url,
        issues,
        score: Math.max(0, score),
        response_time: responseTime,
        status_code: statusCode,
      }
    }

    const html = await response.text()
    const contentLength = html.length

    // Extract meta information with more robust regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch?.[1]?.trim().replace(/\s+/g, " ")

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    const meta_description = descMatch?.[1]?.trim()

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    const h1_tag = h1Match?.[1]
      ?.trim()
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    const canonical_url = canonicalMatch?.[1]?.trim()

    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)
    const robots_meta = robotsMatch?.[1]?.trim()

    // Open Graph tags
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
    const og_title = ogTitleMatch?.[1]?.trim()

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
    const og_description = ogDescMatch?.[1]?.trim()

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    const og_image = ogImageMatch?.[1]?.trim()

    // SEO Checks with detailed scoring
    if (!title) {
      issues.push("Missing title tag")
      score -= 25
    } else {
      if (title.length < 30) {
        issues.push(`Title too short (${title.length} chars) - should be 30-60 characters`)
        score -= 15
      } else if (title.length > 60) {
        issues.push(`Title too long (${title.length} chars) - should be 30-60 characters`)
        score -= 10
      }
    }

    if (!meta_description) {
      issues.push("Missing meta description")
      score -= 20
    } else {
      if (meta_description.length < 120) {
        issues.push(`Meta description too short (${meta_description.length} chars) - should be 120-160 characters`)
        score -= 10
      } else if (meta_description.length > 160) {
        issues.push(`Meta description too long (${meta_description.length} chars) - should be 120-160 characters`)
        score -= 5
      }
    }

    if (!h1_tag) {
      issues.push("Missing H1 tag")
      score -= 20
    } else {
      // Check for multiple H1 tags
      const h1Count = (html.match(/<h1[^>]*>/gi) || []).length
      if (h1Count > 1) {
        issues.push(`Multiple H1 tags found (${h1Count}) - should have only one`)
        score -= 10
      }
    }

    if (!canonical_url) {
      issues.push("Missing canonical tag")
      score -= 15
    }

    // Open Graph checks
    if (!og_title) {
      issues.push("Missing Open Graph title")
      score -= 5
    }

    if (!og_description) {
      issues.push("Missing Open Graph description")
      score -= 5
    }

    if (!og_image) {
      issues.push("Missing Open Graph image")
      score -= 5
    }

    // Technical SEO checks
    if (robots_meta && robots_meta.includes("noindex")) {
      issues.push("Page has noindex directive")
      score -= 30
    }

    // Image alt text check
    const images = html.match(/<img[^>]*>/gi) || []
    const imagesWithoutAlt = images.filter((img) => !img.includes("alt=")).length
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`)
      score -= Math.min(imagesWithoutAlt * 3, 25)
    }

    // Check for heading structure
    const headings = {
      h1: (html.match(/<h1[^>]*>/gi) || []).length,
      h2: (html.match(/<h2[^>]*>/gi) || []).length,
      h3: (html.match(/<h3[^>]*>/gi) || []).length,
    }

    if (headings.h2 === 0 && headings.h3 > 0) {
      issues.push("H3 tags found without H2 tags - improper heading hierarchy")
      score -= 5
    }

    // Performance-related SEO checks
    if (responseTime > 3000) {
      issues.push(`Slow response time (${responseTime}ms) - affects SEO`)
      score -= 10
    }

    if (contentLength > 500000) {
      issues.push(`Large page size (${Math.round(contentLength / 1024)}KB) - may affect loading speed`)
      score -= 5
    }

    return {
      url,
      title,
      meta_description,
      h1_tag,
      canonical_url,
      robots_meta,
      og_title,
      og_description,
      og_image,
      issues,
      score: Math.max(0, score),
      response_time: responseTime,
      status_code: statusCode,
      content_length: contentLength,
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    issues.push(`Audit failed: ${error instanceof Error ? error.message : "Unknown error"}`)

    return {
      url,
      issues,
      score: 0,
      response_time: responseTime,
      status_code: 0,
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

    console.log(`🚀 Starting SEO audit for ${urls.length} URLs`)

    // Perform audits
    const results = await Promise.all(urls.map((url: string) => auditPage(url)))

    // Store results in database
    const auditData = results.map((result) => ({
      url: result.url,
      title: result.title,
      meta_description: result.meta_description,
      h1_tag: result.h1_tag,
      canonical_url: result.canonical_url,
      robots_meta: result.robots_meta,
      og_title: result.og_title,
      og_description: result.og_description,
      og_image: result.og_image,
      issues: result.issues,
      score: result.score,
      response_time: result.response_time,
      status_code: result.status_code,
      content_length: result.content_length,
    }))

    const { error: insertError } = await supabase.from("seo_audit_results").insert(auditData)

    if (insertError) {
      console.error("Failed to store audit results:", insertError)
    }

    // Store individual issues
    const issuesData: any[] = []
    results.forEach((result) => {
      result.issues.forEach((issue) => {
        issuesData.push({
          url: result.url,
          issue_type: issue.split(":")[0].trim(),
          issue_description: issue,
          severity: result.score < 50 ? "critical" : result.score < 70 ? "high" : "medium",
        })
      })
    })

    if (issuesData.length > 0) {
      const { error: issuesError } = await supabase.from("seo_issues").insert(issuesData)

      if (issuesError) {
        console.error("Failed to store SEO issues:", issuesError)
      }
    }

    const summary = {
      totalPages: results.length,
      averageScore: Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length),
      totalIssues: results.reduce((sum, r) => sum + r.issues.length, 0),
      pagesWithIssues: results.filter((r) => r.issues.length > 0).length,
      averageResponseTime: Math.round(results.reduce((sum, r) => sum + (r.response_time || 0), 0) / results.length),
      successfulAudits: results.filter((r) => r.status_code && r.status_code < 400).length,
    }

    console.log(`✅ SEO audit completed. Average score: ${summary.averageScore}`)

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hours = Number.parseInt(searchParams.get("hours") || "24")
    const url = searchParams.get("url")

    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

    let query = supabase
      .from("seo_audit_results")
      .select("*")
      .gte("audit_timestamp", cutoff)
      .order("audit_timestamp", { ascending: false })

    if (url) {
      query = query.eq("url", url)
    }

    const { data: auditData, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    // Get recent issues
    const { data: issuesData } = await supabase
      .from("seo_issues")
      .select("*")
      .eq("status", "open")
      .gte("last_seen", cutoff)
      .order("severity", { ascending: false })
      .limit(50)

    const summary = {
      totalAudits: auditData?.length || 0,
      averageScore: auditData?.length
        ? Math.round(auditData.reduce((sum, r) => sum + r.score, 0) / auditData.length)
        : 0,
      totalIssues: issuesData?.length || 0,
      criticalIssues: issuesData?.filter((i) => i.severity === "critical").length || 0,
      lastAudit: auditData?.[0]?.audit_timestamp || null,
    }

    return NextResponse.json({
      summary,
      recentAudits: auditData?.slice(0, 10) || [],
      recentIssues: issuesData?.slice(0, 20) || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("SEO audit GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
