export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Butterfly' | 'Floral' | 'Glitter & Sparkle' | 'Cute & Bow' | 'Luxury' | 'Minimal';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: 'BEST SELLER' | 'TRENDING' | 'NEW' | 'LIMITED EDITION';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  description: string;
  features: string[];
  materials: string;
  inStock: boolean;
  charmIncluded?: boolean;
}

export interface CartItem {
  product: Product;
  selectedModel: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

export type PhoneBrand = 'Samsung' | 'Apple' | 'OnePlus';

export interface PhoneModelOption {
  brand: PhoneBrand;
  model: string;
}
