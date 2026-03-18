"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCw, 
  TrendingUp, 
  Check, 
  AlertCircle,
  Hash,
  Zap,
  BarChart4,
  Upload,
  FileVideo,
  Clock,
  Activity,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { 
  generateCaptionThunk, 
  analyzeViralScoreThunk, 
  improveCaptionThunk,
  analyzeVideoViralScoreThunk,
  getStatsThunk
} from '@/store/apis';
import { UpgradeModal } from './UpgradeModal';
import { CreditErrorDisplay } from './CreditErrorDisplay';

export const ContentWorkflow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData } = useSelector((state: RootState) => state.me);
  
  // Caption Generator State
  const [captionInput, setCaptionInput] = useState({
    topic: '',
    tone: 'Motivational',
    platform: 'Instagram'
  });
  const [captionResult, setCaptionResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Viral Analyzer State
  const [analysisInput, setAnalysisInput] = useState({
    caption: '',
    hook: '',
    topic: ''
  });
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
 
  // Video Analysis State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoHashtags, setVideoHashtags] = useState('');
  const [videoCaption, setVideoCaption] = useState('');
  const [isVideoAnalyzing, setIsVideoAnalyzing] = useState(false);
  const [videoResult, setVideoResult] = useState<any>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [captionError, setCaptionError] = useState<any>(null);
  const [videoError, setVideoError] = useState<any>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const onGenerateCaption = async () => {
    if (!captionInput.topic) return;
    setIsGenerating(true);
    const result = await dispatch(generateCaptionThunk(captionInput));
    if (generateCaptionThunk.fulfilled.match(result)) {
      setCaptionResult(result.payload);
      setCaptionError(null);
      // Auto-fill analyzer with the best caption and hook
      setAnalysisInput({
        caption: result.payload.options[0],
        hook: result.payload.hook,
        topic: captionInput.topic
      });
      dispatch(getStatsThunk({}));
    } else if (generateCaptionThunk.rejected.match(result)) {
      const err = result.payload as any;
      setCaptionError(err);
      const errStr = typeof err === 'string' ? err : err?.error || '';
      if (
        errStr.includes('Insufficient credits') || 
        errStr.includes('locked in your current plan') ||
        errStr.includes('Upgrade to unlock')
      ) {
        setModalMessage(errStr);
        setUpgradeModalOpen(true);
      }
    }
    setIsGenerating(false);
  };

  const onAnalyzeViralScore = async () => {
    if (!analysisInput.caption || !analysisInput.hook) return;
    setIsAnalyzing(true);
    const result = await dispatch(analyzeViralScoreThunk(analysisInput));
    if (analyzeViralScoreThunk.fulfilled.match(result)) {
      setAnalysisResult(result.payload);
      dispatch(getStatsThunk({}));
    }
    setIsAnalyzing(false);
  };

  const onImproveCaption = async (target: 'text' | 'video' = 'text') => {
    const currentCaption = target === 'video' ? videoCaption : analysisInput.caption;
    if (!currentCaption) return;
    setIsImproving(true);
    const result = await dispatch(improveCaptionThunk({ caption: currentCaption }));
    if (improveCaptionThunk.fulfilled.match(result)) {
      const payload = result.payload;
      if (target === 'video') {
        setVideoCaption(payload.improvedCaption);
        if (videoResult) {
          setVideoResult({
            ...videoResult,
            viralScore: payload.improvedScore,
            captionScore: 92,
            reachPotential: "Very High"
          });
        }
      } else {
        setAnalysisInput({ ...analysisInput, caption: payload.improvedCaption });
        setAnalysisResult({
          ...analysisResult,
          viralScore: payload.improvedScore,
          originalScore: payload.originalScore,
          improvements: ["Optimized for engagement", "Enhanced curiosity gap"]
        });
      }
      dispatch(getStatsThunk({}));
    }
    setIsImproving(false);
  };

  const onAnalyzeVideo = async () => {
    if (!videoFile) return;
    setIsVideoAnalyzing(true);
    
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('caption', videoCaption);
    formData.append('hashtags', videoHashtags);

    const result = await dispatch(analyzeVideoViralScoreThunk(formData));
    if (analyzeVideoViralScoreThunk.fulfilled.match(result)) {
      setVideoResult(result.payload);
      setVideoError(null);
      dispatch(getStatsThunk({}));
    } else if (analyzeVideoViralScoreThunk.rejected.match(result)) {
      const err = result.payload as any;
      setVideoError(err);
      const errStr = typeof err === 'string' ? err : err?.error || '';
      if (
        errStr.includes('Insufficient credits') || 
        errStr.includes('locked in your current plan') ||
        errStr.includes('Upgrade to unlock')
      ) {
        setModalMessage(errStr);
        setUpgradeModalOpen(true);
      }
    }
    setIsVideoAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 lg:p-8 bg-[#030014] text-white">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="AI Content Tools"
        requiredPlan="Pro Creator"
        message={modalMessage}
      />
      {/* Left Panel - Instagram Caption Generator */}
      <Card className="p-6 border-white/5 bg-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Instagram Caption Generator</h2>
            <p className="text-xs text-white/40">1 Credit per generation</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60">Topic / Video Idea</label>
            <Input 
              placeholder="Example: Fitness tips for beginners"
              value={captionInput.topic}
              onChange={(e) => setCaptionInput({...captionInput, topic: e.target.value})}
              className="bg-black/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Tone</label>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-primary outline-none"
                value={captionInput.tone}
                onChange={(e) => setCaptionInput({...captionInput, tone: e.target.value})}
              >
                {['Motivational', 'Funny', 'Educational', 'Storytelling', 'Curiosity'].map(tone => (
                  <option key={tone} value={tone} className="bg-[#030014]">{tone}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Platform</label>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-primary outline-none"
                value={captionInput.platform}
                onChange={(e) => setCaptionInput({...captionInput, platform: e.target.value})}
              >
                {['Instagram', 'YouTube Shorts', 'TikTok'].map(plat => (
                  <option key={plat} value={plat} className="bg-[#030014]">{plat}</option>
                ))}
              </select>
            </div>
          </div>

          <Button 
            className="w-full h-12 gap-2 text-sm font-bold shadow-lg shadow-primary/20"
            onClick={onGenerateCaption}
            isLoading={isGenerating}
            disabled={!captionInput.topic}
          >
            <Send size={18} /> Generate Caption
          </Button>

          <AnimatePresence>
            {captionError && (
              <CreditErrorDisplay 
                error={captionError} 
                onUpgradeClick={() => setUpgradeModalOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Caption Results */}
        <AnimatePresence>
          {captionResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6 pt-6 border-t border-white/5"
            >
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Caption Options</h3>
                {captionResult.options.map((cap: string, idx: number) => (
                  <div key={idx} className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                    <p className="text-sm text-white/80 leading-relaxed pr-8">{cap}</p>
                    <button 
                      onClick={() => handleCopy(cap, `cap-${idx}`)}
                      className="absolute top-4 right-4 text-white/40 hover:text-primary transition-colors"
                    >
                      {copyStatus === `cap-${idx}` ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-1 uppercase tracking-wider">
                    <Zap size={14} /> Global Hook
                  </h4>
                  <p className="text-sm font-medium">{captionResult.hook}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-emerald-500 mb-2 flex items-center gap-1 uppercase tracking-wider">
                    <Hash size={14} /> Hashtags
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {captionResult.hashtags.map((h: string) => (
                      <span key={h} className="text-xs text-white/60">{h}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleCopy(captionResult.hashtags.join(' '), 'tags')}
                    className="mt-2 text-[10px] text-emerald-500 hover:underline font-bold uppercase tracking-widest flex items-center gap-1"
                  >
                    {copyStatus === 'tags' ? <Check size={12} /> : <Copy size={12} />} Copy All
                  </button>
                </div>
              </div>

              <Button 
                variant="glass" 
                className="w-full gap-2"
                onClick={onGenerateCaption}
                isLoading={isGenerating}
              >
                <RefreshCw size={16} /> Regenerate
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Right Panel - Reel Viral Score Analyzer */}
      <Card className="p-6 border-white/5 bg-white/5 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
            <FileVideo size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Reel Viral Score Analyzer</h2>
            <p className="text-xs text-white/40">2 Credits per video analysis</p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {/* Upload Zone */}
          <div 
            onClick={() => document.getElementById('video-upload')?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
              videoFile ? 'border-secondary/50 bg-secondary/5' : 'border-white/10 hover:border-secondary/30 bg-white/[0.02]'
            }`}
          >
            <input 
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
            {videoFile ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3 text-secondary">
                  <Check size={24} />
                </div>
                <p className="text-sm font-bold text-white mb-1">{videoFile.name}</p>
                <p className="text-xs text-white/40">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-white/40">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-white/60 mb-1">Click to upload Reel/Video</p>
                <p className="text-xs text-white/30">MP4, MOV or WEBM (Max 50MB)</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Caption (Optional)</label>
                <Input 
                  placeholder="Paste video caption..."
                  value={videoCaption}
                  onChange={(e) => setVideoCaption(e.target.value)}
                  className="bg-black/20"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">Hashtags (Optional)</label>
                <Input 
                  placeholder="#viral #trending"
                  value={videoHashtags}
                  onChange={(e) => setVideoHashtags(e.target.value)}
                  className="bg-black/20"
                />
             </div>
          </div>

          <Button 
            className="w-full h-12 gap-2 text-sm font-bold bg-gradient-to-r from-secondary to-purple-600 shadow-lg shadow-secondary/20"
            onClick={onAnalyzeVideo}
            isLoading={isVideoAnalyzing}
            disabled={!videoFile}
          >
            <Activity size={18} /> Analyze Video Potential
          </Button>

          <AnimatePresence>
            {videoError && (
              <CreditErrorDisplay 
                error={videoError} 
                onUpgradeClick={() => setUpgradeModalOpen(true)}
              />
            )}
          </AnimatePresence>

          {/* Video Analysis Results */}
          <AnimatePresence>
            {videoResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-6 pt-6 border-t border-white/5"
              >
                {/* Viral Score & Reach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Viral Potential</p>
                     <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-secondary">{videoResult.viralScore}</span>
                        <span className="text-lg font-bold text-white/20">/100</span>
                     </div>
                     <div className="absolute inset-0 bg-secondary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Reach Potential</p>
                     <p className={`text-xl font-bold ${
                       videoResult.reachPotential === 'High' ? 'text-emerald-400' : 
                       videoResult.reachPotential === 'Medium' ? 'text-amber-400' : 'text-red-400'
                     }`}>
                       {videoResult.reachPotential}
                     </p>
                  </div>
                </div>

                {/* Granular Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Hook', score: videoResult.hookScore, icon: Zap, color: 'text-primary' },
                    { label: 'Caption', score: videoResult.captionScore, icon: Send, color: 'text-blue-400' },
                    { label: 'Hashtag', score: videoResult.hashtagScore, icon: Hash, color: 'text-emerald-400' },
                    { label: 'Engage', score: videoResult.engagementScore, icon: Activity, color: 'text-purple-400' }
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                      <div className={`w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2 ${item.color}`}>
                        <item.icon size={12} />
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase mb-1">{item.label}</p>
                      <p className="text-sm font-black">{item.score}%</p>
                    </div>
                  ))}
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                       <Award size={12} /> Key Strengths
                    </h4>
                    <ul className="space-y-2">
                       {videoResult.strengths.map((s: string) => (
                         <li key={s} className="text-[11px] text-white/60 flex items-start gap-2 leading-relaxed">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5" />
                            {s}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2">
                       <AlertCircle size={12} /> To Improve
                    </h4>
                    <ul className="space-y-2">
                       {videoResult.improvements.map((i: string) => (
                         <li key={i} className="text-[11px] text-white/60 flex items-start gap-2 leading-relaxed">
                            <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5" />
                            {i}
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-[11px] text-white/40">
                      <span className="flex items-center gap-1"><Clock size={12} /> {videoResult.metadata?.duration}s</span>
                      <span className="flex items-center gap-1"><Activity size={12} /> Reach: {videoResult.reachPotential}</span>
                   </div>
                   <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                    onClick={() => onImproveCaption('video')}
                    isLoading={isImproving}
                  >
                    <Sparkles size={12} className="mr-1.5" /> Boost Score
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};
