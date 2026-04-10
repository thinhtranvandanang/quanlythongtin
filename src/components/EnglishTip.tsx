import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

export default function EnglishTip() {
  return (
    <div className="space-y-12 pb-20">
      <header className="border-b-2 border-white/20 pb-6 mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
          Phiên bản bổ sung v2 · Tiếng Anh Thực Hành · FPT University
        </div>
        <h1 className="text-4xl font-bold leading-tight mb-2">
          Quy Trình Chuyển Câu <em className="text-accent not-italic">Việt → Anh</em>
        </h1>
        <div className="font-mono text-xs text-gray-400">
          // 5 tầng quyết định · trợ động từ · 9 loại câu · thì & trạng thái hành động · động từ khiếm khuyết · lỗi phổ biến · mẹo nhớ
        </div>
      </header>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {[
          { step: '01', label: 'Loại câu', hint: 'Khẳng định? Hỏi? Phủ định? Điều kiện?' },
          { step: '02', label: 'Chủ ngữ', hint: 'Ai? I/He/She? Đừng bỏ như tiếng Việt!' },
          { step: '03', label: 'Xác định thì', hint: 'Khi nào? Đang/Đơn/Xong?' },
          { step: '04', label: 'Chọn công thức', hint: 'Loại câu + Thì → 1 công thức duy nhất' },
          { step: '05', label: 'Điền & kiểm tra', hint: 'Chia V, a/an/the, trật tự S→V→O' },
        ].map((item, idx) => (
          <div key={idx} className="bg-navy-800/50 p-4 text-center border-r border-white/5 last:border-r-0 relative group hover:bg-navy-800 transition-colors">
            <span className="block font-mono text-[10px] text-gray-500 mb-1 tracking-wider">TẦNG {item.step}</span>
            <span className="block text-sm font-bold mb-1">{item.label}</span>
            <span className="block text-[10px] text-gray-400 leading-tight">{item.hint}</span>
            {idx < 4 && (
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-white/20">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SWIFT Mnemonic */}
      <div className="bg-navy-950 p-8 rounded-3xl border border-white/5 shadow-inner">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-6 uppercase">
          // MẸO NHỚ — CÔNG THỨC SWIFT
        </div>
        <div className="space-y-4">
          {[
            { l: 'S', w: 'Subject', d: 'Ai? Cái gì? → I / She / They / He…' },
            { l: 'W', w: 'When', d: 'Khi nào? → Xác định thì (hiện tại / quá khứ / tương lai)' },
            { l: 'I', w: 'Inflect', d: 'Chia động từ đúng thì và chủ ngữ' },
            { l: 'F', w: 'Fill in', d: 'Thêm tân ngữ / bổ ngữ / thông tin còn thiếu' },
            { l: 'T', w: 'Time word', d: 'Thêm trạng từ thời gian: yesterday / now / already…' },
          ].map((item) => (
            <div key={item.l} className="flex items-baseline gap-6">
              <span className="font-mono text-3xl font-bold text-white/20 w-8 flex-shrink-0">{item.l}</span>
              <span className="font-bold text-lg w-24 flex-shrink-0">{item.w}</span>
              <span className="text-sm text-white/60">{item.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Examples Section */}
      <section className="bg-accent/5 border border-accent/20 p-8 rounded-3xl space-y-8">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent font-bold mb-4">
          // Ví dụ áp 5 tầng thực tế
        </div>
        {[
          {
            v: 'Hôm qua anh ấy không đến trường.',
            steps: ['01 Loại: Phủ định', '02 S: He', '03 Thì: hôm qua → Past Simple', '04 CT: S + didn\'t + V', '05 Điền: go to school yesterday'],
            r: 'He didn\'t go to school yesterday.'
          },
          {
            v: 'Bạn đã từng đến Hà Nội chưa?',
            steps: ['01 Loại: Hỏi Yes/No', '02 S: You', '03 Thì: đã từng/chưa → Present Perfect', '04 CT: Have/Has + S + ever + V3?', '05 Điền: been to Hanoi'],
            r: 'Have you ever been to Hanoi?'
          }
        ].map((ex, i) => (
          <div key={i} className="space-y-3">
            <div className="text-lg italic text-gray-400">「 {ex.v} 」</div>
            <div className="flex flex-wrap gap-2">
              {ex.steps.map((s, j) => (
                <span key={j} className="font-mono text-[10px] px-2 py-1 bg-navy-900 border border-white/10 rounded text-gray-400">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-xl font-bold text-accent font-mono">{ex.r}</div>
          </div>
        ))}
      </section>

      {/* Tense Table */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-2">
          <span className="bg-white text-navy-900 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider">TẦNG 03</span>
          <h2 className="text-xl font-bold">Xác định Thì — Dấu hiệu & Công thức</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-950 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-3">Từ tín hiệu</th>
                <th className="px-6 py-3">Thì</th>
                <th className="px-6 py-3">Công thức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { s: 'thường, luôn, mỗi ngày', t: 'Present Simple', f: 'S + V(s/es)', c: 'border-l-4 border-l-green-500' },
                { s: 'đang, lúc này, now', t: 'Present Continuous', f: 'S + am/is/are + V-ing', c: 'border-l-4 border-l-green-500' },
                { s: 'đã từng, vừa, chưa', t: 'Present Perfect', f: 'S + have/has + V3', c: 'border-l-4 border-l-yellow-500' },
                { s: 'hôm qua, ago, last', t: 'Past Simple', f: 'S + V2/ed', c: 'border-l-4 border-l-red-500' },
                { s: 'sẽ, sắp (tức thời)', t: 'Future Simple', f: 'S + will + V', c: 'border-l-4 border-l-blue-500' },
              ].map((row, i) => (
                <tr key={i} className={`hover:bg-white/5 transition-colors ${row.c}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {row.s.split(', ').map(tag => (
                        <span key={tag} className="bg-accent/10 text-accent text-[10px] px-1.5 py-0.5 rounded font-mono">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{row.t}</td>
                  <td className="px-6 py-4 font-mono text-blue-400">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Errors */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-2">
          <span className="bg-white text-navy-900 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider">LỖI PHỔ BIẾN</span>
          <h2 className="text-xl font-bold">8 Lỗi Hay Mắc Khi Chuyển Câu</h2>
        </div>
        <div className="grid gap-4">
          {[
            { w: 'Go to school.', c: 'I have gone to school.', r: 'Tiếng Việt bỏ chủ ngữ → Tiếng Anh BẮT BUỘC có S' },
            { w: 'What you are doing?', c: 'What are you doing?', r: 'Câu hỏi Wh- → đảo trợ động từ lên TRƯỚC S' },
            { w: 'I don\'t know where does she live.', c: 'I don\'t know where she lives.', r: 'Câu hỏi lồng nhau (embedded) → S+V thẳng, KHÔNG đảo' },
          ].map((err, i) => (
            <div key={i} className="bg-navy-800/50 border border-white/10 border-l-4 border-l-red-500 p-4 rounded-xl">
              <div className="text-red-400 font-mono text-sm mb-1">✗ {err.w}</div>
              <div className="text-green-400 font-mono text-sm mb-2">✓ {err.c}</div>
              <div className="text-xs text-gray-500 italic">{err.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { i: '🗣', t: 'Filler words cứu trợ', b: 'Khi cần thời gian suy nghĩ: "Well…", "Let me think…", "Actually…"' },
          { i: '⚡', t: 'Simple trước, hoàn thiện sau', b: 'Ưu tiên Simple Present / Past khi chưa chắc chắn. Đúng 80% còn hơn im lặng.' },
        ].map((tip, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/5">
            <span className="text-2xl mb-2 block">{tip.i}</span>
            <h3 className="font-bold text-sm mb-2">{tip.t}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{tip.b}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
