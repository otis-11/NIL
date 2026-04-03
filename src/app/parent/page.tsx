"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  Eye,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  FileText,
  DollarSign,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

const pendingApprovals: {
  id: string;
  athleteName: string;
  businessName: string;
  campaignType: string;
  amount: number;
  description: string;
  createdAt: string;
  deliverables: string[];
  contractSafe: boolean;
  stateCompliant: boolean;
  riskScore: RiskLevel;
  riskFlags: string[];
}[] = [
  {
    id: "pa-1",
    athleteName: "Aiden Brooks",
    businessName: "Riverside Chiropractic",
    campaignType: "Product Endorsement",
    amount: 500,
    description:
      "Testimonial video and social media endorsement for the clinic's sports recovery program.",
    createdAt: "2026-03-20",
    deliverables: [
      "1 testimonial video (60-90 seconds)",
      "2 social media posts",
      "3-month usage rights",
    ],
    contractSafe: true,
    stateCompliant: true,
    riskScore: "low",
    riskFlags: [],
  },
  {
    id: "pa-2",
    athleteName: "Aiden Brooks",
    businessName: "Victory Sports Nutrition",
    campaignType: "Product Review",
    amount: 250,
    description:
      "Unboxing and review of protein supplement line on social media.",
    createdAt: "2026-03-22",
    deliverables: [
      "1 unboxing/review video",
      "1 social post with product tag",
    ],
    contractSafe: true,
    stateCompliant: true,
    riskScore: "medium",
    riskFlags: ["Supplement product — verify claims are appropriate"],
  },
];

const milestones = [
  { label: "Profile Created", date: "2026-01-10", done: true },
  { label: "First Deal Approved", date: "2026-02-15", done: true },
  { label: "$500 Total Earned", date: "2026-03-05", done: true },
  { label: "5 Deals Completed", date: null, done: false },
  { label: "$2,000 Total Earned", date: null, done: false },
];

const dealHistory = [
  {
    id: "ph-1",
    athleteName: "Aiden Brooks",
    businessName: "Riverside Chiropractic",
    amount: 300,
    status: "completed" as const,
    date: "2026-02-15",
    parentApproved: true,
  },
  {
    id: "ph-2",
    athleteName: "Aiden Brooks",
    businessName: "Ace Hardware Riverside",
    amount: 150,
    status: "declined" as const,
    date: "2026-01-28",
    parentApproved: false,
    declineReason: "Conflict with school schedule",
  },
];

