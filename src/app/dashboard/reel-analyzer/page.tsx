"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Upload, 
  Video, 
  CheckCircle2, 
  Zap, 
  Brain, 
  TrendingUp,
  Activity,
  Award,
  MoreHorizontal,
  Play,
  Share2,
  Trash2,
  Sparkles,
  MessageSquare,
  BarChart3,
  Flame,
  Clock,
  Target,
  Copy,
  ChevronRight,
  Send,
  Hash
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { analyzeVideoViralScoreThunk, analyzeVideoViralScoreSlice } from '@/store/apis';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  Cell, 
  AreaChart, 
  Area,
  XAxis,
  YAxis
} from 'recharts';
import { useRouter } from 'next/navigation';

// Mini chart data
const hookData = [
  { val: 30 }, { val: 45 }, { val: 38 }, { val: 65 }, { val: 80 }, { val: 88 }
];

const retentionData = [
  { val: 98 }, { val: 95 }, { val: 92 }, { val: 88 }, { val: 85 }, { val: 82 }, { val: 80 }
];

const algoData = [
  { val: 40 }, { val: 60 }, { val: 20 }, { val: 85 }, { val: 50 }, { val: 90 }
];

const GaugeChart = ({ score, status }: { score: number, status: string }) => {
  // Color feedback logic
  const getColor = (s: number) => {
    if (s <= 40) return "#f87171"; // Red
    if (s <= 70) return "#fbbf24"; // Yellow
    return "#22c55e"; // Green
  };

  const chartColor = getColor(score);
  
  return (
    <div className="flex flex-col items-center justify-center relative py-6">
      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
        <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-white/5"
            strokeDasharray="283"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={chartColor}
            strokeWidth="12"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 * (1 - (score / 100)) }}
            transition={{ duration: 2.5, ease: "circOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="flex items-baseline gap-1">
             <motion.span 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-7xl md:text-8xl font-black text-white"
             >
               {score}
             </motion.span>
             <span className="text-white/30 font-bold text-xl">/100</span>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20">Reel Viral Score</span>
            <span className="font-black tracking-[0.25em] mt-1 text-sm md:text-base" style={{ color: chartColor }}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ 
  title, 
  score, 
  rating, 
  type, 
  data, 
  color,
  desc 
}: { 
  title: string, 
  score: string, 
  rating: string, 
  type: 'bar' | 'area', 
  data: any[],
  color: string,
  desc: string
}) => (
  <Card className="p-5 bg-white/[0.02] border-white/5 space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/40">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-black text-white">{score}</span>
          <span className={`text-[10px] font-bold ${color}`}>| {rating}</span>
        </div>
      </div>
    </div>
    
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data}>
            <Bar dataKey="val" radius={[2, 2, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={index === data.length - 1 ? color.split(' ')[0].replace('text-', '#').replace('primary', '#22d3ee').replace('secondary', '#22c55e').replace('purple-400', '#a855f7') : 'rgba(255,255,255,0.1)'} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#22c55e" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
    
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[8px] font-black text-white/20 uppercase tracking-tighter">
        <span>Low</span>
        <span>High</span>
      </div>
      <p className="text-[10px] text-white/40 leading-relaxed font-medium pt-2 border-t border-white/5">
        {desc}
      </p>
    </div>
  </Card>
);

const SuggestionCard = ({ 
  title, 
  desc, 
  action, 
  icon: Icon, 
  color, 
  bgColor, 
  borderColor,
  onAction 
}: { 
  title: string, 
  desc: string, 
  action: string, 
  icon: any, 
  color: string, 
  bgColor: string, 
  borderColor: string,
  onAction?: () => void
}) => (
  <Card className={`p-4 flex flex-col gap-3 border ${borderColor} ${bgColor} group transition-all hover:bg-white/[0.05]`}>
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 shrink-0 rounded-lg ${bgColor} border ${borderColor} flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <h4 className="text-[13px] font-black text-white truncate">{title}</h4>
    </div>
    <p className="text-[11px] text-white/40 leading-snug font-medium line-clamp-2 min-h-[2rem]">
      {desc}
    </p>
    <Button 
      variant="glass" 
      size="sm" 
      onClick={onAction}
      className={`w-full text-[10px] font-black uppercase tracking-widest h-11 bg-white/[0.03] hover:bg-white/[0.08] ${color} border-${color.split('-')[1]}/20`}
    >
      {action}
    </Button>
  </Card>
);

export default function ReelAnalyzer() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [platform, setPlatform] = useState('Instagram Reels');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: analysisData, loading: isAnalyzing, error } = useSelector((state: RootState) => state.analyzeVideoViralScore);

  useEffect(() => {
    dispatch(analyzeVideoViralScoreSlice.actions.reset());
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(newFile));
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('video', file);
    formData.append('caption', caption);
    formData.append('hashtags', hashtags);
    formData.append('platform', platform);
    dispatch(analyzeVideoViralScoreThunk(formData));
  };

  const handleReset = () => {
    setFile(null);
    setCaption('');
    setHashtags('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIsPlaying(false);
    dispatch(analyzeVideoViralScoreSlice.actions.reset());
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Reel Viral Score Analyzer"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />

      {/* Internal Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                <Brain size={24} />
             </div>
             <h1 className="text-xl md:text-2xl font-black tracking-tight">Reel Viral Score Analyzer</h1>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
           <div className="flex items-center gap-3 pl-0 md:pl-4 border-none md:border-l border-white/10 order-2 md:order-1">
              <div className="relative">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 border-2 border-slate-900" />
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40">
                    JD
                 </div>
              </div>
              <div className="text-left">
                 <p className="text-xs font-bold text-white leading-none">Alex R.</p>
                 <p className="text-[10px] text-white/30 font-medium">Premium User</p>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 relative">
        {/* Mobile-First Preview (Shows first on mobile when file exists) */}
        {previewUrl && (
          <div className="lg:hidden order-1 px-2">
             <div className="relative aspect-[9/16] w-[75%] mx-auto rounded-3xl overflow-hidden border border-white/10 bg-black group shadow-2xl">
                <video 
                  ref={videoRef}
                  src={previewUrl} 
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  loop
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div 
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform active:scale-90"
                  >
                    {isPlaying ? <Activity size={24} className="animate-pulse" /> : <Play size={24} fill="currentColor" />}
                  </div>
                </div>
             </div>
          </div>
        )}
        {/* Configuration & Inputs - Moved at bottom on Mobile if analyzed */}
        <div className={`lg:col-span-4 space-y-6 ${analysisData ? 'order-4' : 'order-1'} lg:order-1`}>
          <Card className="p-5 md:p-6 bg-white/[0.03] border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] font-black text-white uppercase tracking-widest opacity-60">Reel Configuration</h3>
              {file && (
                <button onClick={handleReset} className="text-white/20 hover:text-white transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* 1. Upload Section */}
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">1. Video Source</label>
                 {!previewUrl ? (
                   <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center group transition-all hover:bg-white/[0.03] hover:border-primary/50">
                     <input type="file" accept="video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 transition-transform">
                       <Upload size={20} />
                     </div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Select Video</p>
                   </div>
                 ) : (
                   <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                         <Video size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[10px] font-black text-white truncate uppercase tracking-widest">{file?.name}</p>
                         <p className="text-[9px] text-primary/60 font-bold uppercase">Ready for Scan</p>
                      </div>
                   </div>
                 )}
              </div>

              {/* 2. Caption context */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">2. Caption Context</label>
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Paste your caption here..."
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-white/20 h-24 outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              
              {/* 3. Hashtags */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">3. Hashtags</label>
                <input 
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#viral #creator"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 h-11 text-xs text-white outline-none focus:border-primary/50"
                />
              </div>

              {/* 4. Platform */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">4. Platform</label>
                <div className="flex gap-2">
                  {['Instagram', 'TikTok', 'Shorts'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`flex-1 h-11 rounded-xl text-[10px] font-black uppercase transition-all ${
                        platform.includes(p) 
                          ? 'bg-primary text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                          : 'bg-white/[0.03] border border-white/10 text-white/40 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Analyze Button (Desktop Only) */}
              {!isAnalyzing && !analysisData && (
                <Button 
                  className="w-full bg-primary text-slate-950 text-[10px] font-black uppercase h-11 shadow-lg active:scale-95 transition-all hidden lg:flex" 
                  onClick={startAnalysis} 
                  disabled={!file}
                >
                  Analyze Potential
                </Button>
              )}

              {/* Video Metrics Section (Restored) */}
              {file && (
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-primary" />
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-white/60">Video Metrics</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Duration', val: '45s' },
                      { label: 'Format', val: '9:16' },
                      { label: 'Hook Win', val: '3s' },
                      { label: 'Platform', val: platform }
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">{m.label}</p>
                        <p className="text-[11px] font-bold text-white">{m.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Video Preview Card (Desktop Only) */}
              {previewUrl && (
                <div className="hidden lg:block space-y-4 pt-6 mt-6 border-t border-white/5">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <Video size={14} className="text-primary" />
                         <h4 className="text-[11px] font-black uppercase tracking-widest text-white/60">6. Video Preview</h4>
                      </div>
                   </div>
                   <div className="relative aspect-[9/16] w-[70%] lg:w-full mx-auto rounded-3xl overflow-hidden border border-white/10 bg-black group shadow-2xl">
                      <video 
                        ref={videoRef}
                        src={previewUrl} 
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        loop
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div 
                          onClick={togglePlay}
                          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                        >
                          {isPlaying ? <Activity size={24} className="animate-pulse" /> : <Play size={24} fill="currentColor" />}
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Results Dashboard (Right Column) */}
        <div className={`lg:col-span-8 space-y-6 ${analysisData ? 'order-3' : 'order-1'} lg:order-2`}>
          {isAnalyzing ? (
            <Card className="p-12 bg-white/[0.03] border-white/5 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">AI Scoring...</h3>
            </Card>
          ) : analysisData ? (
            <Card className="p-5 md:p-8 bg-white/[0.03] border-white/5 space-y-8">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                 <span>Analysis Report</span>
                 <button className="hover:text-white transition-colors" onClick={handleReset}>Reset</button>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10">
                 {/* Main Gauge & Verdict */}
                 <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="scale-110 md:scale-125">
                      <GaugeChart 
                        score={analysisData?.score} 
                        status={analysisData?.score >= 90 ? "EXCEPTIONAL" : analysisData?.score >= 70 ? "VERY GOOD" : "GOOD"} 
                      />
                    </div>
                    
                    <Card className="p-5 bg-purple-500/[0.02] border-purple-500/10 w-full">
                       <div className="flex items-center gap-2 mb-3">
                          <Zap size={14} className="text-purple-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">AI Verdict</span>
                       </div>
                       <p className="text-xs text-white/60 leading-relaxed font-medium line-clamp-3">
                          {analysisData?.verdict || "This reel shows high viral potential. The strong visual pacing and clear hook position it well for the current algorithm."}
                       </p>
                    </Card>
                 </div>

                 {/* Performance Insights - Horizontal Scroll on Mobile */}
                 <div className="space-y-6">
                    <p className="text-sm font-black text-white uppercase tracking-widest opacity-60">Key Performance DNA</p>
                    <div className="flex lg:grid lg:grid-cols-1 gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0">
                       <div className="min-w-[285px] lg:min-w-full snap-center">
                          <InsightCard 
                             title="1. Hook Strength" 
                             score={`${analysisData?.sections?.find((s: any) => s.label === 'Hook Strength')?.score || 88}%`}
                             rating={analysisData?.sections?.find((s: any) => s.label === 'Hook Strength')?.score >= 80 ? "Peak" : "Improving"} 
                             type="bar" 
                             data={hookData} 
                             color="text-primary" 
                             desc="The opening segment has moderate engagement. Using a curiosity-based hook could increase watch retention."
                          />
                       </div>
                       <div className="min-w-[285px] lg:min-w-full snap-center">
                          <InsightCard 
                             title="2. Retention" 
                             score={`${analysisData?.sections?.find((s: any) => s.label === 'Watch Retention')?.score || 94}%`}
                             rating={analysisData?.sections?.find((s: any) => s.label === 'Watch Retention')?.score >= 80 ? "Optimal" : "Very High"} 
                             type="area" 
                             data={retentionData} 
                             color="text-emerald-500" 
                             desc="The pacing and visual changes maintain viewer attention well throughout the video duration."
                          />
                       </div>
                       <div className="min-w-[285px] lg:min-w-full snap-center">
                          <InsightCard 
                             title="3. Algorithm DNA" 
                             score={`${analysisData?.sections?.find((s: any) => s.label === 'Shareability')?.score || 90}%`}
                             rating={analysisData?.sections?.find((s: any) => s.label === 'Shareability')?.score >= 80 ? "Peak" : "Low"} 
                             type="bar" 
                             data={algoData} 
                             color="text-purple-400" 
                             desc="Caption and CTA signals are strong, but could be optimized further for specific keyword triggers."
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Viral Growth Strategies - Horizontal Scroll on Mobile */}
              <div className="mt-12">
                 <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest opacity-60">Viral Growth Strategies</h3>
                 <div className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-3 pb-6 snap-x -mx-5 px-5 lg:mx-0 lg:px-0 scrollbar-hide">
                    <div className="min-w-[260px] lg:min-w-0 snap-center">
                      <SuggestionCard 
                        title="Improve Hook"
                        desc={analysisData?.suggestions?.[0] || "Shorten intro to < 3s, use strong visual hook."}
                        action="Generate Hooks"
                        icon={Sparkles}
                        color="text-primary"
                        bgColor="bg-primary/5"
                        borderColor="border-primary/10"
                        onAction={() => router.push('/dashboard/hooks')}
                      />
                    </div>
                    <div className="min-w-[260px] lg:min-w-0 snap-center">
                      <SuggestionCard 
                        title="Optimize Caption"
                        desc={analysisData?.suggestions?.[1] || "Add captions and sound cues during mid-roll transition."}
                        action="Generate Captions"
                        icon={MessageSquare}
                        color="text-emerald-500"
                        bgColor="bg-emerald-500/5"
                        borderColor="border-emerald-500/10"
                        onAction={() => router.push('/dashboard/captions')}
                      />
                    </div>
                    <div className="min-w-[260px] lg:min-w-0 snap-center">
                      <SuggestionCard 
                        title="Viral Keywords"
                        desc={analysisData?.suggestions?.[2] || "Include a compelling, specific CTA in the caption."}
                        action="Get Hashtags"
                        icon={Target}
                        color="text-purple-400"
                        bgColor="bg-purple-400/5"
                        borderColor="border-purple-400/10"
                        onAction={() => router.push('/dashboard/hashtags')}
                      />
                    </div>
                 </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 bg-white/[0.03] border-white/5 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-white/10 hidden lg:flex">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 mb-6">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready for Scan</h3>
              <p className="text-sm text-white/40 text-center max-w-xs">
                Upload your reel and configure metadata on the left to start the deep AI viral potential analysis.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Analytics Trigger */}
      <AnimatePresence>
        {file && !isAnalyzing && !analysisData && (
          <motion.div 
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-3xl border-t border-white/10 z-50 lg:hidden flex items-center justify-center pb-6 md:pb-4"
          >
            <Button 
              className="w-full bg-primary text-slate-950 font-black uppercase h-14 shadow-[0_0_40px_rgba(34,211,238,0.3)] active:scale-95 transition-transform"
              onClick={startAnalysis}
            >
              Analyze Reel Potential
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
