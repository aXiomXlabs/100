import { createClientSupabaseClient } from "@/lib/supabase"
import type { WaitlistEntry, CampaignPerformance } from "@/types/waitlist"

// Sichere Wrapper-Funktionen für localStorage
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return null
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
): Promise<{ success: boolean; message: string; data?: WaitlistEntry }> {
  try {
    const supabase = createClientSupabaseClient()

    // Prüfen, ob die E-Mail bereits existiert
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Fehler beim Prüfen des Nutzers:", checkError)
      return { success: false, message: "Datenbankfehler beim Prüfen der E-Mail" }
    }

    if (existingUser) {
      return { success: false, message: "Diese E-Mail ist bereits auf unserer Warteliste" }
    }

    // Referral-Quelle erstellen
    let referralSource = utmParams.source || "direct"
    if (utmParams.medium || utmParams.campaign) {
      referralSource += ` (medium: ${utmParams.medium || "none"}, campaign: ${utmParams.campaign || "none"})`
    }

    // Transaktion-ID generieren
    const transactionId = `signup_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // Neuen Eintrag erstellen
    const newEntry = {
      email,
      telegram_username: telegramUsername,
      referral_source: referralSource,
      utm_source: utmParams.source || null,
      utm_medium: utmParams.medium || null,
      utm_campaign: utmParams.campaign || null,
      utm_content: utmParams.content || null,
      utm_term: utmParams.term || null,
      conversion_value: 10.0, // Standardwert für eine Anmeldung
      conversion_currency: "EUR",
      transaction_id: transactionId,
      created_at: new Date().toISOString(),
    }

    const { data, error: insertError } = await supabase.from("waitlist").insert(newEntry).select().single()

    if (insertError) {
      console.error("Fehler beim Einfügen des Waitlist-Eintrags:", insertError)
      return { success: false, message: "Fehler beim Speichern der Daten" }
    }

    return {
      success: true,
      message: "Erfolgreich zur Warteliste hinzugefügt",
      data: data as WaitlistEntry,
    }
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return { success: false, message: "Ein unerwarteter Fehler ist aufgetreten" }
  }
}

// Funktion zum Abrufen der Kampagnen-Performance (nur für Admin-Bereich)
export async function getCampaignPerformance(): Promise<CampaignPerformance[]> {
  try {
    const supabase = createClientSupabaseClient()

    const { data, error } = await supabase
      .from("campaign_performance")
      .select("*")
      .order("signups", { ascending: false })

    if (error) {
      console.error("Fehler beim Abrufen der Kampagnen-Performance:", error)
      return []
    }

    return data as CampaignPerformance[]
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return []
  }
}
