
import { Product, Translation } from './types';

export const CATEGORY_NAMES: Record<string, { en: string; ar: string }> = {
  'Tote': { en: 'Tote Bag', ar: 'حقيبة توت' },
  'Clutch': { en: 'Clutch', ar: 'كلتش' },
  'Crossbody': { en: 'Crossbody', ar: 'كروس' },
  'Satchel': { en: 'Satchel', ar: 'حقيبة ساتشل' },
  'Shoulder': { en: 'Shoulder Bag', ar: 'حقيبة كتف' },
  'Backpack': { en: 'Backpack', ar: 'حقيبة ظهر' },
  'Hobo': { en: 'Hobo Bag', ar: 'حقيبة هوبو' },
  'Mini': { en: 'Mini Bag', ar: 'حقيبة صغيرة' },
  'Bucket': { en: 'Bucket Bag', ar: 'حقيبة دلو' },
};

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
    sections: {
      shopByCategory: 'Shop by Category',
      featured: 'Featured Collection',
      viewAll: 'View All',
      testimonials: 'What Our Clients Say',
      newsletterTitle: 'Join the Club',
      newsletterDesc: 'Subscribe to receive updates, access to exclusive deals, and more.',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Enter your email address',
      promoTitle: 'The Summer Edition',
      promoSubtitle: 'Lightweight, durable, and effortlessly chic.',
      promoBtn: 'Explore Collection'
    },
    shop: {
      title: 'Latest Collection',
      filter: 'Filter By',
      addToCart: 'Add to Cart',
      price: 'Price',
    },
    product: {
      details: 'Product Details',
      specifications: 'Specifications',
      shipping: 'Shipping & Returns',
      related: 'You May Also Like',
      askStylist: 'How to Style This?',
      color: 'Select Color',
      quantity: 'Quantity',
      addToCart: 'Add to Shopping Bag',
      description: 'Description',
      material: 'Material: 100% Genuine Italian Leather',
      dimensions: 'Dimensions: 30cm x 25cm x 12cm',
      care: 'Care: Wipe clean with a soft, dry cloth. Store in dust bag.',
      share: 'Share this piece',
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
    sections: {
      shopByCategory: 'تسوقي حسب الفئة',
      featured: 'مجموعة مميزة',
      viewAll: 'عرض الكل',
      testimonials: 'آراء عملائنا',
      newsletterTitle: 'انضمي لقائمتنا البريدية',
      newsletterDesc: 'اشتركي للحصول على آخر التحديثات وعروض حصرية.',
      subscribe: 'اشترك',
      emailPlaceholder: 'أدخلي بريدك الإلكتروني',
      promoTitle: 'إصدار الصيف',
      promoSubtitle: 'خفيفة، متينة، وأنيقة بلا مجهود.',
      promoBtn: 'اكتشفي المجموعة'
    },
    shop: {
      title: 'أحدث التشكيلات',
      filter: 'تصفية حسب',
      addToCart: 'أضف إلى السلة',
      price: 'السعر',
    },
    product: {
      details: 'تفاصيل المنتج',
      specifications: 'المواصفات',
      shipping: 'الشحن والاسترجاع',
      related: 'قد يعجبك أيضاً',
      askStylist: 'كيف أنسق هذه الحقيبة؟',
      color: 'اختر اللون',
      quantity: 'الكمية',
      addToCart: 'أضف إلى حقيبة التسوق',
      description: 'الوصف',
      material: 'الخامة: 100% جلد إيطالي طبيعي',
      dimensions: 'الأبعاد: 30 سم × 25 سم × 12 سم',
      care: 'العناية: تنظف بقطعة قماش ناعمة وجافة. تحفظ في كيس الغبار.',
      share: 'شاركي هذه القطعة',
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

// Helper for detail images - High quality, reliable links
const DETAIL_IMAGES = [
  "https://images.unsplash.com/photo-1590735266616-614e797964f9?q=80&w=800&auto=format&fit=crop", // Leather Detail
  "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=800&auto=format&fit=crop", // Bag Lifestyle
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: { en: "The Classic Tote", ar: "حقيبة توت كلاسيكية" },
    description: { 
      en: "A versatile tote for everyday elegance. Spacious enough for your laptop and essentials.", 
      ar: "حقيبة واسعة ومثالية للأناقة اليومية. تتسع للحاسوب المحمول وضرورياتك." 
    },
    price: 1299,
    category: "Tote",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0]
    ],
    colors: ["Brown", "Black"]
  },
  {
    id: 2,
    name: { en: "Evening Clutch", ar: "كلتش للسهرات" },
    description: { 
      en: "Minimalist design with gold accents. The perfect companion for your night out.", 
      ar: "تصميم بسيط مع لمسات ذهبية. الرفيق المثالي لسهراتك." 
    },
    price: 899,
    category: "Clutch",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[1]
    ],
    colors: ["Pink", "Silver", "Gold"]
  },
  {
    id: 3,
    name: { en: "Urban Crossbody", ar: "حقيبة كروس عصرية" },
    description: { 
      en: "Perfect for the city lifestyle. Hands-free convenience meets modern style.", 
      ar: "مثالية لنمط الحياة في المدينة. راحة اليدين تلتقي بالأسلوب العصري." 
    },
    price: 1150,
    category: "Crossbody",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0]
    ],
    colors: ["Pink", "Tan"]
  },
  {
    id: 4,
    name: { en: "Signature Satchel", ar: "حقيبة ساتشل مميزة" },
    description: { 
      en: "Structured elegance for the office. Defined lines and premium hardware.", 
      ar: "أناقة منظمة تناسب العمل. خطوط محددة وإكسسوارات فاخرة." 
    },
    price: 2100,
    category: "Satchel",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[1]
    ],
    colors: ["Green", "Black"]
  },
  {
    id: 5,
    name: { en: "Boho Shoulder Bag", ar: "حقيبة كتف بوهيمية" },
    description: { 
      en: "Relaxed style with premium leather. Soft structure for a casual look.", 
      ar: "أسلوب مريح مع جلد فاخر. هيكل ناعم لإطلالة غير رسمية." 
    },
    price: 1450,
    category: "Shoulder",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0]
    ],
    colors: ["Blue", "Cognac"]
  },
  {
    id: 6,
    name: { en: "Mini Backpack", ar: "حقيبة ظهر صغيرة" },
    description: { 
      en: "Chic and practical for travel. Carry your essentials in style.", 
      ar: "أنيقة وعملية للسفر. احملي ضرورياتك بأناقة." 
    },
    price: 1300,
    category: "Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[1]
    ],
    colors: ["Yellow", "Black"]
  },
  {
    id: 7,
    name: { en: "Quilted Chain Bag", ar: "حقيبة بسلسلة مبطنة" },
    description: { 
      en: "Timeless quilted design with a gold chain strap. A classic statement piece.", 
      ar: "تصميم مبطن كلاسيكي مع حزام سلسلة ذهبي. قطعة كلاسيكية بارزة." 
    },
    price: 2400,
    category: "Shoulder",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0]
    ],
    colors: ["Black", "Beige"]
  },
  {
    id: 8,
    name: { en: "Luxury Hobo", ar: "حقيبة هوبو فاخرة" },
    description: { 
      en: "Soft, slouchy silhouette for effortless style. Fits everything you need.", 
      ar: "تصميم انسيابي ناعم لأناقة عفوية. تتسع لكل ما تحتاجينه." 
    },
    price: 1650,
    category: "Hobo",
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0],
      DETAIL_IMAGES[1]
    ],
    colors: ["Brown", "Grey"]
  },
  {
    id: 9,
    name: { en: "Summer Straw Tote", ar: "حقيبة قش صيفية" },
    description: { 
      en: "Spacious and durable for your summer getaways. Natural textures.", 
      ar: "واسعة ومتينة لرحلاتك الصيفية. ملمس طبيعي." 
    },
    price: 750,
    category: "Tote",
    image: "https://images.unsplash.com/photo-1566958765392-2f4a8c48949c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566958765392-2f4a8c48949c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590735266616-614e797964f9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["Beige", "Natural"]
  },
  {
    id: 10,
    name: { en: "Structured Mini", ar: "حقيبة صغيرة منظمة" },
    description: { 
      en: "Small in size, big on style. The trendy accessory you need.", 
      ar: "صغيرة الحجم، كبيرة في الأناقة. الإكسسوار العصري الذي تحتاجينه." 
    },
    price: 950,
    category: "Mini",
    image: "https://images.unsplash.com/photo-1564422167509-4f8763ff046e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564422167509-4f8763ff046e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[1]
    ],
    colors: ["White", "Black"]
  },
  {
    id: 11,
    name: { en: "Suede Fringe Bag", ar: "حقيبة شامواه بشراشيب" },
    description: { 
      en: "Bohemian flair with soft suede texture. Adds movement to your outfit.", 
      ar: "لمسة بوهيمية مع ملمس الشامواه الناعم. تضفي حركة على إطلالتك." 
    },
    price: 1550,
    category: "Crossbody",
    image: "https://images.unsplash.com/photo-1527383418406-f85a3b146499?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527383418406-f85a3b146499?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[0]
    ],
    colors: ["Tan", "Black"]
  },
  {
    id: 12,
    name: { en: "Minimalist Bucket", ar: "حقيبة دلو بسيطة" },
    description: { 
      en: "Clean lines and ample storage. Modern simplicity.", 
      ar: "خطوط نظيفة ومساحة تخزين واسعة. بساطة عصرية." 
    },
    price: 1350,
    category: "Bucket",
    image: "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      DETAIL_IMAGES[1]
    ],
    colors: ["Navy", "Red"]
  }
];
