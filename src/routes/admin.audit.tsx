// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download, Eye, FileEdit, LogIn, Search,
  ShieldAlert, ShieldCheck, UserPlus, Lock,
} from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Btn } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/audit")({ component: AdminAudit });

/* ── Data ── */
type Severity = "info" | "warn" | "good" | "bad";

const EVENTS: {
  ts: string; actor: string; role: string; action: string;
  target: string; ip: string; severity: Severity;
}[] = [
  { ts: "2024-11-13 12:48:02", actor: "admin@pediatricuc.ca",  role: "Admin", action: "Login",               target: "Admin Console",        ip: "24.114.22.91",  severity: "good" },
  { ts: "2024-11-13 12:44:18", actor: "np.chen@pediatricuc.ca",role: "NP",    action: "View PHI record",     target: "Patient #PAT-2841",    ip: "192.168.1.14",  severity: "info" },
  { ts: "2024-11-13 12:39:55", actor: "np.park@pediatricuc.ca",role: "NP",    action: "Sign clinical note",  target: "Visit #APT-1047",      ip: "192.168.1.22",  severity: "info" },
  { ts: "2024-11-13 12:21:07", actor: "unknown",               role: "—",     action: "Failed login (×3)",   target: "Admin Console",        ip: "185.220.101.45",severity: "bad"  },
  { ts: "2024-11-13 12:15:30", actor: "admin@pediatricuc.ca",  role: "Admin", action: "Update settings",     target: "Org: notification pref",ip: "24.114.22.91", severity: "warn" },
  { ts: "2024-11-13 11:58:44", actor: "admin@pediatricuc.ca",  role: "Admin", action: "Create NP account",   target: "np.torres@pediatricuc.ca",ip: "24.114.22.91",severity: "info"},
  { ts: "2024-11-13 11:42:19", actor: "np.rivera@pediatricuc.ca",role:"NP",   action: "View PHI record",     target: "Patient #PAT-1990",    ip: "192.168.1.31",  severity: "info" },
  { ts: "2024-11-13 11:30:00", actor: "system",                role: "Sys",   action: "Integrity check",     target: "Audit log",            ip: "127.0.0.1",     severity: "good" },
  { ts: "2024-11-13 10:55:12", actor: "admin@pediatricuc.ca",  role: "Admin", action: "Export patient list", target: "Patients & Families",  ip: "24.114.22.91",  severity: "warn" },
];

const SEV_TONE: Record<Severity, "good" | "warn" | "bad" | "info"> = {
  good: "good", warn: "warn", bad: "bad", info: "info",
};

const ACTION_ICON: Record<string, typeof LogIn> = {
  "Login":               LogIn,
  "Failed login (×3)":   ShieldAlert,
  "View PHI record":     Eye,
  "Sign clinical note":  FileEdit,
  "Update settings":     FileEdit,
  "Create NP account":   UserPlus,
  "Integrity check":     ShieldCheck,
  "Export patient list": Download,
};

const SEVERITY_FILTERS = ["All", "info", "warn", "bad", "good"] as const;
type SevFilter = (typeof SEVERITY_FILTERS)[number];

function AdminAudit() {
  const [query, setQuery]   = useState("");
  const [sev, setSev]       = useState<SevFilter>("All");

  const visible = EVENTS.filter((e) => {
    if (sev !== "All" && e.severity !== sev) return false;
    if (query) {
      const q = query.toLowerCase();
      return [e.actor, e.action, e.target, e.role, e.ip].some((f) => f.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="System"
        title="Audit Log"
        sub="Tamper-evident record of all system events — PHIPA & SOC 2 compliant"
        action={
          <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Export Log</Btn>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events (24h)"    value="1,284"  delta="Normal volume"           icon={ShieldCheck} tone="neutral" />
        <StatCard label="Failed Logins"   value="14"     delta="2 flagged IPs blocked"   icon={ShieldAlert} tone="warn" />
        <StatCard label="PHI Accesses"    value="318"    delta="All by authorised NPs"   icon={Eye}         tone="neutral" />
        <StatCard label="Compliance"      value="100%"   delta="PHIPA · SOC 2 · PIPEDA"  icon={Lock}        tone="good"    deltaUp />
      </div>

      {/* Compliance badges */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { label: "PHIPA Compliant",   tone: "good"    as const },
          { label: "SOC 2 Type II",     tone: "good"    as const },
          { label: "PIPEDA",            tone: "good"    as const },
          { label: "CNO Regulated",     tone: "info"    as const },
          { label: "Retention: 7 years",tone: "neutral" as const },
          { label: "End-to-end encrypted", tone: "neutral" as const },
        ].map((b) => (
          <Badge key={b.label} tone={b.tone} dot>{b.label}</Badge>
        ))}
      </div>

      {/* Table */}
      <Card noPad>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
          <div className="flex items-center gap-1 rounded-xl bg-[oklch(0.965_0.018_240)] p-1 border border-[oklch(0.91_0.025_240)]">
            {SEVERITY_FILTERS.map((f) => (
              <button key={f} onClick={() => setSev(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  sev === f ? "bg-white text-foreground shadow-sm" : "text-[oklch(0.55_0.04_250)] hover:text-foreground"
                }`}>
                {f === "All" ? "All" : f === "bad" ? "🔴 Critical" : f === "warn" ? "🟡 Warning" : f === "good" ? "🟢 Success" : "🔵 Info"}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search actor, action, target…"
              className="w-60 rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] pl-8 pr-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                {["Timestamp", "Actor", "Role", "Action", "Target", "IP Address", "Severity"].map((h) => (
                  <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((e, i) => {
                const Icon = ACTION_ICON[e.action] ?? ShieldCheck;
                const rowBg = e.severity === "bad" ? "bg-red-500/[0.025]" : "";
                return (
                  <tr key={i} className={`border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors ${rowBg}`}>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[oklch(0.5_0.04_250)] whitespace-nowrap tabular-nums">{e.ts}</td>
                    <td className="py-3.5 px-4 text-xs font-medium text-foreground max-w-48 truncate">{e.actor}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center rounded-md bg-[oklch(0.93_0.02_240)] px-2 py-0.5 text-[10px] font-bold text-[oklch(0.45_0.05_250)]">{e.role}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-foreground whitespace-nowrap">
                        <Icon className="h-3.5 w-3.5 text-[oklch(0.6_0.04_250)] shrink-0" />{e.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[oklch(0.45_0.05_250)] max-w-44 truncate">{e.target}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[oklch(0.55_0.04_250)] whitespace-nowrap">{e.ip}</td>
                    <td className="py-3.5 px-4">
                      <Badge tone={SEV_TONE[e.severity]} dot>
                        {e.severity === "bad" ? "Critical" : e.severity === "warn" ? "Warning" : e.severity === "good" ? "Success" : "Info"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr><td colSpan={7} className="py-16 text-center text-sm text-[oklch(0.55_0.04_250)]">No events match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[oklch(0.91_0.025_240)]">
          <p className="text-xs text-[oklch(0.55_0.04_250)]">Showing {visible.length} of {EVENTS.length} events · Logs retained for 7 years</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "…", 128].map((p, i) => (
              <button key={i} className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition-colors ${p === 1 ? "bg-primary text-white" : "text-[oklch(0.5_0.04_250)] hover:bg-[oklch(0.94_0.05_240)]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
