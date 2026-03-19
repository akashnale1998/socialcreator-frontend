"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ArrowRight, Zap, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  requiredPlan?: string;
  message?: string;
}

export const UpgradeModal = ({ isOpen, onClose, featureName, requiredPlan = "Pro Creator", message }: UpgradeModalProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-[480px] bg-[#050410] border border-white/10 rounded-[32px] md:rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] overflow-hidden my-auto"
          >
            {/* Top Shine */}
            <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-10 text-center space-y-6 md:space-y-8 relative z-10">
              <div className="relative inline-block">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/20 rounded-[24px] md:rounded-[32px] flex items-center justify-center text-primary mx-auto relative z-10 border border-primary/20">
                  <ShieldCheck className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
                </div>
                {/* Decorative pulse */}
                <div className="absolute inset-0 bg-primary/20 rounded-[24px] md:rounded-[32px] animate-ping opacity-20 -z-10" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">Upgrade to <br /><span className="text-gradient">Unlimited Access</span></h2>
                {message ? (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                    <p className="text-sm font-bold text-primary mb-1">Attention</p>
                    <p className="text-xs text-white/70 leading-relaxed">{message}</p>
                  </div>
                ) : (
                  <p className="text-white/40 max-w-xs mx-auto text-sm md:text-base leading-relaxed">
                    Unlock <span className="text-white font-semibold">{featureName || "this tool"}</span> and take your content to the next level with our <span className="text-primary font-bold">{requiredPlan}</span>.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { icon: Zap, label: 'Instant AI Generations', sub: 'No more waiting in queue' },
                  { icon: Sparkles, label: 'All Premium Tools', sub: 'Unlock full creative suite' },
                  { icon: Rocket, label: 'Highest Priority', sub: 'Top-tier processing' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.03] border border-white/[0.05] text-left hover:bg-white/[0.06] transition-colors">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90 leading-none">{item.label}</p>
                      <p className="text-[10px] md:text-[11px] text-white/30 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <Link href="/dashboard/plans" onClick={onClose} className="block">
                  <Button className="w-full h-14 md:h-16 text-sm md:text-md font-extrabold shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] group rounded-2xl">
                    View Pricing Plans <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <button 
                  onClick={onClose}
                  className="text-xs font-bold tracking-widest text-white/30 hover:text-white/60 transition-colors py-2 uppercase"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
