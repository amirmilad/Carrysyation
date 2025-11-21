
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, Menu, X, Globe, Search, User, Gem } from 'lucide-react';
import { useTheme, useLanguage, useCart } from '../Contexts';
import { TRANSLATIONS } from '../../constants';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = TRANSLATIONS[language].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path 
    ? 'text-primary-600 dark:text-primary-400 font-semibold' 
    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400';

  return (
    <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2' 
        : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 3D Professional Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11">
                {/* Shadow Layer for 3D Depth */}
                <div className="absolute inset-0 bg-primary-900/20 dark:bg-black/50 rounded-xl transform translate-y-1.5 translate-x-1.5 blur-[1px]"></div>
                
                {/* Main 3D Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-inner border-t border-l border-white/30 group-hover:scale-105 transition-transform duration-300">
                  {/* Inner Glow */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/10 to-black/10 rounded-lg"></div>
                  <ShoppingBag className="text-white drop-shadow-md relative z-10" size={22} strokeWidth={2.5} />
                </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 leading-none drop-shadow-sm">
                CarryStation
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-primary-600 dark:text-gold-400 font-bold mt-1 ml-0.5">
                {language === 'en' ? 'Luxury Store' : 'متجر فاخر'}
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className={`text-sm uppercase tracking-widest transition-colors ${isActive('/')}`}>{t.home}</Link>
            <Link to="/shop" className={`text-sm uppercase tracking-widest transition-colors ${isActive('/shop')}`}>{t.shop}</Link>
            <Link to="/about" className={`text-sm uppercase tracking-widest transition-colors ${isActive('/about')}`}>{t.about}</Link>
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

             {/* Search (Visual) */}
             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 hidden sm:block">
              <Search size={20} />
            </button>

             {/* User (Visual) */}
             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 hidden sm:block">
              <User size={20} />
            </button>
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Lang Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-sm"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Cart Trigger - Opens Drawer */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full border border-white dark:border-gray-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute w-full left-0 animate-fade-in-up z-30 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">{t.home}</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">{t.shop}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">{t.about}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
