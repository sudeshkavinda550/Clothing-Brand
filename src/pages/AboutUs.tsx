import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, RefreshCw } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const AboutUs: React.FC = () => {
  const { adminSettings } = useAppContext();
  const stats = [
    { label: "100% Handcrafted", value: "Artisan" },
    { label: "Premium Cotton Yarn", value: "Soft Fit" },
    { label: "Meticulous Detail", value: "Custom" },
    { label: "WhatsApp Support", value: "24/7" }
  ];

  return (
    <div className="pb-20 space-y-24 overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative h-[55vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dp1jwsapk/image/upload/v1779536017/james-forbes-Sg5DfNDJ7ks-unsplash_dwz3us.jpg"
            alt="About Us Campaign"
            className="w-full h-full object-cover opacity-50 dark:opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white"
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-neutral-350 max-w-lg mx-auto font-medium"
          >
            {adminSettings.businessName} is a design studio focused on premium quality fashion, custom designs, and everyday styling.
          </motion.p>
        </div>
      </section>

      {/* 2. THE BRAND PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="space-y-6"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Aesthetic Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            Artistry <br className="hidden md:block" />
            Hand-Crocheted
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Founded with a commitment to celebrate handcrafted design and slow fashion, we curate premium handmade crochet crop tops and knitwear. Every single piece is meticulously hand-crocheted by local artisans, representing hours of dedication, high-quality premium cotton yarn, and custom sizing designed to fit your body perfectly.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We do not follow mass-produced trends. We produce permanent artisan essentials with custom knit patterns, elegant textures, and soft pre-washed yarn that feels comfortable and luxurious from the very first wear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="relative rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800"
        >
          <img
            src="https://res.cloudinary.com/dp1jwsapk/image/upload/v1779535330/Gemini_Generated_Image_g13qsxg13qsxg13q-clean_diamze.png"
            alt="Womenswear silhouette look"
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      {/* 3. METRIC COUNTERS */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-b border-neutral-100 dark:border-neutral-900">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60, damping: 14, delay: idx * 0.1 }}
              className="text-center space-y-1"
            >
              <div className="text-3xl md:text-5xl font-heading font-black text-indigo-600 dark:text-indigo-400">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Our Standard
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
            Design Standards
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            A commitment to excellence in fabric selection, construction, and client relations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0 }}
            className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0c111e]/40 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-650 dark:text-indigo-450">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-neutral-850 dark:text-white uppercase">
              Artisan Handmade
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              We work with dedicated local women artisans who hand-crochet each crop top with utmost precision and care, keeping traditional craftsmanship alive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.1 }}
            className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0c111e]/40 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-650 dark:text-indigo-450">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-neutral-850 dark:text-white uppercase">
              Premium Cotton Yarn
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              We select only the softest, high-grade cotton and acrylic blend yarns, ensuring your crochet crop top is breathable, durable, and feels amazing on the skin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.2 }}
            className="p-6 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0c111e]/40 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-650 dark:text-indigo-450">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-neutral-850 dark:text-white uppercase">
              Custom Fit Options
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              Specify your exact measurements and custom color combinations on checkout, and our artisans will knit a crop top tailored uniquely to your body.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
