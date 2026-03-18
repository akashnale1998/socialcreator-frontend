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
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function AccountSettings() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const { data: userData, loading: userLoading } = useSelector((state: RootState) => state.me);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);

  const user = userData?.data || userData || {};
  const stats = statsData || { plan: 'free', credits: 0 };

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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
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
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User size={40} />
                        )}
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg border-2 border-[#030014] group-hover:scale-110 transition-transform">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{user.name || 'Creator'}</h3>
                      <p className="text-sm text-white/40">{user.role === 'admin' ? 'System Administrator' : 'Content Creator'}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">UID: {user._id?.slice(-6).toUpperCase() || 'SC-9283'}</span>
                        <span className="px-2 py-0.5 rounded-md bg-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                          <Check size={10} /> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Display Name" defaultValue={user.name} />
                    <Input label="Email Address" defaultValue={user.email} disabled />
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-white/70 block mb-2">Bio</label>
                      <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        rows={4}
                        placeholder="Tell us about yourself..."
                        defaultValue={user.bio || ""}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="px-8">Save Changes</Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'subscription' && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-primary/20 bg-primary/5 space-y-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <CreditCard className="text-primary" /> {stats.plan?.toUpperCase()} Plan
                      </h3>
                      <p className="text-sm text-white/60">
                        {stats.plan === 'free' 
                          ? 'You are currently on the free tier.' 
                          : 'Your subscription is active and managed via Razorpay.'}
                      </p>
                    </div>
                    <Link href="/dashboard/plans">
                      <Button variant="glass" size="sm" className="gap-2">
                        {stats.plan === 'free' ? 'Upgrade Plan' : 'Change Plan'} <ExternalLink size={14} />
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl glass border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Credits Remaining</p>
                      <p className="text-xl font-bold">{stats.credits} <span className="text-xs text-white/20 font-medium">/ {stats.plan === 'free' ? 10 : stats.plan === 'creator' ? 500 : 2000}</span></p>
                    </div>
                    <div className="p-4 rounded-xl glass border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Billing Cycle</p>
                      <p className="text-xl font-bold">Monthly</p>
                    </div>
                    <div className="p-4 rounded-xl glass border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Status</p>
                      <p className="text-xl font-bold text-emerald-400">Active</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-sm font-bold mb-4">Payment Methods</h4>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <CreditCard size={20} className="text-white/40" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Razorpay Payment Gateway</p>
                        <p className="text-xs text-white/40">Secured & Encrypted</p>
                      </div>
                      <div className="px-2 py-1 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-500 uppercase">Linked</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Shield className="text-primary" /> Security Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
                      <Shield size={20} className="text-amber-500 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-amber-500">Enable Two-Factor Authentication</p>
                        <p className="text-xs text-white/40 mt-1">Add an extra layer of security to your account by requiring a code from your phone to log in.</p>
                      </div>
                      <Button size="sm" variant="glass" className="ml-auto shrink-0">Enable</Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <h4 className="text-sm font-bold">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Current Password" type="password" placeholder="••••••••" />
                        <div />
                        <Input label="New Password" type="password" placeholder="••••••••" />
                        <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button variant="glass">Update Password</Button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <h4 className="text-sm font-bold text-rose-500">Danger Zone</h4>
                      <p className="text-xs text-white/40">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <Button variant="outline" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10">Delete Account</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Bell className="text-primary" /> Notification Preferences
                  </h3>

                  <div className="space-y-4">
                    {[
                      { title: 'Email Notifications', desc: 'Receive daily stats and weekly reports via email.' },
                      { title: 'AI Generation Alerts', desc: 'Get notified when your deep analysis is complete.' },
                      { title: 'Marketing Updates', desc: 'New feature announcements and promotional offers.' },
                      { title: 'Security Alerts', desc: 'Important updates about your account security.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                        <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer shadow-inner">
                          <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
