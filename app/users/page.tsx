"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Search, Filter, Download, UserPlus, TrendingUp, TrendingDown, ChevronUp, ChevronDown, ArrowUpDown, Star, Activity, AlertCircle, Check, Clock, Mail, Calendar } from 'lucide-react';
import {
  AreaChart,
  Area,
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
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiStats = [
  {
    label: "Total Users",
    value: "12,847",
    change: 14.2,
    icon: Users,
    color: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "9,312",
    change: 8.7,
    icon: Activity,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
  {
    label: "New This Month",
    value: "1,204",
    change: 22.1,
    icon: UserPlus,
    color: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/20",
  },
  {
    label: "Churned Users",
    value: "183",
    change: -5.4,
    icon: AlertCircle,
    color: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/20",
  },
];

const growthData = [
  { name: "Jan", users: 7200, active: 5100, churned: 210 },
  { name: "Feb", users: 7850, active: 5600, churned: 195 },
  { name: "Mar", users: 8400, active: 6100, churned: 220 },
  { name: "Apr", users: 9100, active: 6700, churned: 180 },
  { name: "May", users: 9800, active: 7200, churned: 165 },
  { name: "Jun", users: 10500, active: 7800, churned: 190 },
  { name: "Jul", users: 11200, active: 8300, churned: 175 },
  { name: "Aug", users: 11800, active: 8700, churned: 200 },
  { name: "Sep", users: 12200, active: 9000, churned: 185 },
  { name: "Oct", users: 12847, active: 9312, churned: 183 },
];

const planDistribution = [
  { name: "Starter", value: 5420, color: "#6366f1" },
  { name: "Pro", value: 4890, color: "#8b5cf6" },
  { name: "Enterprise", value: 2537, color: "#06b6d4" },
];

interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "active" | "churned" | "trial";
  joined: string;
  mrr: number;
  lastSeen: string;
  country: string;
}

const mockUsers: UserRow[] = [
  {
    id: "u001",
    name: "Sophia Hartwell",
    email: "sophia.hartwell@acme.io",
    plan: "Enterprise",
    status: "active",
    joined: "2023-01-15",
    mrr: 499,
    lastSeen: "2 min ago",
    country: "US",
  },
  {
    id: "u002",
    name: "Marcus Chen",
    email: "m.chen@growthlab.co",
    plan: "Pro",
    status: "active",
    joined: "2023-03-22",
    mrr: 99,
    lastSeen: "1 hr ago",
    country: "SG",
  },
  {
    id: "u003",
    name: "Priya Nair",
    email: "priya@startupstack.in",
    plan: "Starter",
    status: "trial",
    joined: "2024-09-01",
    mrr: 0,
    lastSeen: "3 hr ago",
    country: "IN",
  },
  {
    id: "u004",
    name: "James Okafor",
    email: "james.o@techbridge.ng",
    plan: "Pro",
    status: "active",
    joined: "2023-07-10",
    mrr: 99,
    lastSeen: "Yesterday",
    country: "NG",
  },
  {
    id: "u005",
    name: "Elena Vasquez",
    email: "elena.v@cloudpeak.es",
    plan: "Enterprise",
    status: "active",
    joined: "2022-11-30",
    mrr: 499,
    lastSeen: "5 min ago",
    country: "ES",
  },
  {
    id: "u006",
    name: "Liam Fitzgerald",
    email: "liam.f@devhub.ie",
    plan: "Starter",
    status: "churned",
    joined: "2023-05-18",
    mrr: 0,
    lastSeen: "14 days ago",
    country: "IE",
  },
  {
    id: "u007",
    name: "Aiko Tanaka",
    email: "aiko.t@nexustech.jp",
    plan: "Pro",
    status: "active",
    joined: "2023-09-04",
    mrr: 99,
    lastSeen: "30 min ago",
    country: "JP",
  },
  {
    id: "u008",
    name: "Carlos Mendez",
    email: "carlos.m@launchpad.mx",
    plan: "Starter",
    status: "active",
    joined: "2024-01-20",
    mrr: 29,
    lastSeen: "2 hr ago",
    country: "MX",
  },
  {
    id: "u009",
    name: "Fatima Al-Rashid",
    email: "fatima.r@scalehq.ae",
    plan: "Enterprise",
    status: "active",
    joined: "2022-08-14",
    mrr: 499,
    lastSeen: "Just now",
    country: "AE",
  },
  {
    id: "u010",
    name: "Noah Williams",
    email: "noah.w@buildfast.ca",
    plan: "Pro",
    status: "trial",
    joined: "2024-10-01",
    mrr: 0,
    lastSeen: "4 hr ago",
    country: "CA",
  },
  {
    id: "u011",
    name: "Ingrid Larsson",
    email: "ingrid.l@nordicapps.se",
    plan: "Pro",
    status: "active",
    joined: "2023-06-25",
    mrr: 99,
    lastSeen: "Yesterday",
    country: "SE",
  },
  {
    id: "u012",
    name: "Kwame Asante",
    email: "kwame.a@techghana.gh",
    plan: "Starter",
    status: "churned",
    joined: "2023-02-11",
    mrr: 0,
    lastSeen: "21 days ago",
    country: "GH",
  },
];

type SortField = "name" | "plan" | "status" | "joined" | "mrr" | "lastSeen";
type SortDir = "asc" | "desc";

const planOrder: Record<string, number> = { Starter: 0, Pro: 1, Enterprise: 2 };
const statusOrder: Record<string, number> = { active: 0, trial: 1, churned: 2 };

const planBadge: Record<string, string> = {
  Starter: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
  Pro: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
  Enterprise: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
};

const statusBadge: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  trial: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  churned: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
};

