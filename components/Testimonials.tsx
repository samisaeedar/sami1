
import React from 'react';

const LogoCard: React.FC<{ partner: { name: string; logo: string } }> = ({ partner }) => (
  <div 
    className="group relative flex items-center justify-center w-[160px] md:w-[200px] h-[90px] md:h-[110px] bg-white rounded-2xl mx-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex-shrink-0 cursor-pointer overflow-hidden p-4"
    title={partner.name}
  >
    <img 
      src={partner.logo} 
      alt={partner.name}
      className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-2"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-colors duration-500"></div>
  </div>
);

const Testimonials: React.FC<{ partners: any[] }> = ({ partners }) => {
  if (partners.length === 0) return null;

  const displayPartners = [...partners, ...partners, ...partners]; 

  return (
    <section id="testimonials" className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 overflow-hidden relative">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        .slider-container:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-yellow-500 font-black tracking-[0.3em] uppercase text-xs mb-4">شركاء النجاح</h2>
        <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          ثقة تعتز بها <span className="text-yellow-500">أكبر المؤسسات</span>
        </p>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto mt-6 rounded-full opacity-80"></div>
      </div>

      <div className="relative w-full slider-container" dir="ltr">
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-scroll items-center">
          {displayPartners.map((partner, idx) => (
            <LogoCard key={`${idx}-${partner.id}`} partner={partner} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            نعمل مع نخبة القطاعات المصرفية والصناعية في الجمهورية اليمنية
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
