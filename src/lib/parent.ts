import { type Athlete, type Deal, athletes, deals, stateRules } from "./data";
import { type Contract, mockContracts } from "./contracts";
import { checkLegalCompliance } from "./legal";

// ============================================================
// TYPES
// ============================================================

export type ApprovalStatus = "pending" | "approved" | "declined";

export interface ParentApproval {
  id: string;
  dealId: string;
  contractId: string;
  athleteId: string;
  athleteName: string;
  businessName: string;
  campaignType: string;
  amount: number;
  description: string;
  deliverables: string[];
  status: ApprovalStatus;
  createdAt: string;
  respondedAt?: string;
  declineReason?: string;
  riskLevel: "low" | "medium" | "high";
  riskFlags: string[];
  contractSafe: boolean;
  stateCompliant: boolean;
  parentEmail: string;
}

export interface ParentNotification {
  id: string;
  parentEmail: string;
  athleteId: string;
  type: "deal_proposal" | "deal_completed" | "payment_released" | "profile_viewed" | "state_law_change" | "weekly_summary";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface ParentDashboardData {
  athleteName: string;
  athleteId: string;
  pendingApprovals: ParentApproval[];
  approvalHistory: ParentApproval[];
  notifications: ParentNotification[];
  totalEarnings: number;
  completedDeals: number;
  activeDeals: number;
  parentEmail: string;
}

// ============================================================
// RISK ASSESSMENT
// ============================================================

function assessRisk(
  athlete: Athlete,
  deal: Deal,
  _contract: Contract | undefined
): { level: "low" | "medium" | "high"; flags: string[] } {
  const flags: string[] = [];
  let score = 0;

  // High amount for a minor
  if (deal.amount > 500) {
    flags.push("Deal value is above $500");
    score += 1;
  }
  if (deal.amount > 1000) {
    flags.push("High-value deal for minor athlete");
    score += 1;
  }

  // Check business type against common concerns
  const campaignLower = deal.campaignType.toLowerCase();
  if (campaignLower.includes("endorsement")) {
    flags.push("Endorsement deal — verify product/service is appropriate");
    score += 1;
  }
  if (campaignLower.includes("product_review")) {
    flags.push("Product review — ensure product is appropriate for minors");
    score += 1;
  }

  // Time commitment for students
  if (deal.campaignType === "ambassador") {
    flags.push("Long-term commitment — may impact academics/athletics");
    score += 1;
  }

  // State compliance
  const stateRule = stateRules.find((r) => r.state === athlete.state);
  if (stateRule?.schoolNotificationRequired) {
    flags.push("School must be notified of this NIL activity");
  }

  // First deal for athlete
  if (athlete.completedDeals === 0) {
    flags.push("This is the athlete's first deal — extra review recommended");
  }

  const level: "low" | "medium" | "high" = score >= 3 ? "high" : score >= 1 ? "medium" : "low";
  return { level, flags };
}

// ============================================================
// PARENT APPROVAL GENERATION
// ============================================================

export function createParentApproval(
  athlete: Athlete,
  deal: Deal,
  contract: Contract | undefined
): ParentApproval | null {
  if (!athlete.isMinor) return null;

  const stateRule = stateRules.find((r) => r.state === athlete.state);
  if (!stateRule?.parentConsentRequired) return null;

  const risk = assessRisk(athlete, deal, contract);
  const legalCheck = checkLegalCompliance(
    athlete,
    { id: deal.businessId, name: deal.businessName, type: "", category: "", city: "", state: "", lat: 0, lng: 0, logo: "", description: "", campaigns: 0, totalSpent: 0, rating: 0, preferredSports: [], budgetRange: { min: 0, max: 0 }, goals: [], historicalSponsor: false },
    deal.campaignType,
    deal.amount
  );

  return {
    id: `approval-${deal.id}`,
    dealId: deal.id,
    contractId: contract?.id ?? "",
    athleteId: athlete.id,
    athleteName: athlete.name,
    businessName: deal.businessName,
    campaignType: deal.campaignType.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    amount: deal.amount,
    description: deal.description,
    deliverables: contract?.deliverables ?? [],
    status: "pending",
    createdAt: deal.createdAt,
    riskLevel: risk.level,
    riskFlags: risk.flags,
    contractSafe: contract?.stateCompliant ?? true,
    stateCompliant: legalCheck.allowed,
    parentEmail: "",
  };
}

// ============================================================
// APPROVAL ACTIONS
// ============================================================

export function approveParentApproval(approval: ParentApproval): ParentApproval {
  return {
    ...approval,
    status: "approved",
    respondedAt: new Date().toISOString().split("T")[0],
  };
}

export function declineParentApproval(approval: ParentApproval, reason: string): ParentApproval {
  return {
    ...approval,
    status: "declined",
    respondedAt: new Date().toISOString().split("T")[0],
    declineReason: reason,
  };
}

// ============================================================
// PARENT NOTIFICATIONS
// ============================================================

export function generateParentNotifications(
  athleteId: string,
  parentEmail: string
): ParentNotification[] {
  const athlete = athletes.find((a) => a.id === athleteId);
  if (!athlete) return [];

  const athleteDeals = deals.filter((d) => d.athleteId === athleteId);

  const notifications: ParentNotification[] = [];

  // Pending deal notifications
  athleteDeals
    .filter((d) => d.status === "pending")
    .forEach((d) => {
      notifications.push({
        id: `pn-deal-${d.id}`,
        parentEmail,
        athleteId,
        type: "deal_proposal",
        title: `New Deal Proposal: ${d.title}`,
        body: `${d.businessName} has offered ${athlete.name} a ${d.campaignType.split("_").join(" ")} deal for $${d.amount}. Your approval is required.`,
        createdAt: d.createdAt,
        read: false,
      });
    });

  // Completed deal notifications
  athleteDeals
    .filter((d) => d.status === "completed")
    .forEach((d) => {
      notifications.push({
        id: `pn-complete-${d.id}`,
        parentEmail,
        athleteId,
        type: "deal_completed",
        title: `Deal Completed: ${d.title}`,
        body: `${athlete.name}'s ${d.campaignType.split("_").join(" ")} deal with ${d.businessName} has been completed. $${d.amount} has been released.`,
        createdAt: d.completedAt || d.createdAt,
        read: true,
      });
    });

  // Weekly summary
  notifications.push({
    id: `pn-weekly-${athleteId}`,
    parentEmail,
    athleteId,
    type: "weekly_summary",
    title: "Weekly Activity Summary",
    body: `${athlete.name} has ${athleteDeals.filter((d) => d.status === "active").length} active deal(s) and ${athleteDeals.filter((d) => d.status === "pending").length} pending deal(s). Total earnings: $${athlete.totalEarnings}.`,
    createdAt: new Date().toISOString().split("T")[0],
    read: false,
  });

  return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// ============================================================
// PARENT DASHBOARD DATA
// ============================================================

export function getParentDashboardData(athleteId: string, parentEmail: string): ParentDashboardData {
  const athlete = athletes.find((a) => a.id === athleteId);
  if (!athlete) {
    return {
      athleteName: "Unknown",
      athleteId,
      pendingApprovals: [],
      approvalHistory: [],
      notifications: [],
      totalEarnings: 0,
      completedDeals: 0,
      activeDeals: 0,
      parentEmail,
    };
  }

  const athleteDeals = deals.filter((d) => d.athleteId === athleteId);
  const pendingDeals = athleteDeals.filter((d) => d.status === "pending");
  const completedDeals = athleteDeals.filter((d) => d.status === "completed");
  const activeDeals = athleteDeals.filter((d) => d.status === "active");

  const pendingApprovals = pendingDeals
    .map((d) => {
      const contract = mockContracts.find((c) => c.dealId === d.id);
      return createParentApproval(athlete, d, contract);
    })
    .filter((a): a is ParentApproval => a !== null);

  const approvalHistory: ParentApproval[] = [...completedDeals, ...athleteDeals.filter((d) => d.status === "declined")]
    .map((d) => {
      const contract = mockContracts.find((c) => c.dealId === d.id);
      const approval = createParentApproval(athlete, d, contract);
      if (!approval) return null;
      const result: ParentApproval = {
        ...approval,
        status: (d.status === "completed" ? "approved" : "declined") as ApprovalStatus,
        respondedAt: d.completedAt || d.createdAt,
      };
      return result;
    })
    .filter((a): a is ParentApproval => a !== null);

  const notifications = generateParentNotifications(athleteId, parentEmail);

  return {
    athleteName: athlete.name,
    athleteId,
    pendingApprovals,
    approvalHistory,
    notifications,
    totalEarnings: athlete.totalEarnings,
    completedDeals: completedDeals.length,
    activeDeals: activeDeals.length,
    parentEmail,
  };
}

// ============================================================
// DEAL GATE — checks if deal can proceed without parent approval
// ============================================================

export function isDealGatedByParent(athlete: Athlete): boolean {
  if (!athlete.isMinor) return false;
  const stateRule = stateRules.find((r) => r.state === athlete.state);
  return stateRule?.parentConsentRequired ?? true; // Default to requiring consent for minors
}

export function canDealProceed(athlete: Athlete, parentApproved: boolean): { canProceed: boolean; reason: string } {
  if (!athlete.isMinor) {
    return { canProceed: true, reason: "Athlete is not a minor — no parent approval needed." };
  }

  const stateRule = stateRules.find((r) => r.state === athlete.state);
  if (!stateRule?.parentConsentRequired) {
    return { canProceed: true, reason: "State does not require parent consent." };
  }

  if (parentApproved) {
    return { canProceed: true, reason: "Parent/guardian has approved this deal." };
  }

  return { canProceed: false, reason: "Awaiting parent/guardian approval. Deal is paused until consent is received." };
}
