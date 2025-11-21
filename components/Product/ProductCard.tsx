
import React from 'react';
import { Product } from '../../types';
import { CATEGORY_NAMES } from '../../constants';
import { useLanguage, useCart } from '../Contexts';
import { Button } from '../UI/Button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();

  // Fallback if category is not found in map
  const categoryName = CATEGORY_NAMES[product.category]?.[language] || product.category;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col relative">
      
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer block">
        <img 
          src={product.image} 
          alt={product.name[language]} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button 
            variant="white"
            className="rounded-full p-3 hover:scale-110 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            title={language === 'en' ? "Quick Add" : "إضافة سريعة"}
          >
            <ShoppingCart size={20} />
          </Button>
           <Button 
            variant="white"
            className="rounded-full p-3 hover:scale-110 transition-transform"
            onClick={(e) => {
              // Default link behavior works
            }}
            title={language === 'en' ? "View Details" : "عرض التفاصيل"}
          >
            <Eye size={20} />
          </Button>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <div className="text-xs text-primary-600 dark:text-primary-400 font-bold uppercase tracking-wider">
            {categoryName}
          </div>
          {/* Price */}
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            {product.price.toLocaleString()} EGP
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-1 hover:text-primary-500 transition-colors leading-snug">
            {product.name[language]}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-3 mb-4">
           {product.colors.map(color => (
             <div 
                key={color}
                className="w-3 h-3 rounded-full border border-gray-200 shadow-sm ring-1 ring-transparent hover:ring-gray-300 transition-all" 
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
           ))}
           <span className="text-xs text-gray-400 ml-1">+{product.colors.length}</span>
        </div>

        <Button 
            onClick={() => addToCart(product)} 
            variant="outline" 
            fullWidth
            size="sm"
            className="mt-auto group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 border-gray-200 dark:border-gray-700"
          >
             {language === 'en' ? 'Add to Bag' : 'أضف للسلة'}
        </Button>
      </div>
    </div>
  );
};