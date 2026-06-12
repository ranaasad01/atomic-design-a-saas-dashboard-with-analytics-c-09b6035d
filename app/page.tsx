"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Activity, Users, Star, TrendingUp, Shield, Zap, BarChart2, CheckCircle, ChevronRight, Sparkles, ArrowUp, Clock, Globe } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Mock Data ────────────────────────────────────────────────────────

const revenueData = [
  { name: "Jan", mrr: 42000, arr: 504000 },
  { name: "Feb", mrr: 47500, arr: 570000 },
  { name: "Mar", mrr: 51200, arr: 614400 },
  { name: "Apr", mrr: 55800, arr: 669600 },
  { name: "May", mrr: 61400, arr: 736800 },
  { name: "Jun", mrr: 68900, arr: 826800 },
  { name: "Jul", mrr: 74200, arr: 890400 },
  { name: "Aug", mrr: 81500, arr: 978000 },
];

const userGrowthData = [
  { name: "Jan", active: 1200, churned: 80 },
  { name: "Feb", active: 1450, churned: 65 },
  { name: "Mar", active: 1680, churned: 72 },
  { name: "Apr", active: 1920, churned: 58 },
  { name: "May", active: 2240, churned: 91 },
  { name: "Jun", active: 2580, churned: 74 },
  { name: "Jul", active: 2910, churned: 63 },
  { name: "Aug", active: 3340, churned: 55 },
];

const conversionData = [
  { name: "Mon", rate: 3.2 },
  { name: "Tue", rate: 4.1 },
  { name: "Wed", rate: 3.8 },
  { name: "Thu", rate: 5.2 },
  { name: "Fri", rate: 4.7 },
  { name: "Sat", rate: 3.1 },
  { name: "Sun", rate: 2.9 },
];

const kpiStats = [
  {
    label: "Monthly Recurring Revenue",
    value: "$81,500",
    change: "+18.4%",
    positive: true,
    icon: Star,
    color: "from-violet-500 to-indigo-500",
    glow: "shadow-violet-500/20",
  },
  {
    label: "Active Users",
    value: "3,340",
    change: "+14.7%",
    positive: true,
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-500/20",
  },
  {
    label: "Churn Rate",
    value: "1.6%",
    change: "-0.4%",
    positive: true,
    icon: Activity,
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
  {
    label: "Avg. Revenue / User",
    value: "$24.40",
    change: "+3.2%",
    positive: true,
    icon: TrendingUp,
    color: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/20",
  },
];

const features = [
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description:
      "Stream live metrics from every touchpoint — revenue events, user sessions, and funnel conversions update in under 200ms.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart2,
    title: "Revenue Intelligence",
    description:
      "Track MRR, ARR, expansion revenue, and contraction in one unified view. Forecast the next 90 days with ML-powered projections.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Users,
    title: "User Cohort Analysis",
    description:
      "Segment users by plan, behavior, and lifecycle stage. Identify at-risk accounts before they churn with predictive scoring.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified. All data encrypted at rest and in transit. Role-based access controls and full audit logs included.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Instant Integrations",
    description:
      "Connect Stripe, Salesforce, HubSpot, Intercom, and 60+ tools in minutes. No engineering required — just OAuth and go.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Data residency in US, EU, and APAC regions. 99.99% uptime SLA backed by multi-region redundancy and automatic failover.",
    color: "from-pink-500 to-rose-500",
  },
];

