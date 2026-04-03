"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Info,
  Search,
} from "lucide-react";
import { stateRules, type StateRule } from "@/lib/data";

const allStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

function RuleStatus({ allowed, label }: { allowed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {allowed ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <span className={`text-sm ${allowed ? "text-emerald-700" : "text-red-700"}`}>
        {label}: {allowed ? "Yes" : "No"}
      </span>
    </div>
  );
}

export default function LegalPage() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [levelInput, setLevelInput] = useState<string>("");

  const currentRule = stateRules.find((r) => r.state === selectedState);
  const isMinor = ageInput && parseInt(ageInput) < 18;
  const isHighSchool = levelInput === "high_school";

  const filteredStates = allStates.filter(
    (s) =>
      searchQuery === "" ||
      s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBlockedActions = (rule: StateRule) => {
    const blocked: string[] = [];
    if (!rule.highSchoolAllowed && isHighSchool) {
      blocked.push("High school NIL deals are not permitted in this state");
    }
    if (rule.parentConsentRequired && isMinor) {
      blocked.push("Parent/guardian consent is required for all deals");
    }
    if (rule.schoolNotificationRequired) {
      blocked.push("School must be notified of all NIL activities");
    }
    rule.restrictedCategories.forEach((cat) => {
      blocked.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)}-related deals are prohibited`);
    });
    return blocked;
  };

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1 bg-surface">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-violet-950 to-purple-800">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-violet-200">
                <Shield className="h-4 w-4 text-emerald-400" />
                State-Aware Legal Engine
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                NIL Rules by State
              </h1>
              <p className="mt-3 text-lg text-violet-200">
                NIL laws vary by state. Our legal engine dynamically adapts the
                platform to keep you compliant — automatically.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Rule Checker */}
          <div className="mb-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold">
              <Shield className="h-6 w-6 text-brand" />
              Check Your State&apos;s Rules
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium">State</label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-border bg-white pl-3 pr-8 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Select state...</option>
                    {allStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Age</label>
                <input
                  type="number"
                  min="14"
                  max="30"
                  value={ageInput}
                  onChange={(e) => setAgeInput(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="17"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Level</label>
                <div className="relative">
                  <select
                    value={levelInput}
                    onChange={(e) => setLevelInput(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-border bg-white pl-3 pr-8 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Select level...</option>
                    <option value="d2">Division II</option>
                    <option value="d3">Division III</option>
                    <option value="high_school">High School</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>
            </div>

            {/* Results */}
            {selectedState && currentRule && (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <MapPin className="h-5 w-5 text-brand" />
                    {selectedState} NIL Regulations
                  </h3>

                  <div className="mt-4 space-y-2">
                    <RuleStatus
                      allowed={currentRule.highSchoolAllowed}
                      label="High School NIL"
                    />
                    <RuleStatus
                      allowed={currentRule.parentConsentRequired}
                      label="Parent Consent Required"
                    />
                    <RuleStatus
                      allowed={currentRule.schoolNotificationRequired}
                      label="School Notification Required"
                    />
                  </div>

                  <div className="mt-4 rounded-lg bg-white p-3">
                    <p className="text-sm text-muted">{currentRule.notes}</p>
                  </div>
                </div>

                {/* Dynamic Restrictions */}
                {(isHighSchool || isMinor) && (
                  <div
                    className={`rounded-xl border p-5 ${
                      !currentRule.highSchoolAllowed && isHighSchool
                        ? "border-red-200 bg-red-50"
                        : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <h4 className="flex items-center gap-2 font-bold">
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          !currentRule.highSchoolAllowed && isHighSchool
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      />
                      {!currentRule.highSchoolAllowed && isHighSchool
                        ? "Blocked: High School NIL Not Allowed"
                        : "Restrictions Apply"}
                    </h4>
                    <ul className="mt-3 space-y-1.5">
                      {getBlockedActions(currentRule).map((action) => (
                        <li
                          key={action}
                          className="flex items-start gap-2 text-sm"
                        >
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What This Means */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <h4 className="flex items-center gap-2 font-bold text-emerald-800">
                    <Info className="h-5 w-5" />
                    How LocalNIL Handles This
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {[
                      "Restricted categories are auto-hidden from campaign browsing",
                      "Contracts auto-include state-specific compliance language",
                      "Parent approval flows are automatically enabled for minors",
                      "School notification reminders are triggered when required",
                      "Blocked states show waitlist registration instead of deal flow",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-emerald-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {selectedState && !currentRule && (
              <div className="mt-6 rounded-xl border border-border bg-surface p-5 text-center">
                <Info className="mx-auto h-8 w-8 text-muted" />
                <p className="mt-2 text-sm text-muted">
                  Detailed rules for {selectedState} are not yet in our database.
                  General NCAA NIL guidelines apply for D2/D3 athletes. Contact
                  us for state-specific guidance.
                </p>
              </div>
            )}
          </div>

          {/* State Overview Table */}
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-extrabold">
              State Coverage Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold">State</th>
                    <th className="pb-3 font-semibold">HS NIL</th>
                    <th className="pb-3 font-semibold">Parent Consent</th>
                    <th className="pb-3 font-semibold">School Notice</th>
                    <th className="pb-3 font-semibold">Restricted</th>
                  </tr>
                </thead>
                <tbody>
                  {stateRules.map((rule) => (
                    <tr
                      key={rule.state}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 font-bold">{rule.state}</td>
                      <td className="py-3">
                        {rule.highSchoolAllowed ? (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" /> Allowed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600">
                            <XCircle className="h-4 w-4" /> No
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        {rule.parentConsentRequired ? (
                          <span className="text-amber-600">Required</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td className="py-3">
                        {rule.schoolNotificationRequired ? (
                          <span className="text-amber-600">Required</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className="text-muted">
                          {rule.restrictedCategories.join(", ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted">
              Data reflects current known state regulations. Laws change
              frequently — LocalNIL&apos;s legal engine updates in real-time.
              Last updated: March 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
