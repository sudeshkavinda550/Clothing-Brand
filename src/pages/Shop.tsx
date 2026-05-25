import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, RefreshCw, X, ArrowUpDown } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export const Shop: React.FC = () => {
  const { products, categories, adminSettings } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- PRICE RANGE LIMITS COMPUTATION ---
  const maxPriceLimit = useMemo(() => {
    if (products.length === 0) return 10000;
    const maxVal = Math.max(...products.map((p) => p.price));
    return Math.ceil(maxVal / 100) * 100;
  }, [products]);

  const minPriceLimit = useMemo(() => {
    if (products.length === 0) return 0;
    const minVal = Math.min(...products.map((p) => p.price));
    return Math.floor(minVal / 100) * 100;
  }, [products]);

  // --- FILTERS STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [hasInitializedPrice, setHasInitializedPrice] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync category state from URL query search parameters
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setSelectedCategory(catParam.toLowerCase());
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Sync initial maxPrice with maxPriceLimit once products are loaded
  useEffect(() => {
    if (products.length > 0 && !hasInitializedPrice) {
      setMaxPrice(maxPriceLimit);
      setHasInitializedPrice(true);
    }
  }, [products, maxPriceLimit, hasInitializedPrice]);

  // Handle URL change when category changes manually
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  // Simulate loading spinner when filters mutate
  const triggerFilterLoading = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    triggerFilterLoading();
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  // --- FILTERED PRODUCTS COMPUTATION ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory);
    }

    // 3. Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 4. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    handleCategorySelect("all");
    setMaxPrice(maxPriceLimit);
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP HEADER SUMMARY */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-black tracking-tight uppercase text-neutral-900 dark:text-white">
          Showroom Catalog
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Showing {filteredProducts.length} high-fidelity products
        </p>
      </div>

      {/* 2. FILTER & TOOL BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-neutral-200/40 dark:border-neutral-900/60">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search crochet crop tops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0c111e]/30 border border-neutral-200 dark:border-neutral-900 rounded-full text-xs placeholder-neutral-450 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:text-white transition-all"
          />
        </div>

        {/* Toolbar Controls */}
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 flex-shrink-0">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-black/10 cursor-pointer active:scale-95 transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Sorting Dropdown */}
          <div className="relative flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c111e]/35 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 focus:outline-none cursor-pointer focus:border-indigo-600"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. MAIN BODY CONTAINER (SIDEBAR + GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* --- DESKTOP FILTER SIDEBAR --- */}
        <aside className="hidden lg:flex flex-col gap-8 sticky top-28 bg-white dark:bg-[#0b0e17]/30 border border-neutral-100 dark:border-neutral-900/60 rounded-3xl p-6">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100 dark:border-neutral-900/50">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Filter Options
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[10px] uppercase font-bold text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
              Category
            </h4>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleCategorySelect("all")}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                All Apparel
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
              <span>Max Price</span>
              <span className="text-neutral-800 dark:text-white font-mono">
                {adminSettings.currencySymbol}
                {maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={minPriceLimit}
              max={maxPriceLimit}
              step={maxPriceLimit > 1000 ? 50 : 5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
              <span>{adminSettings.currencySymbol}{minPriceLimit}</span>
              <span>{adminSettings.currencySymbol}{maxPriceLimit}</span>
            </div>
          </div>
        </aside>

        {/* --- PRODUCTS GRID DISPLAY --- */}
        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSkeleton variant="product-grid" />
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white dark:bg-[#0c111e]/15 border border-neutral-100 dark:border-neutral-900 rounded-3xl p-8">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-base text-neutral-700 dark:text-white">No products match your filters</h4>
                <p className="text-xs text-neutral-450 dark:text-neutral-500 max-w-sm">
                  Try adjusting your search terms, changing the category, or expanding the price range slider.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 35, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 70, damping: 15, delay: (idx % 3) * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- MOBILE FILTERS DRAWER PANEL --- */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-4/5 max-w-[320px] bg-white dark:bg-[#0c111e] border-l border-neutral-200 dark:border-neutral-900 shadow-2xl flex flex-col h-full p-6 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-5 border-b border-neutral-100 dark:border-neutral-900">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar Content inside Mobile Panel */}
              <div className="flex-1 overflow-y-auto py-6 space-y-8 no-scrollbar">
                {/* Categories */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                    Category
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => {
                        handleCategorySelect("all");
                        setMobileFiltersOpen(false);
                      }}
                      className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                        selectedCategory === "all"
                          ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900"
                      }`}
                    >
                      All Apparel
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          handleCategorySelect(cat.slug);
                          setMobileFiltersOpen(false);
                        }}
                        className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          selectedCategory === cat.slug
                            ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                    <span>Max Price</span>
                    <span className="text-neutral-800 dark:text-white font-mono">
                      {adminSettings.currencySymbol}
                      {maxPrice}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={minPriceLimit}
                    max={maxPriceLimit}
                    step={maxPriceLimit > 1000 ? 50 : 5}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                    <span>{adminSettings.currencySymbol}{minPriceLimit}</span>
                    <span>{adminSettings.currencySymbol}{maxPriceLimit}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 border-t border-neutral-100 dark:border-neutral-900 flex gap-3">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 py-3 px-4 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 cursor-pointer text-center"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-semibold text-center cursor-pointer active:scale-95"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Shop;
