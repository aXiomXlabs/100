import { createServerSupabaseClient } from "@/lib/supabase"
import { LeadsTable } from "@/components/admin/LeadsTable"
import { LeadsFilter } from "@/components/admin/LeadsFilter"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 25
  const search = searchParams.search?.toString() || ""
  const source = searchParams.source?.toString() || ""
  const sortBy = searchParams.sortBy?.toString() || "created_at"
  const sortOrder = searchParams.sortOrder?.toString() || "desc"

  const supabase = createServerSupabaseClient()

  // Alle verfügbaren Quellen für Filter abrufen
  const { data: sources } = await supabase
    .from("waitlist")
    .select("referral_source")
    .not("referral_source", "is", null)
    .group("referral_source")

  const uniqueSources = sources?.map((item) => item.referral_source) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lead-Verwaltung</h1>
        <LeadsExportButton />
      </div>

      <LeadsFilter sources={uniqueSources} currentSource={source} currentSearch={search} />

      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable page={page} limit={limit} search={search} source={source} sortBy={sortBy} sortOrder={sortOrder} />
      </Suspense>
    </div>
  )
}

function LeadsTableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

function LeadsExportButton() {
  return (
    <form action="/api/admin/export-leads" method="GET">
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        CSV exportieren
      </button>
    </form>
  )
}
