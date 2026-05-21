import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, RefreshCw } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const AboutUs: React.FC = () => {
  const { adminSettings } = useAppContext();
  const stats = [
    { label: "Sustainable Cotton", value: "100%" },
    { label: "Garment Lifespan", value: "5+ Yrs" },
    { label: "Bespoke Fabrics", value: "450GSM" },
    { label: "Courier Support", value: "24/7" }
  ];

  return (
    <div className="pb-20 space-y-24 overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative h-[55vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&w=1920&q=80"
            alt="About Us Campaign"
            className="w-full h-full object-cover opacity-50 dark:opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-indigo-200"
          >
            <Sparkles className="h-3 w-3 text-indigo-300" />
            <span>Since 2024</span>
          </motion.div>
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
            Minimalism <br className="hidden md:block" />
            Redefined
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Founded with a commitment to subvert the fast-fashion cycle, we curate structural capsule lines for women. Every piece represents hours of refining proportions, sourcing sustainable 100% organic cotton, and crafting fabrics that fall perfectly on the body.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We do not follow seasonal trends. We produce permanent essentials with heavy GSM weights, double-stitched durability, and soft pre-shrunk washes that feel luxurious from the very first wear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800"
        >
          <img
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
            alt="Womenswear silhouette look"
            className="w-full h-full object-cover"
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
              Ethical Sourcing
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              We work exclusively with ethical textile mills globally, utilizing organic and recycled yarn fabrics to support clean production environments.
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
              Heavyweight Fabrics
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              Ditching thin structures, we develop heavyweight loopbacks and French terry materials designed to hold structured fits and withstand hundreds of wash cycles.
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
              Seamless Ordering
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-450 leading-relaxed">
              We skip complicated accounts. Add items, customize options, and checkout straight to WhatsApp to complete details with support team.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
