"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileSearch, 
  Activity, 
  Brain, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Target, 
  Zap, 
  Trash2, 
  RefreshCw, 
  Video,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { analyzeScriptThunk, analyzeScriptSlice } from '@/store/apis';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';

const CircularProgress = ({ score, size = 160 }: { score: number; size?: number }) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Viral Score</span>
      </div>
    </div>
  );
};

export default function ScriptAnalyzer() {
  const [script, setScript] = useState('');
  const [platform, setPlatform] = useState();

  const dispatch = useDispatch<AppDispatch>();
  const { data: analysisData, loading: isAnalyzing, error } = useSelector((state: RootState) => state.analyzeScript);

  useEffect(() => {
    dispatch(analyzeScriptSlice.actions.reset());
  }, [dispatch]);

  const handleAnalyze = () => {
    dispatch(analyzeScriptThunk({ script, platform }));
  };

  const analysis = analysisData || null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black flex items-center gap-3">
          <FileSearch className="text-primary" /> Script <span className="text-gradient">Analyzer</span>
        </h1>
        <p className="text-white/40 mt-1">Optimize your video scripts for maximum retention and reach.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Input */}
        <div className="space-y-4">
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                Paste Your Script & Find What’s Killing Your Reach 🔍
              </h3>
              <p className="text-xs text-white/30 font-medium">We'll analyze pacing, hooks, and retention potential.</p>
            </div>
            
            <textarea
              className="w-full h-[400px] bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-primary/30 focus:bg-white/[0.04] transition-all resize-none leading-relaxed font-mono text-sm"
              placeholder="Hey guys, today I want to show you how I saved 10 hours a week..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />

            <div className="space-y-4">
               <Button
                className="w-full h-14 bg-primary text-slate-950 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all"
                onClick={handleAnalyze}
                isLoading={isAnalyzing}
                disabled={!script}
              >
                Analyze & Improve Script 🚀
              </Button>
              <p className="text-[10px] font-bold text-white/20 text-center uppercase tracking-widest">
                Requires 1 Credit • AI Script Intelligence v2.0
              </p>
            </div>
          </Card>

          {/* Error Feedbacks */}
          <AnimatePresence>
            {error && <CreditErrorDisplay error={error} />}
          </AnimatePresence>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20 p-12 text-center">
                <Activity size={64} className="mb-6 opacity-50" />
                <h3 className="text-lg font-semibold text-white/40">Ready for Analysis</h3>
                <p className="max-w-xs mt-2">Our AI will predict viewer behavior and suggest improvements for your script.</p>
              </div>
            ) : analysis ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Language Badge */}
                <div className="flex justify-start">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                      Detected Language: <span className="text-primary">{analysis.detectedLanguage || 'English'}</span> {analysis.languageFlag || '🇺🇸'}
                   </div>
                </div>

                {/* Main Score Area */}
                <Card className="p-8 flex flex-col items-center justify-center border-primary/20 bg-primary/5 relative overflow-hidden text-center group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                  
                  <CircularProgress score={analysis.score} />
                  
                  <div className="mt-6 space-y-1">
                    <h3 className="text-2xl font-black text-white">{analysis.score}/100 🔥</h3>
                    <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em]">High Potential</p>
                  </div>
                  
                  <p className="mt-4 text-xs font-medium text-white/40 max-w-[200px]">
                    This script can perform well with small improvements
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/5 w-full">
                     <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter italic">
                       Creators using similar scripts saw <span className="text-emerald-500 uppercase">2x engagement</span> 🔥
                     </p>
                  </div>
                </Card>

                {/* AI Feedback - Bullets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 border-emerald-500/20 bg-emerald-500/5 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                      <CheckCircle2 size={14} /> Strengths
                    </h4>
                    <ul className="space-y-2">
                       {(analysis.feedback?.strengths || ["Engaging intro", "Clear messaging"]).map((s: string, i: number) => (
                         <li key={i} className="flex gap-2 text-xs font-medium text-white/60">
                            <span className="text-emerald-500/50">•</span> {s}
                         </li>
                       ))}
                    </ul>
                  </Card>
                  <Card className="p-6 border-red-500/20 bg-red-500/5 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-2">
                      <XCircle size={14} /> Weaknesses
                    </h4>
                    <ul className="space-y-2">
                       {(analysis.feedback?.weaknesses || ["Hook placement weak", "Ending not strong"]).map((w: string, i: number) => (
                         <li key={i} className="flex gap-2 text-xs font-medium text-white/60">
                            <span className="text-red-500/50">•</span> {w}
                         </li>
                       ))}
                    </ul>
                  </Card>
                </div>

                {/* Improvement Suggestions Cards */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Actionable Fixes</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {(analysis.suggestions || [
                      { title: 'Fix Hook', text: 'Move problem statement to the beginning' },
                      { title: 'Improve CTA', text: 'Add strong follow CTA' }
                    ]).map((s: any, i: number) => (
                      <Card key={i} className="p-5 flex items-center justify-between gap-4 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                        <div className="space-y-1">
                          <h5 className="text-sm font-black text-white flex items-center gap-2">
                            <Zap size={14} className="text-primary fill-primary" /> {s.title}
                          </h5>
                          <p className="text-xs text-white/40 font-medium">{s.text}</p>
                        </div>
                        <Button variant="glass" size="sm" className="shrink-0 text-[10px] font-black uppercase text-primary border-primary/20 h-9 px-4">
                          Apply Fix
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Before vs After */}
                <div className="space-y-4">
                   <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Before vs After Comparison</h3>
                   <div className="grid grid-cols-1 gap-1">
                      <div className="p-4 rounded-t-2xl bg-white/5 border border-white/5 opacity-50 relative">
                         <span className="absolute top-3 right-4 text-[8px] font-black uppercase text-white/20">Original</span>
                         <p className="text-[11px] font-mono text-white/40 line-clamp-3">{analysis.beforeAfter?.before || script}</p>
                      </div>
                      <div className="p-6 rounded-b-2xl bg-emerald-500/5 border-l-2 border-r border-b border-emerald-500/30 relative">
                         <span className="absolute top-3 right-4 text-[8px] font-black uppercase text-emerald-500/40">AI Optimized</span>
                         <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                           "{analysis.beforeAfter?.after || 'The optimized version will appear here...'}"
                         </p>
                      </div>
                   </div>
                </div>

                {/* Final Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button className="h-14 gap-2 bg-purple-500 hover:bg-purple-400 text-black font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-500/20">
                    <Sparkles size={18} /> Improve My Script
                  </Button>
                  <Button variant="glass" className="h-14 gap-2 text-xs font-black uppercase tracking-widest border-white/10" onClick={handleAnalyze}>
                    <RefreshCw size={18} /> Generate New Version
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
