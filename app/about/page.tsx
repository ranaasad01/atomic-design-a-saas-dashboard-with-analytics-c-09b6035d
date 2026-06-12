"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Users, Zap, Shield, Globe, Heart, Award, ArrowRight, CheckCircle, Star, TrendingUp, Code2, BarChart3 } from 'lucide-react';
import Link from "next/link";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";

const stats = [
  { label: "Active Teams", value: "12,400+", icon: Users, color: "from-indigo-500 to-violet-500" },
  { label: "Data Points Tracked Daily", value: "2.1B+", icon: BarChart3, color: "from-violet-500 to-purple-500" },
  { label: "Uptime SLA", value: "99.99%", icon: Shield, color: "from-purple-500 to-pink-500" },
  { label: "Countries Served", value: "87", icon: Globe, color: "from-pink-500 to-rose-500" },
];

const values = [
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "We believe analytics should be instant. Every query, every chart, every insight — delivered in milliseconds so your team never waits for the data they need.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description:
      "Your data is yours. We're SOC 2 Type II certified, GDPR compliant, and built with end-to-end encryption from day one — not bolted on as an afterthought.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description:
      "We measure our success by yours. Every feature we ship starts with a real customer problem. Our NPS consistently sits above 70 because we listen and act.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "Built by engineers who hated clunky BI tools. Our API-first architecture, webhooks, and SDKs mean your team can extend Pulse to fit any workflow.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description:
      "We ship weekly. From AI-powered anomaly detection to predictive churn scoring, we're always pushing the frontier of what analytics can do for SaaS teams.",
  },
  {
    icon: Award,
    title: "Radical Transparency",
    description:
      "We publish our uptime, our roadmap, and our pricing — no hidden fees, no surprise overages. What you see is exactly what you get.",
  },
];

const team = [
  {
    name: "Aria Chen",
    role: "Co-founder & CEO",
    bio: "Former Head of Data at Stripe. Built analytics infrastructure serving 50M+ users. Passionate about making data accessible to every team.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFin94HpDci1w/profile-displayphoto-scale_200_200/B56ZnPy7E1KAAY-/0/1760127857988?e=2147483647&v=beta&t=pBLeDhNu714RygwwiyW9_GN5hAtRcOpb-LxGL2MeYqg",
    badge: "Ex-Stripe",
  },
  {
    name: "Marcus Webb",
    role: "Co-founder & CTO",
    bio: "Previously Staff Engineer at Datadog. Architected distributed systems processing billions of events per day. Loves Rust and long bike rides.",
    image: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    badge: "Ex-Datadog",
  },
  {
    name: "Sofia Reyes",
    role: "Head of Product",
    bio: "10 years shaping product at Amplitude and Mixpanel. Believes the best analytics tool is the one your whole team actually uses every day.",
    image: "https://c.files.bbci.co.uk/1410C/production/_106288128_e5598e41-4c82-42a9-9bc8-a7d7e0fad917.jpg",
    badge: "Ex-Amplitude",
  },
  {
    name: "James Okafor",
    role: "Head of Engineering",
    bio: "Led platform teams at Segment and Twilio. Obsessed with developer experience, zero-downtime deploys, and mentoring the next generation of engineers.",
    image: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    badge: "Ex-Segment",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    bio: "Crafted interfaces at Figma and Linear. Believes great design is invisible — it just feels right. Advocates for accessibility in every pixel.",
    image: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    badge: "Ex-Figma",
  },
  {
    name: "Luca Ferretti",
    role: "Head of Customer Success",
    bio: "Helped 500+ SaaS companies unlock growth through data at Intercom. Runs a weekly office hours session open to every Pulse customer.",
    image: "https://img.a.transfermarkt.technology/portrait/big/667905-1747051811.jpeg?lm=1",
    badge: "Ex-Intercom",
  },
];

const milestones = [
  { year: "2020", title: "Founded in San Francisco", description: "Aria and Marcus quit their jobs to solve the analytics fragmentation problem they'd both lived through at scale." },
  { year: "2021", title: "Seed Round — $4.2M", description: "Backed by Sequoia and a16z. Launched private beta with 50 design partners. First paying customer signed within 30 days." },
  { year: "2022", title: "Series A — $18M", description: "Grew to 1,200 customers and 40 employees. Launched real-time streaming analytics and the Pulse API." },
  { year: "2023", title: "10,000 Teams Milestone", description: "Crossed $10M ARR. Opened London and Singapore offices. Launched AI anomaly detection and predictive churn scoring." },
  { year: "2024", title: "Series B — $62M", description: "Scaling to serve enterprise customers. Building the next generation of AI-native analytics for every SaaS team on the planet." },
];

