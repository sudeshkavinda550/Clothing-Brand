import { Product, Category, Review, AdminSettings } from "../types";

export const MOCK_CATEGORIES: Category[] = [];

// No pre-loaded products — add your own from the admin panel
export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Dilnoza S.",
    rating: 5,
    comment: "The quality of the crochet work is absolutely stunning. Every stitch is perfect. I ordered a crop top and it fits beautifully!",
    date: "2026-04-12",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "rev-2",
    name: "Asel R.",
    rating: 5,
    comment: "Ordering via WhatsApp was so easy and fast. The crochet cardigan is even more beautiful in person. Highly recommend!",
    date: "2026-05-02",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "rev-3",
    name: "Rashi F.",
    rating: 5,
    comment: "I have been searching for handmade crochet pieces for months. Found this shop and I am obsessed. The attention to detail is incredible.",
    date: "2026-05-18",
    avatar: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=100&q=80"
  }
];

export const DEFAULT_SETTINGS: AdminSettings = {
  whatsappNumber: "94775286498",
  businessName: "Rashi Fashion",
  currencySymbol: "Rs. ",
  greetingTemplate: "Hello, I want to order:\n\n*Product:* {productName}\n*Color:* {color}\n*Size:* {size}\n*Quantity:* {quantity}\n*Price:* {price}\n\nPlease confirm availability.",
  cloudinaryCloudName: "divjuliq6",
  cloudinaryUploadPreset: "clothing-shop",
  heroBannerImages: []
};
