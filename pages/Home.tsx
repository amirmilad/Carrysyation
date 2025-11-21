
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Gem, Plane, RotateCcw, Star, Mail, Sparkles, Tag, CheckCircle } from 'lucide-react';
import { useLanguage } from '../components/Contexts';
import { TRANSLATIONS, MOCK_PRODUCTS, CATEGORY_NAMES } from '../constants';
import { Button } from '../components/UI/Button';
import { ProductCard } from '../components/Product/ProductCard';

// --- Physics-Based Interactive Marquee ---
interface MarqueeProps {
  speed?: number;
  children: React.ReactNode;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ speed = 1, className = "", children }) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State to hold content width
  const [contentWidth, setContentWidth] = useState(0);
  
  // Animation & Interaction Refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const posRef = useRef(0);
  const reqRef = useRef<number>(0);
  
  // 1 = Right (Arabic), -1 = Left (English)
  // Moves in the direction of reading
  const direction = language === 'ar' ? 1 : -1;

  // Measure width and set initial position
  useEffect(() => {
    if (contentRef.current) {
      // We use 3 clones to ensure infinite scroll coverage
      const totalWidth = contentRef.current.scrollWidth;
      const singleWidth = totalWidth / 3;
      setContentWidth(singleWidth);

      // Reset position based on direction to avoid visual glitches
      // If moving Right (Arabic), start offset to the left so we have content to scroll into
      if (language === 'ar') {
         posRef.current = -singleWidth;
      } else {
         posRef.current = 0;
      }
      
      // Update immediate transform
      contentRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    }
  }, [language, children]);

  const animate = useCallback(() => {
    if (!isDragging.current && contentWidth > 0) {
      posRef.current += speed * direction;

      // Infinite Loop Logic
      if (direction === -1) {
        // Moving Left (Standard LTR Marquee)
        // When we have scrolled past the first clone, reset to 0 (or effectively add width)
        if (posRef.current <= -contentWidth) {
          posRef.current += contentWidth;
        }
      } else {
        // Moving Right (RTL Marquee)
        // When we reach 0 (the start of the track), jump back to -contentWidth
        if (posRef.current >= 0) {
          posRef.current -= contentWidth;
        }
      }

      if (contentRef.current) {
         contentRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }
    }
    reqRef.current = requestAnimationFrame(animate);
  }, [speed, direction, contentWidth]);

  useEffect(() => {
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [animate]);

  // Interaction Handlers
  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    lastX.current = posRef.current;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    
    // Pause animation via ref check in animate(), but strictly speaking loop continues running
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !contentRef.current) return;
    const delta = clientX - startX.current;
    posRef.current = lastX.current + delta;
    contentRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden relative select-none cursor-grab touch-pan-y ${className}`}
      onMouseDown={e => handleStart(e.clientX)}
      onMouseMove={e => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={e => handleStart(e.touches[0].clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      dir="ltr" // Force LTR so coordinate system is consistent (Left is negative X)
    >
       <div ref={contentRef} className="flex w-max items-center will-change-transform">
          {[0, 1, 2].map(i => (
             <div key={i} className="flex-shrink-0 flex items-center">
               {children}
             </div>
          ))}
       </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const tHero = TRANSLATIONS[language].hero;
  const tSec = TRANSLATIONS[language].sections;
  const tCommon = TRANSLATIONS[language].common;
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  // Extract unique categories for the "Shop By Category" section
  const categories = ['Tote', 'Crossbody', 'Satchel', 'Clutch'];
  
  // Reliable Unsplash Images matching the product types
  const categoryImages: Record<string, string> = {
    'Tote': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
    'Crossbody': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop',
    'Satchel': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop',
    'Clutch': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=400&auto=format&fit=crop'
  };

  const testimonials = [
    {
      id: 1,
      name: language === 'en' ? "Sarah M." : "سارة م.",
      text: language === 'en' ? "The quality of the leather is absolutely stunning. My new tote is my daily essential!" : "جودة الجلد مذهلة للغاية. حقيبتي الجديدة أصبحت رفيقتي اليومية!",
      rating: 5
    },
    {
      id: 2,
      name: language === 'en' ? "Laila K." : "ليلى ك.",
      text: language === 'en' ? "Fast delivery and packaging was luxurious. Felt like a gift to myself." : "توصيل سريع وتغليف فاخر. شعرت وكأنها هدية لنفسي.",
      rating: 5
    },
    {
      id: 3,
      name: language === 'en' ? "Nour E." : "نور ع.",
      text: language === 'en' ? "The AI stylist recommended the perfect clutch for my dress. Highly recommended!" : "اقترح مساعد الذكاء الاصطناعي الحقيبة المثالية لفستاني. أنصح به بشدة!",
      rating: 5
    }
  ];

  const brands = [
    "VOGUE", "ELLE", "Harper's BAZAAR", "Marie Claire", "COSMOPOLITAN"
  ];

  return (
    <div className="animate-fade-in flex flex-col pb-16 overflow-hidden bg-white dark:bg-gray-950">
      
      {/* Marquee 1: General Info (Slow) */}
      <Marquee speed={0.8} className="bg-gray-900 text-white py-3 border-b border-gray-800 z-10 relative">
          <div className="flex items-center gap-8 px-4">
             <span className={`text-xs font-bold uppercase flex items-center gap-3 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-[0.2em]'}`}>
              <Sparkles size={12} className="text-gold-400" /> 
              {language === 'en' ? 'New Collection Available' : 'تشكيلة جديدة متاحة'}
            </span>
            <span className={`text-xs font-bold uppercase flex items-center gap-3 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-[0.2em]'}`}>
              <Sparkles size={12} className="text-gold-400" /> 
              {language === 'en' ? 'Free Worldwide Shipping' : 'شحن مجاني لجميع أنحاء العالم'}
            </span>
            <span className={`text-xs font-bold uppercase flex items-center gap-3 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-[0.2em]'}`}>
              <Sparkles size={12} className="text-gold-400" /> 
              {language === 'en' ? 'Authentic Italian Leather' : 'جلد إيطالي طبيعي'}
            </span>
          </div>
      </Marquee>

      {/* Marquee 2: Offers (Fast) */}
      <Marquee speed={2.5} className="bg-gold-400 text-gray-900 py-2.5 shadow-md z-10 relative">
          <div className="flex items-center gap-12 px-6">
            <span className={`text-sm font-bold uppercase flex items-center gap-2 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-widest'}`}>
              <Tag size={16} fill="currentColor" className="text-gray-900" /> 
              {language === 'en' ? 'SUMMER SALE: UP TO 40% OFF' : 'تخفيضات الصيف: خصم يصل إلى 40%'}
            </span>
            <span className="w-2 h-2 rounded-full bg-gray-900 shrink-0"></span>
            <span className={`text-sm font-bold uppercase flex items-center gap-2 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-widest'}`}>
              {language === 'en' ? 'USE CODE: LUXURY25' : 'استخدمي كود: LUXURY25'}
            </span>
             <span className="w-2 h-2 rounded-full bg-gray-900 shrink-0"></span>
             <span className={`text-sm font-bold uppercase flex items-center gap-2 whitespace-nowrap ${language === 'ar' ? 'tracking-normal' : 'tracking-widest'}`}>
              {language === 'en' ? 'Limited Time Offer' : 'عرض لفترة محدودة'}
            </span>
          </div>
      </Marquee>

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full bg-gray-900 overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-5xl space-y-8 animate-fade-in-up">
            <span className="text-gold-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 inline-block mb-2">
              {language === 'en' ? 'Spring / Summer 2025' : 'ربيع / صيف 2025'}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tight leading-none drop-shadow-lg">
              {tHero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed opacity-90">
              {tHero.subtitle}
            </p>
            <div className="pt-8">
              <Button 
                onClick={() => navigate('/shop')}
                variant="white" 
                size="lg" 
                className="font-bold px-12 py-4 text-lg shadow-2xl hover:scale-105 transition-transform hover:bg-gray-100"
              >
                {tHero.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By / As Seen In */}
      <div className="border-b border-gray-100 dark:border-gray-800 py-10 bg-white dark:bg-gray-950">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
               {language === 'en' ? 'As Seen In' : 'كما ظهر في'}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {brands.map((brand, i) => (
                 <span key={i} className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-default">
                   {brand}
                 </span>
               ))}
            </div>
         </div>
      </div>

      {/* Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
            <div className="p-4 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Gem size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{language === 'en' ? 'Authentic Leather' : 'جلد طبيعي أصلي'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Handcrafted from certified Italian tanneries.' : 'مصنوع يدوياً من مدابغ إيطالية معتمدة.'}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
            <div className="p-4 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Plane size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{language === 'en' ? 'Global Shipping' : 'شحن عالمي'}</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Free delivery on all orders above 2000 EGP.' : 'توصيل مجاني للطلبات فوق 2000 جنيه.'}
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
            <div className="p-4 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <RotateCcw size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{language === 'en' ? 'Easy Returns' : 'استرجاع سهل'}</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? '30-day money back guarantee, no questions asked.' : 'ضمان استرجاع الأموال لمدة 30 يوماً.'}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 w-full mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div className="max-w-2xl">
                <span className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-2 block">{tSec.featured}</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                  {language === 'en' ? 'Curated for You' : 'مختارة لك بعناية'}
                </h2>
             </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary-600 transition-colors hover:translate-x-2 rtl:hover:-translate-x-2 duration-300 pb-2 border-b-2 border-gray-900 dark:border-white hover:border-primary-600">
              {tSec.viewAll}
              {language === 'en' ? <ArrowRight size={20} /> : <ArrowRight size={20} className="rotate-180" />}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
           <div className="mt-8 text-center md:hidden">
             <Button variant="outline" onClick={() => navigate('/shop')}>
                {tSec.viewAll}
             </Button>
           </div>
        </div>
      </div>

      {/* Categories Section - Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-24">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white">
          {tSec.shopByCategory}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={cat} 
              onClick={() => navigate('/shop')}
              className="group cursor-pointer relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img 
                  src={categoryImages[cat]} 
                  alt={cat} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                <h3 className="font-serif text-2xl text-white font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {CATEGORY_NAMES[cat][language]}
                </h3>
                <span className="text-xs text-gold-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 inline-block border-b border-gold-400 pb-1">
                   {language === 'en' ? 'Shop Now' : 'تسوق الآن'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-24">
        <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2053&auto=format&fit=crop" 
            alt="Promo"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30" />
          <div className={`absolute inset-0 flex flex-col justify-center px-8 md:px-20 ${language === 'ar' ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="bg-white text-gray-900 font-bold text-xs px-3 py-1 uppercase tracking-widest mb-6 animate-fade-in-up inline-block">
               Limited Edition
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 max-w-xl animate-fade-in-up leading-none" style={{ animationDelay: '0.1s' }}>
              {tSec.promoTitle}
            </h2>
            <p className="text-lg text-gray-100 mb-10 max-w-md leading-relaxed animate-fade-in-up opacity-90" style={{ animationDelay: '0.2s' }}>
              {tSec.promoSubtitle}
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="white" size="lg" onClick={() => navigate('/shop')} className="hover:scale-105 shadow-xl border-none">
                {tSec.promoBtn}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-gray-900 dark:text-white">
            {tSec.testimonials}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative hover:-translate-y-2 transition-transform duration-500">
                <div className="text-6xl text-gray-200 dark:text-gray-700 font-serif absolute top-4 left-6 pointer-events-none">"</div>
                <div className="flex gap-1 mb-6 text-gold-400 relative z-10">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 italic relative z-10 leading-relaxed font-serif text-lg">"{item.text}"</p>
                <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                   <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                      {item.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                      <span className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1">
                        {tCommon.verifiedBuyer} <CheckCircle size={10} className="text-green-500" />
                      </span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="w-full px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-gray-900 dark:bg-black rounded-3xl py-20 px-4 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-[100px] opacity-30 animate-float"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500 rounded-full filter blur-[100px] opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <Mail className="mx-auto mb-6 text-gold-400" size={48} />
            <h2 className="text-4xl font-serif font-bold mb-4">{tSec.newsletterTitle}</h2>
            <p className="text-gray-300 mb-10 text-lg">{tSec.newsletterDesc}</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={tSec.emailPlaceholder}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all backdrop-blur-sm"
              />
              <Button variant="white" className="px-10 py-4 rounded-full font-bold shadow-lg transform hover:scale-105">
                {tSec.subscribe}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-6">
              {language === 'en' ? 'By subscribing you agree to our Terms & Conditions.' : 'بالاشتراك فإنك توافق على الشروط والأحكام.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
