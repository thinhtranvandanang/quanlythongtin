import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Clock, Trash2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entry } from '../types';
import { format } from 'date-fns';

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleStatus = async () => {
    const newStatus = entry.status === 'pending' ? 'done' : 'pending';
    try {
      const { error } = await supabase
        .from('entries')
        .update({ status: newStatus })
        .eq('id', entry.id);
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating entry:', error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa mục này không?')) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', entry.id);
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting entry:', error.message);
      setIsDeleting(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-500/10 text-green-400 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    high: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  const priorityLabels = {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao'
  };

  const typeLabels = {
    task: 'Công việc',
    event: 'Sự kiện',
    knowledge: 'Kiến thức'
  };

  const typeIcons = {
    task: <CheckCircle2 className="w-4 h-4" />,
    event: <Clock className="w-4 h-4" />,
    knowledge: <Brain className="w-4 h-4" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`glass rounded-2xl overflow-hidden transition-all ${
        entry.status === 'done' ? 'opacity-60' : ''
      }`}
    >
      <div className="p-5 flex items-start gap-4">
        <button
          onClick={toggleStatus}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            entry.status === 'done' 
              ? 'bg-accent border-accent text-white' 
              : 'border-white/20 hover:border-accent text-transparent'
          }`}
        >
          <Check className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${priorityColors[entry.priority]}`}>
              {priorityLabels[entry.priority]}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10">
              {typeIcons[entry.type]}
              {typeLabels[entry.type]}
            </span>
            {entry.complexity && (
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Độ phức tạp: {entry.complexity}/5
              </span>
            )}
            <span className="text-[10px] font-medium text-gray-500 ml-auto">
              {entry.created_at ? format(new Date(entry.created_at), 'MMM d, h:mm a') : 'Vừa xong'}
            </span>
          </div>

          <h3 className={`text-lg font-medium leading-tight mb-2 ${entry.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
            {entry.summary}
          </h3>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
            >
              {isExpanded ? 'Thu gọn' : 'Xem nội dung đầy đủ'}
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs font-medium text-gray-500 hover:text-red-400 flex items-center gap-1 ml-auto"
            >
              <Trash2 className="w-3 h-3" />
              Xóa
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-white/5 text-gray-400 text-sm whitespace-pre-wrap leading-relaxed">
                  {entry.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function Brain({ className }: { className?: string }) {
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
    </svg>
  );
}
