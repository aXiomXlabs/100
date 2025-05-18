"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Rust Rocket Admin</h1>
          <nav className="flex gap-4">
            <Link href="/admin/campaigns">
              <Button variant="ghost">Kampagnen</Button>
            </Link>
            <Link href="/admin/waitlist">
              <Button variant="ghost">Warteliste</Button>
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  )
}

function LogoutButton() {
  const supabase = createClientSupabaseClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Abmelden
    </Button>
  )
}
