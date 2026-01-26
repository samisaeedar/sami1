
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "هل توفرون قطع غيار أصلية بضمان؟",
    answer: "نعم، نحن متخصصون في توريد قطع الغيار الأصلية لمحركات Perkins و Caterpillar مباشرة من الوكلاء المعتمدين، ونقدم ضماناً فعلياً على كافة القطع التي يتم تركيبها عبر كادرنا الهندسي."
  },
  {
    question: "ما هي المدة المستغرقة للاستجابة في حالات الطوارئ؟",
    answer: "نحن ندرك أهمية استمرارية التيار في المنشآت الحيوية كالبنوك والمستشفيات، لذا نوفر فريق طوارئ متاح على مدار الساعة (24/7) بمتوسط زمن استجابة لا يتعدى 45 دقيقة داخل أمانة العاصمة."
  },
  {
    question: "هل تقومون بتصميم وبرمجة لوحات الـ PLC من الصفر؟",
    answer: "بالتأكيد، نمتلك مهندسي أتمتة متخصصين في تصميم وبناء لوحات التحكم وبرمجتها باستخدام TIA Portal لأنظمة Siemens، وقمنا بتنفيذ العديد من المشاريع الناجحة لمصانع الأغذية وشركات الأدوية."
  },
  {
    question: "ما هي مميزات عقود الصيانة السنوية لدى العريقي؟",
    answer: "تشمل عقودنا السنوية زيارات دورية وقائية، فحص كفاءة الزيوت والفلاتر، اختبار أنظمة الـ ATS، وتوفير قطع غيار بأسعار تفضيلية، مع أولوية قصوى في بلاغات الطوارئ."
  },
  {
    question: "هل لديكم خدمات خارج مدينة صنعاء؟",
    answer: "نعم، تغطي خدماتنا الهندسية أغلب محافظات الجمهورية اليمنية، حيث نمتلك فرقاً ميدانية مجهزة بكافة الأدوات التقنية للانتقال وتنفيذ المشاريع الكبرى في مختلف المواقع."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 bg-white dark:bg-slate-950 relative transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-yellow-500 font-black tracking-widest uppercase text-xs mb-4 italic">مركز المساعدة</h2>
          <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            الأسئلة <span className="text-yellow-500">الشائعة</span>
          </p>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mt-4 rounded-full opacity-60"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className={`group border-2 transition-all duration-300 rounded-[2rem] overflow-hidden ${
                activeIndex === index 
                ? 'border-yellow-500 bg-slate-50 dark:bg-slate-900 shadow-xl' 
                : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-right outline-none"
              >
                <span className={`text-base md:text-lg font-black transition-colors ${
                  activeIndex === index ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {item.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  activeIndex === index ? 'bg-yellow-500 text-slate-900 rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {activeIndex === index ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 5v14M5 12h14"/></svg>
                  )}
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-6">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-block p-6 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-4">لديك سؤال تقني آخر؟</p>
            <a 
              href="#contact" 
              className="text-yellow-600 dark:text-yellow-500 font-black flex items-center justify-center gap-2 hover:gap-4 transition-all"
            >
              <span>تحدث مباشرة مع أحد مهندسينا</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
