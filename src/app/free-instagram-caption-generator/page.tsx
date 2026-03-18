import React from 'react';
import { FreeToolPage } from '@/components/landing/FreeToolPage';
import { Instagram } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Instagram Caption Generator | SocialCreator AI',
  description: 'Generate viral Instagram captions in seconds with our free AI tool. Boost your engagement and growth with click-worthy captions tailored to your audience.',
};

const faqs = [
  {
    question: "Is the Instagram Caption Generator really free?",
    answer: "Yes! Our free tool allows you to generate a limited number of captions daily without creating an account. For unlimited access and advanced features like script analysis and viral hooks, you can upgrade to a Pro plan."
  },
  {
    question: "What makes a good Instagram caption?",
    answer: "A good caption includes a strong hook, provides value or tells a story, and ends with a clear call-to-action (CTA). Our AI is trained on thousands of viral posts to ensure your captions follow these exact patterns."
  },
  {
    question: "Does this work for Reels and Carousels?",
    answer: "Absolutely. You can specify the content type, and the AI will adjust the length and formatting accordingly. For example, it will include more line breaks for long-form storytelling or keep it punchy for Reels."
  }
];

const exampleOutputs = [
  { text: "is the secret ingredient you've been missing. 🤫 Swipe to see how it transformed my daily routine in just 7 days! #GrowthMindset #LifeHacks" },
  { text: "POV: You finally stopped waiting for the 'perfect time' and just started. 🚀 The results? Better than I ever imagined. #CreatorEconomy #Motivation" },
  { text: "Stop scrolling! 🛑 If you're struggling with engagement, try this 3-step framework for your next post. Saved my account last month! #InstagramTips #Strategy" }
];

export default function InstagramCaptionGeneratorPage() {
  return (
    <FreeToolPage 
      toolName="Instagram Caption Generator"
      title="Free Instagram Caption Generator"
      description="Create viral, scroll-stopping Instagram captions in seconds. Our AI analyzes top-performing posts to help you grow your audience faster."
      platformIcon="instagram"
      placeholder="e.g. My morning workout routine, 5 tips for better sleep"
      features={[
        "Viral Hook Integration for high retention",
        "Multiple tone options (Funny, Pro, Exciting)",
        "Niche-specific hashtag suggestions",
        "Psychological trigger mapping for engagement"
      ]}
      faqs={faqs}
      exampleOutputs={exampleOutputs}
      toolType="caption"
    />
  );
}
