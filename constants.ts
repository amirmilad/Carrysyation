import { Product, Translation } from './types';

export const TRANSLATIONS: Record<'en' | 'ar', Translation> = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Collection',
      about: 'Our Story',
      contact: 'Contact',
      cart: 'Cart',
    },
    hero: {
      title: 'Elevate Your Style',
      subtitle: 'Discover the finest collection of handcrafted leather bags designed for the modern woman.',
      cta: 'Shop Now',
    },
    shop: {
      title: 'Latest Collection',
      filter: 'Filter By',
      addToCart: 'Add to Cart',
      price: 'Price',
    },
    cart: {
      title: 'Your Shopping Bag',
      empty: 'Your bag is currently empty.',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
    },
    ai: {
      title: 'AI Personal Stylist',
      placeholder: 'Describe your outfit or occasion (e.g., "Red evening dress")...',
      send: 'Ask Stylist',
      thinking: 'Styling...',
      suggest: 'Get Style Advice',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      shop: 'المجموعة',
      about: 'قصتنا',
      contact: 'تواصل معنا',
      cart: 'السلة',
    },
    hero: {
      title: 'ارتقي بأسلوبك',
      subtitle: 'اكتشفي أرقى مجموعة من الحقائب المصنوعة يدوياً للمرأة العصرية.',
      cta: 'تسوقي الآن',
    },
    shop: {
      title: 'أحدث التشكيلات',
      filter: 'تصفية حسب',
      addToCart: 'أضف إلى السلة',
      price: 'السعر',
    },
    cart: {
      title: 'حقيبة التسوق',
      empty: 'حقيبتك فارغة حالياً.',
      total: 'الإجمالي',
      checkout: 'إتمام الشراء',
      remove: 'حذف',
    },
    ai: {
      title: 'مساعد الأزياء الذكي',
      placeholder: 'وصفي ملابسك أو المناسبة (مثال: "فستان سهرة أحمر")...',
      send: 'اسألي المساعد',
      thinking: 'جاري التفكير...',
      suggest: 'احصلي على نصيحة',
    }
  },
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: { en: "The Classic Tote", ar: "حقيبة توت كلاسيكية" },
    description: { 
      en: "A versatile tote for everyday elegance.", 
      ar: "حقيبة واسعة ومثالية للأناقة اليومية." 
    },
    price: 1299,
    category: "Tote",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    colors: ["Black", "Brown"]
  },
  {
    id: 2,
    name: { en: "Evening Clutch", ar: "كلتش للسهرات" },
    description: { 
      en: "Minimalist design with gold accents.", 
      ar: "تصميم بسيط مع لمسات ذهبية." 
    },
    price: 899,
    category: "Clutch",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
    colors: ["Gold", "Silver", "Black"]
  },
  {
    id: 3,
    name: { en: "Urban Crossbody", ar: "حقيبة كروس عصرية" },
    description: { 
      en: "Perfect for the city lifestyle.", 
      ar: "مثالية لنمط الحياة في المدينة." 
    },
    price: 1150,
    category: "Crossbody",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    colors: ["Tan", "Navy"]
  },
  {
    id: 4,
    name: { en: "Signature Satchel", ar: "حقيبة ساتشل مميزة" },
    description: { 
      en: "Structured elegance for the office.", 
      ar: "أناقة منظمة تناسب العمل." 
    },
    price: 2100,
    category: "Satchel",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
    colors: ["Burgundy", "Black"]
  },
  {
    id: 5,
    name: { en: "Boho Shoulder Bag", ar: "حقيبة كتف بوهيمية" },
    description: { 
      en: "Relaxed style with premium leather.", 
      ar: "أسلوب مريح مع جلد فاخر." 
    },
    price: 1450,
    category: "Shoulder",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    colors: ["Cognac"]
  },
  {
    id: 6,
    name: { en: "Mini Backpack", ar: "حقيبة ظهر صغيرة" },
    description: { 
      en: "Chic and practical for travel.", 
      ar: "أنيقة وعملية للسفر." 
    },
    price: 1300,
    category: "Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    colors: ["Pink", "White"]
  },
  {
    id: 7,
    name: { en: "Quilted Chain Bag", ar: "حقيبة بسلسلة مبطنة" },
    description: { 
      en: "Timeless quilted design with a gold chain strap.", 
      ar: "تصميم مبطن كلاسيكي مع حزام سلسلة ذهبي." 
    },
    price: 2400,
    category: "Shoulder",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=800&auto=format&fit=crop",
    colors: ["Black", "Beige"]
  },
  {
    id: 8,
    name: { en: "Luxury Hobo", ar: "حقيبة هوبو فاخرة" },
    description: { 
      en: "Soft, slouchy silhouette for effortless style.", 
      ar: "تصميم انسيابي ناعم لأناقة عفوية." 
    },
    price: 1650,
    category: "Hobo",
    image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=800&auto=format&fit=crop",
    colors: ["Brown", "Grey"]
  },
  {
    id: 9,
    name: { en: "Summer Straw Tote", ar: "حقيبة قش صيفية" },
    description: { 
      en: "Spacious and durable for your summer getaways.", 
      ar: "واسعة ومتينة لرحلاتك الصيفية." 
    },
    price: 750,
    category: "Tote",
    image: "https://images.unsplash.com/photo-1604001307888-07f1c359a421?q=80&w=800&auto=format&fit=crop",
    colors: ["Beige"]
  },
  {
    id: 10,
    name: { en: "Structured Mini", ar: "حقيبة صغيرة منظمة" },
    description: { 
      en: "Small in size, big on style.", 
      ar: "صغيرة الحجم، كبيرة في الأناقة." 
    },
    price: 950,
    category: "Mini",
    image: "https://images.unsplash.com/photo-1564422167509-4f8763ff046e?q=80&w=800&auto=format&fit=crop",
    colors: ["White", "Black"]
  },
  {
    id: 11,
    name: { en: "Suede Fringe Bag", ar: "حقيبة شامواه بشراشيب" },
    description: { 
      en: "Bohemian flair with soft suede texture.", 
      ar: "لمسة بوهيمية مع ملمس الشامواه الناعم." 
    },
    price: 1550,
    category: "Crossbody",
    image: "https://images.unsplash.com/photo-1616892683832-689a0c04631b?q=80&w=800&auto=format&fit=crop",
    colors: ["Tan", "Black"]
  },
  {
    id: 12,
    name: { en: "Minimalist Bucket", ar: "حقيبة دلو بسيطة" },
    description: { 
      en: "Clean lines and ample storage.", 
      ar: "خطوط نظيفة ومساحة تخزين واسعة." 
    },
    price: 1350,
    category: "Bucket",
    image: "https://images.unsplash.com/photo-1585218356057-1c4429a0f731?q=80&w=800&auto=format&fit=crop",
    colors: ["Navy", "Red"]
  }
];