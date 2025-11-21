
import React from 'react';
import { useLanguage } from '../components/Contexts';
import { Shield, Users, Heart, Globe } from 'lucide-react';

export const About: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Our Story",
      subtitle: "More than just a bag, it's a statement of elegance and sustainability.",
      story: "Founded in 2020, CarryStation began with a simple mission: to create handbags that blend timeless Italian aesthetics with modern functionality. We believe that luxury shouldn't come at the cost of ethical production.",
      valuesTitle: "Our Core Values",
      values: [
        { title: "Quality Craftsmanship", text: "Every stitch is placed with precision by master artisans." },
        { title: "Sustainable Sourcing", text: "We use 100% vegetable-tanned leather and eco-friendly packaging." },
        { title: "Customer First", text: "Your satisfaction is our relentless pursuit." }
      ],
      stats: [
        { num: "5K+", label: "Happy Customers" },
        { num: "50+", label: "Unique Designs" },
        { num: "12", label: "Countries Served" }
      ]
    },
    ar: {
      title: "قصتنا",
      subtitle: "أكثر من مجرد حقيبة، إنها تعبير عن الأناقة والاستدامة.",
      story: "تأسست CarryStation في عام 2020 بمهمة بسيطة: ابتكار حقائب يد تمزج بين الجماليات الإيطالية الخالدة والوظائف العصرية. نؤمن بأن الفخامة لا يجب أن تكون على حساب الإنتاج الأخلاقي.",
      valuesTitle: "قيمنا الجوهرية",
      values: [
        { title: "حرفية عالية الجودة", text: "يتم وضع كل غرزة بدقة بواسطة حرفيين مهرة." },
        { title: "مصادر مستدامة", text: "نستخدم 100% جلود مدبوغة نباتياً وتغليف صديق للبيئة." },
        { title: "العميل أولاً", text: "رضاكم هو سعينا المستمر." }
      ],
      stats: [
        { num: "+5000", label: "عميل سعيد" },
        { num: "+50", label: "تصميم فريد" },
        { num: "12", label: "دولة نخدمها" }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="animate-fade-in">
      
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2071&auto=format&fit=crop" 
          alt="Artisan working on leather"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-xl text-gray-200 font-light leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="w-12 h-1 bg-primary-500"></div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Defining Modern Luxury' : 'تعريف الفخامة العصرية'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {t.story}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === 'en' 
                ? "We source our leather from certified tanneries in Tuscany, ensuring that every bag ages beautifully with time. Our designs are inspired by the architecture of modern cities and the colors of nature."
                : "نحصل على جلودنا من مدابغ معتمدة في توسكانا، لضمان أن تزداد كل حقيبة جمالاً مع مرور الوقت. تصاميمنا مستوحاة من عمارة المدن الحديثة وألوان الطبيعة."}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-400 rounded-lg z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop" 
              alt="Bag details"
              className="relative z-10 rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-gray-900 dark:text-white">
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.values[0].title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t.values[0].text}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.values[1].title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t.values[1].text}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t.values[2].title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t.values[2].text}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 text-center border-t border-b border-gray-200 dark:border-gray-800 py-12">
          {t.stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                {stat.num}
              </div>
              <div className="text-sm md:text-base text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
