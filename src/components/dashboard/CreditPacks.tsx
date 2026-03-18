"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Zap, Trophy, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const packs = [
  { id: 'starter', name: 'Starter Pack', credits: 50, price: '₹99', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'creator', name: 'Creator Pack', credits: 200, price: '₹299', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'pro', name: 'Pro Pack', credits: 500, price: '₹599', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

export const CreditPacks = () => {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handlePurchase = (packId: string) => {
    setLoading(packId);
    const pack = packs.find(p => p.id === packId);
    const amount = parseInt(pack?.price.replace('₹', '') || '0');

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R9W5yfeDfhmfh7",
      amount: amount * 100,
      currency: "INR",
      name: "SocialCreator AI",
      description: `Purchase ${pack?.credits} Credits`,
      handler: async function (response: any) {
        try {
          await axios.post(`${"https://socialcreator-backend.onrender.com"}/api/payment/purchase-credits`, {
            credits: pack?.credits,
            amount: amount,
            paymentId: response.razorpay_payment_id
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });

          setLoading(null);
          window.location.reload(); // Simple way to refresh credits
        } catch (err) {
          console.error("Credit purchase failed:", err);
          setLoading(null);
        }
      },
      theme: { color: "#6D28D9" },
      modal: { ondismiss: () => setLoading(null) }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-lg">Buy More Credits</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packs.map((pack) => (
          <Card key={pack.id} className="p-4 border-white/5 bg-white/5 hover:border-primary/30 transition-all flex flex-col justify-between">
            <div>
              <div className={`w-10 h-10 rounded-lg ${pack.bg} flex items-center justify-center mb-3`}>
                <pack.icon className={`w-5 h-5 ${pack.color}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">{pack.name}</h4>
              <p className="text-2xl font-bold mb-1">{pack.credits}</p>
              <p className="text-xs text-white/40 mb-4">Credits for {pack.price}</p>
            </div>
            <Button
              size="sm"
              className="w-full text-xs h-9"
              variant="glass"
              isLoading={loading === pack.id}
              onClick={() => handlePurchase(pack.id)}
            >
              Buy Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
