"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { AnimatedDemo } from './AnimatedDemo';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium text-purple-300 border border-purple-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>The AI-Powered Revolution for Creators</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Create Viral <span className="text-gradient">Instagram & YouTube</span> Content in Seconds with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl"
          >
            Generate captions, hooks, hashtags, and predict your reel’s viral potential using SocialCreator AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 px-8">
                  Start Creating Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/#demo">
                <Button variant="glass" size="lg" className="gap-2 px-8">
                  <Play className="w-5 h-5 fill-white" /> Watch Demo
                </Button>
              </Link>
            </div>
            
            <p className="text-white/40 text-sm flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary" />
              No credit card required
              <span className="w-1 h-1 rounded-full bg-primary" />
              Start generating content instantly
            </p>
          </motion.div>

          {/* Animated Product Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 w-full relative"
          >
            {/* Section label */}
            <div className="flex flex-col items-center mb-6 gap-1">
              <p className="text-base md:text-lg font-bold text-white">
                See How It Works in Seconds ⚡
              </p>
              <p className="text-white/40 text-sm">
                Upload your reel and get instant viral insights powered by AI
              </p>
            </div>
            <AnimatedDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
