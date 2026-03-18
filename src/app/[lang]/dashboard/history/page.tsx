"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { History, Search, Download, Trash2, Zap, Type, FileSearch, Lightbulb } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getHistoryThunk } from '@/store/apis';
import { useEffect } from 'react';

const historyData = [
  { id: 1, date: "2026-03-11", topic: "Baking a Chocolate Cake", type: "Hook", icon: Zap, iconColor: "text-amber-400" },
  { id: 2, date: "2026-03-10", topic: "The Future of AI in SaaS", type: "Script", icon: FileSearch, iconColor: "text-purple-400" },
  { id: 3, date: "2026-03-10", topic: "How to Grow on TikTok", type: "Title", icon: Type, iconColor: "text-blue-400" },
  { id: 4, date: "2026-03-09", topic: "Stoic Philosophy and Tech", type: "Ideas", icon: Lightbulb, iconColor: "text-emerald-400" },
  { id: 5, date: "2026-03-08", topic: "React vs Next.js Debate", type: "Hook", icon: Zap, iconColor: "text-amber-400" },
  { id: 6, date: "2026-03-07", topic: "Minimalist Desk Setup", type: "Title", icon: Type, iconColor: "text-blue-400" },
];

export default function HistoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: historyData, loading } = useSelector((state: RootState) => state.getHistory);

  useEffect(() => {
    dispatch(getHistoryThunk({}));
  }, [dispatch]);

  const items = (historyData as any[]) || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'hook': return Zap;
      case 'title': return Type;
      case 'script': return FileSearch;
      case 'ideas': return Lightbulb;
      default: return Zap;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'hook': return "text-amber-400";
      case 'title': return "text-blue-400";
      case 'script': return "text-purple-400";
      case 'ideas': return "text-emerald-400";
      default: return "text-white/40";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <History className="text-white/70" /> Generation History
          </h1>
          <p className="text-white/40 mt-1">Access all your previous viral generations in one place.</p>
        </div>
        <div className="flex gap-3">
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input placeholder="Search history..." className="pl-10 h-10" />
           </div>
           <Button variant="glass" className="gap-2">
              <Download size={18} /> Export
           </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-white/5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                   <th className="px-6 py-4">Date</th>
                   <th className="px-6 py-4">Topic</th>
                   <th className="px-6 py-4">Type</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                </tr>
             </thead>
              <tbody className="divide-y divide-white/5">
                 {loading ? (
                   <tr><td colSpan={4} className="p-8 text-center text-white/20 animate-pulse">Loading history...</td></tr>
                 ) : items.map((item: any) => {
                   const Icon = getIcon(item.type);
                   const colorClass = getIconColor(item.type);
                   return (
                   <tr key={item._id} className="group hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-4 text-sm text-white/40">{new Date(item.createdAt).toLocaleDateString()}</td>
                     <td className="px-6 py-4">
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {item.input?.topic || item.input?.hook || 'Content Generation'}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <Icon className={`w-4 h-4 ${colorClass}`} />
                           <span className="text-xs font-semibold text-white/60 uppercase">{item.type}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                              <Download size={16} />
                           </button>
                           <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 )})}
              </tbody>
           </table>
         </div>
      </Card>
      
      <div className="flex items-center justify-center pt-4">
         <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" disabled>Previous</Button>
            <div className="flex gap-1">
               <button className="w-8 h-8 rounded-lg bg-primary text-xs font-bold">1</button>
               <button className="w-8 h-8 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10">2</button>
               <button className="w-8 h-8 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10">3</button>
            </div>
            <Button variant="glass" size="sm">Next</Button>
         </div>
      </div>
    </div>
  );
}
