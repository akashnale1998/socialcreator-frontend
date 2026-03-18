"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, Menu, X, ChevronDown, Instagram, Music, Hash, Youtube } from 'lucide-react';
import Link from 'next/link';

const tools = [
  { name: 'Instagram Caption Generator', href: '/free-instagram-caption-generator', icon: Instagram },
  { name: 'Reel Hook Generator', href: '/free-reel-hook-generator', icon: Music },
  { name: 'Hashtag Generator', href: '/free-hashtag-generator', icon: Hash },
  { name: 'YouTube Title Generator', href: '/free-youtube-title-generator', icon: Youtube },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/10 shadow-lg' : 'py-6 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SocialCreator <span className="text-gradient">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>

            {/* Tools Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                Tools <ChevronDown size={14} className={`transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4"
                  >
                    <div className="glass-card border border-white/10 rounded-2xl p-2 shadow-2xl">
                      {tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-all group/item"
                        >
                          <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover/item:border-primary/50 group-hover/item:text-primary transition-colors">
                            <tool.icon size={16} />
                          </div>
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">How it works</Link>
            <Link href="/#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</Link>
            <div className="flex items-center gap-4 ml-4">
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Log in</Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>

            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white bg-white/5 rounded-xl border border-white/10"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#030014]/98 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full container mx-auto px-6 py-6">
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">SocialCreator AI</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white bg-white/5 rounded-xl border border-white/10"
                >
                  <X />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto">
                <Link href="/#features" className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>Features</Link>

                {/* Mobile Tools Dropdown */}
                <div className="flex flex-col border-b border-white/5 pb-2">
                  <button
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className="flex items-center justify-between text-2xl font-bold hover:text-primary transition-colors py-2"
                  >
                    Tools <ChevronDown size={24} className={`transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {mobileToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/5 rounded-2xl mt-2"
                      >
                        {tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 px-6 py-4 text-lg text-white/70 hover:text-white transition-colors"
                          >
                            <tool.icon size={20} className="text-primary" />
                            {tool.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/#how-it-works" className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>How it works</Link>
                <Link href="/#pricing" className="text-2xl font-bold hover:text-primary transition-colors py-2 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              </div>

              <div className="mt-auto flex flex-col gap-4 pb-12">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glass" className="w-full text-lg h-14">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full text-lg h-14">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
