import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Test connection by getting table info
    const { data: tableInfo, error: tableError } = await supabase.from("waitlist").select("*").limit(1)

    if (tableError) {
      console.error("Error accessing waitlist table:", tableError)
      return NextResponse.json(
        {
          success: false,
          message: "Error accessing waitlist table",
          error: tableError,
          env: {
            hasUrl: !!process.env.SUPABASE_URL,
            hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            url: process.env.SUPABASE_URL?.substring(0, 10) + "...",
          },
        },
        { status: 500 },
      )
    }

    // Test insertion with a dummy record
    const testEmail = `test-${Date.now()}@example.com`
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        email: testEmail,
        telegram_username: "test_user",
        referral_source: "test",
        consent_terms: true,
        created_at: new Date().toISOString(),
      })
      .select()

    if (insertError) {
      console.error("Error inserting test record:", insertError)
      return NextResponse.json(
        {
          success: false,
          message: "Error inserting test record",
          error: insertError,
          tableExists: !!tableInfo,
        },
        { status: 500 },
      )
    }

    // Clean up test record
    await supabase.from("waitlist").delete().eq("email", testEmail)

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      tableExists: !!tableInfo,
    })
  } catch (error) {
    console.error("Unexpected error testing Supabase:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected error testing Supabase",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
