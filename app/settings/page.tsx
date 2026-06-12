"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { User, Bell, Lock, Settings, Mail, Globe, Shield, CreditCard, Trash2, Check, Eye, EyeOff, AlertTriangle, Save, Upload } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, slideInLeft } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

// ─── Sidebar Sections ────────────────────────────────────────────────────────

const sections: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const profileData = {
  name: "Jordan Rivera",
  email: "jordan.rivera@acme.io",
  role: "Admin",
  company: "Acme Corp",
  timezone: "America/New_York",
  language: "English (US)",
  avatar: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-05/230523-Jordan-Rivera-WBBH-snip-ac-559p-51b62e.jpg",
};

const notificationSettings = [
  {
    id: "weekly_digest",
    label: "Weekly Digest",
    description: "Receive a weekly summary of your key metrics and trends.",
    email: true,
    push: false,
  },
  {
    id: "revenue_alerts",
    label: "Revenue Alerts",
    description: "Get notified when MRR changes by more than 5%.",
    email: true,
    push: true,
  },
  {
    id: "churn_warnings",
    label: "Churn Warnings",
    description: "Alert when a high-value customer shows churn signals.",
    email: true,
    push: true,
  },
  {
    id: "new_signups",
    label: "New Sign-ups",
    description: "Notify on every new user registration.",
    email: false,
    push: false,
  },
  {
    id: "billing_events",
    label: "Billing Events",
    description: "Invoices, failed payments, and subscription changes.",
    email: true,
    push: false,
  },
  {
    id: "product_updates",
    label: "Product Updates",
    description: "News about new features and improvements to Pulse Analytics.",
    email: false,
    push: false,
  },
];

const integrations = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Sync revenue, subscriptions, and payment events.",
    connected: true,
    logo: "/images/stripe-logo-integration.jpg",
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send alerts and digest reports to your Slack workspace.",
    connected: true,
    logo: "/images/slack-logo-integration.jpg",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Enrich customer profiles with CRM data.",
    connected: false,
    logo: "/images/hubspot-logo-integration.jpg",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "segment",
    name: "Segment",
    description: "Pipe event data directly into Pulse Analytics.",
    connected: false,
    logo: "/images/segment-logo-integration.jpg",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "Correlate support tickets with churn and health scores.",
    connected: false,
    logo: "/images/intercom-logo-integration.jpg",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows with 5,000+ apps via Zapier.",
    connected: false,
    logo: "/images/zapier-logo-integration.jpg",
    color: "from-yellow-500 to-orange-500",
  },
];

