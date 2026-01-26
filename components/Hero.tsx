
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-slate-950">
      {/* Blueprint Grid Background - Static is faster */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      
      {/* Reduced Animation Complexity */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-yellow-500/20 rounded-full animate-[spin_10s_linear_infinite] hidden lg:flex items-center justify-center">
        <div className="w-24 h-24 border-t-2 border-yellow-500/40 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white text-center lg:text-right">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-yellow-500/20">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              المعايير الهندسية الدولية ISO
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tighter">
              الدقة في <span className="text-yellow-500">التنفيذ</span> <br />
              التميز في <span className="text-white/40">الأداء</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              نحن في العريقي نحول التحديات الهندسية المعقدة إلى حلول تشغيلية مستقرة. تخصصنا يبدأ من أدق تفاصيل لوحات الـ PLC وينتهي بأضخم محطات التوليد.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
              <a href="#contact" className="bg-yellow-500 text-slate-950 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-center hover:bg-white transition-all shadow-lg active:scale-95 group flex items-center justify-center gap-3">
                <span>اطلب الدعم الفني</span>
                <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M11 19l-7-7 7-7"/></svg>
              </a>
              <a href="#tools" className="bg-white/5 text-white border border-white/10 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-center hover:bg-white/10 transition-all active:scale-95">
                الأدوات الهندسية
              </a>
            </div>
            
            <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 sm:gap-12 max-w-sm mx-auto lg:mx-0">
               <div className="text-center lg:text-right">
                 <p className="text-xl sm:text-2xl font-black text-white">45<span className="text-yellow-500">m</span></p>
                 <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">الاستجابة</p>
               </div>
               <div className="text-center lg:text-right">
                 <p className="text-xl sm:text-2xl font-black text-white">24<span className="text-yellow-500">/7</span></p>
                 <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">طوارئ</p>
               </div>
               <div className="text-center lg:text-right">
                 <p className="text-xl sm:text-2xl font-black text-white">100<span className="text-yellow-500">%</span></p>
                 <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">أصلية</p>
               </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0 px-4 sm:px-0">
            <div className="relative z-10 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-square group">
              {/* Removed heavy scaling animation on hover for mobile, kept standard object-cover */}
              <img 
                src="https://engaliareeki.github.io/web/assets/images/event-01.jpg" 
                alt="Industrial Engineering" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Optimized Overlay - No Blur */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-slate-900/90 border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl animate-in slide-in-from-bottom-10 duration-1000">
                 <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-yellow-500 font-black text-[8px] sm:text-[10px] tracking-widest uppercase">System Status</span>
                    <span className="text-emerald-400 font-bold text-[8px] sm:text-[10px]">Optimal</span>
                 </div>
                 <div className="space-y-2">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-yellow-500 w-3/4 animate-[progress_3s_ease-in-out_infinite]"></div>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-1/2 animate-[progress_4s_ease-in-out_infinite_reverse]"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
