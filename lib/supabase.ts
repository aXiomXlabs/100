import { createClient } from "@supabase/supabase-js"

// Singleton-Instanz für den Client-seitigen Supabase-Client
let supabaseClient: ReturnType<typeof createClient> | null = null

// Diese Funktion wird von der alten Codebase verwendet
export function createClientSupabaseClient() {
  return createSupabaseClient()
}

export function createSupabaseClient() {
  if (supabaseClient) return supabaseClient

  // Überprüfen, ob die Umgebungsvariablen vorhanden sind
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL oder Anon Key fehlt in den Umgebungsvariablen")
    throw new Error("Supabase-Konfiguration fehlt")
  }

  // Client erstellen
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return supabaseClient
}

// Server-seitiger Supabase-Client mit Service-Role-Key
let serverSupabaseClient: ReturnType<typeof createClient> | null = null

export function createServerSupabaseClient() {
  if (typeof window !== "undefined") {
    console.error("createServerSupabaseClient sollte nur auf dem Server verwendet werden")
    return createSupabaseClient() // Fallback auf den Client-seitigen Client
  }

  if (serverSupabaseClient) return serverSupabaseClient

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase URL oder Service Key fehlt in den Umgebungsvariablen")
    throw new Error("Supabase-Server-Konfiguration fehlt")
  }

  serverSupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return serverSupabaseClient
}
