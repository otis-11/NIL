import {
  type Athlete,
  type Business,
  type Deal,
  type CampaignType,
  type OutcomePackage,
  stateRules,
  getCampaignTypeLabel,
} from "./data";

// ============================================================
// TYPES
// ============================================================

export type EscrowStatus =
  | "awaiting_funding"
  | "funded"
  | "deliverables_submitted"
  | "deliverables_approved"
  | "released"
  | "refunded"
  | "disputed";

export type ContractStatus =
  | "draft"
  | "pending_athlete"
  | "pending_business"
  | "pending_parent"
  | "active"
  | "completed"
  | "cancelled"
  | "expired";

export interface ContractClause {
  id: string;
  title: string;
  body: string;
  required: boolean;
  stateSpecific: boolean;
}

export interface EscrowTransaction {
  id: string;
  contractId: string;
  amount: number;
  status: EscrowStatus;
  fundedAt?: string;
  releasedAt?: string;
  refundedAt?: string;
  disputeReason?: string;
}

export interface Contract {
  id: string;
  dealId: string;
  athleteId: string;
  businessId: string;
  athleteName: string;
  businessName: string;
  campaignType: CampaignType;
  packageId: string;
  status: ContractStatus;
  amount: number;
  platformFee: number;
  athletePayout: number;
  clauses: ContractClause[];
  deliverables: string[];
  duration: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  signedByAthlete: boolean;
  signedByBusiness: boolean;
  signedByParent: boolean;
  parentRequired: boolean;
  escrow: EscrowTransaction;
  stateCompliant: boolean;
  complianceNotes: string[];
  cancellationDeadline: string;
}

// ============================================================
// CONTRACT GENERATION
// ============================================================

const PLATFORM_FEE_RATE = 0.1; // 10% take rate

function generateClauses(
  athlete: Athlete,
  business: Business,
  campaignType: CampaignType,
  amount: number
): ContractClause[] {
  const clauses: ContractClause[] = [
    {
      id: "cl-1",
      title: "Scope of Work",
      body: `${athlete.name} ("Athlete") agrees to perform ${getCampaignTypeLabel(campaignType)} services for ${business.name} ("Business") as described in the deliverables section of this contract.`,
      required: true,
      stateSpecific: false,
    },
    {
      id: "cl-2",
      title: "Compensation",
      body: `Business agrees to pay a total of $${amount.toLocaleString()} for the services described. Payment is held in escrow by LocalNIL and released upon confirmation of completed deliverables.`,
      required: true,
      stateSpecific: false,
    },
    {
      id: "cl-3",
      title: "Escrow & Payment Terms",
      body: `Funds are held in secure escrow by LocalNIL. Payment is released within 3 business days of deliverable approval. A 10% platform fee ($${Math.round(amount * PLATFORM_FEE_RATE).toLocaleString()}) is deducted from the total. Athlete receives $${Math.round(amount * (1 - PLATFORM_FEE_RATE)).toLocaleString()}.`,
      required: true,
      stateSpecific: false,
    },
    {
      id: "cl-4",
      title: "Content Rights",
      body: `Business receives usage rights to all content created under this agreement for marketing purposes for 90 days from delivery date, unless otherwise specified.`,
      required: true,
      stateSpecific: false,
    },
    {
      id: "cl-5",
      title: "Cancellation Policy",
      body: `Either party may cancel within 24 hours of contract signing for a full refund. After 24 hours, cancellation by the business forfeits 25% of the escrow to the athlete. Cancellation by the athlete returns 100% of escrow to the business.`,
      required: true,
      stateSpecific: false,
    },
    {
      id: "cl-6",
      title: "Platform Safety",
      body: `Both parties agree to conduct all deal-related communications and payments through the LocalNIL platform. Off-platform payments void this contract's protections.`,
      required: true,
      stateSpecific: false,
    },
  ];

  // State-specific clauses
  const stateRule = stateRules.find((r) => r.state === athlete.state);
  if (stateRule) {
    if (stateRule.parentConsentRequired && athlete.isMinor) {
      clauses.push({
        id: "cl-state-parent",
        title: `${athlete.state} Minor Protection Clause`,
        body: `Per ${athlete.state} state regulations, this contract requires explicit approval from the Athlete's parent or legal guardian before activation. The parent/guardian has reviewed all terms, deliverables, and compensation.`,
        required: true,
        stateSpecific: true,
      });
    }

    if (stateRule.schoolNotificationRequired) {
      clauses.push({
        id: "cl-state-school",
        title: `${athlete.state} School Notification Clause`,
        body: `Per ${athlete.state} state regulations, the Athlete's school or athletic department must be notified of this NIL activity. The Athlete is responsible for providing notification prior to commencing deliverables.`,
        required: true,
        stateSpecific: true,
      });
    }

    if (stateRule.restrictedCategories.length > 0) {
      clauses.push({
        id: "cl-state-restricted",
        title: `${athlete.state} Content Restrictions`,
        body: `This agreement does not involve or promote any of the following restricted categories in ${athlete.state}: ${stateRule.restrictedCategories.join(", ")}. Violation of this clause voids the contract and may result in platform suspension.`,
        required: true,
        stateSpecific: true,
      });
    }

    if (stateRule.maxDealValue && amount > stateRule.maxDealValue) {
      clauses.push({
        id: "cl-state-max",
        title: `${athlete.state} Deal Value Limitation`,
        body: `${athlete.state} imposes a maximum deal value of $${stateRule.maxDealValue.toLocaleString()} for athletes at this level. This contract has been adjusted to comply.`,
        required: true,
        stateSpecific: true,
      });
    }
  }

  return clauses;
}

