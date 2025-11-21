import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Mail } from 'lucide-react';
import { useLanguage } from '../components/Contexts';
import { TRANSLATIONS, MOCK_PRODUCTS, CATEGORY_NAMES } from '../constants';
import { Button } from '../components/UI/Button';
import { ProductCard } from '../components/Product/ProductCard';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const tHero = TRANSLATIONS[language].hero;
  const tSec = TRANSLATIONS[language].sections;
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  // Extract unique categories for the "Shop By Category" section (Limiting to 4 for layout)
  const categories = ['Tote', 'Crossbody', 'Satchel', 'Clutch'];
  const categoryImages: Record<string, string> = {
    'Tote': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop',
    'Crossbody': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
    'Satchel': 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=400&auto=format&fit=crop',
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

  return (
    <div className="animate-fade-in flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-lg">
              {tHero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto drop-shadow-md">
              {tHero.subtitle}
            </p>
            <div className="pt-6">
              <Button 
                onClick={() => navigate('/shop')}
                variant="white" 
                size="lg" 
                className="font-bold px-12 py-4 text-lg shadow-xl hover:scale-105 transition-transform"
              >
                {tHero.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}
      <div className="bg-white dark:bg-gray-900 -mt-16 relative z-10 max-w-6xl mx-auto w-11/12 shadow-xl rounded-xl py-8 px-6 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap justify-around items-center gap-8">
          <div className="flex flex-col items-center text-center gap-2 text-gray-700 dark:text-gray-300">
            <div className="p-3 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600">
              <ShieldCheck size={28} />
            </div>
            <span className="font-medium text-sm md:text-base">{language === 'en' ? 'Authentic Leather' : 'جلد طبيعي أصلي'}</span>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          <div className="flex flex-col items-center text-center gap-2 text-gray-700 dark:text-gray-300">
            <div className="p-3 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600">
              <Truck size={28} />
            </div>
            <span className="font-medium text-sm md:text-base">{language === 'en' ? 'Free Shipping' : 'شحن مجاني'}</span>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
          <div className="flex flex-col items-center text-center gap-2 text-gray-700 dark:text-gray-300">
            <div className="p-3 bg-primary-50 dark:bg-gray-800 rounded-full text-primary-600">
              <RefreshCw size={28} />
            </div>
            <span className="font-medium text-sm md:text-base">{language === 'en' ? 'Easy Returns' : 'استرجاع سهل'}</span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white">
          {tSec.shopByCategory}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat} 
              onClick={() => navigate('/shop')}
              className="group cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary-200 transition-all duration-300 relative">
                <img 
                  src={categoryImages[cat]} 
                  alt={cat} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {CATEGORY_NAMES[cat][language]}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
              {tSec.featured}
            </h2>
            <Link to="/shop" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
              {tSec.viewAll}
              {language === 'en' ? <ArrowRight size={18} /> : <ArrowRight size={18} className="rotate-180" />}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
            alt="Promo"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className={`absolute inset-0 flex flex-col justify-center px-8 md:px-16 ${language === 'ar' ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="text-gold-400 font-bold tracking-wider mb-2 uppercase">Limited Time</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 max-w-xl">
              {tSec.promoTitle}
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-md leading-relaxed">
              {tSec.promoSubtitle}
            </p>
            <Button variant="white" size="lg" onClick={() => navigate('/shop')}>
              {tSec.promoBtn}
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900 dark:text-white">
          {tSec.testimonials}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center gap-1 mb-4 text-gold-400">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{item.text}"</p>
              <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="w-full bg-gray-900 dark:bg-black py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Mail className="mx-auto mb-6 text-gold-400" size={40} />
          <h2 className="text-3xl font-serif font-bold mb-4">{tSec.newsletterTitle}</h2>
          <p className="text-gray-400 mb-8">{tSec.newsletterDesc}</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={tSec.emailPlaceholder}
              className="flex-1 px-4 py-3 rounded-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <Button variant="secondary" className="px-8 py-3 rounded-sm bg-gold-500 hover:bg-gold-400 text-black font-bold">
              {tSec.subscribe}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};