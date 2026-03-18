import React from 'react';
import { FreeToolPage } from '@/components/landing/FreeToolPage';
import { Youtube } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI YouTube Title Generator | SocialCreator AI',
  description: 'Generate high-CTR, viral YouTube titles. Use AI to optimize your video titles for the algorithm and search results to get more views.',
};

const faqs = [
  {
    question: "Why does my title matter for YouTube views?",
    answer: "Your title and thumbnail are the two most important factors for your Click-Through Rate (CTR). A high-CTR title tells YouTube that your video is interesting, which leads the algorithm to suggest it to even more people on the home page and search results."
  },
  {
    question: "What is a 'Click-Worthy' title?",
    answer: "A click-worthy title uses psychological triggers like curiosity, shock, or high-stakes promises without being 'clickbaiting'. It promises a specific value and delivers on it. Our AI uses established 'Title Frameworks' to ensure high performance."
  },
  {
    question: "Does this affect YouTube SEO?",
    answer: "Yes! By including high-volume keywords naturally within your title, our generator helps your videos rank higher in search results. We balance keyword optimization with psychological triggers for maximum performance."
  }
];

const exampleOutputs = [
  { text: "is Changing Everything (And Nobody Noticed). 😱 Don't make this mistake!" },
  { text: "The Secret to Viral Growth in 2026: I Tried it for 30 Days. 📈" },
  { text: "Why 99% of Content Creators Fail at This (and How to be the 1%). 🤫" }
];

export default function YoutubeTitleGeneratorPage() {
  return (
    <FreeToolPage 
      toolName="YouTube Title Generator"
      title="Free YouTube Title Generator"
      description="Skyrocket your CTR with AI-powered video titles. Generate 10+ high-performing titles optimized for both the algorithm and search results."
      platformIcon="youtube"
      placeholder="e.g. My travel vlog to Japan, how to code in python"
      features={[
        "High-CTR Psychological Frameworks",
        "SEO Keyword Optimization for Search",
        "CTR Predictor modeling for results",
        "Instant generation (No login required)"
      ]}
      faqs={faqs}
      exampleOutputs={exampleOutputs}
      toolType="title"
    />
  );
}
