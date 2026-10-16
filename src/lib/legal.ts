import {
  type Athlete,
  type Business,
  type CampaignType,
  type Opportunity,
  getStateRule,
} from "./data";

// ============================================================
// TYPES
// ============================================================

export type LegalCheckResult = {
  allowed: boolean;
  warnings: string[];
  blockedReasons: string[];
  requiredActions: RequiredAction[];
  restrictedCategories: string[];
  maxDealValue?: number;
};

export type RequiredAction = {
  id: string;
  type: "parent_consent" | "school_notification" | "age_verification" | "state_waitlist";
  title: string;
  description: string;
  completed: boolean;
};

export type DealEligibility = {
  eligible: boolean;
  reasons: string[];
  blockers: string[];
  requiredBeforeProceeding: RequiredAction[];
};

// ============================================================
// CORE LEGAL CHECK — runs for every deal/opportunity
// ============================================================

export function checkLegalCompliance(
  athlete: Athlete,
  business: Business,
  campaignType: CampaignType,
  dealAmount: number
): LegalCheckResult {
  const rule = getStateRule(athlete.state);
  const warnings: string[] = [];
  const blockedReasons: string[] = [];
  const requiredActions: RequiredAction[] = [];
  const restrictedCategories: string[] = [];

  if (!rule) {
    warnings.push(`No state rules on file for ${athlete.state}. General NCAA NIL guidelines apply.`);
    return { allowed: true, warnings, blockedReasons, requiredActions, restrictedCategories };
  }

  // HS block check
  if (athlete.level === "high_school" && !rule.highSchoolAllowed) {
    blockedReasons.push(`High school NIL is not permitted in ${athlete.state}.`);
    requiredActions.push({
      id: "state-waitlist",
      type: "state_waitlist",
      title: "Join State Waitlist",
      description: `${athlete.state} does not allow HS NIL. Join the waitlist to be notified when this changes.`,
      completed: false,
    });
    return { allowed: false, warnings, blockedReasons, requiredActions, restrictedCategories: rule.restrictedCategories };
  }

  // Parent consent
  if (athlete.isMinor && rule.parentConsentRequired) {
    requiredActions.push({
      id: "parent-consent",
      type: "parent_consent",
      title: "Parent/Guardian Approval",
      description: `${athlete.state} requires parent/guardian consent for minors. Deal cannot proceed until approval is received.`,
      completed: athlete.parentApproved === true,
    });
    if (!athlete.parentApproved) {
      warnings.push("Parent/guardian approval is required before this deal can proceed.");
    }
  }

  // Age verification for minors
  if (athlete.isMinor) {
    requiredActions.push({
      id: "age-verify",
      type: "age_verification",
      title: "Age Verification",
      description: "Minor status confirmed. Additional protections apply to this deal.",
      completed: true,
    });
  }

  // School notification
  if (rule.schoolNotificationRequired) {
    requiredActions.push({
      id: "school-notify",
      type: "school_notification",
      title: "Notify School",
      description: `${athlete.state} requires that the athlete's school be notified of NIL activities before the deal begins.`,
      completed: false,
    });
    warnings.push(`School notification is required in ${athlete.state}.`);
  }

  // Restricted categories
  if (rule.restrictedCategories.length > 0) {
    restrictedCategories.push(...rule.restrictedCategories);
    const bizTypeLower = business.type.toLowerCase();
    const bizCategoryLower = business.category.toLowerCase();
    for (const cat of rule.restrictedCategories) {
      if (bizTypeLower.includes(cat) || bizCategoryLower.includes(cat)) {
        blockedReasons.push(`Business category "${business.type}" falls under restricted category "${cat}" in ${athlete.state}.`);
      }
    }
  }

  // Max deal value
  if (rule.maxDealValue && dealAmount > rule.maxDealValue) {
    blockedReasons.push(`Deal value $${dealAmount} exceeds the maximum allowed $${rule.maxDealValue} in ${athlete.state}.`);
  }

  const allowed = blockedReasons.length === 0;
  return { allowed, warnings, blockedReasons, requiredActions, restrictedCategories, maxDealValue: rule.maxDealValue };
}

// ============================================================
// DEAL ELIGIBILITY — full check for a specific deal
// ============================================================

