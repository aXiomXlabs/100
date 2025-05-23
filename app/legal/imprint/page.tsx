import type { Metadata } from "next"
import Link from "next/link"
import { constructMetadata } from "@/lib/seo"

export const metadata: Metadata = constructMetadata({
  title: "Legal Notice | Rust Rocket",
  description: "Legal information about Rust Rocket and our services.",
  slug: "legal/imprint",
})

export default function ImprintPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-500">Legal Notice</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Service Provider</h2>
          <p className="mb-2 text-gray-300">Rust Rocket</p>
          <p className="mb-2 text-gray-300">Solana Trading Bot Services</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Contact</h2>
          <p className="mb-2 text-gray-300">Email: contact@rust-rocket.com</p>
          <p className="mb-2 text-gray-300">
            Website:{" "}
            <Link href="/" className="text-green-500 hover:text-green-400 hover:underline">
              https://rust-rocket.com
            </Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Disclaimer</h2>

          <h3 className="text-lg font-medium mb-2 text-green-400">Liability for Content</h3>
          <p className="mb-4 text-gray-300">
            The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
            accuracy, completeness, or topicality. We are responsible for our own content on these web pages according
            to general laws. Please note that we are not obliged to monitor transmitted or saved information of third
            parties, or investigate circumstances pointing to illegal activity.
          </p>

          <h3 className="text-lg font-medium mb-2 text-green-400">Liability for Links</h3>
          <p className="mb-4 text-gray-300">
            Our website includes links to external third-party websites. We have no influence on the contents of those
            websites, therefore we cannot guarantee those contents. Providers or administrators of linked websites are
            always responsible for their own contents. The linked websites were checked for possible violations of law
            at the time of linking. Illegal contents were not detected at the time of linking. A permanent monitoring of
            linked websites cannot be imposed without reasonable indications of a violation of law. Upon notification of
            violations, we will remove such links immediately.
          </p>

          <h3 className="text-lg font-medium mb-2 text-green-400">Copyright</h3>
          <p className="mb-4 text-gray-300">
            Our web pages and their contents are subject to copyright law. Unless expressly permitted by law, every form
            of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the
            prior consent of the respective owner of the rights. Individual reproductions of a work are only allowed for
            private use. The materials from these pages are copyrighted and any unauthorized use may violate copyright
            laws.
          </p>

          <h3 className="text-lg font-medium mb-2 text-green-400">Trading Risks</h3>
          <p className="mb-4 text-gray-300">
            Trading cryptocurrencies involves substantial risk of loss. Past performance does not guarantee future
            results. You should carefully consider whether trading is suitable for you in light of your circumstances,
            knowledge, and financial resources. We do not provide investment advice or recommendations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Data Protection</h2>
          <p className="mb-2 text-gray-300">
            For information about how we handle your personal data, please see our{" "}
            <Link href="/legal/privacy" className="text-green-500 hover:text-green-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-green-400">Online Dispute Resolution</h2>
          <p className="mb-2 text-gray-300">
            The European Commission provides a platform for online dispute resolution (OS):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="text-gray-300">Our email address can be found above.</p>
        </section>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-green-500 hover:text-green-400 hover:underline">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
