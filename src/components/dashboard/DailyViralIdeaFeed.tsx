"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Flame,
  RefreshCw,
  Instagram,
  Youtube,
  Zap,
  MessageSquare,
  Copy,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getDailyViralIdeasThunk } from '@/store/apis';
import { useRouter } from 'next/navigation';

const platforms = [
  { id: 'Instagram Reels', icon: Instagram, color: 'text-pink-500' },
  { id: 'YouTube Shorts', icon: Youtube, color: 'text-red-500' },
  { id: 'TikTok', icon: Zap, color: 'text-cyan-400' }
];

const categories = ['Motivation', 'Business', 'Lifestyle', 'Fitness', 'Education'];
const languages = ['English', 'Hindi', 'Marathi'];

export const DailyViralIdeaFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, loading } = useSelector((state: RootState) => state.getDailyViralIdeas);

  const [selectedPlatform, setSelectedPlatform] = useState('Instagram Reels');
  const [selectedCategory, setSelectedCategory] = useState('Motivation');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchIdeas = () => {
    setVisibleCount(3);
    dispatch(getDailyViralIdeasThunk({
      params: {
        platform: selectedPlatform,
        category: selectedCategory,
        language: selectedLanguage
      }
    }));
  };

  useEffect(() => {
    if (!data) {
      fetchIdeas();
    }
  }, [selectedPlatform, selectedCategory, selectedLanguage]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseIdea = (title: string) => {
    router.push(`/dashboard/captions?topic=${encodeURIComponent(title)}`);
  };

  const ideas = data?.ideas || [];
  const visibleIdeas = ideas.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold">Daily Viral Idea Feed</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPlatform(p.id);
                  setVisibleCount(3);
                }}
                className={`p-1.5 rounded-md transition-all ${selectedPlatform === p.id ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                title={p.id}
              >
                <p.icon size={16} className={selectedPlatform === p.id ? p.color : ''} />
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setVisibleCount(3);
            }}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white/60 outline-none hover:border-primary/50 transition-colors cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-slate-900">{c}</option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setVisibleCount(3);
            }}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white/60 outline-none hover:border-primary/50 transition-colors cursor-pointer"
          >
            {languages.map(l => (
              <option key={l} value={l} className="bg-slate-900">{l}</option>
            ))}
          </select>

          <Button
            variant="glass"
            size="sm"
            onClick={fetchIdeas}
            disabled={loading}
            className="gap-2 text-[10px] font-black uppercase tracking-widest"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="p-6 border-white/5 bg-white/[0.02] animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
                  <div className="h-20 bg-white/5 rounded w-full mb-4" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                  </div>
                </Card>
              ))
            ) : visibleIdeas.length > 0 ? (
              visibleIdeas.map((idea: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full flex flex-col group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider border border-primary/10">
                        {idea.platform}
                      </span>
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <TrendingUp size={10} />
                        <span className="text-[10px] font-bold">{idea.viralityScore}%</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{idea.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 flex-1 line-clamp-3 italic">
                      "{idea.description}"
                    </p>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleUseIdea(idea.title)}
                          className="flex-1 text-[10px] font-black uppercase tracking-wider gap-2 h-9"
                        >
                          Use Idea <ArrowRight size={12} />
                        </Button>
                        <button
                          onClick={() => handleCopy(`${idea.title}\n\n${idea.description}`, `copy-${index}`)}
                          className={`p-2 rounded-xl transition-all ${copiedId === `copy-${index}` ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/20 hover:text-white hover:bg-white/10'}`}
                          title="Copy Idea"
                        >
                          {copiedId === `copy-${index}` ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => router.push(`/dashboard/captions?topic=${encodeURIComponent(idea.title)}&language=${selectedLanguage}`)}
                          className="gap-1.5 text-[8px] font-black uppercase h-8"
                        >
                          <MessageSquare size={10} /> Caption
                        </Button>
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => router.push(`/dashboard/hooks?topic=${encodeURIComponent(idea.title)}&language=${selectedLanguage}`)}
                          className="gap-1.5 text-[8px] font-black uppercase h-8"
                        >
                          <Zap size={10} /> Hooks
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-white/20">
                  <Filter size={32} />
                </div>
                <div>
                  <p className="text-white font-bold">No ideas found</p>
                  <p className="text-xs text-white/40">Try adjusting your filters or refresh for new ideas.</p>
                </div>
                <Button variant="glass" onClick={fetchIdeas}>Refresh Feed</Button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {ideas.length > visibleCount && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-8 gap-2 group border-white/10 hover:border-primary/50 h-12 rounded-2xl"
            >
              Get more Ideas <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            </Button>
          </div>
        )}
      </div>

      <p className="text-[10px] text-white/20 text-center italic px-4">
        * Fresh AI-generated content ideas every day based on trending viral patterns.
      </p>
    </div>
  );
};
