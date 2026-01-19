
import React, { useEffect, useState, useRef } from 'react';

const Counter: React.FC<{ end: number; suffix?: string; label: string }> = ({ end, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={elementRef} className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex-1">
      <div className="text-3xl font-black text-yellow-500 mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" 
                  alt="Engineering" 
                  className="rounded-2xl shadow-lg w-full transform hover:scale-105 transition-transform duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400" 
                  alt="Industrial" 
                  className="rounded-2xl shadow-lg w-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400" 
                  alt="Control Systems" 
                  className="rounded-2xl shadow-lg w-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-yellow-600"></span>
              لماذا نحن؟
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              كادر هندسي مؤهل يجمع بين <span className="text-yellow-500">الدقة والجودة</span>
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              يعتمد كادرنا في العريقي على منهجيات عمل مدروسة، ودقة متناهية في التفاصيل، مع التزام صارم بمعايير الجودة والسلامة المهنية لضمان استمرارية أعمالكم.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Counter end={10} suffix="+" label="سنوات خبرة" />
              <Counter end={250} suffix="+" label="مشروع منجز" />
              <Counter end={100} suffix="%" label="رضا العملاء" />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                'تصميم وفق المعايير الدولية',
                'تقليل الأعطال المفاجئة',
                'صيانة احترافية شاملة',
                'دعم فني على مدار الساعة'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-sm bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-[10px]">
                    L
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
