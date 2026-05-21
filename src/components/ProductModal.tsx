import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Info } from "lucide-react";
import { Product } from "../types";
import { ProductGallery } from "./ProductGallery";
import { WhatsAppButton } from "./WhatsAppButton";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { adminSettings, addToCart } = useAppContext();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAlert, setAddedAlert] = useState(false);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedColor,
      selectedSize,
      quantity
    });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-white dark:bg-[#0c111e] border border-neutral-100 dark:border-neutral-900 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar z-10 p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors duration-200 z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery Component */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Details Column */}
          <div className="flex flex-col h-full space-y-5 pt-2">
            <div>
              {/* Category */}
              <span className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                {product.category}
              </span>
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                {product.name}
              </h2>
              {/* Price */}
              <div className="text-xl font-bold text-neutral-900 dark:text-white mt-2">
                {adminSettings.currencySymbol}
                {product.price}
              </div>
            </div>

            <hr className="border-neutral-100 dark:border-neutral-800/60" />

            {/* Description */}
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Color: <span className="text-neutral-800 dark:text-neutral-200">{selectedColor.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border cursor-pointer transition-all flex items-center justify-center ${
                        selectedColor.hex === color.hex
                          ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600/20"
                          : "border-neutral-200 dark:border-neutral-800 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor.hex === color.hex && (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            color.hex === "#ffffff" || color.hex === "#f5f5f5" || color.hex === "#f3eedd"
                              ? "bg-black"
                              : "bg-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Size: <span className="text-neutral-800 dark:text-neutral-200">{selectedSize}</span>
                </span>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-10 px-3 border rounded-xl font-medium text-xs transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-indigo-600 dark:bg-indigo-500 text-white border-transparent"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-white/20 hover:border-neutral-300 dark:hover:border-neutral-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50">
                  <button
                    onClick={decrementQty}
                    className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-semibold text-sm text-neutral-800 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="p-2.5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                  {product.stock} items left in stock
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-4 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-full font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer active:scale-[0.98] transition-all duration-300"
                >
                  {addedAlert ? "✓ Added to Cart" : "Add to Cart"}
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="w-full py-4 px-4 bg-neutral-900 dark:bg-slate-200 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-slate-100 rounded-full font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-300"
                >
                  <Info className="h-4 w-4" />
                  <span>Full Details</span>
                </Link>
              </div>

              {/* Direct WhatsApp order */}
              <WhatsAppButton
                productName={product.name}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                price={product.price}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default ProductModal;
