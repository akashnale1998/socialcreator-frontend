"use client";

import React, { useState, useEffect } from 'react';
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
  Hash,
  Star,
  Check,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
  Play,
  Video,
  MessageSquare
} from 'lucide-react';

const Typewriter = ({ text }: { text: string }) => {
  const characters = text.split("");
  
  return (
    <motion.div className="inline-block">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * 0.03,
            ease: "easeIn",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};
import { useDispatch, useSelector } from 'react-redux';
import { generateScriptThunk, generateScriptSlice } from '@/store/apis';
import { AppDispatch, RootState } from '@/store/store';
import { trackEvent } from '@/lib/analytics';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';

export default function ScriptGenerator() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [duration, setDuration] = useState('30');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'caption' | 'hashtags'>('script');
  const [isSaved, setIsSaved] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: scriptData, loading, error } = useSelector((state: RootState) => state.generateScript);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  
  useEffect(() => {
    dispatch(generateScriptSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = () => {
    if (!topic) return;
    trackEvent('generate_caption', 'Tool', 'Generated Caption');
    trackEvent('generate_script', 'Tool', 'Generated Script');
    dispatch(generateScriptThunk({ topic, language, duration }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-max-w-6xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Reel Script Generator"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-primary" /> Reel <span className="text-gradient">Script Generator</span>
          </h1>
          <p className="text-white/40 mt-1">Create high-engagement vertical video scripts in seconds.</p>
        </div>
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

          <AnimatePresence>
            {error && (
              <CreditErrorDisplay 
                error={error} 
                onUpgradeClick={() => setUpgradeModalOpen(true)}
              />
            )}
          </AnimatePresence>
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
              {/* Success Heading */}
              <div className="text-center space-y-2 mb-8 relative">
                <div className="absolute -top-4 right-0 md:right-4">
                   <button 
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-2.5 rounded-2xl transition-all shadow-xl ${isSaved ? 'text-amber-500 bg-amber-500/20 border border-amber-500/20' : 'text-white/20 hover:text-white/40 bg-white/5 border border-white/10'}`}
                    >
                      <Star size={20} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Your Viral Script is Ready 🎬</h2>
                <p className="text-white/50 text-sm font-medium italic">Use this script to create your next reel</p>
              </div>

              {/* Tabs */}
              <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-6">
                {(['script', 'caption', 'hashtags'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                      activeTab === tab 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'script' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hook Section - Larger */}
                    <Card className="md:col-span-2 border-amber-500/30 bg-amber-500/10 p-8 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black flex items-center gap-2 text-amber-500 uppercase tracking-widest">
                          <Zap size={18} className="fill-amber-500" /> 🔥 Viral Hook
                        </h3>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setIsSaved(!isSaved)}
                            className={`p-2 rounded-xl transition-all ${isSaved ? 'text-amber-500 bg-amber-500/10' : 'text-white/20 hover:text-white/40 bg-white/5'}`}
                          >
                            <Star size={18} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="bg-amber-500 text-black hover:bg-amber-400 gap-2 h-9"
                            onClick={() => handleCopy(scriptData.hook, 'hook')}
                          >
                            {copiedId === 'hook' ? <Check size={14} /> : <Copy size={14} />}
                            Copy Hook
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight italic min-h-[4rem]">
                        <Typewriter text={`"${scriptData.hook}"`} />
                      </h3>
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
                    </Card>

                    {/* Viral Score Section */}
                    <Card className="border-primary/20 bg-primary/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Viral Potential</p>
                      <div className="relative mb-4">
                        <div className="text-5xl font-black text-white drop-shadow-2xl">{scriptData.viralScore || 82}</div>
                        <div className="text-xs font-bold text-primary">/100 🔥</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase mb-4">
                        High chance of going viral
                      </div>
                      <p className="text-[10px] font-bold text-white/30 max-w-[120px] leading-tight italic">
                        Creators using similar scripts got <span className="text-emerald-500">2x more engagement</span> 🔥
                      </p>
                    </Card>
                  </div>

                  {/* Timeline Script View */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Video Roadmap</h3>
                    <div className="space-y-3">
                      {(scriptData.scriptSections || [
                        { time: '0-3s', label: 'Hook', text: scriptData.hook },
                        { time: '3-15s', label: 'Body', text: scriptData.script },
                        { time: '15-20s', label: 'CTA', text: scriptData.cta }
                      ]).map((section: any, idx: number) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all group"
                        >
                          <div className="flex flex-col items-center gap-2 pt-1">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative">
                              {idx === 0 ? <Zap size={16} /> : idx === (scriptData.scriptSections?.length || 3) - 1 ? <Target size={16} /> : <Play size={16} />}
                              {idx < (scriptData.scriptSections?.length || 3) - 1 && (
                                <div className="absolute top-full w-px h-8 bg-white/5 mt-2" />
                              )}
                            </div>
                            <span className="text-[10px] font-bold text-white/30 tabular-nums">{section.time}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{section.label}</span>
                            <p className="text-sm text-white/80 leading-relaxed">{section.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex flex-col gap-2">
                      <Button className="h-14 gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-500/20">
                        <Video size={18} /> Shoot This Reel
                      </Button>
                      <p className="text-[10px] font-bold text-white/30 text-center flex items-center justify-center gap-1 uppercase tracking-tighter">
                        <Zap size={10} className="fill-white/30" /> Takes less than 30 seconds to shoot
                      </p>
                    </div>
                    <Button variant="glass" className="h-14 gap-2 text-xs font-black uppercase tracking-widest border-white/10" onClick={() => handleCopy(scriptData.script, 'script')}>
                      {copiedId === 'script' ? <Check size={18} /> : <Sparkles size={18} />} Improve Script
                    </Button>
                    <Button variant="ghost" className="h-14 gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white" onClick={handleGenerate}>
                      <RefreshCw size={18} /> Regenerate Version
                    </Button>
                  </div>
                </>
              ) : activeTab === 'caption' ? (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                      <MessageSquare size={18} /> Suggested Caption
                    </h3>
                    <div className="flex items-center gap-2">
                       <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopy(scriptData.script, 'full_script')}
                        className="gap-2 h-9 text-[10px] font-black uppercase text-white/40 hover:text-white"
                      >
                        {copiedId === 'full_script' ? <Check size={14} /> : <FileText size={14} />}
                        Copy Full Script
                      </Button>
                      <Button 
                        variant="glass" 
                        size="sm"
                        onClick={() => handleCopy(scriptData.caption, 'caption')}
                        className="gap-2 h-9 text-[10px] font-black uppercase"
                      >
                        {copiedId === 'caption' ? <Check size={14} /> : <Copy size={14} />}
                        Copy Caption
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-lg leading-relaxed italic text-white/80">
                    "{scriptData.caption}"
                  </div>
                </Card>
              ) : (
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black flex items-center gap-2 text-purple-400 uppercase tracking-widest">
                      <Hash size={18} /> Smart Hashtags
                    </h3>
                    <Button 
                      variant="glass" 
                      size="sm"
                      onClick={() => handleCopy(scriptData.hashtags?.map((t: string) => `#${t}`).join(' '), 'tags')}
                      className="gap-2 h-9"
                    >
                      {copiedId === 'tags' ? <Check size={14} /> : <Copy size={14} />}
                      Copy Hashtags
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {scriptData.hashtags?.map((tag: string) => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-400 text-sm font-black border border-purple-500/10">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
