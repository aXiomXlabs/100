"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, BarChart, Settings, LogOut } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/leads", label: "Leads", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/analytics", label: "Analysen", icon: <BarChart className="w-5 h-5" /> },
    { href: "/admin/settings", label: "Einstellungen", icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Rust Rocket Admin</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  )
}
