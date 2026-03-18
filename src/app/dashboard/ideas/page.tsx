"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lightbulb, Sparkles, Copy, MessageSquare, Plus, Star, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { generateIdeasThunk, generateIdeasSlice } from '@/store/apis';
import Link from 'next/link';
import { CreditErrorDisplay } from '@/components/dashboard/CreditErrorDisplay';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';

export default function ContentIdeas() {
  const [niche, setNiche] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { data: ideasData, loading: isGenerating, error } = useSelector((state: RootState) => state.generateIdeas);

  useEffect(() => {
    dispatch(generateIdeasSlice.actions.reset());
  }, [dispatch]);

  const handleGenerate = () => {
    dispatch(generateIdeasThunk({ topic: niche }));
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const rawIdeas = ideasData?.ideas || [];
  const ideas = rawIdeas.map((item: any) => item.title || item);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        featureName="Infinite Content Ideas"
        requiredPlan="Pro Creator"
        message={typeof error === 'string' ? error : error?.error}
      />
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6">
          <Lightbulb size={32} />
        </div>
        <h1 className="text-4xl font-bold">Infinite Content <span className="text-gradient">Ideas</span></h1>
        <p className="text-white/40 mt-2 max-w-lg mx-auto">Enter your niche or topic and we&apos;ll generate viral post ideas for you.</p>
      </div>

      <Card className="overflow-visible space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
             <Input 
                placeholder="Enter your niche (e.g. Web Development, Fitness, Cooking)" 
                className="h-14 bg-white/5"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
             />
          </div>
          <Button 
            className="h-14 px-8" 
            isLoading={isGenerating}
            onClick={handleGenerate}
            disabled={!niche}
          >
            Generate Ideas
          </Button>
        </div>

        <AnimatePresence>
          {error && (
            <CreditErrorDisplay 
              error={error} 
              onUpgradeClick={() => setUpgradeModalOpen(true)}
            />
          )}
        </AnimatePresence>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <AnimatePresence mode="popLayout">
           {ideas.map((idea: string, index: number) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.05 }}
             >
               <Card className="h-full flex flex-col justify-between p-5 hover:border-emerald-500/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Post Idea #{index + 1}</span>
                       <Star size={14} className="text-amber-400 opacity-30" />
                    </div>
                    <p className="text-lg font-bold leading-snug">{idea.replace('[Niche]', niche || 'Your Niche')}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                     <div className="flex gap-2">
                        <button className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1">
                           <MessageSquare size={12} /> Outline
                        </button>
                        <button className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1">
                           <Sparkles size={12} /> Script
                        </button>
                     </div>
                     <button 
                        onClick={() => handleCopy(idea.replace('[Niche]', niche || 'Your Niche'), index)}
                        className={`p-1.5 rounded-md transition-all ${
                          copiedId === index 
                          ? 'bg-emerald-500/20 text-emerald-500' 
                          : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        {copiedId === index ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      </button>
                  </div>
               </Card>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>

      {ideas.length > 0 && (
        <div className="flex justify-center mt-12">
           <Button variant="glass" className="gap-2" onClick={handleGenerate}>
              <Sparkles size={18} /> Generate More Ideas (1 Credit)
           </Button>
        </div>
      )}
    </div>
  );
}
