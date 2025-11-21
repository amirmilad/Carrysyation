
import React from 'react';
import { Product } from '../../types';
import { CATEGORY_NAMES } from '../../constants';
import { useLanguage, useCart } from '../Contexts';
import { Button } from '../UI/Button';
import { ShoppingCart } from 'lucide-react';
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
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name[language]} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-primary-500 font-medium mb-1 uppercase tracking-wider">
          {categoryName}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-1 hover:text-primary-500 transition-colors">
            {product.name[language]}
          </h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description[language]}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            {product.price.toLocaleString()} EGP
          </span>
          <Button 
            onClick={() => addToCart(product)} 
            variant="primary" 
            size="sm"
            className="gap-2"
          >
             <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
