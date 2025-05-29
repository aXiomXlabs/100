import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")

    if (!fs.existsSync(sitemapPath)) {
      return NextResponse.json({ error: "Sitemap not found" }, { status: 404 })
    }

    const sitemap = fs.readFileSync(sitemapPath, "utf8")
    const stats = fs.statSync(sitemapPath)

    // Update sitemap status in database
    const urlCount = (sitemap.match(/<loc>/g) || []).length

    await supabase.from("sitemap_status").insert({
      total_urls: urlCount,
      file_size_bytes: stats.size,
      last_generated: stats.mtime.toISOString(),
      status: "active",
    })

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-Sitemap-URLs": urlCount.toString(),
        "X-Sitemap-Size": stats.size.toString(),
      },
    })
  } catch (error) {
    console.error("Sitemap API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const startTime = Date.now()

    // Trigger sitemap regeneration
    const { execSync } = require("child_process")
    execSync("node scripts/generate-sitemap.js", { cwd: process.cwd() })

    const generationTime = Date.now() - startTime

    // Get sitemap info
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")
    const stats = fs.existsSync(sitemapPath) ? fs.statSync(sitemapPath) : null
    const sitemap = stats ? fs.readFileSync(sitemapPath, "utf8") : ""
    const urlCount = (sitemap.match(/<loc>/g) || []).length

    // Store generation info in database
    const { error } = await supabase.from("sitemap_status").insert({
      total_urls: urlCount,
      generation_time_ms: generationTime,
      file_size_bytes: stats?.size || 0,
      status: "active",
    })

    if (error) {
      console.error("Failed to store sitemap status:", error)
    }

    return NextResponse.json({
      success: true,
      message: "Sitemap regenerated successfully",
      timestamp: new Date().toISOString(),
      stats: {
        totalUrls: urlCount,
        generationTimeMs: generationTime,
        fileSizeBytes: stats?.size || 0,
      },
    })
  } catch (error) {
    console.error("Sitemap regeneration error:", error)

    // Store error in database
    await supabase.from("sitemap_status").insert({
      total_urls: 0,
      status: "error",
      errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
    })

    return NextResponse.json({ error: "Failed to regenerate sitemap" }, { status: 500 })
  }
}
