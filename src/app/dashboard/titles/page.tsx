"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Type, Copy, Bookmark, RefreshCw, BarChart2, AlertCircle, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { generateTitleThunk, generateTitleSlice } from '@/store/apis';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';

export default function TitleGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: titleData, loading: isGenerating, error } = useSelector((state: RootState) => state.generateTitle);

  useEffect(() => {
    dispatch(generateTitleSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = () => {
    dispatch(generateTitleThunk({ topic, platform }));
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const results = titleData?.titles || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Title Generator"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Type className="text-blue-400" /> Title Generator
        </h1>
        <p className="text-white/40 mt-1">Create viral, click-worthy titles for your videos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit space-y-6">
          <div className="space-y-4">
            <Input 
              label="What's your video about?" 
              placeholder="e.g. My morning routine"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Tone</label>
              <select className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                 <option>Controversial</option>
                 <option>Educational</option>
                 <option>Click-worthy</option>
                 <option>Professional</option>
                 <option>Humorous</option>
              </select>
            </div>
          </div>

          <Button 
            className="w-full shadow-lg shadow-blue-500/25" 
            variant="secondary"
            size="lg"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!topic}
          >
            Generate Titles
          </Button>

          {/* Error Feedback */}
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
                <Type size={48} className="mb-4 opacity-50" />
                <p>Generated titles will appear here</p>
              </div>
           ) : (
             <>
               <div className="grid grid-cols-1 gap-4">
                  {results.map((title: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group p-5 hover:border-blue-500/30">
                         <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-bold group-hover:text-blue-400 transition-colors">{title}</p>
                            <div className="flex gap-2">
                               <button 
                                 onClick={() => handleCopy(title, index)}
                                 className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                                   copiedId === index 
                                   ? 'bg-emerald-500/20 text-emerald-500' 
                                   : 'bg-white/5 text-white/40 hover:text-white'
                                 }`}
                               >
                                 {copiedId === index ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                 {copiedId === index && <span className="text-[10px] font-bold uppercase">Copied</span>}
                               </button>
                            </div>
                         </div>
                         <div className="mt-4 flex items-center gap-6">
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                               <BarChart2 size={14} />
                               Score: 98/100
                            </div>
                            <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">
                               Category: Search Optimized
                            </div>
                         </div>
                      </Card>
                    </motion.div>
                  ))}
               </div>

               {/* Generate More Action */}
               <div className="flex flex-col items-center justify-center py-8 gap-4 border-t border-white/5">
                 <p className="text-sm text-white/40">Not what you're looking for? Try again.</p>
                 <Button 
                   onClick={handleGenerate} 
                   isLoading={isGenerating}
                   className="gap-2 px-8"
                   variant="glass"
                 >
                   <Zap size={18} className="text-blue-400" /> Generate More (1 Credit)
                 </Button>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
}