export function generateContract(
  deal: Deal,
  athlete: Athlete,
  business: Business,
  pkg: OutcomePackage
): Contract {
  const platformFee = Math.round(deal.amount * PLATFORM_FEE_RATE);
  const athletePayout = deal.amount - platformFee;
  const stateRule = stateRules.find((r) => r.state === athlete.state);
  const parentRequired = athlete.isMinor && (stateRule?.parentConsentRequired ?? true);

  const complianceNotes: string[] = [];
  if (stateRule) {
    if (!stateRule.highSchoolAllowed && athlete.level === "high_school") {
      complianceNotes.push(`HS NIL not allowed in ${athlete.state} — contract blocked`);
    }
    if (stateRule.schoolNotificationRequired) {
      complianceNotes.push(`School notification required in ${athlete.state}`);
    }
    if (parentRequired) {
      complianceNotes.push(`Parent approval required for minor in ${athlete.state}`);
    }
  }

  const startDate = new Date();
  const endDate = new Date();
  // Parse duration to estimate end date
  if (pkg.duration.includes("month")) {
    const months = parseInt(pkg.duration) || 1;
    endDate.setMonth(endDate.getMonth() + months);
  } else if (pkg.duration.includes("week")) {
    const weeks = parseInt(pkg.duration) || 1;
    endDate.setDate(endDate.getDate() + weeks * 7);
  } else if (pkg.duration.includes("day")) {
    const days = parseInt(pkg.duration) || 3;
    endDate.setDate(endDate.getDate() + days);
  } else if (pkg.duration.includes("hour")) {
    endDate.setDate(endDate.getDate() + 1);
  } else {
    endDate.setDate(endDate.getDate() + 14);
  }

  const cancellationDeadline = new Date(startDate);
  cancellationDeadline.setDate(cancellationDeadline.getDate() + 1);

  const contractId = `contract-${deal.id}`;
  const escrowId = `escrow-${deal.id}`;

  return {
    id: contractId,
    dealId: deal.id,
    athleteId: athlete.id,
    businessId: business.id,
    athleteName: athlete.name,
    businessName: business.name,
    campaignType: deal.campaignType,
    packageId: pkg.id,
    status: parentRequired ? "pending_parent" : "pending_athlete",
    amount: deal.amount,
    platformFee,
    athletePayout,
    clauses: generateClauses(athlete, business, deal.campaignType, deal.amount),
    deliverables: pkg.deliverables,
    duration: pkg.duration,
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    createdAt: new Date().toISOString().split("T")[0],
    signedByAthlete: false,
    signedByBusiness: false,
    signedByParent: false,
    parentRequired,
    escrow: {
      id: escrowId,
      contractId,
      amount: deal.amount,
      status: "awaiting_funding",
    },
    stateCompliant: complianceNotes.every((n) => !n.includes("blocked")),
    complianceNotes,
    cancellationDeadline: cancellationDeadline.toISOString().split("T")[0],
  };
}

// ============================================================
// ESCROW STATE MACHINE
// ============================================================

