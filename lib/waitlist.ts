import type { WaitlistEntry } from "@/types/waitlist"
import { createSupabaseClient } from "./supabase"

// Sichere Wrapper-Funktionen für localStorage (für UTM-Parameter)
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return null
  }
}

const setLocalStorageItem = (key: string, value: string): boolean => {
  if (typeof window === "undefined") return false
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error("Error writing to localStorage:", error)
    return false
  }
}

// Funktion zum Hinzufügen eines neuen Waitlist-Eintrags
export async function addToWaitlist(
  email: string,
  telegramUsername: string | null,
  utmParams: {
    source?: string
    medium?: string
    campaign?: string
    content?: string
    term?: string
  } = {},
  consent: {
    marketing: boolean
    terms: boolean
  } = { marketing: false, terms: true },
): Promise<{ success: boolean; message: string; data?: WaitlistEntry; error?: any }> {
  try {
    console.log("Starting waitlist submission for:", email)

    // Supabase-Client erstellen
    const supabase = createSupabaseClient()
    console.log("Supabase client created")

    // Prüfen, ob die E-Mail bereits existiert
    console.log("Checking if email exists:", email)
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Fehler beim Prüfen des Nutzers:", checkError)
      return {
        success: false,
        message: "Datenbankfehler beim Prüfen der E-Mail",
        error: checkError,
      }
    }

    if (existingUser) {
      console.log("Email already exists:", email)
      return { success: false, message: "Diese E-Mail ist bereits auf unserer Warteliste" }
    }

    // Referral-Quelle erstellen
    let referralSource = utmParams.source || "direct"
    if (utmParams.medium || utmParams.campaign) {
      referralSource += ` (medium: ${utmParams.medium || "none"}, campaign: ${utmParams.campaign || "none"})`
    }

    // Neuen Eintrag erstellen - Nur Felder, die in der Tabelle existieren
    const newEntry = {
      email,
      telegram_username: telegramUsername,
      referral_source: referralSource,
      utm_source: utmParams.source || null,
      utm_medium: utmParams.medium || null,
      utm_campaign: utmParams.campaign || null,
      utm_content: utmParams.content || null,
      utm_term: utmParams.term || null,
      consent_marketing: consent.marketing,
      consent_terms: consent.terms,
    }

    console.log("Inserting new entry:", newEntry)

    // Einfügen ohne .select().single(), um Fehler zu vermeiden
    const { error: insertError } = await supabase.from("waitlist").insert(newEntry)

    if (insertError) {
      console.error("Fehler beim Einfügen des Waitlist-Eintrags:", insertError)
      return {
        success: false,
        message: "Fehler beim Speichern der Daten",
        error: insertError,
      }
    }

    // Separat den eingefügten Eintrag abrufen
    const { data: insertedData } = await supabase.from("waitlist").select("*").eq("email", email).maybeSingle()

    console.log("Successfully inserted entry:", insertedData)
    return {
      success: true,
      message: "Erfolgreich zur Warteliste hinzugefügt",
      data: insertedData as WaitlistEntry,
    }
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return {
      success: false,
      message: "Ein unerwarteter Fehler ist aufgetreten",
      error,
    }
  }
}

// Track UTM parameters in localStorage
export function trackUTMParameters(params: URLSearchParams) {
  if (typeof window === "undefined") return

  const utmParams = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_term: params.get("utm_term") || undefined,
    utm_content: params.get("utm_content") || undefined,
  }

  // Only save if at least one UTM parameter is present
  if (Object.values(utmParams).some((value) => value !== undefined)) {
    setLocalStorageItem("utm_params", JSON.stringify(utmParams))
  }
}

// Get stored UTM parameters
export function getUTMParameters() {
  if (typeof window === "undefined") return {}

  const storedParams = getLocalStorageItem("utm_params")
  return storedParams ? JSON.parse(storedParams) : {}
}
