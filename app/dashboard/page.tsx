"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle, Calendar, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mrrData = [
  { name: "Jan", mrr: 42000, target: 40000 },
  { name: "Feb", mrr: 47500, target: 45000 },
  { name: "Mar", mrr: 51200, target: 50000 },
  { name: "Apr", mrr: 55800, target: 54000 },
  { name: "May", mrr: 61300, target: 59000 },
  { name: "Jun", mrr: 67900, target: 65000 },
  { name: "Jul", mrr: 72400, target: 70000 },
  { name: "Aug", mrr: 78100, target: 75000 },
  { name: "Sep", mrr: 84600, target: 81000 },
  { name: "Oct", mrr: 91200, target: 88000 },
  { name: "Nov", mrr: 97800, target: 94000 },
  { name: "Dec", mrr: 104500, target: 100000 },
];

const signupData = [
  { name: "Jan", signups: 312, churned: 28 },
  { name: "Feb", signups: 428, churned: 34 },
  { name: "Mar", signups: 391, churned: 41 },
  { name: "Apr", signups: 512, churned: 29 },
  { name: "May", signups: 634, churned: 52 },
  { name: "Jun", signups: 589, churned: 47 },
  { name: "Jul", signups: 721, churned: 38 },
  { name: "Aug", signups: 803, churned: 61 },
  { name: "Sep", signups: 748, churned: 55 },
  { name: "Oct", signups: 912, churned: 43 },
  { name: "Nov", signups: 1043, churned: 67 },
  { name: "Dec", signups: 1187, churned: 72 },
];

const recentTransactions = [
  { id: "txn_001", customer: "Acme Corp", email: "billing@acme.com", amount: 2400, status: "paid", date: "2024-12-18", plan: "Enterprise" },
  { id: "txn_002", customer: "Bright Labs", email: "finance@brightlabs.io", amount: 890, status: "paid", date: "2024-12-17", plan: "Pro" },
  { id: "txn_003", customer: "Nova Systems", email: "accounts@novasys.com", amount: 3200, status: "pending", date: "2024-12-17", plan: "Enterprise" },
  { id: "txn_004", customer: "Pixel Studio", email: "pay@pixelstudio.co", amount: 290, status: "paid", date: "2024-12-16", plan: "Starter" },
  { id: "txn_005", customer: "Drift Analytics", email: "billing@drift.ai", amount: 890, status: "failed", date: "2024-12-16", plan: "Pro" },
  { id: "txn_006", customer: "Cascade Inc", email: "ops@cascade.com", amount: 1780, status: "paid", date: "2024-12-15", plan: "Pro" },
  { id: "txn_007", customer: "Zenith Cloud", email: "finance@zenith.cloud", amount: 3200, status: "paid", date: "2024-12-15", plan: "Enterprise" },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$1,248,300",
    change: 18.4,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/25",
    description: "Lifetime revenue",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$104,500",
    change: 6.8,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
    description: "December 2024",
  },
  {
    label: "Active Users",
    value: "14,832",
    change: 12.1,
    icon: Users,
    color: "from-sky-500 to-indigo-600",
    glow: "shadow-sky-500/25",
    description: "Across all plans",
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: -0.6,
    icon: AlertCircle,
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/25",
    description: "Monthly average",
    invertChange: true,
  },
];

