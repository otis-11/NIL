"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  TrendingUp,
  MapPin,
  Star,
  DollarSign,
  Target,
  Zap,
  Clock,
  BarChart3,
  Building2,
  Sparkles,
  Send,
} from "lucide-react";
import {
  businesses,
  athletes,
  outcomePackages,
  type OutcomePackage,
  type BusinessGoal,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  getRecommendedAthletes,
  getLikelihoodColor,
  getLikelihoodLabel,
} from "@/lib/matching";
import { getBusinessMarketplaceStats } from "@/lib/activity";

const business = businesses[0]; // Peak Performance Gym as demo

const goalOptions: { value: BusinessGoal; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "foot_traffic", label: "Drive Foot Traffic", description: "Bring more customers into your location", icon: Users },
  { value: "awareness", label: "Boost Local Awareness", description: "Get your business seen by local audiences", icon: TrendingUp },
  { value: "event_promo", label: "Promote an Event", description: "Fill seats and build buzz for your next event", icon: Target },
  { value: "testimonial", label: "Build Trust & Credibility", description: "Get genuine endorsements from local athletes", icon: Star },
  { value: "ambassador", label: "Launch an Ambassador", description: "Ongoing visibility through a trusted local face", icon: Sparkles },
  { value: "youth_camp", label: "Fill a Youth Program", description: "Promote your youth camp or clinic", icon: Zap },
];

