import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | SocialCreator AI',
  description: 'Terms and Conditions for SocialCreator AI. This agreement outlines the rules, guidelines, and legal requirements for using our AI content generation services.',
};

export default function TermsPage() {
  const lastUpdated = "March 14, 2026";

  return (
    <div className="min-h-screen bg-[#030014] text-gray-300 selection:bg-primary/30 font-sans">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <header className="mb-10 text-center border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
          </header>

          <div className="space-y-8 prose prose-invert max-w-none text-gray-300 leading-relaxed">

            <section id="introduction">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                Welcome to SocialCreator AI ("we," "our," "us," or the "Platform"). By accessing, browsing, registering for, or using our website, services, applications, and tools, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms" or "Agreement"), as well as our Privacy Policy. If you do not agree to these Terms, you must not access or use our services.
              </p>
              <p className="mt-4">
                This Agreement applies to all visitors, users, and others who access the service ("Users"). If you are entering into this Agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these Terms, in which case the terms "you" or "your" shall refer to such entity.
              </p>
            </section>

            <section id="services">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>
                SocialCreator AI provides an artificial intelligence-powered software-as-a-service (SaaS) platform designed specifically for content creators, marketers, and agencies. Our core services include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                <li><strong className="text-gray-200">Instagram Caption Generator:</strong> AI-driven generation of platform-optimized captions.</li>
                <li><strong className="text-gray-200">Viral Hook Generator:</strong> Creation of attention-grabbing textual or spoken hooks for short-form video content.</li>
                <li><strong className="text-gray-200">Reel Viral Score Analyzer:</strong> Predictive analytics on the potential engagement of video scripts or concepts.</li>
                <li><strong className="text-gray-200">Script Generator:</strong> End-to-end video script generation based on user prompts and criteria.</li>
                <li><strong className="text-gray-200">Hashtag Generator:</strong> Discovery and curation of niche-relevant and trending hashtags.</li>
                <li><strong className="text-gray-200">Content Ideas Generator:</strong> Brainstorming conceptual avenues tailored to a creator's audience.</li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue the Service, or any part thereof, at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section id="accounts">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts and Registration</h2>
              <p>
                <strong>3.1 Minimum Age Requirement.</strong> You must be at least 18 years old to use SocialCreator AI. By creating an account, you confirm that you meet this age requirement.
              </p>
              <p className="mt-4">
                <strong>3.2 Account Registration.</strong> To access certain features of the Service, you must register for an account. By creating an account, you agree to:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2">
                <li>Provide accurate, current, and complete information during the registration process.</li>
                <li>Maintain and promptly update such information to keep it accurate, current, and complete.</li>
                <li>Maintain the absolute security and confidentiality of your password and account identifiers.</li>
                <li>Accept all responsibility for any and all activities that occur under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account or any other breach of security.</li>
              </ol>
              <p className="mt-4">
                We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion, particularly if we believe that user conduct violates applicable law or is harmful to our interests. We also reserve the right to suspend or terminate accounts that violate our policies or attempt to misuse the platform, including abuse of the credit system.
              </p>
            </section>

            <section id="subscriptions-payments">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Subscriptions, Payments, and Billing</h2>
              <p>
                <strong>4.1 Subscription Plans.</strong> SocialCreator AI offers various subscription tiers and one-time pricing models. You agree to pay all applicable fees associated with the subscription plan you select. All fees are non-cancelable and non-refundable, except as explicitly stated in our Refund Policy.
              </p>
              <p className="mt-4">
                <strong>4.2 Processing via Razorpay.</strong> We utilize <strong>Razorpay</strong> as our primary third-party payment gateway to ensure secure and authorized transactions. By making a purchase, you agree to Razorpay’s terms of service and privacy policy. SocialCreator AI does not directly store, process, or maintain your full credit card information or banking details on our servers; all such sensitive data is handled securely by Razorpay.
              </p>
              <p className="mt-4">
                <strong>4.3 Automatic Renewal.</strong> Unless you cancel your subscription before the end of the applicable billing cycle, your subscription will automatically renew. You authorize Razorpay and SocialCreator AI to collect the then-applicable renewal fee and any applicable taxes using the payment mechanism we have on record for you.
              </p>
              <p className="mt-4">
                <strong>4.4 Failed Payments.</strong> If a subscription payment fails, we may suspend access to premium features until the payment is successfully processed.
              </p>
              <p className="mt-4">
                <strong>4.5 Taxes.</strong> You are responsible for paying all taxes associated with your purchases hereunder. If SocialCreator AI has the legal obligation to pay or collect taxes for which you are responsible, the appropriate amount shall be invoiced to and paid by you, unless you provide us with a valid tax exemption certificate.
              </p>
            </section>

            <section id="credit-system">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Credit-Based Usage System</h2>
              <p>
                SocialCreator AI operates on a credit-based usage system to govern the consumption of computational resources, including generation of captions, scripts, video scores, and other AI outputs.
              </p>
              <p className="mt-4">
                <strong>5.1 Credit Allocation.</strong> Your account will be provisioned with a specific number of credits per billing cycle, depending on your subscription tier. Additional credits may be purchased separately.
              </p>
              <p className="mt-4">
                <strong>5.2 Credit Consumption.</strong> Different tools consume different amounts of credits per invocation (e.g., generating a full 60-second video script may consume more credits than generating a single Instagram caption). We reserve the right to adjust the credit cost of specific tools at our discretion with reasonable notice.
              </p>
              <p className="mt-4">
                <strong>5.3 Rollover Policy.</strong> Unused credits at the end of a billing cycle may or may not roll over, depending strictly on the specific terms outlined in your chosen subscription plan at the time of purchase.
              </p>
            </section>

            <section id="prohibited-usage">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Usage and Conduct</h2>
              <p>
                You agree not to use the Service in any manner that is unlawful or harms SocialCreator AI, its service providers, its suppliers, or any other user. Specifically, you agree NOT to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Generate content that is defamatory, obscene, pornographic, vulgar, or offensive.</li>
                <li>Generate content that promotes discrimination, bigotry, racism, hatred, harassment, or harm against any individual or group.</li>
                <li>Generate content that promotes illegal or harmful activities or substances.</li>
                <li>Generate content that misappropriates or infringes upon any third party's intellectual property rights or rights to privacy or publicity.</li>
                <li>Use the Service for political campaigning or generating deliberately misleading information (deepfakes, fake news, or disinformation campaigns).</li>
                <li>Attempt to reverse engineer, decompile, hack, disable, interfere with, disassemble, modify, copy, translate, or disrupt the features, functionality, and security of the Service.</li>
                <li>Deploy automated scripts, bots, spiders, or scrapers to access the Service or extract data in an unauthorized manner.</li>
                <li>Attempt to circumvent the credit-based system or manipulate the billing mechanisms.</li>
              </ul>
              <p className="mt-4 text-red-400">
                Violation of these rules will result in immediate termination of your account without refund, and potential legal action.
              </p>
            </section>

            <section id="ai-disclaimer">
              <h2 className="text-2xl font-semibold text-white mb-4">7. AI-Generated Content Disclaimer</h2>
              <p>
                The outputs provided by SocialCreator AI are generated using advanced machine learning models (such as Large Language Models). While we strive for high quality, accuracy, and brand safety, you acknowledge that:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2">
                <li>SocialCreator AI uses artificial intelligence models to generate outputs. These outputs may occasionally contain inaccuracies or incomplete information.</li>
                <li>Users are responsible for reviewing and verifying generated content before use and before publishing it to any public platform.</li>
                <li>SocialCreator AI is not liable for any reputational damage, financial loss, or legal consequences resulting from the direct publication of unreviewed AI-generated content to social networks (e.g., Instagram, YouTube, TikTok).</li>
                <li>The "Reel Viral Score Analyzer" is a predictive tool based on heuristics and historical data. It does not guarantee virality, views, engagement metrics, or specific algorithmic performance on any third-party platform.</li>
              </ol>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property Rights</h2>
              <p>
                <strong>8.1 Platform IP.</strong> All rights, title, and interest in and to the Service (excluding Content provided by users or generated outputs) are and will remain the exclusive property of SocialCreator AI and its licensors. The Service is protected by copyright, trademark, and other laws of applicable jurisdictions. Nothing in the Terms gives you a right to use the SocialCreator AI name or any of the SocialCreator AI trademarks, logos, domain names, and other distinctive brand features.
              </p>
              <p className="mt-4">
                <strong>8.2 Your Inputs.</strong> You retain full ownership rights over the raw text prompts, ideas, brand guidelines, and other inputs you provide to the Service ("Inputs"). You grant us a limited, worldwide, non-exclusive license to use these Inputs strictly for the purpose of operating and providing the Service to you.
              </p>
              <p className="mt-4">
                <strong>8.3 Generated Outputs.</strong> Subject to your compliance with these Terms, SocialCreator AI assigns to you all its right, title, and interest in and to the specific text, scripts, captions, and outputs generated by the service based on your Inputs ("Outputs"). You may use the Outputs for any legal commercial or non-commercial purpose. However, due to the nature of generative AI, Outputs may not be unique across users, and you may not claim copyright infringement against other users who generate similar Outputs.
              </p>
            </section>

            <section id="limitation-liability">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="uppercase text-sm tracking-wider font-semibold text-gray-400 mb-2">Please read carefully</p>
              <p>
                To the maximum extent permitted by applicable law, in no event shall SocialCreator AI, its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this service.
              </p>
              <p className="mt-4">
                Under no circumstances will SocialCreator AI be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the service or your account or the information contained therein. To the maximum extent permitted by applicable law, SocialCreator AI assumes no liability or responsibility for any (I) errors, mistakes, or inaccuracies of content; (II) personal injury or property damage, of any nature whatsoever, resulting from your access to or use of our service.
              </p>
              <p className="mt-4">
                In no event shall our total liability to you for all damages, losses, or causes of action exceed the greater of the amount you have paid to us in the past three (3) months, or one hundred U.S. Dollars ($100).
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Termination of Service</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="mt-4">
                If you wish to terminate your account, you may simply discontinue using the Service or cancel your subscription through your account settings dashboard. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section id="refund-policy">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Refund Policy Reference</h2>
              <p>
                Our Refund Policy is structurally integrated into these Terms. By agreeing to these Terms, you acknowledge that due to the computational costs of generative AI, credits consumed cannot be refunded. Subscription payments are final unless compelled by local consumer protection laws. If you encounter a catastrophic failure of the Service, you must contact our support within 7 days of the billing incident for account review.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 15 days' notice prior to any new terms taking effect. Notice will be provided via email to the address registered on your account or via a prominent notification on our platform.
              </p>
              <p className="mt-4">
                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service and must cancel your account immediately.
              </p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law</h2>
              <p>
                These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes arising out of or relating to these Terms or the use of the Service shall be subject to the exclusive jurisdiction of the courts located in India.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
              <p>
                If you have any questions, concerns, or legal notices concerning these Terms and Conditions or the Service, please contact us at:
              </p>
              {/* <div className="mt-6 bg-[#0f0a1c] p-6 rounded-xl border border-white/5 inline-block">
                <p className="font-semibold text-white mb-2">SocialCreator AI Legal Department</p>
                <p className="text-gray-400">Email: <a href="mailto:legal@socialcreatorapp.com" className="text-purple-400 hover:text-pink-400 transition-colors">legal@socialcreatorapp.com</a></p>
                <p className="text-gray-400 mt-2">Support Inquiries: <a href="mailto:support@socialcreatorapp.com" className="text-purple-400 hover:text-pink-400 transition-colors">support@socialcreatorapp.com</a></p>
              </div> */}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
