import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Brain as BrainIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProactiveSuggestions } from '../lib/gemini';
import { Entry } from '../types';

interface ProactiveNudgesProps {
  entries: Entry[];
}

export default function ProactiveNudges({ entries }: ProactiveNudgesProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  const fetchSuggestions = async () => {
    if (entries.length === 0 || isLoading) return;
    
    setIsLoading(true);
    try {
      const newSuggestions = await getProactiveSuggestions(entries);
      setSuggestions(newSuggestions);
      setLastUpdate(Date.now());
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch suggestions initially and when entries change significantly
    if (entries.length > 0 && (Date.now() - lastUpdate > 300000)) { // Every 5 mins
      fetchSuggestions();
    }
  }, [entries.length]);

  if (entries.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Gợi ý Chủ động từ AI
        </h3>
        <button
          onClick={fetchSuggestions}
          disabled={isLoading}
          className="text-xs font-medium text-gray-600 hover:text-accent flex items-center gap-1 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          Làm mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-4 rounded-2xl border-accent/20 hover:border-accent/40 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 p-1.5 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <BrainIcon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-xs font-medium text-gray-700 leading-relaxed flex-1">
                    {suggestion}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 rounded-2xl border-white/5 animate-pulse h-20" />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

