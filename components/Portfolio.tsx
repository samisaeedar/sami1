
import React, { useState } from 'react';

interface Project {
  title: string;
  category: string;
  image: string;
  stats: string;
  description: string;
  details: string[];
  tech: string[];
}

const projects: Project[] = [
  {
    title: "برمجة PLC لمصانع الأغذية",
    category: "حلول الأتمتة",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    stats: "دقة 100%",
    description: "قمنا بتطوير وتحديث نظام التحكم الكامل لخط إنتاج بمصنع أغذية كبرى، باستخدام وحدات Siemens S7-1500.",
    details: [
      "تحديث برمجيات التحكم لتقليل الهدر بنسبة 15%",
      "ربط نظام الإنتاج بشاشات HMI متطورة للمراقبة اللحظية",
      "إضافة أنظمة حماية متقدمة ضد الأخطاء البشرية"
    ],
    tech: ["Siemens PLC", "TIA Portal", "HMI Design", "SCADA"]
  },
  {
    title: "نظام ATS للمستشفيات",
    category: "أنظمة الطوارئ",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    stats: "استجابة 0.5s",
    description: "تصميم وتنفيذ لوحات تحويل أوتوماتيكية (ATS) لمستشفى تخصصي لضمان عدم انقطاع التيار عن غرف العمليات.",
    details: [
      "زمن استجابة فائق السرعة أقل من نصف ثانية",
      "نظام مراقبة عن بعد لحالة المولدات والكهرباء العامة",
      "توزيع أحمال ذكي لتجنب الضغط المفاجئ"
    ],
    tech: ["ATS Panels", "Smart Sensors", "Auto-Transfer Switch", "Power Backup"]
  },
  {
    title: "مزامنة المولدات العملاقة",
    category: "توليد الطاقة",
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=800",
    stats: "قدرة 5MW+",
    description: "مشروع مزامنة (Synchronization) لـ 4 مولدات عملاقة لتعمل كمحطة طاقة واحدة متكاملة.",
    details: [
      "مزامنة دقيقة للتردد والجهد بين المولدات",
      "نظام Load Sharing لتقسيم الأحمال بالتساوي",
      "توفير في استهلاك الوقود بنسبة 12% عبر التشغيل الذكي"
    ],
    tech: ["Generator Sync", "DeepSea Controllers", "Load Sharing", "Switchgear"]
  },
  {
    title: "لوحات التحكم الذكية SCADA",
    category: "تحكم عن بعد",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    stats: "مراقبة لحظية",
    description: "تطوير نظام SCADA متكامل لمراقبة منشأة صناعية عن بعد، مع تقارير أداء دورية.",
    details: [
      "واجهات رسومية سهلة الاستخدام للمشغلين",
      "نظام إنذار مبكر للأعطال عبر الرسائل النصية",
      "تخزين سحابي لبيانات الإنتاج والتشغيل"
    ],
    tech: ["SCADA", "Remote Monitoring", "IoT", "Data Logging"]
  }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <section id="portfolio" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-yellow-500 font-black tracking-widest uppercase text-sm mb-4">سابقة أعمالنا</h2>
          <p className="text-4xl md:text-5xl font-black text-white mb-6">مشاريع هندسية <span className="text-yellow-500">نفخر بها</span></p>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">نحن لا نبني لوحات فحسب، بل نصمم عصب الصناعة الذي لا يتوقف. انقر على أي مشروع للمزيد من التفاصيل.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedProject(project)}
              className="group relative bg-slate-800 rounded-[2.5rem] p-4 border border-slate-700 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-4 cursor-pointer"
            >
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-yellow-500 text-slate-900 text-[10px] font-black rounded-full shadow-lg">
                    {project.stats}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-full font-black text-xs shadow-xl">
                    عرض التفاصيل
                  </div>
                </div>
              </div>
              
              <div className="px-2">
                <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest block mb-2">{project.category}</span>
                <h3 className="text-white font-bold text-xl leading-snug group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600 flex items-center justify-center text-[10px] text-white">⚙️</div>
                    <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] text-white">⚡</div>
                  </div>
                  <button className="text-white/40 group-hover:text-yellow-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          ></div>
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col md:flex-row">
            {/* Close Button Mobile */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-slate-900/50 text-white p-2 rounded-full md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {/* Project Image Panel */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              <div className="absolute bottom-6 right-6">
                <span className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-xl font-black text-sm shadow-xl">
                  {selectedProject.stats}
                </span>
              </div>
            </div>

            {/* Project Content Panel */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white text-right">
              <div className="flex justify-between items-start mb-6 hidden md:flex">
                <button 
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <span className="text-yellow-600 font-black text-xs uppercase tracking-widest">{selectedProject.category}</span>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-4">{selectedProject.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                {selectedProject.description}
              </p>

              <div className="mb-8">
                <h4 className="text-slate-900 font-black mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  أهم منجزات المشروع:
                </h4>
                <ul className="space-y-3">
                  {selectedProject.details.map((detail, i) => (
                    <li key={i} className="text-slate-500 text-sm flex items-start gap-3">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-slate-900 font-black mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  التقنيات المستخدمة:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <a 
                  href="#contact" 
                  onClick={closeModal}
                  className="block w-full bg-slate-900 text-white text-center py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                >
                  طلب مشروع مشابه
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
