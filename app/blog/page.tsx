"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Star } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How We Reduced Churn by 34% Using Predictive Analytics",
    excerpt:
      "Discover the exact framework our team used to identify at-risk accounts 30 days before they churned — and the automated playbooks that saved them.",
    category: "Product",
    author: "Mia Chen",
    authorRole: "Head of Product",
    authorAvatar: "/images/author-mia-chen.jpg",
    date: "June 12, 2025",
    readTime: "8 min read",
    image: "https://assets.seobotai.com/undefined/6977e71412006df3518d92c2-1769467261635.jpg",
    featured: true,
    tags: ["Churn", "Predictive Analytics", "Retention"],
  },
  {
    id: "2",
    title: "The SaaS Metrics That Actually Predict Long-Term Growth",
    excerpt:
      "MRR and ARR are just the beginning. We break down the leading indicators — NRR, PQL conversion, and expansion revenue — that separate breakout companies from the rest.",
    category: "Analytics",
    author: "James Okafor",
    authorRole: "Data Scientist",
    authorAvatar: "/images/author-james-okafor.jpg",
    date: "June 5, 2025",
    readTime: "11 min read",
    image: "https://images.ctfassets.net/lpvian6u6i39/6PbkaWV5M2tqIwGeYWUSS3/3730faea672008f1c54f5ef18c722931/Revenue_management_____Appsmith.png",
    tags: ["MRR", "NRR", "Growth"],
  },
  {
    id: "3",
    title: "Building a Real-Time Revenue Dashboard in Under a Day",
    excerpt:
      "A step-by-step walkthrough of connecting Stripe, setting up webhooks, and visualizing live revenue data with Pulse Analytics — no engineering degree required.",
    category: "Tutorial",
    author: "Sofia Reyes",
    authorRole: "Solutions Engineer",
    authorAvatar: "/images/author-sofia-reyes.jpg",
    date: "May 28, 2025",
    readTime: "14 min read",
    image: "https://www.adverity.com/hs-fs/hubfs/Cohort%20analysis%20ladder.png?width=800&height=487&name=Cohort%20analysis%20ladder.png",
    tags: ["Tutorial", "Stripe", "Revenue"],
  },
  {
    id: "4",
    title: "Why Your Cohort Analysis Is Lying to You",
    excerpt:
      "Most teams run cohort analysis wrong. We explain the three most common mistakes — and how fixing them revealed a 2× improvement in our own retention numbers.",
    category: "Analytics",
    author: "Mia Chen",
    authorRole: "Head of Product",
    authorAvatar: "/images/author-mia-chen.jpg",
    date: "May 19, 2025",
    readTime: "7 min read",
    image: "https://cdn.prod.website-files.com/673473202f01ae5c847dfbe1/686656cd24c5be2ba056d191_Dashboard%20-%20Costs%20%26%20Budget%20-%20croped.png",
    tags: ["Cohort Analysis", "Retention", "Data"],
  },
  {
    id: "5",
    title: "From Spreadsheets to Dashboards: A Migration Guide",
    excerpt:
      "Still running your SaaS metrics in Google Sheets? Here's a practical, no-drama migration path to a live analytics platform — with zero data loss.",
    category: "Guide",
    author: "Luca Ferretti",
    authorRole: "Customer Success Lead",
    authorAvatar: "/images/author-luca-ferretti.jpg",
    date: "May 10, 2025",
    readTime: "9 min read",
    image: "https://images.prismic.io/paddle/a752a9ea-291a-496c-b5d4-23b1ddcae22d_Expansion+rev.+1.jpeg?auto=format,compress",
    tags: ["Migration", "Spreadsheets", "Onboarding"],
  },
  {
    id: "6",
    title: "Understanding Expansion Revenue: The Growth Lever You're Ignoring",
    excerpt:
      "Expansion MRR from upsells and cross-sells can offset churn entirely. We show you how to track, forecast, and accelerate it inside Pulse Analytics.",
    category: "Revenue",
    author: "James Okafor",
    authorRole: "Data Scientist",
    authorAvatar: "/images/author-james-okafor.jpg",
    date: "April 30, 2025",
    readTime: "10 min read",
    image: "https://miro.medium.com/1*UBSatd95b7lJwTGJQgCtHQ.png",
    tags: ["Expansion MRR", "Upsell", "Revenue"],
  },
  {
    id: "7",
    title: "Setting Up Automated Alerts for Anomaly Detection",
    excerpt:
      "Learn how to configure smart threshold alerts so your team gets notified the moment a key metric spikes or drops — before customers notice anything.",
    category: "Tutorial",
    author: "Sofia Reyes",
    authorRole: "Solutions Engineer",
    authorAvatar: "/images/author-sofia-reyes.jpg",
    date: "April 22, 2025",
    readTime: "6 min read",
    image: "https://cieden.com/cieden/images/all/fsrxqq2.png",
    tags: ["Alerts", "Anomaly Detection", "Automation"],
  },
  {
    id: "8",
    title: "The Complete Guide to SaaS Pricing Page Optimization",
    excerpt:
      "Data from 200+ SaaS pricing pages reveals the layouts, copy patterns, and CTA placements that consistently drive higher conversion rates.",
    category: "Growth",
    author: "Luca Ferretti",
    authorRole: "Customer Success Lead",
    authorAvatar: "/images/author-luca-ferretti.jpg",
    date: "April 14, 2025",
    readTime: "12 min read",
    image: "https://neilpatel.com/wp-content/uploads/2016/12/pricing-page-cheat-sheet.jpg",
    tags: ["Pricing", "Conversion", "Growth"],
  },
];

