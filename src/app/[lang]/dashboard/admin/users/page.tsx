"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Users, 
  Search, 
  Filter, 
  Shield, 
  UserX, 
  CreditCard,
  Zap,
  ChevronDown,
  X
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAdminUsersThunk, updateRoleThunk, updateStatusThunk, updateCreditsThunk, updateUserPlanThunk } from '@/store/apis';

export default function UserManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: usersData, loading } = useSelector((state: RootState) => state.adminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditingCredits, setIsEditingCredits] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);

  useEffect(() => {
    dispatch(getAdminUsersThunk({}));
  }, [dispatch]);

  const users = usersData?.data || [];
  
  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleToggle = (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    dispatch(updateRoleThunk({ id: userId, role: newRole })).then(() => {
      dispatch(getAdminUsersThunk({}));
    });
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    dispatch(updateStatusThunk({ id: userId, status: newStatus })).then(() => {
      dispatch(getAdminUsersThunk({}));
    });
  };

  const handlePlanChange = (userId: string, plan: string) => {
    dispatch(updateUserPlanThunk({ id: userId, plan })).then(() => {
      dispatch(getAdminUsersThunk({}));
    });
  };

  const handleUpdateCredits = () => {
    if (!selectedUser) return;
    dispatch(updateCreditsThunk({ id: selectedUser._id, credits: creditAmount })).then(() => {
      dispatch(getAdminUsersThunk({}));
      setIsEditingCredits(false);
      setSelectedUser(null);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-primary" /> User Management
          </h1>
          <p className="text-white/40 mt-1">Manage users, roles, subscription plans, and platform access.</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/30 font-bold">
                <th className="px-4 py-4">User</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Plan</th>
                <th className="px-4 py-4">Credits Remaining</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center text-white/20">Loading users...</td></tr>
              ) : filteredUsers.map((user: any) => (
                <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-white/30">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => handleRoleToggle(user._id, user.role)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                        user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {user.role}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative inline-block group/select">
                       <select 
                         value={user.plan || 'free'}
                         onChange={(e) => handlePlanChange(user._id, e.target.value)}
                         className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60 focus:outline-none hover:bg-white/10 transition-all cursor-pointer pr-8"
                       >
                         <option value="free">Free</option>
                         <option value="creator">Creator</option>
                         <option value="pro">Pro</option>
                       </select>
                       <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setCreditAmount(user.credits_remaining || 0);
                        setIsEditingCredits(true);
                      }}
                      className="flex items-center gap-2 font-medium text-white/60 hover:text-white transition-colors"
                    >
                      {user.credits_remaining ?? (user.credits || 0)}
                      <CreditCard size={14} className="text-white/20" />
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'active' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleStatusToggle(user._id, user.status)}
                        className={`p-2 glass border rounded-lg transition-all ${
                          user.status === 'active' ? 'hover:text-rose-400 border-white/10 hover:border-rose-400/50' : 'hover:text-emerald-400 border-white/10 hover:border-emerald-400/50'
                        }`}
                        title={user.status === 'active' ? 'Ban User' : 'Unban User'}
                      >
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Credit Edit Modal */}
      <AnimatePresence>
        {isEditingCredits && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingCredits(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0d0c22] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold flex items-center gap-3">
                    <Zap className="text-primary" /> Edit Credits
                 </h2>
                 <button onClick={() => setIsEditingCredits(false)} className="text-white/20 hover:text-white transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="space-y-6">
                 <div>
                    <p className="text-sm font-medium mb-1">Editing for <span className="text-primary">{selectedUser?.name}</span></p>
                    <p className="text-xs text-white/40 mb-4">{selectedUser?.email}</p>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest">New Credit Balance</label>
                    <input 
                      type="number" 
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:border-primary transition-all"
                    />
                 </div>

                 <button 
                  onClick={handleUpdateCredits}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-bold"
                 >
                    Save Credit Change
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
