
import React from 'react';

const WhyUs: React.FC = () => {
  const features = [
    { title: "استجابة فورية", desc: "دعم طوارئ 24/7 لأي عطل.", icon: "⚡" },
    { title: "دقة هندسية", desc: "التزام بمعايير ISO العالمية.", icon: "📐" },
    { title: "حلول ذكية", desc: "أعلى كفاءة بأقل تكلفة تشغيل.", icon: "💡" }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500 overflow-hidden relative" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] mb-3">Trust is Earned</h2>
          <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            شريكك الموثوق <span className="text-yellow-500">للنجاح الصناعي</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:border-yellow-500 transition-all duration-500 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 shrink-0 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-yellow-500 group-hover:rotate-6 transition-all duration-500">
                {f.icon}
              </div>
              <div className="text-right">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
