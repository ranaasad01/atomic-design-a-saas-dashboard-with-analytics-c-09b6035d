"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
import { Activity, Users, TrendingUp, TrendingDown, Globe, Smartphone, Monitor, Mail, ArrowUpRight, ArrowDownRight, BarChart2, Eye, MousePointerClick, Clock } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const activeUsersData = [
  { name: "Jan", users: 4200, sessions: 6800, pageViews: 18400 },
  { name: "Feb", users: 5100, sessions: 7900, pageViews: 21200 },
  { name: "Mar", users: 4800, sessions: 7400, pageViews: 19800 },
  { name: "Apr", users: 6300, sessions: 9600, pageViews: 26100 },
  { name: "May", users: 7200, sessions: 11200, pageViews: 30400 },
  { name: "Jun", users: 6800, sessions: 10400, pageViews: 28600 },
  { name: "Jul", users: 8100, sessions: 12800, pageViews: 34200 },
  { name: "Aug", users: 9400, sessions: 14600, pageViews: 39800 },
  { name: "Sep", users: 8700, sessions: 13400, pageViews: 36200 },
  { name: "Oct", users: 10200, sessions: 16100, pageViews: 43600 },
  { name: "Nov", users: 11800, sessions: 18400, pageViews: 49800 },
  { name: "Dec", users: 13200, sessions: 20600, pageViews: 55400 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#a78bfa" },
  { name: "Social Media", value: 12, color: "#c4b5fd" },
  { name: "Email", value: 8, color: "#ddd6fe" },
];

const revenueSourceData = [
  { name: "Pro Plan", value: 45, color: "#6366f1" },
  { name: "Enterprise", value: 30, color: "#8b5cf6" },
  { name: "Starter", value: 15, color: "#a78bfa" },
  { name: "Add-ons", value: 10, color: "#c4b5fd" },
];

const topPagesData = [
  { page: "/dashboard", views: 48200, sessions: 32100, bounce: 18.4, change: 12.3 },
  { page: "/dashboard/analytics", views: 31600, sessions: 21400, bounce: 22.1, change: 8.7 },
  { page: "/dashboard/revenue", views: 24800, sessions: 16900, bounce: 25.6, change: -3.2 },
  { page: "/dashboard/users", views: 19200, sessions: 13100, bounce: 28.9, change: 15.4 },
  { page: "/pricing", views: 15400, sessions: 10800, bounce: 42.3, change: 6.1 },
  { page: "/sign-in", views: 12600, sessions: 9200, bounce: 35.7, change: -1.8 },
  { page: "/dashboard/settings", views: 8900, sessions: 6400, bounce: 19.2, change: 4.5 },
];

const deviceData = [
  { device: "Desktop", icon: Monitor, percentage: 58, sessions: 42800, color: "from-indigo-500 to-indigo-600" },
  { device: "Mobile", icon: Smartphone, percentage: 34, sessions: 25100, color: "from-violet-500 to-violet-600" },
  { device: "Tablet", icon: Globe, percentage: 8, sessions: 5900, color: "from-purple-500 to-purple-600" },
];

const summaryStats = [
  { label: "Total Sessions", value: "73,800", change: 14.2, icon: Activity, suffix: "" },
  { label: "Unique Visitors", value: "48,400", change: 9.8, icon: Users, suffix: "" },
  { label: "Avg. Session Duration", value: "4m 32s", change: 6.3, icon: Clock, suffix: "" },
  { label: "Total Page Views", value: "403,500", change: 18.7, icon: Eye, suffix: "" },
  { label: "Click-Through Rate", value: "3.84%", change: -1.2, icon: MousePointerClick, suffix: "" },
  { label: "Conversion Rate", value: "7.21%", change: 2.4, icon: TrendingUp, suffix: "" },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomAreaTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur-md border border-indigo-700/40 rounded-xl p-3 shadow-xl shadow-indigo-950/40">
      <p className="text-indigo-300 text-xs font-semibold mb-2 uppercase tracking-wide">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-indigo-200 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color: string } }[] }) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-[#1e1b4b]/95 backdrop-blur-md border border-indigo-700/40 rounded-xl p-3 shadow-xl shadow-indigo-950/40">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item?.payload?.color ?? "#6366f1" }} />
        <span className="text-indigo-200">{item?.name ?? ""}:</span>
        <span className="text-white font-semibold">{(item?.value ?? 0)}%</span>
      </div>
    </div>
  );
}

