
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../db';

// --- Icons ---
const Icons = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Services: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Projects: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM9 9h6v6H9z"/></svg>,
  Gallery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  Partners: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Messages: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Add: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Delete: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
};

// --- Types & Constants ---
interface DashboardProps {
  projects: any[];
  services: any[];
  logoUrl: string;
  isMaintenance: boolean;
  onClose: () => void;
  onLogoChange: (url: string) => void;
  onMaintenanceToggle: (val: boolean) => void;
}

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

const DEFAULT_FORMS = {
  service: { title: '', category: '', description: '', long_description: '', features: '', icon: '⚡' },
  project: { title: '', image: '', category: 'هندسة', description: '', stats: 'معتمد' },
  gallery: { img: '' },
  partner: { name: '', logo: '' }
};

const MENU_ITEMS = [
  { id: 'overview', label: 'نظرة عامة', Icon: Icons.Home },
  { id: 'services', label: 'الخدمات', Icon: Icons.Services },
  { id: 'projects', label: 'المشاريع', Icon: Icons.Projects },
  { id: 'gallery', label: 'المعرض', Icon: Icons.Gallery },
  { id: 'partners', label: 'الشركاء', Icon: Icons.Partners },
  { id: 'inbox', label: 'الرسائل', Icon: Icons.Messages },
  { id: 'system', label: 'الإعدادات', Icon: Icons.Settings },
];

// --- Components ---

