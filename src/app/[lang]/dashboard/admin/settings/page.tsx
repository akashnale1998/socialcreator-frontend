"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import {
  Settings,
  Shield,
  Database,
  Globe,
  Lock,
  Mail,
  Cpu,
  Monitor,
  Zap,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getSettingsThunk, updateSettingsThunk } from '@/store/apis';

export default function SystemSettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: settingsData, loading } = useSelector((state: RootState) => state.adminSettings);
  const { loading: isSaving } = useSelector((state: RootState) => state.updateSettings);
  
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    defaultModel: 'Gemini 1.5 Flash',
    tokenLimitPerUser: 50000
  });

  useEffect(() => {
    dispatch(getSettingsThunk({})).then((res: any) => {
      if (res.payload?.success) {
        setFormData(res.payload.data);
      }
    });
  }, [dispatch]);

  const handleSave = () => {
    dispatch(updateSettingsThunk(formData)).then((res: any) => {
      if (res.payload?.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    });
  };

  const toggleBoolean = (field: 'maintenanceMode' | 'registrationEnabled') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="text-primary" /> System Settings
          </h1>
          <p className="text-white/40 mt-1">Configure global platform parameters and security.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            {['General', 'Security', 'Models', 'API Keys', 'Billing'].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-bold text-left rounded-xl transition-all ${i === 0 ? 'bg-white/5 text-primary border border-primary/20' : 'text-white/30 hover:bg-white/[0.02]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-8 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Loading Settings...</p>
                </div>
              </div>
            )}

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Monitor className="text-primary" size={20} />
                <h3 className="text-lg font-bold">General Configuration</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-sm font-bold">Maintenance Mode</p>
                    <p className="text-xs text-white/30">Prevent non-admin users from accessing platform.</p>
                  </div>
                  <div 
                    onClick={() => toggleBoolean('maintenanceMode')}
                    className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${formData.maintenanceMode ? 'bg-rose-500' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: formData.maintenanceMode ? 24 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-sm font-bold">New User Registration</p>
                    <p className="text-xs text-white/30">Allow or block new signups.</p>
                  </div>
                  <div 
                    onClick={() => toggleBoolean('registrationEnabled')}
                    className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${formData.registrationEnabled ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: formData.registrationEnabled ? 24 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow-sm" 
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Cpu className="text-secondary" size={20} />
                <h3 className="text-lg font-bold">AI Model Configuration</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Default Model</label>
                  <select 
                    value={formData.defaultModel}
                    onChange={(e) => setFormData({ ...formData, defaultModel: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 outline-none appearance-none cursor-pointer"
                  >
                    <option value="Gemini 1.5 Flash">Gemini 1.5 Flash</option>
                    <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    <option value="GPT-4o">GPT-4o</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Token Limit per User (Monthly)</label>
                  <input
                    type="number"
                    value={formData.tokenLimitPerUser}
                    onChange={(e) => setFormData({ ...formData, tokenLimitPerUser: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 outline-none"
                  />
                </div>
              </div>
            </section>
          </Card>

          <AnimatePresence>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="fixed bottom-10 right-10 p-4 bg-emerald-500 text-white rounded-2xl shadow-2xl flex items-center gap-3 z-50 font-bold text-sm"
              >
                <CheckCircle2 size={20} />
                Settings saved successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
