export interface IConstantProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  trending: boolean;
}

export const MOCK_PRODUCTS: IConstantProduct[] = [
  {
    _id: "60d5ec498661141c2c2f0001",
    name: "Classic Leather Jacket",
    description: "Premium handcrafted leather jacket with metal hardware. Timeless style, tailored fit, durable construction.",
    price: 189.99,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"],
    category: "Men",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Brown"],
    stock: 12,
    featured: true,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0002",
    name: "VÉLOCE Core Hoodie",
    description: "Heavyweight organic cotton hoodie in a relaxed drop-shoulder fit. Features signature minimal embroidered branding.",
    price: 79.99,
    images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-White", "Black", "Sand"],
    stock: 35,
    featured: true,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0003",
    name: "Minimalist Trench Coat",
    description: "Tailored double-breasted trench coat with waist tie. Water-resistant cotton blend, satin lining.",
    price: 245.00,
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"],
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Black"],
    stock: 8,
    featured: true,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0004",
    name: "Silk Satin Slip Dress",
    description: "Flowing midi slip dress crafted from 100% pure mulberry silk. V-neckline, adjustable cross-back straps.",
    price: 135.00,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"],
    category: "Women",
    sizes: ["XS", "S", "M"],
    colors: ["Emerald", "Champagne", "Midnight"],
    stock: 15,
    featured: true,
    trending: false,
  },
  {
    _id: "60d5ec498661141c2c2f0005",
    name: "Volt Runner V2",
    description: "Performance lifestyle sneakers with responsive foam cushioning and breathable mesh panels. Futuristic silhouette.",
    price: 150.00,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    category: "Sneakers",
    sizes: ["8", "9", "10", "11"],
    colors: ["Volt Blue", "Grey Matter"],
    stock: 20,
    featured: true,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0006",
    name: "Aero Boost Sneakers",
    description: "Ultra-lightweight everyday sneakers featuring recycled knit upper and zero-gravity sole profile.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"],
    category: "Sneakers",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Triple White", "Triple Black"],
    stock: 18,
    featured: false,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0007",
    name: "Titanium Chrono Watch",
    description: "Sleek matte-finished titanium watch with sapphire glass. Chronograph functions, water resistant up to 100m.",
    price: 299.99,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Titanium Grey", "Obsidian"],
    stock: 5,
    featured: true,
    trending: true,
  },
  {
    _id: "60d5ec498661141c2c2f0008",
    name: "Premium Acetate Sunglasses",
    description: "Classic D-frame sunglasses crafted in bio-acetate with polarized dark grey lenses. UV400 protection.",
    price: 85.00,
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Tortoise", "Black"],
    stock: 40,
    featured: false,
    trending: true,
  },
];
