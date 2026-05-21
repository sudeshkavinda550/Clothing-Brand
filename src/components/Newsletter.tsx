import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white dark:bg-[#0c111e]/80 border border-neutral-800 p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/5 rounded-full blur-3xl -z-10" />

      {/* Text Info */}
      <div className="max-w-md space-y-3 text-center md:text-left">
        <span className="text-[10px] tracking-widest uppercase font-bold text-indigo-400">
          Exclusive Access
        </span>
        <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight">
          Join the AURA Collective
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Subscribe to receive notifications for private capsule collections, restocks, and exclusive editorial campaigns.
        </p>
      </div>

      {/* Input Form */}
      <div className="w-full md:w-auto min-w-[280px] md:min-w-[400px]">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-indigo-950/40 border border-indigo-900/50 p-4 rounded-2xl text-indigo-300"
            >
              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm text-white">Subscription Confirmed</h5>
                <p className="text-xs text-neutral-400 mt-0.5">Welcome to the inner circle.</p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-neutral-800/40 border border-neutral-700/50 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-sm px-6 py-3.5 rounded-full whitespace-nowrap active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Join Now"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Newsletter;
