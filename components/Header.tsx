
import React, { useState, useEffect } from 'react';
import { supabase } from '../db';

interface HeaderProps {
  onLogoClick?: () => void;
  logoUrl?: string;
  onPageChange?: (page: 'home' | 'tools') => void;
  currentPage?: 'home' | 'tools';
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, logoUrl, onPageChange, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [navLinks, setNavLinks] = useState<any[]>([]);

  useEffect(() => {
    supabase.getNavLinks().then(links => setNavLinks(links));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const getProIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('رئيس') || n.includes('home')) 
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    if (n.includes('مشروع') || n.includes('portfolio') || n.includes('project')) 
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
    if (n.includes('معرض') || n.includes('gallery'))
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
    if (n.includes('تواصل') || n.includes('اتصل') || n.includes('contact')) 
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    if (n.includes('أدوات') || n.includes('lab') || n.includes('tool'))
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>;
    if (n.includes('خدمات') || n.includes('services'))
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
    if (n.includes('admin') || n.includes('إدارة') || n.includes('امن'))
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      if (currentPage !== 'home') {
        e.preventDefault();
        onPageChange?.('home');
        setTimeout(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { onPageChange?.('home'); window.scrollTo({top:0, behavior:'smooth'}); }}>
            <div className="w-11 h-11 bg-yellow-500 rounded-xl flex items-center justify-center overflow-hidden shadow-xl shadow-yellow-500/20 group-hover:rotate-12 transition-transform">
              {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <span className="text-slate-950 font-black text-2xl">⚡</span>}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white leading-none">العريقي <span className="text-yellow-500">للهندسة</span></h1>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Industrial Services</span>
            </div>
          </div>
          
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-2xl p-1 backdrop-blur-md">
            <button onClick={() => onPageChange?.('home')} className={`flex items-center gap-2 text-[11px] font-black px-4 py-2.5 rounded-xl transition-all ${currentPage === 'home' ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {getProIcon('home')} الرئيسية
            </button>

            <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all">
              {getProIcon('خدمات')} خدماتنا
            </a>

            <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all">
              {getProIcon('المشاريع')} المشاريع
            </a>

            <a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')} className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all">
              {getProIcon('معرض')} المعرض
            </a>

            <button onClick={() => onPageChange?.('tools')} className={`flex items-center gap-2 text-[11px] font-black px-4 py-2.5 rounded-xl transition-all ${currentPage === 'tools' ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {getProIcon('tools')} المختبر الرقمي
            </button>

            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all">
              {getProIcon('contact')} اتصل بنا
            </a>

            <button onClick={() => onLogoClick?.()} className="flex items-center gap-2 text-[11px] font-black text-yellow-500 hover:text-white hover:bg-yellow-500/20 px-4 py-2.5 rounded-xl transition-all">
              {getProIcon('admin')} دخول الإدارة
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-yellow-500 transition-all border border-white/10">
              {isDark ? '☀️' : '🌙'}
            </button>
            <a href="tel:+967777403614" className="hidden md:flex items-center gap-3 bg-yellow-500 text-slate-950 px-6 py-3 rounded-xl font-black text-[12px] hover:bg-white transition-all shadow-xl active:scale-95 group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>اتصال مباشر</span>
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden w-11 h-11 bg-yellow-500 rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-lg active:scale-90 transition-all">
              <span className={`w-6 h-1 bg-slate-950 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`w-4 h-1 bg-slate-950 rounded-full self-start mr-2.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-1 bg-slate-950 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[110] xl:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)}></div>
        <div className={`absolute left-0 top-0 bottom-0 w-[280px] bg-slate-900 border-r border-white/5 flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 flex items-center justify-between">
             <span className="text-white font-black">القائمة الهندسية</span>
             <button onClick={() => setIsOpen(false)} className="text-white/40">✕</button>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <button onClick={() => {setIsOpen(false); onPageChange?.('home');}} className={`w-full flex items-center gap-4 p-4 rounded-xl font-black text-sm ${currentPage === 'home' ? 'bg-yellow-500 text-slate-950' : 'text-white bg-white/5'}`}>
              {getProIcon('home')} الرئيسية
            </button>
            <a href="#services" onClick={(e) => {setIsOpen(false); handleLinkClick(e, '#services');}} className="flex items-center gap-4 p-4 rounded-xl font-black text-white bg-white/5 text-sm">
              {getProIcon('خدمات')} خدماتنا الهندسية
            </a>
            <a href="#portfolio" onClick={(e) => {setIsOpen(false); handleLinkClick(e, '#portfolio');}} className="flex items-center gap-4 p-4 rounded-xl font-black text-white bg-white/5 text-sm">
              {getProIcon('المشاريع')} المشاريع
            </a>
            <a href="#gallery" onClick={(e) => {setIsOpen(false); handleLinkClick(e, '#gallery');}} className="flex items-center gap-4 p-4 rounded-xl font-black text-white bg-white/5 text-sm">
              {getProIcon('معرض')} معرض الصور
            </a>
            <button onClick={() => {setIsOpen(false); onPageChange?.('tools');}} className={`w-full flex items-center gap-4 p-4 rounded-xl font-black text-sm ${currentPage === 'tools' ? 'bg-yellow-500 text-slate-950' : 'text-white bg-white/5'}`}>
              {getProIcon('tools')} المختبر الرقمي
            </button>
            <div className="h-px bg-white/5 my-4"></div>
            <a href="#contact" onClick={(e) => {setIsOpen(false); handleLinkClick(e, '#contact');}} className="flex items-center gap-4 p-4 rounded-xl font-black text-white bg-white/5 text-sm">
              {getProIcon('contact')} اتصل بنا
            </a>
            <button onClick={() => {setIsOpen(false); onLogoClick?.();}} className="w-full flex items-center gap-4 p-4 rounded-xl font-black text-yellow-500 bg-yellow-500/10 text-sm mt-2">
              {getProIcon('admin')} دخول الإدارة
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
