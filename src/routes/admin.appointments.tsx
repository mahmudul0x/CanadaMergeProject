// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays, CheckCircle2, Clock, Download, Filter,
  MapPin, Plus, Search, SlidersHorizontal, XCircle,
} from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Btn, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/appointments")({ component: AdminAppointments });

/* ── Data ── */
type Status = "Confirmed" | "En Route" | "In Progress" | "Pending" | "Completed" | "Cancelled";
const ROWS: {
  id: string; patient: string; age: number; parent: string;
  np: string; city: string; type: string;
  date: string; time: string; status: Status; fee: string; urgent: boolean;
}[] = [
  { id: "APT-1048", patient: "Emma Thompson",  age: 6, parent: "Sarah T.",  np: "A. Chen",   city: "Milton",      type: "Sick Visit",  date: "Today",     time: "1:00 PM", status: "In Progress", fee: "$224.87", urgent: true  },
  { id: "APT-1047", patient: "Aarav Patel",    age: 3, parent: "David P.",  np: "J. Park",   city: "Oakville",    type: "Vaccination", date: "Today",     time: "1:30 PM", status: "En Route",    fee: "$118.65", urgent: false },
  { id: "APT-1046", patient: "Sophie Lin",     age: 8, parent: "Mei L.",    np: "S. Rivera", city: "Hamilton",    type: "Follow-up",   date: "Today",     time: "2:00 PM", status: "Confirmed",   fee: "$96.05",  urgent: false },
  { id: "APT-1045", patient: "Theo Reed",      age: 2, parent: "Jordan R.", np: "L. Brown",  city: "Burlington",  type: "Sick Visit",  date: "Today",     time: "2:45 PM", status: "Pending",     fee: "$237.30", urgent: true  },
  { id: "APT-1044", patient: "Anika Shah",     age: 5, parent: "Priya S.",  np: "M. Torres", city: "Brampton",    type: "Well-child",  date: "Today",     time: "3:30 PM", status: "Confirmed",   fee: "$169.49", urgent: false },
  { id: "APT-1043", patient: "Liam Nguyen",    age: 7, parent: "Kim N.",    np: "A. Chen",   city: "Milton",      type: "Vaccination", date: "Today",     time: "4:00 PM", status: "Confirmed",   fee: "$143.20", urgent: false },
  { id: "APT-1042", patient: "Olivia Martin",  age: 4, parent: "Claire M.", np: "J. Park",   city: "Mississauga", type: "Sick Visit",  date: "Tomorrow",  time: "9:00 AM", status: "Confirmed",   fee: "$199.10", urgent: false },
  { id: "APT-1041", patient: "Ethan Wilson",   age: 9, parent: "Mark W.",   np: "S. Rivera", city: "Hamilton",    type: "Follow-up",   date: "Yesterday", time: "11:00 AM",status: "Completed",   fee: "$96.05",  urgent: false },
];

const TABS = ["All", "Today", "Upcoming", "Completed", "Cancelled"] as const;
type Tab = (typeof TABS)[number];

const STATUS_CFG: Record<Status, "good" | "info" | "warn" | "neutral" | "bad"> = {
  Confirmed:    "good",
  "En Route":   "info",
  "In Progress":"info",
  Pending:      "warn",
  Completed:    "neutral",
  Cancelled:    "bad",
};

