"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  MapPin,
  Zap,
  ArrowRight,
  Send,
  Copy,
  Bookmark,
  Star,
  Clock,
  TrendingUp,
  Filter,
  List,
  Map,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  DollarSign,
  Target,
  Building2,
  X,
} from "lucide-react";
import { athletes, businesses, outcomePackages, opportunities } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  getRecommendedBusinesses,
  getMatchingOpportunities,
  generateOutreachDraft,
  getLikelihoodColor,
  getLikelihoodLabel,
} from "@/lib/matching";
import { getMarketplaceStats } from "@/lib/activity";
import { checkDealEligibility, filterOpportunitiesByLegal, getPlatformBehavior } from "@/lib/legal";
import { isDealGatedByParent } from "@/lib/parent";

const athlete = athletes[0]; // Maya Chen as demo
const maxDistanceOptions = [3, 5, 10, 25, 50];
const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "gym", label: "Gyms & Fitness" },
  { value: "restaurant", label: "Restaurants & Cafes" },
  { value: "health", label: "Health & Wellness" },
  { value: "auto", label: "Auto Dealerships" },
  { value: "barbershop", label: "Barbershops" },
  { value: "nutrition", label: "Sports Nutrition" },
  { value: "dental", label: "Dentists" },
  { value: "recreation", label: "Recreation" },
];

