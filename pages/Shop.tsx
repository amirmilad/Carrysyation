import React, { useState } from 'react';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { ProductCard } from '../components/Product/ProductCard';
import { useLanguage } from '../components/Contexts';
import { Filter } from 'lucide-react';

export const Shop: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].shop;
  const [category, setCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = category === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === category);

  return (
    <div className="min-h-screen pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
          {t.title}
        </h1>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          <Filter size={18} className="text-gray-400 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};