function AdminAppointments() {
  const [tab, setTab]     = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const visible = ROWS.filter((r) => {
    if (tab === "Today"     && r.date !== "Today")     return false;
    if (tab === "Upcoming"  && r.date !== "Tomorrow")  return false;
    if (tab === "Completed" && r.status !== "Completed") return false;
    if (tab === "Cancelled" && r.status !== "Cancelled") return false;
    if (query) {
      const q = query.toLowerCase();
      return [r.id, r.patient, r.parent, r.np, r.city, r.type].some((f) => f.toLowerCase().includes(q));
    }
    return true;
  });

  const allChecked = visible.length > 0 && visible.every((r) => selected.has(r.id));
  const toggleAll  = () => setSelected(allChecked ? new Set() : new Set(visible.map((r) => r.id)));
  const toggleRow  = (id: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Operations"
        title="Appointments"
        sub="Manage, dispatch and monitor all bookings across Ontario"
        action={
          <>
            <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Export</Btn>
            <Btn variant="primary"   size="sm"><Plus     className="h-4 w-4" /> New Appointment</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Bookings" value="24"   delta="8 completed · 4 in progress" icon={CalendarDays} tone="neutral" />
        <StatCard label="In Progress"      value="4"    delta="Across 4 cities"              icon={Clock}        tone="neutral" deltaUp />
        <StatCard label="Weekly Total"     value="142"  delta="+18% vs last week"            icon={CheckCircle2} tone="good"    deltaUp />
        <StatCard label="No-show Rate"     value="3.2%" delta="↓ 0.4% vs last week"         icon={XCircle}      tone="good"    deltaUp />
      </div>

      {/* Table card */}
      <Card noPad>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
          <div className="flex items-center gap-1 rounded-xl bg-[oklch(0.965_0.018_240)] p-1 border border-[oklch(0.91_0.025_240)]">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  tab === t ? "bg-white text-foreground shadow-sm" : "text-[oklch(0.55_0.04_250)] hover:text-foreground"
                }`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Patient, NP, city…"
                className="w-52 rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] pl-8 pr-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
            </div>
            <Btn variant="secondary" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Btn>
            <Btn variant="secondary" size="sm"><SlidersHorizontal className="h-3.5 w-3.5" /> Sort</Btn>
          </div>
        </div>

        {/* Bulk bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-4 px-6 py-3 bg-primary/5 border-b border-[oklch(0.91_0.025_240)]">
            <span className="text-xs font-bold text-primary">{selected.size} selected</span>
            <button className="text-xs font-semibold text-[oklch(0.42_0.05_250)] hover:text-foreground">Reassign NP</button>
            <button className="text-xs font-semibold text-[oklch(0.42_0.05_250)] hover:text-foreground">Reschedule</button>
            <button className="text-xs font-semibold text-red-600 hover:text-red-700">Cancel</button>
            <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-[oklch(0.55_0.04_250)] hover:text-foreground">Clear</button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                <th className="py-3 px-4 w-10">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll}
                    className="h-4 w-4 rounded border-[oklch(0.78_0.025_240)] accent-primary cursor-pointer" />
                </th>
                {["ID", "Patient", "Nurse Practitioner", "City · Type", "Date & Time", "Fee", "Status", ""].map((h) => (
                  <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className={`border-b border-[oklch(0.94_0.018_240)] last:border-b-0 transition-colors ${selected.has(r.id) ? "bg-primary/4" : "hover:bg-[oklch(0.975_0.012_240)]"}`}>
                  <td className="py-3.5 px-4">
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleRow(r.id)}
                      className="h-4 w-4 rounded border-[oklch(0.78_0.025_240)] accent-primary cursor-pointer" />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs text-[oklch(0.55_0.04_250)]">{r.id}</span>
                    {r.urgent && <span className="ml-1.5"><Badge tone="bad">Urgent</Badge></span>}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{r.patient}, {r.age}</p>
                    <p className="text-[11px] text-[oklch(0.55_0.04_250)]">{r.parent}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={r.np} size={28} />
                      <span className="text-sm text-foreground">{r.np}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[oklch(0.6_0.04_250)]" />{r.city}
                    </p>
                    <p className="text-[11px] text-[oklch(0.55_0.04_250)]">{r.type}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-sm font-medium text-foreground">{r.date}</p>
                    <p className="text-[11px] text-[oklch(0.55_0.04_250)] tabular-nums">{r.time}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold tabular-nums text-foreground">{r.fee}</td>
                  <td className="py-3.5 px-4"><Badge tone={STATUS_CFG[r.status]} dot>{r.status}</Badge></td>
                  <td className="py-3.5 px-4">
                    <button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">View</button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={9} className="py-16 text-center text-sm text-[oklch(0.55_0.04_250)]">No appointments match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[oklch(0.91_0.025_240)]">
          <p className="text-xs text-[oklch(0.55_0.04_250)]">Showing {visible.length} of {ROWS.length} appointments</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "…", 12].map((p, i) => (
              <button key={i} className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition-colors ${p === 1 ? "bg-primary text-white" : "text-[oklch(0.5_0.04_250)] hover:bg-[oklch(0.94_0.05_240)]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
