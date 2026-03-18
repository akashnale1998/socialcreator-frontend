"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Heart, 
  RefreshCw,
  ChevronDown,
  Star,
  Users,
  Zap,
  Instagram,
  Youtube,
  Music2,
  Hash
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { 
  generateCaptionThunk, 
  generateHookThunk, 
  generateHashtagsThunk, 
  generateTitleThunk 
} from '@/store/apis';

import Link from 'next/link';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const iconMap: any = {
  instagram: Instagram,
  youtube: Youtube,
  reel: Music2,
  hashtag: Hash
};

interface FAQ {
  question: string;
  answer: string;
}

interface ExampleOutput {
  text: string;
  type?: string;
}

interface FreeToolPageProps {
  toolName: string;
  title: string;
  description: string;
  platformIcon: string;
  placeholder: string;
  features: string[];
  faqs: FAQ[];
  exampleOutputs: ExampleOutput[];
  toolType: 'caption' | 'hook' | 'hashtag' | 'title';
}

export const FreeToolPage = ({
  toolName,
  title,
  description,
  platformIcon,
  placeholder,
  features,
  faqs,
  exampleOutputs,
  toolType
}: FreeToolPageProps) => {
  const [topic, setTopic] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTone, setSelectedTone] = useState('Exciting');
  const [selectedNiche, setSelectedNiche] = useState('Lifestyle');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Map toolType to slice
  const sliceMap = {
    caption: (state: RootState) => state.generateCaption,
    hook: (state: RootState) => state.generateHook,
    hashtag: (state: RootState) => state.generateHashtags,
    title: (state: RootState) => state.generateTitle,
  };

  const { data, loading, error } = useSelector(sliceMap[toolType]);

  const Icon = iconMap[platformIcon] || Sparkles;

  const handleGenerate = async () => {
    if (!topic) return;
    
    let action;
    if (toolType === 'caption') {
      action = generateCaptionThunk({ topic, tone: selectedTone, niche: selectedNiche });
    } else if (toolType === 'hook') {
      action = generateHookThunk({ topic, platform: 'instagram', audience: selectedNiche, hookStyle: selectedTone });
    } else if (toolType === 'hashtag') {
      action = generateHashtagsThunk({ topic, niche: selectedNiche });
    } else if (toolType === 'title') {
      action = generateTitleThunk({ topic, niche: selectedNiche });
    }

    if (action) {
      const result = await dispatch(action);
      if (result.meta.requestStatus === 'fulfilled') {
        setShowResult(true);
      }
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <Navbar />
      
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-12 md:mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold uppercase tracking-widest text-primary"
            >
              <Star size={14} className="fill-primary" /> Free AI Tools for Creators
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-bold tracking-tight px-4"
            >
              {title.split(' ').map((word, i) => (
                word === 'Instagram' || word === 'YouTube' || word === 'Viral' || word === 'Viral,' || word === 'AI' ? 
                <span key={i} className="text-gradient"> {word} </span> : 
                <span key={i}> {word} </span>
              ))}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4"
            >
              {description}
            </motion.p>
          </div>
        </section>

        {/* Tool Interaction Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 md:p-8 space-y-6 md:space-y-8 glass border-primary/20 bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{toolName}</h2>
                    <p className="text-xs text-white/40">Powered by SocialCreator Pro Models</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input 
                    label="What's your content about?"
                    placeholder={placeholder}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tone</label>
                       <select 
                          value={selectedTone}
                          onChange={(e) => setSelectedTone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none"
                       >
                          <option>Exciting</option>
                          <option>Professional</option>
                          <option>Funny</option>
                          <option>Mysterious</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Niche</label>
                       <select 
                          value={selectedNiche}
                          onChange={(e) => setSelectedNiche(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none"
                       >
                          <option>Lifestyle</option>
                          <option>Technology</option>
                          <option>Business</option>
                          <option>Motivation</option>
                       </select>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20"
                  onClick={handleGenerate}
                  isLoading={loading}
                  disabled={!topic || showResult}
                >
                  {showResult ? 'Generation Complete' : 'Generate Now'} <Sparkles size={20} className="ml-2" />
                </Button>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                  >
                    {typeof error === 'string' ? error : (error as any).error || 'An unexpected error occurred'}
                  </motion.div>
                )}

                <div className="flex items-center justify-center gap-8 pt-4 border-t border-white/5">
                   <div className="flex flex-col items-center">
                     <Users size={18} className="text-white/20 mb-1" />
                     <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">10k+ Users</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <Zap size={18} className="text-white/20 mb-1" />
                     <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Instant Result</span>
                   </div>
                </div>
              </Card>
            </motion.div>

            {/* Output / Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col h-full"
            >
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[300px] md:min-h-[400px] rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-8 md:p-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Zap size={32} className="text-white/10" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white/40">Ready to Create?</h3>
                    <p className="text-sm text-white/20 max-w-xs">Enter your topic on the left to see how AI can transform your social media presence.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 h-full"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                       <h3 className="text-lg font-bold flex items-center gap-2">
                          <CheckCircle2 className="text-emerald-500" /> Viral Results
                       </h3>
                       <button onClick={() => { setShowResult(false); setTopic(''); }} className="text-xs text-primary font-bold flex items-center gap-1 hover:underline w-fit">
                          <RefreshCw size={12} /> Start Over
                       </button>
                    </div>

                    <div className="space-y-4">
                      {(() => {
                        let results: any[] = [];
                        if (data?.options) results = data.options;
                        else if (data?.hooks) results = data.hooks;
                        else if (data?.titles) results = data.titles;
                        else if (data?.viral || data?.medium || data?.niche) {
                          results = [...(data.viral || []), ...(data.medium || []), ...(data.niche || [])];
                        }
                        
                        return results.map((result, i) => {
                          const resultText = typeof result === 'string' ? result : (result.text || result.content || result.title);
                          return (
                            <Card key={i} className="p-6 relative group border-white/10 hover:border-primary/30 transition-all">
                               <p className="text-base text-white/90 leading-relaxed mb-4">
                                 {resultText}
                               </p>
                               <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Efficiency Score: 98%</span>
                                  <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-colors">
                                      <Heart size={16} />
                                    </button>
                                    <button 
                                    onClick={() => handleCopy(resultText, i)}
                                    className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                                      copiedId === i 
                                      ? 'bg-emerald-500/20 text-emerald-500' 
                                      : 'bg-white/5 text-white/40 hover:text-white'
                                    }`}
                                  >
                                    {copiedId === i ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    {copiedId === i && <span className="text-[10px] font-bold uppercase transition-all">Copied</span>}
                                  </button>
                                  </div>
                               </div>
                            </Card>
                          );
                        });
                      })()}
                    </div>

                    {/* Upsell Card */}
                    <Card className="p-6 md:p-8 bg-gradient-to-br from-primary to-secondary border-none shadow-2xl shadow-primary/30 mt-auto">
                        <div className="flex flex-col items-center text-center space-y-4">
                           <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                              <Sparkles className="text-white" />
                           </div>
                           <h3 className="text-2xl font-bold">Want Unlimited Access?</h3>
                           <p className="text-white/80 text-sm">Join 10,000+ creators and get 500+ AI generations every month.</p>
                           <Link href="/signup" className="w-full">
                              <Button variant="glass" className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold border-none shadow-lg">
                                 Get Started for Free <ArrowRight size={18} className="ml-2" />
                              </Button>
                           </Link>
                        </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 mb-32">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Why use our <span className="text-gradient">AI {toolName}</span>?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {features.map((feature, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <CheckCircle2 size={20} />
                       </div>
                       <p className="text-white/70 font-medium leading-relaxed">{feature}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Common Questions</h2>
            <div className="space-y-4">
               {faqs.map((faq, i) => (
                 <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors gap-4"
                    >
                       <span className="font-bold text-sm md:text-base">{faq.question}</span>
                       <ChevronDown size={20} className={`flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                       {openFaq === i && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 text-white/50 text-sm leading-relaxed">
                               {faq.answer}
                            </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 mb-12">
           <div className="max-w-5xl mx-auto min-h-[300px] md:h-[400px] rounded-[30px] md:rounded-[40px] relative overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-8 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-primary/20 blur-[80px] md:blur-[100px] -z-10" />
              
              <div className="relative z-10 space-y-4 md:space-y-6">
                 <h2 className="text-3xl md:text-5xl font-bold">Ready to Go Viral?</h2>
                 <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto">
                    Join 10,000+ creators who use SocialCreator AI to grow their audience on Instagram and YouTube.
                 </p>
                 <Link href="/signup">
                    <Button size="lg" className="px-8 md:px-12 h-14 md:h-16 text-lg rounded-xl md:rounded-2xl shadow-2xl shadow-primary/30">
                       Start Creating For Free <ArrowRight size={20} className="ml-2" />
                    </Button>
                 </Link>
                 <p className="text-[10px] uppercase font-bold text-white/20 tracking-[0.3em]">No credit card required</p>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
