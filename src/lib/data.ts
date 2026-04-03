// ============================================================
// TYPES
// ============================================================

export type AthleteLevel = "high_school" | "d2" | "d3";
export type DealStatus = "pending" | "active" | "completed" | "declined";
export type CampaignType =
  | "social_post"
  | "appearance"
  | "photo_shoot"
  | "endorsement"
  | "ambassador"
  | "content_creation"
  | "clinic"
  | "autograph"
  | "product_review"
  | "community_event";

export type OutreachStatus = "draft" | "sent" | "opened" | "replied";
export type BusinessGoal =
  | "foot_traffic"
  | "awareness"
  | "event_promo"
  | "community"
  | "testimonial"
  | "seasonal"
  | "youth_camp"
  | "ambassador";

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  school: string;
  level: AthleteLevel;
  state: string;
  city: string;
  lat: number;
  lng: number;
  profileImage: string;
  bio: string;
  socialFollowers: number;
  localFitScore: number;
  completedDeals: number;
  totalEarnings: number;
  sports: string[];
  gpa?: number;
  communityScore: number;
  isMinor: boolean;
  parentApproved?: boolean;
  interests: string[];
  contentStyle: string;
  audienceLocality: number;
  reliabilityScore: number;
  availableDealTypes: CampaignType[];
  pastHighlights: string[];
  strengths: string[];
  idealPartners: string[];
}

export interface Business {
  id: string;
  name: string;
  type: string;
  category: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  logo: string;
  description: string;
  campaigns: number;
  totalSpent: number;
  rating: number;
  preferredSports: string[];
  budgetRange: { min: number; max: number };
  goals: BusinessGoal[];
  historicalSponsor: boolean;
}

export interface Deal {
  id: string;
  athleteId: string;
  athleteName: string;
  businessId: string;
  businessName: string;
  campaignType: CampaignType;
  title: string;
  amount: number;
  status: DealStatus;
  createdAt: string;
  completedAt?: string;
  description: string;
}

export interface CampaignTemplate {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  priceRange: { min: number; max: number };
  duration: string;
  deliverables: string[];
  icon: string;
  popular: boolean;
}

export interface OutcomePackage {
  id: string;
  type: CampaignType;
  outcomeTitle: string;
  outcomeDescription: string;
  featureTitle: string;
  idealBusinessTypes: string[];
  idealAthleteType: string;
  businessGoal: BusinessGoal;
  priceRange: { min: number; max: number };
  duration: string;
  deliverables: string[];
  addOns: string[];
  sampleROI: string;
  icon: string;
  popular: boolean;
}

export interface OutreachMessage {
  id: string;
  athleteId: string;
  businessId: string;
  businessName: string;
  templateType: string;
  subject: string;
  body: string;
  status: OutreachStatus;
  sentAt?: string;
  followUpAt?: string;
}

