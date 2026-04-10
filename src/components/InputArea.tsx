import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Send, Loader2, Check } from 'lucide-react';
import { analyzeContent } from '../lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { EntryType, Priority } from '../types';

interface InputAreaProps {
  userId: string;
}

export default function InputArea({ userId }: InputAreaProps) {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  
  // Manual fields
  const [manualSummary, setManualSummary] = useState('');
  const [manualType, setManualType] = useState<EntryType>('task');
  const [manualPriority, setManualPriority] = useState<Priority>('medium');

  const saveEntry = async (analysis: any, originalContent: string) => {
    const entryData = {
      user_id: userId,
      content: originalContent,
      summary: analysis.summary,
      type: analysis.type,
      priority: analysis.priority,
      complexity: analysis.complexity || 1,
      suggested_action: analysis.suggestedAction || '',
      status: 'pending'
    };

    console.log('Inserting into Supabase:', entryData);
    const { data, error: supabaseError } = await supabase
      .from('entries')
      .insert(entryData)
      .select();

    if (supabaseError) {
      console.error('Supabase Insert Error:', supabaseError);
      throw new Error(`Lỗi lưu dữ liệu: ${supabaseError.message} (${supabaseError.code})`);
    }

    console.log('Insert successful, data:', data);
    setContent('');
    setManualSummary('');
    setSuccess(true);
    setError(null);
    setShowFallback(false);
    setIsManualMode(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !manualSummary.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const manualAnalysis = {
        summary: manualSummary,
        type: manualType,
        priority: manualPriority,
        complexity: 1,
        suggestedAction: 'Đã lưu thủ công.'
      };
      await saveEntry(manualAnalysis, content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isAnalyzing) return;

    if (isManualMode) {
      return handleManualSave(e);
    }

    console.log('Starting analysis for content:', content.substring(0, 50) + '...');
    setIsAnalyzing(true);
    setError(null);
    setSuccess(false);
    setShowFallback(false);

    try {
      const analysis = await analyzeContent(content);
      console.log('AI Analysis result:', analysis);
      await saveEntry(analysis, content);
    } catch (err: any) {
      console.error('Error processing entry:', err);
      setError(err.message || 'AI đang bận. Bạn có thể tự điền thông tin bên dưới.');
      setShowFallback(true);
      setIsManualMode(true);
      setManualSummary(content.split('\n')[0].substring(0, 100));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        
        <div className="relative glass rounded-3xl p-4 flex flex-col gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Dán liên kết hoặc nhập bất cứ điều gì..."
            className="w-full bg-transparent border-none focus:ring-0 p-2 text-lg resize-none min-h-[100px]"
            disabled={isAnalyzing}
          />

          {isManualMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Loại hạng mục</label>
                  <select
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as EntryType)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-accent"
                  >
                    <option value="task">Công việc</option>
                    <option value="event">Sự kiện</option>
                    <option value="knowledge">Kiến thức</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Mức độ ưu tiên</label>
                  <select
                    value={manualPriority}
                    onChange={(e) => setManualPriority(e.target.value as Priority)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-accent"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Tiêu đề tóm tắt</label>
                <input
                  type="text"
                  value={manualSummary}
                  onChange={(e) => setManualSummary(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn nội dung..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-accent"
                />
              </div>
            </motion.div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsManualMode(!isManualMode)}
              className={`text-xs font-bold flex items-center gap-2 transition-colors ${isManualMode ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <div className={`w-8 h-4 rounded-full relative transition-colors ${isManualMode ? 'bg-accent' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isManualMode ? 'left-5' : 'left-1'}`} />
              </div>
              Chế độ thủ công
            </button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {!isManualMode && (
                <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Sparkles className="w-4 h-4 text-accent" />
                  AI Phân tích
                </div>
              )}
              
              <button
                type="submit"
                disabled={!content.trim() || (isManualMode && !manualSummary.trim()) || isAnalyzing}
                className={`flex-1 sm:flex-none px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  !content.trim() || (isManualMode && !manualSummary.trim()) || isAnalyzing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isManualMode ? 'Đang lưu...' : 'Đang phân tích...'}
                  </>
                ) : (
                  <>
                    {isManualMode ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    {isManualMode ? 'Lưu thủ công' : 'Lưu lại'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-3 shadow-lg"
          >
            <div className="bg-green-500/20 p-1.5 rounded-lg">
              <Check className="w-4 h-4" />
            </div>
            <span className="flex-1">Lưu thông tin thành công!</span>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-3 shadow-lg"
          >
            <div className="bg-red-500/20 p-1.5 rounded-lg">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span className="flex-1">{error}</span>
            {showFallback && (
              <button
                onClick={handleManualSave}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-white/10"
              >
                Lưu mà không cần AI
              </button>
            )}
            <button 
              onClick={() => setError(null)}
              className="text-xs font-bold hover:text-gray-900 transition-colors"
            >
              Đóng
            </button>
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
