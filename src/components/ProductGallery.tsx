import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full items-start">
      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-2.5 md:gap-3 overflow-x-auto md:overflow-y-auto pb-1 md:pb-0 no-scrollbar w-full md:w-20 flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 bg-neutral-50 dark:bg-neutral-900 transition-all cursor-pointer ${
                activeIndex === idx
                  ? "border-indigo-600 dark:border-indigo-500 scale-[0.98]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-[0.98]"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Active Image */}
      <div className="relative aspect-[4/5] flex-grow w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/40">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt="Product view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
export default ProductGallery;
