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
    question: "¿Qué es Rust Rocket?",
    answer:
      "Rust Rocket es un bot avanzado de trading para Solana que se especializa en ejecución same-block y copy trading. Con nuestra red BDN (Block Dependent Network) propietaria, te permitimos ejecutar operaciones en el mismo bloque que el evento original y copiar automáticamente a traders exitosos.",
  },
  {
    question: "¿Qué significa Ejecución Same-Block?",
    answer:
      "La Ejecución Same-Block significa que tus operaciones se ejecutan exactamente en el mismo bloque de Solana que el evento original (por ejemplo, el lanzamiento de un token o una operación de un trader exitoso). Esto es crucial para el éxito al operar con meme coins, ya que incluso fracciones de segundo pueden determinar ganancias o pérdidas.",
  },
  {
    question: "¿Cómo funciona el Copy Trading?",
    answer:
      "Nuestro sistema identifica y rastrea continuamente las carteras de mejor rendimiento en Solana. Cuando estas carteras ejecutan una operación, nuestro algoritmo analiza la transacción y ejecuta automáticamente la misma operación para ti, con máxima velocidad y precisión. Puedes decidir qué carteras copiar y establecer tus parámetros de riesgo individualmente.",
  },
  {
    question: "¿Qué es la Red BDN?",
    answer:
      "La BDN (Block Dependent Network) es nuestra red global de 15 gateways de Solana propietarios y optimizados. Están distribuidos estratégicamente por todo el mundo y equipados con hardware especial para enrutar tus transacciones a través de las vías más rápidas y confiables. A diferencia de los nodos públicos, evitamos la congestión y logramos una tasa de éxito significativamente mayor.",
  },
  {
    question: "¿Cuáles son las tasas de éxito?",
    answer:
      "Rust Rocket logra una tasa de éxito de más del 95% al ejecutar operaciones en el mismo bloque. El tiempo de ejecución promedio es de aproximadamente 0.4 segundos, lo que es significativamente más rápido que los bots convencionales o las operaciones manuales.",
  },
  {
    question: "¿Cómo puedo usar Rust Rocket?",
    answer:
      "Rust Rocket se proporciona a través de Telegram. Después del registro, obtienes acceso a nuestro bot de Telegram, a través del cual puedes controlar todas las funciones. La configuración es simple e intuitiva, y ofrecemos documentación completa y soporte para todos los usuarios.",
  },
  {
    question: "¿Cuándo se lanzará Rust Rocket?",
    answer:
      "Rust Rocket está actualmente en la fase final de pruebas y se lanzará oficialmente la próxima semana. Únete a nuestra lista de espera para ser notificado primero y recibir beneficios exclusivos.",
  },
]

export default function FAQSectionES() {
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
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h2>

          <p className="text-text-secondary text-lg">
            Aquí encontrarás respuestas a las preguntas más comunes sobre Rust Rocket. Si tienes otras preguntas, no
            dudes en contactarnos a través de Telegram.
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
        id="faq-schema-es"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData),
        }}
      />
    </section>
  )
}
