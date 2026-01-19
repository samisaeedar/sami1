
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">⚡</div>
              <span className="text-2xl font-bold">العريقي</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              نحن متخصصون في تقديم الحلول الهندسية المبتكرة للقطاعات الصناعية والتجارية، نضمن لك جودة التنفيذ واستمرارية الطاقة.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <div key={social} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer text-xs">
                  {social[0]}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-yellow-500">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">خدماتنا</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">عن الشركة</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-yellow-500">أقسام العمل</h4>
            <ul className="space-y-4 text-slate-400">
              <li>لوحات التحكم PLC</li>
              <li>أنظمة الطاقة البديلة</li>
              <li>صيانة المولدات</li>
              <li>تركيب لوحات ATS</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} العريقي للخدمات الصناعية والهندسية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</span>
            <span className="hover:text-white cursor-pointer transition-colors">الشروط والأحكام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
