"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Hash, Copy, Zap, Flame, Target, AlertCircle, ArrowRight, CheckCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { generateHashtagsThunk, generateHashtagsSlice } from '@/store/apis';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [contentType, setContentType] = useState('Reel');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { data: hashtagData, loading: isGenerating, error } = useSelector((state: RootState) => state.generateHashtags);

  useEffect(() => {
    dispatch(generateHashtagsSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = () => {
    if (topic.trim().length < 3) {
      // In a real app we'd show a specific validation error, but for now we'll just not trigger
      return;
    }
    dispatch(generateHashtagsThunk({ topic, platform, contentType }));
    setCopiedSection(null);
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const results = hashtagData || null;

  const getAllHashtagsString = () => {
    if (!results) return "";
    return [...(results.viral || []), ...(results.medium || []), ...(results.niche || [])].join(" ");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Hashtag Generator"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Hash className="text-secondary" /> Hashtag Generator
        </h1>
        <p className="text-white/40 mt-1">Discover viral and niche hashtags tailored to your audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <Card className="lg:col-span-1 h-fit space-y-6">
          <div className="space-y-4">
            <Input
              label="Topic / Niche"
              placeholder="Example: Fitness transformation"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Platform</label>
              <select
                title="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                <option value="Instagram">Instagram</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Content Type</label>
              <select
                title="content-type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                <option value="Reel">Reel</option>
                <option value="Post">Post</option>
                <option value="Short video">Short video</option>
              </select>
            </div>
          </div>

            <Button
              className="w-full shadow-lg shadow-violet-500/25 bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02]"
              size="lg"
              onClick={handleGenerate}
              isLoading={isGenerating}
              disabled={!topic || topic.trim().length < 3}
            >
              Generate Hashtags
            </Button>

          <AnimatePresence>
            {error && (
              <CreditErrorDisplay 
                error={error} 
                onUpgradeClick={() => setUpgradeModalOpen(true)}
              />
            )}
          </AnimatePresence>
        </Card>

        {/* Output Panel */}
        <div className="lg:col-span-2 space-y-4">
          {!results && !isGenerating ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
              <Hash size={48} className="mb-4 opacity-50" />
              <p>Categorized hashtags will appear here</p>
            </div>
          ) : results ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Global Actions */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-white/10"
                  onClick={() => handleCopy((results.viral || []).join(" "), 'viral-only')}
                >
                  {copiedSection === 'viral-only' ? <CheckCheck size={16} className="text-emerald-400" /> : <Flame size={16} />}
                  Copy Viral Only
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleCopy(getAllHashtagsString(), 'all')}
                >
                  {copiedSection === 'all' ? <CheckCheck size={16} /> : <Copy size={16} />}
                  Copy All Hashtags
                </Button>
              </div>

              <div className="grid gap-4">
                {/* Viral Strategy */}
                <Card className="p-6 border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-rose-300">
                      <Flame className="text-rose-500" /> Viral Hashtags
                    </h3>
                    <div className="text-xs font-medium bg-rose-500/20 text-rose-300 px-2 py-1 rounded-md">High Reach</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {results.viral?.map((h: string) => (
                      <span key={h} className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90">
                        {h.trim()}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* Medium Competition Strategy */}
                <Card className="p-6 border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-300">
                      <Zap className="text-indigo-500" /> Medium Competition
                    </h3>
                    <div className="text-xs font-medium bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md">Balanced</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {results.medium?.map((h: string) => (
                      <span key={h} className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90">
                        {h.trim()}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* Niche Strategy */}
                <Card className="p-6 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-300">
                      <Target className="text-emerald-500" /> Niche Hashtags
                    </h3>
                    <div className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Targeted</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {results.niche?.map((h: string) => (
                      <span key={h} className="text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90">
                        {h.trim()}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Generate More Action */}
              <div className="flex flex-col items-center justify-center py-8 gap-4 border-t border-white/5">
                <p className="text-sm text-white/40">Not satisfied? Try generating another set.</p>
                <Button 
                  onClick={handleGenerate} 
                  isLoading={isGenerating}
                  className="gap-2 px-8"
                  variant="glass"
                >
                  <Zap size={18} className="text-primary" /> Generate More (1 Credit)
                </Button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
