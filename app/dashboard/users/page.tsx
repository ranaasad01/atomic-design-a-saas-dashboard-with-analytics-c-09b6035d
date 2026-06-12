"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ChevronDown, ChevronRight, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, User, Users, Activity, Star, Filter, Download, Check, Circle, AlertCircle, Clock } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const userGrowthData = [
  { month: "Jan", users: 1240 },
  { month: "Feb", users: 1580 },
  { month: "Mar", users: 1920 },
  { month: "Apr", users: 2340 },
  { month: "May", users: 2780 },
  { month: "Jun", users: 3120 },
  { month: "Jul", users: 3650 },
  { month: "Aug", users: 4210 },
  { month: "Sep", users: 4890 },
  { month: "Oct", users: 5430 },
  { month: "Nov", users: 6020 },
  { month: "Dec", users: 6780 },
];

interface UserRecord {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "active" | "churned" | "trial";
  joined: string;
  mrr: number;
  location: string;
  lastSeen: string;
}

const allUsers: UserRecord[] = [
  { id: "u001", name: "Sophia Hartwell", email: "sophia.hartwell@acme.io", plan: "Enterprise", status: "active", joined: "2024-01-08", mrr: 499, location: "San Francisco, CA", lastSeen: "2 min ago" },
  { id: "u002", name: "Marcus Chen", email: "m.chen@brightloop.com", plan: "Pro", status: "active", joined: "2024-01-15", mrr: 99, location: "New York, NY", lastSeen: "1 hr ago" },
  { id: "u003", name: "Priya Nair", email: "priya@devstudio.in", plan: "Starter", status: "trial", joined: "2024-02-03", mrr: 0, location: "Bangalore, IN", lastSeen: "3 hr ago" },
  { id: "u004", name: "James Okafor", email: "james.okafor@finvault.co", plan: "Enterprise", status: "active", joined: "2024-02-11", mrr: 499, location: "Lagos, NG", lastSeen: "5 min ago" },
  { id: "u005", name: "Elena Vasquez", email: "elena.v@cloudnine.es", plan: "Pro", status: "active", joined: "2024-02-19", mrr: 99, location: "Madrid, ES", lastSeen: "Yesterday" },
  { id: "u006", name: "Liam Thornton", email: "liam@thorntontech.uk", plan: "Starter", status: "churned", joined: "2024-03-01", mrr: 0, location: "London, UK", lastSeen: "2 weeks ago" },
  { id: "u007", name: "Aisha Kamara", email: "aisha.k@nexaflow.com", plan: "Pro", status: "active", joined: "2024-03-07", mrr: 99, location: "Nairobi, KE", lastSeen: "30 min ago" },
  { id: "u008", name: "Noah Bergström", email: "noah.b@polarbase.se", plan: "Enterprise", status: "active", joined: "2024-03-14", mrr: 499, location: "Stockholm, SE", lastSeen: "10 min ago" },
  { id: "u009", name: "Chloe Dupont", email: "chloe.dupont@lumiere.fr", plan: "Starter", status: "trial", joined: "2024-03-22", mrr: 0, location: "Paris, FR", lastSeen: "4 hr ago" },
  { id: "u010", name: "Ravi Patel", email: "ravi.patel@stackmind.io", plan: "Pro", status: "active", joined: "2024-04-02", mrr: 99, location: "Austin, TX", lastSeen: "1 hr ago" },
  { id: "u011", name: "Isabella Rossi", email: "i.rossi@milantech.it", plan: "Enterprise", status: "active", joined: "2024-04-09", mrr: 499, location: "Milan, IT", lastSeen: "20 min ago" },
  { id: "u012", name: "Ethan Kowalski", email: "ethan.k@bytecraft.pl", plan: "Starter", status: "active", joined: "2024-04-17", mrr: 29, location: "Warsaw, PL", lastSeen: "6 hr ago" },
  { id: "u013", name: "Fatima Al-Rashid", email: "fatima@horizonai.ae", plan: "Pro", status: "churned", joined: "2024-04-25", mrr: 0, location: "Dubai, AE", lastSeen: "1 month ago" },
  { id: "u014", name: "Oliver Müller", email: "o.muller@datahaus.de", plan: "Enterprise", status: "active", joined: "2024-05-03", mrr: 499, location: "Berlin, DE", lastSeen: "45 min ago" },
  { id: "u015", name: "Yuki Tanaka", email: "yuki.t@pixelcraft.jp", plan: "Pro", status: "active", joined: "2024-05-11", mrr: 99, location: "Tokyo, JP", lastSeen: "2 hr ago" },
  { id: "u016", name: "Amara Diallo", email: "amara.d@saheltech.sn", plan: "Starter", status: "trial", joined: "2024-05-19", mrr: 0, location: "Dakar, SN", lastSeen: "8 hr ago" },
  { id: "u017", name: "Lucas Ferreira", email: "lucas.f@codewave.br", plan: "Pro", status: "active", joined: "2024-05-27", mrr: 99, location: "São Paulo, BR", lastSeen: "3 hr ago" },
  { id: "u018", name: "Mia Johansson", email: "mia.j@nordicapps.se", plan: "Enterprise", status: "active", joined: "2024-06-04", mrr: 499, location: "Gothenburg, SE", lastSeen: "15 min ago" },
  { id: "u019", name: "Daniel Park", email: "d.park@seoulstack.kr", plan: "Starter", status: "active", joined: "2024-06-12", mrr: 29, location: "Seoul, KR", lastSeen: "1 day ago" },
  { id: "u020", name: "Zara Ahmed", email: "zara.ahmed@launchpad.pk", plan: "Pro", status: "trial", joined: "2024-06-20", mrr: 0, location: "Karachi, PK", lastSeen: "5 hr ago" },
  { id: "u021", name: "Henry Blackwood", email: "h.blackwood@vaultify.com", plan: "Enterprise", status: "active", joined: "2024-07-01", mrr: 499, location: "Chicago, IL", lastSeen: "8 min ago" },
  { id: "u022", name: "Nadia Petrov", email: "nadia.p@techbridge.ru", plan: "Pro", status: "churned", joined: "2024-07-09", mrr: 0, location: "Moscow, RU", lastSeen: "3 weeks ago" },
  { id: "u023", name: "Carlos Mendez", email: "c.mendez@latamhub.mx", plan: "Starter", status: "active", joined: "2024-07-17", mrr: 29, location: "Mexico City, MX", lastSeen: "2 hr ago" },
  { id: "u024", name: "Anya Sharma", email: "anya.s@growthlab.in", plan: "Pro", status: "active", joined: "2024-07-25", mrr: 99, location: "Mumbai, IN", lastSeen: "40 min ago" },
  { id: "u025", name: "Felix Wagner", email: "felix.w@alphacode.at", plan: "Enterprise", status: "active", joined: "2024-08-02", mrr: 499, location: "Vienna, AT", lastSeen: "1 hr ago" },
];

