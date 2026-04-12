import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, Info, HelpCircle, Zap, ShieldCheck, ClipboardCheck } from 'lucide-react';

export default function EnglishTip() {
  return (
    <div className="space-y-16 pb-32">
      {/* HEADER */}
      <header className="border-b-2 border-gray-200 pb-8 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-3">
          Phiên bản bổ sung v2 · Tiếng Anh Thực Hành · FPT University
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-3 tracking-tight text-gray-900">
          Quy Trình Chuyển Câu <em className="text-accent not-italic">Việt → Anh</em>
        </h1>
        <div className="font-mono text-sm text-gray-600 leading-relaxed">
          // 5 tầng quyết định · trợ động từ · 9 loại câu · thì & trạng thái hành động · động từ khiếm khuyết · lỗi phổ biến · mẹo nhớ
        </div>
      </header>

      {/* PIPELINE OVERVIEW */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          {[
            { step: '01', label: 'Loại câu', hint: 'Khẳng định? Hỏi? Phủ định? Điều kiện?' },
            { step: '02', label: 'Chủ ngữ', hint: 'Ai? I/He/She? Đừng bỏ như tiếng Việt!' },
            { step: '03', label: 'Xác định thì', hint: 'Khi nào? Đang/Đơn/Xong?' },
            { step: '04', label: 'Chọn công thức', hint: 'Loại câu + Thì → 1 công thức duy nhất' },
            { step: '05', label: 'Điền & kiểm tra', hint: 'Chia V, a/an/the, trật tự S→V→O' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 text-center border-r border-gray-100 last:border-r-0 relative group hover:bg-gray-50 transition-colors">
              <span className="block font-mono text-[10px] text-gray-500 mb-2 tracking-wider">TẦNG {item.step}</span>
              <span className="block text-base font-bold mb-2 text-gray-900">{item.label}</span>
              <span className="block text-[11px] text-gray-600 leading-tight">{item.hint}</span>
              {idx < 4 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SWIFT MNEMONIC */}
      <section className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-200 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap className="w-32 h-32 text-gray-900" />
        </div>
        <div className="font-mono text-[10px] tracking-[0.4em] text-gray-400 mb-8 uppercase">
          // MẸO NHỚ — CÔNG THỨC SWIFT
        </div>
        <div className="space-y-6 relative z-10">
          {[
            { l: 'S', w: 'Subject', d: 'Ai? Cái gì? → I / She / They / He…' },
            { l: 'W', w: 'When', d: 'Khi nào? → Xác định thì (hiện tại / quá khứ / tương lai)' },
            { l: 'I', w: 'Inflect', d: 'Chia động từ đúng thì và chủ ngữ' },
            { l: 'F', w: 'Fill in', d: 'Thêm tân ngữ / bổ ngữ / thông tin còn thiếu' },
            { l: 'T', w: 'Time word', d: 'Thêm trạng từ thời gian: yesterday / now / already…' },
          ].map((item) => (
            <div key={item.l} className="flex items-baseline gap-8 group">
              <span className="font-mono text-4xl font-bold text-gray-200 w-10 flex-shrink-0 group-hover:text-accent/20 transition-colors">{item.l}</span>
              <span className="font-bold text-xl w-32 flex-shrink-0 text-gray-900">{item.w}</span>
              <span className="text-base text-gray-600">{item.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section className="bg-accent/5 border border-accent/10 p-10 rounded-[2.5rem] space-y-10">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent font-bold mb-6">
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
          },
          {
            v: 'Nếu tôi là bạn, tôi sẽ không làm vậy.',
            steps: ['01 Loại: Điều kiện loại 2', '02 S: I / you', '03 Thì: không thực tế → Past + Would', '04 CT: If + Past, would + V', '05 Điền: were you / wouldn\'t do that'],
            r: 'If I were you, I wouldn\'t do that.'
          }
        ].map((ex, i) => (
          <div key={i} className="space-y-4 border-b border-accent/10 last:border-0 pb-10 last:pb-0">
            <div className="text-xl italic text-gray-500 font-serif">「 {ex.v} 」</div>
            <div className="flex flex-wrap gap-2">
              {ex.steps.map((s, j) => (
                <span key={j} className="font-mono text-[10px] px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-500">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-2xl font-bold text-accent font-mono tracking-tight">{ex.r}</div>
          </div>
        ))}
      </section>

      {/* TẦNG 01: LOẠI CÂU */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">TẦNG 01</span>
          <h2 className="text-2xl font-bold text-gray-900">Xác định Loại Câu — 9 Kiểu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: 'Type A', n: 'Câu Khẳng Định', f: 'S + V + O + (Place) + (Time)', ex: 'She studies English every day.', c: 'border-t-green-500' },
            { t: 'Type B', n: 'Câu Phủ Định', tr: 'không, chưa, chẳng', f: 'S + don\'t/doesn\'t/didn\'t + V\nS + haven\'t/hasn\'t + V3\nS + am/is/are + not + ...', ex: 'He doesn\'t like coffee.', c: 'border-t-red-500' },
            { t: 'Type C', n: 'Câu Hỏi Yes/No', tr: 'Đảo trợ động từ lên đầu!', f: 'Trợ ĐT + S + V(bare) + ...?', ex: 'Do you like it? / Has she left?', c: 'border-t-blue-500' },
            { t: 'Type D', n: 'Câu Hỏi Wh-', tr: 'What, Where, When, Why, How', f: 'Wh- + Trợ ĐT + S + V + ...?', ex: 'What are you doing? / Where did he go?', c: 'border-t-blue-500' },
            { t: 'Type E', n: 'Câu Hỏi Chủ Ngữ', tr: 'Who/What là chủ ngữ → KHÔNG đảo!', f: 'Who / What + V + ...?', ex: 'Who called you? / What happened?', c: 'border-t-blue-500' },
            { t: 'Type F', n: 'Câu Hỏi Lồng Nhau', tr: 'Nằm trong câu khác — KHÔNG đảo!', f: '...I wonder/know + Wh- + S + V', ex: 'I don\'t know where she lives.', c: 'border-t-blue-500' },
            { t: 'Type G', n: 'Câu Mệnh Lệnh', tr: 'Ra lệnh, yêu cầu — bỏ chủ ngữ "You"', f: 'V(bare) + O + ... !', ex: 'Open the door. / Don\'t touch that!', c: 'border-t-gray-500' },
            { t: 'Type H', n: 'Câu Điều Kiện', tr: 'Nhận biết: "nếu... thì..." — 3 loại', f: 'L1: If + Present → will + V\nL2: If + Past → would + V\nL3: If + PastPerf → would have + V3', ex: 'If it rains, I will stay home.', c: 'border-t-yellow-500' },
            { t: 'Type I', n: 'Câu Cảm Thán', tr: 'thật là, quá, ôi...', f: 'What + a/an + adj + N + S + V!\nHow + adj/adv + S + V!', ex: 'What a beautiful day!', c: 'border-t-purple-500' },
          ].map((item, i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl border border-gray-200 border-t-4 ${item.c} space-y-3 shadow-sm`}>
              <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">{item.t}</div>
              <div className="text-lg font-bold text-gray-900">{item.n}</div>
              {item.tr && <div className="text-[11px] text-red-500 font-medium">{item.tr}</div>}
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-[11px] text-blue-600 whitespace-pre-line leading-relaxed">{item.f}</div>
              <div className="text-xs italic text-gray-500">Ex: <span className="text-accent not-italic font-semibold">{item.ex}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* TẦNG 02: CHỦ NGỮ */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">TẦNG 02</span>
          <h2 className="text-2xl font-bold text-gray-900">Xác định Chủ Ngữ — Bảng Đối Chiếu</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Tiếng Việt</th>
                <th className="px-6 py-4">Tiếng Anh</th>
                <th className="px-6 py-4">Hiện tại đơn (go)</th>
                <th className="px-6 py-4">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { v: 'tôi, mình', e: 'I', g: 'I go / I am', n: 'Luôn viết hoa', s: true },
                { v: 'bạn, anh, chị, em', e: 'You', g: 'You go / You are', n: 'Số ít & nhiều đều là You' },
                { v: 'anh ấy, ông ấy', e: 'He', g: 'He goes / He is', n: 'V thêm s/es!', w: true },
                { v: 'cô ấy, bà ấy', e: 'She', g: 'She goes / She is', n: 'V thêm s/es!', w: true },
                { v: 'nó (vật, con vật)', e: 'It', g: 'It goes / It is', n: 'V thêm s/es!', w: true },
                { v: 'chúng tôi, chúng ta', e: 'We', g: 'We go / We are', n: 'V nguyên thể' },
                { v: 'họ, các bạn, chúng nó', e: 'They', g: 'They go / They are', n: 'V nguyên thể' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 italic">{row.v}</td>
                  <td className="px-6 py-4 font-bold font-mono text-lg text-gray-900">{row.e}</td>
                  <td className="px-6 py-4 font-mono text-gray-700">{row.g}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${row.w ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {row.n}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-yellow-50">
                <td colSpan={4} className="px-6 py-4 text-xs text-yellow-700 italic text-center">
                  ⚠ Tiếng Việt hay BỎ chủ ngữ → Tiếng Anh PHẢI thêm vào! Ví dụ: "Đi học rồi" → I/He/She have/has gone to school.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TẦNG 03: XÁC ĐỊNH THÌ */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">TẦNG 03</span>
          <h2 className="text-2xl font-bold text-gray-900">Xác định Thì — Hỏi 3 Câu & Nhìn Từ Tín Hiệu</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border-l-4 border-l-accent shadow-sm border border-gray-100 space-y-4">
            <div className="font-mono text-xs text-accent font-bold uppercase tracking-wider">① Việc này xả ra KHI NÀO?</div>
            <div className="flex flex-wrap gap-2">
              {['Đang → Hiện tại', 'Đã xong → Quá khứ', 'Sẽ → Tương lai', 'Vừa xong → Hoàn thành'].map(chip => (
                <span key={chip} className="text-[11px] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600">{chip}</span>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-l-4 border-l-accent shadow-sm border border-gray-100">
            <div className="font-mono text-xs text-accent font-bold uppercase tracking-wider mb-2">③ Có TỪ TÍN HIỆU nào trong câu không? → Xác định ngay!</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Từ tín hiệu tiếng Việt</th>
                <th className="px-6 py-4">Thì</th>
                <th className="px-6 py-4">Công thức cốt lõi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { s: 'thường, luôn, mỗi ngày, hay, always, every', t: 'Present Simple', f: 'S + V(s/es)', c: 'border-l-green-500' },
                { s: 'đang, lúc này, ngay bây giờ, now, at the moment', t: 'Present Continuous', f: 'S + am/is/are + V-ing', c: 'border-l-green-500' },
                { s: 'đã từng, vừa, chưa, rồi (đến nay), already, just, ever, since', t: 'Present Perfect', f: 'S + have/has + V3', c: 'border-l-yellow-500' },
                { s: 'hôm qua, trước đây, ...năm trước, yesterday, ago, last', t: 'Past Simple', f: 'S + V2/ed', c: 'border-l-red-500' },
                { s: 'đang (quá khứ), trong khi, lúc đó đang, while, when', t: 'Past Continuous', f: 'S + was/were + V-ing', c: 'border-l-red-500' },
                { s: 'trước khi (quá khứ), đã...rồi mới, before, by the time', t: 'Past Perfect', f: 'S + had + V3', c: 'border-l-red-500' },
                { s: 'sẽ, sắp (quyết định tức thời), tomorrow, soon, will', t: 'Future Simple', f: 'S + will + V', c: 'border-l-blue-500' },
                { s: 'sắp, dự định, kế hoạch, this weekend, plan to', t: 'be going to', f: 'S + am/is/are + going to + V', c: 'border-l-blue-500' },
              ].map((row, i) => (
                <tr key={i} className={`hover:bg-gray-50 transition-colors border-l-4 ${row.c}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {row.s.split(', ').map(tag => (
                        <span key={tag} className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded font-mono">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{row.t}</td>
                  <td className="px-6 py-4 font-mono text-blue-600">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TRẠNG THÁI HÀNH ĐỘNG */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG TẦNG 03</span>
          <h2 className="text-2xl font-bold text-gray-900">Xác Định Thì Theo Trạng Thái Hành Động</h2>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          Chìa khóa chọn đúng thì là nhận biết <strong>trạng thái của hành động</strong> — không chỉ "khi nào". Cùng một thời điểm quá khứ nhưng hành động đang tiếp diễn hay đã kết thúc sẽ dùng thì hoàn toàn khác nhau.
        </p>

        <div className="bg-gray-50 p-8 rounded-[2rem] space-y-8 border border-gray-200 shadow-inner">
          <div className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">// CÂY QUYẾT ĐỊNH — TRẠNG THÁI HÀNH ĐỘNG</div>
          
          <div className="bg-white border border-gray-200 border-l-4 border-l-blue-500 p-4 rounded-r-xl shadow-sm">
            <div className="font-mono text-[11px] text-blue-600 mb-1">❶ Hỏi THỜI ĐIỂM trước</div>
            <div className="text-sm text-gray-700">Hiện tại? &nbsp;→ tiếp tục Q2a &nbsp;|&nbsp; Quá khứ? → Q2b &nbsp;|&nbsp; Tương lai? → Q2c</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">HIỆN TẠI → hỏi Q2a</div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-green-500 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-green-600">Đang diễn ra ngay?</div>
                <div className="text-xs text-gray-600">CÓ → <strong>Present Continuous</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + am/is/are + V-ing</div>
              </div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-green-700 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-green-700">Thói quen / sự thật?</div>
                <div className="text-xs text-gray-600">KHÔNG → <strong>Present Simple</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + V(s/es)</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">QUÁ KHỨ → hỏi Q2b</div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-red-500 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-red-600">Đã kết thúc hoàn toàn?</div>
                <div className="text-xs text-gray-600"><strong>Past Simple</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + V2/ed</div>
              </div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-red-700 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-red-700">Đang dở giữa chừng?</div>
                <div className="text-xs text-gray-600"><strong>Past Continuous</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + was/were + V-ing</div>
              </div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-purple-500 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-purple-600">Kết quả còn liên quan?</div>
                <div className="text-xs text-gray-600"><strong>Present Perfect</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + have/has + V3</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">TƯƠNG LAI → hỏi Q2c</div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-blue-500 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-blue-600">Quyết định tức thì?</div>
                <div className="text-xs text-gray-600"><strong>Future Simple (will)</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + will + V</div>
              </div>
              <div className="bg-white border border-gray-200 border-l-4 border-l-blue-700 p-4 rounded-r-xl space-y-2 shadow-sm">
                <div className="text-xs font-bold text-blue-700">Kế hoạch có từ trước?</div>
                <div className="text-xs text-gray-600"><strong>be going to</strong></div>
                <div className="font-mono text-[10px] text-blue-600">S + am/is/are + going to + V</div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Câu tiếng Việt</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Thì đúng</th>
                <th className="px-6 py-4">Câu tiếng Anh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { v: 'Tôi ăn cơm.', s: 'thói quen', t: 'Present Simple', e: 'I eat rice. (mỗi ngày)', c: 'bg-green-50 text-green-600' },
                { v: 'Tôi đang ăn cơm.', s: 'đang xảy ra', t: 'Present Continuous', e: 'I am eating rice.', c: 'bg-blue-50 text-blue-600' },
                { v: 'Tôi đã ăn cơm. (hôm qua)', s: 'hoàn toàn kết thúc', t: 'Past Simple', e: 'I ate rice yesterday.', c: 'bg-red-50 text-red-600' },
                { v: 'Tôi đang ăn thì điện thoại reo.', s: 'đang dở (quá khứ)', t: 'Past Continuous', e: 'I was eating when it rang.', c: 'bg-orange-50 text-orange-600' },
                { v: 'Tôi vừa ăn xong rồi. (→ no rồi)', s: 'xong, còn ảnh hưởng', t: 'Present Perfect', e: 'I have just eaten.', c: 'bg-purple-50 text-purple-600' },
                { v: 'Tôi đã ăn trước khi cô ấy đến.', s: 'trước mốc quá khứ', t: 'Past Perfect', e: 'I had eaten before she came.', c: 'bg-indigo-50 text-indigo-600' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 italic">{row.v}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full ${row.c}`}>{row.s}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-blue-600">{row.t}</td>
                  <td className="px-6 py-4 font-bold font-mono text-gray-900">{row.e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="font-mono text-[10px] text-yellow-600 tracking-widest uppercase">// ĐIỂM KHÓ — PERFECT vs SIMPLE</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <div className="font-bold text-red-600">Dùng Past Simple khi:</div>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Có mốc thời gian cụ thể: yesterday, in 2020, last week, ago</li>
                <li>Hành động không còn liên quan gì đến hiện tại</li>
                <li>Kể chuyện, tường thuật sự kiện lần lượt</li>
              </ul>
              <div className="italic text-red-600/60">I met her in 2019.</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-purple-600">Dùng Present Perfect khi:</div>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Không có mốc thời gian, hoặc dùng since/for/already/just/ever</li>
                <li>Kết quả vẫn còn ảnh hưởng đến hiện tại</li>
                <li>Hỏi kinh nghiệm, trải nghiệm</li>
              </ul>
              <div className="italic text-purple-600/60">I have met her before. (→ quen rồi)</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-[2rem] space-y-6 shadow-xl">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">// MẸO NHỚ TRẠNG THÁI HÀNH ĐỘNG</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex gap-4">
              <span className="text-2xl opacity-30 font-mono text-white">●</span>
              <div>
                <div className="font-bold mb-1 text-white">-ing = đang xảy ra</div>
                <div className="text-gray-400 text-xs">Thấy "-ing" → hành động chưa kết thúc (Continuous)</div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl opacity-30 font-mono text-white">✓</span>
              <div>
                <div className="font-bold mb-1 text-white">V3 sau have/has/had = đã hoàn thành</div>
                <div className="text-gray-400 text-xs">have eaten = đã ăn xong / had eaten = đã ăn trước đó</div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl opacity-30 font-mono text-white">↩</span>
              <div>
                <div className="font-bold mb-1 text-white">Kết quả còn → Perfect</div>
                <div className="text-gray-400 text-xs">"Tôi vừa ăn" = no rồi → have eaten. "Tôi đã ăn hôm qua" → ate.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl opacity-30 font-mono text-white">②</span>
              <div>
                <div className="font-bold mb-1 text-white">2 hành động quá khứ → Past Perfect</div>
                <div className="text-gray-400 text-xs">Hành động nào xảy ra TRƯỚC → had + V3. Hành động sau → Past Simple.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRỢ ĐỘNG TỪ */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">CÔNG CỤ</span>
          <h2 className="text-2xl font-bold text-gray-900">Trợ Động Từ — "Xương Sống" Của Tiếng Anh</h2>
        </div>
        <p className="text-sm text-gray-600">Trợ động từ là "công cụ hỗ trợ" cho động từ chính. Không có trợ động từ → câu tiếng Anh không thể hỏi, phủ định, hay diễn đạt thời gian.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: 'To BE', m: 'am · is · are · was · were · be · been · being', u: ['Thì tiếp diễn: I am learning', 'Câu bị động: The book was written', 'Mô tả trạng thái: He is happy'], p: 'BE → đang / bị' },
            { t: 'To DO', m: 'do · does · did', u: ['Câu hỏi: Do you like coffee?', 'Phủ định: I don\'t understand', 'Nhấn mạnh: I do like this!'], p: 'DO → hỏi / không' },
            { t: 'To HAVE', m: 'have · has · had', u: ['Thì hoàn thành: I have finished', 'She has gone home', 'They had left before I arrived'], p: 'HAVE → đã' },
            { t: 'Modal Verbs', m: 'can · could · may · might · must · shall · should · will · would · ought to', u: ['Khả năng: I can swim', 'Xin phép: May I come in?', 'Lời khuyên: You should study', 'Dự đoán: It might rain', 'Bắt buộc: You must wear a helmet'], p: 'MODAL → khả năng / ý định / nghĩa vụ' },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
              <div className="text-lg font-bold text-gray-900">{card.t}</div>
              <div className="font-mono text-[11px] text-blue-600">{card.m}</div>
              <ul className="text-xs text-gray-600 space-y-2">
                {card.u.map((use, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-accent">→</span>
                    {use}
                  </li>
                ))}
              </ul>
              <div className="inline-block font-mono text-[11px] font-bold px-3 py-1 bg-gray-900 text-white rounded-full">{card.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TẦNG 04: MA TRẬN CÔNG THỨC */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">TẦNG 04</span>
          <h2 className="text-2xl font-bold text-gray-900">Ma Trận Công Thức — Loại Câu × Thì</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">Loại câu</th>
                <th className="px-6 py-4">Present Simple</th>
                <th className="px-6 py-4">Past Simple</th>
                <th className="px-6 py-4">Present Perfect</th>
                <th className="px-6 py-4">Future</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { l: 'Khẳng định', pr: 'S + V(s/es)', pa: 'S + V2/ed', pp: 'S + have/has + V3', f: 'S + will + V' },
                { l: 'Phủ định', pr: 'S + don\'t/doesn\'t + V', pa: 'S + didn\'t + V', pp: 'S + haven\'t/hasn\'t + V3', f: 'S + won\'t + V' },
                { l: 'Hỏi Yes/No', pr: 'Do/Does + S + V?', pa: 'Did + S + V?', pp: 'Have/Has + S + V3?', f: 'Will + S + V?' },
                { l: 'Hỏi Wh-', pr: 'Wh + do/does + S + V?', pa: 'Wh + did + S + V?', pp: 'Wh + have/has + S + V3?', f: 'Wh + will + S + V?' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-left font-bold text-gray-900 bg-gray-50/50">{row.l}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-blue-600">{row.pr}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-blue-600">{row.pa}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-blue-600">{row.pp}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-blue-600">{row.f}</td>
                </tr>
              ))}
              <tr className="bg-red-50">
                <td colSpan={5} className="px-6 py-4 text-[11px] text-red-600 font-mono italic">
                  ⚠ Hỏi lồng nhau (embedded): ...+ Wh- + S + V thẳng (KHÔNG đảo trợ động từ, không dùng do/did)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* LỖI PHỔ BIẾN */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">LỖI PHỔ BIẾN</span>
          <h2 className="text-2xl font-bold text-gray-900">8 Lỗi Hay Mắc Khi Chuyển Câu Việt → Anh</h2>
        </div>
        <div className="grid gap-4">
          {[
            { w: 'Đi học rồi. → Go to school.', c: 'I have gone to school.', r: 'Quy tắc: Tiếng Việt bỏ chủ ngữ → Tiếng Anh BẮT BUỘC có S' },
            { w: 'What you are doing?', c: 'What are you doing?', r: 'Quy tắc: Câu hỏi Wh- → đảo trợ động từ lên TRƯỚC S' },
            { w: 'Who did call you?', c: 'Who called you?', r: 'Quy tắc: Subject question (Who/What là chủ ngữ) → KHÔNG cần did, V chia bình thường' },
            { w: 'I don\'t know where does she live.', c: 'I don\'t know where she lives.', r: 'Quy tắc: Câu hỏi lồng nhau (embedded) → S+V thẳng, KHÔNG đảo trợ động từ' },
            { w: 'When I will come, I will call you.', c: 'When I come, I will call you.', r: 'Quy tắc: Mệnh đề khi/when/if loại 1 → dùng Present Simple, KHÔNG dùng will' },
            { w: 'If I will be rich, I will travel.', c: 'If I am rich, I will travel.', r: 'Quy tắc: Mệnh đề if điều kiện → Present Simple (không bao giờ dùng will trong if-clause)' },
            { w: 'She have finished the work.', c: 'She has finished the work.', r: 'Quy tắc: She / He / It → dùng HAS không phải HAVE' },
            { w: 'Did she went to school?', c: 'Did she go to school?', r: 'Quy tắc: Sau did/didn\'t → V nguyên thể (bare infinitive), không chia lại' },
          ].map((err, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 border-l-4 border-l-red-500 space-y-2 shadow-sm">
              <div className="text-red-600 font-mono text-sm">✗ {err.w}</div>
              <div className="text-green-600 font-mono text-sm">✓ {err.c}</div>
              <div className="text-xs text-gray-500 italic">{err.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MẸO BỔ SUNG */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">MẸO BỔ SUNG</span>
          <h2 className="text-2xl font-bold text-gray-900">Mẹo Nói & Nhớ Tự Nhiên Hơn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { i: '🗣', t: 'Filler words cứu trợ', b: 'Khi cần thời gian suy nghĩ: "Well…", "Let me think…", "Actually…", "You know…" — nói tự nhiên, không bị ngắt mạch.' },
            { i: '🔁', t: 'Bắt đầu bằng "I" luôn an toàn', b: 'Không biết chủ ngữ? Dùng "I think…", "I feel…", "I believe…" — luôn đúng ngữ pháp và tự nhiên.' },
            { i: '⚡', t: 'Simple trước, hoàn thiện sau', b: 'Ưu tiên Simple Present / Past khi chưa chắc chắn về thì. Đúng 80% còn hơn im lặng 100%.' },
            { i: '🎯', t: 'Nhớ cặp Subject → Verb', b: 'She → is/was/has | They → are/were/have. Luôn kiểm tra cặp S→V trước khi nói để tránh lỗi số/ngôi.' },
            { i: '📌', t: 'Be → đang/bị · Do → hỏi/không · Have → đã', b: 'Ghi nhớ 3 từ khóa này cho trợ động từ chính. Modal verbs thì nhớ: can/could=khả năng, should=lời khuyên, must=bắt buộc, will=tương lai.' },
            { i: '🔍', t: 'Tìm từ tín hiệu trước', b: 'Thấy "yesterday/ago/last" → Past Simple ngay. "already/just/ever/since" → Present Perfect. "now/at the moment" → -ing.' },
          ].map((tip, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="text-3xl">{tip.i}</div>
              <div className="font-bold text-sm text-gray-900">{tip.t}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{tip.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">CHECKLIST</span>
          <h2 className="text-2xl font-bold text-gray-900">Kiểm Tra Trước Khi Nói / Viết</h2>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-200 space-y-6 shadow-sm">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gray-400 uppercase">// 5 bước kiểm tra cuối cùng</div>
          <div className="space-y-4">
            {[
              '① Đã có chủ ngữ S chưa? (tiếng Anh không được bỏ!)',
              '② Thì có phù hợp với thời gian trong câu Việt không?',
              '③ Động từ có chia đúng theo S không? (He/She/It → thêm s/es ở hiện tại đơn)',
              '④ Câu hỏi: đã đảo trợ động từ lên đầu chưa? (trừ subject question và embedded question)',
              '⑤ Trật tự câu: S → V → O → Place → Time (không để thời gian đứng giữa câu như tiếng Việt)',
            ].map((check, i) => (
              <div key={i} className="flex items-start gap-4 text-sm text-gray-600 border-b border-gray-100 pb-4 last:border-0">
                <div className="w-5 h-5 border border-gray-200 rounded-md flex-shrink-0 mt-0.5" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BỔ SUNG A: ĐỘNG TỪ KHIẾM KHUYẾT */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG A</span>
          <h2 className="text-2xl font-bold text-gray-900">Động Từ Khiếm Khuyết — Phân Biệt Sắc Thái</h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Động từ khiếm khuyết (defective verbs / modal verbs) <strong>không có đủ dạng chia</strong> — không có <em>-s</em>, không có <em>-ing</em>, không có dạng quá khứ thông thường.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[10px] font-mono uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Modal</th>
                <th className="px-6 py-4">Ý nghĩa</th>
                <th className="px-6 py-4">Ví dụ</th>
                <th className="px-6 py-4">Độ mạnh / Lưu ý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { m: 'can', y: 'Khả năng hiện tại / xin phép', v: 'I can swim. / Can I go now?', l: 'Hiện tại/tương lai. Không chia -s, -ing.', c: 'text-green-600' },
                { m: 'could', y: 'Khả năng quá khứ / yêu cầu lịch sự', v: 'He could run fast. / Could you help me?', l: 'Lịch sự hơn can.', c: 'text-blue-600' },
                { m: 'be able to', y: 'Khả năng — mọi thì', v: 'I will be able to drive.', l: 'Thay thế can/could khi cần chia thì.', c: 'text-yellow-600' },
                { m: 'must', y: 'Bắt buộc (nội tâm / quy tắc)', v: 'You must submit the assignment.', l: '★★★ Bắt buộc cao', c: 'text-red-600' },
                { m: 'have to', y: 'Bắt buộc (hoàn cảnh)', v: 'I have to go, I\'m late.', l: '★★★ Bắt buộc cao', c: 'text-red-600' },
                { m: 'should', y: 'Lời khuyên / nên làm', v: 'You should sleep early.', l: '★★ Lời khuyên', c: 'text-green-600' },
                { m: 'may', y: 'Xin phép lịch sự / khả năng (50/50)', v: 'May I come in? / It may rain.', l: '★ Xin phép / ~50%', c: 'text-yellow-600' },
                { m: 'might', y: 'Khả năng thấp / suy đoán', v: 'He might not come.', l: '★ Không chắc ~30%', c: 'text-gray-500' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className={`px-6 py-4 font-bold font-mono ${row.c}`}>{row.m}</td>
                  <td className="px-6 py-4 text-gray-900">{row.y}</td>
                  <td className="px-6 py-4 text-gray-500 italic">{row.v}</td>
                  <td className="px-6 py-4 text-[10px] font-mono text-gray-400">{row.l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: 'must not / mustn\'t', b: '= CẤM, không được phép làm', ex: 'You must not smoke here.', c: 'border-l-red-500' },
            { t: 'don\'t have to / needn\'t', b: '= KHÔNG CẦN, tự do chọn', ex: 'You don\'t have to come early.', c: 'border-l-green-500' },
            { t: 'shouldn\'t', b: '= KHÔNG NÊN, lời khuyên không làm', ex: 'You shouldn\'t eat too much sugar.', c: 'border-l-blue-500' },
            { t: 'can\'t / cannot', b: '= KHÔNG THỂ / chắc chắn không phải', ex: 'That can\'t be him!', c: 'border-l-yellow-500' },
          ].map((item, i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl border border-gray-200 border-l-4 ${item.c} space-y-2 shadow-sm`}>
              <div className="font-mono font-bold text-accent">{item.t}</div>
              <div className="text-xs text-gray-600">{item.b}</div>
              <div className="text-xs italic text-gray-400">{item.ex}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-200 space-y-6 shadow-inner">
          <div className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase">// MODAL + HAVE + V3 — PHÁN ĐOÁN / TIẾC NUỐI</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: 'must have + V3', b: '= Chắc chắn đã... (phán đoán mạnh)', ex: 'She must have left early.' },
              { t: 'should have + V3', b: '= Đáng lẽ phải làm mà không làm', ex: 'You should have studied harder.' },
              { t: 'could have + V3', b: '= Đáng lẽ có thể làm được mà không làm', ex: 'He could have won.' },
              { t: 'might have + V3', b: '= Có lẽ đã... (phỏng đoán không chắc)', ex: 'They might have missed the bus.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl space-y-2 shadow-sm">
                <div className="font-mono font-bold text-accent text-sm">{item.t}</div>
                <div className="text-xs text-gray-600">{item.b}</div>
                <div className="text-xs italic text-gray-400">{item.ex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BỔ SUNG B: ĐỘNG TỪ TRONG CÂU TIẾNG VIỆT */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG B</span>
          <h2 className="text-2xl font-bold text-gray-900">Động Từ Trong Câu Tiếng Việt — Xác Định Thì</h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Tiếng Việt <strong>không chia động từ theo thì</strong> — thì được biểu đạt qua <em>phó từ thời gian</em> và <em>ngữ cảnh</em>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: 'TRẠNG THÁI 1 — CHƯA XẢY RA', n: 'Hành động tương lai', d: 'Dấu hiệu: sẽ, sắp, sau này, ngày mai...\nThì: Future Simple (will) / be going to', ex: 'I will help you. / I am going to visit.' },
            { t: 'TRẠNG THÁI 2 — ĐANG XẢY RA', n: 'Hành động chưa kết thúc', d: 'Dấu hiệu: đang, lúc này, now...\nThì: Present Continuous / Past Continuous', ex: 'He is cooking. / I was studying when...' },
            { t: 'TRẠNG THÁI 3 — XONG NHƯNG CÒN LIÊN QUAN', n: 'Vừa làm / đã từng / kết quả còn', d: 'Dấu hiệu: vừa, đã từng, chưa, rồi, already, just...\nThì: Present Perfect (have/has + V3)', ex: 'I have just eaten. / Have you ever been...?' },
            { t: 'TRẠNG THÁI 4 — ĐÃ KẾT THÚC HOÀN TOÀN', n: 'Quá khứ, không liên quan', d: 'Dấu hiệu: hôm qua, ago, last, yesterday...\nThì: Past Simple (V2/ed)', ex: 'I met her yesterday. / They built this in 2010.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 border-t-4 border-t-accent shadow-sm">
              <div className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">{item.t}</div>
              <div className="font-bold text-sm text-gray-900">{item.n}</div>
              <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{item.d}</div>
              <div className="text-xs italic text-accent border-t border-gray-100 pt-3">{item.ex}</div>
            </div>
          ))}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 border-t-4 border-t-green-500 md:col-span-2 shadow-sm">
            <div className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">TRẠNG THÁI 5 — THÓI QUEN / SỰ THẬT</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-xs text-gray-600">
                <strong>Thói quen:</strong> thường, hay, mỗi ngày, always, every...<br />
                Thì: Present Simple (S + V(s/es))<br />
                <em className="text-accent">I usually drink coffee.</em>
              </div>
              <div className="text-xs text-gray-600">
                <strong>Sự thật:</strong> Định luật, khoa học, sự việc luôn đúng<br />
                Thì: Present Simple (S + V(s/es))<br />
                <em className="text-accent">Water boils at 100°C.</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BỔ SUNG D: STATIVE VERBS */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG D</span>
          <h2 className="text-2xl font-bold text-gray-900">Stative Verbs — Động Từ Trạng Thái Không Dùng -ing</h2>
        </div>
        <p className="text-sm text-gray-600">Nhóm động từ này <strong>không bao giờ dùng -ing</strong> dù đang xảy ra tại thời điểm nói.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { t: 'NHẬN THỨC', m: 'know, understand, believe, think, remember, forget', c: 'border-t-green-500' },
            { t: 'CẢM XÚC', m: 'love, like, hate, want, need, prefer, wish, fear', c: 'border-t-red-500' },
            { t: 'GIÁC QUAN', m: 'see, hear, smell, taste, feel, sound, look, seem', c: 'border-t-blue-500' },
            { t: 'SỞ HỮU', m: 'have, own, belong, contain, consist, include, exist', c: 'border-t-yellow-500' },
          ].map((item, i) => (
            <div key={i} className={`bg-white p-4 rounded-xl border border-gray-200 border-t-4 ${item.c} space-y-3 shadow-sm`}>
              <div className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">{item.t}</div>
              <div className="font-mono text-[11px] text-accent leading-relaxed">{item.m}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BỔ SUNG F: CÂU HỎI LỒNG NHAU */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG F</span>
          <h2 className="text-2xl font-bold text-gray-900">Câu Hỏi Lồng Nhau — Embedded Questions</h2>
        </div>
        <div className="bg-gray-900 p-10 rounded-[2.5rem] space-y-8 shadow-xl">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">QUY TẮC QUAN TRỌNG NHẤT</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <div className="text-[10px] text-red-400 font-mono uppercase tracking-wider">❌ KHÔNG đảo trợ động từ</div>
              <div className="font-mono text-lg text-red-400/60">I don\'t know where does she live</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-green-400 font-mono uppercase tracking-wider">✅ Viết như câu khẳng định (S + V)</div>
              <div className="font-mono text-lg text-green-400">I don\'t know where she lives</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 space-y-4">
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">CÔNG THỨC CHUẨN</div>
            <div className="text-2xl font-bold text-yellow-400 font-mono tracking-tight">
              (I wonder / Do you know) + Wh- + S + V
            </div>
          </div>
        </div>
      </section>

      {/* BỔ SUNG G: MẸO NGỮ PHÁP CỐT LÕI */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <span className="bg-gray-900 text-white px-3 py-1 font-mono text-xs font-bold tracking-widest rounded">BỔ SUNG G</span>
          <h2 className="text-2xl font-bold text-gray-900">Mẹo Ngữ Pháp Cốt Lõi — Nhớ Nhóm, Dùng Đúng 80%</h2>
        </div>
        <div className="bg-gray-900 p-10 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-8 shadow-xl">
          {[
            { v: 'V1', t: 'BARE INFINITIVE', l: 'to + V1\nmodal + V1', ex: 'I want to go\nShe can swim' },
            { v: 'V-ing', t: 'GERUND / CONT.', l: 'giới từ + V-ing\nbe + V-ing', ex: 'good at speaking\nis going' },
            { v: 'V3', t: 'PAST PARTICIPLE', l: 'have/has/had + V3\nbe + V3 (passive)', ex: 'has eaten\nis built' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl space-y-4 group hover:bg-white/10 transition-colors">
              <div className="text-4xl font-black text-yellow-400/20 group-hover:text-yellow-400/40 transition-colors font-mono">{item.v}</div>
              <div className="font-mono text-[10px] text-gray-500 tracking-widest">{item.t}</div>
              <div className="font-mono text-xs text-green-400 whitespace-pre-line leading-relaxed">{item.l}</div>
              <div className="text-[10px] text-gray-500 italic whitespace-pre-line">{item.ex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        <span>v1 gốc + v2 bổ sung: modal verbs · stative verbs · 12 thì · lỗi nâng cao · câu hỏi lồng nhau · mẹo ngữ pháp cốt lõi</span>
        <span>Vietnamese → English Complete Guide v4</span>
      </footer>
    </div>
  );
}
