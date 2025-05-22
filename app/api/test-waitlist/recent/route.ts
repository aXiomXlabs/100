import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Die neuesten 10 Einträge abrufen
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Fehler beim Abrufen der neuesten Einträge:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Fehler beim Abrufen der neuesten Einträge",
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      entries: data,
    })
  } catch (error) {
    console.error("Unerwarteter Fehler:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Unerwarteter Fehler beim Abrufen der neuesten Einträge",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
