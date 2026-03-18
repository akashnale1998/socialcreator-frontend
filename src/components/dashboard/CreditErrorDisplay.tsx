"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface CreditErrorDisplayProps {
  error: any;
  onUpgradeClick?: () => void;
}

export const CreditErrorDisplay: React.FC<CreditErrorDisplayProps> = ({ error, onUpgradeClick }) => {
  if (!error) return null;

  const errorString = typeof error === 'string' ? error : error.error || '';
  const isCreditError = errorString.toLowerCase().includes('insufficient credits') || 
                       errorString.toLowerCase().includes('upgrade your plan') ||
                       errorString.toLowerCase().includes('locked in your current plan');

  if (!isCreditError) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl"
      >
        <div className="flex items-start gap-3 text-rose-500">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            {errorString || 'Request failed. Please try again.'}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="p-5 bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/30 rounded-2xl space-y-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Credits Exhausted</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            {errorString}
          </p>
        </div>
      </div>
      
      {onUpgradeClick ? (
        <Button 
          className="w-full shadow-lg shadow-primary/20 gap-2 text-xs font-bold" 
          size="sm"
          onClick={onUpgradeClick}
        >
          Upgrade Plan to Continue <ArrowRight size={14} />
        </Button>
      ) : (
        <Link href="/dashboard/plans" className="block">
          <Button className="w-full shadow-lg shadow-primary/20 gap-2 text-xs font-bold" size="sm">
            Upgrade Plan to Continue <ArrowRight size={14} />
          </Button>
        </Link>
      )}
    </motion.div>
  );
};
