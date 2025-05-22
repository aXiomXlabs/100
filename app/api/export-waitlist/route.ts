import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Einfache Authentifizierung über einen Query-Parameter (in Produktion solltest du eine bessere Auth-Lösung verwenden)
    const authToken = request.nextUrl.searchParams.get("token")
    if (authToken !== "export123") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Fehler beim Abrufen der Waitlist-Einträge:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // CSV-Header erstellen
    const headers = [
      "ID",
      "E-Mail",
      "Telegram",
      "Quelle",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Marketing-Einwilligung",
      "AGB-Einwilligung",
      "Erstellt am",
    ]

    // CSV-Zeilen erstellen
    const rows = data.map((entry) => [
      entry.id,
      entry.email,
      entry.telegram_username || "",
      entry.referral_source || "",
      entry.utm_source || "",
      entry.utm_medium || "",
      entry.utm_campaign || "",
      entry.consent_marketing ? "Ja" : "Nein",
      entry.consent_terms ? "Ja" : "Nein",
      new Date(entry.created_at).toLocaleString("de-DE"),
    ])

    // CSV-Inhalt erstellen
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // CSV-Datei zurückgeben
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="waitlist-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error: any) {
    console.error("Unerwarteter Fehler:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
