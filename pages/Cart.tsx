import React from 'react';
import { useCart, useLanguage } from '../components/Contexts';
import { TRANSLATIONS } from '../constants';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, total } = useCart();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].cart;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.empty}</h2>
        <Link to="/shop" className="mt-4">
          <Button variant="primary">{TRANSLATIONS[language].hero.cta}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">{t.title}</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <img 
                src={item.image} 
                alt={item.name[language]} 
                className="w-24 h-24 object-cover rounded-md bg-gray-50"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name[language]}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {(item.price * item.quantity).toLocaleString()} EGP
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-24">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t.total}</h3>
            <div className="flex justify-between items-center text-xl font-bold mb-6 text-gray-900 dark:text-white">
              <span>{t.total}</span>
              <span>{total.toLocaleString()} EGP</span>
            </div>
            <Button fullWidth size="lg" className="flex items-center justify-center gap-2">
              {t.checkout}
              {language === 'en' ? <ArrowRight size={18} /> : <ArrowRight size={18} className="rotate-180" />}
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4">
              Secure checkout powered by Stripe (Mock)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};