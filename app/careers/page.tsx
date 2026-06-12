"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Sparkles, Users, Heart, Zap, Globe, Star, ChevronDown, ChevronUp, Mail, Briefcase, Code, BarChart2, Headphones, Megaphone } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  level: "Junior" | "Mid" | "Senior" | "Lead" | "Manager";
  description: string;
  responsibilities: string[];
  requirements: string[];
  icon: string;
}

const jobListings: JobListing[] = [
  {
    id: "eng-001",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Senior",
    icon: "Code",
    description:
      "Join our core product team to build the next generation of analytics infrastructure powering thousands of SaaS companies worldwide.",
    responsibilities: [
      "Architect and ship high-performance features across our Next.js frontend and Node.js backend",
      "Collaborate with design and product to translate complex data into intuitive UI",
      "Mentor junior engineers and contribute to technical roadmap decisions",
      "Optimize database queries and API performance for real-time analytics at scale",
    ],
    requirements: [
      "5+ years of full-stack experience with TypeScript, React, and Node.js",
      "Experience with time-series databases (ClickHouse, TimescaleDB, or similar)",
      "Strong understanding of data visualization libraries (Recharts, D3.js)",
      "Proven track record shipping production features in a fast-paced SaaS environment",
    ],
  },
  {
    id: "eng-002",
    title: "Data Infrastructure Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Senior",
    icon: "BarChart2",
    description:
      "Design and maintain the data pipelines that process billions of analytics events daily, ensuring sub-second query performance for our customers.",
    responsibilities: [
      "Build and maintain real-time data ingestion pipelines using Kafka and Flink",
      "Design schema migrations and optimize ClickHouse cluster performance",
      "Implement data quality monitoring and alerting systems",
      "Partner with product engineers to expose new metrics and dimensions",
    ],
    requirements: [
      "4+ years working with large-scale data infrastructure",
      "Deep expertise in streaming systems (Kafka, Flink, or Spark Streaming)",
      "Hands-on experience with columnar databases and query optimization",
      "Familiarity with dbt, Airflow, or similar orchestration tools",
    ],
  },
  {
    id: "design-001",
    title: "Product Designer",
    department: "Design",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    icon: "Sparkles",
    description:
      "Shape the visual language and interaction design of Pulse Analytics — making complex data feel effortless and beautiful for our users.",
    responsibilities: [
      "Own end-to-end design for new dashboard features from concept to launch",
      "Conduct user research and usability testing with SaaS founders and analysts",
      "Maintain and evolve our Figma design system and component library",
      "Collaborate closely with engineering to ensure pixel-perfect implementation",
    ],
    requirements: [
      "3+ years of product design experience, ideally in B2B SaaS or data tools",
      "Expert-level Figma skills with a strong portfolio of shipped products",
      "Experience designing data-dense interfaces (charts, tables, dashboards)",
      "Ability to balance aesthetics with usability and business goals",
    ],
  },
  {
    id: "growth-001",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Manager",
    icon: "Megaphone",
    description:
      "Drive Pulse Analytics' growth engine — owning acquisition, activation, and retention campaigns that turn curious visitors into loyal power users.",
    responsibilities: [
      "Develop and execute multi-channel growth experiments (SEO, paid, email, PLG)",
      "Analyze funnel metrics and identify high-leverage optimization opportunities",
      "Partner with product to design in-app onboarding and activation flows",
      "Build and manage relationships with integration partners and affiliates",
    ],
    requirements: [
      "4+ years in growth or performance marketing at a B2B SaaS company",
      "Strong analytical mindset — comfortable with SQL and product analytics tools",
      "Experience running A/B tests and interpreting statistical significance",
      "Excellent written communication for content and email campaigns",
    ],
  },
  {
    id: "cs-001",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    icon: "Headphones",
    description:
      "Be the trusted advisor for our Enterprise customers — helping them unlock the full power of Pulse Analytics and driving expansion revenue.",
    responsibilities: [
      "Own a portfolio of 30–50 Enterprise accounts with $2M+ ARR",
      "Lead onboarding, QBRs, and strategic check-ins with executive stakeholders",
      "Identify expansion opportunities and collaborate with sales on upsells",
      "Advocate for customer needs internally with product and engineering teams",
    ],
    requirements: [
      "3+ years in Customer Success or Account Management at a SaaS company",
      "Experience managing complex, multi-stakeholder Enterprise relationships",
      "Data-driven approach to measuring customer health and predicting churn",
      "Excellent presentation and communication skills",
    ],
  },
  {
    id: "eng-003",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Mid",
    icon: "Code",
    description:
      "Build the interactive charts, real-time dashboards, and polished UI components that make Pulse Analytics the most loved analytics tool in SaaS.",
    responsibilities: [
      "Implement new dashboard widgets and chart types using Recharts and D3",
      "Build accessible, performant React components with TypeScript and Tailwind",
      "Collaborate with design to bring Figma prototypes to life with smooth animations",
      "Write comprehensive tests and maintain high code quality standards",
    ],
    requirements: [
      "3+ years of frontend experience with React and TypeScript",
      "Strong CSS skills and experience with Tailwind CSS or similar utility frameworks",
      "Experience with data visualization libraries and SVG/Canvas rendering",
      "Passion for performance optimization and accessibility best practices",
    ],
  },
];

