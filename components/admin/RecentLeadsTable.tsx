import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"

interface Lead {
  id: string
  email: string
  telegram_username?: string
  referral_source?: string
  created_at: string
}

interface RecentLeadsTableProps {
  leads: Lead[]
}

export function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-Mail</TableHead>
          <TableHead>Telegram</TableHead>
          <TableHead>Quelle</TableHead>
          <TableHead>Angemeldet</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              Keine Leads gefunden
            </TableCell>
          </TableRow>
        ) : (
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
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
