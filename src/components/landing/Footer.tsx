import React from 'react';
import { Sparkles, Twitter, Instagram, Github, Youtube } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <p className="text-white/60 font-medium text-lg italic">
            "Built for modern creators who want to grow faster using AI."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">SocialCreator AI</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Empowering creators to go viral with the power of artificial intelligence. Built for the modern content era.
            </p>
            <div className="mt-6 space-y-2 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                Secure payments powered by Razorpay
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Transparent refund policy for creators
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Trusted AI tools for content creators
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Documnetation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/best-ai-tools" className="hover:text-primary transition-colors">Blog / Guides</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Social</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-white/30 gap-4">
          <p>© 2026 SocialCreator AI. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
