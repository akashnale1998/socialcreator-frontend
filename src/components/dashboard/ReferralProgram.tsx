"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Copy, Check, Gift } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const ReferralProgram = () => {
  const { data: userData } = useSelector((state: RootState) => state.me);
  const [copied, setCopied] = React.useState(false);

  const user = userData?.data || {};
  const referralCode = user.referral_code || 'REF-XXXXXX';
  const referralLink = `https://socialcreatorapp.com/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Referral Program</h3>
              <p className="text-sm text-white/60">Invite friends and earn 20 bonus credits for each signup.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-black/20 rounded-xl border border-white/5">
            <code className="text-xs text-white/70 px-2 truncate flex-1">{referralLink}</code>
            <Button size="sm" variant="glass" className="h-8 gap-2" onClick={copyToClipboard}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-28 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Referrals</p>
            <p className="text-xl font-bold">{user.referrals_count || 0}</p>
          </div>
          <div className="flex-1 md:w-28 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Earned</p>
            <p className="text-xl font-bold text-emerald-400">{user.earned_credits || 0}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
