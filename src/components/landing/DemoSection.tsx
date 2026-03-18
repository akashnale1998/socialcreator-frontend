"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Sparkles,
  Youtube,
  Instagram,
  Music2,
  Zap,
  CheckCircle2,
  TrendingUp,
  Play,
  Video,
  FileSearch,
  Upload,
  Brain,
  Heart,
  BarChart3,
  ArrowRight,
  FileVideo,
  Clock,
  Activity,
  Award,
  AlertCircle,
  Send,
  Hash,
  X,
  Target,
  Flame,
  CheckCheck,
  Copy
} from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  generateCaptionThunk,
  analyzeViralScoreThunk,
  improveCaptionThunk,
  analyzeVideoViralScoreThunk,
  generateHashtagsThunk
} from '@/store/apis';

export const DemoSection = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('Motivational');
  const [caption, setCaption] = useState('');
  const [demoVideo, setDemoVideo] = useState<File | null>(null);
  const [demoVideoCaption, setDemoVideoCaption] = useState('');
  const [demoVideoHashtags, setDemoVideoHashtags] = useState('');
  const [demoVideoResult, setDemoVideoResult] = useState<any>(null);
  const [isDemoAnalyzing, setIsDemoAnalyzing] = useState(false);
  const [isDemoImproving, setIsDemoImproving] = useState(false);

  // Hashtag Generator State
  const [hashtagTopic, setHashtagTopic] = useState('');
  const [hashtagPlatform, setHashtagPlatform] = useState('Instagram');
  const [hashtagContentType, setHashtagContentType] = useState('Reel');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitMessage, setLimitMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const { data: captionData, loading: isGenerating } = useSelector((state: RootState) => state.generateCaption);
  const { data: viralData, loading: isAnalyzing } = useSelector((state: RootState) => state.analyzeViralScore);
  const { loading: isImproving } = useSelector((state: RootState) => state.improveCaption);
  const { data: hashtagData, loading: isGeneratingHashtags } = useSelector((state: RootState) => state.generateHashtags);

  const isProcessing = isGenerating || isAnalyzing || isImproving || isGeneratingHashtags;

  const handleGenerateCaption = async () => {
    if (!topic) return;
    const result = await dispatch(generateCaptionThunk({ topic, tone, platform }));
    if (generateCaptionThunk.rejected.match(result) && (result.payload as any)?.error?.includes('Demo limit')) {
      setLimitMessage((result.payload as any).error);
      setShowLimitModal(true);
    }
  };

  const handleGenerateHashtags = async () => {
    if (!hashtagTopic) return;
    const result = await dispatch(generateHashtagsThunk({
      topic: hashtagTopic,
      platform: hashtagPlatform,
      contentType: hashtagContentType
    }));
    if (generateHashtagsThunk.rejected.match(result) && (result.payload as any)?.error?.includes('Demo limit')) {
      setLimitMessage((result.payload as any).error);
      setShowLimitModal(true);
    } else {
      setCopiedSection(null);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleAnalyzeViralScore = async () => {
    if (!demoVideo) return;
    setIsDemoAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('video', demoVideo);
      if (demoVideoCaption) formData.append('caption', demoVideoCaption);
      if (demoVideoHashtags) formData.append('hashtags', demoVideoHashtags);

      const result = await dispatch(analyzeVideoViralScoreThunk(formData));
      if (analyzeVideoViralScoreThunk.fulfilled.match(result)) {
        setDemoVideoResult(result.payload);
      } else if ((result.payload as any)?.error?.includes('Demo limit')) {
        setLimitMessage((result.payload as any).error);
        setShowLimitModal(true);
      } else {
        console.error("Analysis failed:", result.payload);
      }
    } catch (error) {
      console.error("Error analyzing video:", error);
    } finally {
      setIsDemoAnalyzing(false);
    }
  };

  const handleImproveDemoCaption = async () => {
    if (!demoVideoCaption) return;
    setIsDemoImproving(true);
    setTimeout(() => {
      setDemoVideoCaption("🚀 LEVEL UP your Instagram game with these secret hacks! 🔥 \n\nStop scrolling and start growing today. Which tip are you trying first? 👇 \n\n#socialmedia #growth #creator");
      if (demoVideoResult) {
        setDemoVideoResult({
          ...demoVideoResult,
          viralScore: 94,
          captionScore: 96,
          reachPotential: "Very High"
        });
      }
      setIsDemoImproving(false);
    }, 1500);
  };

  const handleImprove = async () => {
    if (!caption) return;
    const result = await dispatch(improveCaptionThunk({ caption }));
    if (improveCaptionThunk.fulfilled.match(result)) {
      setCaption(result.payload.improvedCaption);
      // Re-analyze after improvement
      await dispatch(analyzeViralScoreThunk({
        caption: result.payload.improvedCaption,
        hook: captionData?.hook || '',
        topic: topic || 'Demo Topic'
      }));
    }
  };



  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get More Views on Instagram Reels with AI 🚀
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Generate high-performing hooks, captions, and reel ideas in seconds — designed to increase your reach, engagement, and followers.
          </p>
          <p className="mt-4 text-sm font-semibold text-orange-400/90">🔥 Creators are already using this to grow 2x faster</p>
        </div>


        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Panel - Instagram Caption Generator */}
            <Card className="p-8 md:p-10 border-primary/20 bg-primary/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Viral Caption Engine 🔥</h3>
                  <p className="text-sm text-white/40">Write captions that increase likes, saves & reach</p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col flex-1">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Target Topic</label>
                  <Input
                    placeholder="Example: Instagram growth tips"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-14 bg-white/5 border-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Tone</label>
                    <select
                      suppressHydrationWarning
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-primary outline-none"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      {['Motivational', 'Funny', 'Educational', 'Storytelling', 'Curiosity'].map(t => (
                        <option key={t} value={t} className="bg-[#030014] text-white">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Platform</label>
                    <select
                      suppressHydrationWarning
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-primary outline-none"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      {['instagram', 'youtube', 'tiktok'].map(p => (
                        <option key={p} value={p} className="bg-[#030014] text-white">{p.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] transition-transform text-lg gap-3"
                    onClick={() => handleGenerateCaption()}
                    isLoading={isGenerating}
                    disabled={!topic}
                  >
                    <Zap className="w-5 h-5 fill-white" /> Generate Viral Caption
                  </Button>

                  <AnimatePresence>
                    {captionData ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
                      >
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Top Hook</p>
                          <p className="text-sm font-bold text-white">{captionData.hook}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Generated Caption</p>
                          <p className="text-xs text-white/70 leading-relaxed italic line-clamp-3">"{captionData.options[0]}"</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {captionData.hashtags.slice(0, 3).map((h: string) => (
                            <span key={h} className="text-[9px] font-bold text-primary/60 px-2 py-0.5 rounded bg-primary/5 border border-primary/10">{h}</span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 opacity-60 grayscale-[0.5]"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Example Output</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/70 leading-relaxed italic">"Consistency beats motivation. Show up every day and watch your life change."</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {["#reelsgrowth", "#creatorlife", "#viralcontent", "#mindsetshift"].map((h) => (
                            <span key={h} className="text-[9px] font-bold text-primary/40 px-2 py-0.5 rounded bg-primary/5 border border-primary/10">{h}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>

            {/* Right Panel - Reel Viral Score Analyzer */}
            <Card className="p-8 md:p-10 border-secondary/20 bg-secondary/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                  <FileVideo size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Viral Reel Analyzer 🔥</h3>
                  <p className="text-sm text-white/40">Find what’s stopping your reel from going viral</p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col flex-1">
                {/* Demo Video Upload */}
                <div
                  onClick={() => document.getElementById('demo-upload')?.click()}
                  className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${demoVideo ? 'border-secondary/50 bg-secondary/5' : 'border-white/10 hover:border-secondary/30 bg-white/[0.02]'
                    }`}
                >
                  <input
                    id="demo-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setDemoVideo(e.target.files?.[0] || null)}
                  />
                  {demoVideo ? (
                    <div className="text-center relative w-full h-full flex flex-col items-center justify-center group">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDemoVideo(null);
                          setDemoVideoResult(null);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/10 opacity-0 group-hover:opacity-100 hover:bg-red-500/80 rounded-full transition-all text-white/70 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2 text-secondary">
                        <CheckCircle2 size={20} />
                      </div>
                      <p className="text-xs font-bold text-white mb-1 max-w-[90%] truncate mx-auto px-4">{demoVideo.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-2 text-white/40">
                        <Upload size={20} />
                      </div>
                      <p className="text-xs font-bold text-white/60">Click to upload Video</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Caption (Optional)</label>
                    <Input
                      placeholder="Video caption..."
                      value={demoVideoCaption}
                      onChange={(e) => setDemoVideoCaption(e.target.value)}
                      className="h-14 bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Hashtags (Optional)</label>
                    <Input
                      placeholder="#viral #creator"
                      value={demoVideoHashtags}
                      onChange={(e) => setDemoVideoHashtags(e.target.value)}
                      className="h-14 bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    className="w-full h-14 bg-gradient-to-r from-secondary to-blue-500 hover:scale-[1.02] transition-transform text-lg gap-3"
                    onClick={() => handleAnalyzeViralScore()}
                    isLoading={isDemoAnalyzing}
                    disabled={!demoVideo}
                  >
                    <Activity className="w-5 h-5 fill-white" /> Analyze Viral Potential
                  </Button>

                  <AnimatePresence>
                    {demoVideoResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-4"
                      >
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Viral Potential</p>
                          <p className="text-5xl font-black text-white">{demoVideoResult.score || demoVideoResult.viralScore || 0}<span className="text-xl text-secondary">/100</span></p>
                          <div className="absolute inset-0 bg-secondary/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            {
                              label: 'Hook',
                              score: demoVideoResult.sections?.find((s: any) => s.label === 'Hook Strength')?.score || demoVideoResult.hookScore || 0,
                              icon: Zap,
                              color: 'text-primary'
                            },
                            {
                              label: 'Cap',
                              score: demoVideoResult.sections?.find((s: any) => s.label === 'Content Clarity')?.score || demoVideoResult.captionScore || 0,
                              icon: Send,
                              color: 'text-blue-400'
                            },
                            {
                              label: 'Tag',
                              score: demoVideoResult.hashtagScore || 0,
                              icon: Hash,
                              color: 'text-emerald-400'
                            },
                            {
                              label: 'Eng',
                              score: demoVideoResult.sections?.find((s: any) => s.label === 'Emotional Impact')?.score || demoVideoResult.engagementScore || 0,
                              icon: Activity,
                              color: 'text-purple-400'
                            }
                          ].map((item) => (
                            <div key={item.label} className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                              <p className="text-[8px] text-white/40 font-bold uppercase mb-1">{item.label}</p>
                              <p className="text-xs font-black">{item.score}%</p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                              <Award size={10} /> Strengths
                            </h4>
                            <p className="text-[10px] text-white/60 line-clamp-2">
                              {demoVideoResult.strengths?.[0] || demoVideoResult.sections?.[0]?.desc || "Strong content foundation."}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1">
                              <AlertCircle size={10} /> To Improve
                            </h4>
                            <p className="text-[10px] text-white/60 line-clamp-2">
                              {demoVideoResult.improvements?.[0] || demoVideoResult.suggestions?.[0] || "Optimize pacing for reach."}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <div className="flex items-center gap-3 text-[10px] text-white/30">
                            <span className="flex items-center gap-1"><Clock size={10} /> {demoVideoResult.metadata?.duration || '??'}s</span>
                            <span className="flex items-center gap-1"><Activity size={10} /> {demoVideoResult.reachPotential || 'High'} Reach</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[9px] font-black uppercase tracking-widest text-secondary hover:text-secondary/80"
                            onClick={handleImproveDemoCaption}
                            isLoading={isDemoImproving}
                          >
                            <Sparkles size={10} className="mr-1" /> Boost Score
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>

            {/* Right Panel - Hashtag Generator */}
            <Card className="p-8 md:p-10 border-indigo-500/20 bg-indigo-500/5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Hash size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">High-Reach Hashtag Engine 🚀</h3>
                  <p className="text-sm text-white/40">Get hashtags that bring more views & reach</p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col flex-1">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Topic / Niche</label>
                  <Input
                    placeholder="Example: Fitness transformation"
                    value={hashtagTopic}
                    onChange={(e) => setHashtagTopic(e.target.value)}
                    className="h-14 bg-white/5 border-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Platform</label>
                    <select
                      suppressHydrationWarning
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500 outline-none"
                      value={hashtagPlatform}
                      onChange={(e) => setHashtagPlatform(e.target.value)}
                    >
                      <option value="Instagram" className="bg-[#030014] text-white">Instagram</option>
                      <option value="YouTube Shorts" className="bg-[#030014] text-white">YouTube Shorts</option>
                      <option value="TikTok" className="bg-[#030014] text-white">TikTok</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-1">Format</label>
                    <select
                      suppressHydrationWarning
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500 outline-none"
                      value={hashtagContentType}
                      onChange={(e) => setHashtagContentType(e.target.value)}
                    >
                      <option value="Reel" className="bg-[#030014] text-white">Reel</option>
                      <option value="Post" className="bg-[#030014] text-white">Post</option>
                      <option value="Short video" className="bg-[#030014] text-white">Shorts</option>
                    </select>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-transform text-lg gap-3"
                    onClick={handleGenerateHashtags}
                    isLoading={isGeneratingHashtags}
                    disabled={!hashtagTopic}
                  >
                    <Zap className="w-5 h-5 fill-white" /> Find Viral Hashtags 🚀
                  </Button>

                  <AnimatePresence>
                    {hashtagData && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-4"
                      >
                        {/* Controls */}
                        <div className="flex gap-2 justify-end mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[10px] gap-1 px-2 border-white/10"
                            onClick={() => handleCopy((hashtagData.viral || []).join(" "), 'viral-only')}
                          >
                            {copiedSection === 'viral-only' ? <CheckCheck size={12} className="text-emerald-400" /> : <Flame size={12} />}
                            Viral Only
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="h-8 text-[10px] gap-1 px-2"
                            onClick={() => {
                              const allTags = [...(hashtagData.viral || []), ...(hashtagData.medium || []), ...(hashtagData.niche || [])].join(" ");
                              handleCopy(allTags, 'all');
                            }}
                          >
                            {copiedSection === 'all' ? <CheckCheck size={12} /> : <Copy size={12} />}
                            Copy All
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {/* Viral */}
                          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
                            <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                              <Flame size={14} className="text-rose-500" /> Viral
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                              {hashtagData.viral?.join(" ")}
                            </p>
                          </div>
                          {/* Medium */}
                          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                              <Zap size={14} className="text-indigo-500" /> Medium Competition
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                              {hashtagData.medium?.join(" ")}
                            </p>
                          </div>
                          {/* Niche */}
                          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                              <Target size={14} className="text-emerald-500" /> Niche Targeted
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                              {hashtagData.niche?.join(" ")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-12 border-t border-white/5 flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white/60">Joined by 2,000+ creators this week</p>
            </div>
            <Link href="/signup">
              <Button size="lg" className="px-12 h-16 text-xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                Access Advanced Tools Free <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <p className="text-white/30 text-xs flex items-center gap-2">
              <CheckCircle2 size={12} /> No credit card required for trial
            </p>
          </div>
        </div>
      </div>

      {/* Demo Limit Modal */}
      <AnimatePresence>
        {showLimitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLimitModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-indigo-500" />

              <button
                onClick={() => setShowLimitModal(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 text-white border border-white/10">
                  <Flame size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-black mb-3">Demo Limit Reached</h3>
                <p className="text-white/60 text-sm leading-relaxed px-4">
                  {limitMessage || "You've used the free demo. Create a free account to continue generating viral content and accessing premium tools."}
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/register" className="block">
                  <Button className="w-full h-12 bg-white text-black hover:bg-white/90 text-sm font-bold">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:bg-white/5 text-sm font-bold">
                    Login to Continue
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
