import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { execSync } from "child_process"

// Function to extract JSON-LD from HTML
function extractJsonLd(html: string): string[] {
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  const matches = [...html.matchAll(jsonLdRegex)]
  return matches.map((match) => match[1].trim())
}

// Function to validate JSON-LD
function validateJsonLd(jsonLd: string): { valid: boolean; errors: string[] } {
  try {
    const parsed = JSON.parse(jsonLd)
    const errors: string[] = []

    // Check for required fields based on @type
    if (parsed["@type"] === "Review") {
      if (!parsed.itemReviewed) {
        errors.push("Review is missing required field: itemReviewed")
      }

      if (!parsed.author || (parsed.author["@type"] !== "Person" && parsed.author["@type"] !== "Organization")) {
        errors.push("Review author must be of type Person or Organization")
      }
    }

    if (parsed["@type"] === "FAQPage" && (!parsed.mainEntity || !Array.isArray(parsed.mainEntity))) {
      errors.push("FAQPage is missing required field: mainEntity (array)")
    }

    return { valid: errors.length === 0, errors }
  } catch (e) {
    return { valid: false, errors: [`Invalid JSON: ${e.message}`] }
  }
}

// Main function to test schemas
async function testSchemas() {
  try {
    // Build the site if it doesn't exist
    console.log("Building site...")
    execSync("npm run build", { stdio: "inherit" })

    // Get HTML content from the output directory
    const htmlPath = join(process.cwd(), ".next/server/app/page.html")
    const html = readFileSync(htmlPath, "utf-8")

    // Extract and validate JSON-LD
    const jsonLdBlocks = extractJsonLd(html)
    console.log(`Found ${jsonLdBlocks.length} JSON-LD blocks`)

    let hasErrors = false
    const results = jsonLdBlocks.map((jsonLd, index) => {
      const validation = validateJsonLd(jsonLd)
      if (!validation.valid) {
        hasErrors = true
      }
      return {
        index,
        jsonLd,
        ...validation,
      }
    })

    // Write results to file
    writeFileSync(join(process.cwd(), "schema-test-results.json"), JSON.stringify(results, null, 2))

    // Output results
    results.forEach((result, index) => {
      console.log(`\nSchema #${index + 1}:`)
      console.log(`Valid: ${result.valid ? "✅" : "❌"}`)
      if (result.errors.length > 0) {
        console.log("Errors:")
        result.errors.forEach((error) => console.log(`  - ${error}`))
      }
    })

    // Exit with error if any schema is invalid
    if (hasErrors) {
      console.error("\n❌ Schema validation failed. See errors above.")
      process.exit(1)
    } else {
      console.log("\n✅ All schemas are valid!")
    }
  } catch (error) {
    console.error("Error testing schemas:", error)
    process.exit(1)
  }
}

// Run the test
testSchemas()