const billingPlan = {
  name: "Pro",
  price: "$79",
  period: "/ month",
  renewsOn: "August 14, 2025",
  seats: 8,
  maxSeats: 15,
  features: [
    "Unlimited dashboards",
    "15 team seats",
    "90-day data retention",
    "Priority support",
    "Custom integrations",
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl p-6 mb-6"
    >
      <div className="mb-5">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        {description && (
          <p className="text-indigo-300 text-sm mt-1">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-950 ${
        checked ? "bg-indigo-500" : "bg-indigo-800/60"
      }`}
    >
      <motion.span
        animate={shouldReduceMotion ? {} : { x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 rounded-full bg-white shadow-md"
      />
    </button>
  );
}

function InputField({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-indigo-200">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-indigo-900/40 border border-indigo-700/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

// ─── Section: Profile ─────────────────────────────────────────────────────────

function ProfileSection() {
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [company, setCompany] = useState(profileData.company);
  const [timezone, setTimezone] = useState(profileData.timezone);
  const [saved, setSaved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <SectionCard
        title="Personal Information"
        description="Update your name, email, and company details."
      >
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              {(name ?? "U").charAt(0)}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 border-2 border-indigo-950 flex items-center justify-center hover:bg-indigo-500 transition-colors"
              aria-label="Upload avatar"
            >
              <Upload className="w-3 h-3 text-white" />
            </button>
          </div>
          <div>
            <p className="text-white font-medium">{name}</p>
            <p className="text-indigo-400 text-sm">{profileData.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InputField label="Full Name" value={name} onChange={setName} />
          <InputField label="Email" value={email} type="email" onChange={setEmail} />
          <InputField label="Company" value={company} onChange={setCompany} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-indigo-200">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-indigo-900/40 border border-indigo-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Section: Notifications ───────────────────────────────────────────────────

function NotificationsSection() {
  const [settings, setSettings] = useState(notificationSettings);

  const toggle = (id: string, channel: "email" | "push") => {
    setSettings((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [channel]: !s[channel] } : s
      )
    );
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <SectionCard
        title="Notification Preferences"
        description="Choose how and when Pulse Analytics notifies you."
      >
        <div className="flex items-center justify-end gap-6 mb-4 pb-3 border-b border-indigo-800/30">
          <span className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Email</span>
          <span className="text-xs font-medium text-indigo-400 uppercase tracking-wide">Push</span>
        </div>
        <div className="space-y-1">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between gap-4 py-3.5 border-b border-indigo-800/20 last:border-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-indigo-100">{setting.label}</p>
                <p className="text-xs text-indigo-500 mt-0.5">{setting.description}</p>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0">
                <Toggle
                  checked={setting.email}
                  onChange={() => toggle(setting.id, "email")}
                />
                <Toggle
                  checked={setting.push}
                  onChange={() => toggle(setting.id, "push")}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Section: Security ────────────────────────────────────────────────────────

function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <SectionCard
        title="Change Password"
        description="Use a strong password with at least 12 characters."
      >
        <div className="space-y-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-indigo-200">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-indigo-900/40 border border-indigo-700/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200 transition-colors"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-indigo-200">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-indigo-900/40 border border-indigo-700/50 rounded-xl px-4 py-2.5 text-white text-sm placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200 transition-colors"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <InputField
            label="Confirm New Password"
            value={confirmPassword}
            type="password"
            placeholder="Confirm new password"
            onChange={setConfirmPassword}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Updated!</>
            ) : (
              <><Lock className="w-4 h-4" /> Update Password</>
            )}
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-100">
              {twoFactor ? "2FA is enabled" : "2FA is disabled"}
            </p>
            <p className="text-xs text-indigo-500 mt-0.5">
              {twoFactor
                ? "Your account is protected with two-factor authentication."
                : "Enable 2FA to secure your account with a second verification step."}
            </p>
          </div>
          <Toggle checked={twoFactor} onChange={setTwoFactor} />
        </div>
      </SectionCard>

      <SectionCard title="Active Sessions" description="Devices currently logged into your account.">
        <div className="space-y-3">
          {[
            { device: "MacBook Pro — Chrome", location: "New York, US", time: "Active now", current: true },
            { device: "iPhone 15 — Safari", location: "New York, US", time: "2 hours ago", current: false },
            { device: "Windows PC — Edge", location: "London, UK", time: "3 days ago", current: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-indigo-800/20 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-900/60 border border-indigo-700/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-indigo-100">{session.device}</p>
                  <p className="text-xs text-indigo-500">{session.location} · {session.time}</p>
                </div>
              </div>
              {session.current ? (
                <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                  Current
                </span>
              ) : (
                <button type="button" className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Section: Billing ─────────────────────────────────────────────────────────

function BillingSection() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <SectionCard title="Current Plan" description="Your active subscription and usage.">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-white">{billingPlan.name}</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                Active
              </span>
            </div>
            <p className="text-3xl font-extrabold text-white">
              {billingPlan.price}
              <span className="text-sm font-normal text-indigo-400 ml-1">{billingPlan.period}</span>
            </p>
            <p className="text-xs text-indigo-500 mt-1">Renews on {billingPlan.renewsOn}</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700/40 hover:bg-indigo-600/50 border border-indigo-600/30 text-indigo-200 text-sm font-medium transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Manage Subscription
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-300">Team Seats</span>
            <span className="text-sm font-medium text-white">{billingPlan.seats} / {billingPlan.maxSeats}</span>
          </div>
          <div className="w-full bg-indigo-900/60 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full"
              style={{ width: `${(billingPlan.seats / billingPlan.maxSeats) * 100}%` }}
            />
          </div>
        </div>

        <ul className="space-y-2">
          {billingPlan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-indigo-300">
              <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Payment Method" description="Your saved payment details.">
        <div className="flex items-center justify-between p-4 bg-indigo-900/40 rounded-xl border border-indigo-700/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-800/60 border border-indigo-700/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Visa ending in 4242</p>
              <p className="text-xs text-indigo-500">Expires 08/2027</p>
            </div>
          </div>
          <button type="button" className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors">
            Update
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Billing History" description="Your recent invoices.">
        <div className="space-y-2">
          {[
            { date: "Jul 14, 2025", amount: "$79.00", status: "Paid" },
            { date: "Jun 14, 2025", amount: "$79.00", status: "Paid" },
            { date: "May 14, 2025", amount: "$79.00", status: "Paid" },
            { date: "Apr 14, 2025", amount: "$79.00", status: "Paid" },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-indigo-800/20 last:border-0">
              <div>
                <p className="text-sm font-medium text-indigo-100">{invoice.date}</p>
                <p className="text-xs text-indigo-500">Pro Plan · Monthly</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">{invoice.amount}</span>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                  {invoice.status}
                </span>
                <button type="button" className="text-indigo-400 hover:text-indigo-200 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Section: Integrations ────────────────────────────────────────────────────

function IntegrationsSection() {
  const [integrationState, setIntegrationState] = useState(
    integrations.map((i) => ({ ...i }))
  );

  const toggle = (id: string) => {
    setIntegrationState((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: !i.connected } : i
      )
    );
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <SectionCard
        title="Connected Integrations"
        description="Manage your third-party service connections."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {integrationState.map((integration) => (
            <div
              key={integration.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                integration.connected
                  ? "bg-indigo-900/30 border-indigo-600/40"
                  : "bg-indigo-950/30 border-indigo-800/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}
                >
                  {integration.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{integration.name}</p>
                  <p className="text-xs text-indigo-500 truncate max-w-[140px]">
                    {integration.description}
                  </p>
                </div>
              </div>
              <Toggle
                checked={integration.connected}
                onChange={() => toggle(integration.id)}
              />
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Section: Danger Zone ─────────────────────────────────────────────────────

function DangerZoneSection() {
  const [confirmDelete, setConfirmDelete] = useState("");

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-white font-semibold text-lg">Danger Zone</h2>
            <p className="text-rose-300/70 text-sm mt-1">
              These actions are irreversible. Please proceed with caution.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-rose-900/10 rounded-xl border border-rose-800/30">
            <div>
              <p className="text-sm font-medium text-rose-100">Export All Data</p>
              <p className="text-xs text-rose-400/70 mt-0.5">
                Download a complete archive of your account data in JSON format.
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-900/40 hover:bg-rose-800/50 border border-rose-700/40 text-rose-300 text-sm font-medium transition-colors flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              Export Data
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-rose-900/10 rounded-xl border border-rose-800/30">
            <div>
              <p className="text-sm font-medium text-rose-100">Delete Account</p>
              <p className="text-xs text-rose-400/70 mt-0.5">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-300 text-sm font-medium transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>

          <div className="pt-2">
            <label className="text-xs text-rose-400/70 block mb-2">
              Type <span className="font-mono text-rose-300">DELETE</span> to confirm account deletion:
            </label>
            <input
              type="text"
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              placeholder="DELETE"
              className="w-full sm:w-64 bg-rose-950/40 border border-rose-800/40 rounded-lg px-3 py-2 text-rose-300 text-sm placeholder-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const shouldReduceMotion = useReducedMotion();

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "notifications":
        return <NotificationsSection />;
      case "security":
        return <SecuritySection />;
      case "billing":
        return <BillingSection />;
      case "integrations":
        return <IntegrationsSection />;
      case "danger":
        return <DangerZoneSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1640] to-[#0f0c29] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-indigo-300 mt-1 text-sm">
            Manage your account, notifications, security, and integrations.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            variants={shouldReduceMotion ? {} : slideInLeft}


            initial="hidden"


            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-indigo-600/40 text-white border border-indigo-500/40"
                        : "text-indigo-300 hover:text-white hover:bg-indigo-800/30"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? "text-indigo-300" : "text-indigo-500"
                      }`}
                    />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}
