"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { 
  MessageSquare, 
  Copy, 
  RefreshCw, 
  BarChart2, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Sparkles,
  Instagram,
  Youtube,
  Music2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { generateCaptionThunk, generateCaptionSlice } from '@/store/apis';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';

export default function CaptionGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Motivational');
  const [platform, setPlatform] = useState('Instagram');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: captionData, loading: isGenerating, error } = useSelector((state: RootState) => state.generateCaption);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  
  useEffect(() => {
    dispatch(generateCaptionSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = () => {
    dispatch(generateCaptionThunk({ topic, tone, platform }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const results = captionData?.options || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Caption Generator"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MessageSquare className="text-blue-400" /> Caption Generator
        </h1>
        <p className="text-white/40 mt-1">Generate viral Instagram & TikTok captions that drive engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit space-y-6">
          <div className="space-y-4">
            <Input 
              label="What's your post about?" 
              placeholder="e.g. 5 morning habits for success"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <Select
              label="Tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              options={[
                { value: 'Motivational', label: 'Motivational' },
                { value: 'Funny', label: 'Funny' },
                { value: 'Educational', label: 'Educational' },
                { value: 'Storytelling', label: 'Storytelling' },
                { value: 'Curiosity', label: 'Curiosity' }
              ]}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Social Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Instagram', icon: Instagram, label: 'Reels' },
                  { id: 'YouTube Shorts', icon: Youtube, label: 'Shorts' },
                  { id: 'TikTok', icon: Music2, label: 'TikTok' }
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
          </div>

          <Button 
            className="w-full shadow-lg shadow-primary/25" 
            size="lg"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!topic || (statsData?.credits <= 0 && statsData?.plan === 'free')}
          >
            Generate Captions
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

        <div className="lg:col-span-2 space-y-4">
           {results.length === 0 && !isGenerating ? (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/20">
                <MessageSquare size={48} className="mb-4 opacity-50" />
                <p>Generated captions will appear here</p>
              </div>
           ) : (
             <>
               <Card className="p-6 border-primary/20 bg-primary/5 mb-6">
                 <div className="flex items-center gap-3 mb-4">
                   <Sparkles className="text-primary" size={20} />
                   <h3 className="font-bold">Recommended Hook & Hashtags</h3>
                 </div>
                 <div className="space-y-4">
                   <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Viral Hook</p>
                      <p className="text-sm font-medium">{captionData.hook}</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Hashtags</p>
                      <div className="flex flex-wrap gap-2">
                        {captionData.hashtags.map((h: string) => (
                          <span key={h} className="text-xs text-white/60">{h}</span>
                        ))}
                      </div>
                   </div>
                 </div>
               </Card>

               <div className="space-y-4">
                  {results.map((caption: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group p-5 hover:border-primary/30">
                         <div className="flex items-start justify-between gap-4">
                            <p className="text-sm leading-relaxed text-white/90 whitespace-pre-wrap">{caption}</p>
                            <button 
                              onClick={() => handleCopy(caption, `cap-${index}`)}
                              className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                                copiedId === `cap-${index}` 
                                ? 'bg-emerald-500/20 text-emerald-500' 
                                : 'bg-white/5 text-white/40 hover:text-white'
                              }`}
                            >
                              {copiedId === `cap-${index}` ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            </button>
                         </div>
                      </Card>
                    </motion.div>
                  ))}
               </div>

               {/* Generate More Action */}
               <div className="flex flex-col items-center justify-center py-8 gap-4 border-t border-white/5">
                 <p className="text-sm text-white/40">Need more variations? Try again.</p>
                 <Button 
                   onClick={handleGenerate} 
                   isLoading={isGenerating}
                   className="gap-2 px-8"
                   variant="glass"
                 >
                   <Zap size={18} className="text-primary" /> Generate More (1 Credit)
                 </Button>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
}
