import fs from "fs"
import path from "path"
import glob from "glob"
import { execSync } from "child_process"

// Base URL of the website
const BASE_URL = "https://rust-rocket.com"
const MAX_URLS_PER_SITEMAP = 50000

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
  "/gone",
  "/search",
  "/test-*",
  "*.html",
]

// Priority mapping for different page types
const PRIORITY_MAP = {
  "/": "1.0",
  "/solana-sniper-bot": "0.9",
  "/blog": "0.8",
  "/blog/*": "0.7",
  "/legal/*": "0.3",
  "/faq": "0.6",
  "/thanks": "0.4",
}

// Change frequency mapping
const CHANGEFREQ_MAP = {
  "/": "daily",
  "/blog": "weekly",
  "/blog/*": "monthly",
  "/legal/*": "yearly",
  "/solana-sniper-bot": "weekly",
}

function shouldExclude(path) {
  return EXCLUDED_PATHS.some((pattern) => {
    if (pattern.endsWith("*")) {
      const prefix = pattern.slice(0, -1)
      return path.startsWith(prefix)
    }
    if (pattern.startsWith("*")) {
      const suffix = pattern.slice(1)
      return path.endsWith(suffix)
    }
    return path === pattern
  })
}

function getPriority(urlPath) {
  for (const [pattern, priority] of Object.entries(PRIORITY_MAP)) {
    if (pattern.endsWith("*")) {
      const prefix = pattern.slice(0, -1)
      if (urlPath.startsWith(prefix)) return priority
    } else if (pattern === urlPath) {
      return priority
    }
  }
  return "0.5" // default priority
}

function getChangeFreq(urlPath) {
  for (const [pattern, freq] of Object.entries(CHANGEFREQ_MAP)) {
    if (pattern.endsWith("*")) {
      const prefix = pattern.slice(0, -1)
      if (urlPath.startsWith(prefix)) return freq
    } else if (pattern === urlPath) {
      return freq
    }
  }
  return "monthly" // default frequency
}

function getLastModified(filePath) {
  try {
    // Try to get last commit date for the file
    const gitDate = execSync(`git log -1 --format=%cI -- ${filePath}`, { encoding: "utf8" }).trim()
    if (gitDate) {
      return new Date(gitDate).toISOString().split("T")[0]
    }
  } catch (error) {
    // Fallback to file modification time
    try {
      const stats = fs.statSync(filePath)
      return stats.mtime.toISOString().split("T")[0]
    } catch (e) {
      // Final fallback to current date
      return new Date().toISOString().split("T")[0]
    }
  }
  return new Date().toISOString().split("T")[0]
}

function getPages() {
  const appPages = glob.sync("app/**/page.{tsx,jsx,js,ts}", {
    ignore: ["app/**/node_modules/**"],
  })

  return appPages
    .map((page) => {
      // Convert file path to URL path
      let urlPath = page
        .replace("app/", "/")
        .replace(/\/page\.(tsx|jsx|js|ts)$/, "")
        .replace(/\/$$[^)]+$$\//g, "/") // Remove Next.js route groups like (auth)
        .replace(/\[\.{3}(.*?)\]/g, ":$1") // Handle catch-all routes [...param]
        .replace(/\[(.*?)\]/g, ":$1") // Handle dynamic routes [param]

      // Handle index routes
      if (urlPath === "/index" || urlPath === "") {
        urlPath = "/"
      }

      return {
        url: urlPath,
        filePath: page,
        lastModified: getLastModified(page),
        priority: getPriority(urlPath),
        changefreq: getChangeFreq(urlPath),
      }
    })
    .filter((page) => !shouldExclude(page.url))
}

function generateSitemap(pages, index = 0) {
  const startIndex = index * MAX_URLS_PER_SITEMAP
  const endIndex = Math.min(startIndex + MAX_URLS_PER_SITEMAP, pages.length)
  const pageSlice = pages.slice(startIndex, endIndex)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pageSlice
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  const filename = index === 0 ? "sitemap.xml" : `sitemap-${index + 1}.xml`
  fs.writeFileSync(path.join(process.cwd(), "public", filename), sitemap)
  console.log(`📄 Sitemap generated: ${filename} (${pageSlice.length} URLs)`)

  return filename
}

function generateSitemapIndex(sitemapFiles) {
  const today = new Date().toISOString().split("T")[0]

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (filename) => `  <sitemap>
    <loc>${BASE_URL}/${filename}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap-index.xml"), sitemapIndex)
  console.log(`📑 Sitemap index generated with ${sitemapFiles.length} sitemaps`)
}

function generateRobotsTxt() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Block admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /landing/ads/

# Block query parameters
Disallow: /*?*

# Block test pages
Disallow: /test-*

# Allow specific important pages
Allow: /api/sitemap
Allow: /api/robots

# Crawl delay for bots
Crawl-delay: 1

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-index.xml`

  fs.writeFileSync(path.join(process.cwd(), "public", "robots.txt"), robotsTxt)
  console.log("🤖 robots.txt generated successfully!")
}

// Main execution
function main() {
  console.log("🚀 Generating enhanced sitemap and robots.txt...")

  const pages = getPages()
  console.log(`📊 Found ${pages.length} pages to include in sitemap`)

  // Generate sitemaps (split if necessary)
  const sitemapFiles = []
  const numSitemaps = Math.ceil(pages.length / MAX_URLS_PER_SITEMAP)

  for (let i = 0; i < numSitemaps; i++) {
    const filename = generateSitemap(pages, i)
    sitemapFiles.push(filename)
  }

  // Generate sitemap index if multiple sitemaps
  if (sitemapFiles.length > 1) {
    generateSitemapIndex(sitemapFiles)
  }

  // Generate robots.txt
  generateRobotsTxt()

  console.log("✅ Sitemap generation completed!")
}

main()
