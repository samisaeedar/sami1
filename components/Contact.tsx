
import React, { useState } from 'react';
import { supabase } from '../db';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [inquiryType, setInquiryType] = useState('عام');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    engineType: 'Perkins',
    hours: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalMessage = {
      name: formData.name,
      phone: formData.phone,
      message: `
        [نوع الطلب: ${inquiryType}]
        ${(inquiryType === 'فحص' || inquiryType === 'صيانة') ? `نوع المحرك: ${formData.engineType} | ساعات العمل: ${formData.hours}` : ''}
        التفاصيل: ${formData.message}
      `.trim()
    };

    try {
      const ok = await supabase.sendMessage(finalMessage);
      if (ok) {
        setIsSent(true);
        setFormData({ name: '', phone: '', engineType: 'Perkins', hours: '', message: '' });
        setTimeout(() => setIsSent(false), 6000);
      }
    } catch (err) {
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden" dir="rtl">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
             <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em]">تواصل هندسي مباشر</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">ابدأ طلبك <span className="text-yellow-500">الآن</span></h2>
          <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-lg font-medium">سواء كان استفساراً عادياً أو طلب فحص فني طارئ، فريقنا جاهز للرد.</p>
        </div>

        <div className="relative">
          {isSent && (
            <div className="absolute inset-0 z-[60] bg-white dark:bg-slate-950 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 animate-in fade-in zoom-in duration-500 shadow-2xl border-4 border-yellow-500/30">
              <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl animate-bounce">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h3 className="text-slate-900 dark:text-white text-4xl font-black mb-4">وصلت رسالتك!</h3>
              <p className="text-slate-500 text-lg font-bold mb-10">سيقوم القسم المختص بالتواصل معك خلال دقائق.</p>
              <button onClick={() => setIsSent(false)} className="bg-yellow-500 text-slate-950 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">إغلاق</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[3.5rem] shadow-2xl space-y-8 border border-slate-100 dark:border-white/5 relative z-10 backdrop-blur-xl">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">نوع الخدمة المطلوبة</label>
              <div className="grid grid-cols-3 gap-2">
                {['عام', 'فحص', 'صيانة'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type)}
                    className={`py-3 rounded-xl font-black text-xs transition-all border ${
                      inquiryType === type 
                      ? 'bg-yellow-500 border-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {type === 'عام' ? 'استفسار عام' : type === 'فحص' ? 'طلب فحص' : 'طلب صيانة'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">اسمك / الشركة</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-yellow-500 font-bold transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">رقم الجوال</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-yellow-500 font-bold text-left transition-all" />
              </div>
            </div>

            {(inquiryType === 'فحص' || inquiryType === 'صيانة') && (
              <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-500">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">نوع المحرك / النظام</label>
                  <select value={formData.engineType} onChange={e => setFormData({...formData, engineType: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-yellow-500 font-bold transition-all">
                    <option>Perkins</option>
                    <option>Caterpillar</option>
                    <option>Cummins</option>
                    <option>لوحات تحكم / أخرى</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">ساعات العمل (اختياري)</label>
                  <input type="number" placeholder="مثلاً: 5000" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-yellow-500 font-bold transition-all" />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 pr-4 uppercase tracking-[0.2em]">تفاصيل الطلب</label>
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="اكتب ما تحتاجه هنا..." className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none focus:border-yellow-500 font-bold resize-none transition-all"></textarea>
            </div>
            
            <button disabled={isSubmitting} className="w-full bg-slate-950 dark:bg-yellow-500 text-white dark:text-slate-950 font-black py-6 rounded-3xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group shadow-2xl text-xl hover:shadow-yellow-500/20">
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>إرسال الطلب الآن</span>
                  <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M11 19l-7-7 7-7"/></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
