"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Lightbulb,
  Sparkles,
  Search,
  Brain
} from 'lucide-react';

const features = [
  {
    title: "Instagram Caption Generator",
    description: "Generate engaging captions that increase reach and engagement.",
    icon: Sparkles,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "Reel Viral Score Analyzer",
    description: "Predict the viral potential of your reel before posting.",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Script & Hook Analyzer",
    description: "Create scroll-stopping hooks and scripts for short-form videos.",
    icon: BarChart3,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Viral Title Generator",
    description: "Create click-worthy titles optimized for search and suggested algorithms.",
    icon: MessageSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Advanced Content Strategy",
    description: "Built-in intelligence to optimize every part of your social media workflow.",
    icon: Zap,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "AI Profile Analyzer",
    description: "Upload a profile screenshot for deep AI growth insights and niche positioning.",
    icon: Brain,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Modern Creators</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to create content that goes viral and builds a loyal audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full group">
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
