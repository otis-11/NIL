import { type Opportunity, type Athlete, type Business, opportunities, businesses } from "./data";
import { computeDistance } from "./matching";
import { formatCurrency } from "./utils";

// ============================================================
// LIVE MARKETPLACE STATS
// ============================================================

export function getActiveOpportunitiesNearAthlete(
  athlete: Athlete,
  maxMiles: number = 25
): Opportunity[] {
  return opportunities.filter((opp) => {
    const dist = computeDistance(athlete.lat, athlete.lng, opp.lat, opp.lng);
    return dist <= maxMiles;
  });
}

export function getTotalActiveValue(opps: Opportunity[]): number {
  return opps.reduce((sum, o) => sum + (o.valueRange.min + o.valueRange.max) / 2, 0);
}

export function getBusinessesLookingCount(
  athlete: Athlete,
  maxMiles: number = 25
): number {
  const nearbyOpps = getActiveOpportunitiesNearAthlete(athlete, maxMiles);
  const uniqueBizIds = new Set(nearbyOpps.map((o) => o.businessId));
  return uniqueBizIds.size;
}

export function getNewOpportunitiesThisWeek(
  athlete: Athlete,
  maxMiles: number = 25
): Opportunity[] {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return getActiveOpportunitiesNearAthlete(athlete, maxMiles).filter(
    (opp) => new Date(opp.postedAt) >= weekAgo
  );
}

// ============================================================
// MARKETPLACE ENERGY STATS (for dashboard display)
// ============================================================

export interface MarketplaceStats {
  activeOpportunities: number;
  totalActiveValue: string;
  businessesLooking: number;
  newThisWeek: number;
  nearbyBusinessCount: number;
}

export function getMarketplaceStats(
  athlete: Athlete,
  maxMiles: number = 25
): MarketplaceStats {
  const nearbyOpps = getActiveOpportunitiesNearAthlete(athlete, maxMiles);
  const totalVal = getTotalActiveValue(nearbyOpps);
  const newThisWeek = getNewOpportunitiesThisWeek(athlete, maxMiles);

  const nearbyBiz = businesses.filter(
    (b) => computeDistance(athlete.lat, athlete.lng, b.lat, b.lng) <= maxMiles
  );

  return {
    activeOpportunities: nearbyOpps.length,
    totalActiveValue: formatCurrency(totalVal),
    businessesLooking: getBusinessesLookingCount(athlete, maxMiles),
    newThisWeek: newThisWeek.length,
    nearbyBusinessCount: nearbyBiz.length,
  };
}

// ============================================================
// BUSINESS-SIDE STATS
// ============================================================

export interface BusinessMarketplaceStats {
  athletesNearby: number;
  topMatchesThisWeek: number;
  activeCampaigns: number;
}

export function getBusinessMarketplaceStats(
  business: Business,
  allAthletes: Athlete[],
  maxMiles: number = 50
): BusinessMarketplaceStats {
  const nearby = allAthletes.filter(
    (a) => computeDistance(a.lat, a.lng, business.lat, business.lng) <= maxMiles
  );

  return {
    athletesNearby: nearby.length,
    topMatchesThisWeek: Math.min(nearby.length, 3),
    activeCampaigns: business.campaigns,
  };
}

// ============================================================
// FIRST DEAL PROGRESS
// ============================================================

export interface FirstDealProgress {
  steps: {
    id: string;
    title: string;
    description: string;
    actionLabel: string;
    actionHref: string | null;
    done: boolean;
  }[];
  completedCount: number;
  totalSteps: number;
  percentComplete: number;
  stepsRemaining: number;
}

export function getFirstDealProgress(athlete: Athlete, outreachSent: number, responsesReceived: number): FirstDealProgress {
  const mediaKitDone = athlete.bio.length > 20 && athlete.sports.length > 0;
  const matchesDone = true; // They can always access matches
  const outreachDone = outreachSent >= 3;
  const responsesDone = responsesReceived >= 1;
  const dealDone = athlete.completedDeals >= 1;

  const steps = [
    {
      id: "media-kit",
      title: "Complete Your Media Kit",
      description: "Your auto-generated media kit is ready. Add a personal touch and make sure it reflects your brand.",
      actionLabel: "Finish Media Kit",
      actionHref: "/athlete/dashboard?tab=mediakit",
      done: mediaKitDone,
    },
    {
      id: "find-matches",
      title: "Find 5 Local Business Matches",
      description: "We've identified businesses near you that are likely to partner. Review your top matches.",
      actionLabel: "Find Matches Now",
      actionHref: "/athlete/deals",
      done: matchesDone,
    },
    {
      id: "send-outreach",
      title: "Send Your First 3 Messages",
      description: "Use AI-generated outreach drafts personalized to each business. One-click send or customize.",
      actionLabel: "Send Outreach",
      actionHref: "/athlete/deals",
      done: outreachDone,
    },
    {
      id: "review-responses",
      title: "Review Incoming Responses",
      description: "Check your outreach queue for replies and new opportunities from businesses.",
      actionLabel: "See Responses",
      actionHref: "/athlete/deals",
      done: responsesDone,
    },
    {
      id: "accept-deal",
      title: "Accept Your First Legal Deal",
      description: "Review deal terms, sign through the platform, and start earning.",
      actionLabel: "Review Deal Terms",
      actionHref: null,
      done: dealDone,
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;

  return {
    steps,
    completedCount,
    totalSteps: steps.length,
    percentComplete: Math.round((completedCount / steps.length) * 100),
    stepsRemaining: steps.length - completedCount,
  };
}
