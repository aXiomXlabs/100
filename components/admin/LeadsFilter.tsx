"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface LeadsFilterProps {
  sources: string[]
  currentSource: string
  currentSearch: string
}

export function LeadsFilter({ sources, currentSource, currentSearch }: LeadsFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(currentSearch)
  const [source, setSource] = useState(currentSource)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (source) params.set("source", source)

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const handleReset = () => {
    setSearch("")
    setSource("")

    startTransition(() => {
      router.push(pathname)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Suche
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="search"
              type="text"
              placeholder="E-Mail oder Telegram suchen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Quelle
          </label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger id="source">
              <SelectValue placeholder="Alle Quellen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Quellen</SelectItem>
              {sources.map((src) => (
                <SelectItem key={src} value={src}>
                  {src || "Direkt"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button type="submit" disabled={isPending}>
            Filter anwenden
          </Button>

          {(search || source) && (
            <Button type="button" variant="outline" onClick={handleReset} disabled={isPending}>
              <X className="h-4 w-4 mr-2" />
              Zurücksetzen
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
