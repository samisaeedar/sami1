
import React, { useEffect, useRef, useState } from 'react';

const ServiceCard: React.FC<{ title: string; description: string; icon: React.ReactNode; delay: number }> = ({ title, description, icon, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
      className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.03] transition-all duration-700 ease-out group"
    >
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-all duration-300 shadow-sm overflow-hidden relative">
        <div className="text-slate-700 group-hover:text-white transition-colors relative z-10">
          {icon}
        </div>
        <div className="absolute inset-0 bg-yellow-500 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-2xl"></div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: 'لوحات التحكم PLC / HMI',
      description: 'تصميم وتنفيذ كافة لوحات التحكم الصناعية المبرمجة وشاشات اللمس بأعلى المعايير التقنية.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M20 15h2"/><path d="M9 2v2"/><path d="M9 20v2"/><path d="M2 9h2"/><path d="M20 9h2"/></svg>
      )
    },
    {
      title: 'لوحات التوزيع AC / DC',
      description: 'تصميم وتصنيع لوحات التوزيع الكهربائية للتيار المتردد والمستمر وفق المواصفات العالمية.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 12h3"/><path d="M16 6H3"/><path d="M16 18H3"/><path d="M18.22 8.61a5 5 0 1 1 0 6.78"/><rect width="20" height="20" x="2" y="2" rx="2"/></svg>
      )
    },
    {
      title: 'أنظمة التحويل ATS',
      description: 'تركيب وبرمجة أنظمة التحويل الأوتوماتيكي لضمان استمرارية الطاقة عند انقطاع المصدر الرئيسي.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h3L11 22"/><path d="M17 14h2"/><path d="M5 10H3"/></svg>
      )
    },
    {
      title: 'لوحات الدمج والمزامنة',
      description: 'حلول ذكية لدمج المولدات ومزامنتها للعمل معاً بكفاءة عالية لكافة القدرات الكهربائية.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
      )
    },
    {
      title: 'صيانة المولدات الاحترافية',
      description: 'صيانة شاملة (ميكانيكية – كهربائية – برمجية) للمولدات لضمان أداء مستقر وعمر افتراضي أطول.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      )
    },
    {
      title: 'الدعم الفني والتشغيل',
      description: 'فريق هندسي متاح لتشغيل المشاريع وتقديم الاستشارات الفنية والصيانة الدورية الوقائية.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-3">تخصصاتنا</h2>
          <p className="text-3xl md:text-4xl font-black text-slate-900">حلولنا الهندسية المتكاملة</p>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              delay={(index % 3) * 150} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
