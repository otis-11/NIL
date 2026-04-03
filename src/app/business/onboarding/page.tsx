"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  MapPin,
  CreditCard,
  Sparkles,
} from "lucide-react";

const steps = [
  { id: 1, title: "Business Info", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Campaign Goals", icon: Sparkles },
  { id: 4, title: "Ready!", icon: CheckCircle2 },
];

const businessTypes = [
  "Restaurant / Food",
  "Gym / Fitness",
  "Auto Dealership",
  "Health & Wellness",
  "Retail / Shopping",
  "Real Estate",
  "Financial Services",
  "Legal Services",
  "Salon / Barbershop",
  "Tech / Software",
  "Entertainment",
  "Other",
];

const campaignGoals = [
  { id: "awareness", label: "Brand Awareness", desc: "Get more people to know your business" },
  { id: "foot_traffic", label: "Foot Traffic", desc: "Drive customers to your physical location" },
  { id: "social_growth", label: "Social Media Growth", desc: "Grow your social following and engagement" },
  { id: "event_promo", label: "Event Promotion", desc: "Promote an upcoming event or grand opening" },
  { id: "product_launch", label: "Product Launch", desc: "Generate buzz for a new product or service" },
  { id: "community", label: "Community Goodwill", desc: "Support local athletes and build community ties" },
];

const budgetRanges = [
  "$100 - $300 per campaign",
  "$300 - $750 per campaign",
  "$750 - $1,500 per campaign",
  "$1,500 - $2,500 per campaign",
  "$2,500+ per campaign",
];

const states = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function BusinessOnboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    website: "",
    contactName: "",
    email: "",
    state: "",
    city: "",
    address: "",
    goals: [] as string[],
    budget: "",
    preferHighSchool: false,
  });

  const update = (field: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleGoal = (id: string) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(id)
        ? prev.goals.filter((g) => g !== id)
        : [...prev.goals, id],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 1:
        return form.businessName && form.businessType && form.contactName && form.email;
      case 2:
        return form.state && form.city;
      case 3:
        return form.goals.length > 0 && form.budget;
      default:
        return true;
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      step > s.id
                        ? "bg-emerald-500 text-white"
                        : step === s.id
                          ? "bg-brand text-white shadow-md shadow-brand/30"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step > s.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`mx-2 hidden h-0.5 w-12 sm:block md:w-20 ${
                        step > s.id ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm font-medium text-muted">
                Step {step} of {steps.length}:{" "}
                {steps.find((s) => s.id === step)?.title}
              </span>
            </div>
          </div>

          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">Your Business</h2>
                <p className="mt-1 text-muted">
                  Tell us about your business so we can match you with the right local athletes.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Business Name</label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Peak Performance Gym"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Business Type</label>
                <select
                  value={form.businessType}
                  onChange={(e) => update("businessType", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="">Select type...</option>
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Contact Name</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Tony Rodriguez"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="tony@peakperformance.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Website (optional)</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="https://peakperformancegym.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">Business Location</h2>
                <p className="mt-1 text-muted">
                  We match you with athletes in your local area for authentic partnerships.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">State</label>
                  <select
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Select state...</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Westfield"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Street Address (optional)</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="123 Main St"
                />
              </div>
            </div>
          )}

          {/* Step 3: Campaign Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">Campaign Goals</h2>
                <p className="mt-1 text-muted">
                  What do you want to achieve with athlete partnerships? Select all that apply.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {campaignGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`rounded-lg border p-4 text-left transition-all ${
                      form.goals.includes(goal.id)
                        ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                        : "border-border hover:border-brand/30"
                    }`}
                  >
                    <div className="text-sm font-semibold">{goal.label}</div>
                    <div className="mt-0.5 text-xs text-muted">{goal.desc}</div>
                  </button>
                ))}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Monthly Budget</label>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => update("budget", range)}
                      className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition-all ${
                        form.budget === range
                          ? "border-brand bg-brand/5 text-brand ring-2 ring-brand/20"
                          : "border-border hover:border-brand/30"
                      }`}
                    >
                      <CreditCard className="mr-2 inline h-4 w-4" />
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.preferHighSchool}
                  onChange={(e) => update("preferHighSchool", e.target.checked)}
                  className="h-5 w-5 rounded border-border text-brand accent-violet-600"
                />
                <span className="text-sm text-muted">
                  I&apos;m interested in working with high school athletes (where legally permitted)
                </span>
              </label>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">
                  Welcome to LocalNIL, {form.businessName || "Partner"}!
                </h2>
                <p className="mt-2 text-muted">
                  Your business profile is live. Here&apos;s what happens next:
                </p>
              </div>
              <div className="mx-auto max-w-md space-y-3 text-left">
                {[
                  "We'll match you with local athletes based on fit — not follower count",
                  "Browse pre-built campaign templates to launch in minutes",
                  "All deals include safe contracts and secure escrow payments",
                  "Track ROI with real metrics that matter to your business",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-border bg-white p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                      {i + 1}
                    </span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/business/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-dark"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:invisible"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                disabled={!canNext()}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 3 ? "Complete Setup" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
