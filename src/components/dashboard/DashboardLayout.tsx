"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getMeThunk } from '@/store/apis';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData, loading } = useSelector((state: RootState) => state.me);

  useEffect(() => {
    const token = localStorage.getItem('socialcreator_token');
    if (!token) {
      router.push('/login');
    } else {
      dispatch(getMeThunk({}));
    }
  }, [router, dispatch]);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (!loading && userData?.data) {
      const role = userData.data.role;
      if (pathname.includes('/dashboard/admin') && role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [userData, loading, router]);

  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
      />

      <main
        className={`transition-all duration-300 min-h-screen flex flex-col ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          } pl-0`}
      >
        <TopNavbar onMenuClick={() => setIsMobileOpen(true)} />
        <div className="flex-1 p-4 md:p-8 relative overflow-hidden">
          {/* Subtle background effects for dashboard */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
