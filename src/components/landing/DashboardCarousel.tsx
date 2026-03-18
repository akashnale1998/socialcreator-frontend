"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight, Flame, Sparkles, CheckCircle2,
  AlertTriangle, TrendingUp, Users, Grid3x3,
  Brain, X
} from 'lucide-react';
import Link from 'next/link';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score, active }: { score: number; active: boolean }) {
  const r = 38; const c = 2 * Math.PI * r;
  const count = useCountUp(score, active);
  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="9"
          strokeDasharray={c} strokeLinecap="round"
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: active ? c * (1 - score / 100) : c }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white tabular-nums">{count}</span>
        <span className="text-[8px] font-bold text-white/30 uppercase">/ 100</span>
      </div>
    </div>
  );
}

// ─── Phase: Scanning ─────────────────────────────────────────────────────────

const SCAN_ITEMS = ['Profile bio', 'Post frequency', 'Niche clarity', 'Engagement rate', 'Growth signals'];

function ScanningPhase() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    setDone(0);
    const ids = SCAN_ITEMS.map((_, i) =>
      setTimeout(() => setDone(i + 1), 420 * (i + 1))
    );
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 py-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            className="absolute rounded-full border border-primary/30"
            initial={{ width: 28, height: 28, opacity: 0.8 }}
            animate={{ width: 64, height: 64, opacity: 0 }}
            transition={{ duration: 1.6, delay: i * 0.55, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center z-10">
          <Brain className="w-4 h-4 text-primary" />
        </div>
      </div>

      <p className="text-sm font-semibold text-white/60">Scanning your profile…</p>

      <div className="w-full max-w-[200px] space-y-2">
        {SCAN_ITEMS.map((item, i) => (
          <AnimatePresence key={i}>
            {done > i && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-white/55">{item}</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {done < SCAN_ITEMS.length && (
          <motion.div className="flex items-center gap-2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity }}>
            <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
            <span className="text-[11px] text-white/35">Analyzing…</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Metric row ───────────────────────────────────────────────────────────────

type Status = 'good' | 'warn' | 'bad';
interface MetricRowProps { label: string; status: Status; value: string; delay?: number; }

function MetricRow({ label, status, value, delay = 0 }: MetricRowProps) {
  const cfg: Record<Status, { icon: React.ReactNode; color: string }> = {
    good: { icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />, color: 'text-emerald-400' },
    warn: { icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,  color: 'text-amber-400'  },
    bad:  { icon: <X className="w-3.5 h-3.5 text-red-400" />,               color: 'text-red-400'    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
    >
      <div className="flex items-center gap-2">
        {cfg[status].icon}
        <span className="text-xs text-white/55">{label}</span>
      </div>
      <span className={`text-xs font-bold ${cfg[status].color}`}>{value}</span>
    </motion.div>
  );
}

// ─── Phase: Results ───────────────────────────────────────────────────────────

function ResultsPhase({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col h-full gap-3 py-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">Profile Score</p>
          <p className="text-xs text-white/40">AI-powered insights</p>
        </div>
        <ScoreRing score={78} active={active} />
      </div>

      <div className="flex flex-col">
        <MetricRow label="Bio Strength"     status="bad"  value="Weak ❌"  delay={0.1} />
        <MetricRow label="Niche Clarity"    status="warn" value="Low ⚠️"   delay={0.25} />
        <MetricRow label="Growth Potential" status="good" value="High 🔥"  delay={0.4} />
        <MetricRow label="Post Consistency" status="warn" value="Medium"   delay={0.55} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-auto rounded-xl bg-amber-500/8 border border-amber-500/20 p-3 flex gap-2.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-white/65 leading-relaxed">
          <span className="font-bold text-amber-400">AI:</span> Your bio is unclear — add niche + value to increase followers
        </p>
      </motion.div>
    </div>
  );
}

// ─── Phases config ────────────────────────────────────────────────────────────

const PHASES = [
  { id: 'scanning', duration: 3800 },
  { id: 'results',  duration: 5200 },
];

// ─── Mock Profile Panel ───────────────────────────────────────────────────────

function MockProfile({ scanning }: { scanning: boolean }) {
  const POSTS = [
    { color: 'from-purple-600/40 to-blue-600/40' },
    { color: 'from-pink-600/40 to-rose-600/40'   },
    { color: 'from-emerald-600/40 to-teal-600/40' },
    { color: 'from-amber-600/40 to-orange-600/40' },
    { color: 'from-violet-600/40 to-purple-600/40'},
    { color: 'from-sky-600/40 to-cyan-600/40'     },
  ];

  return (
    <div className="h-full flex flex-col rounded-xl bg-slate-800/50 border border-white/8 overflow-hidden">
      {/* header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm shrink-0 relative">
            A
            {scanning && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">@alexcreator</p>
            <p className="text-[10px] text-white/35 mt-0.5">Instagram Profile</p>
          </div>
        </div>

        <div className="flex gap-4 text-center">
          {[{ label: 'Posts', val: '48' }, { label: 'Followers', val: '3.2K' }, { label: 'Following', val: '890' }].map(s => (
            <div key={s.label}>
              <p className="text-sm font-black text-white">{s.val}</p>
              <p className="text-[9px] text-white/30 uppercase font-bold">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-white/40 mt-2.5 leading-relaxed line-clamp-2">
          Content creator 📱 | Sharing tips about growth and motivation. 🔥
        </p>
      </div>

      {/* posts grid */}
      <div className="flex-1 p-2">
        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1.5 flex items-center gap-1">
          <Grid3x3 className="w-3 h-3" /> Recent Posts
        </p>
        <div className="grid grid-cols-3 gap-1">
          {POSTS.map((p, i) => (
            <motion.div
              key={i}
              className={`aspect-square rounded-md bg-gradient-to-br ${p.color} border border-white/5`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* scanning overlay */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          >
            <motion.div
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export const DashboardCarousel = () => {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (current: number) => {
    timerRef.current = setTimeout(() => {
      const next = (current + 1) % PHASES.length;
      setPhase(next);
      advance(next);
    }, PHASES[current].duration);
  };

  useEffect(() => {
    advance(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const isScanning = PHASES[phase].id === 'scanning';
  const isResults  = PHASES[phase].id === 'results';

  return (
    <section className="py-24 relative overflow-hidden bg-[#030014]">
      <div className="container mx-auto px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Analyze Your Instagram Profile{' '}
            <span className="text-gradient">Like a Pro 🔥</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/55 text-lg max-w-xl mx-auto"
          >
            Get instant insights to grow faster and attract more followers
          </motion.p>
        </div>

        {/* ── Demo panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* browser chrome */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* top bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                {['bg-red-500/60', 'bg-yellow-500/60', 'bg-emerald-500/60'].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-white/35 font-medium truncate">SocialCreator AI — Profile Analyzer</span>
              </div>
              {/* phase indicator */}
              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                {PHASES.map((p, i) => (
                  <motion.div
                    key={p.id}
                    animate={{ backgroundColor: i === phase ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.08)' }}
                    className="w-2 h-2 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* LEFT — mock profile */}
              <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/5 relative">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/25 mb-2 flex items-center gap-1">
                  <Users className="w-3 h-3" /> Profile Preview
                </p>
                <MockProfile scanning={isScanning} />
              </div>

              {/* RIGHT — analysis panel */}
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/25 flex items-center gap-1">
                    <Brain className="w-3 h-3" /> AI Analysis
                  </p>
                  <AnimatePresence mode="wait">
                    {isScanning ? (
                      <motion.div key="scan-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] font-bold text-primary">Scanning…</span>
                      </motion.div>
                    ) : (
                      <motion.div key="done-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[9px] font-bold text-emerald-400">Complete</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-[290px] md:h-[310px]">
                  <AnimatePresence mode="wait">
                    {isScanning && (
                      <motion.div key="scanning"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="h-full"
                      >
                        <ScanningPhase />
                      </motion.div>
                    )}
                    {isResults && (
                      <motion.div key="results"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="h-full"
                      >
                        <ResultsPhase active={isResults} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* progress bar */}
            <div className="h-0.5 bg-white/5">
              <motion.div
                key={phase}
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: PHASES[phase].duration / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 flex flex-col items-center text-center gap-4">
          <p className="text-white/35 text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Join thousands of creators growing with AI-powered insights
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-10 h-14 text-lg gap-2 group shadow-xl shadow-primary/20">
              Analyze My Profile
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -z-10" />
    </section>
  );
};
