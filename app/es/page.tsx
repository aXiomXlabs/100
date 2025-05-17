import HeroES from "@/components/es/Hero"
import NavbarES from "@/components/es/Navbar"
import Footer from "@/components/Footer"
import Script from "next/script"

export default function SpanishHomePage() {
  return (
    <>
      <NavbarES />
      <main>
        <HeroES />
        {/* Aquí se pueden agregar más componentes traducidos */}
      </main>
      <Footer />

      {/* JSON-LD Schema para la página española */}
      <Script
        id="schema-article-es"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Rust Rocket: El futuro del trading en Solana",
            image: "https://rust-rocket.com/images/og-image-es.png",
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
              "Descubre los últimos avances en trading de Solana y cómo Rust Rocket está revolucionando la industria.",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://rust-rocket.com/es/",
            },
            inLanguage: "es-ES",
          }),
        }}
      />
    </>
  )
}
