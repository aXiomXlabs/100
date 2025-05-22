import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Rust Rocket",
  description: "Privacy policy for Rust Rocket - the fastest Solana sniper bot with intelligent copy trading.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none prose-invert">
        <p>
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Rust Rocket. We respect your privacy and are committed to protecting your personal data. This
          privacy policy will inform you about how we look after your personal data when you visit our website and tell
          you about your privacy rights and how the law protects you.
        </p>

        <h2>2. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
          </li>
          <li>
            <strong>Contact Data</strong> includes email address.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating system and platform, and other
            technology on the devices you use to access this website.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use our website and services.
          </li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances:
        </p>
        <ul>
          <li>To register you as a new customer.</li>
          <li>To process and deliver your order.</li>
          <li>To manage our relationship with you.</li>
          <li>To improve our website, products/services, marketing or customer relationships.</li>
          <li>To recommend products or services which may be of interest to you.</li>
        </ul>

        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
          <br />
          <a href="mailto:privacy@rust-rocket.com" className="text-green-500 hover:text-green-400">
            privacy@rust-rocket.com
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
