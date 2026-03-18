import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Metadata } from 'next';
import { Target, Users, Zap, TrendingUp, Sparkles, Mail, LayoutDashboard, MessageSquare, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | SocialCreator AI - The Ultimate AI Content Generator',
  description: 'SocialCreator AI is the leading AI content generator helping YouTube, Instagram, and TikTok creators generate viral content faster with tools like our viral hook generator and Instagram caption generator.',
  keywords: 'AI content generator, viral content tools, social media AI tools, Instagram caption generator, viral hook generator',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-gray-200 selection:bg-primary/30 font-sans">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-900/20 blur-[120px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 sm:px-12 max-w-5xl mx-auto space-y-24">
        
        {/* Intro Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 tracking-tight">
            About SocialCreator AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="text-white font-semibold">SocialCreator AI</span>, the world’s most advanced <strong className="font-semibold text-purple-400">AI content generator</strong> built exclusively for the modern digital landscape. We are transforming the way content is conceptualized, crafted, and published.
          </p>
        </section>

        {/* Our Mission */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed indent-0">
            At SocialCreator AI, our mission is simple yet highly ambitious: to democratize viral success by equipping creators with state-of-the-art <strong className="text-pink-400 font-semibold">social media AI tools</strong>. We believe that every great idea deserves an audience. Unfortunately, the algorithm is constantly changing, and keeping up with content demands can lead to severe burnout. We exist to eliminate the friction between your creativity and the final published post. By leveraging artificial intelligence, we strive to give you back your time so you can focus on what truly matters—engaging with your community and building your personal brand.
          </p>
        </section>

        {/* What We Do */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">What SocialCreator AI Does</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We provide an integrated suite of <strong className="text-purple-400 font-semibold">viral content tools</strong> designed to optimize every stage of your content creation workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Instagram Caption Generator",
                description: "Stuck staring at a blank screen? Our specialized Instagram caption generator creates highly engaging, brand-aligned captions complete with optimized emojis to drive maximum interaction.",
                icon: <MessageSquare className="text-blue-400" size={24} />
              },
              {
                title: "Viral Hook Generator",
                description: "The first three seconds of your video determine its success. Use our viral hook generator to capture attention instantly and stop scrollers in their tracks across all platforms.",
                icon: <Zap className="text-yellow-400" size={24} />
              },
              {
                title: "Reel Viral Score Analyzer",
                description: "Don't guess what works. Analyze your scripts and ideas to get a data-driven prediction on their potential to go viral before you even hit record.",
                icon: <TrendingUp className="text-green-400" size={24} />
              },
              {
                title: "Script Generator",
                description: "Turn simple text prompts into fully fleshed-out, engaging video scripts tailored perfectly for short-form platforms like TikTok, Shorts, and Reels.",
                icon: <Video className="text-pink-400" size={24} />
              },
              {
                title: "Hashtag Generator",
                description: "Maximize your discoverability with AI-curated hashtags that actually work, targeting specific niches to ensure your content reaches the right audience.",
                icon: <LayoutDashboard className="text-purple-400" size={24} />
              },
              {
                title: "Content Ideas Generator",
                description: "Never run out of inspiration. We analyze current trends to deliver fresh, highly relevant content ideas personalized to your unique niche and audience.",
                icon: <Sparkles className="text-orange-400" size={24} />
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#0f0a1c] border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For & Why Us */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-gradient-to-b from-purple-900/20 to-transparent border border-purple-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-purple-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Who It’s For</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              SocialCreator AI is an indispensable partner for digital storytellers across the entire spectrum of media.
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong>YouTube, Instagram, & TikTok creators</strong> who want to post consistently without sacrificing quality.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong>Influencers</strong> aiming to maximize brand deals through higher engagement rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500 mt-1">•</span>
                <span><strong>Social media marketers and agencies</strong> looking to scale their clients' presence efficiently.</span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-b from-pink-900/20 to-transparent border border-pink-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-pink-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Why Creators Choose Us</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              In a crowded market, standing out requires more than just tools—it requires intelligence. Creators choose us because our platform is engineered for tangible results.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We offer unparalleled speed, removing the hours spent brainstorming and copywriting. Our precision tuning ensures that the content generated feels authentically yours, maintaining a professional, modern standard that builds ultimate trust with your audience. We don't just generate text; we generate engagement.
            </p>
          </section>
        </div>

        {/* Vision Section */}
        <section className="relative overflow-hidden border border-white/10 rounded-3xl p-8 md:p-12 text-center bg-[#0a0614]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/20 blur-[100px]" />
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Our Vision for the Creator Economy</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed relative z-10">
            We envision a creator economy where burnout is a relic of the past, and pure creativity dictates success. Our goal is to become the operational backbone for the world's top creators, continuously innovating our <strong className="text-white font-medium">social media AI tools</strong> to evolve alongside shifting algorithms. We believe the future belongs to those who combine authentic human connection with powerful, predictive AI.
          </p>
        </section>

        {/* Contact & Support */}
        <section className="border-t border-white/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Contact and Support</h2>
            <p className="text-gray-400 text-lg">
              We are dedicated to your success. Whether you have a question about our <strong className="font-medium text-white">AI content generator</strong> features, need technical support, or want to explore an enterprise agency plan, our team is here to assist you.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="mailto:support@socialcreatorapp.com" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105">
              <Mail size={20} />
              Get in Touch
            </a>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
