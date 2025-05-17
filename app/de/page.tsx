import HeroDE from "@/components/de/Hero"
import NavbarDE from "@/components/de/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script"

export default function GermanHomePage() {
  return (
    <>
      <NavbarDE />
      <main>
        <HeroDE />
        {/* Hier können weitere übersetzte Komponenten hinzugefügt werden */}
      </main>
      <Footer />

      {/* JSON-LD Schema für die deutsche Seite */}
      <Script
        id="schema-article-de"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Rust Rocket: Die Zukunft des Solana-Tradings",
            image: "https://rust-rocket.com/images/og-image-de.png",
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
              "@id": "https://rust-rocket.com/de/",
            },
            inLanguage: "de-DE",
          }),
        }}
      />
    </>
  )
}
