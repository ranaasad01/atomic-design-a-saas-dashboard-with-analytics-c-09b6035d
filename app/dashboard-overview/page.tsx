"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Star, Activity, ArrowRight, Bell, Download, RefreshCw, ChevronDown, Eye, AlertCircle, Check, Clock } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "124,800",
    prefix: "$",
    change: 12.4,
    icon: Star,
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "8,342",
    prefix: "",
    change: 7.1,
    icon: Users,
    color: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Churn Rate",
    value: "2.4",
    prefix: "",
    suffix: "%",
    change: -0.6,
    icon: TrendingDown,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Avg. Session Duration",
    value: "14m 32s",
    prefix: "",
    change: 3.8,
    icon: Activity,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const revenueData = [
  { name: "Jan", revenue: 68000, target: 72000 },
  { name: "Feb", revenue: 74000, target: 75000 },
  { name: "Mar", revenue: 71000, target: 78000 },
  { name: "Apr", revenue: 83000, target: 80000 },
  { name: "May", revenue: 91000, target: 85000 },
  { name: "Jun", revenue: 98000, target: 90000 },
  { name: "Jul", revenue: 104000, target: 95000 },
  { name: "Aug", revenue: 112000, target: 100000 },
  { name: "Sep", revenue: 108000, target: 105000 },
  { name: "Oct", revenue: 118000, target: 110000 },
  { name: "Nov", revenue: 121000, target: 115000 },
  { name: "Dec", revenue: 124800, target: 120000 },
];

const userGrowthData = [
  { name: "Jan", new: 320, churned: 45 },
  { name: "Feb", new: 410, churned: 52 },
  { name: "Mar", new: 380, churned: 48 },
  { name: "Apr", new: 520, churned: 61 },
  { name: "May", new: 610, churned: 55 },
  { name: "Jun", new: 580, churned: 70 },
  { name: "Jul", new: 720, churned: 63 },
  { name: "Aug", new: 810, churned: 74 },
  { name: "Sep", new: 760, churned: 68 },
  { name: "Oct", new: 890, churned: 80 },
  { name: "Nov", new: 940, churned: 72 },
  { name: "Dec", new: 1020, churned: 85 },
];

const planDistribution = [
  { name: "Enterprise", value: 38, color: "#6366f1" },
  { name: "Pro", value: 45, color: "#8b5cf6" },
  { name: "Starter", value: 17, color: "#a78bfa" },
];

const recentTransactions = [
  {
    id: "txn_001",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 2400,
    status: "paid" as const,
    date: "Dec 28, 2024",
    plan: "Enterprise",
  },
  {
    id: "txn_002",
    customer: "Nova Labs",
    email: "finance@novalabs.io",
    amount: 799,
    status: "paid" as const,
    date: "Dec 27, 2024",
    plan: "Pro",
  },
  {
    id: "txn_003",
    customer: "Bright Minds",
    email: "admin@brightminds.co",
    amount: 199,
    status: "pending" as const,
    date: "Dec 27, 2024",
    plan: "Starter",
  },
  {
    id: "txn_004",
    customer: "Orbit Systems",
    email: "ops@orbitsys.com",
    amount: 2400,
    status: "paid" as const,
    date: "Dec 26, 2024",
    plan: "Enterprise",
  },
  {
    id: "txn_005",
    customer: "Flux Digital",
    email: "hello@fluxdigital.net",
    amount: 799,
    status: "failed" as const,
    date: "Dec 26, 2024",
    plan: "Pro",
  },
  {
    id: "txn_006",
    customer: "Zenith Cloud",
    email: "billing@zenithcloud.io",
    amount: 2400,
    status: "paid" as const,
    date: "Dec 25, 2024",
    plan: "Enterprise",
  },
];

const topUsers = [
  {
    id: "u1",
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    plan: "Enterprise",
    mrr: 2400,
    status: "active" as const,
    avatar: "SC",
  },
  {
    id: "u2",
    name: "Marcus Webb",
    email: "m.webb@novalabs.io",
    plan: "Pro",
    mrr: 799,
    status: "active" as const,
    avatar: "MW",
  },
  {
    id: "u3",
    name: "Priya Sharma",
    email: "priya@zenithcloud.io",
    plan: "Enterprise",
    mrr: 2400,
    status: "active" as const,
    avatar: "PS",
  },
  {
    id: "u4",
    name: "James Okafor",
    email: "james@orbitsys.com",
    plan: "Enterprise",
    mrr: 2400,
    status: "active" as const,
    avatar: "JO",
  },
  {
    id: "u5",
    name: "Lena Müller",
    email: "lena@fluxdigital.net",
    plan: "Pro",
    mrr: 799,
    status: "trial" as const,
    avatar: "LM",
  },
];

