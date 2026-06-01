import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollText, Search, Download, ShieldAlert, ShieldCheck, FileEdit, LogIn, Eye } from "lucide-react";
import { PageHeader, Card, StatCard, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/audit")({ component: AdminAudit });

const EVENTS = [
  { ts: "2025-11-14 14:23:11", actor: "alice.chen@pediatricuc.ca", role: "NP", action: "Viewed patient record", target: "PAT-2401-CH02", ip: "10.0.4.18", severity: "info" as const, icon: Eye },
  { ts: "2025-11-14 14:18:42", actor: "admin@pediatricuc.ca", role: "Admin", action: "Updated billing settings", target: "Settings/billing", ip: "10.0.4.2", severity: "info" as const, icon: FileEdit },
  { ts: "2025-11-14 13:55:09", actor: "jordan.park@pediatricuc.ca", role: "NP", action: "Signed visit document", target: "VST-10246", ip: "10.0.4.21", severity: "info" as const, icon: FileEdit },
  { ts: "2025-11-14 13:42:01", actor: "unknown", role: "—", action: "Failed login (5x)", target: "auth/login", ip: "203.0.113.42", severity: "warn" as const, icon: ShieldAlert },
  { ts: "2025-11-14 13:21:34", actor: "sarah.m@email.com", role: "Parent", action: "Downloaded visit summary", target: "VST-10240", ip: "192.0.2.18", severity: "info" as const, icon: Eye },
  { ts: "2025-11-14 12:58:17", actor: "admin@pediatricuc.ca", role: "Admin", action: "Created NP account", target: "User devon.reyes", ip: "10.0.4.2", severity: "info" as const, icon: ShieldCheck },
  { ts: "2025-11-14 12:30:55", actor: "system", role: "System", action: "PHIPA daily integrity check passed", target: "System", ip: "—", severity: "good" as const, icon: ShieldCheck },
  { ts: "2025-11-14 11:12:08", actor: "maya.singh@pediatricuc.ca", role: "NP", action: "Exported patient list (8 records)", target: "Export/CSV", ip: "10.0.4.27", severity: "warn" as const, icon: Download },
  { ts: "2025-11-14 09:04:22", actor: "alice.chen@pediatricuc.ca", role: "NP", action: "Logged in", target: "auth/login", ip: "10.0.4.18", severity: "info" as const, icon: LogIn },
];

function AdminAudit() {
  const [q, setQ] = useState("");
  const filtered = EVENTS.filter(e => q === "" || (e.actor + e.action + e.target).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Audit Log"
        sub="Tamper-evident record of every privileged action — PHIPA & SOC 2 ready."
        action={<button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent"><Download className="h-4 w-4" /> Export 90 days</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Events (24h)" value="1,284" delta="Normal volume" tone="good" icon={ScrollText} />
        <StatCard label="Failed Logins" value="14" delta="2 IPs blocked" tone="warn" icon={ShieldAlert} />
        <StatCard label="PHI Accesses" value="318" delta="All authorized" tone="good" icon={Eye} />
        <StatCard label="Compliance" value="100%" delta="PHIPA · SOC 2" tone="good" icon={ShieldCheck} />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
          <h3 className="font-display font-extrabold">Recent events</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search actor, action, target…" className="w-72 rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-secondary-ink">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Timestamp</th>
                <th className="px-4 py-3 font-semibold">Actor</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">IP</th>
                <th className="px-4 py-3 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((e, i) => (
                <tr key={i} className="hover:bg-background">
                  <td className="px-4 py-3 font-mono text-xs text-secondary-ink">{e.ts}</td>
                  <td className="px-4 py-3 font-mono text-xs">{e.actor}</td>
                  <td className="px-4 py-3"><Badge tone="neutral">{e.role}</Badge></td>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-2"><e.icon className="h-4 w-4 text-secondary-ink" />{e.action}</span></td>
                  <td className="px-4 py-3 font-mono text-xs">{e.target}</td>
                  <td className="px-4 py-3 font-mono text-xs text-secondary-ink">{e.ip}</td>
                  <td className="px-4 py-3"><Badge tone={e.severity === "warn" ? "warn" : e.severity === "good" ? "good" : "info"}>{e.severity}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}