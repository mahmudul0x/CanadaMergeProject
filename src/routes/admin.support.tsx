import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LifeBuoy, MessageSquare, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/support")({ component: AdminSupport });

type Status = "Open" | "In Progress" | "Resolved" | "Escalated";
type Priority = "Low" | "Medium" | "High" | "Urgent";

const TICKETS: { id: string; subject: string; family: string; assignee: string; priority: Priority; status: Status; updated: string; messages: number }[] = [
  { id: "TKT-4821", subject: "Cannot upload vaccination record (PDF)", family: "Sarah Mitchell", assignee: "Aria", priority: "Medium", status: "In Progress", updated: "12 min ago", messages: 4 },
  { id: "TKT-4820", subject: "Wrong booking time confirmed", family: "James Brown", assignee: "Devon R.", priority: "High", status: "Open", updated: "28 min ago", messages: 2 },
  { id: "TKT-4819", subject: "Refund request — duplicate charge", family: "Priya Patel", assignee: "Aria", priority: "Urgent", status: "Escalated", updated: "1h ago", messages: 6 },
  { id: "TKT-4818", subject: "Add second child to account", family: "Ahmed Khan", assignee: "—", priority: "Low", status: "Open", updated: "3h ago", messages: 1 },
  { id: "TKT-4817", subject: "Schedule recurring well-child visits", family: "Lucia Garcia", assignee: "Maya S.", priority: "Medium", status: "Resolved", updated: "Yesterday", messages: 5 },
  { id: "TKT-4816", subject: "Insurance receipt for OHIP needed", family: "Min Lee", assignee: "Aria", priority: "Low", status: "Resolved", updated: "2 days ago", messages: 3 },
];

const TABS: Status[] = ["Open", "In Progress", "Escalated", "Resolved"];

function AdminSupport() {
  const [tab, setTab] = useState<Status | "All">("All");
  const filtered = tab === "All" ? TICKETS : TICKETS.filter(t => t.status === tab);

  return (
    <>
      <PageHeader
        title="Support"
        sub="Family tickets, escalations and team responses."
        action={<button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> New Ticket</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open Tickets" value="18" delta="4 unassigned" tone="warn" icon={LifeBuoy} />
        <StatCard label="Avg First Reply" value="14 min" delta="Target: 30 min" tone="good" icon={Clock} />
        <StatCard label="Resolved (7d)" value="64" delta="+9 vs. last week" tone="good" icon={CheckCircle2} />
        <StatCard label="CSAT" value="4.8 / 5" delta="223 ratings" tone="good" icon={MessageSquare} />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-1 bg-background rounded-lg p-1 m-4 w-fit">
          {(["All", ...TABS] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${tab === t ? "bg-surface shadow-soft text-primary" : "text-secondary-ink hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-secondary-ink">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Ticket</th>
                <th className="px-4 py-3 font-semibold">Family</th>
                <th className="px-4 py-3 font-semibold">Assignee</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Msgs</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-background cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{t.subject}</div>
                    <div className="text-xs text-secondary-ink font-mono">{t.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2"><Avatar name={t.family} size={28} /><span>{t.family}</span></div>
                  </td>
                  <td className="px-4 py-3">{t.assignee === "—" ? <span className="text-secondary-ink flex items-center gap-1 text-xs"><AlertCircle className="h-3 w-3" /> Unassigned</span> : t.assignee}</td>
                  <td className="px-4 py-3"><Badge tone={t.priority === "Urgent" ? "bad" : t.priority === "High" ? "warn" : t.priority === "Medium" ? "info" : "neutral"}>{t.priority}</Badge></td>
                  <td className="px-4 py-3"><Badge tone={t.status === "Resolved" ? "good" : t.status === "Escalated" ? "bad" : t.status === "In Progress" ? "info" : "warn"}>{t.status}</Badge></td>
                  <td className="px-4 py-3 text-right tabular-nums">{t.messages}</td>
                  <td className="px-4 py-3 text-secondary-ink text-xs">{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}