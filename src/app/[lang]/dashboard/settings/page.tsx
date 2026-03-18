"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Settings, 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Mail, 
  Camera,
  ExternalLink,
  Check
} from 'lucide-react';

export default function AccountSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="text-white/70" /> Account Settings
        </h1>
        <p className="text-white/40 mt-1">Manage your profile, subscription, and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs (Vertical) */}
        <div className="lg:col-span-1 space-y-1">
           {[
             { label: 'Profile', icon: User, active: true },
             { label: 'Subscription', icon: CreditCard, active: false },
             { label: 'Security', icon: Shield, active: false },
             { label: 'Notifications', icon: Bell, active: false },
           ].map((tab) => (
             <button
               key={tab.label}
               className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                 tab.active 
                   ? 'bg-primary/20 text-primary border border-primary/20 shadow-lg shadow-primary/10' 
                   : 'text-white/40 hover:bg-white/5 hover:text-white'
               }`}
             >
               <tab.icon size={18} />
               {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
           {/* Profile Section */}
           <Card className="space-y-8">
              <div className="flex items-center gap-6">
                 <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary">
                       <User size={40} />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg border-2 border-[#030014] group-hover:scale-110 transition-transform">
                       <Camera size={16} />
                    </button>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold">Alex Smith</h3>
                    <p className="text-sm text-white/40">Growth Marketer & Creator</p>
                    <div className="mt-2 flex items-center gap-4">
                       <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">UID: SC-9283</span>
                       <span className="px-2 py-0.5 rounded-md bg-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                          <Check size={10} /> Verified
                       </span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input label="Display Name" defaultValue="Alex Smith" />
                 <Input label="Email Address" defaultValue="alex@growth.studio" />
                 <div className="md:col-span-2">
                    <label className="text-sm font-medium text-white/70 block mb-2">Bio</label>
                    <textarea 
                       className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                       rows={4}
                       defaultValue="I'm a content creator focused on teaching tech skills to 500k subscribers."
                    />
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <Button className="px-8">Save Changes</Button>
              </div>
           </Card>

           {/* Subscription Summary */}
           <Card className="border-primary/20 bg-primary/5">
              <div className="flex items-start justify-between">
                 <div className="space-y-2">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                       <CreditCard className="text-primary" /> Pro Plan
                    </h3>
                    <p className="text-sm text-white/60">Your next billing cycle starts on April 12, 2026.</p>
                 </div>
                 <Button variant="glass" size="sm" className="gap-2">
                    Manager Billing <ExternalLink size={14} />
                 </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="p-4 rounded-xl glass border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Credits Used</p>
                    <p className="text-xl font-bold">1.2k <span className="text-xs text-white/20 font-medium">/ 5k</span></p>
                 </div>
                 <div className="p-4 rounded-xl glass border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Current Price</p>
                    <p className="text-xl font-bold">$29 <span className="text-xs text-white/20 font-medium">/ mo</span></p>
                 </div>
                 <div className="p-4 rounded-xl glass border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Status</p>
                    <p className="text-xl font-bold text-emerald-400">Active</p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
