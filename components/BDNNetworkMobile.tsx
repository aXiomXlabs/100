"use client"

// Importiere den useMobile Hook am Anfang der Datei
import { useMobile } from "@/hooks/useMobile"

// Füge den Hook in der Komponente hinzu und optimiere die Animationen
export default function BDNNetworkMobile() {
  const isMobile = useMobile()

  // Reduziere die Anzahl der Animationen auf Mobilgeräten
  const animationDelay = isMobile ? 0.2 : 0.3
  const animationDuration = isMobile ? 0.4 : 0.6

  // Reduziere die Komplexität der Hintergrundeffekte auf Mobilgeräten
  const blurSize = isMobile ? "blur-xl" : "blur-2xl"

  // Rest der Komponente bleibt gleich, aber mit den angepassten Variablen
  // ...
}
