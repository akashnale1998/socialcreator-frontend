"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Flame, ArrowRight, Sparkles, TrendingUp, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

// ─── Count-up helper ─────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, color, size = 96 }: { score: number; color: string; size?: number }) {
  const r   = 40;
  const c   = 2 * Math.PI * r;
  const off = c * (1 - score / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={c}
          strokeLinecap="round"
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white leading-none">{score}</span>
        <span className="text-[8px] font-bold text-white/30 uppercase">/ 100</span>
      </div>
    </div>
  );
}

// ─── Card: Before ─────────────────────────────────────────────────────────────

function BeforeCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="before"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl bg-slate-800/60 border border-red-500/20 p-5 space-y-4 relative overflow-hidden"
        >
          {/* label */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <X className="w-3 h-3" /> Before
            </div>
          </div>

          {/* hook */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Hook</p>
            <p className="text-sm font-semibold text-white/60 italic leading-snug">
              "Consistency is key"
            </p>
          </div>

          {/* score */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Viral Score</p>
              <p className="text-3xl font-black text-red-400">42<span className="text-base text-white/20">/100</span></p>
            </div>
            <ScoreRing score={42} color="#f87171" size={80} />
          </div>

          {/* issues */}
          <div className="space-y-1.5 pt-1 border-t border-white/5">
            {['Weak hook — no curiosity', 'Low retention trigger', 'Missing emotional pull'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <X className="w-3 h-3 text-red-400 shrink-0" />
                <span className="text-[11px] text-white/40">{t}</span>
              </div>
            ))}
          </div>

          {/* subtle red glow */}
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-red-500/10 blur-2xl rounded-full pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Card: After ─────────────────────────────────────────────────────────────

function AfterCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="after"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="rounded-2xl bg-slate-800/60 border border-emerald-500/25 p-5 space-y-4 relative overflow-hidden"
        >
          {/* label */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Flame className="w-3 h-3" /> After AI
            </div>
          </div>

          {/* hook */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Hook</p>
            <p className="text-sm font-semibold text-white/90 italic leading-snug">
              "Why consistency is NOT working for you"
            </p>
          </div>

          {/* score */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Viral Score</p>
              <p className="text-3xl font-black text-emerald-400">81<span className="text-base text-white/20">/100</span></p>
            </div>
            <ScoreRing score={81} color="#34d399" size={80} />
          </div>

          {/* wins */}
          <div className="space-y-1.5 pt-1 border-t border-white/5">
            {['Curiosity-driven hook', 'High retention trigger', 'Strong emotional pull'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-white/70">{t}</span>
              </div>
            ))}
          </div>

          {/* glow */}
          <motion.div
            className="absolute -bottom-8 -right-8 w-28 h-28 bg-emerald-500/15 blur-2xl rounded-full pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export const AnalyzerHighlight = () => {
  const [show, setShow] = useState(false);

  // trigger on mount after brief delay so animation plays on scroll-into-view
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-5xl mx-auto overflow-hidden border-primary/20 bg-slate-900/50 backdrop-blur-xl">
          <div className="p-6 md:p-14 space-y-10">

            {/* ── Header ── */}
            <div className="flex flex-col items-center text-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold"
              >
                <Flame className="w-3.5 h-3.5" /> Real Results
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                Turn Average Reels into Viral Content 🔥
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-base md:text-lg max-w-xl"
              >
                See how AI transforms weak content into high-performing viral reels
              </motion.p>
            </div>

            {/* ── Before / After cards ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 relative"
            >
              <BeforeCard visible={show} />

              {/* Arrow between cards */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              <AfterCard visible={show} />
            </motion.div>

            {/* ── AI Insight ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center gap-3 px-5 py-4 rounded-2xl bg-primary/8 border border-primary/15"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">AI Insight</p>
                <p className="text-sm text-white/65 leading-relaxed">
                  AI improved the hook to increase curiosity and retention — boosting viral score by{' '}
                  <span className="text-emerald-400 font-bold">+39 points</span>
                </p>
              </div>
              <div className="sm:ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-black text-emerald-400">+93% improvement</span>
              </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex justify-center"
            >
              <Link href="/signup">
                <Button size="lg" className="gap-2 group shadow-xl shadow-primary/20 px-8">
                  Try This on Your Reel
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

          </div>
        </Card>
      </div>
    </section>
  );
};
