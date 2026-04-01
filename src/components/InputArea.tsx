import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { analyzeContent } from '../lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';

interface InputAreaProps {
  userId: string;
}

export default function InputArea({ userId }: InputAreaProps) {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeContent(content);
      
      const { error: supabaseError } = await supabase.from('entries').insert({
        user_id: userId,
        content,
        summary: analysis.summary,
        type: analysis.type,
        priority: analysis.priority,
        complexity: analysis.complexity,
        suggested_action: analysis.suggestedAction,
        status: 'pending'
      });

      if (supabaseError) {
        console.error('Supabase Insert Error:', supabaseError);
        throw new Error(`Lỗi lưu dữ liệu: ${supabaseError.message}`);
      }

      setContent('');
    } catch (err: any) {
      console.error('Error processing entry:', err);
      // Display the actual error message if available, otherwise fallback
      setError(err.message || 'Có lỗi xảy ra khi xử lý thông tin. Vui lòng thử lại.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        
        <div className="relative glass rounded-3xl p-2 flex flex-col sm:flex-row items-stretch gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder="Dán liên kết hoặc nhập bất cứ điều gì... AI sẽ sắp xếp cho bạn."
            className="flex-1 bg-transparent border-none focus:ring-0 p-4 text-lg resize-none min-h-[100px] sm:min-h-0"
            disabled={isAnalyzing}
          />
          
          <div className="flex items-center justify-between sm:justify-end gap-2 px-2 pb-2 sm:pb-0">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium px-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Hỗ trợ bởi AI
            </div>
            
            <button
              type="submit"
              disabled={!content.trim() || isAnalyzing}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                !content.trim() || isAnalyzing
                  ? 'bg-navy-800 text-gray-600 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Lưu lại
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
