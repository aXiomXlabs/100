import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Rust Rocket",
  description: "Terms of service for Rust Rocket - the fastest Solana sniper bot with intelligent copy trading.",
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none prose-invert">
        <p>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Rust Rocket. These terms and conditions outline the rules and regulations for the use of our
          website and services.
        </p>

        <h2>2. License to Use</h2>
        <p>
          Unless otherwise stated, Rust Rocket and/or its licensors own the intellectual property rights for all
          material on this website. All intellectual property rights are reserved.
        </p>

        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>Publishing any website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
          <li>Publicly performing and/or showing any website material</li>
          <li>Using this website in any way that is or may be damaging to this website</li>
          <li>Using this website in any way that impacts user access to this website</li>
          <li>
            Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website,
            or to any person or business entity
          </li>
        </ul>

        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall Rust Rocket, nor any of its officers, directors and employees, be held liable for anything
          arising out of or in any way connected with your use of this website.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
          <br />
          <a href="mailto:terms@rust-rocket.com" className="text-green-500 hover:text-green-400">
            terms@rust-rocket.com
          </a>
        </p>

        <div className="mt-8">
          <Link href="/" className="text-green-500 hover:text-green-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