export function advanceEscrow(
  escrow: EscrowTransaction,
  action: "fund" | "submit_deliverables" | "approve" | "release" | "refund" | "dispute"
): EscrowTransaction {
  const now = new Date().toISOString().split("T")[0];

  switch (action) {
    case "fund":
      if (escrow.status !== "awaiting_funding") return escrow;
      return { ...escrow, status: "funded", fundedAt: now };
    case "submit_deliverables":
      if (escrow.status !== "funded") return escrow;
      return { ...escrow, status: "deliverables_submitted" };
    case "approve":
      if (escrow.status !== "deliverables_submitted") return escrow;
      return { ...escrow, status: "deliverables_approved" };
    case "release":
      if (escrow.status !== "deliverables_approved") return escrow;
      return { ...escrow, status: "released", releasedAt: now };
    case "refund":
      if (escrow.status === "released") return escrow;
      return { ...escrow, status: "refunded", refundedAt: now };
    case "dispute":
      if (escrow.status === "released" || escrow.status === "refunded") return escrow;
      return { ...escrow, status: "disputed", disputeReason: "Dispute filed" };
    default:
      return escrow;
  }
}

export function advanceContract(
  contract: Contract,
  action: "athlete_sign" | "business_sign" | "parent_approve" | "activate" | "complete" | "cancel"
): Contract {
  switch (action) {
    case "athlete_sign":
      return { ...contract, signedByAthlete: true, status: contract.signedByBusiness ? (contract.parentRequired && !contract.signedByParent ? "pending_parent" : "active") : "pending_business" };
    case "business_sign":
      return { ...contract, signedByBusiness: true, status: contract.signedByAthlete ? (contract.parentRequired && !contract.signedByParent ? "pending_parent" : "active") : "pending_athlete" };
    case "parent_approve":
      if (!contract.parentRequired) return contract;
      return { ...contract, signedByParent: true, status: contract.signedByAthlete && contract.signedByBusiness ? "active" : contract.status };
    case "activate":
      if (!contract.signedByAthlete || !contract.signedByBusiness) return contract;
      if (contract.parentRequired && !contract.signedByParent) return contract;
      return { ...contract, status: "active" };
    case "complete":
      if (contract.status !== "active") return contract;
      return { ...contract, status: "completed" };
    case "cancel":
      if (contract.status === "completed") return contract;
      return { ...contract, status: "cancelled" };
    default:
      return contract;
  }
}

// ============================================================
// ESCROW STATUS HELPERS
// ============================================================

export function getEscrowStatusLabel(status: EscrowStatus): string {
  switch (status) {
    case "awaiting_funding": return "Awaiting Funding";
    case "funded": return "Funded & Held";
    case "deliverables_submitted": return "Deliverables Submitted";
    case "deliverables_approved": return "Deliverables Approved";
    case "released": return "Payment Released";
    case "refunded": return "Refunded";
    case "disputed": return "Under Dispute";
  }
}

export function getEscrowStatusColor(status: EscrowStatus): string {
  switch (status) {
    case "awaiting_funding": return "bg-gray-100 text-gray-700";
    case "funded": return "bg-blue-100 text-blue-700";
    case "deliverables_submitted": return "bg-amber-100 text-amber-700";
    case "deliverables_approved": return "bg-emerald-100 text-emerald-700";
    case "released": return "bg-emerald-100 text-emerald-800";
    case "refunded": return "bg-red-100 text-red-700";
    case "disputed": return "bg-red-100 text-red-800";
  }
}

export function getContractStatusLabel(status: ContractStatus): string {
  switch (status) {
    case "draft": return "Draft";
    case "pending_athlete": return "Awaiting Athlete Signature";
    case "pending_business": return "Awaiting Business Signature";
    case "pending_parent": return "Awaiting Parent Approval";
    case "active": return "Active";
    case "completed": return "Completed";
    case "cancelled": return "Cancelled";
    case "expired": return "Expired";
  }
}

export function getContractStatusColor(status: ContractStatus): string {
  switch (status) {
    case "draft": return "bg-gray-100 text-gray-700";
    case "pending_athlete": return "bg-amber-100 text-amber-700";
    case "pending_business": return "bg-amber-100 text-amber-700";
    case "pending_parent": return "bg-violet-100 text-violet-700";
    case "active": return "bg-blue-100 text-blue-700";
    case "completed": return "bg-emerald-100 text-emerald-700";
    case "cancelled": return "bg-red-100 text-red-700";
    case "expired": return "bg-gray-100 text-gray-600";
  }
}

// ============================================================
// MOCK CONTRACTS (tied to existing deals)
// ============================================================