// ─── Custom Legend ────────────────────────────────────────────────────────────

function DonutLegend({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {(data ?? []).map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-indigo-300 text-xs">{entry.name ?? ""}</span>
          </div>
          <span className="text-white text-xs font-semibold">{entry.value ?? 0}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeMetric, setActiveMetric] = useState<"users" | "sessions" | "pageViews">("users");
  const [activeDonut, setActiveDonut] = useState<"traffic" | "revenue">("traffic");

  const metricConfig = {
    users: { label: "Active Users", color: "#6366f1", gradient: "url(#usersGradient)" },
    sessions: { label: "Sessions", color: "#8b5cf6", gradient: "url(#sessionsGradient)" },
    pageViews: { label: "Page Views", color: "#a78bfa", gradient: "url(#pageViewsGradient)" },
  };

  const donutData = activeDonut === "traffic" ? trafficSourceData : revenueSourceData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1640] to-[#0f0c29] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
            <p className="text-indigo-300 mt-1 text-sm">
              Deep-dive into user behavior, traffic sources, and engagement trends.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-indigo-400 bg-indigo-900/40 border border-indigo-700/30 rounded-lg px-3 py-1.5">
              Last 12 months
            </span>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="text-xs text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg px-4 py-1.5 font-medium transition-colors"
            >
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── Summary Stats Row ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {(summaryStats ?? []).map((stat) => {
            const Icon = stat.icon;
            const isPositive = (stat.change ?? 0) >= 0;
            return (
              <motion.div
                key={stat.label}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-4 backdrop-blur-sm hover:border-indigo-600/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(stat.change ?? 0)}%
                  </span>
                </div>
                <p className="text-white font-bold text-lg leading-tight">{stat.value ?? "—"}</p>
                <p className="text-indigo-400 text-xs mt-0.5 leading-tight">{stat.label ?? ""}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Area Chart ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" />
                Active Users Trend
              </h2>
              <p className="text-indigo-400 text-sm mt-0.5">Monthly engagement across all channels</p>
            </div>
            <div className="flex items-center gap-1 bg-indigo-900/40 border border-indigo-700/30 rounded-xl p-1">
              {(["users", "sessions", "pageViews"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setActiveMetric(metric)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeMetric === metric
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-indigo-300 hover:text-white"
                  }`}
                >
                  {metricConfig[metric]?.label ?? metric}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeUsersData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#312e81" strokeOpacity={0.4} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#a5b4fc", fontSize: 11 }}
                  axisLine={{ stroke: "#312e81" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#a5b4fc", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={metricConfig[activeMetric]?.color ?? "#6366f1"}
                  strokeWidth={2.5}
                  fill={metricConfig[activeMetric]?.gradient ?? "url(#usersGradient)"}
                  dot={false}
                  activeDot={{ r: 5, fill: metricConfig[activeMetric]?.color ?? "#6366f1", stroke: "#1e1b4b", strokeWidth: 2 }}
                  animationDuration={shouldReduceMotion ? 0 : 1200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Donut Chart + Device Breakdown ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Donut Chart */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-white font-semibold text-lg">Source Breakdown</h2>
                <p className="text-indigo-400 text-sm mt-0.5">Where your users come from</p>
              </div>
              <div className="flex items-center gap-1 bg-indigo-900/40 border border-indigo-700/30 rounded-xl p-1">
                {(["traffic", "revenue"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDonut(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                      activeDonut === tab
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-indigo-300 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-48 h-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={shouldReduceMotion ? 0 : 900}
                    >
                      {(donutData ?? []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color ?? "#6366f1"} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 w-full">
                <DonutLegend data={donutData} />
              </div>
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="mb-4">
              <h2 className="text-white font-semibold text-lg">Device Distribution</h2>
              <p className="text-indigo-400 text-sm mt-0.5">Sessions by device type this period</p>
            </div>

            <div className="space-y-5">
              {(deviceData ?? []).map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.device}
                    whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color ?? "from-indigo-500 to-indigo-600"} flex items-center justify-center shadow-md`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{item.device ?? ""}</p>
                          <p className="text-indigo-400 text-xs">{(item.sessions ?? 0).toLocaleString()} sessions</p>
                        </div>
                      </div>
                      <span className="text-white font-bold text-sm">{item.percentage ?? 0}%</span>
                    </div>
                    <div className="h-2 bg-indigo-900/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage ?? 0}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut", delay: 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color ?? "from-indigo-500 to-indigo-600"}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Avg. Load Time", value: "1.4s" },
                { label: "Bounce Rate", value: "26.8%" },
                { label: "New vs Return", value: "62/38" },
              ].map((s) => (
                <div key={s.label} className="bg-indigo-900/30 border border-indigo-800/20 rounded-xl p-3 text-center">
                  <p className="text-white font-bold text-sm">{s.value ?? ""}</p>
                  <p className="text-indigo-400 text-xs mt-0.5 leading-tight">{s.label ?? ""}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Top Pages Table ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                Top Pages
              </h2>
              <p className="text-indigo-400 text-sm mt-0.5">Most visited pages ranked by total views</p>
            </div>
            <span className="text-xs text-indigo-400 bg-indigo-900/40 border border-indigo-700/30 rounded-lg px-3 py-1.5 w-fit">
              {(topPagesData ?? []).length} pages tracked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-indigo-800/30">
                  <th className="text-left text-indigo-400 font-medium pb-3 pr-4">Page</th>
                  <th className="text-right text-indigo-400 font-medium pb-3 px-4">Views</th>
                  <th className="text-right text-indigo-400 font-medium pb-3 px-4">Sessions</th>
                  <th className="text-right text-indigo-400 font-medium pb-3 px-4">Bounce Rate</th>
                  <th className="text-right text-indigo-400 font-medium pb-3 pl-4">Change</th>
                </tr>
              </thead>
              <tbody>
                {(topPagesData ?? []).map((row, i) => {
                  const isPositive = (row.change ?? 0) >= 0;
                  return (
                    <motion.tr
                      key={row.page ?? i}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={shouldReduceMotion ? {} : { backgroundColor: "rgba(99,102,241,0.06)" }}
                      className="border-b border-indigo-800/20 last:border-0 transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <span className="text-indigo-200 font-mono text-xs bg-indigo-900/40 border border-indigo-800/20 rounded-lg px-2.5 py-1">
                          {row.page ?? ""}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-white font-medium">
                        {(row.views ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right text-indigo-300">
                        {(row.sessions ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          (row.bounce ?? 0) < 25
                            ? "bg-emerald-500/15 text-emerald-400"
                            : (row.bounce ?? 0) < 35
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-rose-500/15 text-rose-400"
                        }`}>
                          {(row.bounce ?? 0).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <span className={`flex items-center justify-end gap-0.5 text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {Math.abs(row.change ?? 0).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Channel Performance ── */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { channel: "Organic Search", icon: Globe, sessions: 28100, conversion: 8.4, color: "indigo", trend: 12.3 },
            { channel: "Direct Traffic", icon: Monitor, sessions: 17700, conversion: 11.2, color: "violet", trend: 5.8 },
            { channel: "Email Campaigns", icon: Mail, sessions: 5900, conversion: 14.6, color: "purple", trend: 22.1 },
            { channel: "Social Media", icon: Activity, sessions: 8900, conversion: 4.3, color: "fuchsia", trend: -2.4 },
          ].map((ch) => {
            const Icon = ch.icon;
            const isPositive = (ch.trend ?? 0) >= 0;
            return (
              <motion.div
                key={ch.channel}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                className="bg-indigo-950/50 border border-indigo-800/30 rounded-2xl p-5 backdrop-blur-sm hover:border-indigo-600/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(ch.trend ?? 0)}%
                  </span>
                </div>
                <p className="text-white font-bold text-xl mb-0.5">{(ch.sessions ?? 0).toLocaleString()}</p>
                <p className="text-indigo-300 text-xs font-medium mb-3">{ch.channel ?? ""}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-400">Conv. rate</span>
                  <span className="text-emerald-400 font-semibold">{(ch.conversion ?? 0).toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-indigo-900/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((ch.conversion ?? 0) * 6, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}