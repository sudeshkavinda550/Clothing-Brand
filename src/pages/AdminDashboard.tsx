import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Search, ArrowUpRight, BarChart3, Package, Layers, ShoppingBag } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export const AdminDashboard: React.FC = () => {
  const { products, categories, orders, deleteProduct, adminSettings } = useAppContext();

  // --- FILTERS STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // --- CALCULATE ANALYTICS METRICS ---
  const totalCatalogValue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.stock, 0);
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => p.stock <= 0).length;
  }, [products]);

  const totalOrdersAmount = useMemo(() => {
    return orders.reduce((acc, o) => acc + o.totalPrice, 0);
  }, [orders]);

  // --- FILTERED PRODUCTS FOR LISTING ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory);
    }

    return result;
  }, [products, searchQuery, selectedCategory]);

  const handleDelete = (id: string, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}" from the product database?`);
    if (confirmDelete) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl uppercase tracking-wider text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-neutral-450 dark:text-neutral-500">
            Real-time analytics and inventory control metrics
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-indigo-650 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow-md shadow-indigo-600/10"
        >
          Add New Product
        </Link>
      </div>

      {/* --- ANALYTICS CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Products Card */}
        <div className="bg-[#0c111e]/70 border border-neutral-900 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-600/10 text-indigo-400">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Total Products</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{products.length}</h3>
          </div>
        </div>

        {/* Stock Value Card */}
        <div className="bg-[#0c111e]/70 border border-neutral-900 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-600/10 text-emerald-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Inventory Value</span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {adminSettings.currencySymbol}
              {totalCatalogValue.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-[#0c111e]/70 border border-neutral-900 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-600/10 text-rose-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Out of Stock</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{outOfStockCount}</h3>
          </div>
        </div>

        {/* Total Orders Value Card */}
        <div className="bg-[#0c111e]/70 border border-neutral-900 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-600/10 text-amber-400">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Mock Sales Log</span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {adminSettings.currencySymbol}
              {totalOrdersAmount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS MANAGEMENT TABLE PANEL --- */}
      <div className="bg-[#0a0f1d] border border-neutral-900 rounded-3xl overflow-hidden flex flex-col">
        {/* Table Filter Top Bar */}
        <div className="p-5 border-b border-neutral-900 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-white">
            Manage Catalog
          </h3>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#070b13]/60 border border-neutral-900 rounded-xl text-xs placeholder-neutral-500 focus:outline-none focus:border-indigo-600 text-white"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2.5 px-4 border border-neutral-900 bg-[#070b13]/60 rounded-xl text-xs font-semibold text-neutral-400 focus:outline-none cursor-pointer focus:border-indigo-650"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-900 bg-[#0d1223]/30 text-neutral-400 uppercase font-bold tracking-wider text-[10px]">
                <th className="p-4 w-16">Preview</th>
                <th className="p-4">Item Details</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-neutral-500">
                    No products found in database registry matching your query.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLowStock = p.stock > 0 && p.stock <= 5;
                  const isOut = p.stock <= 0;

                  return (
                    <tr
                      key={p.id}
                      className="border-b border-neutral-900/60 hover:bg-[#12192c]/20 transition"
                    >
                      {/* Image Preview */}
                      <td className="p-4">
                        <div className="w-10 h-12 rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800 flex-shrink-0">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="p-4 font-semibold text-neutral-250">
                        <div className="line-clamp-1">{p.name}</div>
                        <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                          ID: {p.id}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 text-neutral-400 capitalize font-medium">{p.category}</td>

                      {/* Price */}
                      <td className="p-4 text-right font-bold text-white font-mono">
                        {adminSettings.currencySymbol}
                        {p.price}
                      </td>

                      {/* Stock badge */}
                      <td className="p-4 text-center">
                        {isOut ? (
                          <span className="inline-block px-2.5 py-1 bg-rose-950/45 text-rose-450 border border-rose-900/30 rounded-full font-bold text-[9px] uppercase tracking-wider">
                            Sold Out
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-block px-2.5 py-1 bg-amber-950/45 text-amber-450 border border-amber-900/30 rounded-full font-bold text-[9px] uppercase tracking-wider">
                            Low ({p.stock})
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 bg-emerald-950/45 text-emerald-450 border border-emerald-900/30 rounded-full font-bold text-[9px] uppercase tracking-wider">
                            In Stock ({p.stock})
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          {/* Preview Link */}
                          <Link
                            to={`/product/${p.id}`}
                            className="p-2 text-neutral-400 hover:text-white bg-[#070b13]/60 hover:bg-[#12192c]/50 rounded-xl transition border border-neutral-900"
                            title="Preview item"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                          {/* Edit Link */}
                          <Link
                            to={`/admin/products/edit/${p.id}`}
                            className="p-2 text-neutral-400 hover:text-indigo-400 bg-[#070b13]/60 hover:bg-[#12192c]/50 rounded-xl transition border border-neutral-900"
                            title="Edit catalog details"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Link>
                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-2 text-neutral-400 hover:text-rose-450 bg-[#070b13]/60 hover:bg-rose-950/10 rounded-xl transition border border-neutral-900 cursor-pointer"
                            title="Delete item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
