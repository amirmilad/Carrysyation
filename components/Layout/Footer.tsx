import React from 'react';
import { useLanguage } from '../Contexts';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">CarryStation</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {language === 'en' 
                ? "Defining elegance with every stitch. Quality handcrafted bags for the modern lifestyle."
                : "تعريف الأناقة في كل غرزة. حقائب مصنوعة يدوياً بجودة عالية لنمط الحياة العصري."}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? "Links" : "روابط"}</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary-500">Instagram</a></li>
              <li><a href="#" className="hover:text-primary-500">Facebook</a></li>
              <li><a href="#" className="hover:text-primary-500">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? "Contact" : "تواصل معنا"}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              support@carrystation.com<br />
              +20 100 000 0000
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
          &copy; {year} CarryStation. {language === 'en' ? "All rights reserved." : "جميع الحقوق محفوظة."}
        </div>
      </div>
    </footer>
  );
};