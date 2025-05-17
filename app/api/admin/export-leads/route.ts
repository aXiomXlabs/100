import { createServerSupabaseClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    // Prüfen, ob der Benutzer Admin-Rechte hat
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).single()

    if (!userRole || userRole.role !== "admin") {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    // Alle Leads abrufen
    const { data: leads, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Fehler beim Abrufen der Leads:", error)
      return NextResponse.json({ error: "Fehler beim Abrufen der Daten" }, { status: 500 })
    }

    // CSV-Header erstellen
    const headers = ["ID", "E-Mail", "Telegram", "Quelle", "Erstellt am"]

    // CSV-Zeilen erstellen
    const rows = leads.map((lead) => [
      lead.id,
      lead.email,
      lead.telegram_username || "",
      lead.referral_source || "Direkt",
      new Date(lead.created_at).toLocaleString("de-DE"),
    ])

    // CSV-Inhalt erstellen
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    // Aktuelles Datum für den Dateinamen
    const date = new Date().toISOString().split("T")[0]

    // CSV-Datei zurückgeben
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-export-${date}.csv"`,
      },
    })
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return NextResponse.json({ error: "Ein unerwarteter Fehler ist aufgetreten" }, { status: 500 })
  }
}
