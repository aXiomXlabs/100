import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | Rust Rocket",
  description: "Learn about how Rust Rocket uses cookies and similar technologies on our website.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>

          <div className="mb-6 text-gray-400 text-sm">
            <p>Last Updated: May 21, 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-300">
                This Cookie Policy explains how Rust Rocket Labs ("we," "us," or "our") uses cookies and similar
                technologies on our website at{" "}
                <a href="https://rust-rocket.com" className="text-primary hover:underline">
                  rust-rocket.com
                </a>{" "}
                (the "Site").
              </p>
              <p className="text-gray-300">
                By using our Site, you consent to the use of cookies and similar technologies in accordance with this
                Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">What Are Cookies?</h2>
              <p className="text-gray-300">
                Cookies are small text files that are placed on your device when you visit a website. They are widely
                used to make websites work more efficiently and provide information to the website owners. Cookies can
                be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline,
                while session cookies are deleted as soon as you close your web browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">How We Use Cookies</h2>
              <p className="text-gray-300">We use cookies for various purposes, including:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>To enable certain functions of the Site</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery, including behavioral advertising</li>
                <li>To track UTM parameters for marketing campaigns</li>
              </ul>

              <h3 className="text-xl font-medium text-white mt-4">Types of Cookies We Use</h3>

              <h4 className="text-lg font-medium text-white mt-3">Essential Cookies</h4>
              <p className="text-gray-300">
                These cookies are necessary for the website to function properly and cannot be disabled in our systems.
                They are usually only set in response to actions made by you which amount to a request for services,
                such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to
                block or alert you about these cookies, but some parts of the site will not work if you do so.
              </p>
              <table className="min-w-full border border-gray-700 mt-2">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-2 text-left text-gray-300">Cookie Name</th>
                    <th className="px-4 py-2 text-left text-gray-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-gray-300">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">userConsent</td>
                    <td className="px-4 py-2 text-gray-300">Stores your cookie consent preferences</td>
                    <td className="px-4 py-2 text-gray-300">1 year</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">session</td>
                    <td className="px-4 py-2 text-gray-300">Maintains your session state</td>
                    <td className="px-4 py-2 text-gray-300">Session</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="text-lg font-medium text-white mt-3">Statistics Cookies</h4>
              <p className="text-gray-300">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                of our site. They help us to know which pages are the most and least popular and see how visitors move
                around the site. All information these cookies collect is aggregated and therefore anonymous.
              </p>
              <table className="min-w-full border border-gray-700 mt-2">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-2 text-left text-gray-300">Cookie Name</th>
                    <th className="px-4 py-2 text-left text-gray-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-gray-300">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">_ga</td>
                    <td className="px-4 py-2 text-gray-300">
                      Google Analytics - Registers a unique ID used to generate statistical data
                    </td>
                    <td className="px-4 py-2 text-gray-300">2 years</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">_ga_*</td>
                    <td className="px-4 py-2 text-gray-300">Google Analytics - Used to persist session state</td>
                    <td className="px-4 py-2 text-gray-300">2 years</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">_gid</td>
                    <td className="px-4 py-2 text-gray-300">
                      Google Analytics - Registers a unique ID used to generate statistical data
                    </td>
                    <td className="px-4 py-2 text-gray-300">24 hours</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="text-lg font-medium text-white mt-3">Marketing Cookies</h4>
              <p className="text-gray-300">
                These cookies may be set through our site by our advertising partners. They may be used by those
                companies to build a profile of your interests and show you relevant advertisements on other sites. They
                do not store directly personal information, but are based on uniquely identifying your browser and
                internet device.
              </p>
              <table className="min-w-full border border-gray-700 mt-2">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-2 text-left text-gray-300">Cookie Name</th>
                    <th className="px-4 py-2 text-left text-gray-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-gray-300">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">_fbp</td>
                    <td className="px-4 py-2 text-gray-300">Facebook Pixel - Used to track visits across websites</td>
                    <td className="px-4 py-2 text-gray-300">3 months</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-300">personalization_id</td>
                    <td className="px-4 py-2 text-gray-300">Twitter - Used for advertising purposes</td>
                    <td className="px-4 py-2 text-gray-300">2 years</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Third-Party Cookies</h2>
              <p className="text-gray-300">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                of the Site and deliver advertisements on and through the Site.
              </p>

              <h3 className="text-xl font-medium text-white mt-4">Google Analytics</h3>
              <p className="text-gray-300">
                We use Google Analytics to analyze the use of our website. Google Analytics gathers information about
                website use by means of cookies. The information gathered relating to our website is used to create
                reports about the use of our website. Google's privacy policy is available at:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://policies.google.com/privacy
                </a>
              </p>

              <h3 className="text-xl font-medium text-white mt-4">Facebook Pixel</h3>
              <p className="text-gray-300">
                We use Facebook Pixel to track conversions from Facebook ads, optimize ads, build targeted audiences for
                future ads, and remarket to people who have already taken some kind of action on our website. Facebook's
                privacy policy is available at:{" "}
                <a
                  href="https://www.facebook.com/policy.php"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.facebook.com/policy.php
                </a>
              </p>

              <h3 className="text-xl font-medium text-white mt-4">Twitter Pixel</h3>
              <p className="text-gray-300">
                We use Twitter Pixel to track conversions from Twitter ads, optimize ads, and build targeted audiences
                for future ads. Twitter's privacy policy is available at:{" "}
                <a
                  href="https://twitter.com/en/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://twitter.com/en/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Managing Cookies</h2>
              <p className="text-gray-300">
                You can manage your cookie preferences through our consent banner that appears when you first visit our
                Site. You can also change your preferences at any time by clicking the "Privacy Settings" link in the
                footer of our website.
              </p>
              <p className="text-gray-300">
                Most web browsers allow some control of most cookies through the browser settings. To find out more
                about cookies, including how to see what cookies have been set, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>

              <h3 className="text-xl font-medium text-white mt-4">How to Manage Cookies in Different Browsers</h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li>
                  <strong>Chrome:</strong>{" "}
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://support.google.com/chrome/answer/95647
                  </a>
                </li>
                <li>
                  <strong>Firefox:</strong>{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{" "}
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                  </a>
                </li>
                <li>
                  <strong>Edge:</strong>{" "}
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09
                  </a>
                </li>
              </ul>

              <p className="text-gray-300 mt-4">
                Please note that restricting cookies may impact the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Changes to This Cookie Policy</h2>
              <p className="text-gray-300">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                Cookie Policy on this page and updating the "Last Updated" date at the top of this page.
              </p>
              <p className="text-gray-300">
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy
                are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
              <p className="text-gray-300">If you have any questions about our Cookie Policy, please contact us:</p>
              <div className="mt-4 text-gray-300">
                <p>
                  <strong>Rust Rocket Labs</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@rust-rocket.com" className="text-primary hover:underline">
                    privacy@rust-rocket.com
                  </a>
                </p>
                <p>
                  Telegram:{" "}
                  <a
                    href="https://t.me/rustrocket"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @rustrocket
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
