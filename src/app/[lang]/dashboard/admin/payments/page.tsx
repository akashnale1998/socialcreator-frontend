"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getPaymentsThunk } from '@/store/apis';

export default function PaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: paymentsData, loading } = useSelector((state: RootState) => state.adminPayments);

  useEffect(() => {
    dispatch(getPaymentsThunk({}));
  }, [dispatch]);

  const payments = paymentsData?.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <DollarSign className="text-emerald-400" /> Payments & Revenue
          </h1>
          <p className="text-white/40 mt-1">Monitor transactions, subscriptions, and financial growth.</p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <ArrowUpRight size={14} />
              Export CSV
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: '$12,450', change: '+18.2%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Active Subs', value: '142', change: '+12', icon: CheckCircle2, color: 'text-blue-400' },
          { label: 'Pending Payouts', value: '$840', change: 'Steady', icon: Clock, color: 'text-amber-400' },
          { label: 'Churn Rate', value: '2.4%', change: '-0.5%', icon: XCircle, color: 'text-rose-400' },
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
                  <stat.icon size={20} />
                </div>
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} uppercase tracking-wider`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-white/40 text-xs mb-1">{stat.label}</h3>
              <p className="text-xl font-bold">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/30 font-bold">
                <th className="px-4 py-4">Transaction ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-white/20">Loading payments...</td></tr>
              ) : payments.map((payment: any) => (
                <tr key={payment.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-4 font-mono text-xs text-white/40">
                    #{payment.id.padStart(6, '0')}
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {payment.user}
                  </td>
                  <td className="px-4 py-4 font-bold text-emerald-400">
                    ${payment.amount}.00
                  </td>
                  <td className="px-4 py-4 text-white/40 text-xs">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                      payment.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
