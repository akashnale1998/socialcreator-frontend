"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Sparkles,
  Zap,
  Copy,
  CheckCircle2,
  Calendar,
  Hash,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generateFullPostThunk, generateFullPostSlice } from '@/store/apis';
import { AppDispatch, RootState } from '@/store/store';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';

export default function FullPostGenerator() {
  const [topic, setTopic] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { data: fullPostData, loading: isGenerating, error } = useSelector((state: RootState) => state.generateFullPost);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  
  useEffect(() => {
    dispatch(generateFullPostSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = async () => {
    if (!topic) return;
    trackEvent('generate_full_post', 'Tool', 'Generated Full Post Package');
    dispatch(generateFullPostThunk({ topic }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const package_data = fullPostData || null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-primary" /> AI Full Post <span className="text-gradient">Generator</span>
        </h1>
        <p className="text-white/40 mt-1">Get a complete Instagram-ready post package in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <Card className="lg:col-span-1 h-fit space-y-6">
          <Input
            label="What is your post about?"
            placeholder="e.g. 5 tips for digital marketing"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <Button
            className="w-full shadow-lg shadow-primary/25"
            size="lg"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!topic || (statsData?.credits <= 0 && statsData?.plan === 'free')}
          >
            Generate Full Package
          </Button>

          <AnimatePresence>
            {error && <CreditErrorDisplay error={error} />}
          </AnimatePresence>
        </Card>

        {/* Results Area */}
        <div className="lg:col-span-2">
          {!package_data && !isGenerating ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
              <Sparkles size={48} className="mb-4 opacity-30" />
              <p>Your complete post package will appear here</p>
            </div>
          ) : package_data ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Hooks Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap className="text-amber-400" size={20} /> Viral Hooks (10)
                  </h3>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => handleCopy(package_data.hooks.map((h: any) => h.text).join('\n\n'), 'all-hooks')}
                  >
                    {copiedId === 'all-hooks' ? <CheckCircle2 size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                    Copy All
                  </Button>
                </div>
                <div className="space-y-3">
                  {package_data.hooks.map((hook: any, i: number) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-amber-400/30 transition-all group relative">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest">{hook.trigger}</span>
                          <p className="text-sm font-medium text-white/90 leading-relaxed mt-1">{hook.text}</p>
                        </div>
                        <button 
                          onClick={() => handleCopy(hook.text, `hook-${i}`)}
                          className={`p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all ${copiedId === `hook-${i}` ? 'text-emerald-400' : 'text-white/20 hover:text-white'}`}
                        >
                          {copiedId === `hook-${i}` ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Captions Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MessageSquare className="text-blue-400" size={20} /> Viral Captions (10)
                  </h3>
                </div>
                <div className="space-y-4">
                  {package_data.captions.map((caption: string, i: number) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-400/30 transition-all group relative">
                       <div className="flex justify-between items-start gap-4">
                        <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{caption}</p>
                        <button 
                          onClick={() => handleCopy(caption, `caption-${i}`)}
                          className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all bg-white/5 border border-white/10 ${copiedId === `caption-${i}` ? 'text-emerald-400' : 'text-white/40 hover:text-white'}`}
                        >
                          {copiedId === `caption-${i}` ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Hashtags Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Hash className="text-emerald-400" size={20} /> Optimized Hashtags (20)
                  </h3>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => handleCopy(package_data.hashtags.join(' '), 'hashtags')}
                  >
                    {copiedId === 'hashtags' ? <CheckCircle2 size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                    Copy Hashtags
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {package_data.hashtags.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-400/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Posting Times Section */}
              <Card className="p-6">
                 <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <Calendar className="text-purple-400" size={20} /> Suggested Posting Times
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {package_data.postingTimes.map((time: string, i: number) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-1">
                      <span className="text-xl font-bold text-white">{time}</span>
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Peak Engagement</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex justify-center py-6">
                <Button onClick={handleGenerate} variant="glass" className="gap-2 px-8">
                  <RefreshCw size={18} /> Regenerate Complete Package
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center">
               <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={24} />
              </div>
              <p className="text-white/40 mt-6 font-medium">AI is crafting your post package...</p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-2">Generating hooks, captions & hashtags</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
