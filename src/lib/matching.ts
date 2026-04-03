import {
  type Athlete,
  type Business,
  type MatchResult,
  type OutcomePackage,
  type Opportunity,
  outcomePackages,
} from "./data";

// ============================================================
// DISTANCE
// ============================================================

export function computeDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// ============================================================
// MATCH SCORING — Athlete → Business
// ============================================================

function sportRelevanceScore(athlete: Athlete, business: Business): number {
  const match = business.preferredSports.some((s) =>
    athlete.sports.includes(s)
  );
  return match ? 1 : 0.3;
}

function categoryFitScore(athlete: Athlete, business: Business): number {
  const partnerLower = athlete.idealPartners.map((p) => p.toLowerCase());
  const bizType = business.type.toLowerCase();
  const bizCategory = business.category.toLowerCase();
  if (
    partnerLower.some(
      (p) => bizType.includes(p) || bizCategory.includes(p) || p.includes(bizType) || p.includes(bizCategory)
    )
  )
    return 1;
  return 0.4;
}

function proximityScore(distance: number): number {
  if (distance <= 1) return 1;
  if (distance <= 5) return 0.9;
  if (distance <= 10) return 0.7;
  if (distance <= 25) return 0.5;
  return 0.2;
}

function budgetFitScore(athlete: Athlete, business: Business): number {
  // Athletes with fewer deals are better fits for lower budgets
  if (athlete.completedDeals <= 2 && business.budgetRange.max >= 100) return 0.9;
  if (athlete.completedDeals <= 5 && business.budgetRange.max >= 200) return 0.85;
  if (business.budgetRange.max >= 500) return 0.8;
  return 0.6;
}

export function computeMatchScore(
  athlete: Athlete,
  business: Business
): MatchResult {
  const distance = computeDistance(
    athlete.lat,
    athlete.lng,
    business.lat,
    business.lng
  );

  // Weighted scoring
  const proximity = proximityScore(distance) * 0.25;
  const sport = sportRelevanceScore(athlete, business) * 0.15;
  const community = (athlete.communityScore / 100) * 0.2;
  const category = categoryFitScore(athlete, business) * 0.15;
  const budget = budgetFitScore(athlete, business) * 0.1;
  const reliability = (athlete.reliabilityScore / 100) * 0.1;
  const historicalBonus = business.historicalSponsor ? 0.05 : 0;

  const rawScore =
    proximity + sport + community + category + budget + reliability + historicalBonus;
  const score = Math.min(Math.round(rawScore * 100), 99);

  // Build reasons
  const reasons: string[] = [];
  if (distance <= 5)
    reasons.push(
      `Only ${distance} mile${distance !== 1 ? "s" : ""} from your location`
    );
  if (sportRelevanceScore(athlete, business) === 1)
    reasons.push(
      `${athlete.sport} aligns with ${business.name}'s preferred sports`
    );
  if (athlete.communityScore >= 85)
    reasons.push("Strong community involvement and local credibility");
  if (categoryFitScore(athlete, business) === 1)
    reasons.push(
      `${business.type} is an ideal partner category for this athlete`
    );
  if (business.historicalSponsor)
    reasons.push(`${business.name} has sponsored athletes before`);
  if (athlete.audienceLocality >= 80)
    reasons.push(
      `${athlete.audienceLocality}% of audience is local — high-value reach`
    );
  if (athlete.reliabilityScore >= 95)
    reasons.push("Excellent reliability score — delivers on time");

  if (reasons.length === 0)
    reasons.push("General community fit based on location and profile");

  // Suggest best package
  const suggestedPkg = getSuggestedPackage(athlete, business);

  // Likelihood
  let likelihoodToConvert: "high" | "medium" | "low" = "medium";
  if (score >= 80) likelihoodToConvert = "high";
  else if (score < 60) likelihoodToConvert = "low";

  // Estimated time
  let estimatedTimeToClose = "1-2 weeks";
  if (likelihoodToConvert === "high") estimatedTimeToClose = "3-5 days";
  else if (likelihoodToConvert === "low") estimatedTimeToClose = "2-4 weeks";

  return {
    athleteId: athlete.id,
    businessId: business.id,
    score,
    reasons,
    suggestedPackage: suggestedPkg.id,
    suggestedPriceRange: suggestedPkg.priceRange,
    likelihoodToConvert,
    estimatedTimeToClose,
    distance,
  };
}

// ============================================================
// PACKAGE SUGGESTION
// ============================================================