export interface Opportunity {
  id: string;
  businessId: string;
  businessName: string;
  businessType: string;
  packageId: string;
  title: string;
  urgencyCopy: string;
  expiresAt: string;
  postedAt: string;
  valueRange: { min: number; max: number };
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export interface MatchResult {
  athleteId: string;
  businessId: string;
  score: number;
  reasons: string[];
  suggestedPackage: string;
  suggestedPriceRange: { min: number; max: number };
  likelihoodToConvert: "high" | "medium" | "low";
  estimatedTimeToClose: string;
  distance: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: "deal" | "match" | "opportunity" | "approval" | "payment" | "reminder";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface StateRule {
  state: string;
  highSchoolAllowed: boolean;
  parentConsentRequired: boolean;
  schoolNotificationRequired: boolean;
  maxDealValue?: number;
  restrictedCategories: string[];
  notes: string;
}

// ============================================================
// MOCK DATA
// ============================================================

export const athletes: Athlete[] = [
  {
    id: "ath-1",
    name: "Maya Chen",
    sport: "Soccer",
    school: "Westfield State University",
    level: "d3",
    state: "MA",
    city: "Westfield",
    lat: 42.1251,
    lng: -72.7496,
    profileImage: "",
    bio: "D3 soccer midfielder | 2x All-Conference | Community volunteer | Dean's List",
    socialFollowers: 2800,
    localFitScore: 92,
    completedDeals: 3,
    totalEarnings: 1450,
    sports: ["Soccer"],
    gpa: 3.7,
    communityScore: 95,
    isMinor: false,
    interests: ["fitness", "nutrition", "community service", "youth coaching"],
    contentStyle: "Authentic, community-focused lifestyle and training content",
    audienceLocality: 85,
    reliabilityScore: 98,
    availableDealTypes: ["social_post", "appearance", "content_creation", "community_event", "ambassador"],
    pastHighlights: ["3 completed deals", "Local food bank volunteer", "Dean's List 4 semesters"],
    strengths: ["High community involvement", "Strong GPA", "Bilingual", "Consistent content"],
    idealPartners: ["Gyms", "Health food", "Sports apparel", "Wellness brands"],
  },
  {
    id: "ath-2",
    name: "Jordan Williams",
    sport: "Basketball",
    school: "Lincoln Memorial University",
    level: "d2",
    state: "TN",
    city: "Harrogate",
    lat: 36.6058,
    lng: -83.6596,
    profileImage: "",
    bio: "D2 basketball guard | Conference Player of the Year | 1,200+ pts career",
    socialFollowers: 5400,
    localFitScore: 88,
    completedDeals: 7,
    totalEarnings: 4200,
    sports: ["Basketball"],
    gpa: 3.2,
    communityScore: 82,
    isMinor: false,
    interests: ["basketball training", "sneakers", "youth mentoring", "gaming"],
    contentStyle: "High-energy sports highlights and lifestyle",
    audienceLocality: 72,
    reliabilityScore: 95,
    availableDealTypes: ["social_post", "appearance", "endorsement", "clinic", "autograph", "ambassador"],
    pastHighlights: ["7 completed deals", "Conference Player of the Year", "Youth basketball camp host"],
    strengths: ["High visibility in community", "Strong social following", "Event draw", "Reliable deliveries"],
    idealPartners: ["Auto dealerships", "Sneaker shops", "Restaurants", "Barbers"],
  },
  {
    id: "ath-3",
    name: "Aiden Brooks",
    sport: "Football",
    school: "Riverside High School",
    level: "high_school",
    state: "CA",
    city: "Riverside",
    lat: 33.9533,
    lng: -117.3962,
    profileImage: "",
    bio: "HS senior QB | 3,200 passing yards | 4-star recruit | 3.5 GPA",
    socialFollowers: 8200,
    localFitScore: 85,
    completedDeals: 1,
    totalEarnings: 500,
    sports: ["Football", "Track"],
    gpa: 3.5,
    communityScore: 78,
    isMinor: true,
    parentApproved: true,
    interests: ["football", "fitness", "gaming", "cars"],
    contentStyle: "Game highlights, training clips, school spirit",
    audienceLocality: 90,
    reliabilityScore: 88,
    availableDealTypes: ["social_post", "appearance", "endorsement", "product_review"],
    pastHighlights: ["1 completed deal", "4-star recruit", "Team captain"],
    strengths: ["High local visibility", "Large local following", "Game-day draw", "Youth role model"],
    idealPartners: ["Chiropractors", "Sports nutrition", "Car dealerships", "Restaurants"],
  },
  {
    id: "ath-4",
    name: "Sophia Rodriguez",
    sport: "Volleyball",
    school: "Tampa University",
    level: "d2",
    state: "FL",
    city: "Tampa",
    lat: 27.9506,
    lng: -82.4572,
    profileImage: "",
    bio: "D2 volleyball setter | Sunshine State Conference MVP | Bilingual content creator",
    socialFollowers: 4100,
    localFitScore: 91,
    completedDeals: 5,
    totalEarnings: 3100,
    sports: ["Volleyball"],
    gpa: 3.8,
    communityScore: 90,
    isMinor: false,
    interests: ["volleyball", "beach life", "nutrition", "fashion", "community events"],
    contentStyle: "Polished bilingual content — mix of sport, lifestyle, and food",
    audienceLocality: 80,
    reliabilityScore: 97,
    availableDealTypes: ["social_post", "appearance", "content_creation", "ambassador", "photo_shoot", "community_event"],
    pastHighlights: ["5 completed deals", "SSC Conference MVP", "Bilingual content reach"],
    strengths: ["Bilingual audience", "High engagement", "Strong community ties", "Professional content quality"],
    idealPartners: ["Restaurants", "Fitness studios", "Beauty brands", "Event venues"],
  },
  {
    id: "ath-5",
    name: "Elijah Foster",
    sport: "Track & Field",
    school: "Carthage College",
    level: "d3",
    state: "WI",
    city: "Kenosha",
    lat: 42.5847,
    lng: -87.8212,
    profileImage: "",
    bio: "D3 sprinter | Conference champion 100m/200m | Fitness content creator",
    socialFollowers: 3200,
    localFitScore: 87,
    completedDeals: 4,
    totalEarnings: 2300,
    sports: ["Track & Field"],
    gpa: 3.4,
    communityScore: 85,
    isMinor: false,
    interests: ["fitness", "speed training", "nutrition", "wellness"],
    contentStyle: "Training tutorials, sprint technique, gym content",
    audienceLocality: 70,
    reliabilityScore: 94,
    availableDealTypes: ["social_post", "content_creation", "endorsement", "product_review", "ambassador"],
    pastHighlights: ["4 completed deals", "Conference champion 100m/200m", "Fitness content creator"],
    strengths: ["Fitness-aligned audience", "Training expertise", "Content production skill", "Reliable"],
    idealPartners: ["Gyms", "Supplement brands", "Wellness clinics", "Sporting goods"],
  },
  {
    id: "ath-6",
    name: "Kayla Thompson",
    sport: "Swimming",
    school: "Oakdale High School",
    level: "high_school",
    state: "TX",
    city: "Austin",
    lat: 30.2672,
    lng: -97.7431,
    profileImage: "",
    bio: "HS junior swimmer | State finalist | Youth coaching volunteer",
    socialFollowers: 1500,
    localFitScore: 80,
    completedDeals: 0,
    totalEarnings: 0,
    sports: ["Swimming"],
    gpa: 3.9,
    communityScore: 92,
    isMinor: true,
    parentApproved: false,
    interests: ["swimming", "youth coaching", "health", "academics"],
    contentStyle: "Wholesome training and coaching content",
    audienceLocality: 95,
    reliabilityScore: 90,
    availableDealTypes: ["social_post", "appearance", "clinic", "community_event"],
    pastHighlights: ["State finalist", "Youth swim coach volunteer", "3.9 GPA"],
    strengths: ["Exceptional community involvement", "Youth role model", "High GPA", "Coach relationships"],
    idealPartners: ["Swim shops", "Health clinics", "Tutoring centers", "Youth camps"],
  },
];

export const businesses: Business[] = [
  {
    id: "biz-1",
    name: "Peak Performance Gym",
    type: "Fitness",
    category: "gym",
    city: "Westfield",
    state: "MA",
    lat: 42.1218,
    lng: -72.7493,
    logo: "",
    description: "Local gym and fitness center serving the community since 2010",
    campaigns: 5,
    totalSpent: 3200,
    rating: 4.8,
    preferredSports: ["Soccer", "Track & Field", "Basketball"],
    budgetRange: { min: 150, max: 800 },
    goals: ["foot_traffic", "awareness", "community"],
    historicalSponsor: true,
  },
  {
    id: "biz-2",
    name: "Mountain View Auto",
    type: "Auto Dealership",
    category: "auto",
    city: "Harrogate",
    state: "TN",
    lat: 36.6100,
    lng: -83.6550,
    logo: "",
    description: "Family-owned dealership | Trusted by the community for 30 years",
    campaigns: 3,
    totalSpent: 4500,
    rating: 4.6,
    preferredSports: ["Basketball", "Football"],
    budgetRange: { min: 300, max: 1500 },
    goals: ["foot_traffic", "event_promo", "awareness"],
    historicalSponsor: true,
  },
  {
    id: "biz-3",
    name: "Fresh Bites Kitchen",
    type: "Restaurant",
    category: "restaurant",
    city: "Tampa",
    state: "FL",
    lat: 27.9475,
    lng: -82.4584,
    logo: "",
    description: "Healthy meal prep and catering for athletes and families",
    campaigns: 8,
    totalSpent: 5800,
    rating: 4.9,
    preferredSports: ["Volleyball", "Swimming", "Soccer"],
    budgetRange: { min: 100, max: 600 },
    goals: ["foot_traffic", "awareness", "ambassador"],
    historicalSponsor: true,
  },
  {
    id: "biz-4",
    name: "Riverside Chiropractic",
    type: "Health & Wellness",
    category: "health",
    city: "Riverside",
    state: "CA",
    lat: 33.9530,
    lng: -117.3950,
    logo: "",
    description: "Sports chiropractic and recovery for athletes of all levels",
    campaigns: 2,
    totalSpent: 1800,
    rating: 4.7,
    preferredSports: ["Football", "Track & Field", "Basketball"],
    budgetRange: { min: 200, max: 1000 },
    goals: ["testimonial", "awareness", "community"],
    historicalSponsor: false,
  },
  {
    id: "biz-5",
    name: "Sunset Barbershop",
    type: "Barbershop",
    category: "barbershop",
    city: "Harrogate",
    state: "TN",
    lat: 36.6080,
    lng: -83.6570,
    logo: "",
    description: "Premium cuts for men | Game-day fades | Community hub",
    campaigns: 1,
    totalSpent: 400,
    rating: 4.9,
    preferredSports: ["Basketball", "Football"],
    budgetRange: { min: 100, max: 400 },
    goals: ["awareness", "foot_traffic", "community"],
    historicalSponsor: false,
  },
  {
    id: "biz-6",
    name: "Bay Area Sports Nutrition",
    type: "Sports Nutrition",
    category: "nutrition",
    city: "Tampa",
    state: "FL",
    lat: 27.9520,
    lng: -82.4610,
    logo: "",
    description: "Supplements, smoothies, and sports nutrition for serious athletes",
    campaigns: 4,
    totalSpent: 2800,
    rating: 4.7,
    preferredSports: ["Volleyball", "Swimming", "Track & Field"],
    budgetRange: { min: 100, max: 500 },
    goals: ["awareness", "testimonial", "ambassador"],
    historicalSponsor: true,
  },
  {
    id: "biz-7",
    name: "Westfield Family Dental",
    type: "Dentist",
    category: "dental",
    city: "Westfield",
    state: "MA",
    lat: 42.1260,
    lng: -72.7510,
    logo: "",
    description: "Family-friendly dental care with athlete sponsorship history",
    campaigns: 0,
    totalSpent: 0,
    rating: 4.5,
    preferredSports: ["Soccer", "Basketball"],
    budgetRange: { min: 150, max: 500 },
    goals: ["awareness", "community"],
    historicalSponsor: false,
  },
  {
    id: "biz-8",
    name: "Austin Aquatics Center",
    type: "Recreation",
    category: "recreation",
    city: "Austin",
    state: "TX",
    lat: 30.2700,
    lng: -97.7400,
    logo: "",
    description: "Youth swimming programs, adult fitness, and community pool",
    campaigns: 1,
    totalSpent: 600,
    rating: 4.6,
    preferredSports: ["Swimming"],
    budgetRange: { min: 150, max: 700 },
    goals: ["youth_camp", "community", "awareness"],
    historicalSponsor: true,
  },
];

export const deals: Deal[] = [
  {
    id: "deal-1",
    athleteId: "ath-1",
    athleteName: "Maya Chen",
    businessId: "biz-1",
    businessName: "Peak Performance Gym",
    campaignType: "social_post",
    title: "Instagram Story Feature",
    amount: 250,
    status: "completed",
    createdAt: "2026-03-01",
    completedAt: "2026-03-05",
    description: "3 Instagram stories showcasing workout routine at Peak Performance",
  },
  {
    id: "deal-2",
    athleteId: "ath-2",
    athleteName: "Jordan Williams",
    businessId: "biz-2",
    businessName: "Mountain View Auto",
    campaignType: "appearance",
    title: "Grand Opening Appearance",
    amount: 750,
    status: "active",
    createdAt: "2026-03-15",
    description: "2-hour meet & greet at new showroom opening",
  },
  {
    id: "deal-3",
    athleteId: "ath-4",
    athleteName: "Sophia Rodriguez",
    businessId: "biz-3",
    businessName: "Fresh Bites Kitchen",
    campaignType: "ambassador",
    title: "Monthly Brand Ambassador",
    amount: 1200,
    status: "active",
    createdAt: "2026-02-01",
    description: "Monthly social content + in-store appearances for 3 months",
  },
  {
    id: "deal-4",
    athleteId: "ath-3",
    athleteName: "Aiden Brooks",
    businessId: "biz-4",
    businessName: "Riverside Chiropractic",
    campaignType: "endorsement",
    title: "Recovery Program Endorsement",
    amount: 500,
    status: "pending",
    createdAt: "2026-03-20",
    description: "Testimonial video and social media endorsement",
  },
  {
    id: "deal-5",
    athleteId: "ath-5",
    athleteName: "Elijah Foster",
    businessId: "biz-1",
    businessName: "Peak Performance Gym",
    campaignType: "content_creation",
    title: "Training Video Series",
    amount: 600,
    status: "completed",
    createdAt: "2026-02-10",
    completedAt: "2026-02-28",
    description: "3-part training video series for gym social channels",
  },
];

export const campaignTemplates: CampaignTemplate[] = [
  {
    id: "tpl-1",
    type: "social_post",
    title: "Social Media Shoutout",
    description: "Athlete posts about your business on their social channels",
    priceRange: { min: 100, max: 500 },
    duration: "1-3 days",
    deliverables: ["1-3 social media posts", "Story mentions", "Tag your business"],
    icon: "share",
    popular: true,
  },
  {
    id: "tpl-2",
    type: "appearance",
    title: "In-Store Appearance",
    description: "Athlete appears at your location for meet & greet or event",
    priceRange: { min: 200, max: 1000 },
    duration: "1-3 hours",
    deliverables: ["In-person appearance", "Photo opportunities", "Autograph session"],
    icon: "users",
    popular: true,
  },
  {
    id: "tpl-3",
    type: "endorsement",
    title: "Product Endorsement",
    description: "Athlete endorses your product or service with a testimonial",
    priceRange: { min: 150, max: 750 },
    duration: "1-2 weeks",
    deliverables: ["Written testimonial", "Photo/video usage rights", "Social sharing"],
    icon: "award",
    popular: true,
  },
  {
    id: "tpl-4",
    type: "content_creation",
    title: "Content Creation",
    description: "Athlete creates branded content for your business channels",
    priceRange: { min: 200, max: 800 },
    duration: "1-2 weeks",
    deliverables: ["Video or photo content", "Multiple formats", "Usage rights"],
    icon: "video",
    popular: false,
  },
  {
    id: "tpl-5",
    type: "ambassador",
    title: "Brand Ambassador",
    description: "Ongoing partnership with regular content and appearances",
    priceRange: { min: 500, max: 2500 },
    duration: "1-3 months",
    deliverables: ["Monthly social posts", "In-store visits", "Exclusive content"],
    icon: "star",
    popular: true,
  },
  {
    id: "tpl-6",
    type: "clinic",
    title: "Youth Sports Clinic",
    description: "Athlete hosts or co-hosts a youth clinic at your facility",
    priceRange: { min: 300, max: 1500 },
    duration: "2-4 hours",
    deliverables: ["Coaching session", "Branded event", "Social media coverage"],
    icon: "trophy",
    popular: false,
  },
  {
    id: "tpl-7",
    type: "autograph",
    title: "Autograph Session",
    description: "Athlete signs items at your business location or event",
    priceRange: { min: 150, max: 600 },
    duration: "1-2 hours",
    deliverables: ["Autograph signing", "Fan interaction", "Photo ops"],
    icon: "pen-tool",
    popular: false,
  },
  {
    id: "tpl-8",
    type: "product_review",
    title: "Product Review",
    description: "Athlete reviews and showcases your product authentically",
    priceRange: { min: 100, max: 400 },
    duration: "3-7 days",
    deliverables: ["Honest review content", "Unboxing/demo video", "Social sharing"],
    icon: "package",
    popular: false,
  },
  {
    id: "tpl-9",
    type: "community_event",
    title: "Community Event Partner",
    description: "Athlete participates in or promotes a community event",
    priceRange: { min: 200, max: 1000 },
    duration: "1 day",
    deliverables: ["Event attendance", "Social promotion", "Community engagement"],
    icon: "heart",
    popular: false,
  },
  {
    id: "tpl-10",
    type: "photo_shoot",
    title: "Photo Shoot & Campaign",
    description: "Professional photos with athlete for marketing materials",
    priceRange: { min: 300, max: 1200 },
    duration: "2-4 hours",
    deliverables: ["Professional photos", "Marketing usage rights", "Social content"],
    icon: "camera",
    popular: false,
  },
];

export const stateRules: StateRule[] = [
  {
    state: "CA",
    highSchoolAllowed: true,
    parentConsentRequired: true,
    schoolNotificationRequired: true,
    restrictedCategories: ["alcohol", "tobacco", "gambling", "cannabis"],
    notes: "California allows HS NIL. Parent/guardian consent required for minors. School must be notified.",
  },
  {
    state: "TX",
    highSchoolAllowed: true,
    parentConsentRequired: true,
    schoolNotificationRequired: false,
    restrictedCategories: ["alcohol", "tobacco", "gambling"],
    notes: "Texas allows HS NIL with parental consent. No school notification requirement.",
  },
  {
    state: "FL",
    highSchoolAllowed: true,
    parentConsentRequired: true,
    schoolNotificationRequired: true,
    restrictedCategories: ["alcohol", "tobacco", "gambling"],
    notes: "Florida permits HS NIL. Parental consent and school notification required.",
  },
  {
    state: "MA",
    highSchoolAllowed: false,
    parentConsentRequired: false,
    schoolNotificationRequired: false,
    restrictedCategories: ["alcohol", "tobacco", "gambling"],
    notes: "Massachusetts does not currently allow high school NIL activities.",
  },
  {
    state: "TN",
    highSchoolAllowed: true,
    parentConsentRequired: true,
    schoolNotificationRequired: true,
    restrictedCategories: ["alcohol", "tobacco", "gambling"],
    notes: "Tennessee allows HS NIL with consent and notification requirements.",
  },
  {
    state: "WI",
    highSchoolAllowed: false,
    parentConsentRequired: false,
    schoolNotificationRequired: false,
    restrictedCategories: ["alcohol", "tobacco", "gambling"],
    notes: "Wisconsin does not currently permit high school NIL deals.",
  },
];

export const outcomePackages: OutcomePackage[] = [
  {
    id: "pkg-1",
    type: "social_post",
    outcomeTitle: "Drive Local Awareness This Week",
    outcomeDescription: "Get your business in front of hundreds of local followers through an athlete's trusted social presence.",
    featureTitle: "Social Media Shoutout",
    idealBusinessTypes: ["restaurant", "gym", "barbershop", "nutrition", "dental", "auto"],
    idealAthleteType: "Athletes with strong local social following",
    businessGoal: "awareness",
    priceRange: { min: 100, max: 500 },
    duration: "1-3 days",
    deliverables: ["1-3 social media posts", "Story mentions", "Tag your business", "Post analytics report"],
    addOns: ["Additional stories (+$50)", "Reel/TikTok (+$100)", "30-day usage rights (+$75)"],
    sampleROI: "Avg 300-800 local impressions per post. Businesses see 15-25% engagement rate from local athlete content.",
    icon: "share",
    popular: true,
  },
  {
    id: "pkg-2",
    type: "appearance",
    outcomeTitle: "Bring People Into Your Location",
    outcomeDescription: "Drive foot traffic with a local athlete meet & greet. Customers come for the athlete, stay for your business.",
    featureTitle: "In-Store Appearance",
    idealBusinessTypes: ["gym", "auto", "restaurant", "barbershop", "recreation"],
    idealAthleteType: "Athletes with high community visibility and event draw",
    businessGoal: "foot_traffic",
    priceRange: { min: 200, max: 1000 },
    duration: "1-3 hours",
    deliverables: ["In-person appearance", "Photo opportunities", "Autograph session", "Social media coverage"],
    addOns: ["Extended time (+$150/hr)", "Social media promotion (+$100)", "Branded merchandise signing (+$75)"],
    sampleROI: "Avg 40-80 additional visitors per appearance. Restaurants report 30%+ revenue lift on event days.",
    icon: "users",
    popular: true,
  },
  {
    id: "pkg-3",
    type: "endorsement",
    outcomeTitle: "Get a Trusted Local Athlete Testimonial",
    outcomeDescription: "Build credibility with a genuine endorsement from a respected community athlete your customers know.",
    featureTitle: "Product Endorsement",
    idealBusinessTypes: ["health", "nutrition", "dental", "gym", "recreation"],
    idealAthleteType: "Athletes with strong trust signals and community credibility",
    businessGoal: "testimonial",
    priceRange: { min: 150, max: 750 },
    duration: "1-2 weeks",
    deliverables: ["Written testimonial", "Photo/video usage rights", "Social sharing", "Website badge"],
    addOns: ["Video testimonial (+$150)", "6-month usage extension (+$100)", "Print-ready assets (+$75)"],
    sampleROI: "Testimonial content generates 3-5x more trust than brand-created content. Avg 6-month shelf life.",
    icon: "award",
    popular: true,
  },
  {
    id: "pkg-4",
    type: "ambassador",
    outcomeTitle: "Launch a Community Ambassador",
    outcomeDescription: "Ongoing local visibility through a trusted athlete who consistently represents your brand in the community.",
    featureTitle: "Brand Ambassador",
    idealBusinessTypes: ["gym", "nutrition", "restaurant", "auto", "recreation"],
    idealAthleteType: "Reliable athletes with consistent content output and community involvement",
    businessGoal: "ambassador",
    priceRange: { min: 500, max: 2500 },
    duration: "1-3 months",
    deliverables: ["Monthly social posts", "In-store visits", "Exclusive content", "Brand representation"],
    addOns: ["Event appearances (+$200/event)", "Content creation package (+$300/mo)", "Exclusive territory (+$200/mo)"],
    sampleROI: "Ambassador deals generate 4-8x ROI over one-off campaigns. Avg 40% repeat customer attribution.",
    icon: "star",
    popular: true,
  },
  {
    id: "pkg-5",
    type: "community_event",
    outcomeTitle: "Boost a Local Event",
    outcomeDescription: "Fill seats and build buzz for your next event with a local athlete as the draw.",
    featureTitle: "Community Event Partner",
    idealBusinessTypes: ["recreation", "gym", "restaurant", "auto"],
    idealAthleteType: "Athletes with event experience and local draw power",
    businessGoal: "event_promo",
    priceRange: { min: 200, max: 1000 },
    duration: "1 day",
    deliverables: ["Event attendance", "Social promotion", "Community engagement", "Pre-event hype posts"],
    addOns: ["MC/hosting duties (+$200)", "Post-event content (+$100)", "Autograph session (+$100)"],
    sampleROI: "Athlete-promoted events see 25-50% higher attendance. Social reach extends event visibility 3-5x.",
    icon: "heart",
    popular: false,
  },
  {
    id: "pkg-6",
    type: "clinic",
    outcomeTitle: "Promote a Youth Camp or Clinic",
    outcomeDescription: "Fill your youth program with a local athlete coach that kids and parents trust.",
    featureTitle: "Youth Sports Clinic",
    idealBusinessTypes: ["recreation", "gym"],
    idealAthleteType: "Athletes with coaching experience and youth role model status",
    businessGoal: "youth_camp",
    priceRange: { min: 300, max: 1500 },
    duration: "2-4 hours",
    deliverables: ["Coaching session", "Branded event", "Social media coverage", "Parent engagement"],
    addOns: ["Multi-day camp (+$400/day)", "Branded merchandise (+$150)", "Video highlights (+$100)"],
    sampleROI: "Youth clinics with athlete coaches fill 2x faster. Parent NPS scores increase 30+ points.",
    icon: "trophy",
    popular: false,
  },
  {
    id: "pkg-7",
    type: "content_creation",
    outcomeTitle: "Get Authentic Local Content",
    outcomeDescription: "Professional athlete-created content for your marketing channels that feels real, not staged.",
    featureTitle: "Content Creation",
    idealBusinessTypes: ["gym", "nutrition", "restaurant", "barbershop"],
    idealAthleteType: "Athletes with strong content creation skills and production quality",
    businessGoal: "awareness",
    priceRange: { min: 200, max: 800 },
    duration: "1-2 weeks",
    deliverables: ["Video or photo content", "Multiple formats", "Usage rights", "Raw files"],
    addOns: ["Additional edits (+$75)", "Extended usage rights (+$100)", "Behind-the-scenes content (+$50)"],
    sampleROI: "Athlete-created content gets 2-4x engagement vs brand-shot content. Avg 90-day usage value.",
    icon: "video",
    popular: false,
  },
  {
    id: "pkg-8",
    type: "product_review",
    outcomeTitle: "Get a Genuine Product Spotlight",
    outcomeDescription: "Authentic athlete review that builds trust with local customers considering your product.",
    featureTitle: "Product Review",
    idealBusinessTypes: ["nutrition", "health", "gym"],
    idealAthleteType: "Athletes with authentic, trustworthy content style",
    businessGoal: "testimonial",
    priceRange: { min: 100, max: 400 },
    duration: "3-7 days",
    deliverables: ["Honest review content", "Unboxing/demo video", "Social sharing"],
    addOns: ["Follow-up review after 30 days (+$75)", "Comparison content (+$100)"],
    sampleROI: "Product reviews drive 18% higher conversion than standard ads. Trusted athlete reviews convert 2x.",
    icon: "package",
    popular: false,
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    businessId: "biz-1",
    businessName: "Peak Performance Gym",
    businessType: "Fitness",
    packageId: "pkg-2",
    title: "Weekend Meet & Greet at Peak Performance",
    urgencyCopy: "Closes in 3 days",
    expiresAt: "2026-04-06",
    postedAt: "2026-03-30",
    valueRange: { min: 300, max: 500 },
    city: "Westfield",
    state: "MA",
    lat: 42.1218,
    lng: -72.7493,
  },
  {
    id: "opp-2",
    businessId: "biz-3",
    businessName: "Fresh Bites Kitchen",
    businessType: "Restaurant",
    packageId: "pkg-1",
    title: "Social Media Feature — New Spring Menu",
    urgencyCopy: "New this week",
    expiresAt: "2026-04-15",
    postedAt: "2026-04-01",
    valueRange: { min: 150, max: 350 },
    city: "Tampa",
    state: "FL",
    lat: 27.9475,
    lng: -82.4584,
  },
  {
    id: "opp-3",
    businessId: "biz-2",
    businessName: "Mountain View Auto",
    businessType: "Auto Dealership",
    packageId: "pkg-5",
    title: "Spring Sales Event — Athlete Appearance",
    urgencyCopy: "Closes in 5 days",
    expiresAt: "2026-04-08",
    postedAt: "2026-03-28",
    valueRange: { min: 500, max: 1000 },
    city: "Harrogate",
    state: "TN",
    lat: 36.6100,
    lng: -83.6550,
  },
  {
    id: "opp-4",
    businessId: "biz-6",
    businessName: "Bay Area Sports Nutrition",
    businessType: "Sports Nutrition",
    packageId: "pkg-4",
    title: "Summer Ambassador — Nutrition Brand",
    urgencyCopy: "High-fit match added",
    expiresAt: "2026-04-20",
    postedAt: "2026-04-02",
    valueRange: { min: 600, max: 1200 },
    city: "Tampa",
    state: "FL",
    lat: 27.9520,
    lng: -82.4610,
  },
  {
    id: "opp-5",
    businessId: "biz-8",
    businessName: "Austin Aquatics Center",
    businessType: "Recreation",
    packageId: "pkg-6",
    title: "Youth Swim Clinic — Summer Session",
    urgencyCopy: "Perfect match for you",
    expiresAt: "2026-05-01",
    postedAt: "2026-04-01",
    valueRange: { min: 400, max: 700 },
    city: "Austin",
    state: "TX",
    lat: 30.2700,
    lng: -97.7400,
  },
  {
    id: "opp-6",
    businessId: "biz-4",
    businessName: "Riverside Chiropractic",
    businessType: "Health & Wellness",
    packageId: "pkg-3",
    title: "Athlete Recovery Testimonial Campaign",
    urgencyCopy: "2 athletes already applied",
    expiresAt: "2026-04-12",
    postedAt: "2026-03-31",
    valueRange: { min: 300, max: 600 },
    city: "Riverside",
    state: "CA",
    lat: 33.9530,
    lng: -117.3950,
  },
];

export const outreachMessages: OutreachMessage[] = [
  {
    id: "msg-1",
    athleteId: "ath-1",
    businessId: "biz-1",
    businessName: "Peak Performance Gym",
    templateType: "introduction",
    subject: "Local D3 Athlete — Partnership Opportunity",
    body: "Hi Peak Performance Gym,\n\nI'm Maya Chen, a D3 soccer midfielder at Westfield State and a regular in the Westfield community. I've been a member-adjacent to your gym for two years and would love to partner on local content.\n\nWith 2,800 local followers and a 92/100 Local-Fit Score, I can help drive awareness and foot traffic through social posts, appearances, or ambassador content.\n\nWould you be open to a quick chat this week?\n\nBest,\nMaya",
    status: "sent",
    sentAt: "2026-03-28",
    followUpAt: "2026-04-04",
  },
  {
    id: "msg-2",
    athleteId: "ath-1",
    businessId: "biz-7",
    businessName: "Westfield Family Dental",
    templateType: "introduction",
    subject: "Community Athlete Partnership — Maya Chen",
    body: "Hi Westfield Family Dental,\n\nI'm Maya Chen, a D3 soccer player at Westfield State with deep community roots. I noticed you serve families in the area and thought a local athlete partnership could boost visibility.\n\nI'd love to discuss a social media feature or community event collaboration.\n\nBest,\nMaya",
    status: "draft",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    userId: "ath-1",
    type: "match",
    title: "New business match near you",
    body: "Westfield Family Dental is looking for local athletes. 0.3 miles away.",
    createdAt: "2026-04-02",
    read: false,
  },
  {
    id: "notif-2",
    userId: "ath-1",
    type: "opportunity",
    title: "Weekend appearance opportunity",
    body: "Peak Performance Gym posted a meet & greet opportunity. $300-$500. Closes in 3 days.",
    createdAt: "2026-03-30",
    read: true,
  },
  {
    id: "notif-3",
    userId: "ath-1",
    type: "reminder",
    title: "Follow up with Peak Performance Gym",
    body: "You sent outreach 7 days ago. Consider sending a follow-up message.",
    createdAt: "2026-04-04",
    read: false,
  },
  {
    id: "notif-4",
    userId: "ath-4",
    type: "deal",
    title: "New deal offer from Fresh Bites Kitchen",
    body: "Fresh Bites wants to extend your ambassador deal. Review the updated terms.",
    createdAt: "2026-04-01",
    read: false,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getStateRule(state: string): StateRule | undefined {
  return stateRules.find((r) => r.state === state);
}

export function getLevelLabel(level: AthleteLevel): string {
  switch (level) {
    case "high_school":
      return "High School";
    case "d2":
      return "Division II";
    case "d3":
      return "Division III";
  }
}

export function getCampaignTypeLabel(type: CampaignType): string {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getStatusColor(status: DealStatus): string {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "active":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-emerald-100 text-emerald-800";
    case "declined":
      return "bg-red-100 text-red-800";
  }
}
