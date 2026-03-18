"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Upload, 
  Video, 
  Youtube, 
  Instagram, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Eye,
  BarChart,
  Sparkles,
  Zap,
  Brain,
  Copy,
  Download,
  RefreshCw,
  Trophy,
  Target,
  Calendar,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { analyzeProfileThunk, analyzeProfileSlice } from '@/store/apis';
import { trackEvent } from '@/lib/analytics';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import Image from 'next/image';

export default function ProfileAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [platform, setPlatform] = useState('instagram');
  const [copied, setCopied] = useState(false);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: analysisData, loading: isAnalyzing, error } = useSelector((state: RootState) => state.analyzeProfile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validation: Max 5MB
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size too large. Please upload an image smaller than 5MB.");
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    dispatch(analyzeProfileSlice.actions.reset());
  }, [dispatch]);

  const startAnalysis = () => {
    if (!file) return;
    trackEvent('analyze_profile', 'Tool', 'Analyzed Profile Screenshot');
    
    const formData = new FormData();
    formData.append('screenshot', file);
    formData.append('platform', platform);
    
    dispatch(analyzeProfileThunk(formData));
  };

  const handleCopy = () => {
    if (!analysisData) return;
    const text = JSON.stringify(analysisData, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analysis = analysisData || null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="AI Profile Analyzer"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="text-primary" /> AI Profile <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-white/40 mt-1">Upload a profile screenshot for deep AI growth insights.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Upload & Config */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden relative group">
            <div className={`p-10 flex flex-col items-center justify-center border-2 border-dashed transition-all relative min-h-[400px] ${
              preview ? 'border-primary/50 bg-primary/5' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}>
              {!preview ? (
                <>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <Upload size={40} />
                  </div>
                  <h3 className="text-xl font-bold">Upload Screenshot</h3>
                  <p className="text-sm text-white/40 text-center mt-3 max-w-xs leading-relaxed">
                    Upload a clear screenshot of your Instagram or YouTube profile page.
                  </p>
                  <div className="mt-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Supports JPG, PNG
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center">
                   <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                      <Image 
                        src={preview} 
                        alt="Profile Preview" 
                        fill 
                        className="object-contain bg-black/40"
                      />
                   </div>
                   <button 
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="mt-4 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-widest"
                   >
                     Remove & Change
                   </button>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <label className="text-sm font-bold text-white/70 uppercase tracking-widest pl-2">Platform</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'instagram', icon: Instagram, label: 'Instagram' },
                { id: 'youtube', icon: Youtube, label: 'YouTube' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                    platform === p.id 
                      ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10' 
                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  <p.icon size={20} />
                  <span className="text-xs font-bold uppercase">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full h-14 bg-gradient-to-r from-primary to-secondary text-lg gap-3 shadow-xl shadow-primary/20"
            onClick={startAnalysis}
            isLoading={isAnalyzing}
            disabled={!file}
          >
            <Sparkles className="w-5 h-5" /> Analyze Profile (2 Credits)
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

        {/* Right Side: Results */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Zap size={40} className="text-white/10" />
                </div>
                <h4 className="text-xl font-bold text-white/40 mb-2">Analysis Dashboard</h4>
                <p className="text-white/20 text-sm max-w-[280px]">
                  Analyze your profile's growth score, niche positioning, and viral potential.
                </p>
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
                  <h4 className="text-xl font-bold text-gradient">Analyzing Profile...</h4>
                  <p className="text-white/40 text-sm mt-2">Checking niche, bio, and engagement triggers</p>
                </div>
              </motion.div>
            ) : analysis ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score & Summary */}
                <Card className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full w-fit">
                         <span className="text-[10px] font-black uppercase text-primary tracking-widest">{platform} Report</span>
                      </div>
                      <h2 className="text-3xl font-black text-white">@{analysis.summary?.username || 'Creator'}</h2>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-white/40 uppercase text-[10px] font-bold">Followers</span>
                          <span className="font-bold">{analysis.summary?.followers || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/40 uppercase text-[10px] font-bold">Niche</span>
                          <span className="font-bold">{analysis.summary?.niche || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Growth Score</span>
                      <span className="text-5xl font-black text-primary">{analysis.growthScore}<span className="text-sm font-bold opacity-30">/10</span></span>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                </Card>

                {/* Content Sections */}
                <div className="grid grid-cols-1 gap-4">
                   <Card className="border-amber-500/20 bg-amber-500/5">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-amber-500 uppercase tracking-widest mb-4">
                        <Zap size={16} /> Top Growth Tips
                      </h3>
                      <div className="space-y-3">
                         {analysis.topGrowthTips?.map((item: string, i: number) => (
                           <div key={i} className="flex gap-3 items-start">
                             <CheckCircle2 className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                             <p className="text-sm text-white/80">{item}</p>
                           </div>
                         ))}
                      </div>
                   </Card>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-emerald-500/5 border-emerald-500/20">
                         <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400 uppercase tracking-widest mb-4">
                            <Calendar size={18} /> Best Posting Time
                         </h3>
                         <p className="text-sm text-white/70 font-medium">{analysis.bestPostingTime}</p>
                      </Card>

                      <Card className="bg-blue-500/5 border-blue-500/20">
                         <h3 className="text-sm font-bold flex items-center gap-2 text-blue-400 uppercase tracking-widest mb-4">
                            <Target size={16} /> Content Strategy
                         </h3>
                         <p className="text-sm text-white/70 italic border-l-2 border-blue-400 pl-4">
                            {analysis.contentStrategy}
                         </p>
                      </Card>
                   </div>

                   <Card className="bg-purple-500/5 border-purple-500/20">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-purple-400 uppercase tracking-widest mb-4">
                         <Sparkles size={16} /> Viral Content Idea
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed font-semibold">
                         {analysis.viralContentIdea}
                      </p>
                   </Card>

                   <Card className="bg-indigo-500/5 border-indigo-500/20">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-indigo-400 uppercase tracking-widest mb-4">
                        <Lightbulb size={16} /> Hashtag or SEO Tip
                      </h3>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                         <span className="text-sm text-white/80">{analysis.hashtagSeoTip}</span>
                         <ArrowRight size={14} className="text-white/20 group-hover:text-indigo-400 transition-colors" />
                      </div>
                   </Card>
                </div>

                {/* Global Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="glass" className="gap-2" onClick={handleCopy}>
                    {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy Analysis'}
                  </Button>
                  <Button variant="glass" className="gap-2">
                    <Download size={16} /> Download PDF
                  </Button>
                  <Button variant="glass" className="gap-2" onClick={startAnalysis}>
                    <RefreshCw size={16} /> Re-Analyze (2 Credits)
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
