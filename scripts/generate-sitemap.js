// scripts/generate-sitemap.js
const fs = require("fs")
const path = require("path")
const glob = require("glob")
const prettier = require("prettier")

// Konfiguration
const SITE_URL = "https://rust-rocket.com"
const EXCLUDED_PATHS = ["/api/", "/admin/", "/test-", "/404", "/410", "/500", "/_"]

// Lebende Pfade - nur diese sollen in der Sitemap erscheinen
const VALID_PATHS = [
  "/",
  "/de",
  "/es",
  "/solana-sniper-bot",
  "/de/solana-sniper-bot",
  "/es/solana-sniper-bot",
  "/blog",
  "/blog/future-of-solana-trading",
  "/legal/privacy-policy",
  "/legal/terms",
]

// Funktion zum Generieren der Sitemap
async function generateSitemap() {
  console.log("Generating sitemap...")

  // Aktuelle Sitemap-Einträge erstellen
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${VALID_PATHS.map((path) => {
    // Bestimme die Priorität basierend auf der Pfadtiefe
    let priority = "1.0"
    if (path.split("/").length > 2) {
      priority = "0.8"
    }
    if (path.includes("/blog/")) {
      priority = "0.7"
    }
    if (path.includes("/legal/")) {
      priority = "0.5"
    }

    // Bestimme die Änderungshäufigkeit
    let changefreq = "weekly"
    if (path.includes("/blog/")) {
      changefreq = "monthly"
    }

    // Erstelle hreflang-Tags für mehrsprachige Seiten
    let hreflangTags = ""
    if (
      path === "/" ||
      path === "/de" ||
      path === "/es" ||
      path === "/solana-sniper-bot" ||
      path === "/de/solana-sniper-bot" ||
      path === "/es/solana-sniper-bot"
    ) {
      const basePath = path.includes("solana-sniper-bot") ? "/solana-sniper-bot" : "/"

      hreflangTags = `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${basePath}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${SITE_URL}/de${basePath}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/es${basePath}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${basePath}"/>`
    }

    return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${hreflangTags}
  </url>`
  }).join("\n")}
</urlset>`

  // Formatiere die Sitemap mit Prettier
  const formattedSitemap = await prettier.format(sitemap, {
    parser: "html",
    printWidth: 120,
  })

  // Schreibe die Sitemap in die Datei
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), formattedSitemap)

  console.log("Sitemap generated successfully!")
}

// Führe die Funktion aus
generateSitemap().catch((err) => {
  console.error("Error generating sitemap:", err)
  process.exit(1)
})
