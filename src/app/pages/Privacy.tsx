import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last updated: February 22, 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 space-y-8">
          {/* AdSense Required Section - GDPR Compliance */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm text-yellow-700">
              <strong>Consent:</strong> By using our website, you consent to our privacy policy and agree to its terms.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Hireme4u. We respect your privacy and are committed to protecting your personal
              data. This privacy policy will inform you about how we look after your personal data when
              you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Identity Data:</strong> name, username or similar identifier</li>
              <li><strong>Contact Data:</strong> email address and telephone numbers</li>
              <li><strong>Technical Data:</strong> internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types, operating system and platform</li>
              <li><strong>Usage Data:</strong> information about how you use our website, products and services</li>
              <li><strong>Marketing Data:</strong> your preferences in receiving marketing from us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We will only use your personal data when the law allows us to. Most commonly, we will use
              your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To provide you with news, special offers and general information about other services which we offer</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our website and hold
              certain information. Cookies are files with small amount of data which may include an
              anonymous unique identifier. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>We use the following cookies:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors</li>
              <li><strong>Functionality cookies:</strong> Recognize you when you return to our website</li>
              <li><strong>Targeting cookies:</strong> Record your visit to our website, pages visited and links followed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Google AdSense & Third-Party Advertising</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use Google AdSense to serve advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may opt out of personalized advertising by visiting Google's Ads Settings at:
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                www.google.com/settings/ads
              </a>
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-600">
                <strong>For EU users:</strong> We comply with GDPR and obtain consent before setting non-essential cookies.
                You can manage your cookie preferences at any time.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In
              addition, we limit access to your personal data to those employees, agents, contractors and
              other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may employ third-party companies and individuals to facilitate our service, provide the
              service on our behalf, or assist us in analyzing how our service is used. These third
              parties include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Google AdSense</strong> - for advertising (https://policies.google.com/technologies/ads)</li>
              <li><strong>Google Analytics</strong> - for website usage statistics</li>
              <li><strong>MongoDB Atlas</strong> - for database hosting</li>
              <li><strong>Vercel/Netlify</strong> - for website hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Legal Rights (GDPR & CCPA)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Under certain circumstances, you have rights under data protection laws in relation to your
              personal data, including the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Request access</strong> to your personal data</li>
              <li><strong>Request correction</strong> of your personal data</li>
              <li><strong>Request erasure</strong> of your personal data</li>
              <li><strong>Object to processing</strong> of your personal data</li>
              <li><strong>Request restriction</strong> of processing your personal data</li>
              <li><strong>Request transfer</strong> of your personal data</li>
              <li><strong>Right to withdraw consent</strong> at any time</li>
              <li><strong>Right to opt-out</strong> of sale of personal information (CCPA)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service does not address anyone under the age of 18 ("Children"). We do not knowingly collect
              personally identifiable information from anyone under the age of 18. If you are a parent or
              guardian and you are aware that your child has provided us with personal data, please
              contact us. If we become aware that we have collected personal data from children without
              verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We will only retain your personal data for as long as necessary to fulfill the purposes we
              collected it for, including for the purposes of satisfying any legal, accounting, or
              reporting requirements. When you apply for a job through our platform, we will retain your
              application data for a period of 12 months unless you request its deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information, including personal data, may be transferred to — and maintained on —
              computers located outside of your state, province, country or other governmental jurisdiction
              where the data protection laws may differ from those of your jurisdiction. By using our
              service, you consent to such transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date at the top
              of this Privacy Policy. You are advised to review this Privacy Policy periodically for any
              changes.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy, including requests to exercise your
              data protection rights, please contact us:
            </p>
            
            {/* Updated contact information with your details */}
            <div className="bg-blue-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">praveenmoraputala@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">+91 6300470930</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">Hyderabad, India</p>
                </div>
              </div>
            </div>

            {/* Additional contact methods */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">For Data Privacy Requests</h3>
                <p className="text-sm text-gray-600">Email: praveenmoraputala@gmail.com</p>
                <p className="text-sm text-gray-600">Subject: Data Privacy Request</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">For AdSense Inquiries</h3>
                <p className="text-sm text-gray-600">Email: praveenmoraputala@gmail.com</p>
                <p className="text-sm text-gray-600">Subject: AdSense Policy</p>
              </div>
            </div>
          </section>

          {/* Cookie Consent Notice - Required for AdSense in EU */}
          <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">🍪 Cookie Consent</p>
            <p>
              This website uses cookies to improve your experience, analyze site traffic, and serve
              personalized advertisements. By continuing to use our site, you consent to our use of cookies
              in accordance with this Privacy Policy. You can manage your cookie preferences in your
              browser settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}