export default function BusinessLaunchPage() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<BusinessGoal | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<OutcomePackage | null>(null);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);

  const stats = useMemo(() => getBusinessMarketplaceStats(business, athletes, 50), []);

  const filteredPackages = useMemo(() => {
    if (!selectedGoal) return outcomePackages;
    return outcomePackages.filter((p) => p.businessGoal === selectedGoal);
  }, [selectedGoal]);

  const recommendedAthletes = useMemo(() => {
    return getRecommendedAthletes(business, athletes, 10, 100);
  }, []);

  const handleGoalSelect = (goal: BusinessGoal) => {
    setSelectedGoal(goal);
    setStep(2);
  };

  const handlePackageSelect = (pkg: OutcomePackage) => {
    setSelectedPackage(pkg);
    setStep(3);
  };

  const handleAthleteSelect = (athleteId: string) => {
    setSelectedAthleteId(athleteId);
    setStep(4);
  };

  const selectedAthlete = athletes.find((a) => a.id === selectedAthleteId);
  const selectedMatch = recommendedAthletes.find((m) => m.athleteId === selectedAthleteId);

  return (
    <div className="flex min-h-full flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-emerald-50 via-white to-brand/5">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Building2 className="h-3 w-3" />
                  Business Launch Pad
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Get Local Customers with Athletes
                </h1>
                <p className="mt-1 text-muted">
                  Select your goal, choose a package, pick an athlete — launch in minutes.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-2">
                  <Users className="h-4 w-4 text-brand" />
                  <div>
                    <div className="text-lg font-extrabold text-brand">{stats.athletesNearby}</div>
                    <div className="text-xs text-muted">Athletes nearby</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mt-6 flex items-center gap-2">
              {[
                { num: 1, label: "Select Goal" },
                { num: 2, label: "Choose Package" },
                { num: 3, label: "Pick Athlete" },
                { num: 4, label: "Launch" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <button
                    onClick={() => s.num < step && setStep(s.num)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      step > s.num
                        ? "bg-emerald-500 text-white"
                        : step === s.num
                          ? "bg-brand text-white"
                          : "bg-gray-200 text-muted"
                    }`}
                  >
                    {step > s.num ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      s.num
                    )}
                  </button>
                  <span
                    className={`hidden text-xs font-medium sm:inline ${step >= s.num ? "text-foreground" : "text-muted"}`}
                  >
                    {s.label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`h-0.5 w-8 rounded-full sm:w-16 ${step > s.num ? "bg-emerald-400" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Step 1: Select Goal */}
          {step === 1 && (
            <div>
              <h2 className="mb-1 text-xl font-bold">What do you want to achieve?</h2>
              <p className="mb-6 text-sm text-muted">Pick the outcome that matters most to your business right now.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {goalOptions.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => handleGoalSelect(goal.value)}
                    className="group rounded-2xl border border-border bg-white p-6 text-left transition-all hover:border-brand/30 hover:shadow-lg"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <goal.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{goal.label}</h3>
                    <p className="mt-1 text-sm text-muted">{goal.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                      Select <ArrowRight className="h-3 w-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Package */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="mb-4 flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" /> Change goal
              </button>
              <h2 className="mb-1 text-xl font-bold">Choose Your Package</h2>
              <p className="mb-6 text-sm text-muted">
                Fixed packages — clear deliverables, clear pricing, fast to launch.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="group flex flex-col rounded-2xl border border-border bg-white transition-all hover:border-brand/30 hover:shadow-lg"
                  >
                    <div className="flex-1 p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          {pkg.duration}
                        </span>
                        {pkg.popular && (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold">{pkg.outcomeTitle}</h3>
                      <p className="mt-2 text-sm text-muted">{pkg.outcomeDescription}</p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Deliverables</p>
                        <ul className="mt-1.5 space-y-1">
                          {pkg.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-1.5 text-sm">
                              <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 rounded-lg bg-surface p-3">
                        <p className="text-xs text-muted">{pkg.sampleROI}</p>
                      </div>
                    </div>
                    <div className="border-t border-border p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(pkg.priceRange.min)}-{formatCurrency(pkg.priceRange.max)}
                        </span>
                        <button
                          onClick={() => handlePackageSelect(pkg)}
                          className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                        >
                          Select <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredPackages.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
                  <p className="text-muted">No packages match this goal yet. Try another goal or browse all packages.</p>
                  <button
                    onClick={() => { setSelectedGoal(null); setStep(1); }}
                    className="mt-3 text-sm font-semibold text-brand hover:underline"
                  >
                    Browse all goals
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pick Athlete */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="mb-4 flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" /> Change package
              </button>
              <h2 className="mb-1 text-xl font-bold">Pick Your Athlete</h2>
              <p className="mb-6 text-sm text-muted">
                These athletes are the best match for {selectedPackage?.outcomeTitle.toLowerCase()}.
              </p>
              <div className="space-y-4">
                {recommendedAthletes.map((match) => {
                  const ath = match.athlete;
                  return (
                    <div
                      key={ath.id}
                      className={`flex flex-col gap-4 rounded-2xl border bg-white p-5 transition-all sm:flex-row sm:items-center sm:justify-between ${
                        selectedAthleteId === ath.id
                          ? "border-brand shadow-md"
                          : "border-border hover:border-brand/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-lg font-bold text-white">
                          {ath.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{ath.name}</h3>
                            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                              {ath.level === "high_school" ? "HS" : ath.level.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted">
                            {ath.sport} · {ath.school}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {match.reasons.slice(0, 2).map((r, i) => (
                              <span key={i} className="flex items-center gap-1 text-xs text-emerald-600">
                                <CheckCircle2 className="h-3 w-3" /> {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-sm font-bold text-brand">{match.score}</div>
                            <div className="text-[10px] text-muted">Match</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold">{ath.socialFollowers.toLocaleString()}</div>
                            <div className="text-[10px] text-muted">Followers</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold">{ath.completedDeals}</div>
                            <div className="text-[10px] text-muted">Deals</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAthleteSelect(ath.id)}
                          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                            selectedAthleteId === ath.id
                              ? "bg-emerald-500 text-white"
                              : "bg-brand text-white hover:bg-brand-dark"
                          }`}
                        >
                          {selectedAthleteId === ath.id ? "Selected ✓" : "Select"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Launch */}
          {step === 4 && selectedPackage && selectedAthlete && selectedMatch && (
            <div>
              <button
                onClick={() => setStep(3)}
                className="mb-4 flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" /> Change athlete
              </button>
              <h2 className="mb-1 text-xl font-bold">Review & Launch</h2>
              <p className="mb-6 text-sm text-muted">
                Confirm the details below and launch your campaign.
              </p>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Summary Card */}
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="text-lg font-bold">Campaign Summary</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted">Goal</span>
                      <span className="text-sm font-semibold">
                        {goalOptions.find((g) => g.value === selectedGoal)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted">Package</span>
                      <span className="text-sm font-semibold">{selectedPackage.outcomeTitle}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted">Athlete</span>
                      <span className="text-sm font-semibold">{selectedAthlete.name}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted">Match Score</span>
                      <span className="text-sm font-bold text-brand">{selectedMatch.score}/100</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-muted">Duration</span>
                      <span className="text-sm font-semibold">{selectedPackage.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">Budget Range</span>
                      <span className="text-lg font-bold text-emerald-600">
                        {formatCurrency(selectedPackage.priceRange.min)}-{formatCurrency(selectedPackage.priceRange.max)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deliverables + ROI */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-white p-6">
                    <h3 className="font-bold">What You Get</h3>
                    <ul className="mt-3 space-y-2">
                      {selectedPackage.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {selectedPackage.addOns.length > 0 && (
                      <div className="mt-4 border-t border-border pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Optional Add-Ons</p>
                        <ul className="mt-1.5 space-y-1">
                          {selectedPackage.addOns.map((a) => (
                            <li key={a} className="text-xs text-muted">{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                      <h3 className="font-bold text-emerald-800">Expected ROI</h3>
                    </div>
                    <p className="mt-2 text-sm text-emerald-700">{selectedPackage.sampleROI}</p>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl">
                    <Send className="h-5 w-5" />
                    Launch Campaign
                  </button>
                  <p className="text-center text-xs text-muted">
                    You&apos;ll be able to review and approve terms before any payment is processed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
