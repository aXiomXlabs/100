import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Seite nicht gefunden</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#waitlist">Zur Warteliste</Link>
        </Button>
      </div>
    </div>
  )
}
