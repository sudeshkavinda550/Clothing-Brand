import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera } from "lucide-react";

export const Gallery: React.FC = () => {
  // 12 beautiful Unsplash editorial images focusing entirely on women's high fashion
  const campaignPhotos = [
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      tag: "Minimalist Set",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      tag: "Heavy loopback",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      tag: "Outerwear Line",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      tag: "Cozy knitwear",
      span: "row-span-2 col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      tag: "Minimal Trench",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      tag: "Blazer Capsule",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      tag: "Summer Dress",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      tag: "Organic Cotton",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
      tag: "Oversized Tee",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
      tag: "Heavy loopback",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      tag: "Structured Blazer",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      tag: "Street Hoodies",
      span: "row-span-1 col-span-1"
    }
  ];

  return (
    <div className="pb-20 space-y-16 overflow-x-hidden">
      {/* 1. HEADER TITLE */}
      <section className="relative pt-12 text-center max-w-3xl mx-auto px-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-[#0c111e]/40 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400"
        >
          <Camera className="h-3.5 w-3.5 text-indigo-500" />
          <span>Lookbook 2026</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white"
        >
          Campaign Looks
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed"
        >
          Explore editorial looks, clean silhouettes, and architectural cuts. Designed with loopback textures and soft premium finishes.
        </motion.p>
      </section>

      {/* 2. LOOKBOOK GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {campaignPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 55, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 65, damping: 14, delay: (idx % 3) * 0.08 }}
              className={`group relative rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-[#0c111e]/40 ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.tag}
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                loading="lazy"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
              
              {/* Overlay label */}
              <div className="absolute bottom-5 left-5 text-white space-y-1 transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-300">
                  Capsule Line
                </span>
                <h3 className="font-heading font-bold text-sm md:text-base uppercase tracking-wider">
                  {photo.tag}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
