"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, ArrowUp, ArrowDown, Users, TrendingUp, Eye, MousePointer, Clock, Download, Filter, Calendar } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const timeRanges = ["7 days", "30 days", "90 days", "12 months"];

const trafficData = [
  { name: "Jan", sessions: 12400, pageviews: 34200, users: 8900 },
  { name: "Feb", sessions: 14800, pageviews: 39100, users: 10200 },
  { name: "Mar", sessions: 13200, pageviews: 36800, users: 9400 },
  { name: "Apr", sessions: 17600, pageviews: 48300, users: 12800 },
  { name: "May", sessions: 19200, pageviews: 52100, users: 14100 },
  { name: "Jun", sessions: 22400, pageviews: 61700, users: 16300 },
  { name: "Jul", sessions: 21100, pageviews: 58400, users: 15600 },
  { name: "Aug", sessions: 24800, pageviews: 67200, users: 18200 },
  { name: "Sep", sessions: 26300, pageviews: 71800, users: 19700 },
  { name: "Oct", sessions: 28900, pageviews: 78400, users: 21400 },
  { name: "Nov", sessions: 31200, pageviews: 84600, users: 23100 },
  { name: "Dec", sessions: 34700, pageviews: 93200, users: 25800 },
];

const conversionData = [
  { name: "Jan", rate: 2.4, leads: 320, conversions: 77 },
  { name: "Feb", rate: 2.8, leads: 410, conversions: 115 },
  { name: "Mar", rate: 2.6, leads: 380, conversions: 99 },
  { name: "Apr", rate: 3.1, leads: 490, conversions: 152 },
  { name: "May", rate: 3.4, leads: 540, conversions: 184 },
  { name: "Jun", rate: 3.8, leads: 620, conversions: 236 },
  { name: "Jul", rate: 3.6, leads: 590, conversions: 212 },
  { name: "Aug", rate: 4.1, leads: 680, conversions: 279 },
  { name: "Sep", rate: 4.3, leads: 720, conversions: 310 },
  { name: "Oct", rate: 4.7, leads: 790, conversions: 371 },
  { name: "Nov", rate: 5.0, leads: 840, conversions: 420 },
  { name: "Dec", rate: 5.4, leads: 920, conversions: 497 },
];

const channelData = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#a78bfa" },
  { name: "Social Media", value: 12, color: "#c4b5fd" },
  { name: "Email", value: 8, color: "#ddd6fe" },
];

const deviceData = [
  { name: "Mon", desktop: 4200, mobile: 3100, tablet: 820 },
  { name: "Tue", desktop: 4800, mobile: 3600, tablet: 940 },
  { name: "Wed", desktop: 5100, mobile: 3900, tablet: 1020 },
  { name: "Thu", desktop: 4600, mobile: 3400, tablet: 890 },
  { name: "Fri", desktop: 5400, mobile: 4100, tablet: 1100 },
  { name: "Sat", desktop: 3200, mobile: 4800, tablet: 760 },
  { name: "Sun", desktop: 2900, mobile: 4400, tablet: 680 },
];

const topPages = [
  { path: "/dashboard", title: "Dashboard Overview", views: 48320, bounce: "24%", avgTime: "4m 12s", change: 12.4 },
  { path: "/dashboard/analytics", title: "Analytics", views: 31240, bounce: "31%", avgTime: "6m 48s", change: 18.7 },
  { path: "/dashboard/revenue", title: "Revenue", views: 27890, bounce: "28%", avgTime: "5m 33s", change: 9.2 },
  { path: "/dashboard/users", title: "Users", views: 22140, bounce: "35%", avgTime: "3m 57s", change: -3.1 },
  { path: "/pricing", title: "Pricing", views: 19870, bounce: "42%", avgTime: "2m 14s", change: 22.6 },
  { path: "/sign-in", title: "Sign In", views: 16540, bounce: "18%", avgTime: "1m 42s", change: 7.8 },
  { path: "/dashboard/settings", title: "Settings", views: 11230, bounce: "29%", avgTime: "4m 05s", change: -1.4 },
];

