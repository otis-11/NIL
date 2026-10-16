"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LiveOpportunities from "@/components/LiveOpportunities";
import {
  Zap,
  DollarSign,
  TrendingUp,
  FileText,
  Share2,
  Download,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Trophy,
  Users,
  Eye,
  BarChart3,
  Sparkles,
  ExternalLink,
  Target,
  Send,
  MessageSquare,
  Building2,
} from "lucide-react";
import {
  athletes,
  deals,
  opportunities,
  outreachMessages,
  getLevelLabel,
  getStatusColor,
  getCampaignTypeLabel,
} from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getMatchingOpportunities } from "@/lib/matching";
import { getMarketplaceStats, getFirstDealProgress } from "@/lib/activity";
import {
  getContractsForAthlete,
  getEscrowStatusLabel,
  getEscrowStatusColor,
  getContractStatusLabel,
  getContractStatusColor,
} from "@/lib/contracts";
import { getThreadsForAthlete, getUnreadCount } from "@/lib/messaging";

const athlete = athletes[0]; // Maya Chen as demo
const athleteDeals = deals.filter((d) => d.athleteId === athlete.id);
const athleteOutreach = outreachMessages.filter((m) => m.athleteId === athlete.id);
const athleteContracts = getContractsForAthlete(athlete.id);
const athleteThreads = getThreadsForAthlete(athlete.id);
const unreadMessages = getUnreadCount(athleteThreads);

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "deals", label: "My Deals", icon: FileText },
  { id: "contracts", label: "Contracts", icon: Trophy },
  { id: "mediakit", label: "Media Kit", icon: Share2 },
  { id: "guide", label: "First Deal Guide", icon: Sparkles },
];

