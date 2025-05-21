const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Base URL of the website
const BASE_URL = "https://rust-rocket.com"

// Paths to exclude from the sitemap
const EXCLUDED_PATHS = [
  "/landing/ads",
  "/landing/ads/*",
  "/admin",
  "/admin/*",
  "/api",
  "/api/*",
  "/_*",
  "/404",
  "/500",
  "/arbitrage",
  "/arbitrage/*",
  "/pump-alerts",
  "/pump-alerts/*",
  "/hft.html",
  "/scalping.html",
  "/glossary",
  "/glossary/*",
  "/pricing.html",
  "/blog",
  "/blog/*",
]

// Function to check if a path should be excluded
function shouldExclude(path) {
  return EXCLUDED_PATHS.some((pattern) => {
    if (pattern.endsWith("*")) {
      const prefix = pattern.slice(0, -1)
      return path.startsWith(prefix)
    }
    return path === pattern
  })
}

// Get all pages from the app directory
function getPages() {
  const appPages = glob.sync("app/**/page.{tsx,jsx,js,ts}", { ignore: ["app/**/node_modules/**"] })

  return appPages
    .map((page) => {
      // Convert file path to URL path
      let urlPath = page
        .replace("app/", "/")
        .replace(/\/page\.(tsx|jsx|js|ts)$/, "")
        .replace(/\/$$.*?$$\//g, "/") // Remove Next.js route groups like (auth)
        .replace(/\[\.{3}(.*?)\]/g, ":$1") // Handle catch-all routes [...param]
        .replace(/\[(.*?)\]/g, ":$1") // Handle dynamic routes [param]

      // Handle index routes
      if (urlPath === "/index" || urlPath === "") {
        urlPath = "/"
      }

      return urlPath
    })
    .filter((path) => !shouldExclude(path))
}

// Generate sitemap XML
function generateSitemap() {
  const pages = getPages()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap)
  console.log("Sitemap generated successfully!")
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /landing/ads
Disallow: /admin
Disallow: /api

Sitemap: ${BASE_URL}/sitemap.xml`

  fs.writeFileSync(path.join(process.cwd(), "public", "robots.txt"), robotsTxt)
  console.log("robots.txt generated successfully!")
}

// Run the generators
generateSitemap()
generateRobotsTxt()