const alerts = [
  {
    id: "a1",
    type: "warning",
    message: "Flux Digital payment failed — retry scheduled",
    time: "2 hours ago",
  },
  {
    id: "a2",
    type: "info",
    message: "Bright Minds invoice pending for 3 days",
    time: "5 hours ago",
  },
  {
    id: "a3",
    type: "success",
    message: "MRR milestone: $120K target exceeded",
    time: "1 day ago",
  },
];

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e1b4b] border border-indigo-700/40 rounded-xl px-4 py-3 shadow-xl shadow-indigo-950/40">
      <p className="text-indigo-300 text-xs font-medium mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name === "revenue" || entry.name === "target"
            ? `$${(entry.value ?? 0).toLocaleString()}`
            : (entry.value ?? 0).toLocaleString()}{" "}
          <span className="text-indigo-300 font-normal text-xs capitalize">{entry.name}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" | "active" | "churned" | "trial" }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    trial: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-red-500/15 text-red-400 border-red-500/25",
    churned: "bg-red-500/15 text-red-400 border-red-500/25",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? ""}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d" | "1y">("1y");

  const ranges: ("7d" | "30d" | "90d" | "1y")[] = ["7d", "30d", "90d", "1y"];

  return (
    <main className="min-h-screen bg-[#0f0d2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-indigo-300 text-sm mt-1">
              Welcome back — here&apos;s what&apos;s happening with {APP_NAME} today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-700/30 hover:bg-indigo-700/50 border border-indigo-600/30 text-indigo-200 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, rotate: 15 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className={`relative rounded-2xl border ${card.border} ${card.bg} p-5 overflow-hidden group cursor-default`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl" />
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isPositive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {card.change}%
                  </span>
                </div>
                <p className="text-indigo-300 text-xs font-medium mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {card.prefix ?? ""}
                  {card.value}
                  {card.suffix ?? ""}
                </p>
                <p className="text-indigo-400 text-xs mt-1">vs. last month</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Plan Distribution ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
          {/* Revenue Area Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-white font-semibold text-base">Revenue vs Target</h2>
                <p className="text-indigo-400 text-xs mt-0.5">Monthly performance across 2024</p>
              </div>
              <div className="flex items-center gap-1 bg-indigo-900/50 rounded-xl p-1 border border-indigo-800/30">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeRange === r
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-indigo-300 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-5 mb-4">
              <span className="flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="w-3 h-0.5 bg-indigo-400 rounded-full inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="w-3 h-0.5 bg-violet-400 rounded-full inline-block" style={{ borderStyle: "dashed" }} />
                Target
              </span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 3" fill="url(#tgtGrad)" dot={false} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution Pie */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6 flex flex-col"
          >
            <h2 className="text-white font-semibold text-base mb-1">Plan Distribution</h2>
            <p className="text-indigo-400 text-xs mb-6">Active subscriptions by tier</p>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {planDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{
                      background: "#1e1b4b",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: "12px",
                      color: "#e0e7ff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {planDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-indigo-200 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── User Growth Bar Chart + Alerts ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
          {/* Bar Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="xl:col-span-2 rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-semibold text-base">User Growth</h2>
              <Link href="/dashboard/users" className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200 text-xs transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-indigo-400 text-xs mb-5">New signups vs churned users per month</p>
            <div className="flex items-center gap-5 mb-4">
              <span className="flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="w-3 h-2.5 bg-indigo-500 rounded-sm inline-block" />
                New Users
              </span>
              <span className="flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="w-3 h-2.5 bg-violet-400/60 rounded-sm inline-block" />
                Churned
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={userGrowthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="new" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="churned" fill="#7c3aed" fillOpacity={0.6} radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Alerts Panel */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold text-base">Recent Alerts</h2>
              <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <Bell className="w-3 h-3 text-red-400" />
              </span>
            </div>
            <div className="space-y-3 flex-1">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  className={`flex gap-3 p-3 rounded-xl border transition-colors cursor-default ${
                    alert.type === "warning"
                      ? "bg-amber-500/10 border-amber-500/20"
                      : alert.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : "bg-indigo-500/10 border-indigo-500/20"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.type === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : alert.type === "success" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-indigo-100 text-xs leading-relaxed">{alert.message}</p>
                    <p className="text-indigo-400 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              href="/dashboard/analytics"
              className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-700/40 text-indigo-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-700/20 text-sm font-medium transition-all"
            >
              View all alerts <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-white font-semibold text-base">Recent Transactions</h2>
              <p className="text-indigo-400 text-xs mt-0.5">Latest billing activity across all plans</p>
            </div>
            <Link
              href="/dashboard/revenue"
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-200 text-sm font-medium transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-indigo-800/40">
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider pb-3 pr-4">Customer</th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider pb-3 pr-4">Plan</th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider pb-3 pr-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    variants={shouldReduceMotion ? {} : fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(99,102,241,0.05)" }}
                    className="border-b border-indigo-800/20 last:border-0 transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <div>
                        <p className="text-white text-sm font-medium">{tx.customer ?? "—"}</p>
                        <p className="text-indigo-400 text-xs">{tx.email ?? "—"}</p>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-indigo-200 text-sm">{tx.plan ?? "—"}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-white text-sm font-semibold">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-3.5">
                      <span className="text-indigo-300 text-sm">{tx.date ?? "—"}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Top Users ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-indigo-950/40 border border-indigo-800/30 p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-white font-semibold text-base">Top Customers by MRR</h2>
              <p className="text-indigo-400 text-xs mt-0.5">Highest-value accounts this month</p>
            </div>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-200 text-sm font-medium transition-colors"
            >
              Manage users <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-3"
          >
            {topUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={shouldReduceMotion ? {} : fadeInUp}
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-indigo-900/20 border border-indigo-800/20 hover:border-indigo-700/40 transition-all cursor-default"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md shadow-indigo-600/20">
                  {user.avatar ?? "??"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user.name ?? "—"}</p>
                  <p className="text-indigo-400 text-xs truncate">{user.email ?? "—"}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <span className="text-indigo-300 text-xs bg-indigo-800/40 px-2.5 py-1 rounded-lg border border-indigo-700/30">
                    {user.plan ?? "—"}
                  </span>
                  <StatusBadge status={user.status} />
                  <span className="text-white font-semibold text-sm w-20 text-right">
                    ${(user.mrr ?? 0).toLocaleString()}<span className="text-indigo-400 font-normal text-xs">/mo</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}