const kpiStats = [
  { label: "Total Users", value: "6,780", change: 12.4, icon: Users, color: "from-indigo-500 to-violet-600" },
  { label: "Active Users", value: "5,214", change: 8.7, icon: Activity, color: "from-emerald-500 to-teal-600" },
  { label: "Trial Users", value: "892", change: 23.1, icon: Clock, color: "from-amber-500 to-orange-600" },
  { label: "Churned Users", value: "674", change: -4.2, icon: AlertCircle, color: "from-rose-500 to-pink-600" },
];

type SortField = "name" | "plan" | "status" | "joined" | "mrr";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 8;

const planOrder: Record<string, number> = { Starter: 0, Pro: 1, Enterprise: 2 };
const statusOrder: Record<string, number> = { active: 0, trial: 1, churned: 2 };

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: UserRecord["status"] }) {
  const cfg = {
    active: { label: "Active", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: Check },
    trial: { label: "Trial", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: Clock },
    churned: { label: "Churned", cls: "bg-rose-500/15 text-rose-400 border-rose-500/30", icon: AlertCircle },
  }[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.cls}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function PlanBadge({ plan }: { plan: UserRecord["plan"] }) {
  const cfg = {
    Starter: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    Pro: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    Enterprise: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  }[plan];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cfg}`}>
      {plan}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = (name ?? "?")
    .split(" ")
    .map((p) => p[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colors = [
    "from-indigo-500 to-violet-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-sky-500 to-blue-600",
    "from-fuchsia-500 to-purple-600",
  ];
  const idx = (name ?? "").charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function UsersPage() {
  const shouldReduceMotion = useReducedMotion();

  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let rows = [...allUsers];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (u) =>
          (u.name ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q) ||
          (u.location ?? "").toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") rows = rows.filter((u) => u.plan === planFilter);
    if (statusFilter !== "All") rows = rows.filter((u) => u.status === statusFilter);

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = (a.name ?? "").localeCompare(b.name ?? "");
      else if (sortField === "plan") cmp = (planOrder[a.plan] ?? 0) - (planOrder[b.plan] ?? 0);
      else if (sortField === "status") cmp = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0);
      else if (sortField === "joined") cmp = (a.joined ?? "").localeCompare(b.joined ?? "");
      else if (sortField === "mrr") cmp = (a.mrr ?? 0) - (b.mrr ?? 0);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, planFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    setPage(1);
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowDown className="w-3.5 h-3.5 opacity-30" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
      : <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />;
  }

  const motionProps = (variants: object) =>
    shouldReduceMotion ? {} : { variants, initial: "hidden", animate: "visible" };

  return (
    <div className="min-h-screen bg-[#0f0e2a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── Header ── */}
        <motion.div
          {...(shouldReduceMotion ? {} : { variants: fadeInUp, initial: "hidden", animate: "visible" })}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Users</h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Manage and monitor all {allUsers.length} registered users across every plan.
            </p>
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-900/40 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {kpiStats.map((stat) => {
            const Icon = stat.icon;
            const isUp = stat.change >= 0;
            return (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                className="bg-[#1a1740]/80 border border-indigo-800/30 rounded-2xl p-5 shadow-xl shadow-indigo-950/30 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                    {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-indigo-400 mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Growth Chart ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#1a1740]/80 border border-indigo-800/30 rounded-2xl p-6 shadow-xl shadow-indigo-950/30"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">User Growth</h2>
              <p className="text-xs text-indigo-400 mt-0.5">Cumulative signups over the past 12 months</p>
            </div>
            <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
              +447% YoY
            </span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis dataKey="month" tick={{ fill: "#a5b4fc", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#a5b4fc", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(Number(v ?? 0) / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1e1b4b", border: "1px solid #4338ca", borderRadius: "12px", color: "#e0e7ff" }}
                  labelStyle={{ color: "#a5b4fc", fontWeight: 600 }}
                  formatter={(value: number) => [(value ?? 0).toLocaleString(), "Users"]}
                />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2.5} fill="url(#userGrad)" dot={false} activeDot={{ r: 5, fill: "#818cf8", stroke: "#1e1b4b", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="bg-[#1a1740]/80 border border-indigo-800/30 rounded-2xl p-5 shadow-xl shadow-indigo-950/30"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, email, or location…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-indigo-950/50 border border-indigo-700/40 rounded-xl text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all"
              />
            </div>

            {/* Plan Filter */}
            <div className="relative">
              <select
                value={planFilter}
                onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-9 py-2.5 bg-indigo-950/50 border border-indigo-700/40 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-9 py-2.5 bg-indigo-950/50 border border-indigo-700/40 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="churned">Churned</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-indigo-400 mt-3">
            Showing <span className="text-indigo-200 font-medium">{filtered.length}</span> of{" "}
            <span className="text-indigo-200 font-medium">{allUsers.length}</span> users
          </p>
        </motion.div>

        {/* ── Data Table ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="bg-[#1a1740]/80 border border-indigo-800/30 rounded-2xl shadow-xl shadow-indigo-950/30 overflow-hidden"
        >
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-indigo-800/40 bg-indigo-950/30">
                  {[
                    { label: "User", field: "name" as SortField },
                    { label: "Plan", field: "plan" as SortField },
                    { label: "Status", field: "status" as SortField },
                    { label: "Joined", field: "joined" as SortField },
                    { label: "MRR", field: "mrr" as SortField },
                  ].map(({ label, field }) => (
                    <th
                      key={field}
                      onClick={() => handleSort(field)}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider cursor-pointer hover:text-indigo-200 transition-colors select-none"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {label}
                        <SortIcon field={field} />
                      </span>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Last Seen
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {paginated.length === 0 ? (
                    <tr key="empty">
                      <td colSpan={6} className="px-5 py-16 text-center text-indigo-400 text-sm">
                        <User className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        No users match your current filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, idx) => (
                      <motion.tr
                        key={user.id}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? {} : { opacity: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(99,102,241,0.06)" }}
                        className="border-b border-indigo-800/20 last:border-0 transition-colors cursor-pointer"
                      >
                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={user.name ?? ""} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate">{user.name ?? "—"}</p>
                              <p className="text-xs text-indigo-400 truncate">{user.email ?? "—"}</p>
                            </div>
                          </div>
                        </td>
                        {/* Plan */}
                        <td className="px-5 py-4">
                          <PlanBadge plan={user.plan} />
                        </td>
                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge status={user.status} />
                        </td>
                        {/* Joined */}
                        <td className="px-5 py-4 text-sm text-indigo-300 whitespace-nowrap">
                          {new Date(user.joined ?? "").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        {/* MRR */}
                        <td className="px-5 py-4 text-sm font-semibold text-white whitespace-nowrap">
                          {(user.mrr ?? 0) > 0 ? `$${(user.mrr ?? 0).toLocaleString()}` : <span className="text-indigo-500">—</span>}
                        </td>
                        {/* Last Seen */}
                        <td className="px-5 py-4 text-xs text-indigo-400 whitespace-nowrap">
                          {user.lastSeen ?? "—"}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-indigo-800/30 bg-indigo-950/20">
            <p className="text-xs text-indigo-400">
              Page <span className="text-indigo-200 font-medium">{page}</span> of{" "}
              <span className="text-indigo-200 font-medium">{totalPages}</span> —{" "}
              <span className="text-indigo-200 font-medium">{filtered.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-800/30 hover:bg-indigo-700/40 border border-indigo-700/40 text-xs font-medium text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </motion.button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | "…")[]>((acc, p, i, arr) => {
                    if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === "…" ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-indigo-500 text-xs">…</span>
                    ) : (
                      <motion.button
                        key={item}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.93 }}
                        onClick={() => setPage(item as number)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                          page === item
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                            : "bg-indigo-800/30 hover:bg-indigo-700/40 text-indigo-300 border border-indigo-700/40"
                        }`}
                      >
                        {item}
                      </motion.button>
                    )
                  )}
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-800/30 hover:bg-indigo-700/40 border border-indigo-700/40 text-xs font-medium text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Plan Distribution ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { plan: "Starter", count: allUsers.filter((u) => u.plan === "Starter").length, pct: Math.round((allUsers.filter((u) => u.plan === "Starter").length / allUsers.length) * 100), color: "bg-slate-500", bar: "from-slate-500 to-slate-400" },
            { plan: "Pro", count: allUsers.filter((u) => u.plan === "Pro").length, pct: Math.round((allUsers.filter((u) => u.plan === "Pro").length / allUsers.length) * 100), color: "bg-indigo-500", bar: "from-indigo-500 to-violet-500" },
            { plan: "Enterprise", count: allUsers.filter((u) => u.plan === "Enterprise").length, pct: Math.round((allUsers.filter((u) => u.plan === "Enterprise").length / allUsers.length) * 100), color: "bg-violet-500", bar: "from-violet-500 to-fuchsia-500" },
          ].map((item) => (
            <motion.div
              key={item.plan}
              variants={shouldReduceMotion ? {} : scaleIn}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-[#1a1740]/80 border border-indigo-800/30 rounded-2xl p-5 shadow-xl shadow-indigo-950/30"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">{item.plan}</span>
                <span className="text-2xl font-bold text-white">{item.count}</span>
              </div>
              <div className="w-full h-2 bg-indigo-900/50 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.bar}`}
                />
              </div>
              <p className="text-xs text-indigo-400">{item.pct}% of total users</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}