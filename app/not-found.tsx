import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
      <div className="text-6xl mb-6 animate-bounce">🔍</div>
      <h1 className="text-4xl font-bold mb-4 text-primary">404 - Page Not Found</h1>
      <p className="text-xl mb-8 max-w-md mx-auto text-gray-300">
        The page you're looking for doesn't exist or has been moved to a new location.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-md font-medium transition-all duration-300"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>
    </div>
  )
}
