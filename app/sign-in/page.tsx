"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Code2 as Github, AlertCircle, CheckCircle } from 'lucide-react';
import { APP_NAME } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const DEMO_EMAIL = "demo@pulseanalytics.io";
const DEMO_PASSWORD = "password";

export default function SignInPage() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      setError("Invalid email or password. Try demo@pulseanalytics.io / password");
    }
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
  };

  const features = [
    "Real-time revenue & MRR tracking",
    "User cohort analysis & churn prediction",
    "Automated anomaly detection alerts",
    "Exportable reports in CSV & PDF",
  ];

  return (
    <main className="min-h-screen bg-[#0f0d2e] flex">
      {/* Left Panel — Branding */}
      <motion.div
        variants={shouldReduceMotion ? {} : slideInLeftVariant}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden"
      >
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-[#1e1b4b] to-violet-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.25)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.2)_0%,transparent_60%)]" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-24 right-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 left-8 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">{APP_NAME}</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp}>
              <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Your metrics,{" "}
                <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  crystal clear.
                </span>
              </h2>
              <p className="mt-4 text-indigo-300 text-lg leading-relaxed max-w-md">
                Join thousands of SaaS teams who trust Pulse Analytics to surface the insights that drive growth.
              </p>
            </motion.div>

            <motion.ul
              variants={shouldReduceMotion ? {} : staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  className="flex items-center gap-3 text-indigo-200 text-sm"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-indigo-300" />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 max-w-md"
          >
            <p className="text-indigo-100 text-sm leading-relaxed italic">
              "Pulse Analytics cut our reporting time by 80%. We spotted a churn spike before it became a crisis — that alone paid for the subscription 10×."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                SK
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Sarah Kim</p>
                <p className="text-indigo-400 text-xs">Head of Growth, Launchpad SaaS</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-indigo-500 text-xs">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </motion.div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#0f0d2e]">
        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles style={{ width: 18, height: 18 }} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">{APP_NAME}</span>
          </div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Heading */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp}>
              <h1 className="text-3xl font-bold text-white">Welcome back</h1>
              <p className="mt-2 text-indigo-300 text-sm">
                Sign in to your {APP_NAME} account to continue.
              </p>
            </motion.div>

            {/* Demo hint */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp}>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 hover:border-indigo-400/50 transition-all group"
              >
                <span className="text-indigo-300 text-sm">
                  <span className="text-indigo-200 font-medium">Try the demo</span> — click to auto-fill credentials
                </span>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={shouldReduceMotion ? {} : fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-indigo-200">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-indigo-950/60 border border-indigo-700/50 text-white placeholder-indigo-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-indigo-200">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-indigo-950/60 border border-indigo-700/50 text-white placeholder-indigo-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe((v) => !v)}
                  className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-all ${
                    rememberMe
                      ? "bg-indigo-500 border-indigo-500"
                      : "bg-transparent border-indigo-600 hover:border-indigo-400"
                  }`}
                  style={{ width: 18, height: 18, borderRadius: 4 }}
                >
                  {rememberMe && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <span className="text-sm text-indigo-300 select-none cursor-pointer" onClick={() => setRememberMe((v) => !v)}>
                  Remember me for 30 days
                </span>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <p className="text-emerald-300 text-sm">Success! Redirecting to your dashboard…</p>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading || success}
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Signed in!
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-800/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#0f0d2e] text-indigo-500">or continue with</span>
              </div>
            </motion.div>

            {/* OAuth */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp}>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-indigo-950/60 border border-indigo-700/50 hover:bg-indigo-900/40 hover:border-indigo-600/60 text-indigo-200 text-sm font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                Continue with GitHub
              </motion.button>
            </motion.div>

            {/* Sign up link */}
            <motion.p
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="text-center text-sm text-indigo-400"
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-indigo-300 hover:text-white font-medium transition-colors underline underline-offset-2"
              >
                Start your free trial
              </Link>
            </motion.p>

            {/* Trust badges */}
            <motion.div
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="flex items-center justify-center gap-6 pt-2"
            >
              {["SOC 2 Type II", "GDPR Ready", "256-bit SSL"].map((badge) => (
                <span key={badge} className="text-xs text-indigo-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-indigo-600" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

const slideInLeftVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};