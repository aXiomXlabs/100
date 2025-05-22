import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, telegramUsername, utmParams, consent } = body

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return NextResponse.json({ success: false, message: "Database error" }, { status: 500 })
    }

    if (existingUser) {
      return NextResponse.json({ success: false, message: "This email is already on our waitlist" }, { status: 400 })
    }

    // Create referral source
    let referralSource = utmParams?.source || "direct"
    if (utmParams?.medium || utmParams?.campaign) {
      referralSource += ` (medium: ${utmParams?.medium || "none"}, campaign: ${utmParams?.campaign || "none"})`
    }

    // Generate transaction ID
    const transactionId = `signup_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // Create new entry
    const newEntry = {
      email,
      telegram_username: telegramUsername || null,
      referral_source: referralSource,
      utm_source: utmParams?.source || null,
      utm_medium: utmParams?.medium || null,
      utm_campaign: utmParams?.campaign || null,
      utm_content: utmParams?.content || null,
      utm_term: utmParams?.term || null,
      consent_marketing: consent?.marketing || false,
      consent_terms: consent?.terms || true,
      transaction_id: transactionId,
      ip_address: request.headers.get("x-forwarded-for") || request.ip || null,
      user_agent: request.headers.get("user-agent") || null,
      created_at: new Date().toISOString(),
    }

    const { data, error: insertError } = await supabase.from("waitlist").insert(newEntry).select().single()

    if (insertError) {
      console.error("Error inserting waitlist entry:", insertError)
      return NextResponse.json({ success: false, message: "Error saving data" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      data,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}
