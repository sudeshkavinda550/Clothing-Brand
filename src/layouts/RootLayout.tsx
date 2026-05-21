import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";

export const RootLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 dark:bg-[#030712] dark:text-neutral-50 transition-colors duration-300">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Pages */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Floating Support Widget */}
      <FloatingWhatsApp />

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};
export default RootLayout;
