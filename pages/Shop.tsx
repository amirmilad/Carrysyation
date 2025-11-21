
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, TRANSLATIONS, CATEGORY_NAMES, COLOR_NAMES } from '../constants';
import { ProductCard } from '../components/Product/ProductCard';
import { useLanguage } from '../components/Contexts';
import { Filter, X, ChevronDown, SlidersHorizontal, Check, Palette, Tag, Banknote } from 'lucide-react';
import { Product } from '../types';

export const Shop: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].shop;
  const tCommon = TRANSLATIONS[language].common;
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
  
  const getColorName = (color: string) => {
    return COLOR_NAMES[color]?.[language] || color;
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

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 5000]);
    setSelectedColors([]);
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="min-h-screen pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
          {t.title}
        </h1>
        <div className="w-20 h-1 bg-gold-500 rounded-full"></div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
          {language === 'en' 
            ? 'Explore our curated collection of premium handcrafted leather bags, designed for elegance and durability.' 
            : 'استكشفي مجموعتنا المختارة من الحقائب الجلدية المصنوعة يدوياً، المصممة للأناقة والمتانة.'}
        </p>
      </div>

      {/* Active Filters Chips */}
      {(selectedCategory !== 'All' || selectedColors.length > 0 || priceRange[1] < 5000) && (
         <div className="flex flex-wrap gap-2 mb-8 items-center justify-center">
            <span className="text-sm text-gray-500 font-medium mr-2">{tCommon.activeFilters}</span>
            
            {selectedCategory !== 'All' && (
               <button onClick={() => setSelectedCategory('All')} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  {getCategoryName(selectedCategory)} <X size={14} />
               </button>
            )}

            {selectedColors.map(c => (
               <button key={c} onClick={() => toggleColor(c)} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-3 h-3 rounded-full" style={{backgroundColor: c.toLowerCase()}}></span> {getColorName(c)} <X size={14} />
               </button>
            ))}

             {priceRange[1] < 5000 && (
               <button onClick={() => setPriceRange([0, 5000])} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  {language === 'en' ? 'Max:' : 'الحد الأقصى:'} {priceRange[1]} <X size={14} />
               </button>
            )}

            <button onClick={resetFilters} className="text-sm text-red-500 hover:underline ml-2">
               {tCommon.clearAll}
            </button>
         </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-900 dark:text-white shadow-sm"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <SlidersHorizontal size={18} />
          {t.filter}
        </button>

        {/* Sidebar Filters */}
        <aside className={`
          fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 lg:p-0 lg:static lg:bg-transparent lg:dark:bg-transparent lg:z-auto lg:w-64 lg:block
          transition-transform duration-300 overflow-y-auto lg:overflow-visible
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full lg:rtl:translate-x-0'}
        `}>
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <h2 className="text-2xl font-bold font-serif">{t.filter}</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X /></button>
          </div>

          <div className="space-y-10 sticky top-24">
            
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                 <Tag size={18} className="text-gray-400" /> {tCommon.categories}
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <label key={cat} className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                     selectedCategory === cat ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                    <div className="flex items-center gap-3">
                       <input 
                        type="radio" 
                        name="category" 
                        className="hidden" 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span>{getCategoryName(cat)}</span>
                    </div>
                    {selectedCategory === cat && <Check size={16} />}
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Palette size={18} className="text-gray-400" /> {tCommon.colors}
              </h3>
              <div className="flex flex-wrap gap-3">
                {allColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${
                      selectedColors.includes(color) 
                        ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-900' 
                        : 'hover:scale-110 ring-1 ring-gray-200 dark:ring-gray-700'
                    }`}
                    title={getColorName(color)}
                  >
                     <div 
                        className="w-full h-full rounded-full border border-black/5" 
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                     {selectedColors.includes(color) && (
                        <div className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                           <Check size={16} strokeWidth={3} />
                        </div>
                     )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Banknote size={18} className="text-gray-400" /> {tCommon.priceRange}
              </h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>0</span>
                <span>{priceRange[1].toLocaleString()} EGP</span>
              </div>
            </div>
            
             {/* Mobile Done Button */}
             <div className="lg:hidden pt-4">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg"
                >
                   {tCommon.showResults}
                </button>
             </div>
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {language === 'en' ? `Showing ${filteredProducts.length} products` : `عرض ${filteredProducts.length} منتج`}
            </span>
            
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center gap-3 text-sm">
              <span className="text-gray-500">{tCommon.sort}</span>
              <div className="relative group">
                 <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-transparent font-bold text-gray-900 dark:text-white focus:outline-none cursor-pointer pr-6 appearance-none z-10 relative"
                >
                  <option value="newest">{tCommon.sortNewest}</option>
                  <option value="low">{tCommon.sortLowHigh}</option>
                  <option value="high">{tCommon.sortHighLow}</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {tCommon.noProducts}
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                {tCommon.tryAdjusting}
              </p>
              <button onClick={resetFilters} className="text-primary-600 font-bold hover:underline">
                 {tCommon.clearAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