const departments = ["All", "Engineering", "Design", "Marketing", "Customer Success"];

const perks = [
  {
    icon: Globe,
    title: "Fully Remote",
    description:
      "Work from anywhere in the world. We have teammates across 18 countries and counting.",
  },
  {
    icon: Heart,
    title: "Generous Benefits",
    description:
      "Comprehensive health, dental, and vision coverage. 401(k) with 4% match. Mental health stipend.",
  },
  {
    icon: Zap,
    title: "Equity for Everyone",
    description:
      "Meaningful equity packages so every team member shares in the company's success.",
  },
  {
    icon: Star,
    title: "$3,000 Learning Budget",
    description:
      "Annual budget for courses, conferences, books, and anything that helps you grow.",
  },
  {
    icon: Users,
    title: "Async-First Culture",
    description:
      "We respect deep work. Minimal meetings, thorough documentation, and flexible hours.",
  },
  {
    icon: Sparkles,
    title: "Top-Tier Equipment",
    description:
      "MacBook Pro, 4K monitor, and a $500 home office stipend to set up your ideal workspace.",
  },
];

const stats = [
  { value: "48", label: "Team Members" },
  { value: "18", label: "Countries" },
  { value: "4.9★", label: "Glassdoor Rating" },
  { value: "$42M", label: "Series B Raised" },
];

const iconMap: Record<string, React.ElementType> = {
  Code,
  BarChart2,
  Sparkles,
  Megaphone,
  Headphones,
};

