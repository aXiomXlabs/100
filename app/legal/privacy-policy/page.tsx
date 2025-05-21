import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Rust Rocket",
  description: "Learn how Rust Rocket collects, uses, and protects your personal information.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>

          <div className="mb-6 text-gray-400 text-sm">
            <p>Last Updated: May 21, 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-300">
                At Rust Rocket Labs ("we," "us," or "our"), we are committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
                <a href="https://rust-rocket.com" className="text-primary hover:underline">
                  rust-rocket.com
                </a>{" "}
                (the "Site") or use our Solana trading bot services (collectively, the "Services").
              </p>
              <p className="text-gray-300">
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you
                have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not
                agree with our policies and practices, please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>

              <h3 className="text-xl font-medium text-white mt-4">Personal Information</h3>
              <p className="text-gray-300">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Register for our waitlist</li>
                <li>Sign up for our newsletter</li>
                <li>Contact us through our chat feature</li>
                <li>Submit a form on our website</li>
                <li>Create an account for our Services</li>
              </ul>
              <p className="text-gray-300">The personal information we may collect includes:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Email address</li>
                <li>Telegram username (optional)</li>
                <li>IP address</li>
                <li>Device information</li>
                <li>Usage data</li>
              </ul>

              <h3 className="text-xl font-medium text-white mt-4">Automatically Collected Information</h3>
              <p className="text-gray-300">
                When you visit our Site, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Referral source</li>
                <li>Time spent on pages</li>
                <li>Pages visited</li>
                <li>UTM parameters from marketing campaigns</li>
              </ul>
              <p className="text-gray-300">
                We collect this information using cookies, web beacons, and similar technologies. See our Cookie Policy
                section below for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
              <p className="text-gray-300">We use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Provide, maintain, and improve our Services</li>
                <li>Process and complete transactions</li>
                <li>Send administrative information, such as updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Protect against harmful, unauthorized, or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Cookie Policy</h2>
              <p className="text-gray-300">
                Our Site uses cookies and similar tracking technologies to collect information about your browsing
                activities. Cookies are small text files stored on your device that help us provide you with a better
                browsing experience.
              </p>

              <h3 className="text-xl font-medium text-white mt-4">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly
                  and cannot be disabled.
                </li>
                <li>
                  <strong>Statistics Cookies:</strong> These cookies help us understand how visitors interact with our
                  website by collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to
                  display relevant advertisements.
                </li>
              </ul>

              <h3 className="text-xl font-medium text-white mt-4">Third-Party Cookies</h3>
              <p className="text-gray-300">
                We use the following third-party services that may place cookies on your device:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>Google Analytics</li>
                <li>Google Tag Manager</li>
                <li>Facebook Pixel</li>
                <li>Twitter Pixel</li>
              </ul>

              <h3 className="text-xl font-medium text-white mt-4">Managing Cookies</h3>
              <p className="text-gray-300">
                You can manage your cookie preferences through our consent banner that appears when you first visit our
                Site. You can also change your preferences at any time by clicking the "Privacy Settings" link in the
                footer of our website.
              </p>
              <p className="text-gray-300">
                Most web browsers allow you to control cookies through their settings. To find out more about cookies,
                including how to see what cookies have been set and how to manage or delete them, visit{" "}
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Data Sharing and Disclosure</h2>
              <p className="text-gray-300">We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party vendors, service
                  providers, and other business partners who perform services on our behalf.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
                  portion of our assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                  in response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> We may disclose your information to protect our rights,
                  privacy, safety, or property, or that of our users or others.
                </li>
              </ul>
              <p className="text-gray-300">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your
                personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Your Privacy Rights</h2>
              <p className="text-gray-300">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-300">
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-300">
                To exercise any of these rights, please contact us using the information provided in the "Contact Us"
                section below.
              </p>

              <h3 className="text-xl font-medium text-white mt-4">California Privacy Rights</h3>
              <p className="text-gray-300">
                If you are a California resident, you have specific rights under the California Consumer Privacy Act
                (CCPA). For more information about your California privacy rights, please contact us.
              </p>

              <h3 className="text-xl font-medium text-white mt-4">European Privacy Rights</h3>
              <p className="text-gray-300">
                If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have certain
                rights under the General Data Protection Regulation (GDPR) and similar laws. For more information about
                your European privacy rights, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Children's Privacy</h2>
              <p className="text-gray-300">
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children under 18. If you are a parent or guardian and believe that your child has
                provided us with personal information, please contact us, and we will delete such information from our
                systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">International Data Transfers</h2>
              <p className="text-gray-300">
                Your information may be transferred to, and maintained on, computers located outside of your state,
                province, country, or other governmental jurisdiction where the data protection laws may differ from
                those in your jurisdiction. If you are located outside the United States and choose to provide
                information to us, please note that we transfer the information to the United States and process it
                there.
              </p>
              <p className="text-gray-300">
                When we transfer personal information from the EEA, UK, or Switzerland to the United States or other
                countries which have not been deemed to provide an adequate level of protection, we use standard
                contractual clauses or other appropriate safeguards to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are
                advised to review this Privacy Policy periodically for any changes.
              </p>
              <p className="text-gray-300">
                Your continued use of our Services after we post any modifications to the Privacy Policy will constitute
                your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact
                us at:
              </p>
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
