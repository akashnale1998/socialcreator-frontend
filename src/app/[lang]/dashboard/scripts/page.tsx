"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileSearch, Activity, Brain, Users, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { analyzeScriptThunk } from '@/store/apis';
import Link from 'next/link';

export default function ScriptAnalyzer() {
  const [script, setScript] = useState('');
  const [platform, setPlatform] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { data: analysisData, loading: isAnalyzing, error } = useSelector((state: RootState) => state.analyzeScript);

  const handleAnalyze = () => {
    dispatch(analyzeScriptThunk({ script, platform }));
  };

  const analysis = analysisData || null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileSearch className="text-purple-400" /> Script Analyzer
        </h1>
        <p className="text-white/40 mt-1">Paste your script to get AI-powered performance insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Input */}
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <textarea
              className="w-full h-[500px] bg-[#0c0a20] p-6 text-white/80 placeholder:text-white/20 focus:outline-none resize-none leading-relaxed font-mono text-sm border-none"
              placeholder="Paste your video script here... (e.g. [SCENE 1: Intro] Hey guys, today I want to show you...)"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
          </Card>
          <Button
            className="w-full shadow-lg shadow-purple-500/20"
            size="lg"
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!script}
          >
            Analyze Performance
          </Button>

          {/* Error Feedbacks */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-4"
              >
                <div className="flex items-start gap-3 text-rose-500">
                  <AlertCircle size={20} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">Generation Limit Reached</p>
                    <p className="text-xs opacity-70 mt-1">
                      {typeof error === 'string' ? error : error.error || 'Request failed.'}
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/plans" className="block">
                  <Button variant="outline" size="sm" className="w-full border-rose-500/20 text-rose-500 hover:bg-rose-500/20 font-bold">
                    View Upgrade Options <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
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
                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="flex flex-col items-center p-6 border-amber-500/20 bg-amber-500/5">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3 text-amber-400 font-bold text-xl">
                      {analysis.score}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Viral Score</p>
                  </Card>
                  <Card className="flex flex-col items-center p-6 border-blue-500/20 bg-blue-500/5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3 text-blue-400">
                      <Activity size={24} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/40">Engagement Potential</p>
                  </Card>
                </div>

                {/* Detailed Breakdown */}
                <Card className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="text-primary w-5 h-5" /> AI Feedback
                  </h3>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-sm text-white/70 leading-relaxed italic">"{analysis.feedback}"</p>
                  </div>
                </Card>

                {/* Suggestions */}
                <Card className="border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <Sparkles className="text-emerald-400 w-5 h-5" /> Improvement Suggestions
                  </h3>
                  <div className="space-y-4">
                    {(analysis.suggestions || []).map((s: string, i: number) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm text-white/70">{s}</p>
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
