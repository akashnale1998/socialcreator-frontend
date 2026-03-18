"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  Zap,
  Copy,
  RefreshCw,
  Clock,
  Languages,
  FileText,
  CheckCircle2,
  ListPlus,
  Hash,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generateScriptThunk } from '@/store/apis';
import { AppDispatch, RootState } from '@/store/store';

export default function ScriptGenerator() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [duration, setDuration] = useState('30');

  const dispatch = useDispatch<AppDispatch>();
  const { data: scriptData, loading, error } = useSelector((state: RootState) => state.generateScript);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);

  const handleGenerate = () => {
    if (!topic) return;
    dispatch(generateScriptThunk({ topic, language, duration }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="text-primary" /> Reel <span className="text-gradient">Script Generator</span>
        </h1>
        <p className="text-white/40 mt-1">Create high-engagement vertical video scripts in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit space-y-6">
          <div className="space-y-4">
            <Input
              label="What is your reel about?"
              placeholder="e.g. 5 productivity hacks for students"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <Select
              label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Hindi', label: 'Hindi' },
                { value: 'Marathi', label: 'Marathi' }
              ]}
            />

            <Select
              label="Target Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              options={[
                { value: '15', label: '15 Seconds (Short/Hype)' },
                { value: '30', label: '30 Seconds (Standard)' },
                { value: '60', label: '60 Seconds (Detailed)' }
              ]}
            />
          </div>

          <Button
            className="w-full shadow-lg shadow-primary/25"
            size="lg"
            onClick={handleGenerate}
            isLoading={loading}
            disabled={!topic || (statsData?.credits <= 0 && statsData?.plan === 'free')}
          >
            Generate Viral Script
          </Button>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-500 text-center">
              {typeof error === 'string' ? error : 'Generation failed. Please try again.'}
            </div>
          )}
        </Card>

        {/* Results Area */}
        <div className="lg:col-span-2">
          {!scriptData && !loading ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
              <Sparkles size={48} className="mb-4 opacity-30" />
              <p>Your AI-generated script will appear here</p>
            </div>
          ) : scriptData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Hook Section */}
              <Card className="border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-amber-500 uppercase tracking-widest">
                    <Zap size={16} /> The Hook
                  </h3>
                  <button onClick={() => handleCopy(scriptData.hook)} className="text-white/40 hover:text-white transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-lg font-bold leading-relaxed">{scriptData.hook}</p>
              </Card>

              {/* Script Body */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-primary uppercase tracking-widest">
                    <FileText size={16} /> Full Script
                  </h3>
                  <button onClick={() => handleCopy(scriptData.script)} className="text-white/40 hover:text-white transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 whitespace-pre-wrap text-sm leading-relaxed text-white/80 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {scriptData.script}
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400 uppercase tracking-widest mb-4">
                    <ListPlus size={16} /> Call to Action
                  </h3>
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-sm font-medium">
                    {scriptData.cta}
                  </div>
                </div>
              </Card>

              {/* Social Kit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 h-fit">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-blue-400 uppercase tracking-widest mb-6">
                    <MessageSquare size={16} /> Caption
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    {scriptData.caption}
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(scriptData.caption)} className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest">
                    Copy Caption
                  </Button>
                </Card>

                <Card className="p-6 h-fit">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-purple-400 uppercase tracking-widest mb-6">
                    <Hash size={16} /> Hashtags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {scriptData.hashtags?.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/10">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(scriptData.hashtags?.map((t: string) => `#${t}`).join(' '))} className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest">
                    Copy tags
                  </Button>
                </Card>
              </div>

              <div className="flex items-center justify-center pt-4">
                <button onClick={handleGenerate} className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                  <RefreshCw size={16} /> Regenerate Script
                </button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
