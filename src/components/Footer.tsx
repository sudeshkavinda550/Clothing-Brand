import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Send, MapPin, Phone, Mail } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { adminSettings, categories } = useAppContext();
  
  return (
    <footer className="bg-neutral-100 dark:bg-[#070a13] border-t border-neutral-200 dark:border-neutral-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Description */}
        <div className="space-y-4">
          <h2 className="font-heading font-extrabold text-xl tracking-tight text-neutral-800 dark:text-white">
            {adminSettings.businessName.toUpperCase()}<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
            High-fidelity streetwear brand tailored to modern aesthetics. Handcrafted luxury items built with sustainably sourced heavy-weight fabrics.
          </p>
          <div className="flex gap-3.5 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-neutral-250 dark:border-neutral-800 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-neutral-900 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-neutral-250 dark:border-neutral-800 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-neutral-900 transition-colors"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Collections Links */}
        <div>
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-white mb-4">
            Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-500 dark:text-neutral-400">
            {categories.length > 0 ? (
              categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link to={`/shop?category=${c.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    {c.name}
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <Link to="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Shop All
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-white mb-4">
            Contact Us
          </h4>
          <div className="flex items-start gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <MapPin className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
            <span>rajanganaya, thambuththegama, anuradhapura</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <Phone className="h-4 w-4 text-indigo-500 flex-shrink-0" />
            <span>+{adminSettings.whatsappNumber}</span>
          </div>
         
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200 dark:border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 dark:text-neutral-500">
        <div>
          © {new Date().getFullYear()} {adminSettings.businessName}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-neutral-600 dark:hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-neutral-600 dark:hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
