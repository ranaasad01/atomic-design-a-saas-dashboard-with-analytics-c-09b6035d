"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, Search, Download, Filter } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const monthlyRevenue = [
  { name: "Jan", revenue: 42000, target: 40000, mrr: 38000 },
  { name: "Feb", revenue: 47500, target: 43000, mrr: 41000 },
  { name: "Mar", revenue: 51200, target: 46000, mrr: 44500 },
  { name: "Apr", revenue: 49800, target: 49000, mrr: 46000 },
  { name: "May", revenue: 55600, target: 52000, mrr: 49200 },
  { name: "Jun", revenue: 61300, target: 55000, mrr: 53800 },
  { name: "Jul", revenue: 58900, target: 58000, mrr: 56100 },
  { name: "Aug", revenue: 67400, target: 61000, mrr: 60300 },
  { name: "Sep", revenue: 72100, target: 64000, mrr: 64700 },
  { name: "Oct", revenue: 69800, target: 67000, mrr: 67200 },
  { name: "Nov", revenue: 78500, target: 70000, mrr: 71400 },
  { name: "Dec", revenue: 84200, target: 73000, mrr: 76800 },
];

interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
  method: string;
}

const transactions: Transaction[] = [
  { id: "TXN-8821", customer: "Acme Corp", email: "billing@acme.com", amount: 1299, status: "paid", date: "2024-12-18", plan: "Enterprise", method: "Visa •••• 4242" },
  { id: "TXN-8820", customer: "Sarah Mitchell", email: "sarah.m@techflow.io", amount: 299, status: "paid", date: "2024-12-18", plan: "Pro", method: "Mastercard •••• 5555" },
  { id: "TXN-8819", customer: "DataStream Inc", email: "accounts@datastream.co", amount: 1299, status: "pending", date: "2024-12-17", plan: "Enterprise", method: "Bank Transfer" },
  { id: "TXN-8818", customer: "Marcus Johnson", email: "marcus@growthlab.com", amount: 49, status: "paid", date: "2024-12-17", plan: "Starter", method: "Visa •••• 1234" },
  { id: "TXN-8817", customer: "Nexus Solutions", email: "finance@nexus.dev", amount: 299, status: "failed", date: "2024-12-16", plan: "Pro", method: "Amex •••• 3782" },
  { id: "TXN-8816", customer: "Elena Vasquez", email: "elena@pixelcraft.studio", amount: 49, status: "paid", date: "2024-12-16", plan: "Starter", method: "Visa •••• 9876" },
  { id: "TXN-8815", customer: "CloudBase Ltd", email: "ops@cloudbase.io", amount: 1299, status: "paid", date: "2024-12-15", plan: "Enterprise", method: "Mastercard •••• 7890" },
  { id: "TXN-8814", customer: "James Thornton", email: "j.thornton@launchpad.co", amount: 299, status: "paid", date: "2024-12-15", plan: "Pro", method: "Visa •••• 4567" },
  { id: "TXN-8813", customer: "Orbit Analytics", email: "billing@orbit.ai", amount: 1299, status: "pending", date: "2024-12-14", plan: "Enterprise", method: "Bank Transfer" },
  { id: "TXN-8812", customer: "Priya Sharma", email: "priya@designhub.in", amount: 49, status: "paid", date: "2024-12-14", plan: "Starter", method: "Visa •••• 2345" },
  { id: "TXN-8811", customer: "Velocity Media", email: "accounts@velocitymedia.com", amount: 299, status: "failed", date: "2024-12-13", plan: "Pro", method: "Mastercard •••• 6543" },
  { id: "TXN-8810", customer: "TechNova GmbH", email: "finance@technova.de", amount: 1299, status: "paid", date: "2024-12-13", plan: "Enterprise", method: "SEPA Transfer" },
  { id: "TXN-8809", customer: "Liam O'Brien", email: "liam@startupstack.ie", amount: 49, status: "paid", date: "2024-12-12", plan: "Starter", method: "Visa •••• 8901" },
  { id: "TXN-8808", customer: "Apex Ventures", email: "billing@apexvc.com", amount: 299, status: "paid", date: "2024-12-12", plan: "Pro", method: "Amex •••• 0005" },
  { id: "TXN-8807", customer: "Mira Patel", email: "mira.p@codeforge.dev", amount: 299, status: "pending", date: "2024-12-11", plan: "Pro", method: "Mastercard •••• 3344" },
];

