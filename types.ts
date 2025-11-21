
export type Language = 'en' | 'ar';

export interface Product {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  category: string;
  image: string;
  images?: string[]; // Optional array for gallery images
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Translation {
  nav: {
    home: string;
    shop: string;
    about: string;
    contact: string;
    cart: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  sections: {
    shopByCategory: string;
    featured: string;
    viewAll: string;
    testimonials: string;
    newsletterTitle: string;
    newsletterDesc: string;
    subscribe: string;
    emailPlaceholder: string;
    promoTitle: string;
    promoSubtitle: string;
    promoBtn: string;
  };
  shop: {
    title: string;
    filter: string;
    addToCart: string;
    price: string;
  };
  product: {
    details: string;
    specifications: string;
    shipping: string;
    related: string;
    askStylist: string;
    color: string;
    quantity: string;
    addToCart: string;
    description: string;
    material: string;
    dimensions: string;
    care: string;
    share: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    remove: string;
  };
  ai: {
    title: string;
    placeholder: string;
    send: string;
    thinking: string;
    suggest: string;
  };
}

export enum SortOption {
  NEWEST = 'newest',
  PRICE_LOW = 'price_low',
  PRICE_HIGH = 'price_high',
}