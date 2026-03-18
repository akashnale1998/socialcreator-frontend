"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does SocialCreator AI work?",
    answer: "SocialCreator AI uses advanced artificial intelligence to analyze your inputs—like your niche, target audience, and brand voice—and generates optimized social media content. Whether you need an Instagram caption, a viral TikTok hook, or a full YouTube script, our tools process your prompt and instantly return high-quality, engaging content."
  },
  {
    question: "What AI models power the platform?",
    answer: "Our platform leverages state-of-the-art Large Language Models (LLMs) from leading AI providers. We continuously route prompts to the most capable models available to ensure the highest quality of creative output, accuracy, and nuance for your specific platform needs."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you have complete freedom to cancel your subscription at any time directly from your account dashboard. If you cancel before your next billing cycle, you won't be charged again, and you'll retain access to all premium features until the end of your current paid period."
  },
  {
    question: "Do unused credits roll over?",
    answer: "Unused credits do not roll over to the next billing cycle. Each month, your credit balance is reset to your plan's full allocation, giving you a fresh batch of credits to generate content."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! We offer a Free Plan designed to let you experience the core capabilities of SocialCreator AI. You get a set number of free credits to test our tools—like the Caption Generator and Hook Generator—before deciding to upgrade to a premium plan for higher usage limits."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about SocialCreator AI and how it can help you grow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white/5' : 'bg-black/20 hover:bg-white/5'}`}
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium text-lg text-gray-200">{faq.question}</span>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