const summaryCards = [
  {
    label: "Total Revenue (YTD)",
    value: 738300,
    prefix: "$",
    change: 24.6,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/25",
  },
  {
    label: "Monthly Recurring Revenue",
    value: 76800,
    prefix: "$",
    change: 7.6,
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    label: "Avg. Revenue Per User",
    value: 312,
    prefix: "$",
    change: 3.2,
    icon: CreditCard,
    color: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/25",
  },
  {
    label: "Churn Revenue Lost",
    value: 4200,
    prefix: "$",
    change: -8.4,
    icon: TrendingDown,
    color: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/25",
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e1b4b] border border-indigo-700/50 rounded-xl p-3 shadow-xl shadow-indigo-950/40 min-w-[160px]">
      <p className="text-indigo-300 text-xs font-semibold mb-2 uppercase tracking-wide">
        {label ?? ""}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <span className="text-xs text-indigo-300 flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
          </span>
          <span className="text-xs font-bold text-white">
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const config = {
    paid: {
      label: "Paid",
      icon: CheckCircle,
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    },
  };
  const { label, icon: Icon, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// ─── Plan Badge ───────────────────────────────────────────────────────────────

const PlanBadge = ({ plan }: { plan: string }) => {
  const config: Record<string, string> = {
    Starter: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    Pro: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    Enterprise: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config[plan] ?? "bg-slate-500/20 text-slate-300 border-slate-500/30"}`}
    >
      {plan}
    </span>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Transaction["status"]>("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filteredTransactions = (transactions ?? [])
    .filter((tx) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (tx.customer ?? "").toLowerCase().includes(q) ||
        (tx.email ?? "").toLowerCase().includes(q) ||
        (tx.id ?? "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "amount") {
        return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
      }
      return sortDir === "desc"
        ? (b.date ?? "").localeCompare(a.date ?? "")
        : (a.date ?? "").localeCompare(b.date ?? "");
    });

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const totalPaid = transactions
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1650] to-[#0f0c29] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Revenue
            </h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Track monthly performance, MRR trends, and transaction history.
            </p>
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-colors self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
        </motion.div>

        {/* ── Summary Cards ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {summaryCards.map((card) => {
            const Icon = card.icon;
            const isNegative = card.change < 0;
            return (
              <motion.div
                key={card.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5 group cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.shadow}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isNegative
                        ? "bg-rose-500/15 text-rose-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {isNegative ? (
                      <ArrowDownRight className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {card.prefix ?? ""}
                  {(card.value ?? 0).toLocaleString()}
                </p>
                <p className="text-sm text-indigo-300">{card.label}</p>
                <div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">
                Monthly Revenue vs Target
              </h2>
              <p className="text-sm text-indigo-300 mt-0.5">
                Full-year performance with MRR trend overlay
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-indigo-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-violet-400 inline-block" />
                Target
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-emerald-400 inline-block" />
                MRR
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart
              data={monthlyRevenue}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="mrrAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#312e81"
                strokeOpacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#a5b4fc", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#a5b4fc", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="url(#revenueGrad)"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="target"
                name="Target"
                fill="url(#targetGrad)"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                name="MRR"
                stroke="#34d399"
                strokeWidth={2.5}
                fill="url(#mrrAreaGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#34d399", stroke: "#fff", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
        >
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
              <p className="text-sm text-indigo-300 mt-0.5">
                {filteredTransactions.length} of {transactions.length} transactions
                {statusFilter !== "all" && ` · filtered by ${statusFilter}`}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search transactions…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 w-full sm:w-52 transition-all"
                />
              </div>
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
                {(["all", "paid", "pending", "failed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      statusFilter === s
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-indigo-300 hover:text-white hover:bg-white/5"
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
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider cursor-pointer select-none hover:text-indigo-200 transition-colors"
                    onClick={() => toggleSort("amount")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Amount
                      {sortField === "amount" ? (
                        sortDir === "desc" ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 opacity-30" />
                      )}
                    </span>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider cursor-pointer select-none hover:text-indigo-200 transition-colors"
                    onClick={() => toggleSort("date")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Date
                      {sortField === "date" ? (
                        sortDir === "desc" ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 opacity-30" />
                      )}
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={shouldReduceMotion ? {} : staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-indigo-400 text-sm">
                      No transactions match your search.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx, idx) => (
                    <motion.tr
                      key={tx.id}
                      variants={shouldReduceMotion ? {} : fadeIn}
                      whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(99,102,241,0.05)" }}
                      className="border-b border-white/5 last:border-0 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-semibold text-indigo-300">
                          {tx.id ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {tx.customer ?? "Unknown"}
                          </p>
                          <p className="text-xs text-indigo-400 mt-0.5">
                            {tx.email ?? ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <PlanBadge plan={tx.plan ?? "Starter"} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={tx.status ?? "pending"} />
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-white">
                          ${(tx.amount ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-indigo-300">
                          {tx.date ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-indigo-400 font-mono">
                          {tx.method ?? "—"}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-indigo-400">
              Showing {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-4 text-xs text-indigo-300">
              <span>
                Paid total:{" "}
                <span className="font-bold text-emerald-400">
                  ${totalPaid.toLocaleString()}
                </span>
              </span>
              <span>
                Pending:{" "}
                <span className="font-bold text-amber-400">
                  {transactions.filter((t) => t.status === "pending").length}
                </span>
              </span>
              <span>
                Failed:{" "}
                <span className="font-bold text-rose-400">
                  {transactions.filter((t) => t.status === "failed").length}
                </span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}