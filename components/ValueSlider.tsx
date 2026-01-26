
import React, { useState, useEffect, useCallback, useRef } from 'react';

const slides = [
  {
    title: "طاقة لا تتوقف",
    subtitle: "نضمن استمرارية أعمالكم بأحدث أنظمة التوليد والدمج العالمي.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
    tag: "موثوقية"
  },
  {
    title: "دقة في الأتمتة",
    subtitle: "تصميم وبرمجة لوحات PLC تمنحكم تحكماً كاملاً وكفاءة إنتاجية قصوى.",
    image: "https://images.unsplash.com/photo-1565608444338-316f359ad563?q=80&w=2070&auto=format&fit=crop",
    tag: "ابتكار"
  },
  {
    title: "معايير سلامة دولية",
    subtitle: "نلتزم بأدق تفاصيل الأمان الصناعي لحماية كوادركم ومنشآتكم.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    tag: "أمان"
  }
];

const ValueSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - endX;
    
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    
    dragStartX.current = null;
  };

  return (
    <section className="py-12 px-6 bg-white dark:bg-slate-950 transition-colors duration-500 select-none" dir="rtl">
      <div 
        className="max-w-7xl mx-auto relative h-[400px] md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing"
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
      >
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-slate-950">
              <img
                src={slide.image}
                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-linear pointer-events-none"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 md:px-20 z-10 pointer-events-none">
              <span className="inline-block px-4 py-1.5 bg-yellow-500 text-slate-950 text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.3em] animate-in slide-in-from-top-4 duration-700">
                {slide.tag}
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight animate-in slide-in-from-bottom-6 duration-700">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-lg md:text-2xl max-w-3xl leading-relaxed font-medium animate-in slide-in-from-bottom-8 duration-700">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === current ? 'w-12 bg-yellow-500' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSlider;
