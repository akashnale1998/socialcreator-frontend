"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Check,
  Zap,
  Sparkles,
  Rocket,
  ShieldCheck,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    originalPrice: "₹0",
    description: "Perfect for testing the waters",
    features: [
      "10 credits per day",
      "Caption Generator",
      "Hook Generator",
      "Hashtag Generator",
      "Basic Content Ideas",
      "Limited history access"
    ],
    cta: "Start Free",
    variant: "outline",
    icon: Zap,
    color: 'text-white/40',
    bg: 'bg-white/5'
  },
  {
    id: "creator",
    name: "Creator Plan",
    price: "₹299",
    originalPrice: "₹599",
    description: "For serious content creators",
    features: [
      "500 credits per month",
      "AI Full Post Generator",
      "Script Generator (2 credits)",
      "Title Generator",
      "Profile Analyzer (2 credits)",
      "Viral Hook Library",
      "Save generation history",
      "Faster AI response"
    ],
    cta: "Upgrade to Creator",
    variant: "primary",
    popular: true,
    badge: "Limited Time Offer",
    icon: Sparkles,
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    id: "pro",
    name: "Pro Creator",
    price: "₹499",
    originalPrice: "₹999",
    description: "For professional content creators",
    features: [
      "1500 credits per month",
      "Reel Viral Score Analyzer (3 credits)",
      "Script Analyzer",
      "Advanced Profile Growth",
      "Unlimited history",
      "Priority AI processing",
      "Everything in Creator"
    ],
    cta: "Upgrade to Pro",
    variant: "glass",
    badge: "Special 50% Off",
    icon: Rocket,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    id: "lifetime",
    name: "LIFETIME CREATOR",
    price: "₹4999",
    originalPrice: "₹14999",
    description: "One-time payment, lifetime access",
    features: [
      "2000 credits per month",
      "Lifetime Updates",
      "All Future Features",
      "VIP Priority Support",
      "Everything in Pro"
    ],
    cta: "Get Lifetime Access",
    variant: "primary",
    badge: "Best Value",
    icon: ShieldCheck,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  }
];

import axios from 'axios';

export default function PlansPage() {
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  const { data: userData } = useSelector((state: RootState) => state.me);
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const currentPlan = statsData?.plan || 'free';

  const handlePayment = (planId: string) => {
    if (planId === 'free') {
      window.location.href = '/dashboard';
      return;
    }

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
              headers: { Authorization: `Bearer ${localStorage.getItem('socialcreator_token')}` }
            });
          } else {
            // Placeholder for other plans verification
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
        name: userData?.data?.name || userData?.name || "",
        email: userData?.data?.email || userData?.email || "",
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
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      {paymentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center"
        >
          <p className="text-emerald-500 font-bold flex items-center justify-center gap-2">
            <ShieldCheck size={20} />
            Payment successful! Your {loadingPlan} Plan has been activated. Redirecting...
          </p>
        </motion.div>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose Your <span className="text-gradient">Creator Tier</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto">
          Scale your content production and unlock viral potential with our tiered AI generation plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`relative h-full flex flex-col p-8 border-white/5 transition-all hover:border-white/20 ${(plan as any).popular || plan.id === 'lifetime' ? 'ring-2 ring-primary shadow-2xl shadow-primary/10' : ''}`}>
              {(plan as any).badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ${plan.id === 'lifetime' ? 'bg-amber-500 text-black' : 'bg-primary text-white'} text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg`}>
                  {(plan as any).badge}
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-6`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold leading-tight">{plan.name}</h3>
                <div className="flex flex-col gap-1 mt-3">
                  {plan.originalPrice !== plan.price && (
                    <span className="text-xs text-white/40 line-through font-medium">{plan.originalPrice}</span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/40 text-sm">/{plan.id === 'lifetime' ? 'lifetime' : 'month'}</span>
                  </div>
                </div>
                <p className="text-white/40 text-sm mt-4 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Plan Highlights:</p>
                  {plan.features.map(feature => (
                    <div key={feature} className="flex gap-3 text-sm font-medium items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <span className="text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Button
                  variant={(plan as any).popular || plan.id === 'lifetime' ? 'primary' : 'glass'}
                  className="w-full h-12 text-sm font-bold shadow-lg"
                  disabled={currentPlan === plan.id}
                  isLoading={loadingPlan === plan.id}
                  onClick={() => handlePayment(plan.id)}
                >
                  {currentPlan === plan.id ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/5">
        {[
          { icon: ShieldCheck, label: 'Secure Payments', desc: 'Encrypted transactions' },
          { icon: Clock, label: 'Instant Access', desc: 'Unlock features immediately' },
          { icon: MessageCircle, label: '24/7 Support', desc: 'Expert help anytime' },
          { icon: ArrowRight, label: 'Scale Anytime', desc: 'Flexible plan migration' }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary transition-colors">
              {/* Fixed icons for the footer items */}
              {i === 0 && <ShieldCheck size={20} />}
              {i === 1 && <Clock size={20} />}
              {i === 2 && <MessageCircle size={20} />}
              {i === 3 && <ArrowRight size={20} />}
            </div>
            <div>
              <p className="text-sm font-bold">{item.label}</p>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
