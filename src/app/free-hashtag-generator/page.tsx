import React from 'react';
import { FreeToolPage } from '@/components/landing/FreeToolPage';
import { Hash } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Hashtag Generator | SocialCreator AI',
  description: 'Find the best trending hashtags for your niche. Our AI hashtag generator helps you get more views and reach on Instagram, TikTok, and YouTube.',
};

const faqs = [
  {
    question: "Do hashtags still matter in 2026?",
    answer: "Yes, hashtags act as 'keywords' that help the platform's algorithm categorize your content. This makes it more likely to be shown to users who are interested in your specific niche, especially in SEO-driven searches."
  },
  {
    question: "How many hashtags should I use?",
    answer: "The 'sweet spot' is currently 3-5 highly relevant hashtags. However, using up to 30 on Instagram is still acceptable as long as they aren't 'shadowbanned' or completely unrelated. Our AI provides a mix of broad and niche-specific tags."
  },
  {
    question: "Does this tool work for YouTube Shorts?",
    answer: "Yes! YouTube Shorts rely heavily on title keywords and hashtags for discovery. Our tool identifies trending tags specifically for YouTube and Instagram to maximize your discoverability."
  }
];

const exampleOutputs = [
  { text: "#SocialMediaStrategy #ContentCreator #ViralGrowth #MarketingTips #AIforBusiness" },
  { text: "#MorningMrituals #ProductivityHacks #HealthyLifestyle #SelfCareRoutine #Minimalism" },
  { text: "#CodingLife #SaaSDevelopment #TechTrends2026 #WebDesign #Programming" }
];

export default function HashtagGeneratorPage() {
  return (
    <FreeToolPage 
      toolName="Hashtag Generator"
      title="Free AI Hashtag Generator"
      description="Optimize your reach with the perfect hashtag strategy. Generate trending, niche-specific hashtags that actually get your content seen."
      platformIcon="hashtag"
      placeholder="e.g. Fitness for busy moms, Best AI tools 2026"
      features={[
        "Niche-specific hashtag clustering",
        "Trending vs. Evergreen tag balancing",
        "Optimized for Instagram, TikTok, and YouTube",
        "Reach-focused algorithmic selection"
      ]}
      faqs={faqs}
      exampleOutputs={exampleOutputs}
      toolType="hashtag"
    />
  );
}
