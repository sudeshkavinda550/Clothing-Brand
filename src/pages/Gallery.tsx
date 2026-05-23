import React from "react";
import { motion } from "framer-motion";

export const Gallery: React.FC = () => {
  // 12 beautiful Unsplash editorial images focusing entirely on women's high fashion
  const campaignPhotos = [
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535340/Gemini_Generated_Image_qe8cnzqe8cnzqe8c-clean_rmxkfv.png",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535338/Gemini_Generated_Image_nowe1hnowe1hnowe-clean_rxzuhx.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535337/Gemini_Generated_Image_ipipd4ipipd4ipip-clean_nalmq7.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535336/Gemini_Generated_Image_4p1myi4p1myi4p1m-clean_stkmmb.png",
      span: "row-span-2 col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535337/Gemini_Generated_Image_gdm4cwgdm4cwgdm4-clean_rzqmwp.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535335/Gemini_Generated_Image_1nn4v71nn4v71nn4-clean_n4wolj.png",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535330/Gemini_Generated_Image_g13qsxg13qsxg13q-clean_diamze.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535329/Gemini_Generated_Image_2cuq3f2cuq3f2cuq-clean_k6wute.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535328/Gemini_Generated_Image_8vxzhb8vxzhb8vxz-clean_yrv2kz.png",
      span: "row-span-2 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535328/Gemini_Generated_Image_1b6owl1b6owl1b6o-clean_ylo1y0.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535327/Gemini_Generated_Image_7tmc787tmc787tmc-clean_bihph8.png",
      span: "row-span-1 col-span-1"
    },
    {
      src: "https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535323/Gemini_Generated_Image_1udohu1udohu1udo-clean_aiyqqq.png",
      span: "row-span-1 col-span-1"
    }
  ];

  return (
    <div className="pb-20 space-y-16 overflow-x-hidden">
      {/* 1. HEADER TITLE */}
      <section className="relative pt-12 text-center max-w-3xl mx-auto px-6 space-y-4">
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
                alt={`Campaign Photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                loading="lazy"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
