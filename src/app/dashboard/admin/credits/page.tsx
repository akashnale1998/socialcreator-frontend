"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  CreditCard, 
  Plus, 
  Minus, 
  Users, 
  Search, 
  Zap,
  TrendingUp,
  History,
  CheckCircle2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAdminUsersThunk, updateCreditsThunk } from '@/store/apis';

export default function CreditsManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: usersData, loading } = useSelector((state: RootState) => state.adminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [creditAmount, setCreditAmount] = useState(10);

  useEffect(() => {
    dispatch(getAdminUsersThunk({}));
  }, [dispatch]);

  const users = usersData?.data || [];
  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateCredits = (userId: string, currentCredits: number, action: 'add' | 'remove') => {
    const amount = action === 'add' ? creditAmount : -creditAmount;
    dispatch(updateCreditsThunk({ id: userId, amount, action: 'add' })).then(() => {
      dispatch(getAdminUsersThunk({}));
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="text-amber-400" /> Credits Management
          </h1>
          <p className="text-white/40 mt-1">Bulk manage or individually adjust user AI credits.</p>
        </div>
        
        <div className="flex items-center gap-4 glass p-2 rounded-2xl border border-white/5">
           <span className="text-xs font-bold text-white/40 uppercase ml-2">Default Amount:</span>
           <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-xl border border-white/10">
              <button onClick={() => setCreditAmount(Math.max(1, creditAmount - 10))} className="text-white/40 hover:text-white"><Minus size={14}/></button>
              <input 
                type="number" 
                value={creditAmount} 
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="w-12 bg-transparent text-center font-bold text-sm focus:outline-none"
              />
              <button onClick={() => setCreditAmount(creditAmount + 10)} className="text-white/40 hover:text-white"><Plus size={14}/></button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-3 p-6">
          <div className="relative mb-6 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search users to adjust credits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user: any) => (
              <div key={user._id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-500 font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{user.credits} Credits Remaining</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleUpdateCredits(user._id, user.credits, 'remove')}
                    className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
                  >
                    <Minus size={16} />
                  </button>
                  <button 
                    onClick={() => handleUpdateCredits(user._id, user.credits, 'add')}
                    className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
           <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <TrendingUp size={18} className="text-primary" />
                 Quick Actions
              </h3>
              <div className="space-y-3">
                 <button className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                    Grant 50 Free Credits
                 </button>
                 <button className="w-full py-3 glass border border-white/10 text-xs font-bold rounded-xl hover:bg-white/5 transition-all">
                    Reset Daily Limits
                 </button>
              </div>
           </Card>

           <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <History size={18} className="text-white/40" />
                 Recent Changes
              </h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start gap-3 border-l-2 border-white/5 pl-4 py-1">
                       <div className="space-y-1">
                          <p className="text-xs font-medium">Added credits to Alex</p>
                          <p className="text-[10px] text-white/20">2 minutes ago</p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
