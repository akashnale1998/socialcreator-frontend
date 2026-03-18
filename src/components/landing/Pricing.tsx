"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check } from 'lucide-react';

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    originalPrice: "₹0",
    description: "Perfect for trying SocialCreator AI tools before upgrading.",
    features: [
      "10 AI generations per day",
      "Hook Generator",
      "Caption Generator",
      "Basic Content Ideas"
    ],
    cta: "Start Free",
    variant: "outline"
  },
  {
    id: "creator",
    name: "Creator Plan",
    price: "₹299",
    originalPrice: "₹599",
    description: "For serious content creators",
    features: [
      "500 AI generations per month",
      "Hook Generator",
      "Caption Generator",
      "Script Analyzer",
      "Trending topics access",
      "Standard Support"
    ],
    cta: "Upgrade to Creator",
    variant: "primary",
    badge: "Limited Time Offer"
  },
  {
    id: "pro",
    name: "Pro Creator",
    price: "₹499",
    originalPrice: "₹999",
    description: "Best for serious creators who want to grow faster.",
    features: [
      "2000 AI generations per month",
      "Everything in Creator",
      "Viral Score Analysis",
      "Advanced Script Analyzer",
      "Priority AI queue",
      "Content Planner"
    ],
    cta: "Upgrade to Pro",
    variant: "glass",
    popular: true,
    badge: "Most Popular"
  },
  {
    id: "lifetime",
    name: "LIFETIME CREATOR PLAN",
    price: "₹4999",
    originalPrice: "₹14999",
    description: "One-time payment, lifetime access",
    features: [
      "Unlimited AI generations",
      "Everything in Pro",
      "Lifetime Updates",
      "All Future Features",
      "Premium Templates",
      "VIP Priority Support"
    ],
    cta: "Get Lifetime Access",
    variant: "primary",
    badge: "Best Value"
  }
];

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { trackEvent } from '@/lib/analytics';

export const Pricing = () => {
  const { data: userData } = useSelector((state: RootState) => state.me);
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const handlePayment = (planId: string) => {
    if (!userData) {
      window.location.href = '/signup';
      return;
    }

    if (planId === 'free') {
      window.location.href = '/dashboard';
      return;
    }

    trackEvent('upgrade_plan', 'Monetization', `Clicked Upgrade Plan: ${planId}`);
    setLoadingPlan(planId);

    const plan = plans.find(p => p.id === planId);
    const amount = parseInt(plan?.price.replace('₹', '') || '0');

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R9W5yfeDfhmfh7",
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "SocialCreator AI",
      description: `Purchase ${plan?.name}`,
      handler: async function (response: any) {
        try {
          if (planId === 'lifetime') {
            await axios.post(`${"https://socialcreator-backend.onrender.com"}/api/payment/purchase-lifetime`, {
              amount,
              paymentId: response.razorpay_payment_id
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
          } else {
            // Placeholder for other plans verification
            // In a real app, update plan on backend
          }

          setLoadingPlan(null);
          setPaymentSuccess(true);
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        } catch (err) {
          console.error("Payment verification failed:", err);
          setLoadingPlan(null);
        }
      },
      prefill: {
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
      },
      theme: {
        color: "#6D28D9",
      },
      modal: {
        ondismiss: function () {
          setLoadingPlan(null);
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center"
          >
            <p className="text-emerald-500 font-bold">
              Payment successful! Your {loadingPlan} Plan has been activated. Redirecting...
            </p>
          </motion.div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose the plan that's right for your creator journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary/50' : ''} ${plan.id === 'lifetime' ? 'bg-gradient-to-b from-primary/10 to-transparent border-primary/30' : ''}`}>
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${plan.id === 'lifetime' ? 'bg-amber-500 text-black' : 'bg-primary text-white'
                    }`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex flex-col gap-1">
                    {plan.originalPrice !== plan.price && (
                      <span className="text-sm text-white/40 line-through font-medium">{plan.originalPrice}</span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/40 text-sm">/{plan.id === 'lifetime' ? 'lifetime' : 'month'}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-white/50 text-sm">{plan.description}</p>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.variant as any}
                  className="w-full"
                  isLoading={loadingPlan === plan.id}
                  onClick={() => handlePayment(plan.id)}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-12 text-gray-400 font-medium text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>No credit card required for free plan</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>Secure payments via Razorpay</span>
          </div>
        </div>
      </div>
    </section>
  );
};
