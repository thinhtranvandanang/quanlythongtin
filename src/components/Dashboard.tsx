import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Brain, Sparkles, List, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entry, EntryType } from '../types';
import EntryCard from './EntryCard';
import InputArea from './InputArea';
import ProactiveNudges from './ProactiveNudges';

interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<EntryType | 'all'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error.message);
      } else {
        setEntries(data || []);
      }
      setLoading(false);
    };

    fetchEntries();

    // Fallback polling every 30 seconds
    const pollInterval = setInterval(fetchEntries, 30000);

    // Subscribe to realtime changes
    const channel = supabase
      .channel('entries_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'entries',
        filter: `user_id=eq.${user.id}`
      }, () => {
        console.log('Realtime change detected, fetching entries...');
        fetchEntries();
      })
      .subscribe((status) => {
        console.log('Supabase Realtime status:', status);
      });

    return () => {
      clearInterval(pollInterval);
      supabase.removeChannel(channel);
    };
  }, [user.id]);

  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.type === filter;
    const matchesSearch = entry.content.toLowerCase().includes(search.toLowerCase()) || 
                         entry.summary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="min-h-screen bg-navy-900 text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 p-2 rounded-xl">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">Trợ lý AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-navy-800/50 p-1.5 pr-4 rounded-full border border-white/5">
            <img 
              src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
              alt="" 
              className="w-8 h-8 rounded-full" 
              referrerPolicy="no-referrer" 
            />
            <span className="text-sm font-medium hidden md:block">
              {user.user_metadata?.full_name || user.email}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Proactive Section */}
        <ProactiveNudges entries={entries} />

        {/* Input Section */}
        <InputArea userId={user.id} />

        {/* List Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <List className="w-6 h-6 text-accent" />
              Thông tin của bạn
            </h2>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {(['all', 'task', 'event', 'knowledge'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    filter === t 
                      ? 'bg-accent text-white' 
                      : 'bg-navy-800 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {t === 'all' ? 'Tất cả' : t === 'task' ? 'Công việc' : t === 'event' ? 'Sự kiện' : 'Kiến thức'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm nội dung..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-navy-800 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>

          <AnimatePresence mode="popLayout">
            {filteredEntries.length > 0 ? (
              <div className="grid gap-4">
                {filteredEntries.map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass rounded-3xl"
              >
                <div className="bg-navy-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500">Không tìm thấy nội dung. Hãy thử lưu gì đó!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
