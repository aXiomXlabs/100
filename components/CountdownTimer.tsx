"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [registeredUsers, setRegisteredUsers] = useState(0)
  const maxUsers = 1000 // Maximale Anzahl für den Fortschrittsbalken

  useEffect(() => {
    // Simuliere eine Startanzahl zwischen 580 und 620
    const initialCount = Math.floor(Math.random() * 41) + 580 // (0 to 40) + 580 = 580 to 620
    setRegisteredUsers(initialCount)

    // Simuliere gelegentliche neue Anmeldungen
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% Chance für eine neue Anmeldung
        setRegisteredUsers((prev) => Math.min(prev + 1, maxUsers))
      }
    }, 5000) // Alle 5 Sekunden prüfen

    return () => clearInterval(interval)
  }, [maxUsers]) // Added maxUsers to dependency array as it's used in the effect

  // Berechne den Fortschritt in Prozent
  const progressPercentage = (registeredUsers / maxUsers) * 100

  return (
    <div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-background-secondary">
      <div className="text-text-secondary mb-2">Bereits angemeldet:</div>
      <div className="text-3xl font-bold text-primary mb-3">{registeredUsers}</div>

      {/* Fortschrittsbalken */}
      <div className="w-full bg-background-tertiary rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="bg-primary h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fortschritt der Anmeldungen"
        ></div>
      </div>

      <div className="flex justify-between w-full text-xs text-text-secondary">
        <span>0</span>
        <span>Ziel: {maxUsers}</span>
      </div>

      {/* Zusätzliche Informationen */}
      <div className="mt-4 text-center text-sm text-text-secondary">
        <p>Sei einer der ersten {maxUsers} Nutzer und sichere dir exklusive Vorteile!</p>
      </div>
    </div>
  )
}
