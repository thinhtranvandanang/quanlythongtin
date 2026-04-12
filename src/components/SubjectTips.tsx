import { useState } from 'react';
import { Book, GraduationCap, Languages, Calculator, FlaskConical, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnglishTip from './EnglishTip';

const subjects = [
  { id: 'english', name: 'Tiếng Anh', icon: Languages, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'math', name: 'Toán học', icon: Calculator, color: 'text-red-400', bg: 'bg-red-400/10' },
  { id: 'science', name: 'Khoa học', icon: FlaskConical, color: 'text-green-400', bg: 'bg-green-400/10' },
  { id: 'history', name: 'Lịch sử', icon: History, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

export default function SubjectTips() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-accent" />
          Mẹo các môn học
        </h2>
        {activeSubject && (
          <button 
            onClick={() => setActiveSubject(null)}
            className="text-sm font-medium text-accent hover:underline"
          >
            Quay lại danh sách
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!activeSubject ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => subject.id === 'english' && setActiveSubject(subject.id)}
                className={`glass p-6 rounded-3xl border border-white/5 hover:border-accent/50 transition-all text-left group flex items-center gap-4 ${subject.id !== 'english' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`${subject.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <subject.icon className={`w-6 h-6 ${subject.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                  <p className="text-sm text-gray-600">
                    {subject.id === 'english' ? 'Quy trình chuyển câu Việt → Anh' : 'Đang cập nhật nội dung...'}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {activeSubject === 'english' && <EnglishTip />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
