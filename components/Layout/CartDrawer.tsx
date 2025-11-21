import React, { useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, useLanguage } from '../Contexts';
import { TRANSLATIONS } from '../../constants';
import { Button } from '../UI/Button';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total } = useCart();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].cart;
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity opacity-100" />
      
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        className={`relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col transition-transform duration-300 transform translate-x-0 ${language === 'ar' ? 'border-r' : 'border-l'} border-gray-200 dark:border-gray-800 animate-slide-in`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10">
          <h2 className="text-xl font-serif font-bold flex items-center gap-2">
            <ShoppingBag size={20} />
            {t.title} <span className="text-sm font-sans font-normal text-gray-500">({cart.length})</span>
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 opacity-60">
              <ShoppingBag size={48} className="mb-4" />
              <p>{t.empty}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in">
                <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name[language]} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name[language]}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString()} EGP
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>{t.total}</span>
              <span>{total.toLocaleString()} EGP</span>
            </div>
            <Button onClick={handleCheckout} fullWidth size="lg" className="flex justify-between items-center">
              <span>{t.checkout}</span>
              {language === 'en' ? <ArrowRight size={20} /> : <ArrowRight size={20} className="rotate-180" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};