export default function ParentPortal() {
  const [expandedApproval, setExpandedApproval] = useState<string | null>(null);
  const [approvedDeals, setApprovedDeals] = useState<string[]>([]);
  const [declinedDeals, setDeclinedDeals] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedDeals((prev) => [...prev, id]);
    setDeclinedDeals((prev) => prev.filter((d) => d !== id));
  };

  const handleDecline = (id: string) => {
    setDeclinedDeals((prev) => [...prev, id]);
    setApprovedDeals((prev) => prev.filter((d) => d !== id));
  };

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 bg-surface">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-violet-950 to-purple-800">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-violet-200">
                <Shield className="h-4 w-4 text-emerald-400" />
                Trust & Safety First
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Parent & Guardian Portal
              </h1>
              <p className="mt-3 text-lg text-violet-200">
                Full visibility. Full control. Every deal your child considers
                goes through you first.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Trust & Safety Overview */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Full Visibility",
                desc: "See every deal, message, and payment in real-time",
                color: "text-blue-600",
                bg: "bg-blue-100",
              },
              {
                icon: Lock,
                title: "Approval Required",
                desc: "No deal proceeds without your explicit consent",
                color: "text-brand",
                bg: "bg-brand/10",
              },
              {
                icon: Shield,
                title: "Safety Checks",
                desc: "Platform verifies contracts, compliance, and payments",
                color: "text-emerald-600",
                bg: "bg-emerald-100",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="mt-3 font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="mb-8 rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <FileText className="h-5 w-5 text-brand" />
              Athlete Milestones
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={m.label} className="relative flex items-start gap-4 pl-4">
                    <div
                      className={`absolute left-2.5 flex h-3 w-3 items-center justify-center rounded-full ring-2 ring-white ${
                        m.done ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    <div className="ml-4">
                      <p className={`text-sm font-semibold ${m.done ? "text-foreground" : "text-muted"}`}>
                        {m.label}
                      </p>
                      {m.date && (
                        <p className="text-xs text-muted">{formatDate(m.date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold">
                Pending Approvals ({pendingApprovals.length})
              </h2>
            </div>

            <div className="space-y-4">
              {pendingApprovals.map((deal) => {
                const isApproved = approvedDeals.includes(deal.id);
                const isDeclined = declinedDeals.includes(deal.id);
                const isExpanded = expandedApproval === deal.id;

                if (isApproved) {
                  return (
                    <div
                      key={deal.id}
                      className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        <div>
                          <h3 className="font-bold text-emerald-800">
                            Approved: {deal.campaignType}
                          </h3>
                          <p className="text-sm text-emerald-600">
                            {deal.athleteName} × {deal.businessName} —{" "}
                            {formatCurrency(deal.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isDeclined) {
                  return (
                    <div
                      key={deal.id}
                      className="rounded-xl border border-red-200 bg-red-50 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="h-6 w-6 text-red-600" />
                        <div>
                          <h3 className="font-bold text-red-800">
                            Declined: {deal.campaignType}
                          </h3>
                          <p className="text-sm text-red-600">
                            {deal.athleteName} × {deal.businessName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={deal.id}
                    className="rounded-xl border border-amber-200 bg-white"
                  >
                    <div
                      className="flex cursor-pointer items-center justify-between p-5"
                      onClick={() =>
                        setExpandedApproval(isExpanded ? null : deal.id)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-bold">{deal.campaignType}</h3>
                          <p className="text-sm text-muted">
                            {deal.athleteName} × {deal.businessName} —{" "}
                            <span className="font-semibold text-emerald-600">
                              {formatCurrency(deal.amount)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {deal.riskScore === "low" && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                            Low Risk
                          </span>
                        )}
                        {deal.riskScore === "medium" && (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                            Medium Risk
                          </span>
                        )}
                        {deal.riskScore === "high" && (
                          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                            High Risk
                          </span>
                        )}
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          Needs Review
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border px-5 pb-5 pt-4">
                        <p className="text-sm text-muted">
                          {deal.description}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-surface p-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                              Deliverables
                            </div>
                            <ul className="mt-2 space-y-1">
                              {deal.deliverables.map((d) => (
                                <li
                                  key={d}
                                  className="flex items-center gap-1.5 text-sm"
                                >
                                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <div className="rounded-lg bg-surface p-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted">Amount</span>
                                <span className="font-bold text-emerald-600">
                                  {formatCurrency(deal.amount)}
                                </span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted">
                                  Contract Safe
                                </span>
                                <span className="flex items-center gap-1 font-medium text-emerald-600">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Verified
                                </span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-surface p-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted">
                                  State Compliant
                                </span>
                                <span className="flex items-center gap-1 font-medium text-emerald-600">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Compliant
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {deal.riskFlags.length > 0 && (
                          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Safety Flags
                            </div>
                            <ul className="mt-1.5 space-y-1">
                              {deal.riskFlags.map((f: string) => (
                                <li key={f} className="text-xs text-amber-600">
                                  • {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-4 flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecline(deal.id);
                            }}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Decline
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(deal.id);
                            }}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve Deal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deal History */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold">Deal History</h2>
            <div className="space-y-3">
              {dealHistory.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        deal.status === "completed"
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }`}
                    >
                      {deal.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {deal.businessName}
                      </h4>
                      <p className="text-xs text-muted">
                        {formatDate(deal.date)}
                        {deal.declineReason && ` — ${deal.declineReason}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {formatCurrency(deal.amount)}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        deal.status === "completed"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {deal.parentApproved ? "Parent Approved" : "Parent Declined"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Bell className="h-5 w-5 text-brand" />
              Notification Preferences
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "New deal proposals",
                  desc: "Get notified when a business sends a deal offer",
                  default: true,
                },
                {
                  label: "Deal completion",
                  desc: "Get notified when a deal is completed and payment released",
                  default: true,
                },
                {
                  label: "Profile views",
                  desc: "Get notified when businesses view your child's profile",
                  default: false,
                },
                {
                  label: "Weekly summary",
                  desc: "Receive a weekly email digest of all activity",
                  default: true,
                },
                {
                  label: "State law changes",
                  desc: "Get notified when NIL rules change in your state",
                  default: true,
                },
              ].map((pref) => (
                <label
                  key={pref.label}
                  className="flex items-start justify-between gap-4 rounded-lg border border-border p-3"
                >
                  <div>
                    <div className="text-sm font-semibold">{pref.label}</div>
                    <div className="text-xs text-muted">{pref.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={pref.default}
                    className="mt-0.5 h-5 w-5 rounded border-border accent-violet-600"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
