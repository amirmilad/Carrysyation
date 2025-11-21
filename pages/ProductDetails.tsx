
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Truck, Shield, ShoppingBag, Sparkles, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { useLanguage, useCart } from '../components/Contexts';
import { Button } from '../components/UI/Button';
import { ProductCard } from '../components/Product/ProductCard';
import { AIStylist } from '../components/AI/AIStylist';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
  const t = TRANSLATIONS[language].product;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
      setCurrentImageIndex(0);
    }
  }, [id, product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Product Not Found</div>;
  }

  // Ensure we have a list of images, fallback to the single image if array is missing
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const openStylist = () => {
    alert(language === 'en' ? "Open the AI Stylist at the bottom right!" : "افتحي مساعد الأزياء في الأسفل!");
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen pb-20 animate-fade-in bg-white dark:bg-gray-950">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-primary-500">{TRANSLATIONS[language].nav.home}</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-500">{TRANSLATIONS[language].nav.shop}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">{product.name[language]}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Product Image Gallery */}
          <div className="space-y-4 select-none">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-sm group">
              
              {/* Main Image */}
              <img 
                src={productImages[currentImageIndex]} 
                alt={product.name[language]} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 p-2 rounded-full text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110 shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
                New Arrival
              </div>
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {productImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      i === currentImageIndex 
                        ? 'border-primary-500 opacity-100 ring-2 ring-primary-100 dark:ring-primary-900' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                     <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-primary-600 font-bold uppercase tracking-widest text-sm">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {product.name[language]}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {product.price.toLocaleString()} EGP
              </div>
              <div className="flex text-gold-400 gap-0.5">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
              </div>
            </div>

            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {product.description[language]}
            </div>

            <div className="space-y-6 mb-8 border-t border-b border-gray-100 dark:border-gray-800 py-8">
              {/* Colors */}
              <div>
                <span className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  {t.color}: <span className="font-normal text-gray-500">{selectedColor}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === color 
                          ? 'border-primary-500 scale-110 ring-2 ring-primary-100 dark:ring-primary-900' 
                          : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  {t.quantity}
                </span>
                <div className="flex items-center w-32 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 text-center font-medium">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2 py-4 text-lg shadow-xl shadow-primary-500/10">
                <ShoppingBag size={20} />
                {t.addToCart}
              </Button>
              <Button onClick={openStylist} variant="outline" size="lg" className="flex-1 gap-2 py-4 text-lg border-gold-400 text-gold-600 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gray-800">
                <Sparkles size={20} />
                {t.askStylist}
              </Button>
            </div>

            {/* Features List */}
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-green-500" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-blue-500" />
                <span>Free Shipping</span>
              </div>
            </div>

            {/* Details Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-6 mb-4 mt-4">
                {(['description', 'specs', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === tab 
                        ? 'border-primary-500 text-primary-500' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab === 'description' ? t.description : tab === 'specs' ? t.specifications : t.shipping}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 min-h-[100px] leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.description[language]} {language === 'en' ? 'Handcrafted with precision to ensure durability and style.' : 'مصنوعة يدوياً بدقة لضمان المتانة والأناقة.'}</p>
                )}
                {activeTab === 'specs' && (
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>{t.material}</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>{t.dimensions}</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>{t.care}</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <p>{language === 'en' ? 'Free worldwide shipping on all orders over 2000 EGP. Returns accepted within 30 days.' : 'شحن مجاني لجميع الطلبات التي تزيد عن 2000 جنيه. يقبل الاسترجاع خلال 30 يوماً.'}</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-serif font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-4">
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
            {t.related}
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
