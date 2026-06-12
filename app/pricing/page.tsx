"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight, Star, Zap, Shield, Users } from 'lucide-react';
import { APP_NAME } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for early-stage startups and solo founders tracking core metrics.",
    monthlyPrice: 29,
    annualPrice: 19,
    badge: null,
    color: "from-indigo-500/20 to-violet-500/10",
    borderColor: "border-indigo-700/40",
    buttonStyle: "bg-indigo-700/50 hover:bg-indigo-600/60 text-white border border-indigo-500/40",
    features: [
      { label: "Up to 3 team members", included: true },
      { label: "5 connected data sources", included: true },
      { label: "30-day data retention", included: true },
      { label: "Core KPI dashboard", included: true },
      { label: "Weekly email reports", included: true },
      { label: "Advanced analytics", included: false },
      { label: "Custom chart builder", included: false },
      { label: "API access", included: false },
      { label: "Priority support", included: false },
      { label: "SSO & SAML", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams that need deeper insights and real-time collaboration.",
    monthlyPrice: 79,
    annualPrice: 59,
    badge: "Most Popular",
    color: "from-violet-600/30 to-indigo-600/20",
    borderColor: "border-violet-500/60",
    buttonStyle: "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30",
    features: [
      { label: "Up to 15 team members", included: true },
      { label: "Unlimited data sources", included: true },
      { label: "1-year data retention", included: true },
      { label: "Core KPI dashboard", included: true },
      { label: "Daily & weekly reports", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Custom chart builder", included: true },
      { label: "API access", included: true },
      { label: "Priority support", included: false },
      { label: "SSO & SAML", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For scaling companies that demand security, compliance, and white-glove support.",
    monthlyPrice: 199,
    annualPrice: 149,
    badge: null,
    color: "from-indigo-800/40 to-violet-900/20",
    borderColor: "border-indigo-600/40",
    buttonStyle: "bg-indigo-700/50 hover:bg-indigo-600/60 text-white border border-indigo-500/40",
    features: [
      { label: "Unlimited team members", included: true },
      { label: "Unlimited data sources", included: true },
      { label: "Unlimited data retention", included: true },
      { label: "Core KPI dashboard", included: true },
      { label: "Custom report scheduling", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Custom chart builder", included: true },
      { label: "API access", included: true },
      { label: "Priority support", included: true },
      { label: "SSO & SAML", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes — you can upgrade or downgrade your plan at any time. Upgrades take effect immediately and you'll be charged a prorated amount. Downgrades take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Absolutely. Every plan comes with a 14-day free trial — no credit card required. You'll have full access to all features on your chosen plan during the trial period.",
  },
  {
    question: "How does annual billing work?",
    answer: "When you choose annual billing, you're charged once per year at the discounted rate. You save up to 25% compared to monthly billing. You can cancel at any time and receive a prorated refund for unused months.",
  },
  {
    question: "What data sources can I connect?",
    answer: "Pulse Analytics integrates with Stripe, Salesforce, HubSpot, Segment, Mixpanel, Google Analytics, PostgreSQL, MySQL, and 40+ other platforms via our native connectors and REST API.",
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified and GDPR compliant. Enterprise plans include dedicated infrastructure and custom DPA agreements.",
  },
  {
    question: "Do you offer discounts for startups or nonprofits?",
    answer: "Yes — we offer a 50% discount for qualifying early-stage startups (under $1M ARR) and registered nonprofits. Contact our team at hello@pulseanalytics.io to apply.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth, Luma AI",
    avatar: "SC",
    quote: "Pulse Analytics cut our reporting time by 80%. We went from weekly spreadsheet hell to real-time clarity on every metric that drives our business.",
    stars: 5,
    plan: "Pro",
  },
  {
    name: "Marcus Webb",
    role: "CTO, Stackline",
    avatar: "MW",
    quote: "The custom chart builder is genuinely impressive. We built a churn prediction dashboard in an afternoon that would have taken our data team weeks.",
    stars: 5,
    plan: "Enterprise",
  },
  {
    name: "Priya Nair",
    role: "Founder, Orbit SaaS",
    avatar: "PN",
    quote: "Started on Starter, upgraded to Pro within a month. The analytics depth is unmatched at this price point. Our investors love the automated reports.",
    stars: 5,
    plan: "Pro",
  },
];

const comparisonFeatures = [
  { category: "Core", label: "Team members", starter: "3", pro: "15", enterprise: "Unlimited" },
  { category: "Core", label: "Data sources", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
  { category: "Core", label: "Data retention", starter: "30 days", pro: "1 year", enterprise: "Unlimited" },
  { category: "Analytics", label: "KPI dashboard", starter: true, pro: true, enterprise: true },
  { category: "Analytics", label: "Advanced analytics", starter: false, pro: true, enterprise: true },
  { category: "Analytics", label: "Custom chart builder", starter: false, pro: true, enterprise: true },
  { category: "Analytics", label: "Funnel analysis", starter: false, pro: true, enterprise: true },
  { category: "Reporting", label: "Email reports", starter: "Weekly", pro: "Daily / Weekly", enterprise: "Custom schedule" },
  { category: "Reporting", label: "Slack notifications", starter: false, pro: true, enterprise: true },
  { category: "Developer", label: "REST API access", starter: false, pro: true, enterprise: true },
  { category: "Developer", label: "Webhooks", starter: false, pro: true, enterprise: true },
  { category: "Security", label: "SSO & SAML", starter: false, pro: false, enterprise: true },
  { category: "Security", label: "Audit logs", starter: false, pro: false, enterprise: true },
  { category: "Support", label: "Support tier", starter: "Community", pro: "Email", enterprise: "Priority + SLA" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-indigo-800/40 rounded-xl overflow-hidden bg-indigo-950/30"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm sm:text-base pr-4">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-700/50 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-600/60 transition-colors"
        >
          <span className="text-lg leading-none">+</span>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-indigo-300 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

function ComparisonCell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-violet-400 mx-auto" />
    ) : (
      <X className="w-4 h-4 text-indigo-700 mx-auto" />
    );
  }
  return <span className="text-indigo-200 text-sm">{value}</span>;
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0f0d2e] text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simple, transparent pricing
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            Pricing that scales{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              with your growth
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-indigo-300 max-w-2xl mx-auto mb-10"
          >
            Start free for 14 days. No credit card required. Upgrade when you're ready — cancel anytime.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-indigo-950/60 border border-indigo-800/40 rounded-full p-1.5"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "text-indigo-400 hover:text-indigo-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "text-indigo-400 hover:text-indigo-200"
              }`}
            >
              Annual
              <span className="text-xs bg-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full font-semibold">
                Save 25%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.badge === "Most Popular";

            return (
              <motion.div
                key={plan.id}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
                className={`relative rounded-2xl border ${plan.borderColor} bg-gradient-to-b ${plan.color} backdrop-blur-sm p-8 flex flex-col ${
                  isPopular ? "ring-2 ring-violet-500/50 shadow-xl shadow-violet-500/10" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
                      <Star className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
                  <p className="text-sm text-indigo-300 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-indigo-400 text-sm mb-1.5">/mo</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-indigo-400 mt-1">
                      Billed annually · ${(price * 12).toLocaleString()}/yr
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-3">
                      {feature.included ? (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-violet-400" />
                        </span>
                      ) : (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-900/40 flex items-center justify-center">
                          <X className="w-3 h-3 text-indigo-700" />
                        </span>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-indigo-100" : "text-indigo-600"
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
                  <Link
                    href="/dashboard"
                    className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.buttonStyle}`}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { icon: Shield, title: "SOC 2 Type II", desc: "Enterprise-grade security and compliance built in from day one." },
            { icon: Zap, title: "99.9% Uptime SLA", desc: "Reliable infrastructure with real-time status monitoring and alerts." },
            { icon: Users, title: "500+ Teams Trust Us", desc: "From seed-stage startups to Series C companies across 40 countries." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/30"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-700/30 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-sm text-indigo-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by analytics-driven teams
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto">
              See why hundreds of SaaS teams switched to {APP_NAME} for their analytics.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-indigo-950/50 border border-indigo-800/40 flex flex-col gap-4"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-indigo-200 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-indigo-800/30">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-indigo-400 text-xs">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-800/50 text-indigo-300 border border-indigo-700/40">
                    {t.plan}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Comparison Table ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Compare all features
            </h2>
            <p className="text-indigo-300">
              A full breakdown of what's included in each plan.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-indigo-800/40 overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-4 bg-indigo-950/70 border-b border-indigo-800/40">
              <div className="p-4 text-sm font-semibold text-indigo-400">Feature</div>
              {["Starter", "Pro", "Enterprise"].map((name) => (
                <div key={name} className="p-4 text-center">
                  <span className={`text-sm font-bold ${name === "Pro" ? "text-violet-300" : "text-white"}`}>
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Table rows grouped by category */}
            {(() => {
              const categories = Array.from(new Set(comparisonFeatures.map((f) => f.category)));
              return categories.map((cat) => {
                const rows = comparisonFeatures.filter((f) => f.category === cat);
                return (
                  <div key={cat}>
                    <div className="grid grid-cols-4 bg-indigo-900/20 border-b border-indigo-800/20">
                      <div className="col-span-4 px-4 py-2 text-xs font-bold text-indigo-500 uppercase tracking-widest">
                        {cat}
                      </div>
                    </div>
                    {rows.map((row, i) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-4 border-b border-indigo-800/20 hover:bg-indigo-900/20 transition-colors ${
                          i === rows.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <div className="p-4 text-sm text-indigo-300">{row.label}</div>
                        <div className="p-4 text-center flex items-center justify-center">
                          <ComparisonCell value={row.starter} />
                        </div>
                        <div className="p-4 text-center flex items-center justify-center bg-violet-900/10">
                          <ComparisonCell value={row.pro} />
                        </div>
                        <div className="p-4 text-center flex items-center justify-center">
                          <ComparisonCell value={row.enterprise} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              });
            })()}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-indigo-300">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          variants={shouldReduceMotion ? {} : scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/40 to-violet-700/30 border border-indigo-500/30 p-12 text-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              14-day free trial · No credit card required
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to unlock your data's potential?
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto mb-8">
              Join 500+ SaaS teams using {APP_NAME} to make faster, smarter decisions. Set up in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.04 }} whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-900/50 hover:bg-indigo-800/60 border border-indigo-700/50 text-indigo-200 font-semibold text-sm transition-all duration-200"
                >
                  View Live Demo
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}