const statusIcon: Record<string, React.ReactNode> = {
  active: <Check className="w-3 h-3" />,
  trial: <Clock className="w-3 h-3" />,
  churned: <AlertCircle className="w-3 h-3" />,
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur border border-indigo-700/40 rounded-xl p-3 shadow-xl text-xs">
      <p className="text-indigo-300 font-semibold mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-bold">
            {(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const shouldReduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredUsers = useMemo(() => {
    let rows = [...mockUsers];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (u) =>
          (u.name ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q) ||
          (u.country ?? "").toLowerCase().includes(q)
      );
    }

    if (filterPlan !== "All") {
      rows = rows.filter((u) => u.plan === filterPlan);
    }

    if (filterStatus !== "All") {
      rows = rows.filter((u) => u.status === filterStatus);
    }

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") {
        cmp = (a.name ?? "").localeCompare(b.name ?? "");
      } else if (sortField === "plan") {
        cmp = (planOrder[a.plan] ?? 0) - (planOrder[b.plan] ?? 0);
      } else if (sortField === "status") {
        cmp = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0);
      } else if (sortField === "joined") {
        cmp = (a.joined ?? "").localeCompare(b.joined ?? "");
      } else if (sortField === "mrr") {
        cmp = (a.mrr ?? 0) - (b.mrr ?? 0);
      } else if (sortField === "lastSeen") {
        cmp = (a.lastSeen ?? "").localeCompare(b.lastSeen ?? "");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [search, filterPlan, filterStatus, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-indigo-300" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-indigo-300" />
    );
  };

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
              User Management
            </h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Track, segment, and manage every user across your platform.
            </p>
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
          >
            <UserPlus className="w-4 h-4" />
            Invite User
          </motion.button>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {kpiStats.map((stat) => {
            const Icon = stat.icon;
            const isUp = stat.change >= 0;
            return (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={
                  shouldReduceMotion ? {} : { y: -4, scale: 1.02 }
                }
                className={`relative overflow-hidden rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-5 shadow-lg ${stat.shadow}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isUp
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-rose-500/15 text-rose-300"
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-indigo-400">{stat.label}</p>
                <div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-xl`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
        >
          {/* Growth Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="lg:col-span-2 rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  User Growth
                </h2>
                <p className="text-xs text-indigo-400 mt-0.5">
                  Total, active & churned over 10 months
                </p>
              </div>
              <span className="text-xs text-indigo-400 bg-indigo-800/30 px-3 py-1 rounded-full border border-indigo-700/30">
                Jan – Oct 2024
              </span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart
                data={growthData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradChurned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#312e81"
                  strokeOpacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#818cf8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#818cf8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Total"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#gradUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gradActive)"
                />
                <Area
                  type="monotone"
                  dataKey="churned"
                  name="Churned"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#gradChurned)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="rounded-2xl bg-[#1a1740] border border-indigo-800/30 p-6 shadow-lg flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">
                Plan Distribution
              </h2>
              <p className="text-xs text-indigo-400 mt-0.5">
                Users by subscription tier
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {planDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
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
                      <span style={{ color: "#a5b4fc", fontSize: "12px" }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {planDistribution.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="text-indigo-300">{p.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {(p.value ?? 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Users Table ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-[#1a1740] border border-indigo-800/30 shadow-lg overflow-hidden"
        >
          {/* Table Header / Filters */}
          <div className="p-5 border-b border-indigo-800/30 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-white">
                All Users
              </h2>
              <span className="text-xs text-indigo-400 bg-indigo-800/30 px-2 py-0.5 rounded-full border border-indigo-700/30">
                {filteredUsers.length} results
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Search users…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-2 text-xs rounded-lg bg-indigo-900/40 border border-indigo-700/40 text-white placeholder-indigo-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition"
                />
              </div>

              {/* Plan Filter */}
              <div className="relative">
                <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-indigo-400 pointer-events-none" />
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="pl-7 pr-3 py-2 text-xs rounded-lg bg-indigo-900/40 border border-indigo-700/40 text-indigo-200 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="All">All Plans</option>
                  <option value="Starter">Starter</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-indigo-900/40 border border-indigo-700/40 text-indigo-200 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="churned">Churned</option>
                </select>
              </div>

              {/* Export */}
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-indigo-800/40 border border-indigo-700/40 text-indigo-300 hover:text-white hover:bg-indigo-700/50 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </motion.button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-indigo-800/30">
                  {[
                    { label: "User", field: "name" as SortField },
                    { label: "Plan", field: "plan" as SortField },
                    { label: "Status", field: "status" as SortField },
                    { label: "MRR", field: "mrr" as SortField },
                    { label: "Joined", field: "joined" as SortField },
                    { label: "Last Seen", field: "lastSeen" as SortField },
                  ].map((col) => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className="text-left px-5 py-3.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider cursor-pointer hover:text-indigo-200 transition select-none whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon field={col.field} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filteredUsers ?? []).map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { backgroundColor: "rgba(99,102,241,0.06)" }
                    }
                    className="border-b border-indigo-800/20 last:border-0 transition-colors"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-md shadow-indigo-500/20">
                          {(user.name ?? "?")
                            .split(" ")
                            .map((n) => n[0] ?? "")
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm leading-tight">
                            {user.name ?? "—"}
                          </p>
                          <p className="text-indigo-400 text-xs flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {user.email ?? "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          planBadge[user.plan] ?? ""
                        }`}
                      >
                        <Star className="w-3 h-3" />
                        {user.plan ?? "—"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          statusBadge[user.status] ?? ""
                        }`}
                      >
                        {statusIcon[user.status] ?? null}
                        <span className="capitalize">{user.status ?? "—"}</span>
                      </span>
                    </td>

                    {/* MRR */}
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold">
                        {(user.mrr ?? 0) > 0
                          ? `$${(user.mrr ?? 0).toLocaleString()}`
                          : "—"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4">
                      <span className="text-indigo-300 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {user.joined ?? "—"}
                      </span>
                    </td>

                    {/* Last Seen */}
                    <td className="px-5 py-4">
                      <span className="text-indigo-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {user.lastSeen ?? "—"}
                      </span>
                    </td>
                  </motion.tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-indigo-500">
                        <Users className="w-10 h-10 opacity-40" />
                        <p className="text-sm font-medium">No users found</p>
                        <p className="text-xs opacity-70">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3.5 border-t border-indigo-800/30 flex items-center justify-between">
            <p className="text-xs text-indigo-500">
              Showing{" "}
              <span className="text-indigo-300 font-medium">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="text-indigo-300 font-medium">
                {mockUsers.length}
              </span>{" "}
              users
            </p>
            <div className="flex items-center gap-1">
              {["1", "2", "3"].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                    p === "1"
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-400 hover:bg-indigo-800/40 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}