const testimonials = [
  {
    quote:
      "Pulse Analytics replaced four separate tools for us. Our team went from spending 6 hours a week on reporting to under 30 minutes. The MRR forecasting alone paid for itself in the first month.",
    author: "Sarah Chen",
    role: "VP of Growth",
    company: "Meridian SaaS",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGVaDm0uV3PeA/profile-displayphoto-scale_200_200/B4EZ1KXPhlI4AY-/0/1775069105272?e=2147483647&v=beta&t=d67G9_spQysbtxSd9C30hcJsTcwZMafiYo-x2gQKWyA",
    metric: "6× faster reporting",
  },
  {
    quote:
      "We caught a churn spike in our Enterprise tier three weeks before it would have shown up in our spreadsheets. Pulse's cohort alerts saved us roughly $40K in ARR that quarter.",
    author: "Marcus Webb",
    role: "CEO & Co-Founder",
    company: "Stackline",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFZGPk4C3GmqA/profile-displayphoto-shrink_200_200/B56ZUqYpBXGsAc-/0/1740172857925?e=2147483647&v=beta&t=MZLfxmSfMcl4NPLH9JpAQkBA5OIV_KxANUga1usXCHo",
    metric: "$40K ARR saved",
  },
  {
    quote:
      "The dashboard is genuinely beautiful. Our board meetings now open with a live Pulse screen instead of a static slide deck. Investors love the transparency.",
    author: "Priya Nair",
    role: "Head of Finance",
    company: "Cloudform",
    avatar: "https://tiltonracing.com/wp-content/uploads/54-40030-1.jpg",
    metric: "Board-ready reporting",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage SaaS teams getting their first metrics in order.",
    features: [
      "Up to 1,000 tracked users",
      "Core MRR & ARR dashboards",
      "7 native integrations",
      "14-day data history",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "For growth-stage teams that need deep analytics and forecasting.",
    features: [
      "Up to 10,000 tracked users",
      "Full revenue intelligence suite",
      "60+ integrations",
      "12-month data history",
      "Cohort & churn analysis",
      "ML revenue forecasting",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, SLAs, and white-glove onboarding for scale.",
    features: [
      "Unlimited tracked users",
      "Custom data models",
      "SSO & SCIM provisioning",
      "Dedicated data residency",
      "99.99% uptime SLA",
      "Dedicated CSM",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const integrationLogos = [
  { name: "Stripe", color: "#635BFF" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Intercom", color: "#1F8DED" },
  { name: "Segment", color: "#52BD94" },
  { name: "Slack", color: "#4A154B" },
  { name: "Mixpanel", color: "#7856FF" },
  { name: "Amplitude", color: "#1DA1F2" },
];

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
  prefix?: string;
  suffix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur-md border border-indigo-700/40 rounded-xl px-4 py-3 shadow-xl shadow-indigo-950/40">
      <p className="text-indigo-300 text-xs font-medium mb-2">{label ?? ""}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {prefix}{(entry.value ?? 0).toLocaleString()}{suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Feature Card ────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6 hover:border-indigo-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-950/30"
    >
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-indigo-300 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  metric,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-600/40 transition-all"
    >
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-indigo-100 text-sm leading-relaxed italic flex-1">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-2 border-t border-indigo-800/30">
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">{author}</p>
          <p className="text-indigo-400 text-xs truncate">
            {role}, {company}
          </p>
        </div>
        <span className="text-xs font-medium text-violet-300 bg-violet-500/15 border border-violet-500/25 px-2.5 py-1 rounded-full whitespace-nowrap">
          {metric}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────

function PricingCard({
  plan,
}: {
  plan: (typeof pricingPlans)[0];
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl border p-7 flex flex-col gap-5 ${
        plan.highlighted
          ? "bg-gradient-to-br from-indigo-600/30 to-violet-600/20 border-indigo-500/60 shadow-xl shadow-indigo-500/20"
          : "bg-[#1e1b4b]/50 border-indigo-800/40"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      <div>
        <h3 className="text-white font-bold text-lg">{plan.name}</h3>
        <p className="text-indigo-300 text-sm mt-1">{plan.description}</p>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-extrabold text-white">{plan.price}</span>
        {plan.period && (
          <span className="text-indigo-400 text-sm mb-1.5">{plan.period}</span>
        )}
      </div>
      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-indigo-200">
            <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/sign-up"
        className={`mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
          plan.highlighted
            ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500 shadow-lg shadow-indigo-500/30"
            : "bg-indigo-800/40 text-indigo-200 hover:bg-indigo-700/50 border border-indigo-700/40"
        }`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0f0c29] text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px]" />
          <div className="absolute top-32 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-indigo-800/20 rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Real-time SaaS Analytics Platform
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08]"
          >
            <span className="bg-gradient-to-br from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent">
              {APP_TAGLINE}
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-indigo-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_DESCRIPTION}
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm hover:from-indigo-400 hover:to-violet-500 shadow-lg shadow-indigo-500/30 transition-all"
            >
              View Live Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-800/40 text-indigo-200 font-semibold text-sm hover:bg-indigo-700/50 border border-indigo-700/40 transition-all"
            >
              See Pricing
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-indigo-400"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              No credit card required
            </span>
            <span className="hidden sm:block w-px h-4 bg-indigo-800" />
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              14-day free trial
            </span>
            <span className="hidden sm:block w-px h-4 bg-indigo-800" />
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Cancel anytime
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── KPI Stats ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {kpiStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                className={`relative bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6 shadow-lg ${stat.glow}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-md`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-indigo-400 text-xs font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.positive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400"
                  }`}
                >
                  <ArrowUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Live Charts ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Your metrics, live and in focus
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto text-sm">
              Every chart updates in real time. No refreshing. No lag. Just the truth about your business.
            </p>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg">Revenue Growth</h3>
                <p className="text-indigo-400 text-xs mt-0.5">MRR vs ARR — last 8 months</p>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                +18.4% MoM
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip prefix="$" />} />
                <Area type="monotone" dataKey="mrr" name="MRR" stroke="#6366f1" strokeWidth={2.5} fill="url(#mrrGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                <Area type="monotone" dataKey="arr" name="ARR" stroke="#a78bfa" strokeWidth={2} fill="url(#arrGrad)" dot={false} activeDot={{ r: 5, fill: "#a78bfa" }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Growth */}
            <motion.div
              variants={shouldReduceMotion ? {} : slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">User Growth</h3>
                  <p className="text-indigo-400 text-xs mt-0.5">Active vs churned users</p>
                </div>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={userGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                  <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="active" name="Active" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="churned" name="Churned" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Conversion Rate */}
            <motion.div
              variants={shouldReduceMotion ? {} : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#1e1b4b]/60 backdrop-blur-sm border border-indigo-800/40 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold">Conversion Rate</h3>
                  <p className="text-indigo-400 text-xs mt-0.5">Daily conversion % this week</p>
                </div>
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={conversionData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                  <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />


                  <Tooltip content={<CustomTooltip suffix="%" />} />


                  <Line type="monotone" dataKey="rate" name="Conversion" stroke="#a78bfa" strokeWidth={2.5} dot={{ fill: "#a78bfa", r: 4 }} activeDot={{ r: 6, fill: "#c4b5fd" }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Everything you need
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for modern SaaS teams
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto text-sm leading-relaxed">
              From early-stage founders to enterprise data teams — Pulse scales with your ambition.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Integration Logos ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-indigo-900/40">
        <div className="max-w-5xl mx-auto">
          <motion.p
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-indigo-400 text-sm font-medium mb-8 uppercase tracking-widest"
          >
            Integrates with your existing stack
          </motion.p>
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {integrationLogos.map((logo) => (
              <motion.div
                key={logo.name}
                variants={shouldReduceMotion ? {} : scaleIn}
                className="px-5 py-2.5 rounded-xl bg-[#1e1b4b]/60 border border-indigo-800/40 text-sm font-semibold"
                style={{ color: logo.color }}
              >
                {logo.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Trusted by high-growth teams
            </h2>
            <p className="text-indigo-300 text-sm">
              See why 12,400+ SaaS companies choose Pulse.
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
              <TestimonialCard key={t.author} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1e1b4b]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-indigo-300 text-sm">
              Start free. Scale when you&apos;re ready.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Get started today
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Ready to see your business{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                clearly?
              </span>
            </h2>
            <p className="text-indigo-300 text-lg">
              Join 12,400+ SaaS teams. 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:from-indigo-400 hover:to-violet-500 shadow-xl shadow-indigo-500/30 transition-all"
              >
                Start your free trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent text-indigo-300 font-semibold text-sm hover:text-white transition-colors"
              >
                Explore the dashboard
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
