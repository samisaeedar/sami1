
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  stats?: string;
  techSpecs?: string; 
}

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3.2);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1.2);
      else if (window.innerWidth < 1024) setItemsToShow(2.2);
      else setItemsToShow(3.2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev >= projects.length - Math.floor(itemsToShow) ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev === 0 ? projects.length - Math.floor(itemsToShow) : prev - 1);
  };

  const memoizedProjects = useMemo(() => projects, [projects]);

  return (
    <section id="portfolio" className="py-12 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-right">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8 px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></span>
              سجل الإنجازات الميدانية
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              مشاريع <span className="text-yellow-500 font-outline-2">عملاقة</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium text-lg">تصفح أضخم المشاريع الهندسية التي قمنا بتنفيذها بأعلى معايير الدقة.</p>
          </div>
          
          <div className="flex gap-4" dir="ltr">
             <button onClick={prevSlide} className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-yellow-500 hover:border-yellow-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-all group shadow-lg active:scale-90 bg-white dark:bg-slate-900">
                <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button onClick={nextSlide} className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-yellow-500 hover:border-yellow-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-all group shadow-lg active:scale-90 bg-white dark:bg-slate-900">
                <svg className="w-6 h-6 md:w-8 md:h-8 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        </div>

        {memoizedProjects.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-black text-xl">جاري استدعاء البيانات...</p>
          </div>
        ) : (
          <div className="relative overflow-visible py-6" dir="ltr">
            <div 
              className="flex transition-transform duration-500 ease-out gpu-accelerated"
              style={{ transform: `translate3d(-${currentIndex * (100 / itemsToShow)}%, 0, 0)` }}
              onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
              onTouchMove={(e) => touchEndX.current = e.touches[0].clientX}
              onTouchEnd={() => {
                if (touchStartX.current - touchEndX.current > 70) nextSlide();
                if (touchStartX.current - touchEndX.current < -70) prevSlide();
              }}
            >
              {memoizedProjects.map((project) => (
                <div key={project.id} className="flex-shrink-0 px-3 md:px-5" style={{ width: `${100 / itemsToShow}%` }}>
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="group bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-5 border border-slate-100 dark:border-slate-800 hover:border-yellow-500 transition-all cursor-pointer shadow-md hover:shadow-xl h-full flex flex-col relative overflow-hidden"
                    dir="rtl"
                  >
                    <div className="relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-8 shadow-md bg-slate-200 dark:bg-slate-800">
                      <img 
                        src={project.image} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt={project.title} 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute top-6 left-6 px-4 py-2 bg-yellow-500 text-slate-950 text-xs font-black rounded-xl shadow-lg">
                        {project.stats || 'معتمد'}
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4">
                        <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.3em] mb-3 block">{project.category}</span>
                        <h3 className="text-slate-900 dark:text-white font-black text-xl md:text-2xl mb-4 leading-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-[10px] font-black text-slate-400 group-hover:text-slate-300">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                           <span>مشاهدة المواصفات الهندسية</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-10">
          {/* REMOVED HEAVY BLUR - Changed to solid semi-transparent background */}
          <div className="absolute inset-0 bg-slate-950/95 animate-in fade-in duration-300" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-7xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 text-right animate-in zoom-in duration-300 shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
            <div className="md:w-3/5 h-[250px] md:h-auto relative bg-slate-800">
               <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
               <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>

            <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto bg-slate-50 dark:bg-slate-900 relative">
               <button onClick={() => setSelectedProject(null)} className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors bg-white/10 p-4 rounded-full">✕</button>
               
               <header className="mb-12">
                  <span className="text-yellow-500 font-black text-xs uppercase tracking-widest mb-6 inline-block px-4 py-2 bg-yellow-500/10 rounded-xl">{selectedProject.category}</span>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">{selectedProject.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">المحرك</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">Perkins / CAT</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">الحالة</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">تم التسليم</p>
                     </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{selectedProject.description}</p>
               </header>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
