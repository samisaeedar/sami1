
import React, { useEffect, useState, useCallback, useRef } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  long_description: string;
  features: string;
  icon: string;
  category: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragOffset = useRef(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeService]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1.1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    if (services.length === 0) return;
    setCurrentIndex((prev) => (prev + 1 >= services.length ? 0 : prev + 1));
  }, [services.length]);

  const prev = useCallback(() => {
    if (services.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 < 0 ? services.length - 1 : prev - 1));
  }, [services.length]);

  useEffect(() => {
    if (isPaused || activeService || services.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused, activeService, services.length]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (activeService) return;
    setIsPaused(true);
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStartX.current = x;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragOffset.current = x - dragStartX.current;
  };

  const handleDragEnd = () => {
    if (dragStartX.current === null) return;
    const threshold = 50;
    if (dragOffset.current > threshold) prev();
    else if (dragOffset.current < -threshold) next();
    
    dragStartX.current = null;
    dragOffset.current = 0;
    setTimeout(() => setIsPaused(false), 2000);
  };

  const getTranslateX = () => {
    const step = 100 / itemsToShow;
    return `translate3d(${currentIndex * step}%, 0, 0)`;
  };

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500 select-none" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              نخبة الخدمات الهندسية
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
              تخصصاتنا <span className="text-yellow-500">الجوهرية</span>
            </h2>
          </div>

          <div className="flex gap-3" dir="ltr">
            <button onClick={prev} className="w-12 h-12 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-slate-950 transition-all active:scale-90">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
            </button>
            <button onClick={next} className="w-12 h-12 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-yellow-500 hover:text-slate-950 transition-all active:scale-90">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
          </div>
        </div>

        <div 
          className="relative overflow-visible cursor-grab active:cursor-grabbing" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); dragStartX.current = null; }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
        >
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] gpu-accelerated"
            style={{ transform: getTranslateX() }}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="flex-shrink-0 px-3" 
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div 
                  onClick={() => setActiveService(service)}
                  className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 h-full group hover:shadow-lg transition-all duration-300 flex flex-col items-start text-right cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-yellow-500 transition-all duration-300 group-hover:rotate-6">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-3">{service.category}</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <span>عرض التفاصيل</span>
                    <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity" onClick={() => setActiveService(null)}></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] relative z-10 p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setActiveService(null)} className="absolute top-8 left-8 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">✕</button>
            
            <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg shadow-yellow-500/20">
              {activeService.icon}
            </div>

            <span className="text-yellow-500 font-black text-xs uppercase tracking-widest mb-2 block">{activeService.category}</span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">{activeService.title}</h3>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-8 font-medium">
                {activeService.long_description || activeService.description}
              </p>
              
              {activeService.features && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-white/5">
                  <h4 className="font-black text-slate-900 dark:text-white mb-4">المميزات الرئيسية</h4>
                  <ul className="space-y-3">
                    {activeService.features.split(',').map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm font-bold">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0"></span>
                        {feat.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4">
              <a href="#contact" onClick={() => setActiveService(null)} className="flex-1 bg-yellow-500 text-slate-950 py-4 rounded-xl font-black text-center hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">طلب هذه الخدمة</a>
              <button onClick={() => setActiveService(null)} className="px-8 py-4 rounded-xl font-black border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 transition-colors">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
