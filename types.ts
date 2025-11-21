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
  shop: {
    title: string;
    filter: string;
    addToCart: string;
    price: string;
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