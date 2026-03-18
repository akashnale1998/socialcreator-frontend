"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Megaphone, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Trash
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createAnnouncementThunk, getAnnouncementsThunk } from '@/store/apis';

export default function AnnouncementsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: announcementsData, loading } = useSelector((state: RootState) => state.adminAnnouncements);
  const { loading: isPublishing } = useSelector((state: RootState) => state.createAnnouncement);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('info');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(getAnnouncementsThunk({}));
  }, [dispatch]);

  const announcements = announcementsData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createAnnouncementThunk({ title, content, type })).then((res: any) => {
      if (res.payload?.success) {
        setIsSuccess(true);
        setTitle('');
        setContent('');
        dispatch(getAnnouncementsThunk({}));
        setTimeout(() => setIsSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Megaphone className="text-sky-400" /> Announcements
          </h1>
          <p className="text-white/40 mt-1">Push system-wide updates and notifications to all users.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">Announcement Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. System Maintenance"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">Announcement Content</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Details about the update..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 outline-none transition-all min-h-[150px]"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
               {['info', 'warning', 'success'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      type === t 
                        ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                        : 'border-white/10 text-white/30 hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
               ))}
            </div>

            <button 
              type="submit"
              disabled={isPublishing}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isPublishing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isPublishing ? 'Publishing...' : 'Publish Announcement'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-medium">Announcement published successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Card>

        <div className="space-y-6">
           <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-white/40">
                 <Clock size={16} /> History
              </h3>
              <div className="space-y-4">
                 {loading ? (
                    <div className="p-4 text-center text-white/20 text-xs">Loading history...</div>
                 ) : announcements.length > 0 ? announcements.map((ann: any) => (
                    <div key={ann._id} className="p-4 bg-white/5 rounded-xl border border-white/5 relative group cursor-pointer hover:border-white/10 transition-all">
                       <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                          ann.type === 'info' ? 'text-sky-400' : ann.type === 'warning' ? 'text-amber-500' : 'text-emerald-400'
                       }`}>{ann.type}</p>
                       <p className="text-xs font-bold text-white mb-1">{ann.title}</p>
                       <p className="text-[10px] text-white/40 line-clamp-2">{ann.content}</p>
                       <p className="mt-2 text-[8px] text-white/20 uppercase font-bold">
                          {new Date(ann.createdAt).toLocaleDateString()}
                       </p>
                    </div>
                 )) : (
                    <div className="p-4 text-center text-white/20 text-xs text-balance">
                       No announcements published yet.
                    </div>
                 )}
              </div>
           </Card>

           <Card className="p-6 bg-amber-500/5 border-amber-500/20">
              <div className="flex gap-4">
                 <AlertCircle className="text-amber-500 shrink-0" size={20} />
                 <p className="text-[10px] text-amber-500/80 leading-relaxed font-medium">
                    Announcements will be visible to all logged-in users via the notification banner and navbar alert.
                 </p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
