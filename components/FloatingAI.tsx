
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  links?: { uri: string; title: string; type: 'map' | 'search' }[];
}

const STORAGE_KEY = 'al_oraiqi_v9_direct';

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [{ 
      role: 'model', 
      text: 'مرحباً بك في مركز العريقي للخدمات الصناعية. أنا مهندسك الرقمي المساعد، كيف يمكنني مساعدتك في أنظمة الطاقة والتحكم اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })
    }];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const time = new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' });
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend, timestamp: time }]);
    setLoading(true);

    try {
      // التهيئة المباشرة باستخدام مفتاح البيئة
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: textToSend }] }],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `أنت "المهندس الافتراضي لشركة العريقي للهندسة" في اليمن. 
          تخصصك الدقيق: صيانة المولدات (Caterpillar, Perkins)، برمجة لوحات PLC (Siemens, Delta)، أنظمة ATS، ومزامنة المولدات.
          عنواننا: صنعاء، الدائري، جوار سويد للتجارة. 
          رقم التواصل: 777403614.
          أجب بلغة عربية فصحى بسيطة وعملية. كن خبيراً ومساعداً جداً.`,
        },
      });

      const groundingLinks: any[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          groundingLinks.push({ uri: chunk.web.uri, title: chunk.web.title, type: 'search' });
        }
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text || "أنا معك، هل لديك استفسار فني آخر بخصوص أنظمة التحكم؟",
        timestamp: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
        links: groundingLinks.length > 0 ? groundingLinks : undefined
      }]);
    } catch (error: any) {
      console.error("AI connection error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "نعتذر، هناك ضغط حالي على الخادم. يرجى مراسلة مهندسينا مباشرة عبر واتساب: 777403614",
        timestamp: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[100] flex flex-col items-end font-['Tajawal']">
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[550px] bg-slate-900 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          
          <div className="p-6 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">⚡</div>
              <div>
                <h4 className="font-black text-white text-xs">مهندس العريقي الذكي</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">مُتصل الآن</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[11px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-yellow-500 text-slate-950 font-bold rounded-tr-none' 
                  : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                  
                  {m.links && (
                    <div className="mt-4 space-y-2 border-t border-slate-700/50 pt-3">
                      <p className="text-[7px] font-black text-slate-500 mb-2 italic uppercase tracking-tighter">المصادر التقنية:</p>
                      {m.links.map((link, idx) => (
                        <a key={idx} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 bg-slate-900 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-all">
                          <span className="text-base">🌐</span>
                          <span className="text-[9px] font-black text-slate-300 truncate">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  <div className={`text-[7px] mt-2 opacity-30 font-bold ${m.role === 'user' ? 'text-left' : 'text-right'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-end">
                <div className="bg-slate-800 px-5 py-3 rounded-2xl border border-slate-700 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 focus-within:border-yellow-500/30 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اسأل الخبير الهندسي..."
                className="flex-1 bg-transparent border-none px-4 py-3 text-white text-[11px] outline-none font-bold placeholder:text-slate-700"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={loading}
                className="bg-yellow-500 text-slate-950 w-11 h-11 rounded-xl flex items-center justify-center hover:bg-yellow-400 transition-all active:scale-95 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 md:w-20 md:h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
          isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-yellow-500 hover:scale-110 shadow-yellow-500/40'
        }`}
      >
        {isOpen ? (
          <svg className="text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative">
            <svg className="text-slate-950" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-4 border-yellow-500 rounded-full animate-pulse shadow-sm"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingAI;
