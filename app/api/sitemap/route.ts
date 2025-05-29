import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"
import { execSync } from "child_process"

// Supabase client setup with error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null
if (supabaseUrl && supabaseServiceRoleKey) {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
} else {
  console.warn("Sitemap API: Supabase credentials missing, database logging disabled")
}

// Fallback sitemap generation function
function generateFallbackSitemap() {
  const baseUrl = "https://rust-rocket.com"
  const currentDate = new Date().toISOString().split("T")[0]

  // Basic pages that should always exist
  const basicPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/solana-sniper-bot", priority: "0.9", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/faq", priority: "0.6", changefreq: "monthly" },
    { url: "/legal/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/legal/terms", priority: "0.3", changefreq: "yearly" },
    { url: "/legal/imprint", priority: "0.3", changefreq: "yearly" },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${basicPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`
}

export async function GET() {
  console.log("Sitemap API: GET request received")

  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")
    console.log("Sitemap API: Looking for sitemap at:", sitemapPath)

    let sitemap: string
    let urlCount: number
    let fileSize: number

    if (fs.existsSync(sitemapPath)) {
      console.log("Sitemap API: Found existing sitemap.xml")
      sitemap = fs.readFileSync(sitemapPath, "utf8")
      const stats = fs.statSync(sitemapPath)
      fileSize = stats.size
      urlCount = (sitemap.match(/<loc>/g) || []).length
      console.log(`Sitemap API: Loaded sitemap with ${urlCount} URLs, ${fileSize} bytes`)
    } else {
      console.log("Sitemap API: sitemap.xml not found, generating fallback")
      sitemap = generateFallbackSitemap()
      urlCount = (sitemap.match(/<loc>/g) || []).length
      fileSize = Buffer.byteLength(sitemap, "utf8")
      console.log(`Sitemap API: Generated fallback sitemap with ${urlCount} URLs`)

      // Try to write the fallback sitemap for future use
      try {
        const publicDir = path.dirname(sitemapPath)
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true })
        }
        fs.writeFileSync(sitemapPath, sitemap)
        console.log("Sitemap API: Fallback sitemap written to disk")
      } catch (writeError) {
        console.warn("Sitemap API: Could not write fallback sitemap to disk:", writeError)
      }
    }

    // Log to database if available
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from("sitemap_status").insert({
          total_urls: urlCount,
          file_size_bytes: fileSize,
          last_generated: new Date().toISOString(),
          status: "active",
        })
        if (dbError) {
          console.error("Sitemap API: Database logging error:", dbError)
        } else {
          console.log("Sitemap API: Successfully logged to database")
        }
      } catch (dbError) {
        console.error("Sitemap API: Database connection error:", dbError)
      }
    }

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-Sitemap-URLs": urlCount.toString(),
        "X-Sitemap-Size": fileSize.toString(),
        "X-Sitemap-Source": fs.existsSync(sitemapPath) ? "file" : "fallback",
      },
    })
  } catch (error) {
    console.error("Sitemap API GET error:", error)

    // Even if there's an error, try to return a basic fallback
    try {
      const fallbackSitemap = generateFallbackSitemap()
      return new NextResponse(fallbackSitemap, {
        headers: {
          "Content-Type": "application/xml",
          "X-Sitemap-Source": "emergency-fallback",
        },
      })
    } catch (fallbackError) {
      console.error("Sitemap API: Even fallback generation failed:", fallbackError)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}

export async function POST() {
  console.log("Sitemap API: POST request received - regenerating sitemap")

  try {
    const startTime = Date.now()

    // Trigger sitemap regeneration
    console.log("Sitemap API: Executing generate-sitemap.js script...")
    execSync("node scripts/generate-sitemap.js", {
      cwd: process.cwd(),
      stdio: "inherit",
      timeout: 30000, // 30 second timeout
    })
    console.log("Sitemap API: Script execution completed")

    const generationTime = Date.now() - startTime

    // Check if sitemap was generated
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")
    const stats = fs.existsSync(sitemapPath) ? fs.statSync(sitemapPath) : null

    if (!stats) {
      throw new Error("Sitemap generation script completed but sitemap.xml was not created")
    }

    const sitemap = fs.readFileSync(sitemapPath, "utf8")
    const urlCount = (sitemap.match(/<loc>/g) || []).length

    console.log(`Sitemap API: Successfully regenerated sitemap with ${urlCount} URLs in ${generationTime}ms`)

    // Log to database if available
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from("sitemap_status").insert({
          total_urls: urlCount,
          generation_time_ms: generationTime,
          file_size_bytes: stats.size,
          status: "active",
        })
        if (dbError) {
          console.error("Sitemap API: Database logging error:", dbError)
        }
      } catch (dbError) {
        console.error("Sitemap API: Database connection error:", dbError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Sitemap regenerated successfully",
      timestamp: new Date().toISOString(),
      stats: {
        totalUrls: urlCount,
        generationTimeMs: generationTime,
        fileSizeBytes: stats.size,
      },
    })
  } catch (error) {
    console.error("Sitemap API POST error:", error)

    // Log error to database if available
    if (supabase) {
      try {
        await supabase.from("sitemap_status").insert({
          total_urls: 0,
          status: "error",
          errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
        })
      } catch (dbError) {
        console.error("Sitemap API: Failed to log error to database:", dbError)
      }
    }

    return NextResponse.json(
      {
        error: "Failed to regenerate sitemap",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
