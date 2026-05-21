import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Trash2, Shield, Plus, Minus } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ThemeToggle } from "./ThemeToggle";
import { generateCartOrderUrl } from "../utils/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, submitOrder, adminSettings, adminLoggedIn } = useAppContext();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Generate URL
    const url = generateCartOrderUrl(
      adminSettings.whatsappNumber,
      cart,
      adminSettings.currencySymbol
    );
    
    // Open WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
    
    // Submit order internally to log database orders & deduct stock
    submitOrder();
    setCartOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/40 dark:border-neutral-900/60 bg-white/70 dark:bg-[#030712]/75 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="font-heading font-extrabold text-lg sm:text-xl tracking-widest text-neutral-900 dark:text-white uppercase transition-colors">
              {adminSettings.businessName}
              <span className="text-indigo-600 dark:text-indigo-500 group-hover:scale-125 inline-block transition-transform duration-300">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Toolbar Items */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Admin Dashboard Indicator Link */}
            <Link
              to={adminLoggedIn ? "/admin/dashboard" : "/login"}
              className={`p-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                adminLoggedIn ? "text-indigo-500" : "text-neutral-500 dark:text-neutral-400"
              }`}
              title={adminLoggedIn ? "Admin Dashboard" : "Admin Login"}
            >
              <Shield className="h-5 w-5" />
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-black/10 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer group"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 text-neutral-700 dark:text-neutral-300 group-hover:scale-105 transition-transform" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-[9px] border-2 border-white dark:border-[#030712]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- CART DRAWER OVERLAY --- */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Drawer Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white dark:bg-[#0c111e] border-l border-neutral-100 dark:border-neutral-900 shadow-2xl flex flex-col h-full"
              >
                {/* Header */}
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-neutral-800 dark:text-white" />
                    <h2 className="font-heading font-bold text-base text-neutral-850 dark:text-white">
                      Your Shopping Bag ({totalCartItems})
                    </h2>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-1.5 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-4/5 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-neutral-700 dark:text-white">Your bag is empty</h4>
                        <p className="text-xs text-neutral-400 dark:text-neutral-550 mt-1 max-w-[200px] mx-auto">
                          Browse our modern luxury collections to add apparel.
                        </p>
                      </div>
                      <Link
                        to="/shop"
                        onClick={() => setCartOpen(false)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-b border-indigo-600 hover:border-indigo-400 pb-0.5"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                        className="flex gap-4 p-3 rounded-2xl border border-neutral-50 dark:border-neutral-900/50 bg-slate-50/20 dark:bg-black/10 hover:border-neutral-150 dark:hover:border-neutral-800/80 transition"
                      >
                        {/* Thumb */}
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] uppercase font-bold text-neutral-400 dark:text-neutral-500">
                                Size {item.selectedSize}
                              </span>
                              <span className="text-neutral-350 dark:text-neutral-700">|</span>
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-neutral-300 dark:border-neutral-700"
                                style={{ backgroundColor: item.selectedColor.hex }}
                                title={item.selectedColor.name}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2.5">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor.hex,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-slate-50 dark:hover:bg-neutral-800 text-neutral-500 transition cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold text-neutral-800 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product.id,
                                    item.selectedSize,
                                    item.selectedColor.hex,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-slate-50 dark:hover:bg-neutral-800 text-neutral-500 transition cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-xs font-bold text-neutral-850 dark:text-white">
                              {adminSettings.currencySymbol}
                              {item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                          className="text-neutral-400 hover:text-rose-500 self-start p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Checkouts */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-neutral-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-black/10 space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-neutral-500 dark:text-neutral-400">Estimated Total:</span>
                      <span className="text-base text-neutral-900 dark:text-white font-bold">
                        {adminSettings.currencySymbol}
                        {cartSubtotal}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 cursor-pointer active:scale-98 transition-all"
                    >
                      <ShoppingBag className="h-4.5 w-4.5 text-emerald-600 fill-white" />
                      <span>Checkout on WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-500">
                      Your items will be converted to a WhatsApp inquiry message automatically.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MOBILE NAVIGATION PANEL --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-[280px] bg-white dark:bg-[#0c111e] border-r border-neutral-100 dark:border-neutral-900 shadow-2xl flex flex-col h-full z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                <span className="font-heading font-extrabold tracking-widest text-neutral-900 dark:text-white uppercase text-sm">
                  {adminSettings.businessName}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full border border-neutral-150 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-55 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 py-6 px-4 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-neutral-100 dark:border-neutral-900 text-[10px] text-neutral-400 dark:text-neutral-500">
                Authorized Admin Section:{" "}
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-indigo-500 font-bold hover:underline ml-1">
                  Login
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
