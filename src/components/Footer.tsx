import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Athletes: [
    { href: "/athlete/deals", label: "Find Deals" },
    { href: "/athlete/dashboard", label: "Dashboard" },
    { href: "/athlete/onboarding", label: "Get Started" },
  ],
  Businesses: [
    { href: "/business/launch", label: "Get Customers" },
    { href: "/business/dashboard", label: "Dashboard" },
    { href: "/campaigns", label: "Outcome Packages" },
  ],
  Platform: [
    { href: "/parent", label: "Parent Portal" },
    { href: "/legal", label: "State Rules" },
    { href: "/#how-it-works", label: "How It Works" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Local<span className="text-brand">NIL</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fastest way for D2, D3, and HS athletes to earn legal
              local NIL income — and for businesses to get real customers.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} LocalNIL. All rights reserved. Built
          for the athletes everyone else forgot about.
        </div>
      </div>
    </footer>
  );
}