function getSuggestedPackage(
  athlete: Athlete,
  business: Business
): OutcomePackage {
  // Try to match business goal to package
  const goalPkg = outcomePackages.find((p) =>
    business.goals.includes(p.businessGoal)
  );

  // Also check if athlete supports the deal type
  if (goalPkg && athlete.availableDealTypes.includes(goalPkg.type)) {
    return goalPkg;
  }

  // Fallback: find any package matching athlete's available types and business category
  const fallback = outcomePackages.find(
    (p) =>
      athlete.availableDealTypes.includes(p.type) &&
      p.idealBusinessTypes.includes(business.category)
  );

  return fallback || outcomePackages[0];
}

// ============================================================
// RANKED RECOMMENDATIONS
// ============================================================

export function getRecommendedBusinesses(
  athlete: Athlete,
  allBusinesses: Business[],
  limit: number = 10,
  maxDistanceMiles: number = 50
): (MatchResult & { business: Business })[] {
  return allBusinesses
    .map((business) => {
      const match = computeMatchScore(athlete, business);
      return { ...match, business };
    })
    .filter((m) => m.distance <= maxDistanceMiles)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getRecommendedAthletes(
  business: Business,
  allAthletes: Athlete[],
  limit: number = 10,
  maxDistanceMiles: number = 50
): (MatchResult & { athlete: Athlete })[] {
  return allAthletes
    .map((athlete) => {
      const match = computeMatchScore(athlete, business);
      return { ...match, athlete };
    })
    .filter((m) => m.distance <= maxDistanceMiles)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// ============================================================
// OPPORTUNITY MATCHING
// ============================================================

export function getMatchingOpportunities(
  athlete: Athlete,
  allOpportunities: Opportunity[],
  maxDistanceMiles: number = 25
): (Opportunity & { distance: number })[] {
  return allOpportunities
    .map((opp) => {
      const distance = computeDistance(
        athlete.lat,
        athlete.lng,
        opp.lat,
        opp.lng
      );
      return { ...opp, distance };
    })
    .filter((o) => o.distance <= maxDistanceMiles)
    .sort((a, b) => a.distance - b.distance);
}

// ============================================================
// OUTREACH GENERATION
// ============================================================

export function generateOutreachDraft(
  athlete: Athlete,
  business: Business,
  matchResult: MatchResult
): { subject: string; body: string } {
  const pkg = outcomePackages.find((p) => p.id === matchResult.suggestedPackage);
  const pkgName = pkg?.featureTitle || "a partnership";

  const subject = `Local ${athlete.level === "high_school" ? "HS" : athlete.level.toUpperCase()} Athlete — ${pkgName} Opportunity`;

  const body = `Hi ${business.name},

I'm ${athlete.name}, a ${athlete.sport} athlete at ${athlete.school} in ${athlete.city}. ${matchResult.reasons[0] ? matchResult.reasons[0] + "." : ""}

With a ${athlete.localFitScore}/100 Local-Fit Score and ${athlete.socialFollowers.toLocaleString()} local followers, I can help ${pkg?.outcomeDescription?.toLowerCase() || "drive local awareness for your business"}.

I'd love to discuss ${pkgName.toLowerCase()} — estimated range ${formatPrice(matchResult.suggestedPriceRange.min)}-${formatPrice(matchResult.suggestedPriceRange.max)}.

Would you be open to a quick conversation this week?

Best,
${athlete.name}`;

  return { subject, body };
}

function formatPrice(amount: number): string {
  return "$" + amount.toLocaleString();
}

// ============================================================
// URGENCY HELPERS
// ============================================================

export function getUrgencyLabel(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diffDays = Math.ceil(
    (expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "Expired";
  if (diffDays <= 1) return "Closes today";
  if (diffDays <= 3) return `Closes in ${diffDays} days`;
  if (diffDays <= 7) return "Closes this week";
  return `${diffDays} days left`;
}

export function getLikelihoodColor(
  likelihood: "high" | "medium" | "low"
): string {
  switch (likelihood) {
    case "high":
      return "text-emerald-600 bg-emerald-50";
    case "medium":
      return "text-amber-600 bg-amber-50";
    case "low":
      return "text-red-500 bg-red-50";
  }
}

export function getLikelihoodLabel(
  likelihood: "high" | "medium" | "low"
): string {
  switch (likelihood) {
    case "high":
      return "High likelihood";
    case "medium":
      return "Moderate likelihood";
    case "low":
      return "Lower likelihood";
  }
}
