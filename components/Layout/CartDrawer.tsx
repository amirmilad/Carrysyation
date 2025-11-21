
import React, { useEffect, useRef, useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag } from 'lucide-react';
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
  const [promoCode, setPromoCode] = useState('');

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 2000;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

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
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10 shadow-sm">
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

        {/* Free Shipping Progress */}
        {cart.length > 0 && (
           <div className="bg-gray-50 dark:bg-gray-800 px-5 py-4 border-b border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                <Truck size={16} className="text-primary-500" />
                {remaining > 0 
                  ? t.freeShippingMsg.replace('{amount}', `${remaining.toLocaleString()} EGP`)
                  : <span className="text-green-600 dark:text-green-400">{t.freeShippingUnlocked}</span>
                }
             </div>
             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
               <div 
                className="bg-gradient-to-r from-primary-400 to-gold-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }} 
               />
             </div>
           </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 opacity-60">
              <ShoppingBag size={48} className="mb-4" />
              <p>{t.empty}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in group">
                <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-100 dark:border-gray-700">
                  <img 
                    src={item.image} 
                    alt={item.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 hover:text-primary-500 transition-colors cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                        {item.name[language]}
                      </h3>
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
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
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
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-4">
            
            {/* Promo Code */}
            <div className="flex gap-2">
               <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 rtl:right-3 rtl:left-auto flex items-center pointer-events-none text-gray-400">
                    <Tag size={14} />
                  </div>
                  <input 
                    type="text" 
                    placeholder={t.promoPlaceholder}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rtl:pr-9 rtl:pl-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
               </div>
               <Button variant="outline" size="sm">{t.apply}</Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                <span>{t.total}</span>
                <span>{total.toLocaleString()} EGP</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.taxesMsg}
              </p>
            </div>
            
            <Button onClick={handleCheckout} fullWidth size="lg" className="flex justify-between items-center py-3 shadow-lg shadow-primary-500/20">
              <span>{t.checkout}</span>
              {language === 'en' ? <ArrowRight size={20} /> : <ArrowRight size={20} className="rotate-180" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
