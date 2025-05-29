import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs" // Node.js built-in
import path from "path" // Node.js built-in
import { execSync } from "child_process" // Import execSync direkt

// Stelle sicher, dass die Umgebungsvariablen hier verfügbar sind,
// obwohl sie primär für die Client-Seite relevant sind,
// könnte ein Fehler hier die Initialisierung der Route stören.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Sitemap API: Supabase URL or Service Role Key is missing in environment variables.")
  // Du könntest hier entscheiden, nicht zu initialisieren oder einen Fehler zu werfen,
  // aber für einen 404 ist das unwahrscheinlich die Ursache, es sei denn, es führt zu einem Crash beim Laden der Route.
}

const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!)

export async function GET() {
  console.log("Sitemap API: GET request received") // Hinzugefügt für Debugging
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")
    console.log("Sitemap API: Attempting to read sitemap from:", sitemapPath) // Hinzugefügt

    if (!fs.existsSync(sitemapPath)) {
      console.error("Sitemap API: sitemap.xml not found at", sitemapPath) // Hinzugefügt
      return NextResponse.json({ error: "Sitemap not found" }, { status: 404 })
    }

    const sitemap = fs.readFileSync(sitemapPath, "utf8")
    const stats = fs.statSync(sitemapPath)
    console.log("Sitemap API: sitemap.xml read successfully. Size:", stats.size) // Hinzugefügt

    const urlCount = (sitemap.match(/<loc>/g) || []).length

    // Optional: Fehlerbehandlung für Supabase-Insert verbessern
    const { error: dbError } = await supabase.from("sitemap_status").insert({
      total_urls: urlCount,
      file_size_bytes: stats.size,
      last_generated: stats.mtime.toISOString(),
      status: "active",
    })
    if (dbError) {
      console.error("Sitemap API: Supabase insert error (GET):", dbError)
      // Entscheide, ob du hier trotz DB-Fehler die Sitemap zurückgeben willst
    } else {
      console.log("Sitemap API: Supabase sitemap_status updated (GET).")
    }

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "X-Sitemap-URLs": urlCount.toString(),
        "X-Sitemap-Size": stats.size.toString(),
      },
    })
  } catch (error) {
    console.error("Sitemap API GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  console.log("Sitemap API: POST request received") // Hinzugefügt für Debugging
  try {
    const startTime = Date.now()
    console.log("Sitemap API: Attempting to regenerate sitemap via script...") // Hinzugefügt

    // Trigger sitemap regeneration
    // const { execSync } = require("child_process") // Bereits oben importiert
    execSync("node scripts/generate-sitemap.js", { cwd: process.cwd(), stdio: "inherit" }) // stdio: 'inherit' für Logs
    console.log("Sitemap API: generate-sitemap.js script executed.") // Hinzugefügt

    const generationTime = Date.now() - startTime

    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml")
    const stats = fs.existsSync(sitemapPath) ? fs.statSync(sitemapPath) : null
    const sitemap = stats ? fs.readFileSync(sitemapPath, "utf8") : ""
    const urlCount = (sitemap.match(/<loc>/g) || []).length
    console.log("Sitemap API: Sitemap regenerated. URLs:", urlCount, "Size:", stats?.size) // Hinzugefügt

    const { error: dbError } = await supabase.from("sitemap_status").insert({
      total_urls: urlCount,
      generation_time_ms: generationTime,
      file_size_bytes: stats?.size || 0,
      status: "active",
    })

    if (dbError) {
      console.error("Sitemap API: Supabase insert error (POST):", dbError)
    } else {
      console.log("Sitemap API: Supabase sitemap_status updated (POST).")
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
    console.error("Sitemap API POST error:", error)

    await supabase
      .from("sitemap_status")
      .insert({
        total_urls: 0,
        status: "error",
        errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
      })
      .catch((dbInsertError) => {
        console.error("Sitemap API: Failed to log error to Supabase:", dbInsertError)
      })

    return NextResponse.json({ error: "Failed to regenerate sitemap" }, { status: 500 })
  }
}
