
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 border border-yellow-500/30">
              <span>🔧</span> حلول هندسية متكاملة
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              العريقي للخدمات <br />
              <span className="text-yellow-500">الصناعية والهندسية</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              نقدّم حلولاً هندسية متكاملة في الكهرباء والتحكم والطاقة للقطاعات المصرفية، الصناعية، والتجارية، بخبرة عملية عالية في التصميم والتنفيذ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#services" 
                className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-center hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 active:scale-95"
              >
                استكشف خدماتنا
              </a>
              <a 
                href="#contact" 
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-center hover:bg-white/20 transition-all active:scale-95"
              >
                طلب استشارة مجانية
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm">
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">100%</span>
                <span>جودة معتمدة</span>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">24/7</span>
                <span>دعم فني</span>
              </div>
              <div className="w-px h-8 bg-slate-700"></div>
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold">كادر</span>
                <span>متخصص مؤهل</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10 transform hover:rotate-1 transition-transform duration-500">
              <img 
                src="https://picsum.photos/id/192/800/600" 
                alt="Electrical Control Panel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
