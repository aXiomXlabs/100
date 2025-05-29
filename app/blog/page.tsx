import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Script from "next/script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solana Trading Insights & Bot Strategies | Rust Rocket",
  description:
    "Expert insights on Solana trading, meme coin strategies, & copy trading with Rust Rocket's high-performance bot. Stay ahead in the crypto market.", // (151 chars)
}

// Beispiel-Blogposts
const blogPosts = [
  {
    id: "future-of-solana-trading",
    title: "Die Zukunft des Solana-Tradings",
    excerpt:
      "Erfahre mehr über die neuesten Entwicklungen im Solana-Trading und wie Rust Rocket die Branche revolutioniert.",
    date: "16. Mai 2025",
    author: "Rust Rocket Team",
    image: "/solana-trading-future.png",
    slug: "/blog/future-of-solana-trading",
  },
  {
    id: "meme-coin-strategies",
    title: "Erfolgreiche Strategien für Meme Coins",
    excerpt: "Entdecke bewährte Strategien für den erfolgreichen Handel mit Meme Coins auf der Solana-Blockchain.",
    date: "10. Mai 2025",
    author: "Rust Rocket Team",
    image: "/meme-coin-strategies.png",
    slug: "/blog/meme-coin-strategies",
  },
  {
    id: "copy-trading-explained",
    title: "Copy Trading erklärt: So funktioniert's",
    excerpt:
      "Ein umfassender Leitfaden zum Copy Trading auf Solana und wie du mit Rust Rocket davon profitieren kannst.",
    date: "5. Mai 2025",
    author: "Rust Rocket Team",
    image: "/copy-trading-explained.png",
    slug: "/blog/copy-trading-explained",
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
              Solana Sniper Bot Insights & Trading Strategies
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-text-secondary">
              Rust Rocket <span className="text-primary">Blog</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Entdecke die neuesten Einblicke, Strategien und Updates rund um Solana Trading, Meme Coins und die Rust
              Rocket Plattform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link href={post.slug}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-text-secondary mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <Link href={post.slug}>
                    <h2 className="text-xl font-bold mb-2 text-text-primary hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-text-secondary mb-4">{post.excerpt}</p>
                  <Link
                    href={post.slug}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  >
                    Weiterlesen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Beispiel für Article Schema für den ersten Blogpost */}
      <Script
        id="schema-article-1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Die Zukunft des Solana-Tradings",
            image: "https://rust-rocket.com/solana-trading-future.png",
            author: {
              "@type": "Person",
              name: "Rust Rocket Team",
            },
            publisher: {
              "@type": "Organization",
              name: "Rust Rocket",
              logo: {
                "@type": "ImageObject",
                url: "https://rust-rocket.com/favicon-192.png",
              },
            },
            datePublished: "2025-05-16T12:00:00+00:00",
            dateModified: "2025-05-16T12:00:00+00:00",
            description:
              "Erfahre mehr über die neuesten Entwicklungen im Solana-Trading und wie Rust Rocket die Branche revolutioniert.",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://rust-rocket.com/blog/future-of-solana-trading",
            },
          }),
        }}
      />
    </>
  )
}
