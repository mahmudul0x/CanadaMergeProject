import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Mail, Phone, Plus, Search, Star, TrendingUp, Users } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Btn, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

/* ── Data ── */
type Tier = "VIP" | "Active" | "Inactive";
const FAMILIES: {
  id: string; parent: string; email: string; phone: string;
  city: string; joined: string; visits: number; ltv: number;
  children: number; tier: Tier;
}[] = [
  { id: "FAM-001", parent: "Sarah Thompson",  email: "sarah.t@email.com",  phone: "647-555-0201", city: "Milton",      joined: "Jan 2023", visits: 14, ltv: 3140,  children: 2, tier: "VIP"      },
  { id: "FAM-002", parent: "David Patel",      email: "david.p@email.com",  phone: "905-555-0102", city: "Oakville",    joined: "Mar 2023", visits: 9,  ltv: 1980,  children: 1, tier: "Active"   },
  { id: "FAM-003", parent: "Mei Lin",          email: "mei.l@email.com",    phone: "416-555-0303", city: "Hamilton",    joined: "Jun 2023", visits: 7,  ltv: 1540,  children: 2, tier: "Active"   },
  { id: "FAM-004", parent: "Jordan Reed",      email: "jordan.r@email.com", phone: "289-555-0404", city: "Burlington",  joined: "Aug 2023", visits: 4,  ltv: 920,   children: 1, tier: "Active"   },
  { id: "FAM-005", parent: "Priya Shah",       email: "priya.s@email.com",  phone: "905-555-0505", city: "Brampton",    joined: "Sep 2022", visits: 22, ltv: 4840,  children: 3, tier: "VIP"      },
  { id: "FAM-006", parent: "Mark Wilson",      email: "mark.w@email.com",   phone: "647-555-0606", city: "Mississauga", joined: "Nov 2023", visits: 2,  ltv: 440,   children: 1, tier: "Active"   },
  { id: "FAM-007", parent: "Claire Martin",    email: "claire.m@email.com", phone: "905-555-0707", city: "Oakville",    joined: "Dec 2022", visits: 0,  ltv: 320,   children: 1, tier: "Inactive" },
];

const MAX_LTV = Math.max(...FAMILIES.map((f) => f.ltv));
const TIER_TONE: Record<Tier, "info" | "good" | "neutral"> = { VIP: "info", Active: "good", Inactive: "neutral" };

function AdminUsers() {
  const [query, setQuery] = useState("");

  const visible = FAMILIES.filter((f) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return [f.parent, f.email, f.city, f.id].some((s) => s.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Operations"
        title="Patients & Families"
        sub="2,412 registered families across Ontario"
        action={
          <>
            <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Export</Btn>
            <Btn variant="primary"   size="sm"><Plus     className="h-4 w-4" /> Add Family</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Families"  value="2,412" delta="↑ 84 this month"   icon={Users}     tone="neutral" deltaUp />
        <StatCard label="Active (30 days)" value="1,847" delta="76.6% of total"   icon={TrendingUp} tone="good"   deltaUp />
        <StatCard label="Avg Lifetime Value" value="$2,340" delta="+$180 vs last qtr" icon={Star}  tone="good"   deltaUp />
        <StatCard label="Children Served" value="3,981"  delta="Across all families" icon={Users}  tone="neutral" />
      </div>

      {/* Table */}
      <Card noPad>
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
          <h2 className="text-base font-bold text-foreground">Family Directory</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)]" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, city…"
              className="w-60 rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] pl-8 pr-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                {["Family", "Contact", "City", "Joined", "Visits", "Lifetime Value", "Tier", ""].map((h) => (
                  <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((f) => (
                <tr key={f.id} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={f.parent} size={34} />
                      <div>
                        <p className="font-semibold text-foreground">{f.parent}</p>
                        <p className="text-[11px] text-[oklch(0.55_0.04_250)]">{f.id} · {f.children} {f.children === 1 ? "child" : "children"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="flex items-center gap-1.5 text-xs text-[oklch(0.42_0.05_250)]"><Mail className="h-3 w-3" />{f.email}</p>
                    <p className="flex items-center gap-1.5 text-xs text-[oklch(0.55_0.04_250)] mt-0.5"><Phone className="h-3 w-3" />{f.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-[oklch(0.42_0.05_250)]">{f.city}</td>
                  <td className="py-3.5 px-4 text-sm text-[oklch(0.55_0.04_250)] whitespace-nowrap">{f.joined}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground tabular-nums">{f.visits}</td>
                  <td className="py-3.5 px-4 min-w-40">
                    <div className="flex items-center gap-2">
                      <span className="font-bold tabular-nums text-foreground w-16 shrink-0">${f.ltv.toLocaleString()}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-[oklch(0.91_0.025_240)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${(f.ltv / MAX_LTV) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge tone={TIER_TONE[f.tier]} dot>{f.tier}</Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Profile</button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={8} className="py-16 text-center text-sm text-[oklch(0.55_0.04_250)]">No families match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[oklch(0.91_0.025_240)]">
          <p className="text-xs text-[oklch(0.55_0.04_250)]">Showing {visible.length} of {FAMILIES.length} families</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "…", 48].map((p, i) => (
              <button key={i} className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition-colors ${p === 1 ? "bg-primary text-white" : "text-[oklch(0.5_0.04_250)] hover:bg-[oklch(0.94_0.05_240)]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
