
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'عن الشركة', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-white md:text-white lg:text-white'}`}>العريقي</span>
              <span className={`text-[10px] font-medium transition-colors ${scrolled ? 'text-slate-500' : 'text-slate-300'}`}>للخدمات الصناعية والهندسية</span>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-all hover:text-yellow-500 relative group ${scrolled ? 'text-slate-600' : 'text-slate-100'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a 
              href="tel:+967777403614" 
              className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95 text-sm ${scrolled ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400'}`}
            >
              اتصل الآن
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-height-screen bg-white border-b shadow-xl' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-yellow-600 hover:bg-slate-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:+967777403614" 
            className="block w-full text-center bg-yellow-500 text-slate-900 font-black py-4 rounded-xl mt-4 shadow-lg"
          >
            إتصل بنا مباشرة
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
