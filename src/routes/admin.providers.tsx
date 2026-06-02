// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Download, MapPin, Plus, Search, Star, Stethoscope, TrendingUp, Users } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Btn, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/providers")({ component: AdminProviders });

/* ── Data ── */
type NPStatus = "On Visit" | "Available" | "Off Duty";

const NPS: {
  name: string; region: string; visits: number; rating: number;
  util: number; status: NPStatus; specialty: string; joined: string; patients: number;
}[] = [
  { name: "Alicia Chen",    region: "Milton / Oakville",      visits: 412, rating: 4.97, util: 84, status: "On Visit",  specialty: "Pediatric Acute",   joined: "2021", patients: 298 },
  { name: "James Park",     region: "Oakville / Mississauga", visits: 388, rating: 4.94, util: 79, status: "On Visit",  specialty: "Vaccinations",      joined: "2022", patients: 261 },
  { name: "Sofia Rivera",   region: "Hamilton / Burlington",  visits: 356, rating: 4.91, util: 71, status: "On Visit",  specialty: "Newborn Care",      joined: "2022", patients: 244 },
  { name: "Lucas Brown",    region: "Mississauga / Brampton", visits: 321, rating: 4.88, util: 76, status: "Available", specialty: "Developmental",     joined: "2023", patients: 219 },
  { name: "Maya Torres",    region: "Brampton / Milton",      visits: 294, rating: 4.85, util: 62, status: "Available", specialty: "Pediatric Acute",   joined: "2023", patients: 198 },
  { name: "Ryan Kim",       region: "Hamilton",               visits: 267, rating: 4.82, util: 58, status: "Off Duty",  specialty: "Well-child",        joined: "2023", patients: 181 },
];

const STATUS_TONE: Record<NPStatus, "good" | "info" | "neutral"> = {
  "On Visit": "good", "Available": "info", "Off Duty": "neutral",
};

const UTIL_COLOR = (u: number) => u >= 75 ? "bg-[oklch(0.55_0.18_150)]" : u >= 60 ? "bg-[oklch(0.65_0.16_75)]" : "bg-[oklch(0.78_0.025_240)]";

function AdminProviders() {
  const [query, setQuery] = useState("");
  const [view, setView]   = useState<"grid" | "list">("grid");

  const visible = NPS.filter((n) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return [n.name, n.region, n.specialty].some((s) => s.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Operations"
        title="Nurse Practitioners"
        sub="14 active NPs across 7 Ontario cities"
        action={
          <>
            <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Export</Btn>
            <Btn variant="primary"   size="sm"><Plus     className="h-4 w-4" /> Add NP</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active NPs"       value="14"    delta="3 available now"        icon={Stethoscope} tone="neutral" />
        <StatCard label="Avg Utilization"  value="77%"   delta="Target 80% — 3% gap"   icon={TrendingUp}  tone="warn"    deltaUp={false} />
        <StatCard label="Avg Patient Rating" value="4.91★" delta="+0.04 vs last month" icon={Star}        tone="good"    deltaUp />
        <StatCard label="Certifications Due" value="3"   delta="Within 30 days"         icon={Award}       tone="warn" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)]" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, region, specialty…"
            className="w-64 rounded-xl border border-[oklch(0.91_0.025_240)] bg-white pl-8 pr-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-[oklch(0.965_0.018_240)] p-1 border border-[oklch(0.91_0.025_240)]">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${view === v ? "bg-white text-foreground shadow-sm" : "text-[oklch(0.55_0.04_250)] hover:text-foreground"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((np) => (
            <Card key={np.name} className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={np.name} size={44} tone={np.status === "On Visit" ? "health" : np.status === "Available" ? "primary" : "warm"} />
                  <div>
                    <p className="font-bold text-foreground">{np.name}</p>
                    <p className="text-[11px] text-[oklch(0.55_0.04_250)] flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />{np.region}
                    </p>
                  </div>
                </div>
                <Badge tone={STATUS_TONE[np.status]} dot>{np.status}</Badge>
              </div>

              {/* Specialty chip */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[oklch(0.965_0.018_240)] border border-[oklch(0.91_0.025_240)] px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.42_0.05_250)]">
                  <Stethoscope className="h-3 w-3" />{np.specialty}
                </span>
                <span className="text-[11px] text-[oklch(0.6_0.04_250)]">Since {np.joined}</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Visits",   value: np.visits },
                  { label: "Patients", value: np.patients },
                  { label: "Rating",   value: `${np.rating}★` },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-[oklch(0.975_0.012_240)] border border-[oklch(0.91_0.025_240)] p-2.5 text-center">
                    <p className="text-xs font-extrabold text-foreground tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-[oklch(0.6_0.04_250)] mt-0.5 font-semibold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Utilization bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] font-semibold text-[oklch(0.55_0.04_250)] uppercase tracking-wider">Utilization</p>
                  <p className={`text-[11px] font-bold ${np.util >= 75 ? "text-[oklch(0.42_0.18_150)]" : "text-[oklch(0.5_0.16_75)]"}`}>{np.util}%</p>
                </div>
                <div className="h-2 rounded-full bg-[oklch(0.91_0.025_240)] overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${UTIL_COLOR(np.util)}`} style={{ width: `${np.util}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-[oklch(0.91_0.025_240)]">
                <Btn variant="secondary" size="sm" className="flex-1 justify-center">View Profile</Btn>
                <Btn variant="ghost"     size="sm" className="flex-1 justify-center">Message</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <Card noPad>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.91_0.025_240)]">
                  {["Nurse Practitioner", "Region", "Specialty", "Visits", "Rating", "Utilization", "Status", ""].map((h) => (
                    <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((np) => (
                  <tr key={np.name} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={np.name} size={32} />
                        <p className="font-semibold text-foreground">{np.name}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-[oklch(0.45_0.05_250)]">{np.region}</td>
                    <td className="py-3.5 px-4 text-sm text-[oklch(0.45_0.05_250)]">{np.specialty}</td>
                    <td className="py-3.5 px-4 font-bold tabular-nums text-foreground">{np.visits}</td>
                    <td className="py-3.5 px-4 font-bold tabular-nums text-foreground">{np.rating}★</td>
                    <td className="py-3.5 px-4 min-w-32">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[oklch(0.91_0.025_240)] overflow-hidden">
                          <div className={`h-full rounded-full ${UTIL_COLOR(np.util)}`} style={{ width: `${np.util}%` }} />
                        </div>
                        <span className="text-xs font-bold tabular-nums text-foreground w-8 text-right">{np.util}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4"><Badge tone={STATUS_TONE[np.status]} dot>{np.status}</Badge></td>
                    <td className="py-3.5 px-4"><button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Profile</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
