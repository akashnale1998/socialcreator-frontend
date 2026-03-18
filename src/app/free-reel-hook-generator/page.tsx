import React from 'react';
import { FreeToolPage } from '@/components/landing/FreeToolPage';
import { Music2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Reel Hook Generator | SocialCreator AI',
  description: 'Generate viral hooks for your Instagram Reels and TikToks. Stop the scroll with AI-powered hooks designed for high retention and viral potential.',
};

const faqs = [
  {
    question: "Why are hooks important for Reels?",
    answer: "The first 3 seconds of your Reel decide whether a viewer stays or scrolls. A powerful hook grabs attention and creates a 'curiosity gap' that keeps viewers watching until the end, which signals to the algorithm that your content is high quality."
  },
  {
    question: "Can I use these hooks for TikTok as well?",
    answer: "Yes, our AI-generated hooks are optimized for short-form video platforms including Reels, TikTok, and YouTube Shorts. The psychological triggers for engagement are consistent across all these platforms."
  },
  {
    question: "How do I use these hooks?",
    answer: "Simply speak the hook as the very first sentence in your video, or place it as large, readable text on the screen during the first 2-3 seconds. This instantly tells the viewer what the video is about and why they should care."
  }
];

const exampleOutputs = [
  { text: "is the biggest mistake you're making right now, and nobody is talking about it. 😱 Watch until the end to see the solution." },
  { text: "I tried this for 30 days so you don't have to. Here's exactly what happened (and why it's a game changer). 📈" },
  { text: "POV: You just discovered the secret tool that top 1% of creators use to save 10 hours a week. It's not what you think. 🤫" }
];

export default function ReelHookGeneratorPage() {
  return (
    <FreeToolPage 
      toolName="Reel Hook Generator"
      title="Free Reel & TikTok Hook Generator"
      description="Stop the scroll and boost your retention. Generate 10+ viral hooks for your short-form videos in seconds using our AI strategist."
      platformIcon="reel"
      placeholder="e.g. My weight loss journey, how to invest in crypto"
      features={[
        "Stop-the-scroll psychological triggers",
        "High-retention Curiosity Gap formulas",
        "Optimized for Reels, TikTok, and Shorts",
        "Instant accessibility (No signup required)"
      ]}
      faqs={faqs}
      exampleOutputs={exampleOutputs}
      toolType="hook"
    />
  );
}