export default function AthleteDealsPage() {
  const [maxDistance, setMaxDistance] = useState(50);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showOutreach, setShowOutreach] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const matches = useMemo(() => {
    let results = getRecommendedBusinesses(athlete, businesses, 20, maxDistance);
    if (categoryFilter !== "all") {
      results = results.filter((m) => m.business.category === categoryFilter);
    }
    return results;
  }, [maxDistance, categoryFilter]);

  const platformBehavior = useMemo(
    () => getPlatformBehavior(athlete.state, athlete.isMinor, athlete.level === "high_school"),
    []
  );

  const parentGated = isDealGatedByParent(athlete);

  const nearbyOpps = useMemo(() => {
    const raw = getMatchingOpportunities(athlete, opportunities, maxDistance);
    // Filter by legal engine — remove restricted categories, blocked states
    return filterOpportunitiesByLegal(
      athlete,
      raw,
      businesses.map((b) => ({ id: b.id, type: b.type, category: b.category }))
    );
  }, [maxDistance]);

  const stats = useMemo(() => getMarketplaceStats(athlete, maxDistance), [maxDistance]);

  const handleCopyOutreach = (businessId: string) => {
    const match = matches.find((m) => m.businessId === businessId);
    if (!match) return;
    const draft = generateOutreachDraft(athlete, match.business, match);
    navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
    setCopiedId(businessId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (businessId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(businessId)) next.delete(businessId);
      else next.add(businessId);
      return next;
    });
  };

  return (
    <div className="flex min-h-full flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="border-b border-border bg-gradient-to-r from-brand/5 via-violet-50 to-amber-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  <Zap className="h-3 w-3" />
                  First Deal Engine
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Find Local Deals Near You
                </h1>
                <p className="mt-1 text-muted">
                  These are the most realistic businesses you could get a deal
                  with this week.
                </p>
              </div>
              <Link
                href="/athlete/dashboard"
                className="flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
              >
                ← Back to Dashboard
              </Link>
            </div>

            {/* Live Stats Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Active Opportunities",
                  value: stats.activeOpportunities,
                  icon: Target,
                  color: "text-brand",
                },
                {
                  label: "Value Near You",
                  value: stats.totalActiveValue,
                  icon: DollarSign,
                  color: "text-emerald-600",
                },
                {
                  label: "Businesses Looking",
                  value: stats.businessesLooking,
                  icon: Building2,
                  color: "text-blue-600",
                },
                {
                  label: "New This Week",
                  value: stats.newThisWeek,
                  icon: Sparkles,
                  color: "text-amber-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-3"
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <div className={`text-lg font-extrabold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Filter className="h-4 w-4 text-muted" />

            <div className="relative">
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="appearance-none rounded-lg border border-border bg-surface py-1.5 pl-3 pr-8 text-sm font-medium focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {maxDistanceOptions.map((d) => (
                  <option key={d} value={d}>
                    Within {d} miles
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted" />
            </div>

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-surface py-1.5 pl-3 pr-8 text-sm font-medium focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted" />
            </div>

            <div className="ml-auto flex items-center gap-1 rounded-lg border border-border p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 ${viewMode === "list" ? "bg-brand text-white" : "text-muted hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`rounded-md p-1.5 ${viewMode === "map" ? "bg-brand text-white" : "text-muted hover:text-foreground"}`}
              >
                <Map className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Legal Compliance Banner */}
          {platformBehavior.hsBlocked && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="flex items-center gap-2 font-bold text-red-800">
                <X className="h-5 w-5" />
                HS NIL Not Available in {athlete.state}
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Your state does not currently allow high school athletes to participate in NIL activities. You&apos;ve been added to the waitlist and will be notified when this changes.
              </p>
            </div>
          )}

          {parentGated && !athlete.parentApproved && (
            <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 p-5">
              <h3 className="flex items-center gap-2 font-bold text-violet-800">
                <Clock className="h-5 w-5" />
                Parent Approval Required
              </h3>
              <p className="mt-1 text-sm text-violet-700">
                As a minor in {athlete.state}, all deals require parent/guardian approval before they can proceed. Your parent will be notified when you accept a deal.
              </p>
            </div>
          )}

          {platformBehavior.behaviorChanges.length > 0 && !platformBehavior.hsBlocked && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800">
                <Zap className="h-4 w-4" />
                {athlete.state} Legal Engine Active
              </h4>
              <ul className="mt-2 space-y-1">
                {platformBehavior.behaviorChanges.map((change) => (
                  <li key={change} className="flex items-start gap-1.5 text-xs text-amber-700">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Active Opportunities Banner */}
          {nearbyOpps.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Zap className="h-5 w-5 text-amber-500" />
                Active Opportunities Near You
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyOpps.slice(0, 3).map((opp) => (
                  <div
                    key={opp.id}
                    className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 transition-all hover:border-amber-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
                          {opp.businessName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-muted">
                            {opp.businessName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-600">
                        {formatCurrency(opp.valueRange.min)}-{formatCurrency(opp.valueRange.max)}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        <Clock className="h-3 w-3" />
                        {opp.urgencyCopy}
                      </span>
                    </div>
                    <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-dark">
                      Apply Now <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Matches */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Recommended Business Matches
                <span className="ml-2 text-sm font-normal text-muted">
                  {matches.length} found
                </span>
              </h2>
            </div>

            {viewMode === "map" ? (
              <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-border bg-white">
                <div className="text-center">
                  <Map className="mx-auto h-12 w-12 text-muted/50" />
                  <p className="mt-2 text-sm text-muted">
                    Map view — interactive map coming soon
                  </p>
                  <p className="text-xs text-muted">
                    {matches.length} businesses within {maxDistance} miles
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
                    <MapPin className="mx-auto h-10 w-10 text-muted/40" />
                    <p className="mt-3 font-medium text-muted">
                      No matches found within {maxDistance} miles
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Try expanding your search radius
                    </p>
                  </div>
                ) : (
                  matches.map((match, idx) => {
                    const pkg = outcomePackages.find(
                      (p) => p.id === match.suggestedPackage
                    );
                    const outreach = showOutreach === match.businessId
                      ? generateOutreachDraft(athlete, match.business, match)
                      : null;
                    const eligibility = checkDealEligibility(
                      athlete,
                      match.business,
                      pkg?.type || "social_post",
                      match.suggestedPriceRange.min
                    );

                    return (
                      <div
                        key={match.businessId}
                        className="group rounded-2xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-md"
                      >
                        <div className="p-5 sm:p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            {/* Left — Business Info */}
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand/10 to-violet-100 text-lg font-bold text-brand">
                                  {match.business.name.charAt(0)}
                                </div>
                                {idx < 3 && (
                                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                                    {idx + 1}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold">
                                    {match.business.name}
                                  </h3>
                                  {match.business.historicalSponsor && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                      Past Sponsor
                                    </span>
                                  )}
                                </div>
                                <p className="flex items-center gap-2 text-sm text-muted">
                                  <span>{match.business.type}</span>
                                  <span className="text-border">•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {match.distance} mi away
                                  </span>
                                  <span className="text-border">•</span>
                                  <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    {match.business.rating}
                                  </span>
                                </p>
                                <p className="mt-1 text-sm text-muted">
                                  {match.business.description}
                                </p>
                              </div>
                            </div>

                            {/* Right — Score + Likelihood */}
                            <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end">
                              <div className="flex items-center gap-2 rounded-xl bg-brand/5 px-3 py-1.5">
                                <span className="text-xs text-muted">
                                  Match
                                </span>
                                <span className="text-xl font-extrabold text-brand">
                                  {match.score}
                                </span>
                              </div>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLikelihoodColor(match.likelihoodToConvert)}`}
                              >
                                {getLikelihoodLabel(match.likelihoodToConvert)}
                              </span>
                            </div>
                          </div>

                          {/* Why It's a Good Fit */}
                          <div className="mt-4 rounded-lg bg-surface p-3">
                            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                              Why this is a good fit
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {match.reasons.map((reason, i) => (
                                <span
                                  key={i}
                                  className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-foreground"
                                >
                                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Legal Eligibility */}
                          {!eligibility.eligible && (
                            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                              <p className="text-xs font-semibold text-red-700">Deal Blocked:</p>
                              <ul className="mt-1 space-y-0.5">
                                {eligibility.blockers.map((b) => (
                                  <li key={b} className="text-xs text-red-600">• {b}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {eligibility.eligible && eligibility.requiredBeforeProceeding.length > 0 && (
                            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                              <p className="text-xs font-semibold text-amber-700">Required before deal:</p>
                              <ul className="mt-1 space-y-0.5">
                                {eligibility.requiredBeforeProceeding.map((a) => (
                                  <li key={a.id} className="text-xs text-amber-600">• {a.title}: {a.description}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {eligibility.eligible && eligibility.requiredBeforeProceeding.length === 0 && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              State compliance check passed — ready to deal
                            </div>
                          )}

                          {/* Deal Recommendation */}
                          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3.5 w-3.5 text-brand" />
                                <span className="text-muted">Best deal:</span>
                                <span className="font-semibold">
                                  {pkg?.outcomeTitle || "Social Media"}
                                </span>
                              </span>
                              <span className="flex items-center gap-1 font-bold text-emerald-600">
                                <DollarSign className="h-3.5 w-3.5" />
                                {formatCurrency(match.suggestedPriceRange.min)}-
                                {formatCurrency(match.suggestedPriceRange.max)}
                              </span>
                              <span className="flex items-center gap-1 text-muted">
                                <Clock className="h-3.5 w-3.5" />
                                ~{match.estimatedTimeToClose} to close
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                setShowOutreach(
                                  showOutreach === match.businessId
                                    ? null
                                    : match.businessId
                                )
                              }
                              className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                              <Send className="h-3.5 w-3.5" />
                              Send Outreach
                            </button>
                            <button
                              onClick={() =>
                                handleCopyOutreach(match.businessId)
                              }
                              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
                            >
                              {copiedId === match.businessId ? (
                                <>
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy Pitch
                                </>
                              )}
                            </button>
                            <button className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface">
                              <MessageSquare className="h-3.5 w-3.5" />
                              Request Intro
                            </button>
                            <button
                              onClick={() => handleSave(match.businessId)}
                              className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                savedIds.has(match.businessId)
                                  ? "border-brand bg-brand/5 text-brand"
                                  : "border-border hover:bg-surface"
                              }`}
                            >
                              <Bookmark
                                className={`h-3.5 w-3.5 ${savedIds.has(match.businessId) ? "fill-brand" : ""}`}
                              />
                              {savedIds.has(match.businessId)
                                ? "Saved"
                                : "Save"}
                            </button>
                          </div>
                        </div>

                        {/* Outreach Preview Drawer */}
                        {outreach && showOutreach === match.businessId && (
                          <div className="border-t border-border bg-violet-50/50 p-5 sm:p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-brand" />
                                <h4 className="text-sm font-bold">
                                  AI-Generated Outreach Draft
                                </h4>
                                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                                  Personalized
                                </span>
                              </div>
                              <button
                                onClick={() => setShowOutreach(null)}
                                className="rounded-md p-1 text-muted hover:bg-white"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-3 rounded-lg bg-white p-4">
                              <p className="text-xs font-semibold text-muted">
                                Subject
                              </p>
                              <p className="mt-0.5 text-sm font-medium">
                                {outreach.subject}
                              </p>
                              <hr className="my-3 border-border" />
                              <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
                                {outreach.body}
                              </p>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <button className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                                <Send className="h-3.5 w-3.5" />
                                Send Now
                              </button>
                              <button className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-surface">
                                Edit & Personalize
                              </button>
                              <button
                                onClick={() =>
                                  handleCopyOutreach(match.businessId)
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
                              >
                                <Copy className="h-3.5 w-3.5" />
                                {copiedId === match.businessId
                                  ? "Copied!"
                                  : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
