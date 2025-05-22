import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  return new NextResponse(null, {
    status: 410,
    statusText: "Gone",
    headers: {
      "Content-Type": "text/html",
    },
  })
}
