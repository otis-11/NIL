"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  GraduationCap,
  MapPin,
  Shield,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { stateRules, type AthleteLevel } from "@/lib/data";

const steps = [
  { id: 1, title: "Basics", icon: User },
  { id: 2, title: "School & Sport", icon: GraduationCap },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Legal Check", icon: Shield },
  { id: 5, title: "Ready!", icon: Zap },
];

const sports = [
  "Football",
  "Basketball",
  "Soccer",
  "Baseball",
  "Softball",
  "Volleyball",
  "Track & Field",
  "Swimming",
  "Tennis",
  "Golf",
  "Wrestling",
  "Lacrosse",
  "Hockey",
  "Cross Country",
  "Gymnastics",
  "Rowing",
  "Other",
];

const states = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function AthleteOnboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    level: "" as AthleteLevel | "",
    school: "",
    sport: "",
    otherSports: [] as string[],
    state: "",
    city: "",
    parentEmail: "",
    agreeTerms: false,
  });

  const isMinor = form.age !== "" && parseInt(form.age) < 18;
  const stateRule = stateRules.find((r) => r.state === form.state);
  const hsBlocked =
    form.level === "high_school" && stateRule && !stateRule.highSchoolAllowed;

  const update = (field: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    switch (step) {
      case 1:
        return form.firstName && form.lastName && form.email && form.age;
      case 2:
        return form.level && form.school && form.sport;
      case 3:
        return form.state && form.city;
      case 4:
        return !hsBlocked && form.agreeTerms && (!isMinor || form.parentEmail);
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
                      className={`mx-2 hidden h-0.5 w-8 sm:block md:w-16 ${
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

          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Let&apos;s get started
                </h2>
                <p className="mt-1 text-muted">
                  Tell us about yourself. This takes about 2 minutes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Maya"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Chen"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="maya@email.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Age</label>
                <input
                  type="number"
                  min="14"
                  max="30"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  className="h-11 w-40 rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="19"
                />
                {isMinor && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    Under 18 — parent/guardian involvement will be required.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: School & Sport */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">
                  School & Sport Info
                </h2>
                <p className="mt-1 text-muted">
                  This helps us match you with the right local businesses.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Athletic Level
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      { value: "d2", label: "Division II" },
                      { value: "d3", label: "Division III" },
                      { value: "high_school", label: "High School" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update("level", opt.value)}
                      className={`rounded-lg border p-3 text-sm font-medium transition-all ${
                        form.level === opt.value
                          ? "border-brand bg-brand/5 text-brand ring-2 ring-brand/20"
                          : "border-border hover:border-brand/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  School Name
                </label>
                <input
                  type="text"
                  value={form.school}
                  onChange={(e) => update("school", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Westfield State University"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Primary Sport
                </label>
                <select
                  value={form.sport}
                  onChange={(e) => update("sport", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="">Select sport...</option>
                  {sports.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">Your Location</h2>
                <p className="mt-1 text-muted">
                  LocalNIL is hyper-local. We connect you with businesses in
                  your area.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  State
                </label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  <option value="">Select state...</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Westfield"
                />
              </div>
              {form.state && stateRule && (
                <div className="rounded-xl border border-border bg-surface p-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold">
                    <Shield className="h-4 w-4 text-brand" />
                    {form.state} NIL Rules
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    <li>
                      High School NIL:{" "}
                      <span
                        className={
                          stateRule.highSchoolAllowed
                            ? "font-medium text-emerald-600"
                            : "font-medium text-red-600"
                        }
                      >
                        {stateRule.highSchoolAllowed
                          ? "Allowed"
                          : "Not Allowed"}
                      </span>
                    </li>
                    {stateRule.parentConsentRequired && (
                      <li>Parent consent: Required</li>
                    )}
                    {stateRule.schoolNotificationRequired && (
                      <li>School notification: Required</li>
                    )}
                    <li>
                      Restricted categories:{" "}
                      {stateRule.restrictedCategories.join(", ")}
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-muted">{stateRule.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Legal Check */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold">Legal & Safety</h2>
                <p className="mt-1 text-muted">
                  We keep you protected with built-in compliance checks.
                </p>
              </div>

              {hsBlocked && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <h4 className="flex items-center gap-2 font-bold text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    High School NIL Not Available in {form.state}
                  </h4>
                  <p className="mt-2 text-sm text-red-700">
                    Unfortunately, {form.state} does not currently allow high
                    school athletes to participate in NIL activities. We&apos;ll
                    notify you when this changes.
                  </p>
                  <div className="mt-4">
                    <input
                      type="email"
                      placeholder="Enter email to get notified"
                      className="h-10 w-full rounded-lg border border-red-200 bg-white px-3 text-sm"
                    />
                  </div>
                </div>
              )}

              {!hsBlocked && (
                <>
                  {isMinor && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <h4 className="flex items-center gap-2 font-bold text-amber-800">
                        <Shield className="h-5 w-5" />
                        Parent/Guardian Required
                      </h4>
                      <p className="mt-2 text-sm text-amber-700">
                        Since you&apos;re under 18, a parent or guardian must
                        approve all deals and have visibility into your account.
                      </p>
                      <div className="mt-4">
                        <label className="mb-1.5 block text-sm font-medium text-amber-800">
                          Parent/Guardian Email
                        </label>
                        <input
                          type="email"
                          value={form.parentEmail}
                          onChange={(e) =>
                            update("parentEmail", e.target.value)
                          }
                          className="h-11 w-full rounded-lg border border-amber-200 bg-white px-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                          placeholder="parent@email.com"
                        />
                      </div>
                    </div>
                  )}

                  <div className="rounded-xl border border-border bg-surface p-4">
                    <h4 className="text-sm font-bold">
                      Platform Safety Guarantees
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {[
                        "All contracts are platform-generated with safety checks",
                        "Payments are held in escrow until deliverables confirmed",
                        "Restricted categories auto-blocked based on your state",
                        "You can cancel any deal within 24 hours of acceptance",
                        "Your data is never sold to third parties",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => update("agreeTerms", e.target.checked)}
                      className="mt-0.5 h-5 w-5 rounded border-border text-brand accent-violet-600"
                    />
                    <span className="text-sm text-muted">
                      I agree to the{" "}
                      <span className="font-medium text-brand">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-brand">
                        Privacy Policy
                      </span>
                      . I understand that all deals are subject to my
                      state&apos;s NIL regulations.
                    </span>
                  </label>
                </>
              )}
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 5 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">
                  You&apos;re All Set, {form.firstName}!
                </h2>
                <p className="mt-2 text-muted">
                  Your LocalNIL profile is ready. Here&apos;s what happens next:
                </p>
              </div>
              <div className="mx-auto max-w-md space-y-3 text-left">
                {[
                  "We auto-generate your media kit with pricing guidance",
                  "Local businesses in your area can now discover you",
                  "You'll get notified when there's a match",
                  "Your first-deal activation guide is waiting in your dashboard",
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
                href="/athlete/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-dark"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
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
                onClick={() => setStep(Math.min(5, step + 1))}
                disabled={!canNext()}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 4 ? "Complete Setup" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