export function checkDealEligibility(
  athlete: Athlete,
  business: Business,
  campaignType: CampaignType,
  dealAmount: number
): DealEligibility {
  const legal = checkLegalCompliance(athlete, business, campaignType, dealAmount);

  const blockers = [...legal.blockedReasons];
  const reasons: string[] = [];
  const requiredBeforeProceeding = legal.requiredActions.filter((a) => !a.completed);

  if (legal.allowed) {
    reasons.push("State compliance check passed");
    if (legal.warnings.length === 0) {
      reasons.push("No additional restrictions apply");
    }
  }

  if (requiredBeforeProceeding.length > 0) {
    reasons.push(`${requiredBeforeProceeding.length} action(s) required before deal can proceed`);
  }

  return {
    eligible: legal.allowed,
    reasons,
    blockers,
    requiredBeforeProceeding,
  };
}

// ============================================================
// OPPORTUNITY FILTERING — hide restricted campaigns from athletes
// ============================================================

export function filterOpportunitiesByLegal(
  athlete: Athlete,
  opportunities: Opportunity[],
  allBusinesses: { id: string; type: string; category: string }[]
): Opportunity[] {
  const rule = getStateRule(athlete.state);
  if (!rule) return opportunities;

  // If HS athlete in blocked state, no opportunities
  if (athlete.level === "high_school" && !rule.highSchoolAllowed) {
    return [];
  }

  // Filter out opportunities from businesses in restricted categories
  return opportunities.filter((opp) => {
    const biz = allBusinesses.find((b) => b.id === opp.businessId);
    if (!biz) return true;
    const bizTypeLower = biz.type.toLowerCase();
    const bizCategoryLower = biz.category.toLowerCase();
    return !rule.restrictedCategories.some(
      (cat) => bizTypeLower.includes(cat) || bizCategoryLower.includes(cat)
    );
  });
}

// ============================================================
// CAMPAIGN TYPE FILTERING — remove restricted campaign types
// ============================================================

export function getAvailableCampaignTypes(
  athlete: Athlete
): CampaignType[] {
  const rule = getStateRule(athlete.state);

  // Base available types from athlete profile
  const available = [...athlete.availableDealTypes];

  // If HS athlete in blocked state, nothing available
  if (athlete.level === "high_school" && rule && !rule.highSchoolAllowed) {
    return [];
  }

  return available;
}

// ============================================================
// STATE RULE SUMMARY — what platform behavior changes
// ============================================================

export interface PlatformBehaviorForState {
  state: string;
  ruleFound: boolean;
  hsBlocked: boolean;
  parentApprovalRequired: boolean;
  schoolNotificationRequired: boolean;
  restrictedCategories: string[];
  maxDealValue?: number;
  behaviorChanges: string[];
}

export function getPlatformBehavior(state: string, isMinor: boolean, isHighSchool: boolean): PlatformBehaviorForState {
  const rule = getStateRule(state);
  const behaviorChanges: string[] = [];

  if (!rule) {
    return {
      state,
      ruleFound: false,
      hsBlocked: false,
      parentApprovalRequired: false,
      schoolNotificationRequired: false,
      restrictedCategories: [],
      behaviorChanges: ["General NCAA NIL guidelines apply. No state-specific restrictions loaded."],
    };
  }

  const hsBlocked = isHighSchool && !rule.highSchoolAllowed;
  const parentApprovalRequired = isMinor && rule.parentConsentRequired;

  if (hsBlocked) {
    behaviorChanges.push("Deal flow is blocked — athlete shown waitlist registration instead");
    behaviorChanges.push("Campaigns and opportunities are hidden from browsing");
  }

  if (parentApprovalRequired) {
    behaviorChanges.push("Deal flow pauses at parent approval step before activation");
    behaviorChanges.push("Parent receives email notification with full deal details");
    behaviorChanges.push("Contract requires parent signature before becoming active");
  }

  if (rule.schoolNotificationRequired) {
    behaviorChanges.push("Reminder triggered during deal confirmation to notify school");
    behaviorChanges.push("Contract includes school notification clause");
  }

  if (rule.restrictedCategories.length > 0) {
    behaviorChanges.push(`Campaigns from restricted categories (${rule.restrictedCategories.join(", ")}) are hidden`);
    behaviorChanges.push("Contract includes content restriction clause");
  }

  if (rule.maxDealValue) {
    behaviorChanges.push(`Deals exceeding $${rule.maxDealValue} are blocked at checkout`);
  }

  return {
    state,
    ruleFound: true,
    hsBlocked,
    parentApprovalRequired,
    schoolNotificationRequired: rule.schoolNotificationRequired,
    restrictedCategories: rule.restrictedCategories,
    maxDealValue: rule.maxDealValue,
    behaviorChanges,
  };
}
