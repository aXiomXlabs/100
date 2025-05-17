import { createServerSupabaseClient } from "@/lib/supabase"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

interface LeadsTableProps {
  page: number
  limit: number
  search: string
  source: string
  sortBy: string
  sortOrder: string
}

export async function LeadsTable({ page, limit, search, source, sortBy, sortOrder }: LeadsTableProps) {
  const supabase = createServerSupabaseClient()

  // Offset für Pagination berechnen
  const offset = (page - 1) * limit

  // Query aufbauen
  let query = supabase.from("waitlist").select("*", { count: "exact" })

  // Filter anwenden
  if (source) {
    query = query.eq("referral_source", source)
  }

  if (search) {
    query = query.or(`email.ilike.%${search}%,telegram_username.ilike.%${search}%`)
  }

  // Sortierung anwenden
  query = query.order(sortBy as any, { ascending: sortOrder === "asc" })

  // Pagination anwenden
  query = query.range(offset, offset + limit - 1)

  // Query ausführen
  const { data: leads, count, error } = await query

  if (error) {
    console.error("Fehler beim Abrufen der Leads:", error)
    return <div>Fehler beim Laden der Daten</div>
  }

  // Gesamtzahl der Seiten berechnen
  const totalPages = count ? Math.ceil(count / limit) : 0

  // Funktion zum Erstellen der Sortier-URL
  const getSortUrl = (column: string) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc"
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy: column,
      sortOrder: newSortOrder,
    })

    if (search) params.set("search", search)
    if (source) params.set("source", source)

    return `/admin/leads?${params.toString()}`
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Leads</h2>
          <div className="text-sm text-gray-500">{count} Einträge gefunden</div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Link href={getSortUrl("email")} className="flex items-center">
                    E-Mail
                    {sortBy === "email" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Link>
                </TableHead>
                <TableHead>
                  <Link href={getSortUrl("telegram_username")} className="flex items-center">
                    Telegram
                    {sortBy === "telegram_username" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Link>
                </TableHead>
                <TableHead>
                  <Link href={getSortUrl("referral_source")} className="flex items-center">
                    Quelle
                    {sortBy === "referral_source" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Link>
                </TableHead>
                <TableHead>
                  <Link href={getSortUrl("created_at")} className="flex items-center">
                    Angemeldet
                    {sortBy === "created_at" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Link>
                </TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads && leads.length > 0 ? (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.telegram_username || "-"}</TableCell>
                    <TableCell>{lead.referral_source || "Direkt"}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(lead.created_at), {
                        addSuffix: true,
                        locale: de,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DeleteLeadButton id={lead.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Keine Leads gefunden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/admin/leads?page=${page - 1}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}${search ? `&search=${search}` : ""}${source ? `&source=${source}` : ""}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logik für die Anzeige der Seitenzahlen
                  let pageNum = i + 1

                  if (totalPages > 5) {
                    if (page > 3 && page < totalPages - 1) {
                      pageNum = page - 2 + i
                    } else if (page >= totalPages - 1) {
                      pageNum = totalPages - 4 + i
                    }
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`/admin/leads?page=${pageNum}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}${search ? `&search=${search}` : ""}${source ? `&source=${source}` : ""}`}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/admin/leads?page=${page + 1}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}${search ? `&search=${search}` : ""}${source ? `&source=${source}` : ""}`}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
