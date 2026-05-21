import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag } from "lucide-react";
import { Product } from "../types";
import { useAppContext } from "../context/AppContext";
import { ProductModal } from "./ProductModal";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { adminSettings } = useAppContext();
  const [showQuickView, setShowQuickView] = useState(false);

  const isOutOfStock = product.stock <= 0;

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-[#0c111e]/40 border border-neutral-100 dark:border-neutral-900 rounded-3xl overflow-hidden p-3 flex flex-col h-full hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/60 transition-all duration-300"
      >
        {/* Badges Container */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {isOutOfStock ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-rose-600 text-white rounded-full shadow-sm">
              Sold Out
            </span>
          ) : (
            <>
              {product.featured && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-indigo-600 text-white rounded-full shadow-sm">
                  Featured
                </span>
              )}
              {product.trending && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#1e293b] dark:bg-slate-200 dark:text-neutral-900 text-white rounded-full shadow-sm">
                  Trending
                </span>
              )}
            </>
          )}
        </div>

        {/* Thumbnail Image Container */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0 cursor-pointer">
          <Link to={`/product/${product.id}`} className="absolute inset-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-black/5 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Quick Actions Hover Drawer */}
          {!isOutOfStock && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={() => setShowQuickView(true)}
                className="flex items-center justify-center p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 shadow-md shadow-black/5 dark:shadow-black/30 transition-transform cursor-pointer"
                title="Quick View"
              >
                <Eye className="h-4 w-4" />
              </button>
              <Link
                to={`/product/${product.id}`}
                className="flex items-center justify-center p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 shadow-md shadow-indigo-600/10 transition-transform"
                title="View Options"
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow pt-4 px-1.5 pb-2">
          {/* Category */}
          <span className="text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500 tracking-widest mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-heading font-medium text-sm md:text-base text-neutral-800 dark:text-neutral-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Price */}
          <div className="mt-auto flex justify-between items-center gap-2">
            <span className="font-bold text-base md:text-lg text-neutral-900 dark:text-white">
              {adminSettings.currencySymbol}
              {product.price}
            </span>
            
            <Link
              to={`/product/${product.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer shrink-0"
            >
              <span>Order</span>
              <span className="text-[11px] leading-none">→</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal Overlay */}
      <AnimatePresence>
        {showQuickView && (
          <ProductModal product={product} onClose={() => setShowQuickView(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
export default ProductCard;
