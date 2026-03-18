"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Zap,
  Type,
  FileSearch,
  Lightbulb,
  TrendingUp,
  History,
  Settings,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  CreditCard,
  Megaphone,
  ShieldCheck,
  DollarSign,
  Hash,
  Brain,
  MessageSquare,
  BadgeAlert
} from 'lucide-react';
import { UpgradeModal } from './UpgradeModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';

const menuItems = [
  // creator Features
  // HOME
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'HOME' },

  // CREATE CONTENT
  { icon: Sparkles, label: 'AI Full Post Generator', href: '/dashboard/full-post', roles: ['user', 'admin'], category: 'creator', minPlan: 'creator', section: 'CREATE CONTENT', badge: 'NEW' },
  { icon: MessageSquare, label: 'Caption Generator', href: '/dashboard/captions', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CREATE CONTENT' },
  { icon: Zap, label: 'Hook Generator', href: '/dashboard/hooks', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CREATE CONTENT' },
  { icon: Hash, label: 'Hashtag Generator', href: '/dashboard/hashtags', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CREATE CONTENT' },
  { icon: Zap, label: 'Script Generator', href: '/dashboard/script-generator', roles: ['user', 'admin'], category: 'creator', minPlan: 'creator', section: 'CREATE CONTENT' },
  { icon: Type, label: 'Title Generator', href: '/dashboard/titles', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CREATE CONTENT' },

  // CONTENT IDEAS
  { icon: TrendingUp, label: 'Trending Topics', href: '/dashboard/trending', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CONTENT IDEAS' },
  { icon: Lightbulb, label: 'Content Ideas', href: '/dashboard/ideas', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CONTENT IDEAS' },
  { icon: Lightbulb, label: 'Viral Hook Library', href: '/dashboard/hook-library', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'CONTENT IDEAS' },

  // ANALYZE
  { icon: FileSearch, label: 'Reel Viral Score Analyzer', href: '/dashboard/reel-analyzer', roles: ['user', 'admin'], category: 'creator', minPlan: 'pro', section: 'ANALYZE' },
  { icon: FileSearch, label: 'Script Analyzer', href: '/dashboard/scripts', roles: ['user', 'admin'], category: 'creator', minPlan: 'pro', section: 'ANALYZE' },
  { icon: Brain, label: 'Profile Analyzer', href: '/dashboard/profile-analyzer', roles: ['user', 'admin'], category: 'creator', minPlan: 'creator', section: 'ANALYZE' },

  // ACTIVITY
  { icon: History, label: 'History', href: '/dashboard/history', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'ACTIVITY' },

  // ACCOUNT
  { icon: Settings, label: 'Account Settings', href: '/dashboard/settings', roles: ['user', 'admin'], category: 'creator', minPlan: 'free', section: 'ACCOUNT' },

  // Admin Features (Static categories for now)
  { icon: ShieldCheck, label: 'Admin Overview', href: '/dashboard/admin', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: Users, label: 'User Management', href: '/dashboard/admin/users', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: BarChart3, label: 'AI Analytics', href: '/dashboard/admin/analytics', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: CreditCard, label: 'Credits Management', href: '/dashboard/admin/credits', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: DollarSign, label: 'Payments', href: '/dashboard/admin/payments', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: Megaphone, label: 'Announcements', href: '/dashboard/admin/announcements', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
  { icon: Settings, label: 'System Settings', href: '/dashboard/admin/settings', roles: ['admin'], category: 'admin', minPlan: 'free', section: 'ADMIN' },
];


export const Sidebar = ({
  isCollapsed,
  toggleCollapse,
  isMobileOpen,
  closeMobile
}: {
  isCollapsed: boolean,
  toggleCollapse: () => void,
  isMobileOpen: boolean,
  closeMobile: () => void
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: userData } = useSelector((state: RootState) => state.me);
  const { data: statsData } = useSelector((state: RootState) => state.getStats);
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: '', plan: '' });

  const activeTab = pathname.includes('/dashboard/admin') ? 'admin' : 'creator';
  const userRole = (userData as any)?.data?.role || (userData as any)?.role || 'user';
  const userPlan = (statsData?.plan || (userData as any)?.data?.plan || 'free').toLowerCase();

  const handleLogout = () => {
    localStorage.removeItem('socialcreator_token');
    router.push('/login');
  };

  const checkPlanAccess = (minPlan: string) => {
    if (userRole === 'admin') return true;
    if (minPlan === 'free') return true;
    if (minPlan === 'creator') return userPlan === 'creator' || userPlan === 'pro' || userPlan === 'lifetime';
    if (minPlan === 'pro') return userPlan === 'pro' || userPlan === 'lifetime';
    return false;
  };

  const filteredItems = menuItems.filter(item => {
    if (!item.roles.includes(userRole)) return false;
    if (userRole === 'admin') return item.category === activeTab;
    return item.category === 'creator';
  });

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 border-r border-white/10 glass ${isCollapsed ? 'w-20' : 'w-64'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-x-hidden`}>
        <div className="flex flex-col h-full py-6">
          <div className="flex items-center gap-3 px-6 mb-10 overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold whitespace-nowrap">
                SocialCreator <span className="text-gradient">AI</span>
              </motion.span>
            )}
          </div>

          {userRole === 'admin' && !isCollapsed && (
            <div className="px-4 mb-6">
              <div className="p-1.5 bg-white/5 border border-white/10 rounded-xl flex gap-1 backdrop-blur-md">
                <button onClick={() => router.push('/dashboard')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'creator' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>Creator</button>
                <button onClick={() => router.push('/dashboard/admin')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>Admin</button>
              </div>
            </div>
          )}

          <nav className="flex-1 space-y-1 px-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {filteredItems.map((item, index) => {
              const isActive = pathname === item.href;
              const hasAccess = checkPlanAccess(item.minPlan);

              // Show header if it's the first item or the section has changed
              const showHeader = index === 0 || filteredItems[index - 1].section !== item.section;

              return (
                <div key={item.href} className="relative group">
                  {showHeader && !isCollapsed && (
                    <div className="px-3 pt-6 pb-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                        {item.section}
                      </p>
                    </div>
                  )}
                  {showHeader && isCollapsed && index !== 0 && (
                    <div className="mx-4 my-4 border-t border-white/5" />
                  )}

                  <Link
                    href={hasAccess ? item.href : '#'}
                    onClick={(e) => {
                      if (!hasAccess) {
                        e.preventDefault();
                        setUpgradeModal({
                          isOpen: true,
                          feature: item.label,
                          plan: item.minPlan.charAt(0).toUpperCase() + item.minPlan.slice(1)
                        });
                      }
                      else closeMobile();
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' :
                        !hasAccess ? 'text-white/30 hover:bg-white/5 group/locked' :
                          'text-white/50 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : !hasAccess ? 'text-white/10 group-hover/locked:text-primary transition-colors' : 'group-hover:text-primary'}`} />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </motion.span>
                        {!hasAccess && (
                          <span className="px-1.5 py-0.5 text-[8px] font-black bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md ml-2 flex-shrink-0">
                            PRO
                          </span>
                        )}
                        {(item as any).badge && (
                          <span className="px-1.5 py-0.5 text-[8px] font-black bg-primary/20 text-primary border border-primary/20 rounded-md animate-pulse ml-2 flex-shrink-0">
                            {(item as any).badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                  {!hasAccess && !isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-1 bg-black/90 text-[10px] text-white rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                      Upgrade to {item.minPlan.charAt(0).toUpperCase() + item.minPlan.slice(1)} to unlock
                    </div>
                  )}
                </div>
              );
            })}
          </nav>


          <div className="px-3 pt-4 border-t border-white/5">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
            </button>
            <button onClick={toggleCollapse} className="absolute -right-3 top-20 w-6 h-6 rounded-full glass border border-white/10 hidden lg:flex items-center justify-center text-white/50 hover:text-white">
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>
        </div>
        <UpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ ...upgradeModal, isOpen: false })}
          featureName={upgradeModal.feature}
          requiredPlan={upgradeModal.plan}
        />
      </aside>
    </>
  );
};
