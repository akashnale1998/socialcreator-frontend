"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Zap, 
  Copy, 
  Heart, 
  Search, 
  Flame, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  Sparkles,
  BookMarked,
  Filter,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'motivation', label: 'Motivation', icon: Flame },
  { id: 'fitness', label: 'Fitness', icon: Zap },
  { id: 'business', label: 'Business', icon: TrendingUp },
  { id: 'study', label: 'Study', icon: Brain },
  { id: 'finance', label: 'Finance', icon: BarChart3 },
  { id: 'lifestyle', label: 'Lifestyle', icon: Sparkles }
];

const HOOKS = [
  { text: "Most people quit right when they're about to succeed.", category: 'motivation' },
  { text: "The person you'll be in 5 years depends on what you do today.", category: 'motivation' },
  { text: "Stop waiting for the perfect time. It doesn't exist.", category: 'motivation' },
  { text: "Consistency is more important than intensity.", category: 'motivation' },
  { text: "Your only limit is the one you set for yourself.", category: 'motivation' },
  
  { text: "How I lost 10kg without giving up pizza.", category: 'fitness' },
  { text: "Stop doing these 3 exercises if you want better results.", category: 'fitness' },
  { text: "The secret to 10k steps a day without trying.", category: 'fitness' },
  { text: "My 15-minute home workout for busy people.", category: 'fitness' },
  { text: "Why your diet is failing (and how to fix it).", category: 'fitness' },

  { text: "The business model that makes $5k/month while you sleep.", category: 'business' },
  { text: "How I scaled my startup from 0 to 1 million users.", category: 'business' },
  { text: "3 AI tools that will save you 10 hours a week.", category: 'business' },
  { text: "Don't start a business until you watch this.", category: 'business' },
  { text: "The #1 mistake first-time entrepreneurs make.", category: 'business' },

  { text: "How to memorize anything in 5 minutes.", category: 'study' },
  { text: "My top 3 productivity hacks for students.", category: 'study' },
  { text: "Why you're failing your exams (it's not what you think).", category: 'study' },
  { text: "How to study for 8 hours without burning out.", category: 'study' },
  { text: "The ultimate guide to acing your interviews.", category: 'study' },

  { text: "How I saved $10,000 at 22 years old.", category: 'finance' },
  { text: "3 index funds every beginner should own.", category: 'finance' },
  { text: "The truth about credit cards (they're not all bad).", category: 'finance' },
  { text: "How to retire early: The FIRE movement explained.", category: 'finance' },
  { text: "Stop wasting money on these 5 things.", category: 'finance' },

  { text: "My minimalist apartment tour: Less is more.", category: 'lifestyle' },
  { text: "How I changed my life in 30 days.", category: 'lifestyle' },
  { text: "Why I stopped using social media for a week.", category: 'lifestyle' },
  { text: "10 things that bring me joy (and none of them are free).", category: 'lifestyle' },
  { text: "How to live a more intentional life.", category: 'lifestyle' }
];

export default function HookLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedHooks, setSavedHooks] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredHooks = HOOKS.filter(hook => {
    const matchesCategory = selectedCategory === 'all' || hook.category === selectedCategory;
    const matchesSearch = hook.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSave = (text: string) => {
    if (savedHooks.includes(text)) {
      setSavedHooks(savedHooks.filter(h => h !== text));
    } else {
      setSavedHooks([...savedHooks, text]);
    }
  };

  const handleUse = (text: string) => {
    window.location.href = `/dashboard/hooks?topic=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookMarked className="text-primary" /> Viral Hook <span className="text-gradient">Library</span>
          </h1>
          <p className="text-white/40 mt-1">50+ Hand-picked, high-converting hooks for your next viral hit.</p>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-white/20 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search hooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-[300px] transition-all"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 w-fit">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <cat.icon size={16} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredHooks.map((hook, index) => (
            <motion.div
              key={hook.text}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full flex flex-col justify-between p-6 hover:border-primary/30 transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/10 transition-colors">
                      {hook.category}
                    </span>
                    <button 
                      onClick={() => handleSave(hook.text)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        savedHooks.includes(hook.text) ? 'text-rose-500' : 'text-white/20 hover:text-rose-500'
                      }`}
                    >
                      <Heart size={18} fill={savedHooks.includes(hook.text) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="text-lg font-bold leading-relaxed">{hook.text}</p>
                </div>

                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
                  <button 
                    onClick={() => handleCopy(hook.text, index)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleUse(hook.text)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/20 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/30 transition-all group/btn"
                  >
                    Use this <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredHooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-medium">No hooks found matching your search.</p>
        </div>
      )}
    </div>
  );
}
