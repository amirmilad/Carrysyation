
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../Contexts';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: About Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {language === 'en' ? 'About Us' : 'من نحن'}
            </h3>
            <div className="space-y-4">
               <div className="font-serif text-2xl font-bold text-gray-900 dark:text-white">CarryStation</div>
               <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                {language === 'en' 
                  ? "CarryStation is your premier destination for luxury handcrafted handbags. We blend timeless elegance with modern utility to create pieces that stand out."
                  : "CarryStation هي وجهتك الأولى للحقائب اليدوية الفاخرة. نمزج بين الأناقة الخالدة والعملية العصرية لابتكار قطع متميزة."}
              </p>
            </div>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                 <Instagram size={20} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                 <Facebook size={20} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                 <Twitter size={20} />
               </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0" />
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0" />
                  {language === 'en' ? 'Shop Collection' : 'تسوق المجموعة'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0" />
                  {language === 'en' ? 'Our Story' : 'قصتنا'}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0" />
                  {language === 'en' ? 'Shopping Cart' : 'سلة التسوق'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === 'en' ? 'Contact Info' : 'معلومات التواصل'}
            </h3>
            <ul className="space-y-6 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                   <MapPin size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white mb-1">{language === 'en' ? 'Address' : 'العنوان'}</span>
                  <span>
                    {language === 'en' 
                      ? '123 Luxury Avenue, Fashion District, Cairo, Egypt' 
                      : '123 شارع الفخامة، حي الأزياء، القاهرة، مصر'}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                   <Phone size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white mb-1">{language === 'en' ? 'Phone' : 'الهاتف'}</span>
                  <span>+20 100 000 0000</span>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                   <Mail size={20} />
                </div>
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white mb-1">{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</span>
                  <span>support@carrystation.com</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {year} CarryStation. {language === 'en' ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a>
             <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