export default function AthleteDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const nearbyOpps = useMemo(
    () => getMatchingOpportunities(athlete, opportunities, 50),
    []
  );
  const stats = useMemo(() => getMarketplaceStats(athlete, 50), []);
  const progress = useMemo(
    () => getFirstDealProgress(athlete, athleteOutreach.filter((m) => m.status === "sent").length, 0),
    []
  );

  return (
    <div className="flex min-h-full flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        {/* Profile Header */}
        <div className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-xl font-bold text-white">
                  {athlete.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold">{athlete.name}</h1>
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
                      {getLevelLabel(athlete.level)}
                    </span>
                    {athlete.sport} &middot; {athlete.school}
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {athlete.city}, {athlete.state}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/messages"
                  className="relative flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
                >
                  <MessageSquare className="h-4 w-4" />
                  Messages
                  {unreadMessages > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                      {unreadMessages}
                    </span>
                  )}
                </Link>
                <Link
                  href="/campaigns"
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
                >
                  <Eye className="h-4 w-4" />
                  Browse Campaigns
                </Link>
                <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </button>
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
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* First Deal CTA — DOMINANT */}
              {athlete.completedDeals < 5 && (
                <div className="rounded-2xl border-2 border-brand/30 bg-gradient-to-r from-brand/5 via-violet-50 to-amber-50 p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/20">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold">
                          Get Your First Deal Now
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          You&apos;re {progress.stepsRemaining} step{progress.stepsRemaining !== 1 ? "s" : ""} away.{" "}
                          We found {stats.activeOpportunities} opportunities and {stats.businessesLooking} businesses near you.
                        </p>
                        <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-brand transition-all"
                            style={{ width: `${progress.percentComplete}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted">{progress.percentComplete}% complete</p>
                      </div>
                    </div>
                    <Link
                      href="/athlete/deals"
                      className="flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-lg"
                    >
                      Find Deals Near You
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Live Marketplace Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Active Opportunities",
                    value: stats.activeOpportunities,
                    suffix: "",
                    icon: Target,
                    color: "text-brand",
                    bg: "bg-brand/10",
                  },
                  {
                    label: "Value Near You",
                    value: stats.totalActiveValue,
                    suffix: "",
                    icon: DollarSign,
                    color: "text-emerald-600",
                    bg: "bg-emerald-100",
                  },
                  {
                    label: "Total Earnings",
                    value: formatCurrency(athlete.totalEarnings),
                    suffix: "",
                    icon: TrendingUp,
                    color: "text-blue-600",
                    bg: "bg-blue-100",
                  },
                  {
                    label: "Local-Fit Score",
                    value: athlete.localFitScore,
                    suffix: "/100",
                    icon: Star,
                    color: "text-amber-600",
                    bg: "bg-amber-100",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">{stat.label}</span>
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.bg}`}
                      >
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-extrabold ${stat.color}`}>
                        {stat.value}
                      </span>
                      <span className="text-sm text-muted">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Opportunities */}
              <LiveOpportunities opportunities={nearbyOpps} maxShow={3} />

              {/* Outreach Queue */}
              {athleteOutreach.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold">
                      <Send className="h-4 w-4 text-brand" />
                      Outreach Queue
                    </h3>
                    <Link href="/athlete/deals" className="text-xs font-semibold text-brand hover:underline">
                      Manage outreach →
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {athleteOutreach.map((msg) => (
                      <div key={msg.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-sm font-bold text-brand">
                            {msg.businessName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">{msg.businessName}</h4>
                            <p className="text-xs text-muted">{msg.subject}</p>
                          </div>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          msg.status === "sent" ? "bg-blue-100 text-blue-700" :
                          msg.status === "replied" ? "bg-emerald-100 text-emerald-700" :
                          msg.status === "opened" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Deals */}
              <div>
                <h2 className="mb-4 text-lg font-bold">Recent Deals</h2>
                <div className="space-y-3">
                  {athleteDeals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
                      <p className="text-muted">No deals yet — that&apos;s about to change.</p>
                      <Link
                        href="/athlete/deals"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                      >
                        Find your first deal <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ) : (
                    athleteDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="flex items-center justify-between rounded-xl border border-border bg-white p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-sm font-bold text-brand">
                            {deal.businessName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">
                              {deal.title}
                            </h4>
                            <p className="text-xs text-muted">
                              {deal.businessName} &middot;{" "}
                              {getCampaignTypeLabel(deal.campaignType)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(deal.status)}`}
                          >
                            {deal.status}
                          </span>
                          <span className="text-sm font-bold">
                            {formatCurrency(deal.amount)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Deals Tab */}
          {activeTab === "deals" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">All Deals</h2>
                <Link
                  href="/athlete/deals"
                  className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                  Find New Deals <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-amber-600">
                    {athleteDeals.filter((d) => d.status === "pending").length}
                  </div>
                  <div className="text-xs text-muted">Pending</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-blue-600">
                    {athleteDeals.filter((d) => d.status === "active").length}
                  </div>
                  <div className="text-xs text-muted">Active</div>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <div className="text-2xl font-extrabold text-emerald-600">
                    {
                      athleteDeals.filter((d) => d.status === "completed")
                        .length
                    }
                  </div>
                  <div className="text-xs text-muted">Completed</div>
                </div>
              </div>

              <div className="space-y-3">
                {athleteDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{deal.title}</h3>
                        <p className="mt-1 text-sm text-muted">
                          {deal.businessName}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(deal.status)}`}
                      >
                        {deal.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {deal.description}
                    </p>
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
                ))}
              </div>
            </div>
          )}

          {/* Contracts Tab */}
          {activeTab === "contracts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Contracts & Escrow</h2>
                <span className="text-sm text-muted">{athleteContracts.length} contract(s)</span>
              </div>

              {athleteContracts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
                  <p className="text-muted">No contracts yet. Complete a deal to see contracts here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {athleteContracts.map((contract) => (
                    <div key={contract.id} className="rounded-2xl border border-border bg-white">
                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{contract.businessName}</h3>
                            <p className="text-sm text-muted">{getCampaignTypeLabel(contract.campaignType)}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getContractStatusColor(contract.status)}`}>
                              {getContractStatusLabel(contract.status)}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getEscrowStatusColor(contract.escrow.status)}`}>
                              {getEscrowStatusLabel(contract.escrow.status)}
                            </span>
                          </div>
                        </div>

                        {/* Financial Breakdown */}
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="rounded-lg bg-surface p-3 text-center">
                            <div className="text-lg font-bold">{formatCurrency(contract.amount)}</div>
                            <div className="text-xs text-muted">Total Value</div>
                          </div>
                          <div className="rounded-lg bg-surface p-3 text-center">
                            <div className="text-lg font-bold text-muted">{formatCurrency(contract.platformFee)}</div>
                            <div className="text-xs text-muted">Platform Fee (10%)</div>
                          </div>
                          <div className="rounded-lg bg-surface p-3 text-center">
                            <div className="text-lg font-bold text-emerald-600">{formatCurrency(contract.athletePayout)}</div>
                            <div className="text-xs text-muted">Your Payout</div>
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Deliverables</h4>
                          <ul className="mt-1.5 space-y-1">
                            {contract.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-1.5 text-sm">
                                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Signatures */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${contract.signedByAthlete ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                            {contract.signedByAthlete ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            Athlete {contract.signedByAthlete ? "Signed" : "Pending"}
                          </span>
                          <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${contract.signedByBusiness ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                            {contract.signedByBusiness ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            Business {contract.signedByBusiness ? "Signed" : "Pending"}
                          </span>
                          {contract.parentRequired && (
                            <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${contract.signedByParent ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}>
                              {contract.signedByParent ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              Parent {contract.signedByParent ? "Approved" : "Pending"}
                            </span>
                          )}
                        </div>

                        {/* Compliance Notes */}
                        {contract.complianceNotes.length > 0 && (
                          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <h4 className="text-xs font-semibold text-amber-700">Compliance Notes</h4>
                            <ul className="mt-1 space-y-0.5">
                              {contract.complianceNotes.map((note) => (
                                <li key={note} className="text-xs text-amber-600">• {note}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Dates */}
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                          <span>Duration: {contract.duration}</span>
                          <span>Start: {formatDate(contract.startDate)}</span>
                          <span>End: {formatDate(contract.endDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Media Kit Tab — Upgraded as Sales Tool */}
          {activeTab === "mediakit" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your Media Kit</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-surface">
                    <Share2 className="h-4 w-4" />
                    Share Link
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                {/* Kit Header */}
                <div className="flex flex-col items-center border-b border-border pb-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-2xl font-bold text-white">
                    {athlete.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold">
                    {athlete.name}
                  </h3>
                  <p className="text-muted">
                    {athlete.sport} &middot; {getLevelLabel(athlete.level)}{" "}
                    &middot; {athlete.school}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-muted">{athlete.bio}</p>
                  <button className="mt-4 flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark">
                    <MessageSquare className="h-4 w-4" />
                    Book This Athlete
                  </button>
                </div>

                {/* Kit Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Local-Fit Score", value: `${athlete.localFitScore}/100`, icon: Star },
                    { label: "Community Score", value: `${athlete.communityScore}/100`, icon: Users },
                    { label: "Completed Deals", value: athlete.completedDeals, icon: CheckCircle2 },
                    { label: "Social Reach", value: athlete.socialFollowers.toLocaleString(), icon: Share2 },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-surface p-4 text-center">
                      <item.icon className="mx-auto h-5 w-5 text-brand" />
                      <div className="mt-2 text-lg font-bold">{item.value}</div>
                      <div className="text-xs text-muted">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* WHY BUSINESSES SHOULD HIRE — New Section */}
                <div className="mt-6 rounded-xl border border-brand/10 bg-brand/5 p-5">
                  <h4 className="flex items-center gap-2 font-bold text-brand">
                    <Building2 className="h-4 w-4" />
                    Why Businesses Should Partner with {athlete.name.split(" ")[0]}
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {athlete.strengths.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local Audience Value */}
                <div className="mt-6">
                  <h4 className="font-bold">Local Audience Value</h4>
                  <p className="mt-1 text-sm text-muted">
                    {athlete.audienceLocality}% of {athlete.name.split(" ")[0]}&apos;s audience is within the local community.
                    Content style: {athlete.contentStyle}
                  </p>
                </div>

                {/* Past Highlights */}
                <div className="mt-6">
                  <h4 className="font-bold">Highlights</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {athlete.pastHighlights.map((h) => (
                      <span key={h} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal Partners */}
                <div className="mt-6">
                  <h4 className="font-bold">Ideal Business Partners</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {athlete.idealPartners.map((p) => (
                      <span key={p} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Guidance */}
                <div className="mt-6">
                  <h4 className="font-bold">Suggested Pricing</h4>
                  <p className="mb-3 text-xs text-muted">
                    Based on your level, location, and community engagement
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { type: "Social Media Post", range: "$100 - $300" },
                      { type: "In-Store Appearance", range: "$200 - $500" },
                      { type: "Content Creation", range: "$150 - $400" },
                      { type: "Brand Ambassador (monthly)", range: "$400 - $1,200" },
                    ].map((item) => (
                      <div
                        key={item.type}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <span className="text-sm">{item.type}</span>
                        <span className="text-sm font-bold text-emerald-600">
                          {item.range}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* First Deal Guide Tab — Action-Driven */}
          {activeTab === "guide" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold">
                  Get Your First Deal — Action Guide
                </h2>
                <p className="text-sm text-muted">
                  Each step has one clear action. Complete them all and you&apos;ll have your first deal.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-brand transition-all"
                      style={{ width: `${progress.percentComplete}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-brand">{progress.percentComplete}%</span>
                </div>
              </div>

              <div className="space-y-4">
                {progress.steps.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`rounded-xl border bg-white p-5 ${
                      item.done
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          item.done
                            ? "bg-emerald-500 text-white"
                            : "bg-brand/10 text-brand"
                        }`}
                      >
                        {item.done ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-bold ${item.done ? "text-emerald-800" : ""}`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm ${item.done ? "text-emerald-600" : "text-muted"}`}
                        >
                          {item.description}
                        </p>
                        {!item.done && item.actionHref && (
                          <Link
                            href={item.actionHref}
                            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                          >
                            {item.actionLabel}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-brand" />
                <h3 className="mt-3 text-lg font-bold">
                  Need Help? We&apos;ve Got You.
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Our team can craft your first pitch, review deal
                  terms, or connect you with a local business directly.
                </p>
                <button className="mt-4 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                  Request 1-on-1 Help
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
