"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const steps = [
  {
    number: "01",
    title: "Enter your topic",
    description: "Tell the AI what your video is about or paste a link to get started."
  },
  {
    number: "02",
    title: "AI generates content",
    description: "Our creator-trained models generate hooks, titles, and script ideas."
  },
  {
    number: "03",
    title: "Analyze and Refine",
    description: "Use the script analyzer to see predicted retention and improve flow."
  },
  {
    number: "04",
    title: "Improve content instantly",
    description: "Copy your viral content and watch your reach explode."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Go from a blank page to a viral script in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
               {index < steps.length - 1 && (
                 <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-gradient-to-r from-primary/50 to-transparent -z-10" />
               )}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full glass border border-primary/20 flex items-center justify-center mb-6 text-2xl font-bold text-gradient">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
