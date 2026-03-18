"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Users, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
  UserPlus
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAdminStatsThunk } from '@/store/apis';

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: stats, loading } = useSelector((state: RootState) => state.adminStats);

  useEffect(() => {
    dispatch(getAdminStatsThunk({}));
  }, [dispatch]);

  const adminStats = (stats as any)?.data || {
    totalUsers: 0,
    activeUsers: 0,
    totalGenerations: 0,
    revenue: 0,
    latestUsers: []
  };

  const statCards = [
    { label: 'Total Users', value: adminStats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Users (30d)', value: adminStats.activeUsers, icon: UserPlus, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Total AI Generations', value: adminStats.totalGenerations, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Platform Revenue', value: `$${adminStats.revenue}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-primary" /> Admin Overview
          </h1>
          <p className="text-white/40 mt-1">System-wide analytics and platform control.</p>
        </div>
        <div className="flex gap-3">
          <Card className="px-4 py-2 border-primary/20 bg-primary/5">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">System Status: healthy</span>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <TrendingUp size={12} />
                    <span>Live</span>
                  </div>
                </div>
                <h3 className="text-white/40 text-sm font-medium mb-1">{stat.label}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{loading ? '...' : stat.value}</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={16} className="text-white/20" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-primary" />
                 Platform Growth
              </h3>
           </div>
           <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <p className="text-white/20 text-sm">Growth Chart Visualization Under Construction</p>
           </div>
        </Card>

        <Card className="p-8">
           <h3 className="text-xl font-bold mb-6">Recent New Users</h3>
           <div className="space-y-6">
              {loading ? (
                <div className="text-center text-white/20 text-xs">Loading latest users...</div>
              ) : adminStats.latestUsers.length > 0 ? adminStats.latestUsers.map((user: any, i: number) => (
                 <div key={user._id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                       {user.name.charAt(0)}
                    </div>
                    <div>
                       <p className="text-sm font-medium">{user.name}</p>
                       <p className="text-[10px] text-white/30 uppercase tracking-wider">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                       </p>
                    </div>
                 </div>
              )) : (
                <div className="text-center text-white/20 text-xs">No users found.</div>
              )}
           </div>
        </Card>
      </div>
    </div>
  );
}
