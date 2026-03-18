"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Zap,
  Type,
  FileSearch,
  TrendingUp,
  Sparkles,
  Plus,
  History,
  Lightbulb,
  Brain,
  ArrowRight,
  Flame,
  CreditCard,
  AlertTriangle,
  Copy,
  CheckCircle2,
  MessageSquare,
  Hash,
  Video,
  FileText
} from 'lucide-react';
import { ReferralProgram } from './ReferralProgram';
import { ContentWorkflow } from './ContentWorkflow';
import { DailyViralIdeaFeed } from './DailyViralIdeaFeed';
import { UpgradeModal } from './UpgradeModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getStatsThunk, getHistoryThunk } from '@/store/apis';
import { useEffect } from 'react';

export default function DashboardOverview() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  const { data: userData } = useSelector((state: RootState) => state.me);
  const { data: historyData, loading: historyLoading } = useSelector((state: RootState) => state.getHistory);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [upgradeModal, setUpgradeModal] = React.useState({ isOpen: false, feature: '', plan: '' });

  useEffect(() => {
    dispatch(getStatsThunk({}));
    dispatch(getHistoryThunk({}));
  }, [dispatch]);

  const handleCopy = (item: any) => {
    let text = "";
    const output = item.output;

    if (item.type === 'hook') {
      text = output?.hooks?.map((h: any) => h.text).join("\n") || "";
    } else if (item.type === 'title') {
      text = output?.titles?.join("\n") || "";
    } else if (item.type === 'script') {
      text = `${output?.hook}\n\n${output?.script}\n\n${output?.cta}`;
    } else if (item.type === 'ideas') {
      text = output?.ideas?.map((i: any) => i.title || i).join("\n") || "";
    } else if (item.type === 'caption') {
      text = output?.options?.join("\n") || "";
    } else if (item.type === 'hashtags') {
      text = [...(output.viral || []), ...(output.medium || []), ...(output.niche || [])].join(" ");
    } else if (item.type === 'full_post') {
      text = `HOOKS:\n${output.hooks.map((h: any) => h.text).join('\n')}\n\nCAPTIONS:\n${output.captions.join('\n')}\n\nHASHTAGS:\n${output.hashtags.join(' ')}`;
    }

    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedId(item._id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const apiStats = statsData || { hooks: 0, titles: 0, scripts: 0, analysis: 0, credits: 0, plan: 'free' };
  const user = userData?.data || { name: 'Creator', plan: 'free' };

  const currentPlan = apiStats.plan || user.plan || 'free';
  const isLifetime = user.is_lifetime_user || currentPlan === 'lifetime';

  const PLAN_LIMITS: any = {
    'free': 10,
    'creator': 500,
    'pro': 1500,
    'lifetime': 2000
  };

  const maxCredits = PLAN_LIMITS[currentPlan] || 10;
  const resetLabel = (currentPlan === 'free' ? 'today' : 'this month');

  const displayStats = [
    { label: 'Posts Generated', value: apiStats.titles.toLocaleString(), icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Hooks Generated', value: apiStats.hooks.toLocaleString(), icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Ideas Generated', value: apiStats.scripts.toLocaleString(), icon: Lightbulb, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Remaining Credits', value: `${apiStats.credits} / ${maxCredits}`, icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const quickActions = [
    { label: 'Create Full Post', icon: Sparkles, href: '/dashboard/full-post', color: 'bg-primary/10 text-primary border-primary/20', isNew: true, minPlan: 'creator' },
    { label: 'Generate Caption', icon: MessageSquare, href: '/dashboard/captions', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', minPlan: 'free' },
    { label: 'Generate Hooks', icon: Zap, href: '/dashboard/hooks', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', minPlan: 'free' },
    { label: 'Generate Hashtags', icon: Hash, href: '/dashboard/hashtags', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', minPlan: 'free' },
    { label: 'Generate Reel Ideas', icon: Lightbulb, href: '/dashboard/ideas', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', minPlan: 'free' },
    { label: 'Analyze Profile', icon: Brain, href: '/dashboard/profile-analyzer', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', minPlan: 'creator' },
  ];

  const checkPlanAccess = (minPlan: string) => {
    if (user.role === 'admin') return true;
    if (minPlan === 'free') return true;
    const plan = currentPlan.toLowerCase();
    if (minPlan === 'creator') return plan === 'creator' || plan === 'pro' || plan === 'lifetime';
    if (minPlan === 'pro') return plan === 'pro' || plan === 'lifetime';
    return false;
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Welcome Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-white/40 mt-1">Here's what's happening with your content strategy today.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentPlan === 'pro' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
              currentPlan === 'creator' ? 'bg-primary/20 text-primary border border-primary/20' :
                'bg-white/5 text-white/40 border border-white/10'
              }`}>
              {currentPlan} Plan
            </span>
          </div>
        </div>

        {/* Low Credit Alert integrated into Welcome */}
        {(apiStats.credits <= 3 && !isLifetime) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-1 px-1 bg-gradient-to-r from-amber-500/20 via-primary/10 to-transparent border border-amber-500/20 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 p-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                <AlertTriangle size={24} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-base font-black text-white tracking-tight">Fuel Up Your Creativity!</p>
                <p className="text-xs text-white/40">You're down to <span className="text-amber-500 font-bold">{apiStats.credits} credits</span>. Upgrade now to keep generating viral content without limits.</p>
              </div>
            </div>
            <Link href="/dashboard/plans" className="w-full md:w-auto p-4 relative z-10">
              <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 border-none rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 h-14 px-8">Upgrade for Unlimited ✨</Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {displayStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group p-5 md:p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:scale-[1.02] active:scale-[0.98] rounded-3xl">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-5 transition-transform group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} strokeWidth={1.5} />
              </div>
              <p className="text-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] group-hover:text-white/40 transition-colors">{stat.label}</p>
              <h3 className="text-2xl md:text-3xl font-black mt-1 tracking-tighter">{stat.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Quick Create Section (NEW) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold">Quick Create</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={checkPlanAccess(action.minPlan) ? action.href : '#'}
                onClick={(e) => {
                  if (!checkPlanAccess(action.minPlan)) {
                    e.preventDefault();
                    setUpgradeModal({
                      isOpen: true,
                      feature: action.label,
                      plan: action.minPlan.charAt(0).toUpperCase() + action.minPlan.slice(1)
                    });
                  }
                }}
              >
                <Card className={`h-full flex flex-col items-center justify-center p-6 gap-3 text-center transition-all hover:scale-105 active:scale-95 group ${action.color} relative overflow-hidden`}>
                  <action.icon size={28} className="group-hover:animate-pulse" />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold leading-tight">{action.label}</span>
                    {!checkPlanAccess(action.minPlan) && (
                      <span className="px-1 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/20 text-[6px] font-black uppercase">Pro feature</span>
                    )}
                  </div>
                  {action.isNew && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-primary text-[8px] font-black text-white uppercase italic tracking-tighter shadow-sm animate-bounce">New</span>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Daily Viral Idea Feed (NEW) */}
      <DailyViralIdeaFeed />

      {/* 5. Trending Reel Ideas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold">Trending Reel Ideas</h2>
          </div>
          <Link href="/dashboard/trending" className="text-xs text-primary hover:underline font-bold uppercase tracking-widest">More Trends</Link>
        </div>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "5 Habits for Maximum Productivity",
              "A Day in the Life of a Creator",
              "Small Business Reality Check",
              "Fitness Tips I Wish I Knew Earlier",
              "3 Skills for the AI Era",
              "How to Structure Your Content"
            ].map((idea, i) => (
              <button
                key={i}
                onClick={() => window.location.href = `/dashboard/hooks?topic=${encodeURIComponent(idea)}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 group-hover:bg-primary/20 group-hover:text-primary transition-colors">{i + 1}</div>
                  <span className="text-xs font-bold text-white/70 group-hover:text-white truncate pr-2">{idea}</span>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-primary flex-shrink-0" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* 5. Main AI Tools */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Main AI Tools</h2>
        </div>
        <ContentWorkflow />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Script Generator', desc: 'Create viral video scripts in seconds', icon: FileText, href: '/dashboard/script-generator', color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { label: 'Hook Generator', desc: 'Stop the scroll with powerful hooks', icon: Zap, href: '/dashboard/hooks', color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { label: 'Hashtag Generator', desc: 'Optimize reach with smart hashtags', icon: Hash, href: '/dashboard/hashtags', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          ].map((tool) => (
            <Link key={tool.label} href={tool.href}>
              <Card className="p-6 hover:border-primary/30 transition-all group h-full">
                <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 text-2xl ${tool.color}`}>
                  <tool.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{tool.label}</h3>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{tool.desc}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest group-hover:gap-2 transition-all">
                  Open Tool <ArrowRight size={12} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 6. Profile Analyzer */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold">Profile Growth Analysis</h2>
        </div>
        <Card className="p-0 overflow-hidden bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-10 space-y-4 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                <Brain size={24} />
              </div>
              <h3 className="text-2xl font-bold">Profile Screenshot Analyzer</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-md">
                Upload your Instagram or TikTok profile screenshot and get an AI-powered growth report, score, and content strategy instantly.
              </p>
              <div className="flex flex-wrap gap-2 py-2">
                {['Growth Score', 'SEO Optimization', 'Bio Check'].map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/dashboard/profile-analyzer" className="block pt-2">
                <Button className="md:w-fit px-8 shadow-lg shadow-primary/20 group">
                  Analyze My Profile <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center p-10 bg-primary/5">
              <div className="relative">
                <div className="w-64 h-80 bg-[#0c0a20] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 bg-white/10 rounded-full w-3/4" />
                      <div className="h-2 bg-white/5 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="aspect-square bg-white/5 rounded-lg" />)}
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/5 rounded-full w-full" />
                    <div className="h-2 bg-white/5 rounded-full w-5/6" />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 p-4 rounded-2xl glass border border-white/20 shadow-xl flex flex-col items-center gap-1 animate-float">
                  <span className="text-2xl font-black text-primary">8.5</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Growth Score</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7. Recent Activity */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-secondary" />
              Recent Activity
            </h3>
            <Link href="/dashboard/history" className="text-xs text-primary hover:underline font-bold uppercase tracking-widest">View All</Link>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {historyLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4 items-center animate-pulse">
                    <div className="w-10 h-10 rounded-lg bg-white/5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-white/5 rounded-full w-3/4" />
                      <div className="h-2 bg-white/5 rounded-full w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (historyData as any[])?.length > 0 ? (
              (historyData as any[]).map((item, i) => {
                const configs: any = {
                  hook: { color: 'text-amber-400 bg-amber-400/10', icon: Zap },
                  title: { color: 'text-blue-400 bg-blue-400/10', icon: Type },
                  script: { color: 'text-purple-400 bg-purple-400/10', icon: FileText },
                  ideas: { color: 'text-emerald-400 bg-emerald-400/10', icon: Lightbulb },
                  caption: { color: 'text-blue-400 bg-blue-400/10', icon: MessageSquare },
                  hashtags: { color: 'text-emerald-400 bg-emerald-400/10', icon: Hash },
                  full_post: { color: 'text-primary bg-primary/10', icon: Sparkles },
                  profile_analysis: { color: 'text-primary bg-primary/10', icon: Brain }
                };
                const config = configs[item.type] || { color: 'text-white/40 bg-white/5', icon: Zap };

                return (
                  <div key={item._id} className="flex items-center gap-4 group bg-white/[0.02] border border-white/5 p-3 rounded-2xl hover:bg-white/5 transition-all">
                    <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center transition-transform group-hover:rotate-6`}>
                      <config.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                        {item.input?.topic || item.input?.hook || 'AI Generation'}
                      </p>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-0.5">
                        {item.type.replace('_', ' ')} • {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(item)}
                      className={`p-2 rounded-lg transition-all ${copiedId === item._id
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-white/20 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {copiedId === item._id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/10 py-10">
                <History size={40} className="mb-2 opacity-10" />
                <p className="text-sm font-medium">No activity yet</p>
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          {/* 8. Referral Program */}
          <ReferralProgram />

          {/* 9. Viral Hook Library */}
          <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold">Viral Hook Library</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Unlock our hand-picked viral hooks library. Boost engagement by using proven psychological triggers.
                </p>
                <Link href="/dashboard/hook-library" className="block pt-2">
                  <Button variant="glass" className="w-full group">
                    Explore Library <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <UpgradeModal
        isOpen={upgradeModal.isOpen}
        onClose={() => setUpgradeModal({ ...upgradeModal, isOpen: false })}
        featureName={upgradeModal.feature}
        requiredPlan={upgradeModal.plan}
      />
    </div>
  );
}
