import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, TRANSLATIONS, CATEGORY_NAMES } from '../constants';
import { ProductCard } from '../components/Product/ProductCard';
import { useLanguage } from '../components/Contexts';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

export const Shop: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].shop;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'newest' | 'low' | 'high'>('newest');

  // Derived Data
  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const allColors = Array.from(new Set(MOCK_PRODUCTS.flatMap(p => p.colors)));

  const getCategoryName = (cat: string) => {
    if (cat === 'All') return language === 'ar' ? 'الكل' : 'All';
    return CATEGORY_NAMES[cat]?.[language] || cat;
  };

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // 1. Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 3. Colors
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // 4. Sort
    if (sortOption === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (using ID as proxy)
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [selectedCategory, priceRange, selectedColors, sortOption]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          {language === 'en' 
            ? 'Explore our curated collection of premium handcrafted leather bags, designed for elegance and durability.' 
            : 'استكشفي مجموعتنا المختارة من الحقائب الجلدية المصنوعة يدوياً، المصممة للأناقة والمتانة.'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <SlidersHorizontal size={18} />
          {language === 'en' ? 'Filters & Sort' : 'تصفية وترتيب'}
        </button>

        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside className={`
          fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 lg:p-0 lg:static lg:bg-transparent lg:dark:bg-transparent lg:z-auto lg:w-64 lg:block
          transition-transform duration-300 overflow-y-auto lg:overflow-visible
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full lg:rtl:translate-x-0'}
        `}>
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">{t.filter}</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)}><X /></button>
          </div>

          <div className="space-y-8 sticky top-24">
            
            {/* Sort Section (Mobile only here, or unified) */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                {language === 'en' ? 'Sort By' : 'ترتيب حسب'}
              </h3>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value as any)}
                className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm"
              >
                <option value="newest">{language === 'en' ? 'Newest Arrivals' : 'الأحدث وصولاً'}</option>
                <option value="low">{language === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
                <option value="high">{language === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
              </select>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Categories' : 'التصنيفات'}</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedCategory === cat ? 'border-primary-500' : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedCategory === cat && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      name="category" 
                      className="hidden" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className={`text-sm group-hover:text-primary-500 ${selectedCategory === cat ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {getCategoryName(cat)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Price Range' : 'نطاق السعر'}</h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 EGP</span>
                <span>{priceRange[1].toLocaleString()} EGP</span>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Colors' : 'الألوان'}</h3>
              <div className="flex flex-wrap gap-2">
                {allColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColors.includes(color) 
                        ? 'border-primary-500 scale-110' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={color}
                  >
                     <div 
                        className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange([0, 5000]);
                setSelectedColors([]);
                setIsMobileFiltersOpen(false);
              }}
              className="text-sm text-gray-500 underline hover:text-red-500"
            >
              {language === 'en' ? 'Reset Filters' : 'إعادة تعيين الفلاتر'}
            </button>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              {language === 'en' ? `Showing ${filteredProducts.length} results` : `عرض ${filteredProducts.length} منتج`}
            </span>
            
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-gray-500">{language === 'en' ? 'Sort by:' : 'ترتيب:'}</span>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent font-medium text-gray-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="newest">{language === 'en' ? 'Newest' : 'الأحدث'}</option>
                <option value="low">{language === 'en' ? 'Price: Low to High' : 'الأقل سعراً'}</option>
                <option value="high">{language === 'en' ? 'Price: High to Low' : 'الأعلى سعراً'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Filter size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
              </h3>
              <p className="text-gray-500">
                {language === 'en' ? 'Try adjusting your filters.' : 'حاول تغيير خيارات التصفية.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};