const categories = ["All", "Product", "Analytics", "Tutorial", "Guide", "Revenue", "Growth"];

const categoryColors: Record<string, string> = {
  Product: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Analytics: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Tutorial: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Guide: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Revenue: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Growth: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const colorClass = categoryColors[category] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/60 to-violet-900/40 border border-indigo-700/40 shadow-xl shadow-indigo-950/30"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-950/60 md:block hidden" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-300" />
              Featured
            </span>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-3">
            <CategoryBadge category={post.category} />
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug mb-3 group-hover:text-indigo-200 transition-colors">
            {post.title}
          </h2>
          <p className="text-indigo-300 text-sm leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={post.authorAvatar}
              alt={post.author ?? "Author"}
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/40"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author ?? "A")}&background=4f46e5&color=fff`;
              }}
            />
            <div>
              <p className="text-white text-sm font-medium">{post.author}</p>
              <p className="text-indigo-400 text-xs">{post.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-indigo-400 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm font-medium transition-colors group/link"
            >
              Read more
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article
      variants={shouldReduceMotion ? {} : fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-indigo-950/50 border border-indigo-800/40 hover:border-indigo-600/50 shadow-lg shadow-indigo-950/20 hover:shadow-indigo-900/30 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-indigo-200 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-indigo-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(post.tags ?? []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-indigo-800/40 text-indigo-300 text-xs border border-indigo-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-indigo-800/30">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar}
              alt={post.author ?? "Author"}
              className="w-7 h-7 rounded-full object-cover border border-indigo-600/40"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author ?? "A")}&background=4f46e5&color=fff`;
              }}
            />
            <div>
              <p className="text-white text-xs font-medium">{post.author}</p>
              <p className="text-indigo-500 text-xs">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-indigo-400 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      (post.title ?? "").toLowerCase().includes(q) ||
      (post.excerpt ?? "").toLowerCase().includes(q) ||
      (post.tags ?? []).some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch && !post.featured;
  });

  return (
    <main className="min-h-screen bg-[#0f0e2a] text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1e1b4b] to-[#0f0e2a] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
          >
            <BookOpen className="w-4 h-4" />
            {APP_NAME} Blog
          </motion.div>
          <motion.h1
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Insights for{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              SaaS Leaders
            </span>
          </motion.h1>
          <motion.p
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-indigo-300 text-lg max-w-2xl mx-auto mb-10"
          >
            Deep dives on analytics, retention, revenue growth, and the metrics that move the needle for high-growth SaaS teams.
          </motion.p>

          {/* Search */}
          <motion.div
            variants={shouldReduceMotion ? {} : scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles, topics, tags…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-indigo-900/40 border border-indigo-700/50 text-white placeholder-indigo-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 transition-all"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: BookOpen, label: "Articles Published", value: "48+" },
            { icon: TrendingUp, label: "Monthly Readers", value: "12,400" },
            { icon: Star, label: "Avg. Rating", value: "4.9 / 5" },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={shouldReduceMotion ? {} : fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-indigo-950/50 border border-indigo-800/40 text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">{value}</p>
                <p className="text-indigo-400 text-xs mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Post */}
        {!searchQuery && activeCategory === "All" && featuredPost && (
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-white font-semibold text-lg">Featured Article</h2>
            </div>
            <FeaturedCard post={featuredPost} />
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  : "bg-indigo-900/30 border-indigo-700/40 text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-20"
          >
            <Search className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No articles found</h3>
            <p className="text-indigo-400 text-sm">
              Try a different search term or category filter.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.section
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 rounded-2xl bg-gradient-to-br from-indigo-800/50 to-violet-800/30 border border-indigo-600/30 p-10 text-center shadow-xl shadow-indigo-950/30"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-6 h-6 text-indigo-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Get the best SaaS insights, weekly.
          </h2>
          <p className="text-indigo-300 text-sm max-w-md mx-auto mb-7">
            Join 12,000+ founders and operators who get our curated breakdown of analytics, growth tactics, and product strategy every Thursday.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-900/50 border border-indigo-700/50 text-white placeholder-indigo-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all"
            />
            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-600/30 transition-colors"
            >
              Subscribe free
            </motion.button>
          </form>
          <p className="text-indigo-500 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.section>
      </div>
    </main>
  );
}