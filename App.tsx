
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ProjectSlider from './components/ProjectSlider';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingAI from './components/FloatingAI';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './components/Dashboard';
import MaintenanceROICalculator from './components/MaintenanceROICalculator';
import PowerTools from './components/PowerTools';
import EngineeringProcess from './components/EngineeringProcess';
import ValueSlider from './components/ValueSlider';
import { supabase, DEFAULT_DATA } from './db';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'tools'>('home');
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [projects, setProjects] = useState<any[]>(DEFAULT_DATA.projects);
  const [partners, setPartners] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>(DEFAULT_DATA.services);

  const syncAllData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [settings, prjs, parts, servs] = await Promise.all([
        supabase.getSettings(),
        supabase.getProjects(),
        supabase.getPartners(),
        supabase.getServices()
      ]);

      if (settings?.logo) setLogoUrl(settings.logo);
      if (settings?.maintenance) setIsMaintenance(settings.maintenance === 'true');
      
      if (prjs && prjs.length > 0) setProjects(prjs);
      if (parts) setPartners(parts);
      if (servs && servs.length > 0) setServices(servs);
    } catch (e) {
      console.error("Sync failed, using defaults");
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    syncAllData();
    const unsubscribe = supabase.onChange(() => syncAllData());
    return () => unsubscribe();
  }, [syncAllData]);

  const handleMaintenanceToggle = async (val: boolean) => {
    setIsMaintenance(val);
    await supabase.updateSetting('maintenance', val ? 'true' : 'false');
  };

  const handleLogoChange = async (url: string) => {
    setLogoUrl(url);
    await supabase.updateSetting('logo', url);
  };

  if (isMaintenance && !showDashboard) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white font-['Tajawal']" dir="rtl">
        <div className="w-24 h-24 bg-yellow-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl animate-pulse">
          {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover rounded-2xl" alt="Logo" /> : <span className="text-slate-950 text-4xl font-black">⚡</span>}
        </div>
        <h1 className="text-3xl font-black mb-6">الموقع تحت الصيانة حالياً</h1>
        <p className="text-slate-400 mb-10 max-w-md">نحن نقوم ببعض التحديثات التقنية لنمنحكم تجربة أفضل. شكراً لانتظاركم.</p>
        <button onClick={() => setShowDashboard(true)} className="text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">الدخول كمسؤول</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 overflow-x-hidden">
      <div className={`fixed top-0 left-0 right-0 h-0.5 z-[2000] bg-yellow-500 transition-opacity duration-500 ${isSyncing ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <Header 
        onLogoClick={() => setShowDashboard(true)} 
        logoUrl={logoUrl} 
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Services services={services} />
            <Portfolio projects={projects} />
            <ProjectSlider />
            <EngineeringProcess />
            <WhyUs />
            <ValueSlider />
            <Testimonials partners={partners} />
            <About />
            <FAQ />
            <Contact />
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <section className="pt-40 pb-20 bg-slate-950 text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
               <div className="max-w-4xl mx-auto px-6 relative z-10">
                  <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Engineering Lab</span>
                  <h1 className="text-4xl md:text-7xl font-black text-white mb-6">المختبر الهندسـي الرقمـي</h1>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">أدوات متطورة لمساعدتكم في اتخاذ القرارات الفنية الصحيحة.</p>
               </div>
            </section>
            <PowerTools />
            <MaintenanceROICalculator />
            <section className="py-20 bg-white dark:bg-slate-950 text-center">
               <div className="max-w-xl mx-auto px-6">
                  <h3 className="text-2xl font-black mb-6">تحتاج إلى استشارة فنية دقيقة؟</h3>
                  <button onClick={() => setCurrentPage('home')} className="bg-yellow-500 text-slate-950 px-10 py-4 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all">تواصل مع مهندسينا الآن</button>
               </div>
            </section>
          </div>
        )}
      </main>

      <Footer onAdminClick={() => setShowDashboard(true)} logoUrl={logoUrl} />
      <FloatingAI />
      <ScrollToTop />

      {showDashboard && (
        <Dashboard 
          projects={projects}
          services={services}
          logoUrl={logoUrl}
          isMaintenance={isMaintenance}
          onClose={() => setShowDashboard(false)} 
          onLogoChange={handleLogoChange}
          onMaintenanceToggle={handleMaintenanceToggle}
        />
      )}
    </div>
  );
};

export default App;
