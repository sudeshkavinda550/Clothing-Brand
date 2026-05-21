import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const Contact: React.FC = () => {
  const { adminSettings } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Create WhatsApp text query based on form input
    const text = `Hi, I am ${formData.name}. Inquiry: ${formData.subject ? `[${formData.subject}] ` : ""}${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${adminSettings.whatsappNumber}?text=${encodedText}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <div className="pb-20 space-y-16 overflow-x-hidden">
      {/* 1. HEADER TITLE */}
      <section className="relative pt-12 text-center max-w-3xl mx-auto px-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-[#0c111e]/40 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400"
        >
          <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />
          <span>Support Desk</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed"
        >
          Have questions regarding sizing, shipping, or orders? Drop us a line or connect directly via WhatsApp support.
        </motion.p>
      </section>

      {/* 2. CONTACT COLUMNS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-neutral-800 dark:text-white">
              Contact Details
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-450 leading-relaxed">
              We respond to inquiries within 12 hours. Our customer support is ready to guide you on matching measurements.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-[#0c111e]/40 text-indigo-600 dark:text-indigo-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
                  Showroom Address
                </h4>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  AURA Noir HQ, Colombo 07, Sri Lanka
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-[#0c111e]/40 text-indigo-600 dark:text-indigo-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
                  Customer Email
                </h4>
                <a
                  href="mailto:support@auranoir.com"
                  className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 hover:underline"
                >
                  support@auranoir.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-[#0c111e]/40 text-indigo-600 dark:text-indigo-400">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
                  Operating Hours
                </h4>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Mon - Sat: 9:00 AM - 6:00 PM (GMT+5:30)
                </p>
              </div>
            </div>
          </div>

          <hr className="border-neutral-100 dark:border-neutral-900/60" />

          {/* Quick WhatsApp Link CTA */}
          <div className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-slate-50/30 dark:bg-[#0c111e]/20 space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase text-neutral-800 dark:text-white">
              Instant Chat Support
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-450 leading-relaxed">
              Connect instantly with support managers to resolve shipping costs or custom order configurations.
            </p>
            <a
              href={`https://wa.me/${adminSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-md shadow-emerald-600/10"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              <span>Launch WhatsApp Chat</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form Column (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-[#0c111e]/40 shadow-xl shadow-neutral-100/50 dark:shadow-none space-y-6"
          >
            <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-neutral-800 dark:text-white">
              Send Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-slate-50/20 dark:bg-black/10 text-neutral-800 dark:text-white focus:border-indigo-650 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-4 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-slate-50/20 dark:bg-black/10 text-neutral-800 dark:text-white focus:border-indigo-650 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                Subject (Optional)
              </label>
              <input
                type="text"
                placeholder="Order Inquiries"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full h-11 px-4 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-slate-50/20 dark:bg-black/10 text-neutral-800 dark:text-white focus:border-indigo-650 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                Your Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Type your message details here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 text-xs rounded-xl border border-neutral-200 dark:border-neutral-800 bg-slate-50/20 dark:bg-black/10 text-neutral-800 dark:text-white focus:border-indigo-650 focus:outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-4 rounded-full bg-indigo-650 hover:bg-indigo-550 disabled:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-650/15"
            >
              {submitted ? (
                <span>✓ Opened WhatsApp Inquiry</span>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Send via WhatsApp</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
