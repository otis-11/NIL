"use client";

import { Clock, DollarSign, MapPin, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type Opportunity } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface LiveOpportunitiesProps {
  opportunities: (Opportunity & { distance?: number })[];
  maxShow?: number;
  variant?: "athlete" | "business";
}

export default function LiveOpportunities({
  opportunities,
  maxShow = 3,
  variant = "athlete",
}: LiveOpportunitiesProps) {
  if (opportunities.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {variant === "athlete"
            ? "Active Opportunities Near You"
            : "Athletes Available Now"}
        </h3>
        <Link
          href={variant === "athlete" ? "/athlete/deals" : "/business/launch"}
          className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.slice(0, maxShow).map((opp) => (
          <div
            key={opp.id}
            className="rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white p-4 transition-all hover:border-amber-300 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">
                {opp.businessName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold">{opp.title}</h4>
                <p className="truncate text-xs text-muted">{opp.businessName}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <DollarSign className="h-3 w-3" />
                {formatCurrency(opp.valueRange.min)}-{formatCurrency(opp.valueRange.max)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                <Clock className="h-3 w-3" />
                {opp.urgencyCopy}
              </span>
            </div>
            {opp.distance !== undefined && (
              <div className="mt-2 flex items-center gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3" />
                {opp.distance} mi away
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