const departmentIconMap: Record<string, React.ElementType> = {
  Engineering: Code,
  Design: Sparkles,
  Marketing: Megaphone,
  "Customer Success": Headphones,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function JobCard({ job }: { job: JobListing }) {
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = iconMap[job.icon] ?? Briefcase;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      className="bg-indigo-950/40 border border-indigo-800/40 rounded-2xl overflow-hidden hover:border-indigo-600/50 transition-colors duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-indigo-300">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.department}
                </span>
                <span className="text-indigo-600">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span className="text-indigo-600">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {job.type}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
              {job.level}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm text-indigo-300 leading-relaxed">
          {job.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-200 transition-colors font-medium"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> View details
              </>
            )}
          </button>
          <motion.a
            href={`mailto:careers@pulseanalytics.io?subject=Application: ${encodeURIComponent(job.title)}`}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Apply Now <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
          exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-t border-indigo-800/40 px-6 pb-6 pt-5 grid sm:grid-cols-2 gap-6"
        >
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
              Responsibilities
            </h4>
            <ul className="space-y-2">
              {(job.responsibilities ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-indigo-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
              Requirements
            </h4>
            <ul className="space-y-2">
              {(job.requirements ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-indigo-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeDept === "All"
    ? jobListings
    : jobListings.filter((j) => j.department === activeDept);

  return (
    <main className="min-h-screen bg-[#0f0d2e] text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            We&apos;re hiring across 6 open roles
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent"
          >
            Build the future of
            <br />
            SaaS analytics with us
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-indigo-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Pulse Analytics is on a mission to make data-driven decisions
            accessible to every SaaS team. Join a remote-first team of 48
            builders who care deeply about craft, customers, and each other.
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-900/40"
            >
              See Open Roles <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:careers@pulseanalytics.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-900/40 hover:bg-indigo-800/50 border border-indigo-700/50 text-indigo-200 font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" /> General Inquiry
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-indigo-800/30 bg-indigo-950/30 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={shouldReduceMotion ? {} : scaleIn}
              className="text-center"
            >
              <div className="text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-indigo-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Pulse ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why people love working here
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto">
              We&apos;ve built a culture where great work is recognized, autonomy
              is the default, and everyone has a stake in what we&apos;re building.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  className="p-6 rounded-2xl bg-indigo-950/50 border border-indigo-800/40 hover:border-indigo-600/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-indigo-300 leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Open Roles
            </h2>
            <p className="text-indigo-300 max-w-xl mx-auto">
              We hire for talent and potential, not just credentials. If you
              don&apos;t see a perfect fit, send us a general application.
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {departments.map((dept) => {
              const DeptIcon = dept === "All" ? Briefcase : (departmentIconMap[dept] ?? Briefcase);
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeDept === dept
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                      : "bg-indigo-900/40 text-indigo-300 hover:bg-indigo-800/50 border border-indigo-700/40"
                  }`}
                >
                  <DeptIcon className="w-3.5 h-3.5" />
                  {dept}
                  <span className={`ml-0.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeDept === dept ? "bg-indigo-500/40 text-indigo-100" : "bg-indigo-800/60 text-indigo-400"
                  }`}>
                    {dept === "All"
                      ? jobListings.length
                      : jobListings.filter((j) => j.department === dept).length}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Job Cards */}
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {filtered.length > 0 ? (
              filtered.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <motion.div
                variants={shouldReduceMotion ? {} : fadeIn}
                className="text-center py-16 text-indigo-400"
              >
                <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-lg font-medium">No open roles in this department right now.</p>
                <p className="text-sm mt-1">Check back soon or send a general inquiry.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Our Hiring Process ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Hiring Process
            </h2>
            <p className="text-indigo-300">
              We respect your time. Our process is transparent, fast, and
              designed to help both sides make a great decision.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-indigo-800/50 hidden sm:block" />

            {[
              {
                step: "01",
                title: "Application Review",
                duration: "1–2 days",
                description:
                  "A real human reviews every application. We look for curiosity, craft, and alignment with our mission — not just keywords on a résumé.",
              },
              {
                step: "02",
                title: "Intro Call",
                duration: "30 minutes",
                description:
                  "A casual conversation with our recruiting team to learn about your background, what you're looking for, and answer any questions you have about Pulse.",
              },
              {
                step: "03",
                title: "Technical / Skills Interview",
                duration: "60–90 minutes",
                description:
                  "A focused interview with your future teammates. For technical roles, a take-home project (paid) or live coding session. For other roles, a case study discussion.",
              },
              {
                step: "04",
                title: "Final Interview",
                duration: "45 minutes",
                description:
                  "Meet with a founder or senior leader. We discuss values, long-term goals, and make sure there's genuine mutual excitement about working together.",
              },
              {
                step: "05",
                title: "Offer",
                duration: "1–2 days",
                description:
                  "We move fast. Competitive salary, meaningful equity, and a full benefits package. We're happy to answer every question before you decide.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                variants={shouldReduceMotion ? {} : fadeInUp}
                className="relative flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-900/40 z-10">
                  {step.step}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-white font-semibold">{step.title}</h3>
                    <span className="text-xs text-indigo-400 bg-indigo-900/50 border border-indigo-700/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={shouldReduceMotion ? {} : scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 rounded-3xl p-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-900/40">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t see the right role?
          </h2>
          <p className="text-indigo-300 mb-8 leading-relaxed">
            We&apos;re always interested in meeting exceptional people. Send us a
            note about who you are and what you&apos;d love to build — we read
            every message.
          </p>
          <motion.a
            href="mailto:careers@pulseanalytics.io"
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-lg shadow-indigo-900/40"
          >
            <Mail className="w-4 h-4" /> Say Hello
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}