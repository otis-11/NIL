"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Share2,
  Users,
  Award,
  Video,
  Star,
  Trophy,
  PenTool,
  Package,
  Heart,
  Camera,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { outcomePackages, type OutcomePackage } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  share: Share2,
  users: Users,
  award: Award,
  video: Video,
  star: Star,
  trophy: Trophy,
  "pen-tool": PenTool,
  package: Package,
  heart: Heart,
  camera: Camera,
};

export default function CampaignsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? outcomePackages
    : outcomePackages.filter((p) => p.businessGoal === filter);

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 bg-surface">
        {/* Hero */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                <TrendingUp className="h-3 w-3" />
                Business Outcome Packages
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                What Do You Want to <span className="text-brand">Achieve</span>?
              </h1>
              <p className="mt-3 text-lg text-muted">
                Fixed packages with clear deliverables, clear pricing, and real ROI.
                Pick an outcome, not a feature.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {[
                { value: "all", label: "All Packages" },
                { value: "awareness", label: "Local Awareness" },
                { value: "foot_traffic", label: "Foot Traffic" },
                { value: "testimonial", label: "Trust & Credibility" },
                { value: "ambassador", label: "Ambassador" },
                { value: "event_promo", label: "Events" },
                { value: "youth_camp", label: "Youth Programs" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === f.value
                      ? "bg-brand text-white"
                      : "bg-surface text-muted hover:bg-gray-200 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {filtered.length} Outcome Package{filtered.length !== 1 ? "s" : ""}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Shield className="h-4 w-4 text-emerald-500" />
              All packages include safe contracts & escrow
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => {
              const Icon = iconMap[pkg.icon] || Zap;
              const isExpanded = expandedId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className="group flex flex-col rounded-2xl border border-border bg-white transition-all hover:border-brand/30 hover:shadow-lg"
                >
                  <div className="flex-1 p-6">
                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        {pkg.duration}
                      </span>
                      {pkg.popular && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Icon + Outcome Title */}
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{pkg.outcomeTitle}</h3>
                    <p className="mt-1 text-xs text-muted">{pkg.featureTitle}</p>
                    <p className="mt-2 text-sm text-muted">{pkg.outcomeDescription}</p>

                    {/* Ideal Business Types */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {pkg.idealBusinessTypes.slice(0, 4).map((t) => (
                        <span key={t} className="rounded bg-surface px-2 py-0.5 text-[10px] font-medium text-muted capitalize">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <div className="mt-4 border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                        What You Get
                      </p>
                      <ul className="space-y-1">
                        {pkg.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-1.5 text-xs text-muted"
                          >
                            <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ROI Preview */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3">
                        <div className="rounded-lg bg-emerald-50 p-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                            <BarChart3 className="h-3 w-3" />
                            Expected ROI
                          </div>
                          <p className="mt-1 text-xs text-emerald-600">{pkg.sampleROI}</p>
                        </div>

                        {pkg.addOns.length > 0 && (
                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                              Optional Add-Ons
                            </p>
                            <ul className="space-y-0.5">
                              {pkg.addOns.map((a) => (
                                <li key={a} className="text-xs text-muted">{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <p className="text-xs text-muted">
                            <span className="font-semibold">Best for:</span> {pkg.idealAthleteType}
                          </p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                      className="mt-3 text-xs font-semibold text-brand hover:underline"
                    >
                      {isExpanded ? "Show less" : "Show ROI & add-ons"}
                    </button>
                  </div>

                  {/* Footer: Price + CTA */}
                  <div className="border-t border-border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">
                        {formatCurrency(pkg.priceRange.min)}-{formatCurrency(pkg.priceRange.max)}
                      </span>
                      <Link
                        href="/business/launch"
                        className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                      >
                        Launch <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-extrabold">
              How It Works on <span className="text-brand">LocalNIL</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Pick Your Outcome",
                  desc: "Choose what you want to achieve — awareness, foot traffic, credibility, or growth",
                },
                {
                  step: "2",
                  title: "Get Matched Athletes",
                  desc: "We recommend local athletes who fit your business, budget, and goal",
                },
                {
                  step: "3",
                  title: "Launch in Minutes",
                  desc: "Fixed deliverables, fixed pricing. No negotiations needed.",
                },
                {
                  step: "4",
                  title: "Track Results",
                  desc: "See real ROI — foot traffic, engagement, reach, and conversions",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
