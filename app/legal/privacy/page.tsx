import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | Rust Rocket",
  description:
    "Learn how Rust Rocket protects your personal trading data and privacy when using our advanced Solana sniper bot platform with comprehensive security measures.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-green-500">Privacy & Data Protection at Rust Rocket</h1>

      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-gray-400">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="bg-gray-800/50 p-4 rounded-lg my-6">
          <p className="text-sm text-gray-300">
            <strong>Summary:</strong> We respect your privacy and are committed to protecting your personal data. This
            policy explains how we collect, use, and safeguard your information when you use Rust Rocket's services.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">1. Introduction</h2>
        <p>
          Welcome to Rust Rocket ("we", "us", or "our"). We respect your privacy and are committed to protecting your
          personal data. This privacy policy informs you about how we look after your personal data when you visit our
          website, use our trading bot, or engage with any of our services, regardless of where you visit it from. It
          also tells you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">2. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-green-400">Identity Data</strong>: Includes first name, last name, username or
            similar identifier.
          </li>
          <li>
            <strong className="text-green-400">Contact Data</strong>: Includes email address and, if provided, telephone
            numbers.
          </li>
          <li>
            <strong className="text-green-400">Financial Data</strong>: We do not collect or store your private keys,
            seed phrases, or passwords. We only process public wallet addresses to facilitate transactions.
          </li>
          <li>
            <strong className="text-green-400">Transaction Data</strong>: Includes details about trading activities
            performed through our bot, including transaction hashes, timestamps, amounts, and blockchain addresses.
          </li>
          <li>
            <strong className="text-green-400">Technical Data</strong>: Includes internet protocol (IP) address, your
            login data, browser type and version, time zone setting and location, browser plug-in types and versions,
            operating system and platform, and other technology on the devices you use to access our services.
          </li>
          <li>
            <strong className="text-green-400">Usage Data</strong>: Includes information about how you use our website,
            products, and services, including bot settings, preferences, and interaction patterns.
          </li>
          <li>
            <strong className="text-green-400">Marketing and Communications Data</strong>: Includes your preferences in
            receiving marketing from us and our third parties and your communication preferences.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-green-400 mt-6">Special Categories of Personal Data</h3>
        <p>
          We do not collect any Special Categories of Personal Data about you (this includes details about your race or
          ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union
          membership, information about your health, and genetic and biometric data). Nor do we collect any information
          about criminal convictions and offenses.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">3. How We Collect Your Data</h2>
        <p>We use different methods to collect data from and about you including through:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-green-400">Direct interactions</strong>: You may give us your Identity, Contact, and
            Financial Data by filling in forms or by corresponding with us by email or otherwise.
          </li>
          <li>
            <strong className="text-green-400">Automated technologies or interactions</strong>: As you interact with our
            website or bot, we may automatically collect Technical Data about your equipment, browsing actions, and
            patterns.
          </li>
          <li>
            <strong className="text-green-400">Third parties or publicly available sources</strong>: We may receive
            personal data about you from various third parties and public sources, such as blockchain data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">4. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>
            Where it is necessary for our legitimate interests and your interests and fundamental rights do not override
            those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <p className="mt-4">Purposes for which we will use your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To register you as a new customer</li>
          <li>To provide and maintain our services</li>
          <li>To manage your relationship with us</li>
          <li>To enable you to use our trading bot</li>
          <li>To process and execute your trading instructions</li>
          <li>To improve our website, products/services, marketing, or customer relationships</li>
          <li>To recommend products or services which may be of interest to you</li>
          <li>To administer and protect our business and website</li>
          <li>To deliver relevant website content and advertisements to you</li>
          <li>
            To use data analytics to improve our website, products/services, marketing, customer relationships, and
            experiences
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">5. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
          used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal
          data to those employees, agents, contractors, and other third parties who have a business need to know. They
          will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
        </p>
        <p className="mt-4">
          We have put in place procedures to deal with any suspected personal data breach and will notify you and any
          applicable regulator of a breach where we are legally required to do so.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">6. Data Retention</h2>
        <p>
          We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
          collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or
          reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if
          we reasonably believe there is a prospect of litigation in respect to our relationship with you.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">7. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data.
          These include the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Right to withdraw consent</li>
        </ul>
        <p className="mt-4">
          If you wish to exercise any of the rights set out above, please contact us using the details provided below.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">8. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our website and hold certain
          information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>
        <p className="mt-4">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
          you do not accept cookies, you may not be able to use some portions of our website.
        </p>
        <p className="mt-4">
          For more information about the cookies we use, please see our{" "}
          <Link href="/legal/cookies" className="text-green-500 hover:text-green-400">
            Cookie Policy
          </Link>
          .
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">9. Third-Party Services</h2>
        <p>
          Our service may contain links to other websites, apps, or services that are not operated by us. If you click
          on a third-party link, you will be directed to that third party's site. We strongly advise you to review the
          Privacy Policy of every site you visit.
        </p>
        <p className="mt-4">
          We have no control over and assume no responsibility for the content, privacy policies, or practices of any
          third-party sites or services.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">10. Children's Privacy</h2>
        <p>
          Our services are not intended for use by children under the age of 18, and we do not knowingly collect
          personal data from children under 18. If we learn we have collected or received personal data from a child
          under 18 without verification of parental consent, we will delete that information.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">11. International Transfers</h2>
        <p>
          Your information, including personal data, may be transferred to — and maintained on — computers located
          outside of your state, province, country, or other governmental jurisdiction where the data protection laws
          may differ from those of your jurisdiction.
        </p>
        <p className="mt-4">
          If you are located outside the United States and choose to provide information to us, please note that we
          transfer the data, including personal data, to the United States and process it there.
        </p>
        <p className="mt-4">
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement
          to that transfer.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">12. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
        </p>
        <p className="mt-4">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">13. Blockchain Data</h2>
        <p>
          The nature of blockchain technology means that some of your transaction data will be publicly available. This
          includes transaction hashes, wallet addresses, timestamps, and amounts. This information is inherently public
          due to the transparent nature of blockchain technology and is not within our control.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">14. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-2">
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@rust-rocket.com" className="text-green-500 hover:text-green-400">
            privacy@rust-rocket.com
          </a>
        </p>

        <div className="mt-12 border-t border-gray-700 pt-6">
          <Link href="/" className="text-green-500 hover:text-green-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
