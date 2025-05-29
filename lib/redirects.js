// Redirect mapping for fixing 404s and optimizing redirect chains
export const REDIRECT_MAP = [
  // Legacy URLs to new structure
  {
    source: "/privacy",
    destination: "/legal/privacy",
    permanent: true,
    reason: "Legal page restructure",
  },
  {
    source: "/terms",
    destination: "/legal/terms",
    permanent: true,
    reason: "Legal page restructure",
  },
  {
    source: "/imprint",
    destination: "/legal/imprint",
    permanent: true,
    reason: "Legal page restructure",
  },
  {
    source: "/cookies",
    destination: "/legal/cookies",
    permanent: true,
    reason: "Legal page restructure",
  },

  // HTML file redirects
  {
    source: "/index.html",
    destination: "/",
    permanent: true,
    reason: "Remove .html extension",
  },
  {
    source: "/faq.html",
    destination: "/faq",
    permanent: true,
    reason: "Remove .html extension",
  },
  {
    source: "/privacy.html",
    destination: "/legal/privacy",
    permanent: true,
    reason: "Remove .html extension and restructure",
  },
  {
    source: "/terms.html",
    destination: "/legal/terms",
    permanent: true,
    reason: "Remove .html extension and restructure",
  },

  // Common misspellings and variations
  {
    source: "/solana-sniper",
    destination: "/solana-sniper-bot",
    permanent: true,
    reason: "Redirect to full page name",
  },
  {
    source: "/sniper-bot",
    destination: "/solana-sniper-bot",
    permanent: true,
    reason: "Redirect to full page name",
  },
  {
    source: "/copy-trading",
    destination: "/#copy-trading",
    permanent: true,
    reason: "Redirect to section on homepage",
  },
  {
    source: "/features",
    destination: "/#features",
    permanent: true,
    reason: "Redirect to section on homepage",
  },
  {
    source: "/roadmap",
    destination: "/#roadmap",
    permanent: true,
    reason: "Redirect to section on homepage",
  },

  // Blog redirects (if old blog structure existed)
  {
    source: "/blog/solana-trading",
    destination: "/blog/future-of-solana-trading",
    permanent: true,
    reason: "Redirect to updated blog post",
  },

  // Trailing slash normalization
  {
    source: "/legal/privacy/",
    destination: "/legal/privacy",
    permanent: true,
    reason: "Remove trailing slash",
  },
  {
    source: "/legal/terms/",
    destination: "/legal/terms",
    permanent: true,
    reason: "Remove trailing slash",
  },
  {
    source: "/legal/imprint/",
    destination: "/legal/imprint",
    permanent: true,
    reason: "Remove trailing slash",
  },
  {
    source: "/solana-sniper-bot/",
    destination: "/solana-sniper-bot",
    permanent: true,
    reason: "Remove trailing slash",
  },

  // Query parameter redirects
  {
    source: "/landing/ads",
    destination: "/solana-sniper-bot",
    permanent: false,
    reason: "Redirect ads landing to main product page",
  },

  // Social media and campaign redirects
  {
    source: "/telegram",
    destination: "https://t.me/rust_rocket",
    permanent: false,
    reason: "Redirect to Telegram channel",
  },
  {
    source: "/discord",
    destination: "https://discord.gg/rust-rocket",
    permanent: false,
    reason: "Redirect to Discord server",
  },
  {
    source: "/twitter",
    destination: "https://x.com/rust_rocket",
    permanent: false,
    reason: "Redirect to X/Twitter profile",
  },
]

// Function to get redirect for a given path
export function getRedirect(path) {
  return REDIRECT_MAP.find((redirect) => redirect.source === path)
}

// Function to get all redirects for Next.js config
export function getAllRedirects() {
  return REDIRECT_MAP.map(({ source, destination, permanent }) => ({
    source,
    destination,
    permanent,
  }))
}

// Function to validate redirect chains
export function validateRedirectChains() {
  const chains = []

  REDIRECT_MAP.forEach((redirect) => {
    const chain = [redirect.source]
    let current = redirect.destination
    let depth = 0

    while (depth < 10) {
      // Prevent infinite loops
      const nextRedirect = REDIRECT_MAP.find((r) => r.source === current)
      if (!nextRedirect) break

      chain.push(current)
      current = nextRedirect.destination
      depth++

      if (depth > 1) {
        chains.push({
          chain,
          length: depth + 1,
          recommendation: `Create direct redirect from ${chain[0]} to ${current}`,
        })
      }
    }
  })

  return chains
}
