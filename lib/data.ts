// ─── Brand Constants ────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Real-time insights for high-growth SaaS teams.";
export const APP_DESCRIPTION =
  "Monitor revenue, users, churn, and every metric that matters — beautifully unified in one intelligent dashboard.";

// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Single source of truth for top-level navigation links. */
export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Users", href: "/dashboard/users" },
  { label: "Revenue", href: "/dashboard/revenue" },
  { label: "Settings", href: "/dashboard/settings" },
];

/** Marketing / public nav (used on landing page) */
export const publicNavLinks: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sign In", href: "/sign-in" },
];

// ─── Sidebar Navigation ──────────────────────────────────────────────────────
export interface SidebarLink {
  label: string;
  href: string;
  icon: string; // lucide icon name string — resolved in component
  badge?: string;
}

export const sidebarLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: "Layout" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "Activity" },
  { label: "Users", href: "/dashboard/users", icon: "User" },
  { label: "Revenue", href: "/dashboard/revenue", icon: "Star" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

// ─── Shared TypeScript Types ─────────────────────────────────────────────────

export interface KPICard {
  label: string;
  value: string;
  change: number; // percentage, positive = up
  prefix?: string;
  suffix?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "active" | "churned" | "trial";
  joined: string;
  mrr: number;
}

// ─── Footer Links ────────────────────────────────────────────────────────────
export interface FooterSection {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerSections: FooterSection[] = [
  {
    heading: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics", href: "/dashboard/analytics" },
      { label: "Revenue", href: "/dashboard/revenue" },
      { label: "Users", href: "/dashboard/users" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];