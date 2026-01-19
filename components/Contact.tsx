
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // محاكاة إرسال
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, 
      title: 'الموقع', 
      detail: 'صنعاء – الدائري – جوار شركة سويد للتجارة', 
      link: '#' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, 
      title: 'رقم الهاتف', 
      detail: '777403614 (967+)', 
      link: 'tel:+967777403614' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, 
      title: 'البريد الإلكتروني', 
      detail: 'info@al-oraiqi.com', 
      link: 'mailto:info@al-oraiqi.com' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, 
      title: 'ساعات العمل', 
      detail: 'السبت - الخميس: 8ص - 8م', 
      link: '#' 
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-3">تواصل معنا</h2>
          <p className="text-3xl md:text-4xl font-black text-slate-900">نحن هنا لخدمتكم</p>
          <div className="w-12 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link}
                className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-yellow-200 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-sm group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-slate-500 text-xs mt-1">{item.detail}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-2">
            <form className="grid md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden" onSubmit={handleSubmit}>
              {isSent && (
                <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4">✓</div>
                  <h4 className="text-2xl font-black text-slate-900 mb-2">تم الإرسال بنجاح!</h4>
                  <p className="text-slate-500">سوف يقوم فريقنا الهندسي بالتواصل معك في أقرب وقت ممكن.</p>
                  <button onClick={() => setIsSent(false)} className="mt-6 text-yellow-600 font-bold hover:underline">إرسال رسالة أخرى</button>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">الاسم الكامل</label>
                <input required type="text" className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all bg-white" placeholder="أدخل اسمك" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">رقم الهاتف</label>
                <input required type="tel" className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all bg-white" placeholder="7XXXXXXXX" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">الخدمة المطلوبة</label>
                <div className="relative">
                  <select className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all appearance-none bg-white font-bold text-slate-700">
                    <option>صيانة مولدات ميكانيكية وكهربائية</option>
                    <option>لوحات تحكم PLC / HMI</option>
                    <option>لوحات توزيع AC / DC</option>
                    <option>أنظمة ATS والتحويل</option>
                    <option>لوحات الدمج والمزامنة</option>
                    <option>استشارة ودعم فني</option>
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">كيف يمكننا مساعدتك؟</label>
                <textarea required rows={4} className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all bg-white" placeholder="اكتب تفاصيل طلبك هنا..."></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                className={`md:col-span-2 flex items-center justify-center gap-3 font-black py-5 rounded-xl transition-all shadow-xl active:scale-95 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري الإرسال...
                  </>
                ) : 'إرسال الطلب الآن'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
