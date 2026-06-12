"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { User, Bell, Star, Lock, Save, Check, AlertCircle, Mail, Eye, EyeOff, Settings, ChevronDown } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}

// ─── Inline Toggle Component ─────────────────────────────────────────────────

function Toggle({ enabled, onChange, label }: ToggleProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label ?? "toggle"}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1e1b4b] ${
        enabled ? "bg-indigo-500" : "bg-indigo-900/60 border border-indigo-700/50"
      }`}
    >
      <motion.span
        animate={shouldReduceMotion ? {} : { x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full shadow-md ${
          enabled ? "bg-white" : "bg-indigo-400"
        }`}
      />
    </button>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInUp}
      className="bg-indigo-950/40 border border-indigo-800/30 rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-indigo-800/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-base">{title}</h2>
          <p className="text-indigo-400 text-sm mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-6">{children}</div>
    </motion.div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
      <div className="sm:w-48 flex-shrink-0 pt-2">
        <label className="text-sm font-medium text-indigo-200">{label}</label>
        {hint && <p className="text-xs text-indigo-500 mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1e1b4b]">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
    </div>
  );
}

// ─── Notification Row ─────────────────────────────────────────────────────────

function NotifRow({
  label,
  description,
  email,
  push,
  onEmailChange,
  onPushChange,
}: {
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  onEmailChange: (v: boolean) => void;
  onPushChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-4 border-b border-indigo-800/20 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-indigo-100">{label}</p>
        <p className="text-xs text-indigo-500 mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-indigo-500 hidden sm:block">Email</span>
          <Toggle enabled={email} onChange={onEmailChange} label={`${label} email`} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-indigo-500 hidden sm:block">Push</span>
          <Toggle enabled={push} onChange={onPushChange} label={`${label} push`} />
        </div>
      </div>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  name,
  price,
  features,
  current,
  recommended,
  onSelect,
}: {
  name: string;
  price: string;
  features: string[];
  current: boolean;
  recommended?: boolean;
  onSelect: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl border p-5 flex flex-col gap-4 cursor-pointer transition-all ${
        current
          ? "border-indigo-500/60 bg-indigo-600/10 shadow-lg shadow-indigo-500/10"
          : recommended
          ? "border-violet-500/40 bg-violet-900/10"
          : "border-indigo-800/30 bg-indigo-950/30 hover:border-indigo-700/50"
      }`}
      onClick={onSelect}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}
      {current && (
        <span className="absolute -top-3 right-4 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Current Plan
        </span>
      )}
      <div>
        <h3 className="text-white font-semibold text-base">{name}</h3>
        <p className="text-2xl font-bold text-white mt-1">
          {price}
          {price !== "Custom" && (
            <span className="text-sm font-normal text-indigo-400">/mo</span>
          )}
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-indigo-300">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        className={`mt-auto w-full py-2 rounded-xl text-sm font-semibold transition-all ${
          current
            ? "bg-indigo-500/20 text-indigo-300 cursor-default"
            : "bg-indigo-600 hover:bg-indigo-500 text-white"
        }`}
        disabled={current}
      >
        {current ? "Current Plan" : "Upgrade"}
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const shouldReduceMotion = useReducedMotion();

  // Profile
  const [displayName, setDisplayName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [bio, setBio] = useState("Product designer and developer.");
  const [timezone, setTimezone] = useState("UTC-5");
  const [language, setLanguage] = useState("en");

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState({
    systemEmail: true,
    systemPush: false,
    updatesEmail: true,
    updatesPush: true,
    marketingEmail: false,
    marketingPush: false,
    securityEmail: true,
    securityPush: true,
  });

  // Preferences
  const [theme, setTheme] = useState("dark");
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  // Plan
  const [currentPlan, setCurrentPlan] = useState("pro");

  // Save state
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = async () => {
    setSaveStatus("saving");
    await new Promise((r) => setTimeout(r, 1200));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const timezoneOptions = [
    { label: "UTC-12", value: "UTC-12" },
    { label: "UTC-8 (PST)", value: "UTC-8" },
    { label: "UTC-7 (MST)", value: "UTC-7" },
    { label: "UTC-6 (CST)", value: "UTC-6" },
    { label: "UTC-5 (EST)", value: "UTC-5" },
    { label: "UTC+0 (GMT)", value: "UTC+0" },
    { label: "UTC+1 (CET)", value: "UTC+1" },
    { label: "UTC+5:30 (IST)", value: "UTC+5:30" },
    { label: "UTC+8 (CST)", value: "UTC+8" },
    { label: "UTC+9 (JST)", value: "UTC+9" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Japanese", value: "ja" },
    { label: "Chinese", value: "zh" },
  ];

  const themeOptions = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "System", value: "system" },
  ];

  const dateFormatOptions = [
    { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
    { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  ];

  const sessionTimeoutOptions = [
    { label: "15 minutes", value: "15" },
    { label: "30 minutes", value: "30" },
    { label: "1 hour", value: "60" },
    { label: "4 hours", value: "240" },
    { label: "Never", value: "0" },
  ];

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      features: ["5 projects", "1 GB storage", "Basic analytics", "Email support"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$12",
      features: ["Unlimited projects", "20 GB storage", "Advanced analytics", "Priority support", "Custom domains"],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Pro", "Unlimited storage", "SSO & SAML", "Dedicated support", "SLA guarantee"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
              <Settings className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-indigo-400 text-sm">Manage your account preferences</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              saveStatus === "saved"
                ? "bg-green-600/80 text-white"
                : saveStatus === "error"
                ? "bg-red-600/80 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-60"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Saving…
              </>
            ) : saveStatus === "saved" ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : saveStatus === "error" ? (
              <><AlertCircle className="w-4 h-4" /> Error</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>

        {/* Sections */}
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {/* Profile */}
          <SettingsSection
            title="Profile"
            description="Update your personal information"
            icon={User}
          >
            <div className="flex flex-col gap-5">
              <FormField label="Display Name">
                <TextInput value={displayName} onChange={setDisplayName} placeholder="Your name" />
              </FormField>
              <FormField label="Email" hint="Used for login and notifications">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </FormField>
              <FormField label="Bio" hint="Max 160 characters">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={160}
                  className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-indigo-500 mt-1 text-right">{bio.length}/160</p>
              </FormField>
              <FormField label="Timezone">
                <SelectInput value={timezone} onChange={setTimezone} options={timezoneOptions} />
              </FormField>
              <FormField label="Language">
                <SelectInput value={language} onChange={setLanguage} options={languageOptions} />
              </FormField>
            </div>
          </SettingsSection>

          {/* Security */}
          <SettingsSection
            title="Security"
            description="Manage your password and login settings"
            icon={Lock}
          >
            <div className="flex flex-col gap-5">
              <FormField label="Current Password">
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>
              <FormField label="New Password">
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>
              <FormField label="Confirm Password">
                <div className="relative">
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-200"
                  >
                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && newPassword && confirmPassword !== newPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
              </FormField>
            </div>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            title="Notifications"
            description="Choose what you want to be notified about"
            icon={Bell}
          >
            <div className="flex items-center justify-end gap-8 mb-2 pr-1">
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Email</span>
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Push</span>
            </div>
            <NotifRow
              label="System Alerts"
              description="Important system notifications and alerts"
              email={notifs.systemEmail}
              push={notifs.systemPush}
              onEmailChange={(v) => setNotifs((n) => ({ ...n, systemEmail: v }))}
              onPushChange={(v) => setNotifs((n) => ({ ...n, systemPush: v }))}
            />
            <NotifRow
              label="Product Updates"
              description="New features, improvements, and changelogs"
              email={notifs.updatesEmail}
              push={notifs.updatesPush}
              onEmailChange={(v) => setNotifs((n) => ({ ...n, updatesEmail: v }))}
              onPushChange={(v) => setNotifs((n) => ({ ...n, updatesPush: v }))}
            />
            <NotifRow
              label="Marketing"
              description="Tips, promotions, and special offers"
              email={notifs.marketingEmail}
              push={notifs.marketingPush}
              onEmailChange={(v) => setNotifs((n) => ({ ...n, marketingEmail: v }))}
              onPushChange={(v) => setNotifs((n) => ({ ...n, marketingPush: v }))}
            />
            <NotifRow
              label="Security"
              description="Login attempts and security alerts"
              email={notifs.securityEmail}
              push={notifs.securityPush}
              onEmailChange={(v) => setNotifs((n) => ({ ...n, securityEmail: v }))}
              onPushChange={(v) => setNotifs((n) => ({ ...n, securityPush: v }))}
            />
          </SettingsSection>

          {/* Preferences */}
          <SettingsSection
            title="Preferences"
            description="Customize your experience"
            icon={Settings}
          >
            <div className="flex flex-col gap-5">
              <FormField label="Theme">
                <SelectInput value={theme} onChange={setTheme} options={themeOptions} />
              </FormField>
              <FormField label="Date Format">
                <SelectInput value={dateFormat} onChange={setDateFormat} options={dateFormatOptions} />
              </FormField>
              <FormField label="Session Timeout">
                <SelectInput
                  value={sessionTimeout}
                  onChange={setSessionTimeout}
                  options={sessionTimeoutOptions}
                />
              </FormField>
              <div className="h-px bg-indigo-800/30 my-1" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-200">Compact Mode</p>
                    <p className="text-xs text-indigo-500 mt-0.5">Reduce spacing for a denser layout</p>
                  </div>
                  <Toggle enabled={compactMode} onChange={setCompactMode} label="Compact mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-200">Animations</p>
                    <p className="text-xs text-indigo-500 mt-0.5">Enable motion and transitions</p>
                  </div>
                  <Toggle enabled={animations} onChange={setAnimations} label="Animations" />
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Plan */}
          <SettingsSection
            title="Plan & Billing"
            description="Manage your subscription"
            icon={Star}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features}
                  current={currentPlan === plan.id}
                  recommended={(plan as { recommended?: boolean }).recommended}
                  onSelect={() => setCurrentPlan(plan.id)}
                />
              ))}
            </div>
          </SettingsSection>
        </motion.div>
      </div>
    </div>
  );
}
