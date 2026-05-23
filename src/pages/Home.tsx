import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Compass, Shirt } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { ReviewSlider } from "../components/ReviewSlider";
import { Newsletter } from "../components/Newsletter";
import { motion, AnimatePresence } from "framer-motion";

export const Home: React.FC = () => {
  const { products, categories, adminSettings } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const HERO_IMAGES = adminSettings?.heroBannerImages || [];

  // Auto transition every 5 seconds if images are present
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_IMAGES.length]);

  // Filter lists
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  // Unsplash images for the Instagram fashion grid
  const instaFeed = [
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535635/Gemini_Generated_Image_ybc7ixybc7ixybc7-clean_qnzgzp.png",
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535634/Gemini_Generated_Image_s91bv7s91bv7s91b-clean_s0uva0.png",
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535632/Gemini_Generated_Image_svpx6zsvpx6zsvpx-clean_hkgvtl.png",
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535631/Gemini_Generated_Image_z5abjwz5abjwz5ab-clean_oqgm1s.png",
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535327/Gemini_Generated_Image_7tmc787tmc787tmc-clean_bihph8.png",
    "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535328/Gemini_Generated_Image_8vxzhb8vxzhb8vxz-clean_yrv2kz.png"
  ];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] md:h-[92vh] w-full flex items-center justify-center bg-black overflow-hidden">
        {/* BG Slideshow */}
        <div className="absolute inset-0 z-0 bg-black">
          {HERO_IMAGES.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={HERO_IMAGES[currentSlide]}
                alt="Fashion campaign banner"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 0.55, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-[#0a0f1d] to-[#1e1b4b]/20 opacity-70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-6 md:space-y-8 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white leading-tight uppercase"
          >
            Aesthetic <br className="sm:hidden" />
            <span className="text-gradient">Minimalism</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-neutral-300 max-w-lg leading-relaxed font-medium"
          >
            Elevate your streetwear rotation with architectural cuts, clean silhouettes, and ultra-heavyweight sustainable cotton.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-2"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Shop Collection</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
              Curated Lines
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Featured Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-600/35 hover:border-indigo-600 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/5 active:scale-95 transition-all duration-300 shrink-0"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 55, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: idx * 0.08 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6" />
              <div className="absolute bottom-6 left-6 space-y-1 z-10 text-white">
                <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-wider">
                  {cat.name}
                </h3>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-sm active:scale-95"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
              Highly Demanded
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-600/35 hover:border-indigo-600 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/5 active:scale-95 transition-all duration-300 shrink-0"
          >
            <span>View Full Shop</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: idx * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL CAMPAIGN BANNER */}
      <section className="relative overflow-hidden w-full bg-[#0a0f1d] py-20 border-t border-b border-neutral-900 text-white">
        {/* Decorative ambient blur light */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 13 }}
          className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10 flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-bold tracking-widest uppercase text-indigo-300">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-300" />
            <span>Heavyweight Craftsmanship</span>
          </div>
          <h3 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight max-w-3xl leading-tight">
            Designed for Comfort, Crafted for <span className="text-gradient">Permanence</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed">
            All garments utilize bespoke fabric washes to deliver comfort from wear one, combined with double-stitched reinforcements for ultimate longevity.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition active:scale-95 cursor-pointer"
            >
              <span>Explore Materials</span>
              <Compass className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 5. NEW ARRIVALS SLIDER */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Fresh Drops
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            New Arrivals
          </h2>
        </motion.div>

        {/* Horizontal Scroll Layout */}
        <div className="flex gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: idx * 0.08 }}
              className="min-w-[260px] md:min-w-[300px] max-w-[320px] flex-1"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <motion.section
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50, damping: 13 }}
        className="max-w-7xl mx-auto px-6 py-8 border-t border-b border-neutral-200/40 dark:border-neutral-900/60 bg-neutral-50/30 dark:bg-black/5 rounded-3xl"
      >
        <div className="text-center space-y-2 mb-4">
          <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Global Response
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-905 dark:text-white">
            Client Testimonials
          </h2>
        </div>
        <ReviewSlider />
      </motion.section>

      {/* 7. INSTAGRAM FASHION GALLERY */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Editorial Looks
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Showroom Aesthetic
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-450">
            Tag us <span className="text-indigo-600 dark:text-indigo-400 font-semibold">@{adminSettings.businessName.replace(/\s+/g, "")}Label</span> to get featured.
          </p>
        </motion.div>

        {/* Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaFeed.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 85, damping: 16, delay: idx * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden group border border-neutral-100 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800"
            >
              <img
                src={img}
                alt={`Instagram look ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <InstagramIcon className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-6"
      >
        <Newsletter />
      </motion.section>
    </div>
  );
};

// Social icon local component
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default Home;