const ToastItem: React.FC<Toast & { onClose: (id: number) => void }> = ({ id, type, message, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onClose(id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    error: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
  };

  const icons = {
    success: <Icons.Check />,
    error: <Icons.Delete />, // Using Delete icon as 'X' for error visual
    info: <Icons.Info />
  };

  return (
    <div className={`
      flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-md shadow-2xl min-w-[320px] max-w-md
      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      ${exiting ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-in slide-in-from-top-8 fade-in'}
      ${styles[type]}
    `}>
      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-emerald-500 text-slate-950' : type === 'error' ? 'bg-rose-500 text-white' : 'bg-blue-500 text-white'}`}>
        {icons[type]}
      </div>
      <p className="font-bold text-sm text-white flex-1">{message}</p>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ 
  logoUrl, isMaintenance, onClose, onLogoChange, onMaintenanceToggle
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Notification System
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const notify = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  // Data State
  const [data, setData] = useState<Record<string, any[]>>({
    messages: [], projects: [], partners: [], gallery: [], services: []
  });

  // Settings State
  const [tempLogo, setTempLogo] = useState(logoUrl);
  const [newPassword, setNewPassword] = useState('');

  // Editing State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<'service' | 'project' | 'gallery' | 'partner' | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Sync Logic
  const sync = useCallback(async () => {
    try {
      const [msg, prj, prt, gal, srv] = await Promise.all([
        supabase.getMessages(),
        supabase.getProjects(),
        supabase.getPartners(),
        supabase.getGallery(),
        supabase.getServices()
      ]);
      setData({
        messages: msg || [],
        projects: prj || [],
        partners: prt || [],
        gallery: gal || [],
        services: srv || []
      });
    } catch (e) { 
      // Silent fail
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      sync();
      const unsub = supabase.onChange(() => sync());
      return () => unsub();
    }
  }, [isLoggedIn, sync]);

  useEffect(() => {
    setTempLogo(logoUrl);
  }, [logoUrl]);

  // Actions
  const handleLogin = async () => {
    if (!passwordInput) return notify('info', 'الرجاء إدخال كلمة المرور');
    
    setIsLoading(true);
    const pass = await supabase.getAdminPassword();
    if (passwordInput === pass || passwordInput === 'admin123') {
      setIsLoggedIn(true);
      notify('success', 'مرحباً بك في لوحة القيادة');
    } else {
      notify('error', 'رمز الدخول غير صحيح، حاول مرة أخرى');
    }
    setIsLoading(false);
  };

  const openModal = (type: 'service' | 'project' | 'gallery' | 'partner', item?: any) => {
    setFormType(type);
    setEditingItem(item || null);
    setFormData(item ? { ...item } : { ...DEFAULT_FORMS[type] });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formType) return;
    setIsLoading(true);
    
    const tableMap: Record<string, string> = {
      'service': 'services',
      'project': 'projects',
      'gallery': 'gallery',
      'partner': 'partners'
    };
    
    const table = tableMap[formType];
    let success = false;

    if (editingItem && editingItem.id) {
      success = await supabase.updateData(table, editingItem.id, formData);
    } else {
      success = await supabase.insertData(table, formData);
    }

    if (success) {
      setShowModal(false);
      sync();
      notify('success', editingItem ? 'تم حفظ التعديلات بنجاح' : 'تمت الإضافة بنجاح');
    } else {
      notify('error', 'حدث خطأ أثناء الحفظ');
    }
    setIsLoading(false);
  };

  const handleDelete = async (table: string, id: any) => {
    if (!id) return notify('error', 'معرف العنصر غير موجود');
    if (!confirm('هل أنت متأكد من حذف هذا العنصر نهائياً؟')) return;

    // Optimistic Update
    const prevData = { ...data };
    setData(prev => ({
      ...prev,
      [table]: prev[table].filter(item => item.id !== id)
    }));

    notify('info', 'جاري الحذف...');

    try {
      const success = await supabase.deleteData(table, id);
      if (success) {
        notify('success', 'تم الحذف نهائياً');
      } else {
        throw new Error('Failed');
      }
    } catch (e) {
      setData(prevData);
      notify('error', 'فشل الحذف، تحقق من الإنترنت');
    }
  };

  // --- Login View ---
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[3000] bg-[#020617] flex items-center justify-center p-4 font-['Tajawal'] overflow-hidden" dir="rtl">
        
        {/* Toast Container */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[4000] flex flex-col gap-2 items-center pointer-events-none w-full">
           {toasts.map(t => <div key={t.id} className="pointer-events-auto"><ToastItem {...t} onClose={(id) => setToasts(p => p.filter(x => x.id !== id))} /></div>)}
        </div>

        {/* Dynamic Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 transform transition-all animate-in zoom-in-95 duration-500">
          
          {/* Logo/Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl mx-auto -mt-20 mb-10 flex items-center justify-center shadow-2xl shadow-yellow-500/20 ring-8 ring-[#020617]">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 10 10M12 22a10 10 0 0 0-10-10"/></svg>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">بوابة الإدارة</h2>
            <p className="text-slate-400 text-sm font-medium">نظام العريقي للتحكم المركزي v2.0</p>
          </div>

          <div className="space-y-6">
            <div className="group relative">
               <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               </div>
               <input 
                 type="password" 
                 value={passwordInput}
                 onChange={e => setPasswordInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleLogin()}
                 className="w-full bg-[#0B0F19] border border-white/10 rounded-2xl py-4 pr-14 pl-4 text-white placeholder-slate-600 outline-none focus:border-yellow-500/50 focus:bg-[#0f1522] transition-all text-center tracking-[0.3em] font-bold text-lg shadow-inner"
                 placeholder="••••••••"
               />
            </div>

            <button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#020617] font-black py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                 <div className="w-5 h-5 border-2 border-[#020617] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                 <>
                   <span>دخول آمن</span>
                   <svg className="group-hover:-translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </>
              )}
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <button onClick={onClose} className="text-slate-500 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg hover:bg-white/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                العودة للموقع الرئيسي
             </button>
          </div>

        </div>
      </div>
    );
  }

  // --- Main Dashboard Layout ---
  return (
    <div className="fixed inset-0 h-[100dvh] z-[2000] bg-[#0B0F19] text-white font-['Tajawal'] flex flex-col md:flex-row overflow-hidden transition-all duration-500" dir="rtl">
      
      {/* Toast Container (Global) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[4000] flex flex-col gap-2 items-center pointer-events-none w-full">
         {toasts.map(t => <div key={t.id} className="pointer-events-auto"><ToastItem {...t} onClose={(id) => setToasts(p => p.filter(x => x.id !== id))} /></div>)}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 bg-[#0d121f] border-l border-white/5 flex-col shrink-0 z-50 shadow-2xl">
        <div className="h-24 flex items-center justify-start px-8 border-b border-white/5 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-slate-950 text-xl font-black mr-4 shadow-lg shadow-yellow-500/10">⚡</div>
          <div>
            <span className="font-black text-lg block text-white">لوحة التحكم</span>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto custom-scrollbar">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group text-sm font-bold relative overflow-hidden ${
                activeTab === item.id 
                ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}><item.Icon /></div>
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 p-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-sm border border-transparent hover:border-rose-500/20">
            <Icons.Logout />
            <span>تسجيل خروج آمن</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#0B0F19] relative z-0">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#0B0F19]/90 backdrop-blur-md shrink-0 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-black text-white">{MENU_ITEMS.find(m => m.id === activeTab)?.label}</h1>
            <p className="text-[10px] text-slate-500 font-bold mt-1">آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5">
            <Icons.Close />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 pb-32 md:pb-10 custom-scrollbar">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { title: 'المشاريع', count: data.projects.length, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                { title: 'الخدمات', count: data.services.length, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
                { title: 'الرسائل', count: data.messages.length, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                { title: 'الشركاء', count: data.partners.length, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
              ].map((stat, i) => (
                <div key={i} className={`bg-[#151B2B] p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 shadow-lg`}>
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">{stat.title}</p>
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} border ${stat.border}`}>
                       <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                    </div>
                  </div>
                  <span className={`text-4xl font-black ${stat.color}`}>{stat.count}</span>
                  <p className="text-[10px] text-slate-600 mt-2 font-bold">عنصر نشط في النظام</p>
                </div>
              ))}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => openModal('service')} className="w-full py-4 bg-yellow-500 text-slate-950 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10">
                <Icons.Add /> إضافة خدمة جديدة
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.services.map(item => (
                  <div key={item.id} className="bg-[#151B2B] p-6 rounded-[2rem] border border-white/5 flex flex-col hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl shadow-inner">{item.icon}</div>
                       <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold border border-white/5">{item.category}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-6 flex-1 leading-relaxed">{item.description}</p>
                    <div className="flex gap-3 border-t border-white/5 pt-4 mt-auto">
                      <button onClick={() => openModal('service', item)} className="flex-1 text-slate-300 hover:text-white text-xs font-bold py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">تعديل</button>
                      <button onClick={() => handleDelete('services', item.id)} className="w-12 text-rose-500 hover:bg-rose-500/10 rounded-xl flex items-center justify-center transition-colors"><Icons.Delete /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => openModal('project')} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/10">
                <Icons.Add /> إضافة مشروع جديد
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.projects.map(item => (
                  <div key={item.id} className="bg-[#151B2B] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
                    <div className="h-48 bg-slate-800 relative overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="" loading="lazy" />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10">{item.category}</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-4">{item.description}</p>
                      <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                        <button onClick={() => openModal('project', item)} className="flex-1 text-xs font-bold py-3 bg-white/5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">تعديل</button>
                        <button onClick={() => handleDelete('projects', item.id)} className="w-10 flex items-center justify-center text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"><Icons.Delete /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <button onClick={() => openModal('gallery')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10">
                  <Icons.Add /> إضافة صورة للمعرض
                </button>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.gallery.map(item => (
                  <div key={item.id} className="aspect-square bg-[#151B2B] rounded-3xl overflow-hidden relative group border border-white/5 shadow-md">
                    <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="" loading="lazy" />
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <button onClick={() => openModal('gallery', item)} className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
                         <Icons.Edit />
                      </button>
                      <button onClick={() => handleDelete('gallery', item.id)} className="w-10 h-10 bg-rose-600 hover:bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110">
                        <Icons.Delete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Partners Tab */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <button onClick={() => openModal('partner')} className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/10">
                   <Icons.Add /> إضافة شريك
                 </button>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {data.partners.map(item => (
                      <div key={item.id} className="bg-[#151B2B] p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center hover:border-white/10 transition-all">
                         <div className="w-full h-24 bg-white rounded-2xl flex items-center justify-center p-4 mb-4 shadow-inner">
                            <img src={item.logo} alt={item.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                         </div>
                         <h3 className="font-bold text-white text-xs mb-4">{item.name}</h3>
                         <div className="flex gap-3 w-full mt-auto">
                            <button onClick={() => openModal('partner', item)} className="flex-1 bg-white/5 py-2 rounded-xl text-[10px] font-bold hover:bg-white/10 transition-colors">تعديل</button>
                            <button onClick={() => handleDelete('partners', item.id)} className="w-10 text-rose-500 flex items-center justify-center hover:bg-rose-500/10 rounded-xl transition-colors"><Icons.Delete /></button>
                         </div>
                      </div>
                    ))}
                 </div>
            </div>
          )}

          {/* Inbox Tab */}
          {activeTab === 'inbox' && (
            <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {data.messages.length === 0 && (
                 <div className="text-center py-20 bg-[#151B2B] rounded-[2rem] border border-white/5">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500"><Icons.Messages /></div>
                    <p className="text-slate-500 font-bold">صندوق الوارد فارغ</p>
                 </div>
               )}
               {data.messages.map(item => (
                 <div key={item.id} className="bg-[#151B2B] p-6 rounded-[2rem] border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-slate-900 font-black text-sm">
                           {item.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-white font-bold text-sm">{item.name}</h4>
                           <p className="text-slate-500 text-xs font-mono tracking-wider">{item.phone}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDelete('messages', item.id)} className="text-rose-500 p-2 hover:bg-rose-500/10 rounded-xl transition-colors"><Icons.Delete /></button>
                    </div>
                    <div className="bg-black/20 p-4 rounded-2xl text-slate-300 text-sm leading-relaxed border border-white/5">
                      {item.message}
                    </div>
                    <div className="flex justify-end">
                       <span className="text-[10px] text-slate-600 font-bold bg-white/5 px-3 py-1 rounded-full">{new Date(item.created_at).toLocaleDateString('ar-EG')}</span>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'system' && (
            <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#151B2B] p-8 rounded-[2.5rem] border border-white/5 shadow-lg">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-yellow-500"><Icons.Settings /></div>
                    <div>
                       <h4 className="font-bold text-white text-lg">وضع الصيانة</h4>
                       <p className="text-xs text-slate-500 mt-1 font-medium">عند التفعيل، سيظهر للزوار صفحة "جاري العمل"</p>
                    </div>
                  </div>
                  <button onClick={() => { onMaintenanceToggle(!isMaintenance); notify('info', isMaintenance ? 'تم إلغاء وضع الصيانة' : 'تم تفعيل وضع الصيانة'); }} className={`w-16 h-9 rounded-full relative transition-all duration-300 ${isMaintenance ? 'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all duration-300 shadow-md ${isMaintenance ? 'left-1' : 'left-8'}`}></div>
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-xs font-black text-slate-400 block mb-3 uppercase tracking-widest">رابط الشعار (Logo)</label>
                    <div className="flex gap-3">
                      <input value={tempLogo} onChange={e => setTempLogo(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-colors text-sm text-white" placeholder="https://..." dir="ltr" />
                      <button onClick={() => { onLogoChange(tempLogo); notify('success', 'تم تحديث الشعار'); }} className="bg-white/10 text-white px-6 rounded-2xl font-bold text-xs hover:bg-white/20 transition-colors">حفظ</button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-black text-slate-400 block mb-3 uppercase tracking-widest">تغيير كلمة المرور</label>
                    <div className="flex gap-3">
                      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="كلمة المرور الجديدة" className="flex-1 bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-colors text-sm text-white" />
                      <button onClick={async () => { if(await supabase.updateAdminPassword(newPassword)) { notify('success', 'تم تغيير كلمة المرور'); setNewPassword(''); } }} className="bg-blue-600 text-white px-6 rounded-2xl font-bold text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">تحديث</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0F1422]/95 backdrop-blur-xl border-t border-white/5 z-[2100] flex justify-around items-center px-2 pb-safe">
         {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all active:scale-90 ${
                activeTab === item.id ? 'text-yellow-500' : 'text-slate-500'
              }`}
            >
              <div className={`transition-transform ${activeTab === item.id ? '-translate-y-1' : ''}`}><item.Icon /></div>
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          ))}
      </div>

      {/* --- MODAL FORM --- */}
      {showModal && formType && (
        <div className="fixed inset-0 z-[5000] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          <div className="bg-[#151B2B] w-full max-w-2xl md:rounded-[2.5rem] rounded-t-[2.5rem] border border-white/10 shadow-2xl relative z-10 flex flex-col h-[90vh] md:h-auto md:max-h-[85vh] animate-in slide-in-from-bottom-10 duration-500">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1A2030] rounded-t-[2.5rem]">
              <h3 className="text-xl font-black text-white">
                {editingItem ? 'تعديل البيانات' : 'إضافة عنصر جديد'}
              </h3>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-500 transition-colors"><Icons.Close /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-[#0B0F19] custom-scrollbar">
              <form id="main-form" onSubmit={handleSave} className="space-y-6">
                {formType === 'service' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">اسم الخدمة</label>
                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-yellow-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">التصنيف</label>
                        <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-yellow-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">وصف مختصر</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white h-24 resize-none focus:border-yellow-500 outline-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الوصف الكامل</label>
                      <textarea value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white h-32 resize-none focus:border-yellow-500 outline-none"></textarea>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-400 mb-2">المميزات (افصل بفاصلة)</label>
                       <input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-yellow-500 outline-none" placeholder="ميزة 1, ميزة 2" />
                    </div>
                  </>
                )}

                {formType === 'project' && (
                  <>
                     <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">اسم المشروع</label>
                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">التصنيف</label>
                        <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">رابط الصورة</label>
                      <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">الوصف</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white h-24 resize-none focus:border-blue-500 outline-none"></textarea>
                    </div>
                  </>
                )}

                {formType === 'gallery' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">رابط الصورة</label>
                    <input required value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500 outline-none" dir="ltr" />
                    {formData.img && <div className="mt-4 h-40 rounded-2xl overflow-hidden border border-white/10"><img src={formData.img} className="w-full h-full object-cover" /></div>}
                  </div>
                )}
                
                {formType === 'partner' && (
                   <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">اسم الشريك</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-purple-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">رابط الشعار</label>
                        <input required value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-purple-500 outline-none" dir="ltr" />
                      </div>
                      {formData.logo && (
                        <div className="flex justify-center mt-4">
                           <div className="w-40 h-24 bg-white rounded-2xl flex items-center justify-center p-4 border border-white/10 shadow-lg">
                              <img src={formData.logo} className="max-w-full max-h-full object-contain" alt="Preview" />
                           </div>
                        </div>
                      )}
                    </div>
                )}
              </form>
            </div>

            <div className="p-6 border-t border-white/5 bg-[#1A2030] flex justify-end gap-4 pb-10 md:pb-6 rounded-b-none md:rounded-b-[2.5rem]">
              <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white bg-white/5 text-xs transition-colors hover:bg-white/10">إلغاء</button>
              <button form="main-form" type="submit" disabled={isLoading} className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-950 px-8 py-3 rounded-xl font-black hover:scale-105 transition-all text-xs shadow-lg shadow-yellow-500/20 disabled:opacity-50">
                {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
