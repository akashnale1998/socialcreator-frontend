"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Clock, 
  Globe, 
  ShieldCheck,
  ArrowUpRight,
  PieChart
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAnalyticsThunk } from '@/store/apis';

export default function AnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: analyticsData, loading } = useSelector((state: RootState) => state.adminAnalytics);

  useEffect(() => {
    dispatch(getAnalyticsThunk({}));
  }, [dispatch]);

  const trends = analyticsData?.data?.trends || [];
  const distribution = analyticsData?.data?.distribution || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="text-primary" /> AI Usage Analytics
          </h1>
          <p className="text-white/40 mt-1">Detailed insights into platform usage and AI generation trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Generations/User', value: '4.2', change: '+12%', icon: Zap, color: 'text-blue-400' },
          { label: 'Token Efficiency', value: '98.4%', change: '+2.1%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Peak Usage Time', value: '2PM - 6PM', change: 'Steady', icon: Clock, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{stat.change}</span>
              </div>
              <h3 className="text-white/40 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="text-primary w-5 h-5" />
            Generation Trends (Last 7 Days)
          </h3>
          <div className="h-[300px] flex items-end gap-3 px-4">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-white/20">Loading trends...</div>
            ) : trends.length > 0 ? trends.map((day: any, i: number) => {
              const maxCount = Math.max(...trends.map((t: any) => t.count), 1);
              const height = (day.count / maxCount) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-lg relative group min-h-[4px]"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {day.count} Gens
                    </div>
                  </motion.div>
                  <span className="text-[8px] text-white/20 font-bold uppercase truncate w-full text-center">
                    {day.date.split('-').slice(1).join('/')}
                  </span>
                </div>
              );
            }) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">No data available</div>
            )}
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <PieChart className="text-secondary w-5 h-5" />
            Feature Distribution
          </h3>
          <div className="space-y-6">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center text-white/20">Loading distribution...</div>
            ) : distribution.length > 0 ? distribution.map((item: any) => {
              const total = distribution.reduce((acc: number, cur: any) => acc + cur.count, 0);
              const percentage = Math.round((item.count / total) * 100);
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60 capitalize">{item.label.replace('_', ' ')}</span>
                    <span className="font-bold">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className={`h-full bg-primary/60`}
                    />
                  </div>
                </div>
              );
            }) : (
              <div className="h-[200px] flex items-center justify-center text-white/20">No data available</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
