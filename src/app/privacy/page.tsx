import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SocialCreator AI - Data Collection and Security',
  description: 'Understand how SocialCreator AI collects, uses, and secures your data. Read our comprehensive privacy policy regarding AI content prompts, usage analytics, and third-party services.',
  keywords: 'Privacy Policy, SocialCreator AI privacy, data security, AI content privacy, Razorpay payment security, SaaS privacy policy',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 14, 2026";

  return (
    <div className="min-h-screen bg-[#030014] text-gray-300 selection:bg-primary/30 font-sans">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <header className="mb-10 text-center border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
          </header>

          <div className="space-y-8 prose prose-invert max-w-none text-gray-300 leading-relaxed">
            
            <section id="introduction">
              <p>
                At SocialCreator AI ("we," "our," or "us"), we are committed to protecting your privacy and ensuring that your personal information is handled in a safe, transparent, and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, use our SaaS platform, or interact with our AI content generation services (collectively, the "Service").
              </p>
              <p className="mt-4">
                By accessing or using SocialCreator AI, you agree to the collection and use of information in accordance with this Privacy Policy. This policy is designed to comply with applicable international privacy standards, including providing transparency regarding the processing of data entered into our generative AI models.
              </p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>
                In order to provide and continuously improve our advanced AI capabilities, we collect several different types of information from and about our users. This includes:
              </p>
              
              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">1.1 Personal and Account Information</h3>
              <p>
                When you register for an account, subscribe to a plan, or contact our support team, we may collect identifiable information such as your name, email address, password (securely hashed), and billing address. This core information is necessary to uniquely identify you and provide access to the platform.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">1.2 Content Prompts and Generated Outputs</h3>
              <p>
                As a generative AI platform, our core functionality relies on your inputs. We collect the conversational prompts, brand descriptions, scripts, and parameters you explicitly submit to tools like our Instagram Caption Generator, Viral Hook Generator, and Script Generator. We also maintain a history of the AI-generated outputs strictly to populate your user dashboard history and tracking.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">1.3 Financial and Payment Information</h3>
              <p>
                When you initiate a transaction or subscribe to a premium plan, we collect necessary transaction details. However, <strong>we do not store your full credit card number or bank account details on our servers</strong>. All payment processing is securely handled by our third-party payment partner, Razorpay.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">1.4 Automatically Collected Usage Analytics</h3>
              <p>
                When you access the Service, we automatically collect certain telemetry data. This includes your IP address, browser type and version, operating system, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data. We also track feature usage to understand which tools (e.g., Reel Viral Score Analyzer vs. Hashtag Generator) are most valuable to our creators.
              </p>
            </section>

            <section id="information-usage">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use the Information</h2>
              <p>
                We use the collected data for various operational, analytical, and developmental purposes, including:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-gray-200">Providing the Service:</strong> To create and manage your account, execute your AI prompts, deliver generated content, and manage your credit balance.</li>
                <li><strong className="text-gray-200">Processing Payments:</strong> To securely process subscriptions and credit purchases through our payment gateway.</li>
                <li><strong className="text-gray-200">Service Improvement:</strong> To analyze usage patterns and telemetry data in order to improve user experience, debug issues, and optimize our platform’s UI/UX.</li>
                <li><strong className="text-gray-200">Communication:</strong> To send administrative notices, transactional emails, invoices, password resets, and occasional promotional materials (which you can opt out of at any time).</li>
                <li><strong className="text-gray-200">AI Quality and Safety:</strong> We may review aggregate, anonymized prompts to ensure the AI models are not being used for prohibited activities outlined in our Terms and Conditions, and to improve the underlying model's contextual accuracy.</li>
              </ul>
            </section>

            <section id="cookies-tracking">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies (such as web beacons, tags, and scripts) to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept essential cookies, you may not be able to use some portions of our Service seamlessly, particularly the authenticated dashboard sessions. We utilize both Session Cookies (which expire when you close your browser) and Persistent Cookies (which remain on your device until deleted) to provide a tailored experience.
              </p>
            </section>

            <section id="third-party-services">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services and Data Processors</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              
              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">4.1 Analytics Providers</h3>
              <p>
                We may use third-party Service Providers, such as Google Analytics, to monitor and analyze the use of our Service. These tools collect device and usage intelligence that helps us understand user acquisition and feature retention.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">4.2 Payment Gateway: Razorpay</h3>
              <p>
                All financial transactions made in connection with the Service are processed by our secure payment partner, <strong>Razorpay</strong>. When you subscribe or purchase credits, your payment details (e.g., credit card number) are provided directly to Razorpay, whose use of your personal information is governed by their Privacy Policy. Razorpay adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">4.3 AI Model Providers</h3>
              <p>
                To generate the high-quality outputs you request, we route your specific prompts to advanced third-party LLM providers (e.g., Google or OpenAI) via their secure APIs. We do not explicitly pass your PII (like your email or name) to these providers alongside your prompts unless you specifically included such information in the prompt text yourself.
              </p>
            </section>

            <section id="data-security">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
              <p>
                The security of your data is paramount to us. We implement commercially acceptable security procedures and practices appropriate to the nature of the information we store, in order to protect it from unauthorized access, destruction, use, modification, or disclosure.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>All data transferred between your browser and our servers is encrypted using industry-standard TLS (Transport Layer Security).</li>
                <li>Your account password is symmetrically hashed and salted; meaning we cannot see your plaintext password.</li>
                <li>Our databases are restricted behind virtual private clouds and stringent firewall configurations, accessible only by authorized personnel.</li>
              </ul>
              <p className="mt-4">
                Despite these rigorous measures, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section id="data-retention">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
              <p>
                SocialCreator AI will retain your Personal Information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable tax/revenue laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p className="mt-4">
                Your generated content history (e.g., saved captions and scripts) is retained as long as your account is active, providing you continuous access to your past work. Upon account deletion, we will purge your specific generation history and PII within 30 days, retaining only anonymized, aggregated analytic data for statistical purposes.
              </p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your User Rights</h2>
              <p>
                Depending on your geographic location, you may have specific privacy rights regarding your personal data. We endeavor to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Right to Access:</strong> You can access your account profile to review the PII we have associated with you.</li>
                <li><strong>Right to Rectification:</strong> You are entitled to have your information corrected if it is inaccurate or incomplete.</li>
                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You have the right to request the deletion of your account and associated personal data at any time via your account settings dashboard or by contacting support.</li>
                <li><strong>Right to Data Portability:</strong> You have the right to be provided with a copy of the information we have on you in a structured, machine-readable, and commonly used format.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us using the information provided in the Contact section. Please note that we may ask you to verify your identity before responding to such requests.
              </p>
            </section>

            <section id="ai-disclaimer">
              <h2 className="text-2xl font-semibold text-white mb-4">8. AI Generated Content Disclaimer</h2>
              <p>
                Content generated using our AI tools is produced automatically based on user inputs. SocialCreator AI does not guarantee accuracy, originality, or suitability of generated content. Users are responsible for reviewing and using generated content appropriately.
              </p>
            </section>

            <section id="children-info">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Information</h2>
              <p>
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take immediate steps to remove that information from our servers.
              </p>
            </section>

            <section id="changes-to-policy">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to this Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time to reflect modifications in our tools, changes in regulatory environments, or operational requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
              </p>
              <p className="mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. By continuing to use SocialCreator AI after changes have been published, you confirm your acceptance of the revised policy.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Information</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy, your privacy rights, or our data handling practices, please do not hesitate to reach out to our dedicated Data Protection Officer (DPO).
              </p>
              <div className="mt-6 bg-[#0f0a1c] p-6 rounded-xl border border-white/5 inline-block">
                <p className="font-semibold text-white mb-2">SocialCreator AI Privacy Team</p>
                <p className="text-gray-400">Email: <a href="mailto:privacy@socialcreatorapp.com" className="text-purple-400 hover:text-pink-400 transition-colors">privacy@socialcreatorapp.com</a></p>
                <p className="text-gray-400 mt-2">Legal inquiries: <a href="mailto:legal@socialcreatorapp.com" className="text-purple-400 hover:text-pink-400 transition-colors">legal@socialcreatorapp.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
