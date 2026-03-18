"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Upload, 
  Video, 
  Youtube, 
  Instagram, 
  Music2, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Eye,
  MessageSquare,
  BarChart,
  Sparkles,
  Zap,
  Brain
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { analyzeVideoViralScoreThunk, analyzeVideoViralScoreSlice } from '@/store/apis';
import { trackEvent } from '@/lib/analytics';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { Copy } from 'lucide-react';

const mockAnalysis = {
  score: 92,
  sections: [
    { label: 'Hook Strength', score: 95, desc: 'Your first 3 seconds are extremely engaging and create an immediate curiosity gap.' },
    { label: 'Watch Retention', score: 88, desc: 'Pacing is consistent, but a slight drop is predicted around the 30% mark.' },
    { label: 'Content Clarity', score: 94, desc: 'High visual and audio clarity. The main message is instantly understandable.' },
    { label: 'Emotional Impact', score: 85, desc: 'Strong inspiration trigger, though adding close-up reactions could boost this.' },
    { label: 'Shareability', score: 90, desc: 'Highly relatable content with a clear call-to-action for sharing.' }
  ],
  suggestions: [
    "Add larger dynamic captions to the lower third of the video.",
    "Use a faster transition at the 15-second mark to maintain momentum.",
    "The audio level for the background music is slightly too high at the start."
  ]
};

export default function ReelAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: analysisData, loading: isAnalyzing, error } = useSelector((state: RootState) => state.analyzeVideoViralScore);

  React.useEffect(() => {
    dispatch(analyzeVideoViralScoreSlice.actions.reset());
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    
    trackEvent('analyze_video', 'Tool', 'Analyzed Video Reel');
    
    const formData = new FormData();
    formData.append('video', file);
    formData.append('caption', caption);
    formData.append('hashtags', hashtags);
    formData.append('platform', platform);

    dispatch(analyzeVideoViralScoreThunk(formData));
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const analysis = analysisData || null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Reel Viral Score Analyzer"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Brain className="text-primary" /> Reel Viral Score <span className="text-gradient">Analyzer AI</span>
        </h1>
        <p className="text-white/40 mt-1">Upload your reels for a deep viral potential and performance analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload & Config Area */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-8 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all relative">
              <input 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Upload size={32} />
              </div>
              <h3 className="text-lg font-bold">Upload Reel</h3>
              <p className="text-sm text-white/40 text-center mt-2">
                Drag and drop your MP4, MOV or WebM file here<br/>
                <span className="text-xs opacity-50">(Recommended: 9:16 aspect ratio)</span>
              </p>
              {file && (
                <div className="mt-6 px-4 py-2 bg-primary/20 rounded-lg border border-primary/30 flex items-center gap-3">
                  <Video size={16} className="text-primary" />
                  <span className="text-xs font-bold text-white truncate max-w-[200px]">{file.name}</span>
                </div>
              )}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 uppercase tracking-widest pl-2">Expected Caption (Optional)</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Paste the caption you plan to use..."
                className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 uppercase tracking-widest pl-2">Hashtags (Optional)</label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#viral #trending #creator..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-white/70 uppercase tracking-widest pl-2">Platform Selection</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'youtube', icon: Youtube, label: 'Shorts' },
                { id: 'instagram', icon: Instagram, label: 'Reels' },
                { id: 'tiktok', icon: Music2, label: 'TikTok' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    platform === p.id 
                      ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  <p.icon size={24} />
                  <span className="text-[10px] font-bold uppercase">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-lg gap-3"
            onClick={startAnalysis}
            isLoading={isAnalyzing}
            disabled={!file}
          >
            <Sparkles className="w-5 h-5 fill-white" /> Analyze Reel Potential
          </Button>

          <AnimatePresence>
            {error && (
              <CreditErrorDisplay 
                error={error} 
                onUpgradeClick={() => setUpgradeModalOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Results Area */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Zap size={40} className="text-white/20 fill-white/10" />
                </div>
                <h4 className="text-xl font-bold text-white/40 mb-2">Analysis Dashboard</h4>
                <p className="text-white/20 text-sm max-w-[280px] text-center">Upload a video to see your viral scores and AI-powered performance breakdowns.</p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 space-y-8"
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-white/5 border-t-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gradient">Analyzing Content...</h4>
                  <p className="text-white/40 text-sm mt-2">Checking hook strength and retention markers</p>
                </div>
              </motion.div>
            ) : analysis ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score Widget */}
                <Card className="flex items-center justify-between p-8 bg-primary/5 border-primary/20">
                   <div className="space-y-2">
                     <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Viral Score</p>
                     <p className="text-6xl font-black text-white">{analysis.score}<span className="text-2xl text-primary font-bold">/100</span></p>
                   </div>
                   <div className="relative flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <motion.circle 
                          cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                          className="text-primary"
                          strokeDasharray={364}
                          initial={{ strokeDashoffset: 364 }}
                          animate={{ strokeDashoffset: 364 - (364 * analysis.score) / 100 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                      <Zap className="absolute text-primary fill-primary w-8 h-8" />
                   </div>
                </Card>

                {/* Analysis Sections */}
                <div className="grid grid-cols-1 gap-4">
                  {analysis.sections.map((section: any, i: number) => (
                    <Card key={i} className="p-5 border-white/5">
                       <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-white/70">{section.label}</span>
                          <span className="text-sm font-bold text-primary">{section.score}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${section.score}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="h-full bg-primary" 
                          />
                       </div>
                       <p className="text-xs text-white/40 leading-relaxed">{section.desc}</p>
                    </Card>
                  ))}
                </div>

                {/* AI Suggestions */}
                <Card className="border-emerald-500/20 bg-emerald-500/5 p-6">
                   <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-emerald-400">
                      <CheckCircle2 size={20} /> AI Improvement Tips
                   </h3>
                   <div className="space-y-4">
                      {analysis.suggestions.map((suggestion: string, i: number) => (
                        <div key={i} className="flex gap-3 group relative">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                           <p className="text-sm text-white/80 leading-relaxed pr-8">{suggestion}</p>
                           <button 
                             onClick={() => handleCopy(suggestion, i)}
                             className={`absolute top-0 right-0 p-1 rounded-md transition-all ${
                                copiedId === i 
                                ? 'text-emerald-500' 
                                : 'text-white/20 hover:text-white opacity-0 group-hover:opacity-100'
                             }`}
                           >
                              {copiedId === i ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                           </button>
                        </div>
                      ))}
                   </div>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
