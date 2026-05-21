export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string; // matches Category slug
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  featured: boolean;
  trending: boolean;
  createdAt?: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface AdminSettings {
  whatsappNumber: string;
  businessName: string;
  currencySymbol: string;
  greetingTemplate: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

export interface AnalyticsData {
  totalInventoryValue: number;
  activeProducts: number;
  categoryDistribution: { name: string; value: number }[];
  recentVisits: number;
}
