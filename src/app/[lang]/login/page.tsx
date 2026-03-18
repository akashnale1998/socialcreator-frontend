"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/store/store';
import { loginThunk } from '@/store/apis';
import axios from 'axios';
import { trackEvent } from '@/lib/analytics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    const token = localStorage.getItem('socialcreator_token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const result = await dispatch(loginThunk({ email, password }));

    if (loginThunk.fulfilled.match(result)) {
      const payload = result.payload as any;
      localStorage.setItem('socialcreator_token', payload.token);
      trackEvent('login', 'Authentication', 'User Logged In');
      router.push('/dashboard');
    } else {
      const payload = result.payload as any;
      setErrorMsg(payload?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SocialCreator AI</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
          <p className="text-white/40 text-sm">Enter your credentials to access your account</p>
        </div>

        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                {errorMsg}
              </div>
            )}
            <Input
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/70">Password</label>
                <Link href="/forgot-password" title="Forgot Password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full" size="lg" type="submit" isLoading={loading}>Sign In</Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0c0a20] px-2 text-white/40">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="glass" className="gap-2">
              <Github size={18} /> GitHub
            </Button>
            <Button variant="glass" className="gap-2">
              <Twitter size={18} /> Twitter
            </Button>
          </div>

          <p className="text-center text-sm text-white/40 mt-8">
            Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
