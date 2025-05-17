"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Script from "next/script"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Was ist Rust Rocket?",
    answer:
      "Rust Rocket ist ein fortschrittlicher Solana Trading Bot, der sich auf Same-Block Execution und Copy Trading spezialisiert hat. Mit unserem proprietären BDN-Netzwerk (Block Dependent Network) ermöglichen wir es dir, Trades im selben Block wie das ursprüngliche Ereignis auszuführen und erfolgreiche Trader automatisch zu kopieren.",
  },
  {
    question: "Was bedeutet Same-Block Execution?",
    answer:
      "Same-Block Execution bedeutet, dass deine Trades genau im selben Solana-Block wie das ursprüngliche Ereignis (z.B. ein Token-Launch oder ein Trade eines erfolgreichen Traders) ausgeführt werden. Dies ist entscheidend für den Erfolg beim Handel mit Meme Coins, da selbst Sekundenbruchteile über Gewinn oder Verlust entscheiden können.",
  },
  {
    question: "Wie funktioniert Copy Trading?",
    answer:
      "Unser System identifiziert und verfolgt kontinuierlich Top-Performing Wallets auf Solana. Wenn diese Wallets einen Trade ausführen, analysiert unser Algorithmus die Transaktion und führt automatisch den gleichen Trade für dich aus - mit maximaler Geschwindigkeit und Präzision. Du kannst entscheiden, welche Wallets du kopieren möchtest und deine Risikoparameter individuell festlegen.",
  },
  {
    question: "Was ist das BDN-Netzwerk?",
    answer:
      "Das BDN (Block Dependent Network) ist unser globales Netzwerk aus 15 proprietären, optimierten Solana-Gateways. Diese sind strategisch auf der ganzen Welt verteilt und mit spezieller Hardware ausgestattet, um deine Transaktionen über die schnellsten und zuverlässigsten Wege zu leiten. Im Gegensatz zu öffentlichen Nodes umgehen wir Überlastungen und erreichen eine deutlich höhere Erfolgsrate.",
  },
  {
    question: "Wie hoch sind die Erfolgsraten?",
    answer:
      "Rust Rocket erreicht eine Erfolgsrate von über 95% bei der Ausführung von Trades im selben Block. Die durchschnittliche Ausführungszeit beträgt etwa 0,4 Sekunden, was deutlich schneller ist als herkömmliche Bots oder manuelle Trades.",
  },
  {
    question: "Wie kann ich Rust Rocket nutzen?",
    answer:
      "Rust Rocket wird über Telegram bereitgestellt. Nach der Registrierung erhältst du Zugang zu unserem Telegram-Bot, über den du alle Funktionen steuern kannst. Die Einrichtung ist einfach und intuitiv, und wir bieten umfassende Dokumentation und Support für alle Nutzer.",
  },
  {
    question: "Wann wird Rust Rocket starten?",
    answer:
      "Rust Rocket befindet sich derzeit in der finalen Testphase und wird nächste Woche offiziell starten. Trage dich in unsere Warteliste ein, um als Erster benachrichtigt zu werden und exklusive Vorteile zu erhalten.",
  },
]

export default function FAQSectionDE() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const toggleFAQ = (index: number) => {
    // Track FAQ interaction
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag is not typed
      window.gtag("event", "faq_interaction", {
        event_category: "engagement",
        event_label: `faq_${index + 1}_${activeIndex === index ? "close" : "open"}`,
      })
    }

    setActiveIndex(activeIndex === index ? null : index)
  }

  // Generate FAQ schema data
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="faq" aria-labelledby="faq-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2" aria-hidden="true"></span>
            FAQ
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary" id="faq-heading">
            Häufig gestellte <span className="text-gradient">Fragen</span>
          </h2>

          <p className="text-text-secondary text-lg">
            Hier findest du Antworten auf die häufigsten Fragen zu Rust Rocket. Wenn du weitere Fragen hast, zögere
            nicht, uns über Telegram zu kontaktieren.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-background-tertiary border-primary/30 border"
                    : "bg-background-secondary hover:bg-background-tertiary border border-gray-800"
                }`}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                data-tracking-id={`faq_question_${index + 1}`}
              >
                <span className="font-medium text-text-primary">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="p-5 bg-background-secondary/50 border border-t-0 border-gray-800 rounded-b-lg">
                      <p className="text-text-secondary">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* JSON-LD Schema for FAQ Page */}
      <Script
        id="faq-schema-de"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData),
        }}
      />
    </section>
  )
}
