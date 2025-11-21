import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useLanguage } from '../components/Contexts';
import { TRANSLATIONS, MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/UI/Button';
import { ProductCard } from '../components/Product/ProductCard';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].hero;
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop" 
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <div className="pt-6">
              <Link to="/shop">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-none font-bold px-10">
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}
      <div className="bg-primary-50 dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center md:justify-between gap-6">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <ShieldCheck className="text-primary-500" />
            <span className="font-medium">{language === 'en' ? 'Authentic Leather' : 'جلد طبيعي أصلي'}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Truck className="text-primary-500" />
            <span className="font-medium">{language === 'en' ? 'Free Shipping' : 'شحن مجاني'}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <RefreshCw className="text-primary-500" />
            <span className="font-medium">{language === 'en' ? 'Easy Returns' : 'استرجاع سهل'}</span>
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'Featured' : 'مميز'}
          </h2>
          <Link to="/shop" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
            {language === 'en' ? 'View All' : 'عرض الكل'}
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
  );
};