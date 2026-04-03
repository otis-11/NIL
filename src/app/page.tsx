import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Zap,
  Shield,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
  Star,
  CheckCircle2,
  Building2,
  GraduationCap,
  HandCoins,
  FileCheck,
} from "lucide-react";
import { athletes } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { value: "500K+", label: "D2/D3 Athletes Nationwide" },
  { value: "$100-$2.5K", label: "Avg Local Deal Size" },
  { value: "80%", label: "Athletes Without NIL Deals" },
  { value: "3-5 Days", label: "Avg Time to First Deal" },
];

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up in 2 minutes. We build your media kit, set pricing guidance, and prepare outreach templates automatically.",
    icon: GraduationCap,
  },
  {
    step: "02",
    title: "Get Matched Locally",
    description:
      "Our Local-Fit Score connects you with businesses in your community who are the best match — not just by followers, but by fit.",
    icon: MapPin,
  },
  {
    step: "03",
    title: "Land Your First Deal",
    description:
      "Choose from pre-built campaign templates, sign a safe contract, and get paid through our secure escrow system.",
    icon: HandCoins,
  },
  {
    step: "04",
    title: "Grow & Repeat",
    description:
      "Track your deals, build your reputation, and unlock more opportunities as your LocalNIL score grows.",
    icon: TrendingUp,
  },
];

const features = [
  {
    title: "First-Deal Activation",
    description:
      "Guided system that walks athletes through landing their very first NIL deal — from profile to payment.",
    icon: Zap,
  },
  {
    title: "Local-Fit Scoring",
    description:
      "We rank matches by community involvement, sport relevance, and local proximity — NOT follower count.",
    icon: Star,
  },
  {
    title: "State-Aware Legal Engine",
    description:
      "Dynamic rules engine that adapts to your state's NIL laws. Auto-blocks prohibited deals. Built-in compliance.",
    icon: Shield,
  },
  {
    title: "Parent Guardian Layer",
    description:
      "For high school athletes: parents approve deals, get visibility into every step, and maintain full control.",
    icon: Users,
  },
  {
    title: "Outcome Packages",
    description:
      "8 outcome-driven packages with clear deliverables, fixed pricing, and real ROI metrics. Pick an outcome, not a feature.",
    icon: Building2,
  },
  {
    title: "Safe Contracts & Escrow",
    description:
      "Every deal uses platform-generated contracts with built-in safety checks and secure payment escrow.",
    icon: FileCheck,
  },
];

const testimonials = [
  {
    quote:
      "I never thought a D3 soccer player could get NIL deals. LocalNIL connected me with 3 local businesses in my first month.",
    name: "Maya C.",
    role: "D3 Soccer, Westfield State",
  },
  {
    quote:
      "As a small gym owner, I wanted to work with local athletes but had no idea how. LocalNIL made it dead simple.",
    name: "Tony R.",
    role: "Owner, Peak Performance Gym",
  },
  {
    quote:
      "My son is a high school QB. The parent dashboard gives me full visibility and control. I trust it completely.",
    name: "Karen B.",
    role: "Parent, Riverside HS",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-purple-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTJ2NEgxMlYwSDEwdjRIMHYyaDEwVjRoMnYyaDEyVjRoMnYtMkg0MFYwSDM4djRIMjRWMEgyMnY0SDEwVjBIOHY0SDB2Mmg4VjRoMnYyaDEyVjRoMnYyaDEyVjRoMnYyaDEyVjRoMnYtMkg0MFYweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-violet-200 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-amber-400" />
                The fastest way to earn legal local NIL income
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your First NIL Deal
                <br />
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Is Waiting Nearby.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-violet-200 sm:text-xl">
                D2, D3, and high school athletes: local businesses near you want
                to pay for your influence. Find matches, send outreach, and land
                your first deal — in days, not months.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/athlete/deals"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-violet-900 shadow-lg shadow-violet-900/30 transition-all hover:bg-amber-50 hover:shadow-xl sm:w-auto"
                >
                  Find Deals Near Me
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/business/launch"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  Get Local Customers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-brand sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Land Your First Deal in{" "}
                <span className="text-brand">4 Steps</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                No agent needed. No follower minimum. Just you, your community,
                and your first NIL deal.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="group relative rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Everything You Need.{" "}
                <span className="text-brand">Nothing You Don&apos;t.</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                Built for simplicity. Designed for trust. Optimized for your
                first deal — not your fiftieth.
              </p>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border p-6 transition-all hover:border-brand/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Athlete Spotlight */}
        <section className="bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Athletes Already{" "}
                <span className="text-brand">Winning Locally</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                Real athletes. Real deals. Real impact.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {athletes.slice(0, 3).map((athlete) => (
                <div
                  key={athlete.id}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-lg font-bold text-white">
                      {athlete.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {athlete.level === "high_school"
                        ? "HS"
                        : athlete.level.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{athlete.name}</h3>
                  <p className="text-sm text-muted">
                    {athlete.sport} &middot; {athlete.school}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {athlete.bio}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-brand">
                        {athlete.localFitScore}
                      </div>
                      <div className="text-xs text-muted">Fit Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {athlete.completedDeals}
                      </div>
                      <div className="text-xs text-muted">Deals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">
                        {formatCurrency(athlete.totalEarnings)}
                      </div>
                      <div className="text-xs text-muted">Earned</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Trusted by Athletes, Businesses &{" "}
                <span className="text-brand">Parents</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-violet-950 via-violet-900 to-purple-800 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Local Businesses Want to
              <br />
              Pay You. <span className="text-amber-400">Today.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-violet-200">
              Free to start. No follower minimum. No agent required.
              Athletes are landing their first deals in under a week.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/athlete/deals"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-violet-900 shadow-lg transition-all hover:bg-amber-50 sm:w-auto"
              >
                <CheckCircle2 className="h-4 w-4" />
                Find My First Deal
              </Link>
              <Link
                href="/business/launch"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                <Building2 className="h-4 w-4" />
                Get Local Customers Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
