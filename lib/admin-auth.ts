import { createServerSupabaseClient } from "./supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Prüfe, ob der Benutzer ein Admin ist
  const { data: user, error } = await supabase.from("admin_users").select("*").eq("id", session.user.id).single()

  if (error || !user || !user.is_active) {
    redirect("/admin/login")
  }

  return user
}
