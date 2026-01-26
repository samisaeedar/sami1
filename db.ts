
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://hgrsjmcgfympbsrumbrd.supabase.co';
export const SUPABASE_ANON_KEY: string = 'sb_publishable_tD7GQJWNZFJiz954i2IXzQ_l8HXxuqD'; 

// إنشاء عميل Supabase الرسمي
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const DEFAULT_DATA: Record<string, any[]> = {
  projects: [
    {
      id: 1,
      title: "محطة توليد 5 ميجا وات",
      category: "طاقة",
      image: "https://images.unsplash.com/photo-1565608444338-316f359ad563?auto=format&fit=crop&q=80&w=2070",
      description: "توريد وتركيب وتشغيل محطة توليد مركزية لمصنع أسمنت عمران مع أنظمة التزامن.",
      stats: "منجز 100%"
    },
    {
      id: 2,
      title: "تحديث أنظمة تحكم PLC",
      category: "أتمتة",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070",
      description: "استبدال نظام التحكم القديم بنظام Siemens S7-1500 لخطوط الإنتاج.",
      stats: "قيد التسليم"
    },
    {
      id: 3,
      title: "عمرة شاملة للمولدات",
      category: "صيانة",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070",
      description: "إجراء عمرة ميكانيكية شاملة لعدد 4 مولدات كاتربيلر 3512.",
      stats: "صيانة دورية"
    },
    {
      id: 4,
      title: "نظام طاقة شمسية هجين",
      category: "طاقة متجددة",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2070",
      description: "تركيب منظومة طاقة شمسية بقدرة 200 كيلو وات مع ربطها بالمولدات.",
      stats: "تم التشغيل"
    },
    {
      id: 5,
      title: "لوحات توزيع الجهد المنخفض",
      category: "كهرباء",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2069",
      description: "تصميم وتجميع لوحات التوزيع الرئيسية MDB لمول تجاري.",
      stats: "تصميم وتنفيذ"
    }
  ],
  services: [
    {
      id: "1",
      title: "صيانة المولدات",
      description: "صيانة وقائية وعلاجية وعمرات شاملة لمحركات الديزل والغاز.",
      long_description: "نقدم خدمات صيانة احترافية لمحركات Perkins, Caterpillar, Cummins باستخدام قطع غيار أصلية وأحدث أجهزة الفحص.",
      features: "فحص كمبيوتر, قطع غيار أصلية, ضمان, طوارئ 24/7",
      icon: "⚙️",
      category: "ميكانيكا"
    },
    {
      id: "2",
      title: "أنظمة التحكم والأتمتة",
      description: "حلول التحكم الصناعي PLC, SCADA, HMI للمصانع وخطوط الإنتاج.",
      long_description: "تصميم وبرمجة لوحات التحكم الآلي، تحديث الأنظمة القديمة، وربط خطوط الإنتاج بنظم المراقبة المركزية.",
      features: "Siemens, Schneider, ABB, برمجة متقدمة",
      icon: "🖥️",
      category: "كهرباء"
    },
    {
      id: "3",
      title: "لوحات التزامن ATS",
      description: "تجميع وتركيب لوحات التحويل الأوتوماتيكي وأنظمة التزامن بين المولدات.",
      long_description: "تصميم لوحات ATS/MTS ولوحات التزامن (Synchronization) لضمان استقرار الطاقة وتوزيع الأحمال بكفاءة.",
      features: "DeepSea, ComAp, مكونات أوروبية",
      icon: "⚡",
      category: "طاقة"
    },
    {
      id: "4",
      title: "الطاقة المتجددة",
      description: "تصميم وتنفيذ محطات الطاقة الشمسية وأنظمة الضخ بالطاقة الشمسية.",
      long_description: "حلول طاقة نظيفة متكاملة للمزارع والمصانع والمباني التجارية لتقليل فاتورة الكهرباء.",
      features: "ألواح عالية الكفاءة, محولات هجينة, بطاريات ليثيوم",
      icon: "☀️",
      category: "طاقة شمسية"
    }
  ],
  gallery: [
    { id: 1, img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2070" },
    { id: 2, img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070" },
    { id: 3, img: "https://images.unsplash.com/photo-1513828583688-6edbbbd4db63?auto=format&fit=crop&q=80&w=2070" },
    { id: 4, img: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&q=80&w=2070" },
    { id: 5, img: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=2070" }
  ],
  partners: [
    { id: 1, name: "Perkins", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Perkins_Engines_Logo.svg/2560px-Perkins_Engines_Logo.svg.png" },
    { id: 2, name: "Caterpillar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caterpillar_logo.svg/1200px-Caterpillar_logo.svg.png" },
    { id: 3, name: "Cummins", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cummins_logo.svg/2560px-Cummins_logo.svg.png" },
    { id: 4, name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/2560px-Siemens-logo.svg.png" },
    { id: 5, name: "Schneider Electric", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Schneider_Electric_2007.svg/2560px-Schneider_Electric_2007.svg.png" }
  ],
  messages: []
};

let _listeners: (() => void)[] = [];

// دالة مساعدة لتنظيف البيانات قبل عرضها (لمنع أخطاء React مع القيم null)
const sanitizeData = (items: any[], type: string) => {
  if (!Array.isArray(items)) return [];
  return items.map(item => {
    const newItem = { ...item };
    Object.keys(newItem).forEach(key => {
      if (newItem[key] === null || newItem[key] === undefined) {
        newItem[key] = '';
      }
    });
    return newItem;
  });
};

export const supabase = {
  onChange(cb: () => void) {
    _listeners.push(cb);
    return () => { _listeners = _listeners.filter(l => l !== cb); };
  },
  _notify() { _listeners.forEach(l => l()); },

  // جلب البيانات مع آلية Fallback ذكية
  async fetchData(table: string) {
    try {
      const { data, error } = await client
        .from(table)
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.warn(`Supabase Error (${table}):`, error.message);
        // في حالة الخطأ، نعود للبيانات الافتراضية
        return DEFAULT_DATA[table] || [];
      }

      // إذا كانت قاعدة البيانات فارغة تماماً، نعرض البيانات الافتراضية لكي لا يبدو الموقع مكسوراً
      // ولكن إذا قام المستخدم بإضافة عنصر واحد، سيتم عرضه
      if (!data || data.length === 0) {
        return DEFAULT_DATA[table] || [];
      }

      return sanitizeData(data, table);
    } catch (e) {
      return DEFAULT_DATA[table] || [];
    }
  },

  async getProjects() { return this.fetchData('projects'); },
  async getServices() { return this.fetchData('services'); },
  async getGallery() { return this.fetchData('gallery'); },
  async getPartners() { return this.fetchData('partners'); },
  async getMessages() { return this.fetchData('messages'); },

  async getSettings() {
    try {
      const { data } = await client.from('settings').select('*').limit(1).single();
      return data || { logo: '', maintenance: 'false' };
    } catch {
      return { logo: '', maintenance: 'false' };
    }
  },

  async updateSetting(key: string, value: string) {
    try {
        // نستخدم upsert لضمان إنشاء الإعداد إذا لم يكن موجوداً
        const { error } = await client.from('settings').upsert({ id: 1, [key]: value });
        return !error;
    } catch {
        return false;
    }
  },

  async getNavLinks() {
     return [];
  },

  async getAdminPassword() {
      // يفضل تخزين هذا في متغيرات البيئة أو جدول آمن
      return "admin123";
  },
  
  async updateAdminPassword(newPass: string) {
      // محاكاة للتحديث
      return true;
  },

  async sendMessage(msg: any) {
      return this.insertData('messages', msg);
  },

  // دالة مساعدة لتجهيز البيانات للإرسال
  cleanPayload(data: any) {
    const clean = { ...data };
    // حذف الحقول التي لا يجب إرسالها أو التي قد تسبب مشاكل
    delete clean.created_at; 
    
    // تحويل القيم الفارغة لنصوص فارغة
    Object.keys(clean).forEach(key => {
        if (clean[key] === null || clean[key] === undefined) {
             delete clean[key]; // Supabase يفضل عدم إرسال الحقول غير المعرفة بدلاً من إرسال null
        }
    });
    return clean;
  },

  async insertData(table: string, data: any) {
    const payload = this.cleanPayload(data);
    delete payload.id; // دع قاعدة البيانات تنشئ المعرف
    
    const { error } = await client.from(table).insert(payload);
    if (!error) this._notify();
    return !error;
  },

  async updateData(table: string, id: any, data: any) {
    const payload = this.cleanPayload(data);
    
    // نستخدم Upsert بدلاً من Update
    // هذا يحل مشكلة "تعديل البيانات الافتراضية"
    // إذا كنت تعدل عنصراً افتراضياً (ID=1) وهو غير موجود في القاعدة، سيقوم بإنشائه
    const { error } = await client.from(table).upsert({ ...payload, id: id });
    
    if (!error) this._notify();
    return !error;
  },

  async deleteData(table: string, id: any) {
    const { error } = await client.from(table).delete().eq('id', id);
    if (!error) this._notify();
    return !error;
  }
};
