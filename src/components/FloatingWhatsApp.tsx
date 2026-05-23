import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingWhatsApp: React.FC = () => {
  const { adminSettings } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const url = `https://wa.me/${adminSettings.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Support Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="w-80 rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-lg">
                    {adminSettings.businessName.charAt(0) || "R"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-emerald-600"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{adminSettings.businessName} Concierge</h4>
                  <p className="text-xs text-emerald-100">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-emerald-500/50 p-1.5 rounded-full transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 dark:bg-[#070b13] min-h-[80px] text-xs text-neutral-600 dark:text-neutral-300">
              <div className="bg-white dark:bg-[#1e293b] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-neutral-100 dark:border-neutral-800/40">
                Hello there! Welcome to *{adminSettings.businessName}*. How can we help you with your order today?
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSupportSubmit} className="p-3 bg-white dark:bg-[#0f172a] border-t border-neutral-100 dark:border-neutral-800/60 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-xs py-2 px-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 dark:text-white"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-500 active:scale-95 transition cursor-pointer flex items-center justify-center"
              >
                <img
                  src="https://res.cloudinary.com/dp1jwsapk/image/upload/v1779536203/vecteezy_whatsapp-logo-icon-isolated-on-transparent-background_24398617_1_oyp1ib.png"
                  alt="Send"
                  className="h-4.5 w-4.5 object-contain brightness-0 invert"
                />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-0 rounded-full shadow-lg shadow-emerald-500/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer z-50 bg-transparent border-0"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping group-hover:animate-none scale-110"></span>
        <img
          src="https://res.cloudinary.com/dp1jwsapk/image/upload/v1779536203/vecteezy_whatsapp-logo-icon-isolated-on-transparent-background_24398617_1_oyp1ib.png"
          alt="WhatsApp Chat"
          className="w-14 h-14 object-contain relative z-10"
        />
      </button>
    </div>
  );
};
export default FloatingWhatsApp;
