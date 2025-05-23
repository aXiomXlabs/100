import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Rust Rocket",
  description:
    "Learn how Rust Rocket uses cookies and similar technologies to enhance your experience with our Solana trading bot and services.",
}

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-green-500">Cookie Policy</h1>

      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-gray-400">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="bg-gray-800/50 p-4 rounded-lg my-6">
          <p className="text-sm text-gray-300">
            <strong>Summary:</strong> We use cookies and similar technologies to enhance your browsing experience,
            personalize content, analyze our traffic, and better understand where our visitors are coming from.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They
          are widely used to make websites work more efficiently and provide information to the owners of the site.
        </p>
        <p className="mt-4">
          Cookies help us understand how you interact with our website, remember your preferences, and overall give you
          a more personalized web experience.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">2. Types of Cookies We Use</h2>
        <p>We use the following types of cookies on our website:</p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">2.1 Necessary Cookies</h3>
        <p>
          These cookies are essential for the website to function properly. They enable core functionality such as
          security, network management, and account access. You may disable these by changing your browser settings, but
          this may affect how the website functions.
        </p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">2.2 Functional Cookies</h3>
        <p>
          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us
          or by third-party providers whose services we have added to our pages. If you do not allow these cookies, then
          some or all of these services may not function properly.
        </p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">2.3 Analytics Cookies</h3>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of
          our site. They help us to know which pages are the most and least popular and see how visitors move around the
          site. All information these cookies collect is aggregated and therefore anonymous.
        </p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">2.4 Marketing Cookies</h3>
        <p>
          These cookies may be set through our site by our advertising partners. They may be used by those companies to
          build a profile of your interests and show you relevant adverts on other sites. They do not store directly
          personal information but are based on uniquely identifying your browser and internet device.
        </p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">2.5 Social Media Cookies</h3>
        <p>
          These cookies are set by a range of social media services that we have added to the site to enable you to
          share our content with your friends and networks. They are capable of tracking your browser across other sites
          and building up a profile of your interests. This may impact the content and messages you see on other
          websites you visit.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">3. Specific Cookies We Use</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-green-400">Name</th>
                <th className="px-4 py-2 text-left text-green-400">Purpose</th>
                <th className="px-4 py-2 text-left text-green-400">Duration</th>
                <th className="px-4 py-2 text-left text-green-400">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="px-4 py-2">_ga</td>
                <td className="px-4 py-2">Used by Google Analytics to distinguish users</td>
                <td className="px-4 py-2">2 years</td>
                <td className="px-4 py-2">Analytics</td>
              </tr>
              <tr>
                <td className="px-4 py-2">_gid</td>
                <td className="px-4 py-2">Used by Google Analytics to distinguish users</td>
                <td className="px-4 py-2">24 hours</td>
                <td className="px-4 py-2">Analytics</td>
              </tr>
              <tr>
                <td className="px-4 py-2">_gat</td>
                <td className="px-4 py-2">Used by Google Analytics to throttle request rate</td>
                <td className="px-4 py-2">1 minute</td>
                <td className="px-4 py-2">Analytics</td>
              </tr>
              <tr>
                <td className="px-4 py-2">cookieConsent</td>
                <td className="px-4 py-2">Stores your cookie consent preferences</td>
                <td className="px-4 py-2">1 year</td>
                <td className="px-4 py-2">Necessary</td>
              </tr>
              <tr>
                <td className="px-4 py-2">cookieConsents</td>
                <td className="px-4 py-2">Stores your specific cookie consent choices</td>
                <td className="px-4 py-2">1 year</td>
                <td className="px-4 py-2">Necessary</td>
              </tr>
              <tr>
                <td className="px-4 py-2">session</td>
                <td className="px-4 py-2">Maintains your session state</td>
                <td className="px-4 py-2">Session</td>
                <td className="px-4 py-2">Necessary</td>
              </tr>
              <tr>
                <td className="px-4 py-2">_fbp</td>
                <td className="px-4 py-2">Used by Facebook to deliver advertisements</td>
                <td className="px-4 py-2">3 months</td>
                <td className="px-4 py-2">Marketing</td>
              </tr>
              <tr>
                <td className="px-4 py-2">_twq</td>
                <td className="px-4 py-2">Used by Twitter for tracking and advertising</td>
                <td className="px-4 py-2">Session</td>
                <td className="px-4 py-2">Marketing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">4. How to Manage Cookies</h2>
        <p>
          Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or
          to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from
          version to version.
        </p>
        <p className="mt-4">
          You can also use our cookie consent banner to manage your preferences for the cookies we control directly.
        </p>

        <h3 className="text-xl font-semibold text-green-400 mt-6">Browser Cookie Settings</h3>
        <p>Here are links to cookie management instructions for common browsers:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">5. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the
          service, deliver advertisements on and through the service, and so on.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">6. What Happens If You Disable Cookies</h2>
        <p>
          If you choose to disable cookies, you may still use our website, but your ability to use some features or
          areas of our website may be limited. Some technical issues may also arise if you disable cookies.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">7. Other Tracking Technologies</h2>
        <p>
          Cookies are not the only way to recognize or track visitors to a website. We may use other, similar
          technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These
          are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited
          our website. This allows us, for example, to monitor the traffic patterns of users from one page within our
          website to another, to deliver or communicate with cookies, to understand whether you have come to our website
          from an online advertisement displayed on a third-party website, to improve site performance, and to measure
          the success of email marketing campaigns.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">8. Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie
          Policy on this page and updating the "Last updated" date at the top of this Cookie Policy.
        </p>
        <p className="mt-4">
          You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are
          effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-semibold text-green-400 mt-8">9. Contact Us</h2>
        <p>If you have any questions about our Cookie Policy, please contact us at:</p>
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
