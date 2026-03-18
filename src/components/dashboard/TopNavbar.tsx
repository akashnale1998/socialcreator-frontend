"use client";

import React from 'react';
import { Search, Bell, ChevronDown, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const TopNavbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { data: userData } = useSelector((state: RootState) => state.me);
  const user = userData?.data || { name: 'Alex Smith' };

  return (
    <header className="h-20 border-b border-white/10 glass flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-white/50 hover:text-white lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="w-full max-w-96 hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search for templates, topics..." 
              className="pl-10 h-10 bg-white/5 border-transparent group-focus-within:border-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border border-[#030014]" />
        </button>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{(user as any).plan || 'Free'} Plan</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
};