export const mockContracts: Contract[] = [
  {
    id: "contract-deal-1",
    dealId: "deal-1",
    athleteId: "ath-1",
    businessId: "biz-1",
    athleteName: "Maya Chen",
    businessName: "Peak Performance Gym",
    campaignType: "social_post",
    packageId: "pkg-1",
    status: "completed",
    amount: 250,
    platformFee: 25,
    athletePayout: 225,
    clauses: [
      { id: "cl-1", title: "Scope of Work", body: "Maya Chen agrees to perform Social Post services for Peak Performance Gym.", required: true, stateSpecific: false },
      { id: "cl-2", title: "Compensation", body: "Business agrees to pay $250 held in escrow.", required: true, stateSpecific: false },
      { id: "cl-3", title: "Escrow & Payment Terms", body: "10% platform fee ($25). Athlete receives $225.", required: true, stateSpecific: false },
    ],
    deliverables: ["3 Instagram stories", "Tag @PeakPerformanceGym", "Post analytics report"],
    duration: "1-3 days",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    createdAt: "2026-02-28",
    signedByAthlete: true,
    signedByBusiness: true,
    signedByParent: false,
    parentRequired: false,
    escrow: { id: "escrow-deal-1", contractId: "contract-deal-1", amount: 250, status: "released", fundedAt: "2026-03-01", releasedAt: "2026-03-06" },
    stateCompliant: true,
    complianceNotes: [],
    cancellationDeadline: "2026-03-02",
  },
  {
    id: "contract-deal-2",
    dealId: "deal-2",
    athleteId: "ath-2",
    businessId: "biz-2",
    athleteName: "Jordan Williams",
    businessName: "Mountain View Auto",
    campaignType: "appearance",
    packageId: "pkg-2",
    status: "active",
    amount: 750,
    platformFee: 75,
    athletePayout: 675,
    clauses: [
      { id: "cl-1", title: "Scope of Work", body: "Jordan Williams agrees to perform In-Store Appearance services for Mountain View Auto.", required: true, stateSpecific: false },
      { id: "cl-2", title: "Compensation", body: "Business agrees to pay $750 held in escrow.", required: true, stateSpecific: false },
      { id: "cl-state-school", title: "TN School Notification", body: "Per TN regulations, school must be notified.", required: true, stateSpecific: true },
    ],
    deliverables: ["2-hour meet & greet", "Photo opportunities", "Social media coverage"],
    duration: "1-3 hours",
    startDate: "2026-03-15",
    endDate: "2026-03-15",
    createdAt: "2026-03-13",
    signedByAthlete: true,
    signedByBusiness: true,
    signedByParent: false,
    parentRequired: false,
    escrow: { id: "escrow-deal-2", contractId: "contract-deal-2", amount: 750, status: "funded", fundedAt: "2026-03-14" },
    stateCompliant: true,
    complianceNotes: ["School notification required in TN"],
    cancellationDeadline: "2026-03-14",
  },
  {
    id: "contract-deal-4",
    dealId: "deal-4",
    athleteId: "ath-3",
    businessId: "biz-4",
    athleteName: "Aiden Brooks",
    businessName: "Riverside Chiropractic",
    campaignType: "endorsement",
    packageId: "pkg-3",
    status: "pending_parent",
    amount: 500,
    platformFee: 50,
    athletePayout: 450,
    clauses: [
      { id: "cl-1", title: "Scope of Work", body: "Aiden Brooks agrees to perform Endorsement services for Riverside Chiropractic.", required: true, stateSpecific: false },
      { id: "cl-2", title: "Compensation", body: "Business agrees to pay $500 held in escrow.", required: true, stateSpecific: false },
      { id: "cl-state-parent", title: "CA Minor Protection Clause", body: "Per CA regulations, parent/guardian must approve this contract.", required: true, stateSpecific: true },
      { id: "cl-state-school", title: "CA School Notification", body: "Per CA regulations, school must be notified.", required: true, stateSpecific: true },
    ],
    deliverables: ["Testimonial video", "2 social media posts", "3-month usage rights"],
    duration: "1-2 weeks",
    startDate: "2026-03-20",
    endDate: "2026-04-03",
    createdAt: "2026-03-19",
    signedByAthlete: true,
    signedByBusiness: true,
    signedByParent: false,
    parentRequired: true,
    escrow: { id: "escrow-deal-4", contractId: "contract-deal-4", amount: 500, status: "awaiting_funding" },
    stateCompliant: true,
    complianceNotes: ["Parent approval required for minor in CA", "School notification required in CA"],
    cancellationDeadline: "2026-03-21",
  },
];

export function getContractForDeal(dealId: string): Contract | undefined {
  return mockContracts.find((c) => c.dealId === dealId);
}

export function getContractsForAthlete(athleteId: string): Contract[] {
  return mockContracts.filter((c) => c.athleteId === athleteId);
}

export function getContractsForBusiness(businessId: string): Contract[] {
  return mockContracts.filter((c) => c.businessId === businessId);
}
