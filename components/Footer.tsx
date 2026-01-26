
import React from 'react';

const Footer: React.FC<{ onAdminClick?: () => void, logoUrl?: string }> = ({ onAdminClick, logoUrl }) => {
  return (
    <footer className="bg-[#020617] pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5 text-right">
            <div className="flex items-center gap-4 mb-10 group justify-end">
              <div>
                <h2 className="text-3xl font-black text-white">العريقي <span className="text-yellow-500">للهندسة</span></h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Industrial Excellence</p>
              </div>
              <div className="w-16 h-16 bg-yellow-500 rounded-[1.5rem] flex items-center justify-center overflow-hidden text-slate-950 text-3xl font-black shadow-2xl shadow-yellow-500/20 group-hover:rotate-[360deg] transition-transform duration-1000">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span>⚡</span>
                )}
              </div>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              نحن لا نقدم مجرد خدمات، نحن نصمم البنية التحتية لمستقبل اليمن الصناعي. معاييرنا عالمية، وتنفيذنا يتجاوز التوقعات.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 text-right">
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8 text-yellow-500">الشركة</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-bold">
                <li className="hover:text-white transition-colors cursor-pointer"><a href="#about">عن العريقي</a></li>
                <li className="hover:text-white transition-colors cursor-pointer"><a href="#engineering-process">منهجية العمل</a></li>
                <li className="hover:text-white transition-colors cursor-pointer"><a href="#portfolio">المشاريع المنفذة</a></li>
                <li className="hover:text-white transition-colors cursor-pointer"><a href="#gallery">معرض الصور</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8 text-yellow-500">الوصول السريع</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-bold">
                <li className="hover:text-white transition-colors cursor-pointer"><a href="#contact">طلب صيانة</a></li>
                <li className="hover:text-white transition-colors cursor-pointer">سياسة الجودة</li>
                <li className="mt-8">
                  <button 
                    onClick={onAdminClick} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 transition-all font-black text-[10px] group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    دخول الإدارة الآمن
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8 text-yellow-500">اتصل بنا</h4>
              <p className="text-white font-black text-lg mb-2 leading-none">777403614</p>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">صنعاء، الجمهورية اليمنية</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-right order-2 md:order-1">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                © {new Date().getFullYear()} Al-Areiqi Industrial Group
              </p>
            </div>
            <a href="https://wa.me/967776668370" target="_blank" className="relative order-1 md:order-2 group">
              <div className="flex items-center gap-6 bg-[#0f172a] border border-white/5 px-8 py-5 rounded-[2.5rem] transition-all shadow-2xl group-hover:border-yellow-500/30">
                <div className="text-left border-l border-white/10 pl-6">
                  <p className="text-[7px] font-black text-yellow-500/50 uppercase tracking-[0.6em] mb-1">Lead Developer</p>
                  <p className="text-white font-black text-2xl tracking-tighter transition-all">Sami <span className="text-yellow-500">Al-Areiqi</span></p>
                </div>
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
