
import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "م. أحمد الغربي",
    role: "مدير الصيانة",
    company: "شركة الأغذية العالمية",
    content: "تعاملنا مع العريقي في مشروع أتمتة خطوط الإنتاج عبر الـ PLC، وكانت النتائج مبهرة من حيث الدقة في المواعيد والاحترافية العالية في البرمجة.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
  },
  {
    id: 2,
    name: "أ. خالد ناصر",
    role: "مدير العمليات",
    company: "مستشفى الأمل التخصصي",
    content: "نظام الـ ATS الذي ركبه فريق العريقي أنقذنا من مشاكل انقطاع التيار الكهربائي المتكررة. يعمل النظام بسلاسة فائقة منذ اليوم الأول.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled"
  },
  {
    id: 3,
    name: "م. سعيد العمودي",
    role: "كبير المهندسين",
    company: "الشركة اليمنية للمحركات",
    content: "أفضل فريق في اليمن لصيانة المولدات العملاقة ومزامنتها. خبرة واسعة وقدرة على حل المشاكل التقنية المعقدة في وقت قياسي.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saeed"
  }
];

const partners = [
  { name: "بنك الأمل للتمويل", logo: "🏦", color: "text-blue-600" },
  { name: "الشركة العالمية للأغذية", logo: "🍲", color: "text-green-600" },
  { name: "مصنع المدينة للخرسانة", logo: "🏗️", color: "text-orange-600" },
  { name: "مستشفى الأمل التخصصي", logo: "🏥", color: "text-red-600" },
  { name: "شركة يمن تيك", logo: "💻", color: "text-slate-700" },
  { name: "محطة الطاقة المركزية", logo: "⚡", color: "text-yellow-600" },
  { name: "مجموعة الصناعات الهندسية", logo: "⚙️", color: "text-blue-800" },
  { name: "تكنو سولف", logo: "📡", color: "text-indigo-600" }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* عناصر ديكورية خلفية */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-yellow-600 font-extrabold tracking-widest uppercase text-sm mb-3">ثقة عملاءنا</h2>
          <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">شركاء النجاح <span className="text-yellow-500">يتحدثون</span></p>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto mb-32">
          <div className="overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 shadow-xl p-8 md:p-16">
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium mb-10 italic transition-opacity duration-300">
                  "{testimonials[activeIndex].content}"
                </p>

                <div className="flex items-center gap-4 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-yellow-500 p-1 bg-white shadow-lg">
                    <img src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="text-right">
                    <h4 className="font-black text-slate-900 text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-slate-500 text-sm font-bold">{testimonials[activeIndex].role} - {testimonials[activeIndex].company}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 flex items-center">
            <button onClick={prevSlide} className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-yellow-500 hover:text-white transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 flex items-center">
            <button onClick={nextSlide} className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-yellow-500 hover:text-white transition-all active:scale-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-12 bg-yellow-500' : 'w-2 bg-slate-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Partners Logo Carousel Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">نخبة المؤسسات التي تضع ثقتها بنا</p>
          </div>

          <div className="relative overflow-hidden py-10">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-[scroll_40s_linear_infinite] w-max gap-8 md:gap-16 items-center">
              {/* Duplicate partners list twice for seamless infinite scroll */}
              {[...partners, ...partners].map((partner, i) => (
                <div 
                  key={i} 
                  className="group flex flex-col items-center gap-3 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-yellow-500/5 border border-slate-100 p-6 rounded-[2rem] transition-all duration-500 min-w-[180px] md:min-w-[220px]"
                >
                  <div className={`text-4xl md:text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 grayscale group-hover:grayscale-0 ${partner.color}`}>
                    {partner.logo}
                  </div>
                  <span className="text-xs md:text-sm font-black text-slate-500 group-hover:text-slate-900 text-center transition-colors">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border border-yellow-500/20">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
              أكثر من 250 مشروع ناجح في كافة القطاعات
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
