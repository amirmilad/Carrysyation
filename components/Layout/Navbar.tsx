import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme, useLanguage, useCart } from '../Contexts';
import { TRANSLATIONS } from '../../constants';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = TRANSLATIONS[language].nav;

  const isActive = (path: string) => location.pathname === path ? 'text-primary-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center rounded-sm font-serif font-bold text-xl transition-transform group-hover:scale-110">
              C
            </div>
            <span className="font-serif text-xl font-bold tracking-wide text-gray-900 dark:text-white">
              CarryStation
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className={isActive('/')}>{t.home}</Link>
            <Link to="/shop" className={isActive('/shop')}>{t.shop}</Link>
            <Link to="/shop" className={isActive('/about')}>{t.about}</Link>
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Lang Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
              className="flex items-center gap-1 text-sm font-medium hover:text-primary-500"
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:text-primary-500">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">{t.home}</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">{t.shop}</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">{t.about}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};