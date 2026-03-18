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
import { signupThunk } from '@/store/apis';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signupState = useSelector((state: RootState) => state.signup);
  const loading = signupState.loading;

  useEffect(() => {
    const token = localStorage.getItem('socialcreator_token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const result = await dispatch(signupThunk({
      name,
      email: formData.email,
      password: formData.password
    }));

    if (signupThunk.fulfilled.match(result)) {
      const payload = result.payload as any;
      localStorage.setItem('socialcreator_token', payload.token);
      router.push('/dashboard');
    } else {
      const payload = result.payload as any;
      setErrorMsg(payload?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full" />

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
          <h1 className="text-2xl font-bold mt-6 mb-2">Create an Account</h1>
          <p className="text-white/40 text-sm">Join 10,000+ creators and start growing today</p>
        </div>

        <Card className="p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm p-3 rounded-lg text-center font-medium">
                {successMsg}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Alex"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <p className="text-xs text-white/30 px-1">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>

            <Button className="w-full mt-2" size="lg" type="submit" isLoading={loading}>Create Account</Button>
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
            Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
