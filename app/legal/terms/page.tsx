import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Rust Rocket",
  description: "Terms and conditions for using Rust Rocket's services and website.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>

          <div className="mb-6 text-gray-400 text-sm">
            <p>Last Updated: May 21, 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-300">
                Welcome to Rust Rocket. These Terms of Service ("Terms") govern your access to and use of the Rust
                Rocket website and services, including any content, functionality, and services offered on or through
                rust-rocket.com (the "Service").
              </p>
              <p className="text-gray-300">
                Please read these Terms carefully before using our Service. By accessing or using the Service, you agree
                to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using our Service, you confirm that you accept these Terms and agree to comply with
                them. If you do not agree to these Terms, you must not access or use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">2. Changes to Terms</h2>
              <p className="text-gray-300">
                We may revise these Terms at any time by amending this page. Please check this page from time to time to
                take notice of any changes we made, as they are binding on you. Your continued use of the Service
                following the posting of revised Terms means that you accept and agree to the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">3. Accessing Our Service</h2>
              <p className="text-gray-300">
                We do not guarantee that our Service, or any content on it, will always be available or be
                uninterrupted. We may suspend, withdraw, discontinue or change all or any part of our Service without
                notice. We will not be liable to you if for any reason our Service is unavailable at any time or for any
                period.
              </p>
              <p className="text-gray-300">
                You are responsible for ensuring that all persons who access our Service through your internet
                connection are aware of these Terms and other applicable terms and conditions, and that they comply with
                them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">4. Your Account</h2>
              <p className="text-gray-300">
                If you create an account with us, you must provide information that is accurate, complete, and current
                at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
                termination of your account on our Service.
              </p>
              <p className="text-gray-300">
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password, whether your password is with our Service or a third-party
                service.
              </p>
              <p className="text-gray-300">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming
                aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">5. Intellectual Property Rights</h2>
              <p className="text-gray-300">
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Rust Rocket Labs and its licensors. The Service is protected by copyright, trademark, and
                other laws of both the United States and foreign countries. Our trademarks and trade dress may not be
                used in connection with any product or service without the prior written consent of Rust Rocket Labs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">6. User Content</h2>
              <p className="text-gray-300">
                Our Service may allow you to post, link, store, share and otherwise make available certain information,
                text, graphics, videos, or other material. You are responsible for the content that you post to the
                Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-gray-300">
                By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly
                display, reproduce, and distribute such content on and through the Service. You retain any and all of
                your rights to any content you submit, post or display on or through the Service and you are responsible
                for protecting those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">7. Links To Other Web Sites</h2>
              <p className="text-gray-300">
                Our Service may contain links to third-party websites or services that are not owned or controlled by
                Rust Rocket Labs.
              </p>
              <p className="text-gray-300">
                Rust Rocket Labs has no control over, and assumes no responsibility for, the content, privacy policies,
                or practices of any third-party websites or services. You further acknowledge and agree that Rust Rocket
                Labs shall not be responsible or liable, directly or indirectly, for any damage or loss caused or
                alleged to be caused by or in connection with the use of or reliance on any such content, goods, or
                services available on or through any such websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">8. Termination</h2>
              <p className="text-gray-300">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-300">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">9. Limitation of Liability</h2>
              <p className="text-gray-300">
                In no event shall Rust Rocket Labs, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct
                or content of any third party on the Service; (iii) any content obtained from the Service; and (iv)
                unauthorized access, use or alteration of your transmissions or content, whether based on warranty,
                contract, tort (including negligence) or any other legal theory, whether or not we have been informed of
                the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">10. Disclaimer</h2>
              <p className="text-gray-300">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                basis. The Service is provided without warranties of any kind, whether express or implied, including,
                but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                non-infringement or course of performance.
              </p>
              <p className="text-gray-300">
                Rust Rocket Labs, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service
                will function uninterrupted, secure or available at any particular time or location; b) any errors or
                defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the
                results of using the Service will meet your requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">11. Governing Law</h2>
              <p className="text-gray-300">
                These Terms shall be governed and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </p>
              <p className="text-gray-300">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">12. Changes to Service</h2>
              <p className="text-gray-300">
                We reserve the right to withdraw or amend our Service, and any service or material we provide via the
                Service, in our sole discretion without notice. We will not be liable if for any reason all or any part
                of the Service is unavailable at any time or for any period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">13. Contact Us</h2>
              <p className="text-gray-300">If you have any questions about these Terms, please contact us:</p>
              <div className="mt-4 text-gray-300">
                <p>
                  <strong>Rust Rocket Labs</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@rust-rocket.com" className="text-primary hover:underline">
                    legal@rust-rocket.com
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
