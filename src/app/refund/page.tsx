import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund and Cancellation Policy | SocialCreator AI',
  description: 'Understand the refund and cancellation policies for SocialCreator AI subscriptions including our Creator, Pro, and Lifetime plans.',
  keywords: 'Refund Policy, Cancellation Policy, SocialCreator AI subscriptions, SaaS refund policy',
};

export default function RefundPolicyPage() {
  const lastUpdated = "March 14, 2026";

  return (
    <div className="min-h-screen bg-[#030014] text-gray-300 selection:bg-primary/30 font-sans">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle orange/red gradient for policies */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-900/10 blur-[150px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <header className="mb-10 text-center border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Refund and Cancellation Policy</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
          </header>

          <div className="space-y-8 prose prose-invert max-w-none text-gray-300 leading-relaxed">
            
            <section id="overview">
              <p className="text-lg">
                At SocialCreator AI, we strive to provide the best possible AI content generation experience for our creators. Because our platform is a digital Software-as-a-Service (SaaS) product that incurs significant computational costs via third-party AI models upon usage, we have established a strict, yet fair, refund and cancellation policy.
              </p>
              <p className="mt-4">
                By subscribing to any of our paid tiers (Creator Plan, Pro Plan, or Lifetime Plan) or purchasing standalone credits, you agree to the terms outlined in this policy.
              </p>
            </section>

            <section id="cancellation-policy">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Cancellation Policy</h2>
              <p>
                <strong>1.1 Subscription Flexibility.</strong> You have the complete freedom to cancel your subscription at any time. If you decide that SocialCreator AI is no longer the right fit for your needs, you can easily initiate a cancellation directly from your account dashboard under the "Billing" or "Subscription" settings.
              </p>
              <p className="mt-4">
                <strong>1.2 Post-Cancellation Access.</strong> If you cancel your recurring subscription (e.g., Creator Plan or Pro Plan) before the end of your current billing cycle, your cancellation will take effect immediately regarding future charges. However, you will retain full access to all premium features and your remaining credit balance until the end of your current paid billing period.
              </p>
              <p className="mt-4">
                <strong>1.3 No Prorated Refunds.</strong> Canceling a subscription prevents future renewals. It does not automatically grant a prorated refund for the remainder of the current billing cycle.
              </p>
            </section>

            <section id="refund-eligibility">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility for Refunds</h2>
              <p>
                Due to the immediate digital nature of our service and the hard costs associated with generative AI processing, refunds are subject to strict limitations. 
              </p>
              
              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">2.1 The "No-Usage" Condition</h3>
              <p>
                You may be eligible for a full refund on your most recent subscription charge <strong>ONLY IF</strong> you submit a refund request within <strong>seventy-two (72) hours</strong> of the purchase date AND you have <strong>not used any AI generation credits</strong> during that period. 
              </p>
              <p className="mt-4 text-purple-300">
                If our system logs show that you have utilized the platform to generate captions, scripts, video scores, or any other output utilizing your paid credits, your purchase becomes strictly non-refundable, regardless of the time elapsed since the transaction.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">2.2 Free Plan and Trials</h3>
              <p>
                We highly encourage all new users to utilize our Free Plan before upgrading to a paid tier. The Free Plan is designed to give you a comprehensive understanding of the tool's capabilities, quality, and interface, ensuring you can make an informed purchasing decision.
              </p>

              <h3 className="text-xl font-medium text-gray-200 mt-6 mb-2">2.3 Lifetime Plan exception</h3>
              <p>
                Purchases of the "Lifetime Plan" possess a slightly broader review window. You may request a refund within <strong>five (5) days</strong> of purchase, provided that your credit consumption does not exceed 5% of the initial allocation. Exceptions beyond this are solely at the discretion of the SocialCreator AI management team.
              </p>
            </section>

            <section id="non-refundable-items">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Non-Refundable Items</h2>
              <p>
                The following purchases are generally non-refundable:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Used AI generation credits</li>
                <li>Promotional or discounted plans</li>
                <li>One-time credit purchases after usage</li>
              </ul>
            </section>

            <section id="fraud-protection">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Fraud Protection</h2>
              <p>
                We reserve the right to refuse refunds if we detect abuse of the refund system, multiple refund requests, chargeback attempts, or fraudulent account activity.
              </p>
            </section>

            <section id="payment-processing">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Processing via Razorpay</h2>
              <p>
                All payments, subscriptions, and subsequent refunds are securely processed through our third-party gateway, <strong>Razorpay</strong>. 
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong className="text-gray-200">Processing Time:</strong> Once a refund request is approved by our team, it is immediately initiated on our end. However, Razorpay and your financial institution may take anywhere from <strong>5 to 10 business days</strong> to reflect the credited amount in your original method of payment.</li>
                <li><strong className="text-gray-200">Currency and Fees:</strong> Refunds will be issued in the original currency of the transaction. We do not refund any foreign exchange fees or differing conversion rates applied by your bank during the initial purchase or the refund process.</li>
              </ul>
            </section>

            <section id="service-interruptions">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Platform Outages or Bugs</h2>
              <p>
                In the rare event of a catastrophic platform failure, prolonged downtime, or an egregious bug that prevents the core functionality of the AI models from operating, SocialCreator AI will review compensation on a case-by-case basis. Compensation will typically be issued in the form of additional account credits or subscription extensions, rather than monetary refunds.
              </p>
            </section>

            <section id="request-process">
              <h2 className="text-2xl font-semibold text-white mb-4">7. How to Request a Refund</h2>
              <p>
                To request a refund under the eligible conditions outlined above, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-2">
                <li>Email our support team at <a href="mailto:billing@socialcreatorapp.com" className="text-purple-400 hover:text-pink-400">billing@socialcreatorapp.com</a>.</li>
                <li>Include the email address associated with your SocialCreator AI account.</li>
                <li>Include your Razorpay transaction ID or the invoice number.</li>
                <li>Provide a brief explanation of the reason for your refund request.</li>
              </ol>
              <p className="mt-4">
                Our support team aims to review and respond to all billing inquiries within 48 business hours.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
