# LocalNIL — Startup Blueprint

> "The Local NIL Operating System for Overlooked Athletes"

---

## 1. Product Vision

**LocalNIL** is the first NIL platform purpose-built for the bottom 80% of student-athletes — Division II, Division III, and high school athletes — and the local small businesses that want to work with them.

**Core Thesis:** Most NIL platforms optimize for D1 athletes, compliance departments, and national brands. This leaves 500K+ college athletes and millions of high school athletes completely unserved. LocalNIL fills that gap by combining deal generation, legal guardrails, local business activation, and first-deal enablement into one simple system.

**What we are NOT:**
- A generic marketplace (we're hyper-local and guided)
- A compliance-first dashboard (compliance is embedded, not the product)
- A brand campaign platform (we serve local SMBs, not Fortune 500)

---

## 2. Target Users

### Primary
| Segment | Size | Key Need |
|---------|------|----------|
| D2 Athletes | ~120K | First NIL deal, local connections |
| D3 Athletes | ~200K | Awareness that NIL applies to them |
| High School Athletes | ~8M (where legal) | Safe, parent-approved deals |

### Secondary
| Segment | Size | Key Need |
|---------|------|----------|
| Local SMBs | ~30M US | Affordable local marketing via athletes |
| Parents/Guardians | Tied to HS athletes | Trust, visibility, control |

### Tertiary (Post-MVP)
- Schools & athletic departments
- Conferences & associations
- Local sports media

---

## 3. MVP Breakdown

### MVP Feature List (Tight — 8 weeks)

**Non-negotiable wedge features:**
1. **Athlete onboarding (2-min flow)** — Multi-step: basics → school/sport → location → legal check → done
2. **Auto-generated media kit** — Profile, pricing guidance, outreach templates
3. **First-deal activation system** — 5-step guided walkthrough from profile to payment
4. **Local-Fit Scoring** — Matching algorithm: community score (40%) + proximity (30%) + sport relevance (20%) + engagement (10%). NOT follower count.
5. **10 pre-built campaign templates** — Social shoutout, in-store appearance, endorsement, content creation, brand ambassador, youth clinic, autograph session, product review, community event, photo shoot
6. **Business onboarding + discovery** — Search/filter athletes, send offers, track campaigns
7. **Safe contracts (auto-generated)** — Platform-generated with state-specific compliance language
8. **Escrow payment system** — Funds held until deliverables confirmed
9. **Parent/guardian approval layer** — Required for minors. Full visibility, approve/decline, notifications
10. **State-aware legal engine** — Dynamic rule enforcement: state + age + school type → restrictions, flows, blocked actions

### Intentionally Excluded from MVP
- Messaging/chat between athletes and businesses (email-based initially)
- Mobile app (responsive web first)
- School/institutional dashboard
- Advanced analytics beyond basic ROI metrics
- AI-powered matching (manual scoring first)
- Multi-language support
- Bulk campaign management

### Why This MVP Wins
This MVP wins because it solves the **#1 problem** for overlooked athletes: "How do I get my first NIL deal?" No other platform offers guided first-deal activation for D2/D3/HS athletes with built-in legal safety.

---

## 4. Feature Architecture

### A. Athlete Experience

**Onboarding Flow (5 steps, <2 minutes):**
1. Basics — First name, last name, email, age (minor detection)
2. School & Sport — Level (D2/D3/HS), school name, primary sport
3. Location — State, city (triggers state rule lookup)
4. Legal Check — State rules display, parent email (if minor), terms acceptance
5. Complete — Auto-generate media kit, dashboard access

**Profile Structure (what matters most):**
- Name, sport, school, level, location
- Bio (athlete-written, 280 chars)
- Local-Fit Score (platform-computed)
- Community Score (volunteer work, local involvement)
- Completed deals count + total earnings
- GPA (optional, boosts trust)
- Social reach (displayed but NOT used for matching priority)

**Business-in-a-Box Tools:**
- **Media Kit** — Auto-generated PDF with stats, bio, pricing, social links
- **Pricing Guidance** — Suggested ranges by campaign type, level, and location
- **Outreach Templates** — 3 pre-written templates (intro, social collab, event pitch)
- **Contract + Payment Flow** — Platform-generated contracts, escrow payments

**First-Deal Activation System (CRITICAL):**
5-step guided journey:
1. Complete media kit ✓
2. Identify 5 local businesses (prompted suggestions)
3. Send first outreach (using templates)
4. Accept a campaign offer
5. Deliver & get paid (escrow release)

### B. Local Business Experience (SMB CRM)

**Discovery:**
- Search athletes by name, sport, school, location
- Filter by level (D2/D3/HS), sport, location
- Sort by Local-Fit Score (default), community score, deal count
- Athlete cards show: name, sport, level, fit score, community score, GPA, location

**Campaign Creation UX:**
1. Pick a template (10 pre-built)
2. Select athlete (or request match)
3. Set budget within suggested range
4. Add notes/specific requirements
5. Review → auto-generate contract → send offer
6. Athlete accepts → escrow funded → deliverables tracked → payment released

**10 Pre-Built Campaign Packages:**
| # | Campaign | Price Range | Duration | Key Deliverable |
|---|----------|-------------|----------|-----------------|
| 1 | Social Media Shoutout | $100–$500 | 1–3 days | 1–3 posts + stories |
| 2 | In-Store Appearance | $200–$1,000 | 1–3 hours | Meet & greet + photos |
| 3 | Product Endorsement | $150–$750 | 1–2 weeks | Testimonial + social |
| 4 | Content Creation | $200–$800 | 1–2 weeks | Video/photo content |
| 5 | Brand Ambassador | $500–$2,500 | 1–3 months | Monthly posts + visits |
| 6 | Youth Sports Clinic | $300–$1,500 | 2–4 hours | Coaching + social coverage |
| 7 | Autograph Session | $150–$600 | 1–2 hours | Signing + fan interaction |
| 8 | Product Review | $100–$400 | 3–7 days | Unboxing/review video |
| 9 | Community Event Partner | $200–$1,000 | 1 day | Attendance + promotion |
| 10 | Photo Shoot & Campaign | $300–$1,200 | 2–4 hours | Professional photos + rights |

**ROI Metrics That Matter to SMBs:**
- Foot traffic increase during/after campaign
- Social mentions and local hashtag usage
- New customer acquisition from athlete referrals
- Repeat customer rate from NIL campaigns
- Cost per local impression vs traditional ads
- Community sentiment and brand perception

### C. Parent/Guardian Layer

**Permissions & Approval System:**
- Every deal requires parent approval before proceeding
- Parent receives email notification with full deal details
- One-click approve/decline with optional reason
- Parent can set notification preferences
- Parent sees full contract terms, deliverables, and payment amounts

**Visibility & Alerts:**
- Real-time deal proposal notifications
- Deal completion + payment release alerts
- Profile view notifications (optional)
- Weekly activity summary digest
- State law change notifications

**Trust & Safety UX:**
- Dedicated parent portal (separate from athlete dashboard)
- Clear visual indicators: approved (green), declined (red), pending (amber)
- All business contacts verified before they can send offers
- Deal history with full audit trail

### D. State-Aware Legal Engine

**Inputs:** State, age, school type (D2/D3/HS)

**Outputs:**
- High school NIL allowed/blocked
- Parent consent required/not required
- School notification required/not required
- Restricted categories (auto-hidden from campaign browsing)
- State-specific contract language (auto-inserted)
- Blocked actions (e.g., HS deals in non-permitting states → waitlist)

**How Rules Change Product Behavior:**
- **Blocked state + HS:** Onboarding completes but shows waitlist registration
- **Parent consent required:** Deal flow pauses for parent approval
- **School notification required:** Reminder triggered in deal confirmation
- **Restricted categories:** Campaigns hidden from athlete's view
- **Contract language:** Auto-generated with state-specific clauses

---

## 5. System Design

### Core Platform Components
```
┌─────────────────────────────────────────────┐
│                   Frontend                   │
│  Next.js App Router + React + TailwindCSS   │
├─────────────────────────────────────────────┤
│                  API Layer                   │
│          Next.js API Routes / tRPC          │
├──────────┬──────────┬──────────┬────────────┤
│  Auth    │  Rules   │  Deals   │  Payments  │
│  Service │  Engine  │  Engine  │  Service   │
├──────────┴──────────┴──────────┴────────────┤
│              Data Layer                      │
│     PostgreSQL (Supabase) + Redis Cache      │
├─────────────────────────────────────────────┤
│           External Integrations              │
│  Stripe │ SendGrid │ Vercel │ S3/Cloudinary │
└─────────────────────────────────────────────┘
```

### Key Data Models

**Athletes:**
- id, name, email, age, level, school, sport, state, city
- bio, social_followers, gpa, profile_image_url
- local_fit_score, community_score
- is_minor, parent_email, parent_approved
- created_at, updated_at

**Businesses:**
- id, name, type, contact_name, email, website
- state, city, address, logo_url, description
- campaign_count, total_spent, rating
- goals[], budget_range
- created_at, updated_at

**Deals:**
- id, athlete_id, business_id
- campaign_template_id, campaign_type
- title, description, amount
- status (pending/active/completed/declined)
- deliverables[], contract_url
- parent_approval_status (for minors)
- escrow_status (funded/released/refunded)
- created_at, completed_at

**State Rules:**
- state, high_school_allowed
- parent_consent_required, school_notification_required
- max_deal_value, restricted_categories[]
- notes, effective_date, last_updated

**Campaign Templates:**
- id, type, title, description
- price_range_min, price_range_max
- duration, deliverables[], icon
- is_popular, created_at

### Integration Needs
- **Payments:** Stripe Connect (marketplace payments + escrow)
- **Identity:** Supabase Auth (email + social login)
- **Email:** SendGrid (transactional + parent notifications)
- **Storage:** Cloudinary or S3 (profile images, media kits)
- **Hosting:** Vercel (Next.js optimized)
- **Database:** Supabase (PostgreSQL + real-time)
- **Analytics:** PostHog or Mixpanel (product analytics)

---

## 6. Business Model

### 3-Sided Marketplace Monetization

**Athletes — Free tier + optional premium:**
- **Free:** Profile, media kit, 3 outreach templates, up to 5 active deals
- **Premium ($9.99/mo):** Unlimited deals, advanced analytics, priority matching, custom media kit themes, 1-on-1 deal coaching session

**SMBs — Freemium + per-campaign:**
- **Free:** Browse athletes, 1 active campaign
- **Starter ($49/mo):** 3 active campaigns, basic analytics, campaign templates
- **Growth ($149/mo):** Unlimited campaigns, ROI dashboard, priority athlete access, dedicated support
- **Per-campaign fee:** 10% platform take rate on deal value (paid by business)

**Schools (Later SaaS — Post-MVP):**
- **Compliance Dashboard:** $2,000–$10,000/year per school
- Features: Athlete roster tracking, deal oversight, compliance reporting, conference benchmarking

### Take Rate Strategy
- **MVP:** 10% platform fee on deal value (business-side)
- **Scale:** Reduce to 8% at volume, add premium tiers
- **Rationale:** At avg $500 deal, platform earns $50. Need 2,000 deals/month for $100K MRR.

### Monetization Timeline
- **Months 1–6:** Free for all. Focus on supply (athletes) and demand (businesses). Zero revenue.
- **Months 7–12:** Introduce 10% take rate. Launch business subscriptions.
- **Months 13–18:** Launch athlete premium. Introduce school SaaS pilot.
- **Months 19–24:** Full monetization. Target $50K–$100K MRR.

---

## 7. Go-To-Market Plan

### Beachhead Decision: **D2 First**

**Why D2 over D3 or HS:**
- D2 athletes are aware of NIL but underserved by existing tools
- D2 schools are large enough to have recognizable athletes in their towns
- D2 towns are small enough that local businesses know the athletes
- No parent consent complexity (most are 18+)
- Fewer state law complications than HS

**Target Geography: Southeast US (First 3 states)**
1. **Tennessee** — Strong D2 presence (Lincoln Memorial, Carson-Newman, etc.), HS NIL allowed
2. **Florida** — Large D2 athletic programs (Tampa, Nova SE), HS NIL allowed
3. **Texas** — Massive HS sports culture, D2 programs, HS NIL allowed

### First 1,000 Users Acquisition

**Athletes (Target: 600 athletes in 90 days):**
- Direct outreach to D2 athletic departments (coaches, SIDs)
- Instagram DM campaigns to D2 athletes with <5K followers
- Campus ambassador program (1 per school, free premium)
- Partner with local sports media covering D2/D3
- "First 100 athletes get lifetime premium free" promo

**Businesses (Target: 400 businesses in 90 days):**
- Walk-in visits to businesses near D2 campuses
- Local Chamber of Commerce partnerships
- "First campaign free" offer for businesses within 10 miles of a campus
- Co-marketing with local sports radio/podcast
- Referral bonus: $50 credit per referred business that completes first campaign

### Partnerships
- **Coaches & trainers:** Early advocates, trusted by athletes
- **Local sports media:** Coverage and athlete awareness
- **Chamber of Commerce:** Business acquisition channel
- **NAIA & D2 conferences:** Institutional credibility
- **Youth sports organizations:** HS pipeline

---

## 8. Competitive Edge

### Why LocalNIL Wins vs Incumbents

| Feature | Opendorse | Teamworks | Spry | MOGL | **LocalNIL** |
|---------|-----------|-----------|------|------|-------------|
| D1 Focus | ✅ | ✅ | ✅ | ✅ | ❌ |
| D2/D3 Support | ❌ | ❌ | Partial | ❌ | ✅ |
| HS Support | ❌ | ❌ | ❌ | ❌ | ✅ |
| Local SMB Tools | ❌ | ❌ | ❌ | ❌ | ✅ |
| First-Deal System | ❌ | ❌ | ❌ | ❌ | ✅ |
| Local-Fit Scoring | ❌ | ❌ | ❌ | ❌ | ✅ |
| Parent Layer | ❌ | ❌ | ❌ | ❌ | ✅ |
| Campaign Templates | ❌ | ❌ | Partial | ❌ | ✅ |
| State Legal Engine | Partial | ✅ | ❌ | ❌ | ✅ |
| Pricing | Enterprise | Enterprise | $$ | Free | Freemium |

**Core differentiation:** We serve the "bottom 80%" that no one else touches. Our scoring doesn't penalize low follower counts. Our UX assumes zero NIL experience. Our legal engine protects minors. Our templates make deals dead simple for local businesses who've never done influencer marketing.

---

## 9. Expansion Roadmap

### Phase 1: Foundation (Months 1–6)
- Launch MVP in 3 states (TN, FL, TX)
- 600 athletes, 400 businesses
- Validate first-deal activation system
- Zero revenue, focus on PMF

### Phase 2: Monetization (Months 7–12)
- Expand to 10 states
- Introduce take rate + business subscriptions
- Launch athlete premium tier
- Target: 5,000 athletes, 2,000 businesses, $30K MRR

### Phase 3: Scale (Months 13–18)
- All 50 states
- School/institutional SaaS pilot (10 schools)
- Mobile app (iOS + Android)
- AI-powered matching
- Target: 25,000 athletes, 8,000 businesses, $100K MRR

### Phase 4: Platform (Months 19–24)
- Conference-level partnerships
- Full compliance suite for schools
- Athlete financial literacy tools
- NIL education content platform
- Target: 100,000 athletes, 25,000 businesses, $500K MRR

---

## Product Philosophy

1. **Simplicity over flexibility** — We make decisions for the user. 10 templates, not 100 custom options.
2. **Local-first, not national-first** — Every feature optimizes for a 20-mile radius, not national reach.
3. **Trust-first for minors** — Parents aren't an afterthought. They're a first-class user.
4. **Done-for-you > DIY** — Auto-generate media kits, contracts, pricing. Athletes shouldn't need to be marketers.
5. **First deal, not fiftieth** — Every UX decision optimizes for the athlete who has never done a deal.
6. **Community > Clout** — Local-Fit Score rewards volunteering, GPA, and community roots over Instagram followers.
7. **Safe by default** — Escrow, compliance, contract checks. No one gets hurt on our platform.

---

*Built for the athletes everyone else forgot about.*
