"use client";

import { useState } from "react";
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
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight, Download, Filter, Calendar, Star, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "$128,450",
    rawValue: 128450,
    change: 12.4,
    prefix: "$",
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/25",
  },
  {
    label: "Annual Recurring Revenue",
    value: "$1,541,400",
    rawValue: 1541400,
    change: 18.7,
    prefix: "$",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
  },
  {
    label: "Average Revenue Per User",
    value: "$84.20",
    rawValue: 84.2,
    change: 3.1,
    prefix: "$",
    icon: Users,
    color: "from-sky-500 to-indigo-600",
    glow: "shadow-sky-500/25",
  },
  {
    label: "Churn Rate",
    value: "2.3%",
    rawValue: 2.3,
    change: -0.4,
    prefix: "",
    icon: TrendingDown,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/25",
    invertChange: true,
  },
];

const mrrTrendData = [
  { name: "Jan", mrr: 82000, newMrr: 14000, expansion: 6000, churn: 3200 },
  { name: "Feb", mrr: 88500, newMrr: 15200, expansion: 7100, churn: 2900 },
  { name: "Mar", mrr: 94200, newMrr: 13800, expansion: 8400, churn: 3100 },
  { name: "Apr", mrr: 99800, newMrr: 16500, expansion: 7800, churn: 2700 },
  { name: "May", mrr: 107300, newMrr: 18200, expansion: 9200, churn: 3400 },
  { name: "Jun", mrr: 113600, newMrr: 17400, expansion: 10100, churn: 2800 },
  { name: "Jul", mrr: 119200, newMrr: 19800, expansion: 9600, churn: 3100 },
  { name: "Aug", mrr: 124700, newMrr: 21200, expansion: 11300, churn: 2900 },
  { name: "Sep", mrr: 128450, newMrr: 20100, expansion: 10800, churn: 3050 },
];

const revenueByPlanData = [
  { name: "Starter", value: 18200, color: "#818cf8" },
  { name: "Pro", value: 54600, color: "#6366f1" },
  { name: "Enterprise", value: 55650, color: "#4f46e5" },
];

const mrrMovementData = [
  { name: "Jan", new: 14000, expansion: 6000, contraction: -1800, churn: -3200 },
  { name: "Feb", new: 15200, expansion: 7100, contraction: -1500, churn: -2900 },
  { name: "Mar", new: 13800, expansion: 8400, contraction: -2100, churn: -3100 },
  { name: "Apr", new: 16500, expansion: 7800, contraction: -1200, churn: -2700 },
  { name: "May", new: 18200, expansion: 9200, contraction: -1600, churn: -3400 },
  { name: "Jun", new: 17400, expansion: 10100, contraction: -1900, churn: -2800 },
  { name: "Jul", new: 19800, expansion: 9600, contraction: -1400, churn: -3100 },
  { name: "Aug", new: 21200, expansion: 11300, contraction: -1700, churn: -2900 },
  { name: "Sep", new: 20100, expansion: 10800, contraction: -1550, churn: -3050 },
];

