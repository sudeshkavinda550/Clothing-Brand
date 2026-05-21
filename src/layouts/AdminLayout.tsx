import React, { useState } from "react";
import { Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Tags, Settings, LogOut, Eye, Menu, X, ShieldCheck } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export const AdminLayout: React.FC = () => {
  const { adminLoggedIn, logoutAdmin, adminSettings } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Route Guard: Redirect to Login if not logged in
  if (!adminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  const menuItems = [
    { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Add Product", path: "/admin/products/new", icon: PlusCircle },
    { label: "Categories", path: "/admin/categories", icon: Tags },
    { label: "System Settings", path: "/admin/settings", icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-[#070b13] text-neutral-100 overflow-hidden font-sans">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-neutral-900 bg-[#0a0f1d] p-5 h-full">
        {/* Title */}
        <div className="flex items-center gap-2.5 pb-6 border-b border-neutral-900">
          <ShieldCheck className="h-6 w-6 text-indigo-500" />
          <div>
            <h2 className="font-heading font-extrabold text-sm uppercase tracking-wider">
              {adminSettings.businessName} Admin
            </h2>
            <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">
              Control Panel
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 mt-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/10"
                    : "text-neutral-400 hover:text-neutral-100 hover:bg-[#12192c]/50"
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="mt-auto space-y-2 border-t border-neutral-900 pt-5">
          <Link
            to="/"
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-neutral-100 hover:bg-[#12192c]/50 transition-all"
          >
            <Eye className="h-4.5 w-4.5" />
            <span>View Shop</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-rose-400 hover:text-rose-350 hover:bg-rose-950/20 transition-all cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden h-16 bg-[#0a0f1d] border-b border-neutral-900 px-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-2 text-neutral-400 hover:text-neutral-200 rounded-full transition cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-heading font-extrabold text-xs uppercase tracking-wider text-neutral-200">
              {adminSettings.businessName} Admin
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-rose-400 hover:text-rose-350 transition"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* --- MAIN PAGE OUTLET BODY --- */}
        <main className="flex-1 overflow-y-auto bg-[#070b13] p-4 sm:p-6 lg:p-8 no-scrollbar relative">
          <Outlet />
        </main>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-[280px] bg-[#0a0f1d] border-r border-neutral-900 shadow-2xl flex flex-col h-full p-5 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-5 border-b border-neutral-900">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-indigo-500" />
                  <span className="font-heading font-extrabold tracking-wider uppercase text-xs text-neutral-100">
                    {adminSettings.businessName} Control
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full border border-neutral-850 text-neutral-400 hover:bg-[#12192c] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 mt-6 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-neutral-100 hover:bg-[#12192c]/50 transition-all"
                  >
                    <item.icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto space-y-2 border-t border-neutral-900 pt-5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-neutral-100 hover:bg-[#12192c]/50 transition"
                >
                  <Eye className="h-4.5 w-4.5" />
                  <span>View Shop</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-rose-400 hover:bg-rose-950/20 transition cursor-pointer"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AdminLayout;
