"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Instagram, Youtube } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Tech YouTuber (500k+)",
    content: "The script analyzer is a game changer. My average view duration increased by 20% since I started using it.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Sarah Chen",
    role: "Instagram Creator",
    content: "I used to spend 2 hours on hooks. Now I get viral-ready hooks in 10 seconds. Worth every penny.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Marcus Jordan",
    role: "TikTok Agency Owner",
    content: "Managing 10 clients used to be impossible. SocialCreator AI helps us maintain high quality at scale.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Creators are already testing <span className="text-gradient">SocialCreator AI</span> to grow faster.</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            From solo creators to massive agencies, we help everyone grow faster.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/40">
            <div className="flex items-center gap-2 group">
              <Instagram className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Youtube className="w-5 h-5 group-hover:text-red-500 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest">YouTube</span>
            </div>
            <div className="flex items-center gap-2 group">
              <div className="w-5 h-5 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:text-cyan-400 transition-colors">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                 </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">TikTok</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border border-white/10" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-white/40">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-white/70 leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
