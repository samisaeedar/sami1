
import React from 'react';

const EngineeringProcess: React.FC = () => {
  const steps = [
    { n: "01", t: "الفحص الرقمي", d: "تشخيص دقيق باستخدام أحدث الحساسات والكاميرات الحرارية.", icon: "🔍" },
    { n: "02", t: "الهندسة والحلول", d: "رسم المخططات وتحديد القطع المطلوبة لضمان الكفاءة.", icon: "📐" },
    { n: "03", t: "التنفيذ الميداني", d: "تركيب وتشغيل تحت إشراف نخبة من كبار المهندسين.", icon: "⚙️" },
    { n: "04", t: "الاعتماد والتحميل", d: "اختبار الجهد والأداء لضمان استمرارية التشغيل 100%.", icon: "⚡" }
  ];

  return (
    <section id="engineering-process" className="py-16 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Methodology</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            مسـار <span className="text-yellow-500">الجـودة</span> الهندسـية
          </h2>
          <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0">
             <div className="h-full bg-yellow-500 w-1/3 animate-[progress_10s_linear_infinite]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((s, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                
                {/* Number & Icon Container */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl shadow-xl group-hover:border-yellow-500 group-hover:-translate-y-2 transition-all duration-500 relative z-10">
                    {s.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-950 font-black text-xs shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
                    {s.n}
                  </div>
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-[2rem] scale-0 group-hover:scale-125 transition-transform duration-700 blur-xl"></div>
                </div>

                {/* Content */}
                <div className="max-w-[240px]">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {s.t}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {s.d}
                  </p>
                </div>

                {/* Vertical Line (Mobile) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden w-px h-12 bg-slate-100 dark:bg-slate-800 my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
           <div className="inline-flex items-center gap-6 px-8 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">نلتزم بهذه المعايير في كل مشروع، مهما كان حجمه.</p>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
              <a href="#contact" className="text-yellow-600 dark:text-yellow-500 font-black text-xs hover:underline">ابدأ مشروعك معنا</a>
           </div>
        </div>

      </div>
    </section>
  );
};

export default EngineeringProcess;
