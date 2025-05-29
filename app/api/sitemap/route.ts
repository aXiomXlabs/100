import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")

    if (!fs.existsSync(sitemapPath)) {
      return NextResponse.json({ error: "Sitemap not found" }, { status: 404 })
    }

    const sitemap = fs.readFileSync(sitemapPath, "utf8")

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  } catch (error) {
    console.error("Sitemap API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Trigger sitemap regeneration
    const { execSync } = require("child_process")
    execSync("node scripts/generate-sitemap.js", { cwd: process.cwd() })

    return NextResponse.json({
      success: true,
      message: "Sitemap regenerated successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Sitemap regeneration error:", error)
    return NextResponse.json({ error: "Failed to regenerate sitemap" }, { status: 500 })
  }
}