const transactions = [
  {
    id: "txn_001",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 2400,
    status: "paid" as const,
    date: "2024-09-28",
    plan: "Enterprise",
    avatar: "AC",
  },
  {
    id: "txn_002",
    customer: "Bright Labs",
    email: "finance@brightlabs.io",
    amount: 490,
    status: "paid" as const,
    date: "2024-09-27",
    plan: "Pro",
    avatar: "BL",
  },
  {
    id: "txn_003",
    customer: "Nova Systems",
    email: "accounts@novasys.com",
    amount: 2400,
    status: "pending" as const,
    date: "2024-09-27",
    plan: "Enterprise",
    avatar: "NS",
  },
  {
    id: "txn_004",
    customer: "Pixel Studio",
    email: "hello@pixelstudio.co",
    amount: 99,
    status: "paid" as const,
    date: "2024-09-26",
    plan: "Starter",
    avatar: "PS",
  },
  {
    id: "txn_005",
    customer: "Forge Analytics",
    email: "ops@forgeanalytics.com",
    amount: 490,
    status: "failed" as const,
    date: "2024-09-26",
    plan: "Pro",
    avatar: "FA",
  },
  {
    id: "txn_006",
    customer: "Zenith Cloud",
    email: "billing@zenithcloud.io",
    amount: 2400,
    status: "paid" as const,
    date: "2024-09-25",
    plan: "Enterprise",
    avatar: "ZC",
  },
  {
    id: "txn_007",
    customer: "Maple Digital",
    email: "pay@mapledigital.ca",
    amount: 490,
    status: "paid" as const,
    date: "2024-09-25",
    plan: "Pro",
    avatar: "MD",
  },
  {
    id: "txn_008",
    customer: "Orbit SaaS",
    email: "finance@orbitsaas.com",
    amount: 99,
    status: "pending" as const,
    date: "2024-09-24",
    plan: "Starter",
    avatar: "OS",
  },
];

