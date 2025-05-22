import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export default function Gone() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-4xl font-bold mb-6">410 - Content Removed</h1>
        <p className="text-xl mb-8">
          The page you're looking for has been permanently removed and is no longer available.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  )
}

export async function GET(request: NextRequest) {
  return new NextResponse(null, {
    status: 410,
    statusText: "Gone",
    headers: {
      "Content-Type": "text/html",
    },
  })
}
