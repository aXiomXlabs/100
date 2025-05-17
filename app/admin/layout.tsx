import type React from "react"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Authentifizierung prüfen
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Wenn kein gültiger Admin-Benutzer, zur Login-Seite umleiten
  if (!session?.user?.email) {
    redirect("/admin/login")
  }

  // Prüfen, ob der Benutzer Admin-Rechte hat
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).single()

  if (!userRole || userRole.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">{children}</div>
      </div>
    </div>
  )
}
