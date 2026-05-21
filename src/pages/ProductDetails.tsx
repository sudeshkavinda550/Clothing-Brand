import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ProductGallery } from "../components/ProductGallery";
import { ProductCard } from "../components/ProductCard";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { motion } from "framer-motion";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, adminSettings, addToCart } = useAppContext();

  // Find product
  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  // States
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addedAlert, setAddedAlert] = useState(false);

  // Initialize variation states when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      
      // Simulate fetching load
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Similar Products
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (!product && !loading) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-6 space-y-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Product Not Found</h2>
        <p className="text-xs text-neutral-400">
          The requested product ID does not exist or has been deleted from the catalog.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  if (loading || !product || !selectedColor) {
    return <LoadingSkeleton variant="details" />;
  }

  const isOutOfStock = product.stock <= 0;

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
    <div className="space-y-16 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 bg-white/40 dark:bg-black/20 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer shadow-sm hover:shadow active:scale-95 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          <span>Back to Catalog</span>
        </button>
      </motion.div>

      {/* Main product card view split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Column Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <ProductGallery images={product.images} />
        </motion.div>

        {/* Right Column details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.1 }}
          className="flex flex-col space-y-6 md:space-y-7"
        >
          <div>
            <span className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mt-1.5 leading-tight">
              {product.name}
            </h1>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mt-3">
              {adminSettings.currencySymbol}
              {product.price}
            </div>
          </div>

          <hr className="border-neutral-100 dark:border-neutral-850" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
              Overview
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Select Color: <span className="text-neutral-800 dark:text-white font-semibold">{selectedColor.name}</span>
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-9 h-9 rounded-full border cursor-pointer transition-all flex items-center justify-center ${
                      selectedColor.hex === color.hex
                        ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600/20"
                        : "border-neutral-200 dark:border-neutral-800 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.hex === color.hex && (
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
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

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Select Size: <span className="text-neutral-800 dark:text-white font-semibold">{selectedSize}</span>
              </span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-4 border rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-indigo-600 dark:bg-indigo-500 text-white border-transparent shadow-lg shadow-indigo-600/10"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-white/20 hover:border-neutral-350 dark:hover:border-neutral-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Quantity Selection
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50">
                <button
                  onClick={decrementQty}
                  disabled={isOutOfStock}
                  className="p-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 disabled:opacity-50 transition cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-neutral-800 dark:text-white">
                  {isOutOfStock ? 0 : quantity}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={isOutOfStock || quantity >= product.stock}
                  className="p-3 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 disabled:opacity-50 transition cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <span className="text-xs text-neutral-450 dark:text-neutral-500 font-medium">
                {isOutOfStock ? "Out of Stock" : `${product.stock} pieces remaining`}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 py-4 px-6 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-350 dark:hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold text-neutral-850 dark:text-neutral-200 bg-white/10 hover:bg-neutral-55 cursor-pointer transition active:scale-[0.98]"
            >
              {addedAlert ? "✓ Added to Bag" : "Add to Bag"}
            </button>
            <div className="flex-1">
              <WhatsAppButton
                productName={product.name}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                price={product.price}
              />
            </div>
          </div>

          {/* Trust points list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-850 text-neutral-500 dark:text-neutral-450">
            <div className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 text-indigo-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Fast Courier Delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="h-4 w-4 text-indigo-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Easy Exchange Service</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span className="text-[10px] uppercase font-bold tracking-wider">100% Quality Fabric</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Similar products section */}
      {similarProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 13 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8 border-t border-neutral-200/40 dark:border-neutral-900/60"
        >
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-600 dark:text-indigo-400">
              Style Matching
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Similar Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 70, damping: 15, delay: idx * 0.08 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};
export default ProductDetails;
