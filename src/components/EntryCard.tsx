import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Clock, Trash2, Check, ChevronDown, ChevronUp, Edit2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Entry, EntryType, Priority } from '../types';
import { format } from 'date-fns';

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(entry.summary);
  const [editedType, setEditedType] = useState<EntryType>(entry.type);
  const [editedPriority, setEditedPriority] = useState<Priority>(entry.priority);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (!editedSummary.trim()) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('entries')
        .update({
          summary: editedSummary,
          type: editedType,
          priority: editedPriority
        })
        .eq('id', entry.id);
      
      if (error) throw error;
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving entry:', error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-50 text-green-600 border-green-200',
    medium: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    high: 'bg-red-50 text-red-600 border-red-200'
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
        {!isEditing && (
          <button
            onClick={toggleStatus}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              entry.status === 'done' 
                ? 'bg-accent border-accent text-white' 
                : 'border-gray-200 hover:border-accent text-transparent'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={editedType}
                  onChange={(e) => setEditedType(e.target.value as EntryType)}
                  className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-accent"
                >
                  <option value="task">Công việc</option>
                  <option value="event">Sự kiện</option>
                  <option value="knowledge">Kiến thức</option>
                </select>
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value as Priority)}
                  className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-accent"
                >
                  <option value="low">Ưu tiên: Thấp</option>
                  <option value="medium">Ưu tiên: Trung bình</option>
                  <option value="high">Ưu tiên: Cao</option>
                </select>
              </div>
              <textarea
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-900 text-sm focus:ring-1 focus:ring-accent min-h-[80px]"
                placeholder="Nhập tiêu đề tóm tắt..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSaving ? <span className="animate-spin">...</span> : <Save className="w-3 h-3" />}
                  Lưu
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedSummary(entry.summary);
                    setEditedType(entry.type);
                    setEditedPriority(entry.priority);
                  }}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 border border-gray-200"
                >
                  <X className="w-3 h-3" />
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${priorityColors[entry.priority]}`}>
                  {priorityLabels[entry.priority]}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-200">
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

              <h3 className={`text-lg font-medium leading-tight mb-2 ${entry.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
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
                
                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-medium text-gray-500 hover:text-accent flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Sửa
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs font-medium text-gray-500 hover:text-red-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Xóa
                  </button>
                </div>
              </div>
            </>
          )}

          <AnimatePresence>
            {isExpanded && !isEditing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
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
