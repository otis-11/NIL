"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Eye,
  Send,
  CheckCircle2,
  Clock,
  FileText,
  ChevronDown,
  ArrowRight,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import {
  athletes,
  deals,
  businesses,
  getLevelLabel,
  getStatusColor,
  getCampaignTypeLabel,
} from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getRecommendedAthletes } from "@/lib/matching";
import { getBusinessMarketplaceStats } from "@/lib/activity";

const business = businesses[0]; // Peak Performance Gym as demo
const businessDeals = deals.filter((d) => d.businessId === business.id);

const tabs = [
  { id: "discover", label: "Discover Athletes", icon: Search },
  { id: "campaigns", label: "My Campaigns", icon: FileText },
  { id: "analytics", label: "ROI Dashboard", icon: BarChart3 },
];

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [filterSport, setFilterSport] = useState<string>("all");

  const recommendedAthletes = useMemo(
    () => getRecommendedAthletes(business, athletes, 10, 100),
    []
  );
  const bizStats = useMemo(
    () => getBusinessMarketplaceStats(business, athletes, 100),
    []
  );

  const filteredAthletes = athletes.filter((a) => {
    const matchesSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === "all" || a.level === filterLevel;
    const matchesSport = filterSport === "all" || a.sport === filterSport;
    return matchesSearch && matchesLevel && matchesSport;
  });

  const uniqueSports = [...new Set(athletes.map((a) => a.sport))];

  return (
    <div className="flex min-h-full flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-xl font-bold text-white">
                  {business.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold">{business.name}</h1>
                  <p className="flex items-center gap-2 text-sm text-muted">
                    {business.type} &middot;{" "}
                    <MapPin className="h-3 w-3" />
                    {business.city}, {business.state}
                    &middot;
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {business.rating}
                    </span>
                  </p>
                </div>
              </div>
              <Link
                href="/business/launch"
                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
              >
                <Zap className="h-4 w-4" />
                Get Local Customers
              </Link>
            </div>

            {/* Urgency Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                <Users className="h-5 w-5 text-brand" />
                <div>
                  <div className="text-lg font-extrabold text-brand">{bizStats.athletesNearby}</div>
                  <div className="text-xs text-muted">Athletes available nearby</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                <Target className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-lg font-extrabold text-emerald-600">{bizStats.topMatchesThisWeek}</div>
                  <div className="text-xs text-muted">Top matches this week</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="text-lg font-extrabold text-amber-600">{bizStats.activeCampaigns}</div>
                  <div className="text-xs text-muted">Active campaigns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-brand text-brand"
                      : "border-transparent text-muted hover:border-gray-200 hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Discover Athletes Tab */}
          {activeTab === "discover" && (
            <div className="space-y-6">
              {/* Get Customers CTA */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Ready to get local customers?</h3>
                      <p className="text-sm text-muted">
                        {bizStats.athletesNearby} athletes are available near {business.city}. Launch a campaign in minutes.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/business/launch"
                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                  >
                    Launch a Campaign <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Search athletes by name, sport, or school..."
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      className="h-11 appearance-none rounded-lg border border-border bg-white pl-3 pr-8 text-sm outline-none focus:border-brand"
                    >
                      <option value="all">All Levels</option>
                      <option value="d2">Division II</option>
                      <option value="d3">Division III</option>
                      <option value="high_school">High School</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                  <div className="relative">
                    <select
                      value={filterSport}
                      onChange={(e) => setFilterSport(e.target.value)}
                      className="h-11 appearance-none rounded-lg border border-border bg-white pl-3 pr-8 text-sm outline-none focus:border-brand"
                    >
                      <option value="all">All Sports</option>
                      {uniqueSports.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted">
                <Filter className="mr-1 inline h-3 w-3" />
                Showing {filteredAthletes.length} athletes sorted by Local-Fit Score
              </p>

              {/* Athletes Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAthletes
                  .sort((a, b) => b.localFitScore - a.localFitScore)
                  .map((athlete) => (
                    <div
                      key={athlete.id}
                      className="rounded-xl border border-border bg-white p-5 transition-all hover:border-brand/30 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-sm font-bold text-white">
                            {athlete.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <h3 className="font-bold">{athlete.name}</h3>
                            <p className="text-xs text-muted">
                              {athlete.sport} &middot; {getLevelLabel(athlete.level)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1">
                          <Star className="h-3 w-3 text-brand" />
                          <span className="text-xs font-bold text-brand">
                            {athlete.localFitScore}
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-muted line-clamp-2">
                        {athlete.bio}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {athlete.city}, {athlete.state}
                        <span className="mx-1">&middot;</span>
                        <Users className="h-3 w-3" />
                        {athlete.socialFollowers.toLocaleString()} followers
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3">
                        <div className="text-center">
                          <div className="text-sm font-bold">{athlete.completedDeals}</div>
                          <div className="text-xs text-muted">Deals</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold">{athlete.communityScore}</div>
                          <div className="text-xs text-muted">Community</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold">
                            {athlete.gpa ? athlete.gpa.toFixed(1) : "N/A"}
                          </div>
                          <div className="text-xs text-muted">GPA</div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium transition-colors hover:bg-surface">
                          <Eye className="h-3 w-3" />
                          View Profile
                        </button>
                        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark">
                          <Send className="h-3 w-3" />
                          Send Offer
                        </button>
                      </div>

                      {athlete.isMinor && (
                        <div className="mt-2 rounded-md bg-amber-50 px-2 py-1 text-center text-xs text-amber-700">
                          Minor — Parent approval required
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* My Campaigns Tab */}
          {activeTab === "campaigns" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Campaign History</h2>
                <Link
                  href="/campaigns"
                  className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  New Campaign
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-brand">
                    {business.campaigns}
                  </div>
                  <div className="text-xs text-muted">Total Campaigns</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-emerald-600">
                    {formatCurrency(business.totalSpent)}
                  </div>
                  <div className="text-xs text-muted">Total Invested</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-blue-600">
                    {businessDeals.length}
                  </div>
                  <div className="text-xs text-muted">Active Deals</div>
                </div>
              </div>

              <div className="space-y-3">
                {businessDeals.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
                    <p className="text-muted">No campaigns yet — let&apos;s change that.</p>
                    <Link
                      href="/business/launch"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                    >
                      Get your first local customers <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : (
                  businessDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="rounded-xl border border-border bg-white p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold">{deal.title}</h3>
                          <p className="mt-1 text-sm text-muted">
                            with {deal.athleteName}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(deal.status)}`}
                        >
                          {deal.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted">{deal.description}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <div className="flex items-center gap-4 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(deal.createdAt)}
                          </span>
                          <span className="rounded bg-surface px-2 py-0.5 font-medium">
                            {getCampaignTypeLabel(deal.campaignType)}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-emerald-600">
                          {formatCurrency(deal.amount)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold">ROI Dashboard</h2>
              <p className="text-sm text-muted">
                Track the real metrics that matter to your business.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Reach", value: "12,400", change: "+23%", icon: Eye, color: "text-blue-600", bg: "bg-blue-100" },
                  { label: "Engagement Rate", value: "4.8%", change: "+1.2%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
                  { label: "Foot Traffic Lift", value: "+18%", change: "+5%", icon: Users, color: "text-brand", bg: "bg-brand/10" },
                  { label: "Cost per Engagement", value: "$0.42", change: "-12%", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-100" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">{metric.label}</span>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${metric.bg}`}>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-extrabold">{metric.value}</span>
                      <span className="ml-2 text-sm font-medium text-emerald-600">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-bold">Campaign Performance</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { campaign: "Instagram Story Feature", impressions: "4,200", engagement: "5.2%", roi: "3.1x" },
                      { campaign: "Training Video Series", impressions: "8,100", engagement: "4.5%", roi: "2.8x" },
                    ].map((row) => (
                      <div key={row.campaign} className="flex items-center justify-between rounded-lg bg-surface p-3">
                        <div>
                          <div className="text-sm font-semibold">{row.campaign}</div>
                          <div className="text-xs text-muted">{row.impressions} impressions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-600">{row.roi} ROI</div>
                          <div className="text-xs text-muted">{row.engagement} engagement</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-bold">What Matters for Local SMBs</h3>
                  <p className="mt-2 text-sm text-muted">
                    We track metrics that actually drive your bottom line — not vanity stats.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Foot traffic increase during/after campaign",
                      "Social mentions and local hashtag usage",
                      "New customer acquisition from athlete referrals",
                      "Repeat customer rate from NIL campaigns",
                      "Cost per local impression vs traditional ads",
                      "Community sentiment and brand perception",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
