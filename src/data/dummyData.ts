import { Product, Category, Review, AdminSettings } from "../types";

export const MOCK_CATEGORIES: Category[] = [
  {
    name: "Halter Crop Tops",
    slug: "halter-crop-tops",
    image: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535635/Gemini_Generated_Image_ybc7ixybc7ixybc7-clean_qnzgzp.png"
  },
  {
    name: "Long Sleeve Crochet",
    slug: "long-sleeve-crochet",
    image: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535634/Gemini_Generated_Image_s91bv7s91bv7s91b-clean_s0uva0.png"
  },
  {
    name: "Summer Bralettes",
    slug: "summer-bralettes",
    image: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535632/Gemini_Generated_Image_svpx6zsvpx6zsvpx-clean_hkgvtl.png"
  },
  {
    name: "Boho Crop Tops",
    slug: "boho-crop-tops",
    image: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535328/Gemini_Generated_Image_8vxzhb8vxzhb8vxz-clean_yrv2kz.png"
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Rashi Classic Halter Crop Top",
    description: "Beautifully hand-crocheted halter crop top with adjustable neck and back straps. Perfect for warm summer days, custom knit from premium soft cotton yarn.",
    price: 2990,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535635/Gemini_Generated_Image_ybc7ixybc7ixybc7-clean_qnzgzp.png"],
    category: "halter-crop-tops",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Olive", hex: "#556B2F" }
    ],
    stock: 12,
    featured: true,
    trending: true
  },
  {
    id: "prod-2",
    name: "Blossom Long Sleeve Crop Top",
    description: "Elegant long sleeve crochet top featuring a floral lace pattern and scalloped edges. A true handmade masterpiece made with premium breathable yarn.",
    price: 4200,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535634/Gemini_Generated_Image_s91bv7s91bv7s91b-clean_s0uva0.png"],
    category: "long-sleeve-crochet",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Peach", hex: "#FFDAB9" },
      { name: "Dusty Blue", hex: "#B0E0E6" }
    ],
    stock: 8,
    featured: true,
    trending: true
  },
  {
    id: "prod-3",
    name: "Summer Breeze Crochet Bralette",
    description: "Minimalist knit bralette with intricate chest stitching. Super soft and breathable premium cotton blend yarn for maximum styling comfort.",
    price: 2490,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535632/Gemini_Generated_Image_svpx6zsvpx6zsvpx-clean_hkgvtl.png"],
    category: "summer-bralettes",
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Sand", hex: "#C2B280" },
      { name: "Ivory", hex: "#FFFFF0" }
    ],
    stock: 15,
    featured: true,
    trending: true
  },
  {
    id: "prod-4",
    name: "Boho Fringe Crop Top",
    description: "Festival-ready boho top with delicate front fringe details, an open knit back, and comfortable halter tying straps.",
    price: 3490,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535328/Gemini_Generated_Image_8vxzhb8vxzhb8vxz-clean_yrv2kz.png"],
    category: "boho-crop-tops",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Mustard", hex: "#FFDB58" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Rust", hex: "#B7410E" }
    ],
    stock: 10,
    featured: true,
    trending: true
  },
  {
    id: "prod-5",
    name: "Daisy Chain Crop Top",
    description: "Vintage-inspired halter neck crop top adorned with a handmade daisy chain border and lace-up back detailing.",
    price: 3200,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535631/Gemini_Generated_Image_z5abjwz5abjwz5ab-clean_oqgm1s.png"],
    category: "halter-crop-tops",
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "White", hex: "#FFFFFF" }
    ],
    stock: 7,
    featured: false,
    trending: true
  },
  {
    id: "prod-6",
    name: "Aura Square Neck Crop Top",
    description: "Stunning square-neck top with vintage grid patterns, thick comfortable shoulder straps, and a secure fitted band.",
    price: 3800,
    images: ["https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535327/Gemini_Generated_Image_7tmc787tmc787tmc-clean_bihph8.png"],
    category: "boho-crop-tops",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Mint", hex: "#98FF98" },
      { name: "Black", hex: "#000000" },
      { name: "Cream", hex: "#FFFDD0" }
    ],
    stock: 9,
    featured: true,
    trending: false
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Malsha Devindi",
    rating: 5,
    comment: "Highly recommend 😍 Rashi Fashion",
    date: "2023-05-16",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  }
];

export const DEFAULT_SETTINGS: AdminSettings = {
  whatsappNumber: "94781692763",
  businessName: "Rashi Fashion",
  currencySymbol: "Rs. ",
  greetingTemplate: "Hello, I want to order:\n\n*Product:* {productName}\n*Color:* {color}\n*Size:* {size}\n*Quantity:* {quantity}\n*Price:* {price}\n\nPlease confirm availability.",
  cloudinaryCloudName: "divjuliq6",
  cloudinaryUploadPreset: "clothing-shop",
  heroBannerImages: []
};