const dateRanges = ["Last 7 days", "Last 30 days", "Last 3 months", "Last 6 months", "Last 12 months", "All time"];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur-md border border-indigo-700/40 rounded-xl px-4 py-3 shadow-xl shadow-indigo-950/40">
      <p className="text-indigo-300 text-xs font-medium mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {entry.name === "mrr" || entry.name === "target"
              ? `$${(entry.value ?? 0).toLocaleString()}`
              : (entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    failed: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] ?? "bg-indigo-500/15 text-indigo-400 border-indigo-500/30"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Plan Badge ───────────────────────────────────────────────────────────────

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    Enterprise: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    Pro: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    Starter: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${styles[plan] ?? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"}`}>
      {plan}
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState("Last 12 months");
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion ? {} : { variants, initial: "hidden", animate: "visible" };

  const scrollReveal = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1640] to-[#0f0c29] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          {...motionProps(fadeInUp)}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Welcome back — here&apos;s what&apos;s happening with Pulse Analytics today.
            </p>
          </div>

          {/* Date Range Picker */}
          <div className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-700/40 rounded-xl px-3 py-2 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent text-indigo-200 text-sm focus:outline-none cursor-pointer"
            >
              {dateRanges.map((r) => (
                <option key={r} value={r} className="bg-[#1e1b4b]">{r}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          {...scrollReveal(staggerContainer)}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.invertChange ? card.change <= 0 : card.change >= 0;
            const displayChange = Math.abs(card.change);
            return (
              <motion.div
                key={card.label}
                {...(shouldReduceMotion ? {} : { variants: scaleIn })}
                className={`relative bg-indigo-950/40 border border-indigo-800/30 rounded-2xl p-5 overflow-hidden shadow-xl ${card.glow}`}
              >
                {/* Gradient orb */}
                <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-xl pointer-events-none`} />

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    isPositive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400"
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {displayChange}%
                  </span>
                </div>

                <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                <p className="text-indigo-400 text-xs mt-1">{card.label}</p>
                <p className="text-indigo-500 text-xs mt-0.5">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* MRR Chart */}
          <motion.div
            {...scrollReveal(fadeInUp)}
            className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-semibold text-lg">MRR Growth</h2>
                <p className="text-indigo-400 text-xs mt-0.5">Monthly recurring revenue vs target</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="text-indigo-400 text-xs">MRR</span>
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 ml-2" />
                <span className="text-indigo-400 text-xs">Target</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mrrData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
                <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 4" dot={false} activeDot={{ r: 4, fill: "#8b5cf6" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Signups Chart */}
          <motion.div
            {...scrollReveal(fadeInUp)}
            className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-semibold text-lg">User Signups & Churn</h2>
                <p className="text-indigo-400 text-xs mt-0.5">New signups vs churned users per month</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={signupData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#818cf8" }} />
                <Bar dataKey="signups" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="churned" fill="#f43f5e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          {...scrollReveal(fadeInUp)}
          className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-indigo-800/30 flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold text-lg">Recent Transactions</h2>
              <p className="text-indigo-400 text-xs mt-0.5">Latest billing activity across all plans</p>
            </div>
            <button className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors flex items-center gap-1">
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-800/20">
                  {["Transaction", "Customer", "Amount", "Plan", "Status", "Date"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-800/20">
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-indigo-900/20 transition-colors">
                    <td className="px-6 py-4 text-xs text-indigo-400 font-mono">{txn.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{txn.customer}</p>
                        <p className="text-xs text-indigo-500">{txn.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">${txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4"><PlanBadge plan={txn.plan} /></td>
                    <td className="px-6 py-4"><StatusBadge status={txn.status} /></td>
                    <td className="px-6 py-4 text-xs text-indigo-400">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-indigo-800/20">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="px-4 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{txn.customer}</p>
                    <p className="text-xs text-indigo-500">{txn.email}</p>
                  </div>
                  <p className="text-sm font-bold text-white">${txn.amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-indigo-500 font-mono">{txn.id}</span>
                  <PlanBadge plan={txn.plan} />
                  <StatusBadge status={txn.status} />
                  <span className="text-xs text-indigo-500">{txn.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom Stats Row ── */}
        <motion.div
          {...scrollReveal(staggerContainer)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: "Avg. Revenue Per User", value: "$7.05", change: 3.2, icon: DollarSign },
            { label: "Net Revenue Retention", value: "118%", change: 4.1, icon: TrendingUp },
            { label: "Lifetime Value", value: "$2,840", change: 8.6, icon: Star },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                {...(shouldReduceMotion ? {} : { variants: scaleIn })}
                className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-indigo-500">{stat.label}</p>
                  <p className="text-xl font-bold text-white mt-0.5">{stat.value}</p>
                </div>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}%
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