const topCustomers = [
  { name: "Acme Corp", mrr: 2400, plan: "Enterprise", growth: 12, avatar: "AC" },
  { name: "Zenith Cloud", mrr: 2400, plan: "Enterprise", growth: 8, avatar: "ZC" },
  { name: "Nova Systems", mrr: 2400, plan: "Enterprise", growth: 22, avatar: "NS" },
  { name: "Bright Labs", mrr: 490, plan: "Pro", growth: 5, avatar: "BL" },
  { name: "Forge Analytics", mrr: 490, plan: "Pro", growth: -3, avatar: "FA" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (val: number) =>
  `$${(val ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    className: "text-red-400 bg-red-400/10 border-red-400/20",
  },
};

const planColors: Record<string, string> = {
  Enterprise: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  Pro: "text-indigo-300 bg-indigo-400/10 border-indigo-400/20",
  Starter: "text-sky-300 bg-sky-400/10 border-sky-400/20",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e1b4b]/95 border border-indigo-700/40 rounded-xl p-3 shadow-xl shadow-indigo-950/40 backdrop-blur-sm">
      <p className="text-indigo-300 text-xs font-medium mb-2">{label}</p>
      {(payload ?? []).map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {formatCurrency(Math.abs(entry.value ?? 0))}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RevenuePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeRange, setActiveRange] = useState<"3m" | "6m" | "9m">("9m");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "failed">("all");

  const rangeMap = { "3m": 3, "6m": 6, "9m": 9 };
  const filteredTrend = mrrTrendData.slice(-rangeMap[activeRange]);
  const filteredMovement = mrrMovementData.slice(-rangeMap[activeRange]);

  const filteredTransactions =
    statusFilter === "all"
      ? transactions
      : transactions.filter((t) => t.status === statusFilter);

  return (
    <main className="min-h-screen bg-[#0f0d2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Revenue
            </h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Track MRR, ARR, and subscription revenue across all plans.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-800/40 hover:bg-indigo-700/50 border border-indigo-700/40 text-indigo-200 text-sm font-medium transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Sep 2024
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.invertChange
              ? (card.change ?? 0) <= 0
              : (card.change ?? 0) >= 0;
            return (
              <motion.div
                key={card.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-xl ${card.glow}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isPositive
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change ?? 0)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-xs text-indigo-400 font-medium">{card.label}</p>
                <div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-5 blur-xl`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MRR Trend Chart ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 mb-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">MRR Growth</h2>
              <p className="text-indigo-400 text-sm mt-0.5">
                Monthly recurring revenue over time
              </p>
            </div>
            <div className="flex items-center gap-1 bg-indigo-900/40 rounded-lg p-1 border border-indigo-800/30">
              {(["3m", "6m", "9m"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
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
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={filteredTrend} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#a5b4fc", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#a5b4fc", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="mrr"
                name="MRR"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#mrrGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Two-column: MRR Movement + Revenue by Plan ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* MRR Movement Bar Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3 rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-xl"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">MRR Movement</h2>
              <p className="text-indigo-400 text-sm mt-0.5">
                New, expansion, contraction, and churn breakdown
              </p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredMovement} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(Math.abs(v) / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="new" name="New" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="expansion" name="Expansion" fill="#818cf8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="contraction" name="Contraction" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="churn" name="Churn" fill="#f87171" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue by Plan Pie */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-xl"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Revenue by Plan</h2>
              <p className="text-indigo-400 text-sm mt-0.5">Current month distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={revenueByPlanData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {revenueByPlanData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [formatCurrency(val), "MRR"]}
                  contentStyle={{
                    background: "#1e1b4b",
                    border: "1px solid #4338ca",
                    borderRadius: "12px",
                    color: "#e0e7ff",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: "#a5b4fc", fontSize: "12px" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-2">
              {revenueByPlanData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-indigo-300">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {formatCurrency(item.value ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Top Customers ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 mb-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Top Customers</h2>
              <p className="text-indigo-400 text-sm mt-0.5">Highest MRR contributors this month</p>
            </div>
            <Star className="w-5 h-5 text-indigo-400" />
          </div>
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {topCustomers.map((customer, idx) => (
              <motion.div
                key={customer.name}
                variants={shouldReduceMotion ? {} : fadeInUp}
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-indigo-800/20 transition-colors cursor-pointer"
              >
                <span className="text-indigo-500 text-sm font-bold w-5 text-center">
                  {idx + 1}
                </span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {customer.avatar ?? "??"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{customer.name}</p>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium mt-0.5 ${
                      planColors[customer.plan] ?? "text-indigo-300"
                    }`}
                  >
                    {customer.plan}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-semibold text-sm">
                    {formatCurrency(customer.mrr ?? 0)}
                    <span className="text-indigo-400 font-normal text-xs">/mo</span>
                  </p>
                  <p
                    className={`text-xs font-medium flex items-center justify-end gap-0.5 mt-0.5 ${
                      (customer.growth ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {(customer.growth ?? 0) >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(customer.growth ?? 0)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <p className="text-indigo-400 text-sm mt-0.5">Latest billing activity</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              <div className="flex items-center gap-1 bg-indigo-900/40 rounded-lg p-1 border border-indigo-800/30">
                {(["all", "paid", "pending", "failed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                      statusFilter === s
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-indigo-300 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-indigo-800/30">
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wide pb-3 pr-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wide pb-3 pr-4 hidden sm:table-cell">
                    Plan
                  </th>
                  <th className="text-left text-xs font-semibold text-indigo-400 uppercase tracking-wide pb-3 pr-4 hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-right text-xs font-semibold text-indigo-400 uppercase tracking-wide pb-3 pr-4">
                    Amount
                  </th>
                  <th className="text-right text-xs font-semibold text-indigo-400 uppercase tracking-wide pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {(filteredTransactions ?? []).map((tx, idx) => {
                  const cfg = statusConfig[tx.status] ?? statusConfig.pending;
                  const StatusIcon = cfg.icon;
                  return (
                    <motion.tr
                      key={tx.id}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                      className="border-b border-indigo-800/20 hover:bg-indigo-800/10 transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {tx.avatar ?? "??"}
                          </div>
                          <div>
                            <p className="text-white font-medium">{tx.customer ?? "—"}</p>
                            <p className="text-indigo-400 text-xs">{tx.email ?? "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 hidden sm:table-cell">
                        <span
                          className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${
                            planColors[tx.plan] ?? "text-indigo-300"
                          }`}
                        >
                          {tx.plan ?? "—"}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-indigo-300 hidden md:table-cell">
                        {tx.date ?? "—"}
                      </td>
                      <td className="py-3.5 pr-4 text-right">
                        <span className="text-white font-semibold">
                          {formatCurrency(tx.amount ?? 0)}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${cfg.className}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-10 text-indigo-400 text-sm">
                No transactions match this filter.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}