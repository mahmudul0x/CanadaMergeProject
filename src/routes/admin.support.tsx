import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle, CheckCircle2, Clock, MessageSquare,
  Plus, Search, Star, TrendingUp,
} from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Btn, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/support")({ component: AdminSupport });

/* ── Data ── */
type Priority = "Low" | "Medium" | "High" | "Urgent";
type TicketStatus = "Open" | "In Progress" | "Escalated" | "Resolved";

const TICKETS: {
  id: string; subject: string; family: string; assignee: string;
  priority: Priority; status: TicketStatus; updated: string; messages: number; sla: string;
}[] = [
  { id: "TKT-0214", subject: "NP arrived 45 min late — requesting partial refund", family: "Thompson Family",  assignee: "Maya R.", priority: "High",   status: "In Progress", updated: "5 min ago",  messages: 4, sla: "2h 15m" },
  { id: "TKT-0213", subject: "Unable to reschedule appointment online",            family: "Patel Family",    assignee: "James K.", priority: "Medium", status: "Open",        updated: "22 min ago", messages: 2, sla: "5h 40m" },
  { id: "TKT-0212", subject: "Vaccination record not appearing in portal",         family: "Lin Family",      assignee: "Maya R.", priority: "Medium", status: "Open",        updated: "1h ago",     messages: 1, sla: "5h 00m" },
  { id: "TKT-0211", subject: "Billing charge discrepancy — $47 overage",           family: "Reed Family",     assignee: "Sam T.",  priority: "High",   status: "Escalated",   updated: "2h ago",     messages: 7, sla: "0h 30m" },
  { id: "TKT-0210", subject: "Request for PHIPA data export",                      family: "Shah Family",     assignee: "James K.", priority: "Urgent", status: "In Progress", updated: "3h ago",    messages: 3, sla: "1h 10m" },
  { id: "TKT-0209", subject: "Positive feedback for NP A. Chen",                   family: "Nguyen Family",  assignee: "Sam T.",  priority: "Low",    status: "Resolved",    updated: "Yesterday",  messages: 2, sla: "—" },
];

const TABS = ["All", "Open", "In Progress", "Escalated", "Resolved"] as const;
type Tab = (typeof TABS)[number];

const PRIORITY_TONE: Record<Priority, "neutral" | "info" | "warn" | "bad"> = {
  Low: "neutral", Medium: "info", High: "warn", Urgent: "bad",
};
const STATUS_TONE: Record<TicketStatus, "warn" | "info" | "bad" | "good"> = {
  Open: "warn", "In Progress": "info", Escalated: "bad", Resolved: "good",
};

function AdminSupport() {
  const [tab, setTab]     = useState<Tab>("All");
  const [query, setQuery] = useState("");

  const visible = TICKETS.filter((t) => {
    if (tab !== "All" && t.status !== tab) return false;
    if (query) {
      const q = query.toLowerCase();
      return [t.id, t.subject, t.family, t.assignee].some((f) => f.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="System"
        title="Support"
        sub="Customer service tickets and family communications"
        action={
          <Btn variant="primary" size="sm"><Plus className="h-4 w-4" /> New Ticket</Btn>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Tickets"      value="18"   delta="3 escalated"             icon={AlertCircle}   tone="warn" />
        <StatCard label="Avg First Reply"   value="14m"  delta="SLA target: 30 min"      icon={Clock}         tone="good"    deltaUp />
        <StatCard label="Resolved (7 days)" value="64"   delta="+8 vs last week"          icon={CheckCircle2}  tone="good"    deltaUp />
        <StatCard label="CSAT Score"        value="4.8★" delta="+0.2 vs last month"       icon={Star}          tone="good"    deltaUp />
      </div>

      {/* Table */}
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
                {t === "Escalated" && <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">3</span>}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tickets…"
              className="w-56 rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] pl-8 pr-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                {["Ticket", "Subject", "Family", "Assignee", "Priority", "Status", "SLA", "Updated", ""].map((h) => (
                  <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => {
                const slaUrgent = t.sla !== "—" && t.sla.startsWith("0h");
                return (
                  <tr key={t.id} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-[11px] text-[oklch(0.55_0.04_250)]">{t.id}</p>
                      <p className="text-[11px] text-[oklch(0.6_0.04_250)] flex items-center gap-0.5 mt-0.5">
                        <MessageSquare className="h-3 w-3" /> {t.messages}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 max-w-56">
                      <p className="font-semibold text-foreground truncate">{t.subject}</p>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-[oklch(0.45_0.05_250)] whitespace-nowrap">{t.family}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={t.assignee} size={26} />
                        <span className="text-sm text-foreground whitespace-nowrap">{t.assignee}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4"><Badge tone={PRIORITY_TONE[t.priority]} dot>{t.priority}</Badge></td>
                    <td className="py-3.5 px-4"><Badge tone={STATUS_TONE[t.status]} dot>{t.status}</Badge></td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs font-bold tabular-nums ${slaUrgent ? "text-red-600" : "text-[oklch(0.45_0.05_250)]"}`}>
                        {t.sla}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[oklch(0.55_0.04_250)] whitespace-nowrap">{t.updated}</td>
                    <td className="py-3.5 px-4">
                      <button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Open</button>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr><td colSpan={9} className="py-16 text-center text-sm text-[oklch(0.55_0.04_250)]">No tickets match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[oklch(0.91_0.025_240)]">
          <p className="text-xs text-[oklch(0.55_0.04_250)]">Showing {visible.length} of {TICKETS.length} tickets</p>
          <div className="flex items-center gap-1.5 text-xs text-[oklch(0.55_0.04_250)]">
            <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.42_0.18_150)]" />
            Avg resolution time: <strong className="text-foreground ml-1">2h 18m</strong>
          </div>
        </div>
      </Card>
    </div>
  );
}
