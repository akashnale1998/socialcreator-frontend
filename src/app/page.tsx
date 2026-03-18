import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { AnalyzerHighlight } from '@/components/landing/AnalyzerHighlight';
import { DashboardCarousel } from '@/components/landing/DashboardCarousel';
import { DemoSection } from '@/components/landing/DemoSection';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030014] selection:bg-primary/30">
      <Navbar />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <AnalyzerHighlight />
        <DashboardCarousel />
        <DemoSection />
        <div id="features">
          <Features />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
