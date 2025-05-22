import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    // Supabase-Client erstellen
    const supabase = createServerSupabaseClient()

    // Test-E-Mail generieren (mit Zeitstempel, um Duplikate zu vermeiden)
    const testEmail = `test-${Date.now()}@example.com`

    // Test-Eintrag erstellen
    const testEntry = {
      email: testEmail,
      telegram_username: "test_user",
      referral_source: "api_test",
      utm_source: "test",
      utm_medium: "api",
      utm_campaign: "connection_test",
      consent_marketing: true,
      consent_terms: true,
      created_at: new Date().toISOString(),
    }

    // Eintrag in die Waitlist-Tabelle einfügen
    const { data: insertData, error: insertError } = await supabase.from("waitlist").insert(testEntry).select().single()

    if (insertError) {
      console.error("Fehler beim Einfügen des Test-Eintrags:", insertError)
      return NextResponse.json(
        {
          success: false,
          message: "Fehler beim Einfügen des Test-Eintrags",
          error: insertError,
        },
        { status: 500 },
      )
    }

    // Überprüfen, ob der Eintrag tatsächlich in der Datenbank ist
    const { data: checkData, error: checkError } = await supabase
      .from("waitlist")
      .select("*")
      .eq("email", testEmail)
      .single()

    if (checkError) {
      console.error("Fehler beim Überprüfen des Test-Eintrags:", checkError)
      return NextResponse.json(
        {
          success: false,
          message: "Eintrag wurde eingefügt, konnte aber nicht überprüft werden",
          error: checkError,
          insertedData: insertData,
        },
        { status: 500 },
      )
    }

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json({
      success: true,
      message: "Test-E-Mail wurde erfolgreich in Supabase gespeichert",
      testEmail,
      insertedData: insertData,
      retrievedData: checkData,
    })
  } catch (error) {
    console.error("Unerwarteter Fehler beim Testen der Supabase-Verbindung:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Unerwarteter Fehler beim Testen der Supabase-Verbindung",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
