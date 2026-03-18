"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const { loading } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    // Check for token in URL (from OAuth redirect)
    const token = searchParams?.get('token');
    if (token) {
      localStorage.setItem('socialcreator_token', token);
      router.push('/dashboard');
      return;
    }

    const storedToken = localStorage.getItem('socialcreator_token');
    if (storedToken) {
      router.push('/dashboard');
    }
  }, [router, searchParams]);

  const scrollToForm = () => {
    const form = document.getElementById('auth-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${"https://socialcreator-backend.onrender.com"}/api/auth/google`;
  };

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

        <div className="space-y-4 mb-8">
          <Button
            variant="ghost"
            className="w-full h-14 bg-white text-black hover:bg-white/90 gap-3 font-bold text-base"
            onClick={scrollToForm}
          >
            <Mail size={20} /> Continue with Email
          </Button>
          <Button
            variant="glass"
            className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 gap-3 font-bold text-base"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        <div id="auth-form">
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
              <Button
                variant="glass"
                className="gap-2"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/github`}
              >
                <Github size={18} /> GitHub
              </Button>
              <Button
                variant="glass"
                className="gap-2"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/twitter`}
              >
                <Twitter size={18} /> Twitter
              </Button>
            </div>

            <p className="text-center text-sm text-white/40 mt-8">
              Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
