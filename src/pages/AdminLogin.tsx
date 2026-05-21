import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export const AdminLogin: React.FC = () => {
  const { adminLoggedIn, loginAdmin, adminSettings } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminLoggedIn) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [adminLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const success = await loginAdmin(email, password);
    setLoading(false);

    if (success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-neutral-50 dark:bg-[#030712] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#0c111e]/90 border border-neutral-200 dark:border-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-650/10 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h2 className="font-heading font-extrabold text-xl tracking-tight text-neutral-805 dark:text-white uppercase text-center">
          {adminSettings.businessName} Staff Access
        </h2>
        <p className="text-[10px] text-neutral-450 dark:text-neutral-500 font-bold uppercase tracking-widest mt-1 text-center">
          Administrative Authorization Portal
        </p>

        {error && (
          <div className="w-full mt-6 p-3 rounded-2xl border border-rose-900/50 bg-rose-950/20 text-rose-400 text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-550">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl text-xs text-neutral-800 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 disabled:opacity-50 transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-550">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-11 pr-11 py-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl text-xs text-neutral-800 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 disabled:opacity-50 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-350 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-indigo-600/10 active:scale-98 disabled:opacity-50 transition cursor-pointer flex items-center justify-center"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default AdminLogin;
