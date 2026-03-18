"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingUp, ArrowUpRight, Globe, BarChart2, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getTrendingThunk } from '@/store/apis';
import Link from 'next/link';

const categories = ["All", "Fitness", "Finance", "Tech", "Motivation", "Education"];

export default function TrendingTopics() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: trendingData, loading } = useSelector((state: RootState) => state.getTrending);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  
  const userPlan = statsData?.plan || 'free';
  const hasAccess = userPlan === 'creator' || userPlan === 'pro';

  useEffect(() => {
    if (hasAccess) {
      dispatch(getTrendingThunk({ category: activeCategory }));
    }
  }, [dispatch, activeCategory, hasAccess]);

  const trends = trendingData?.trends || [];

  if (!hasAccess) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-2">
           <Lock size={40} />
        </div>
        <div className="space-y-4">
           <h1 className="text-4xl font-bold">Premium <span className="text-gradient">Insights</span></h1>
           <p className="text-white/40 max-w-md mx-auto">Trending Topics is only available for Creator and Pro users. Upgrade to see what's going viral right now.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
           <Link href="/dashboard/plans">
              <Button size="lg" className="px-12 h-14 rounded-2xl shadow-xl shadow-primary/20">
                 Unlock Trending Topics <Sparkles size={18} className="ml-2" />
              </Button>
           </Link>
           <p className="text-[10px] uppercase font-bold text-white/20 tracking-[0.2em]">Starting at just $10/mo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="text-primary" /> Trending Topics
          </h1>
          <p className="text-white/40 mt-1">Discover what's going viral right now across social media.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                 activeCategory === cat 
                   ? 'bg-primary text-white shadow-lg' 
                   : 'text-white/40 hover:text-white'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {loading ? (
            <div className="col-span-full h-64 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
               <TrendingUp className="animate-pulse text-primary" size={48} />
            </div>
         ) : trends.map((trend: any, index: number) => (
           <motion.div
             key={trend.topic}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: index * 0.05 }}
           >
             <Card className="h-full group hover:border-primary/20">
                <div className="flex items-start justify-between mb-6">
                   <div className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                      {trend.category}
                   </div>
                   <div className="flex items-center gap-1 text-primary">
                      <BarChart2 size={14} />
                      <span className="text-xs font-bold">{trend.score}% Viral Score</span>
                   </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{trend.topic}</h3>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">Opportunity</span>
                      <span className={`font-bold ${trend.score > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{trend.opportunity}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                      />
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                   <button className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                      <Globe size={14} /> View Sources
                   </button>
                   <Link href="/dashboard/hooks">
                      <Button variant="glass" size="sm" className="gap-2 text-[10px] tracking-widest uppercase py-1.5">
                         Generate Content <ArrowUpRight size={12} />
                      </Button>
                   </Link>
                </div>
             </Card>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
