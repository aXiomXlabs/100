import type { Metadata } from "next"
import Link from "next/link"
import { constructMetadata } from "@/lib/seo"

export const metadata: Metadata = constructMetadata({
  title: "Legal Notice | Axiom Enterprise GmbH",
  description: "Legal information about Axiom Enterprise GmbH, the company behind Rust Rocket.",
  slug: "legal/imprint",
})

export default function ImprintPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center">Legal Notice (Imprint)</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Company Information</h2>
          <p className="mb-2">Axiom Enterprise GmbH</p>
          <p className="mb-2">Registered in the Commercial Register</p>
          <p className="mb-2">Registration Court: [Court Name]</p>
          <p className="mb-2">Registration Number: [Number]</p>
          <p className="mb-2">VAT Identification Number: [VAT ID]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Represented by</h2>
          <p className="mb-2">Managing Director: [Name]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Contact</h2>
          <p className="mb-2">Email: contact@axiom-enterprise.com</p>
          <p className="mb-2">
            Website:{" "}
            <Link href="/" className="text-primary hover:underline">
              https://rust-rocket.com
            </Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Regulatory Authority</h2>
          <p className="mb-2">Responsible Regulatory Authority: [Authority Name]</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Disclaimer</h2>
          <h3 className="text-lg font-medium mb-2">Liability for Content</h3>
          <p className="mb-4">
            The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
            accuracy, completeness, or topicality. According to statutory provisions, we are furthermore responsible for
            our own content on these web pages. In this matter, please note that we are not obliged to monitor the
            transmitted or saved information of third parties, or investigate circumstances pointing to illegal
            activity. Our obligations to remove or block the use of information under generally applicable laws remain
            unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
          </p>

          <h3 className="text-lg font-medium mb-2">Liability for Links</h3>
          <p className="mb-4">
            Our offer includes links to external third-party websites. We have no influence on the contents of those
            websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites
            are always responsible for their own contents. The linked websites had been checked for possible violations
            of law at the time of the establishment of the link. Illegal contents were not detected at the time of the
            linking. A permanent monitoring of the contents of linked websites cannot be imposed without reasonable
            indications that there has been a violation of law. Upon notification of violations, we will remove such
            links immediately.
          </p>

          <h3 className="text-lg font-medium mb-2">Copyright</h3>
          <p className="mb-4">
            Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law,
            every form of utilizing, reproducing or processing works subject to copyright protection on our web pages
            requires the prior consent of the respective owner of the rights. Individual reproductions of a work are
            only allowed for private use. The materials from these pages are copyrighted and any unauthorized use may
            violate copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary">Online Dispute Resolution</h2>
          <p className="mb-2">
            The European Commission provides a platform for online dispute resolution (OS):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Our email address can be found in this imprint.</p>
        </section>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-primary hover:underline">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
