'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import axios from 'axios';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email address...');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification token.');
        return;
      }

      try {
        const response = await axios.get(`${"http://localhost:5000"}/auth/verify-email?token=${token}`);

        if (response.data.success) {
          setStatus('success');
          setMessage(response.data.message || 'Email verified successfully!');
        } else {
          setStatus('error');
          setMessage(response.data.error || 'Verification failed.');
        }
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#050515] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 text-center space-y-6 border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Mail className="text-primary" size={40} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Email Verification</h1>
            <p className="text-white/60 text-sm">
              {status === 'loading' ? 'Please wait while we verify your account.' : 'Account activation process'}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-4 py-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-white/80 font-medium">Verifying...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={48} />
                </div>
                <p className="text-white/90 font-bold text-lg">{message}</p>
                <div className="w-full pt-4">
                  <Button
                    className="w-full"
                    onClick={() => router.push('/login')}
                  >
                    Go to Login <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                  <XCircle size={48} />
                </div>
                <p className="text-white/90 font-bold text-lg">{message}</p>
                <div className="w-full pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5"
                    onClick={() => router.push('/signup')}
                  >
                    Back to Signup
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 pt-4">
            SocialCreator AI &copy; 2024
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050515] flex items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
