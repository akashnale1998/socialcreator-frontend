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
  Heart,
  RefreshCw,
  Youtube,
  Instagram,
  Music2,
  Users,
  Search,
  BarChart3,
  Flame,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Brain,
  X,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generateHookThunk, analyzeHookThunk } from '@/store/apis';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function HooksForm() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';

  const [topic, setTopic] = useState(initialTopic);
  const [hookToAnalyze, setHookToAnalyze] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [audience, setAudience] = useState('General audience');
  const [hookStyle, setHookStyle] = useState('Curiosity');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState<'generate' | 'analyze'>('generate');

  const dispatch = useDispatch<AppDispatch>();
  const { data: generateData, loading: isGenerating, error: genError } = useSelector((state: RootState) => state.generateHook);
  const { data: analyzeData, loading: isAnalyzing, error: analyzeError } = useSelector((state: RootState) => state.analyzeHook);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);

  const handleGenerate = async () => {
    if (!topic) return;
    dispatch(generateHookThunk({ topic, platform, audience, hookStyle, language }));
  };

  const handleAnalyze = async () => {
    if (!hookToAnalyze) return;
    dispatch(analyzeHookThunk({ hook: hookToAnalyze, topic }));
  };

  const results = generateData?.hooks || [];
  const analysis = analyzeData || null;
  const isProcessing = isGenerating || isAnalyzing;
  const error = genError || analyzeError;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header remain same */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="text-amber-400" /> Hook <span className="text-gradient">Strategist</span>
          </h1>
          <p className="text-white/40 mt-1">Generate viral hooks or analyze existing ones with AI.</p>
        </div>

        <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
          <button
            onClick={() => { setMode('generate'); }}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'generate' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Generate
          </button>
          <button
            onClick={() => { setMode('analyze'); }}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'analyze' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Analyze (Viral Score)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit space-y-6">
          {mode === 'generate' ? (
            <>
              <Input
                label="What is your video about?"
                placeholder="e.g. How to bake a cake"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <div className="grid grid-cols-1 gap-4">
                <Select
                  label="Target Audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  options={[
                    { value: 'Beginners', label: 'Beginners' },
                    { value: 'Students', label: 'Students' },
                    { value: 'Entrepreneurs', label: 'Entrepreneurs' },
                    { value: 'Fitness enthusiasts', label: 'Fitness enthusiasts' },
                    { value: 'General audience', label: 'General audience' }
                  ]}
                />

                <Select
                  label="Hook Style"
                  value={hookStyle}
                  onChange={(e) => setHookStyle(e.target.value)}
                  options={[
                    { value: 'Curiosity', label: 'Curiosity' },
                    { value: 'Shock', label: 'Shock' },
                    { value: 'Story', label: 'Story' },
                    { value: 'Educational', label: 'Educational' },
                    { value: 'Motivational', label: 'Motivational' }
                  ]}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Social Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'youtube', icon: Youtube, label: 'Shorts' },
                    { id: 'instagram', icon: Instagram, label: 'Reels' },
                    { id: 'tiktok', icon: Music2, label: 'TikTok' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${platform === p.id
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                        }`}
                    >
                      <p.icon size={20} />
                      <span className="text-[10px] font-bold uppercase">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full shadow-lg shadow-primary/25"
                size="lg"
                onClick={handleGenerate}
                isLoading={isProcessing}
                disabled={!topic || (statsData?.credits <= 0 && statsData?.plan === 'free')}
              >
                Generate Hooks
              </Button>
            </>
          ) : (
            // Analyze mode same as before
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Paste your Hook</label>
                <textarea
                  className="w-full bg-[#0c0a20] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-none"
                  placeholder="Paste the hook you want to analyze..."
                  value={hookToAnalyze}
                  onChange={(e) => setHookToAnalyze(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Context / Topic</label>
                <Input
                  placeholder="e.g. Finance, Tech, Cooking"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <Button
                className="w-full shadow-lg shadow-amber-500/20"
                variant="glass"
                size="lg"
                onClick={handleAnalyze}
                isLoading={isProcessing}
                disabled={!hookToAnalyze}
              >
                Start Viral Analysis
              </Button>
            </div>
          )}

          {/* Error Message Support */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-3"
              >
                <div className="flex items-start gap-3 text-rose-500">
                  <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-medium leading-relaxed">
                    {typeof error === 'string' ? error : error.error || 'Request failed. Please try again.'}
                  </p>
                </div>
                {(error.toString().includes('limit') || error?.error?.includes('limit') || error?.error?.includes('Upgrade')) && (
                  <Link href="/dashboard/plans">
                    <Button variant="outline" size="sm" className="w-full border-rose-500/20 hover:bg-rose-500/20 text-rose-500 font-bold">
                      Upgrade to Continue <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Results Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {mode === 'generate' ? (
              <motion.div
                key="gen-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {results.length === 0 && !isProcessing ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
                    <Zap size={48} className="mb-4 opacity-30" />
                    <p>Your viral hooks will appear here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {results.map((hookObj: any, index: number) => {
                      const hook = typeof hookObj === 'string' ? { text: hookObj, type: 'Viral Hook', score: 8.5, explanation: 'Creates curiosity and high engagement potential.' } : hookObj;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="group p-6 hover:border-primary/30 transition-shadow">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/10">
                                      {hook.type}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/10">
                                      Score: {hook.score} / 10
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold leading-relaxed">{hook.text}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={() => handleCopy(hook.text)}
                                    className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                    title="Copy Hook"
                                  >
                                    <Copy size={18} />
                                  </button>
                                  <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Heart size={18} />
                                  </button>
                                </div>
                              </div>

                              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-xs text-white/50 leading-relaxed">
                                  <span className="text-primary font-bold mr-1">Why it works:</span>
                                  {hook.explanation}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-2">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8">
                                    Translate
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8">
                                    Save
                                  </Button>
                                </div>
                                <button onClick={handleGenerate} className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                                  <RefreshCw size={12} /> Regenerate
                                </button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
              // Analyze results same as before
              <motion.div
                key="analysis-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {!analysis && !isProcessing ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
                    <Search size={48} className="mb-4 opacity-30" />
                    <p>Analysis will show scroll-stopping power</p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    {/* Top Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="flex flex-col items-center p-6 border-amber-500/20 bg-amber-500/5">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 mb-3">
                          <TrendingUp size={24} />
                        </div>
                        <p className="text-3xl font-bold">{analysis.viralScore || analysis.score}/100</p>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">Viral Score</p>
                      </Card>

                      <Card className="flex flex-col items-center p-6 border-blue-500/20 bg-blue-500/5">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-3">
                          <BarChart3 size={24} />
                        </div>
                        <p className="text-3xl font-bold text-blue-400">{analysis.retentionPotential || analysis.retention}</p>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">Retention Potential</p>
                      </Card>

                      <Card className="flex flex-col items-center p-6 border-purple-500/20 bg-purple-500/5">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mb-3">
                          <Flame size={24} />
                        </div>
                        <p className="text-2xl font-bold text-purple-400">{analysis.emotionTrigger || analysis.emotion}</p>
                        <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">Emotion Trigger</p>
                      </Card>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400 uppercase tracking-wider">
                          <CheckCircle2 size={16} /> Strengths
                        </h3>
                        <ul className="space-y-3">
                          {(analysis.strengths || []).map((s: string, i: number) => (
                            <li key={i} className="text-sm text-white/70 leading-relaxed flex gap-2">
                              <span className="text-emerald-500">•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-rose-400 uppercase tracking-wider">
                          <AlertCircle size={16} /> Weaknesses
                        </h3>
                        <ul className="space-y-3">
                          {(analysis.weaknesses || []).map((w: string, i: number) => (
                            <li key={i} className="text-sm text-white/70 leading-relaxed flex gap-2">
                              <span className="text-rose-500">•</span> {w}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>

                    {/* Improved Hooks */}
                    <Card className="border-primary/20 bg-primary/5">
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                        <Sparkles className="text-primary" /> Improved Versions
                      </h3>
                      <div className="space-y-3">
                        {(analysis.improvedHooks || analysis.improved || []).map((hook: string, i: number) => (
                          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-all flex items-center justify-between gap-4">
                            <p className="text-sm text-white/90 leading-relaxed">{hook}</p>
                            <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                              <Copy size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function HookGenerator() {
  return (
    <React.Suspense fallback={
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse text-center py-20">
        <div className="h-10 w-48 bg-white/5 rounded-full mx-auto mb-4" />
        <div className="h-4 w-64 bg-white/5 rounded-full mx-auto" />
      </div>
    }>
      <HooksForm />
    </React.Suspense>
  );
}