const kpiStats = [
  {
    label: "Total Sessions",
    value: "246,800",
    change: 18.4,
    icon: Activity,
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "Unique Visitors",
    value: "184,300",
    change: 14.2,
    icon: Users,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    label: "Avg. Session Duration",
    value: "4m 38s",
    change: 6.8,
    icon: Clock,
    color: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    label: "Bounce Rate",
    value: "28.4%",
    change: -3.2,
    icon: MousePointer,
    color: "from-fuchsia-500 to-pink-600",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
  },
  {
    label: "Page Views",
    value: "703,800",
    change: 21.6,
    icon: Eye,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    label: "Conversion Rate",
    value: "5.4%",
    change: 29.2,
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
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
    <div className="bg-[#1e1b4b]/95 backdrop-blur-sm border border-indigo-700/40 rounded-xl p-3 shadow-xl shadow-indigo-950/40">
      <p className="text-indigo-300 text-xs font-medium mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur-sm border border-indigo-700/40 rounded-xl p-3 shadow-xl shadow-indigo-950/40">
      <div className="flex items-center gap-2 text-xs">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: item?.payload?.color ?? "#6366f1" }}
        />
        <span className="text-indigo-200">{item?.name ?? ""}:</span>
        <span className="text-white font-semibold">{item?.value ?? 0}%</span>
      </div>
    </div>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("12 months");
  const [activeChart, setActiveChart] = useState<"traffic" | "conversion">("traffic");
  const shouldReduceMotion = useReducedMotion();

  const mv = (variants: Variants): Variants => (shouldReduceMotion ? {} : variants);

  return (
    <main className="min-h-screen bg-[#0f0d2e] text-white">
      {/* ── Page Header ── */}
      <section className="bg-gradient-to-b from-[#1e1b4b] to-[#0f0d2e] border-b border-indigo-800/30 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <motion.div variants={mv(fadeInUp)}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                  Analytics
                </h1>
              </div>
              <p className="text-indigo-300/70 text-sm">
                Track your website performance and user behavior
              </p>
            </motion.div>

            <motion.div variants={mv(fadeInUp)} className="flex items-center gap-3">
              {/* Time range selector */}
              <div className="flex items-center gap-1 bg-indigo-950/60 border border-indigo-700/30 rounded-xl p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedRange === range
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-indigo-300 hover:text-white hover:bg-indigo-800/40"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-indigo-950/60 border border-indigo-700/30 rounded-xl text-indigo-300 hover:text-white hover:border-indigo-500/50 transition-all duration-200 text-xs font-medium">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all duration-200 text-xs font-medium shadow-lg shadow-indigo-500/25">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── KPI Cards ── */}
        <motion.div
          variants={mv(staggerContainer)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {kpiStats.map((stat) => {
            const Icon = stat.icon;
            const isNegChange = stat.change < 0;
            return (
              <motion.div
                key={stat.label}
                variants={mv(scaleIn)}
                className={`relative overflow-hidden rounded-2xl border ${stat.border} ${stat.bg} p-4 backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      isNegChange ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {isNegChange ? (
                      <ArrowDown className="w-3 h-3" />
                    ) : (
                      <ArrowUp className="w-3 h-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-xl font-bold text-white mb-0.5">{stat.value}</p>
                <p className="text-indigo-300/70 text-xs">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Traffic / Conversion Chart ── */}
        <motion.div
          variants={mv(fadeIn)}
          initial="hidden"
          animate="show"
          className="bg-indigo-950/40 border border-indigo-700/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Performance Overview</h2>
              <p className="text-indigo-300/60 text-sm mt-0.5">{selectedRange} of data</p>
            </div>
            <div className="flex items-center gap-1 bg-indigo-950/60 border border-indigo-700/30 rounded-xl p-1">
              {(["traffic", "conversion"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveChart(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                    activeChart === tab
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-300 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {activeChart === "traffic" ? (
              <AreaChart data={trafficData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#a5b4fc" }} />
                <Area type="monotone" dataKey="sessions" stroke="#6366f1" strokeWidth={2} fill="url(#sessions)" />
                <Area type="monotone" dataKey="pageviews" stroke="#8b5cf6" strokeWidth={2} fill="url(#pageviews)" />
                <Area type="monotone" dataKey="users" stroke="#a78bfa" strokeWidth={2} fill="url(#users)" />
              </AreaChart>
            ) : (
              <LineChart data={conversionData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#a5b4fc" }} />
                <Line type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="conversions" stroke="#a78bfa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rate" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        {/* ── Channel + Device Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            animate="show"
            className="bg-indigo-950/40 border border-indigo-700/30 rounded-2xl p-6 backdrop-blur-sm"
          >
            <h2 className="text-lg font-bold text-white mb-1">Traffic Channels</h2>
            <p className="text-indigo-300/60 text-sm mb-6">Distribution by source</p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1">
                {channelData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-indigo-200 text-xs">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-indigo-900/60 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.value}%`, backgroundColor: item.color }}
                        />
                      </div>
                      <span className="text-white text-xs font-semibold w-8 text-right">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            variants={mv(fadeInUp)}
            initial="hidden"
            animate="show"
            className="bg-indigo-950/40 border border-indigo-700/30 rounded-2xl p-6 backdrop-blur-sm"
          >
            <h2 className="text-lg font-bold text-white mb-1">Device Breakdown</h2>
            <p className="text-indigo-300/60 text-sm mb-6">Sessions by device type</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={deviceData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#818cf8", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#a5b4fc" }} />
                <Bar dataKey="desktop" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mobile" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tablet" fill="#a78bfa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Top Pages Table ── */}
        <motion.div
          variants={mv(fadeInUp)}
          initial="hidden"
          animate="show"
          className="bg-indigo-950/40 border border-indigo-700/30 rounded-2xl overflow-hidden backdrop-blur-sm"
        >
          <div className="px-6 py-5 border-b border-indigo-700/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Top Pages</h2>
              <p className="text-indigo-300/60 text-sm mt-0.5">Most visited pages this period</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/60 border border-indigo-700/30 rounded-lg text-indigo-300 hover:text-white transition-colors text-xs">
              <Calendar className="w-3.5 h-3.5" />
              View all pages
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-800/30">
                  <th className="text-left px-6 py-3 text-indigo-400 text-xs font-medium">Page</th>
                  <th className="text-right px-6 py-3 text-indigo-400 text-xs font-medium">Views</th>
                  <th className="text-right px-6 py-3 text-indigo-400 text-xs font-medium hidden sm:table-cell">Bounce</th>
                  <th className="text-right px-6 py-3 text-indigo-400 text-xs font-medium hidden md:table-cell">Avg. Time</th>
                  <th className="text-right px-6 py-3 text-indigo-400 text-xs font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <tr
                    key={page.path}
                    className={`border-b border-indigo-800/20 hover:bg-indigo-900/20 transition-colors ${
                      i === topPages.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white text-sm font-medium">{page.title}</p>
                        <p className="text-indigo-400/60 text-xs mt-0.5">{page.path}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white text-sm font-semibold">{page.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right hidden sm:table-cell">
                      <span className="text-indigo-300 text-sm">{page.bounce}</span>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell">
                      <span className="text-indigo-300 text-sm">{page.avgTime}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          page.change < 0 ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {page.change < 0 ? (
                          <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUp className="w-3 h-3" />
                        )}
                        {Math.abs(page.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