const pressLogos = [
  { name: "TechCrunch", quote: "The analytics platform SaaS teams have been waiting for." },
  { name: "Forbes", quote: "One of the 50 most promising B2B startups of 2024." },
  { name: "Product Hunt", quote: "#1 Product of the Day — three times running." },
  { name: "G2", quote: "Leader in Business Intelligence, Spring 2024." },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0f0e2a] text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-violet-600/15 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Story
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent"
          >
            We make data feel{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              effortless
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-indigo-200 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {APP_DESCRIPTION} We started {APP_NAME} because we were tired of stitching together spreadsheets, Looker dashboards, and Slack alerts just to answer a simple question: is our business healthy?
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200"
            >
              Try the Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/40 text-indigo-200 hover:text-white hover:border-indigo-400/60 hover:bg-indigo-500/10 font-semibold transition-all duration-200"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-indigo-800/30 bg-[#1a1740]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={shouldReduceMotion ? {} : scaleIn}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                  className="relative p-6 rounded-2xl bg-[#1e1b4b]/60 border border-indigo-700/30 backdrop-blur-sm text-center group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-indigo-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={shouldReduceMotion ? {} : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-5">
              Our Mission
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight">
              Every SaaS team deserves{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                clarity
              </span>
            </h2>
            <p className="text-indigo-200 text-lg leading-relaxed mb-6">
              Too many great products fail not because of bad engineering or weak markets — but because the team couldn't see what was happening fast enough to act. Churn crept up unnoticed. A pricing experiment ran for months without a clear answer. A new feature shipped to silence.
            </p>
            <p className="text-indigo-200 text-lg leading-relaxed mb-8">
              {APP_NAME} exists to close that gap. We unify every signal — revenue, engagement, retention, performance — into a single, beautiful, real-time view so your team can make confident decisions every single day.
            </p>
            <div className="space-y-3">
              {[
                "Real-time data, no 24-hour lag",
                "No SQL required — natural language queries",
                "Integrates with 200+ tools in minutes",
                "Built for teams of 2 to 2,000",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-indigo-100">
                  <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-indigo-700/40 shadow-2xl shadow-indigo-900/40">
              <img
                src="https://www.scatterspoke.com/_astro/team-pulse-the-ultimate-analytics-dashboard-featured.DhMhsw7u_ZaiU4y.png?dpl=dpl_FxWtDctZSAb5dNdWFE7e7N8eKS1o"
                alt="Pulse Analytics team working on dashboards"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e2a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1b4b]/90 border border-indigo-600/40 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-semibold">4.9 / 5 from 2,400+ reviews</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1740]/40 border-y border-indigo-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
              What We Stand For
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Our core values
            </h2>
            <p className="text-indigo-300 text-lg max-w-xl mx-auto">
              These aren't words on a wall. They're the principles that guide every product decision, every hire, and every customer interaction.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.01 }}
                  className="p-7 rounded-2xl bg-[#1e1b4b]/60 border border-indigo-700/30 hover:border-indigo-500/50 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/30 flex items-center justify-center mb-5 group-hover:from-indigo-500/50 group-hover:to-violet-500/50 transition-all duration-300">
                    <Icon className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-indigo-300 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
              The Team
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Built by people who've been there
            </h2>
            <p className="text-indigo-300 text-lg max-w-xl mx-auto">
              Our team has shipped analytics at Stripe, Datadog, Amplitude, Segment, Figma, and Intercom. We've felt the pain — and we're fixing it.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group rounded-2xl bg-[#1e1b4b]/60 border border-indigo-700/30 hover:border-indigo-500/50 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-indigo-900/40"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name ?? ""} — ${member.role ?? ""}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-600/80 backdrop-blur-sm text-white text-xs font-semibold border border-indigo-400/30">
                      {member.badge ?? ""}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-0.5">{member.name ?? ""}</h3>
                  <p className="text-indigo-400 text-sm font-medium mb-3">{member.role ?? ""}</p>
                  <p className="text-indigo-300 text-sm leading-relaxed">{member.bio ?? ""}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1740]/40 border-y border-indigo-800/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Journey
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              From idea to industry leader
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/40 to-transparent" />

            <motion.div
              variants={shouldReduceMotion ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-10"
            >
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-[#0f0e2a] shadow-lg shadow-indigo-500/40 z-10 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-indigo-300 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Press ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-2">As seen in</p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {pressLogos.map((press) => (
              <motion.div
                key={press.name}
                variants={shouldReduceMotion ? {} : scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                className="p-6 rounded-2xl bg-[#1e1b4b]/60 border border-indigo-700/30 hover:border-indigo-500/40 transition-all duration-300 text-center"
              >
                <div className="text-white font-extrabold text-xl mb-3">{press.name}</div>
                <p className="text-indigo-300 text-xs leading-relaxed italic">"{press.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden border border-indigo-600/40 shadow-2xl shadow-indigo-900/40 p-12 text-center"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-600/15 to-purple-600/20" />
            <div className="absolute inset-0 bg-[#1e1b4b]/70 backdrop-blur-sm" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/40 mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                Ready to see your data clearly?
              </h2>
              <p className="text-indigo-200 text-lg mb-8 max-w-lg mx-auto">
                Join 12,400+ SaaS teams who've replaced their fragmented analytics stack with {APP_NAME}. Free 14-day trial, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200 text-base"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-indigo-500/40 text-indigo-200 hover:text-white hover:border-indigo-400/60 hover:bg-indigo-500/10 font-semibold transition-all duration-200 text-base"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}