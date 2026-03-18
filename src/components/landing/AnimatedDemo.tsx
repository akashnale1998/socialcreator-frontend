"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Sparkles, Zap, Activity, Send,
  CheckCircle2, TrendingUp, ArrowRight, Flame, Brain
} from 'lucide-react';
import Link from 'next/link';

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

// ─── Step 1: Upload ───────────────────────────────────────────────────────────

function UploadStep() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setProgress(0); setDone(false);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 16 + 5;
      if (p >= 100) {
        p = 100; clearInterval(id);
        setTimeout(() => setDone(true), 250);
      }
      setProgress(Math.round(p));
    }, 75);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-6">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative"
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500
          ${done ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-primary/10 border border-primary/25'}`}>
          {done
            ? <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            : <Upload className="w-10 h-10 text-primary" />}
        </div>
        {/* glow ring when uploading */}
        {!done && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary/20 blur-lg -z-10"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Progress area */}
      <div className="w-full max-w-xs space-y-3 text-center">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-white/50 font-medium">
            {done ? '✅ reel_viral_test.mp4' : 'reel_viral_test.mp4'}
          </span>
          <span className={`font-bold tabular-nums ${done ? 'text-emerald-400' : 'text-primary'}`}>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${done
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-primary to-secondary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/30 text-[11px]">
          {done ? 'Upload complete — starting AI scan…' : 'Uploading your reel securely…'}
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Scanning ─────────────────────────────────────────────────────────

const SCAN_ITEMS = [
  'Hook strength in first 3 seconds',
  'Engagement trigger patterns',
  'Caption & hashtag alignment',
  'Reach & viral signals',
];

function ScanningStep() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    setRevealed(0);
    const ids: ReturnType<typeof setTimeout>[] = [];
    SCAN_ITEMS.forEach((_, i) => {
      ids.push(setTimeout(() => setRevealed(i + 1), 480 * (i + 1)));
    });
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* Radar */}
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/25"
            initial={{ width: 36, height: 36, opacity: 0.9 }}
            animate={{ width: 96, height: 96, opacity: 0 }}
            transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center z-10">
          <Brain className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Scan checklist */}
      <div className="w-full max-w-xs space-y-2.5">
        {SCAN_ITEMS.map((item, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2.5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </motion.div>
                <span className="text-xs text-white/65">{item}</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* animated scanning item */}
        {revealed < SCAN_ITEMS.length && (
          <motion.div
            className="flex items-center gap-2.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
            <span className="text-xs text-white/40">Analyzing…</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Step 3: Results ──────────────────────────────────────────────────────────

const METRICS = [
  { label: 'Hook Strength',  value: 65, color: 'text-primary',      bg: 'from-primary/20 to-primary/5',       icon: Zap,      delay: 0.15 },
  { label: 'Engagement',     value: 82, color: 'text-purple-400',   bg: 'from-purple-500/20 to-purple-500/5', icon: Activity, delay: 0.30 },
  { label: 'Caption Score',  value: 70, color: 'text-blue-400',     bg: 'from-blue-500/20 to-blue-500/5',    icon: Send,     delay: 0.45 },
];

interface MetricBarProps { label: string; value: number; color: string; bg: string; icon: React.ElementType; delay: number; active: boolean; }
function MetricBar({ label, value, color, bg, icon: Icon, delay, active }: MetricBarProps) {
  const count = useCountUp(value, active, 900);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3 h-3 ${color}`} />
          <span className="text-[11px] text-white/50">{label}</span>
        </div>
        <span className={`text-xs font-black tabular-nums ${color}`}>{count}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${bg}`}
          initial={{ width: '0%' }}
          animate={{ width: active ? `${value}%` : '0%' }}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function ResultsStep({ active }: { active: boolean }) {
  const viral = useCountUp(78, active, 1000);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 h-full p-1">
      {/* LEFT — reel thumbnail */}
      <div className="w-[90px] rounded-xl bg-slate-800/60 border border-white/8 overflow-hidden relative flex flex-col items-center justify-center gap-2 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-600/10" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-14 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-primary/70 flex items-center justify-center shadow-lg shadow-primary/40">
              <svg className="w-3.5 h-3.5 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <p className="text-[9px] text-white/25 font-medium text-center px-1 leading-tight">reel_viral_test.mp4</p>
        </div>
        <motion.div
          className="absolute inset-0 bg-primary/5 rounded-xl"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>

      {/* RIGHT — metrics */}
      <div className="flex flex-col gap-3">
        {/* viral score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-xl bg-primary/10 border border-primary/20 p-3 text-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-primary/10 blur-xl"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5 relative z-10">Viral Score</p>
          <p className="text-3xl font-black text-white relative z-10 tabular-nums">
            {viral}<span className="text-sm text-primary ml-0.5 font-bold">/100</span>
          </p>
        </motion.div>

        {/* metric bars */}
        <div className="flex flex-col gap-2.5">
          {METRICS.map(m => <MetricBar key={m.label} {...m} active={active} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: AI Insight ───────────────────────────────────────────────────────

const INSIGHT_TEXT = 'Your hook is weak in the first 3 seconds — improve it to increase retention and engagement.';

function InsightStep() {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(INSIGHT_TEXT.slice(0, i));
      if (i >= INSIGHT_TEXT.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-2">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">AI Insight</p>
        </div>
        <p className="text-sm text-white/80 leading-relaxed min-h-[3rem]">
          &ldquo;{text}
          <span className="inline-block w-0.5 h-3.5 bg-amber-400 ml-0.5 align-middle animate-pulse" />&rdquo;
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/20 w-full"
      >
        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <p className="text-xs text-white/50">
          Fixing this could boost reach by <span className="text-emerald-400 font-bold">+40%</span>
        </p>
      </motion.div>
    </div>
  );
}

// ─── Step 5: CTA ──────────────────────────────────────────────────────────────

function CTAStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center"
            animate={{ boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 16px rgba(52,211,153,0.4)', '0 0 0px rgba(52,211,153,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
          </motion.div>
          <p className="text-white font-bold text-sm">Analysis complete!</p>
        </div>
        <p className="text-white/45 text-xs max-w-[220px] mx-auto leading-relaxed">
          Apply AI fixes to boost your Viral Score from{' '}
          <span className="text-white font-bold">78</span> →{' '}
          <span className="text-emerald-400 font-bold">94+</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative"
      >
        {/* glow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/40 blur-lg -z-10"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary font-bold text-white text-sm shadow-xl shadow-primary/25"
          >
            <Flame className="w-4 h-4" />
            Analyze Your Reel Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-white/20 text-[10px]"
      >
        Free — no credit card required
      </motion.p>
    </div>
  );
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'upload',    label: 'Upload',   icon: Upload,        duration: 3400 },
  { id: 'scanning', label: 'Scanning',  icon: Brain,         duration: 3200 },
  { id: 'results',  label: 'Results',   icon: Activity,      duration: 4200 },
  { id: 'insight',  label: 'Insight',   icon: Sparkles,      duration: 4800 },
  { id: 'cta',      label: 'CTA',       icon: Flame,         duration: 3600 },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export const AnimatedDemo = () => {
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (current: number) => {
    timerRef.current = setTimeout(() => {
      const next = (current + 1) % STEPS.length;
      setStep(next);
      advance(next);
    }, STEPS[current].duration);
  };

  useEffect(() => {
    advance(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const current = STEPS[step];

  return (
    <div className="glass-card rounded-2xl p-2 border-white/10 shadow-3xl">
      <div className="bg-slate-900/50 rounded-xl overflow-hidden">

        {/* ── Browser chrome bar ── */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
          <div className="flex gap-1.5 shrink-0">
            {['bg-red-500/60', 'bg-yellow-500/60', 'bg-emerald-500/60'].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/8 min-w-0 mx-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[10px] text-white/35 font-medium truncate">
              <span className="hidden sm:inline">SocialCreator AI — </span>Viral Reel Score Engine
            </span>
          </div>
          <div className="w-12 shrink-0" />
        </div>

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 pt-3 pb-2 overflow-x-auto scrollbar-none">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isPast   = i < step;
            return (
              <React.Fragment key={s.id}>
                <motion.div
                  animate={{
                    backgroundColor: isActive
                      ? 'rgba(139,92,246,0.25)'
                      : isPast
                        ? 'rgba(139,92,246,0.1)'
                        : 'rgba(255,255,255,0.04)',
                    borderColor: isActive
                      ? 'rgba(139,92,246,0.6)'
                      : isPast
                        ? 'rgba(139,92,246,0.25)'
                        : 'rgba(255,255,255,0.06)',
                    boxShadow: isActive
                      ? '0 0 14px rgba(139,92,246,0.35)'
                      : '0 0 0px rgba(139,92,246,0)',
                  }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0"
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-primary' : isPast ? 'text-primary/50' : 'text-white/20'}`} />
                  <span className={`hidden xs:inline sm:inline ${isActive ? 'text-white/80' : isPast ? 'text-white/35' : 'text-white/20'}`}>{s.label}</span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className={`w-2 sm:w-4 h-px shrink-0 ${isPast ? 'bg-primary/30' : 'bg-white/8'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Content area ── */}
        <div className="relative h-[310px] sm:h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 p-4"
            >
              {current.id === 'upload'   && <UploadStep />}
              {current.id === 'scanning' && <ScanningStep />}
              {current.id === 'results'  && <ResultsStep active={step === 2} />}
              {current.id === 'insight'  && <InsightStep />}
              {current.id === 'cta'      && <CTAStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress bar ── */}
        <div className="h-0.5 bg-white/5">
          <motion.div
            key={step}
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: STEPS[step].duration / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
};
