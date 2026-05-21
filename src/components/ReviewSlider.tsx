import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export const ReviewSlider: React.FC = () => {
  const { reviews } = useAppContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (!reviews || reviews.length === 0) return null;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[index];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Slider Box */}
      <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center space-y-4 max-w-2xl px-6"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < current.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300 dark:text-neutral-700"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-sm md:text-base md:leading-relaxed text-neutral-600 dark:text-neutral-300 italic font-medium">
              "{current.comment}"
            </p>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
              />
              <div className="text-left">
                <h5 className="font-heading font-semibold text-xs text-neutral-800 dark:text-neutral-100">
                  {current.name}
                </h5>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  Verified Buyer • {current.date}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {reviews.length > 1 && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 left-0 right-0 pointer-events-none">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 pointer-events-auto cursor-pointer transition-colors active:scale-95"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 pointer-events-auto cursor-pointer transition-colors active:scale-95"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === index ? "w-6 bg-indigo-600 dark:bg-indigo-400" : "w-1.5 bg-neutral-350 dark:bg-neutral-700"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ReviewSlider;
