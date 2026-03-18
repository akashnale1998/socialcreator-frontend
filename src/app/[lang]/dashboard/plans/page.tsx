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
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    duration: 'forever',
    description: 'Perfect for exploring AI possibilities.',
    features: [
      '10 AI generations per day',
      'Hook Generator',
      'Caption Generator',
      'Basic Content Ideas'
    ],
    restricted: [
      'No Script Analyzer',
      'No Viral Score',
      'No Trending Topics'
    ],
    icon: Zap,
    color: 'text-white/40',
    bg: 'bg-white/5'
  },
  {
    id: 'creator',
    name: 'Creator Plan',
    price: '$10',
    duration: 'per month',
    description: 'For consistent creators growing their brand.',
    features: [
      '500 AI generations per month',
      'Hook Generator',
      'Caption Generator',
      'Script Analyzer',
      'Content Ideas',
      'Trending Topics',
      'Standard Support'
    ],
    highlight: true,
    icon: Sparkles,
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    price: '$25',
    duration: 'per month',
    description: 'Advanced tools for professional results.',
    features: [
      '2000 AI generations per month',
      'All Creator plan features',
      'Viral Score Analysis',
      'Advanced Script Analyzer',
      'Content Planner',
      'Priority AI generation'
    ],
    icon: Rocket,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  }
];

export default function PlansPage() {
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  const { data: userData } = useSelector((state: RootState) => state.me);
  const [loadingPlan, setLoadingPlan] = React.useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const currentPlan = statsData?.plan || 'free';

  const handlePayment = (planId: string) => {
    if (planId === 'free') return;

    setLoadingPlan(planId);

    const amount = planId === 'creator' ? 299 : 799;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R9W5yfeDfhmfh7", // Fallback to placeholder if not set
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "SocialCreator AI",
      description: `Upgrade to ${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
      handler: function (response: any) {
        setLoadingPlan(null);
        setPaymentSuccess(true);
        console.log("Razorpay Payment ID:", response.razorpay_payment_id);
      },
      prefill: {
        name: userData?.name || "",
        email: userData?.email || "",
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
            Payment successful! Your plan will be activated shortly.
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`relative h-full flex flex-col p-8 border-white/5 transition-all hover:border-white/20 ${plan.highlight ? 'ring-2 ring-primary shadow-2xl shadow-primary/10' : ''}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-6`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.duration}</span>
                </div>
                <p className="text-white/40 text-sm mt-4 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Everything in {plan.id}:</p>
                  {plan.features.map(feature => (
                    <div key={feature} className="flex gap-3 text-sm font-medium items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <span className="text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.restricted && (
                  <div className="space-y-3 pt-4 opacity-30">
                    {plan.restricted.map(r => (
                      <div key={r} className="flex gap-3 text-sm font-medium items-start line-through">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5" />
                        <span className="text-white/40">{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-10">
                <Button
                  variant={plan.highlight ? 'primary' : 'glass'}
                  className="w-full h-12 text-sm font-bold shadow-lg"
                  disabled={currentPlan === plan.id}
                  isLoading={loadingPlan === plan.id}
                  onClick={() => handlePayment(plan.id)}
                >
                  {currentPlan === plan.id ? 'Current Plan' : `Upgrade to ${plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}`}
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
