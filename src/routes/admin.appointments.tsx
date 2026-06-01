import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Search, Filter, Download, Plus, MoreHorizontal, Clock } from "lucide-react";
import { PageHeader, Card, StatCard, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/appointments")({ component: AdminAppointments });

const ROWS = [
  { id: "APT-10247", patient: "Emma Thompson, 6", parent: "Sarah M.", np: "A. Chen", city: "Milton", type: "Sick visit", time: "Today · 2:30 PM", status: "Confirmed" as const, fee: 224 },
  { id: "APT-10246", patient: "Noah Brown, 5", parent: "James B.", np: "J. Park", city: "Oakville", type: "Vaccination", time: "Today · 3:15 PM", status: "En Route" as const, fee: 189 },
  { id: "APT-10245", patient: "Liam Patel, 3", parent: "Priya P.", np: "M. Singh", city: "Hamilton", type: "Follow-up", time: "Today · 4:00 PM", status: "In Progress" as const, fee: 159 },
  { id: "APT-10244", patient: "Olivia Khan, 8", parent: "Ahmed K.", np: "R. Wong", city: "Mississauga", type: "Well-child", time: "Today · 5:30 PM", status: "Pending" as const, fee: 209 },
  { id: "APT-10243", patient: "Mia Garcia, 4", parent: "Lucia G.", np: "A. Chen", city: "Milton", type: "Sick visit", time: "Tomorrow · 9:00 AM", status: "Confirmed" as const, fee: 224 },
  { id: "APT-10242", patient: "Ethan Lee, 7", parent: "Min Lee", city: "Burlington", np: "J. Park", type: "Vaccination", time: "Tomorrow · 10:30 AM", status: "Confirmed" as const, fee: 189 },
  { id: "APT-10241", patient: "Ava Roberts, 2", parent: "Hannah R.", np: "M. Singh", city: "Hamilton", type: "Sick visit", time: "Tomorrow · 1:00 PM", status: "Pending" as const, fee: 224 },
  { id: "APT-10240", patient: "Lucas Wright, 9", parent: "David W.", np: "R. Wong", city: "Mississauga", type: "Follow-up", time: "Yesterday", status: "Completed" as const, fee: 159 },
];

const TABS = ["All", "Today", "Upcoming", "Completed", "Cancelled"] as const;

function AdminAppointments() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = ROWS.filter(r => (tab === "All" || (tab === "Today" && r.time.startsWith("Today")) || (tab === "Upcoming" && r.time.startsWith("Tomorrow")) || (tab === "Completed" && r.status === "Completed")) && (q === "" || (r.patient + r.parent + r.np + r.city + r.id).toLowerCase().includes(q.toLowerCase())));

  return (
    <>
      <PageHeader
        title="Appointments"
        sub="Manage all scheduled and historical home visits across Ontario."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent"><Download className="h-4 w-4" /> Export</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> New Appointment</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Today" value="24" delta="+3 vs. yesterday" tone="good" icon={CalendarCheck} />
        <StatCard label="In Progress" value="6" delta="2 awaiting NP" tone="warn" icon={Clock} />
        <StatCard label="This Week" value="138" delta="92% confirmed" tone="good" icon={CalendarCheck} />
        <StatCard label="No-show Rate" value="1.8%" delta="−0.4% MoM" tone="good" icon={CalendarCheck} />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${tab === t ? "bg-surface shadow-soft text-primary" : "text-secondary-ink hover:text-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, patient, NP…" className="w-64 rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent"><Filter className="h-4 w-4" /> Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-secondary-ink">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Patient</th>
                <th className="px-4 py-3 font-semibold">NP</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Fee</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-background">
                  <td className="px-4 py-3 font-mono text-xs text-secondary-ink">{r.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{r.patient}</div>
                    <div className="text-xs text-secondary-ink">Parent: {r.parent}</div>
                  </td>
                  <td className="px-4 py-3">{r.np}</td>
                  <td className="px-4 py-3">{r.city}</td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3 text-secondary-ink">{r.time}</td>
                  <td className="px-4 py-3">
                    <Badge tone={r.status === "Completed" ? "good" : r.status === "Pending" ? "warn" : r.status === "In Progress" ? "info" : r.status === "En Route" ? "info" : "good"}>{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold">${r.fee}</td>
                  <td className="px-4 py-3 text-right"><button className="p-1 rounded hover:bg-accent"><MoreHorizontal className="h-4 w-4 text-secondary-ink" /></button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-secondary-ink">No appointments match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-secondary-ink">
          <span>Showing {filtered.length} of {ROWS.length}</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-accent">Previous</button>
            <button className="px-3 py-1.5 rounded-md border border-border bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-accent">2</button>
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-accent">Next</button>
          </div>
        </div>
      </Card>
    </>
  );
}