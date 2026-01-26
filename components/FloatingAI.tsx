
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const BotIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('areiqi_gemini_chat_v1');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'مرحباً. أنا مساعدك الهندسي الذكي في شركة العريقي، كيف يمكنني مساعدتك؟' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('areiqi_gemini_chat_v1', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: "أنت مساعد مهندس في شركة العريقي للخدمات الهندسية باليمن. ردودك قصيرة، مهنية، وموجهة للعملاء. تخصصك: صيانة المولدات، أنظمة التحكم PLC. إذا طلب العميل تفاصيل هندسية دقيقة أو عرض سعر، قل له: يرجى التواصل مع المكتب الفني على الرقم 777403614.",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "يرجى التواصل معنا هاتفياً للحصول على المساعدة: 777403614";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "عذراً، حدث خطأ تقني. يرجى الاتصال بنا: 777403614" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[200] font-['Tajawal']">
      {isOpen && (
        <div className="mb-4 w-[300px] h-[450px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div className="p-4 bg-slate-950 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg">
                <BotIcon className="w-5 h-5" />
              </div>
              <p className="font-black text-[11px]">المهندس الرقمي</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">✕</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-3 rounded-2xl max-w-[90%] text-[11px] leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-yellow-500 text-slate-900 font-bold' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl text-[9px] text-slate-400 font-bold animate-pulse">جاري التحليل...</div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input 
              className="flex-1 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl outline-none text-[12px] font-bold dark:text-white" 
              placeholder="اسأل المهندس..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()} 
              className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900 shadow-md active:scale-90 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        <BotIcon className="w-7 h-7 text-slate-900" />
      </button>
    </div>
  );
};

export default FloatingAI;
