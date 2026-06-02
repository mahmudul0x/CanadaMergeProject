import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar, Clock, Download, FileBarChart, FileSpreadsheet,
  FileText, Play, Plus, RefreshCw,
} from "lucide-react";
import { PageHeader, Card, Badge, Btn } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/reports")({ component: AdminReports });

/* ── Data ── */
type Fmt = "PDF" | "XLSX" | "CSV";
type Freq = "Weekly" | "Monthly" | "Quarterly";

const REPORTS: {
  id: string; name: string; description: string;
  freq: Freq; lastRun: string; format: Fmt; category: string;
}[] = [
  { id: "R01", name: "Weekly Operations Summary",     description: "Visit counts, NP utilization, city breakdown",    freq: "Weekly",    lastRun: "Nov 11", format: "PDF",  category: "Operations"  },
  { id: "R02", name: "Revenue & Margin Report",       description: "Revenue, cost, gross margin by service line",     freq: "Monthly",   lastRun: "Nov 1",  format: "XLSX", category: "Finance"     },
  { id: "R03", name: "Provider Performance",          description: "NP ratings, visit counts, utilization stats",     freq: "Monthly",   lastRun: "Nov 1",  format: "PDF",  category: "Providers"   },
  { id: "R04", name: "Patient Satisfaction",          description: "NPS scores, review trends, complaint analysis",   freq: "Monthly",   lastRun: "Nov 1",  format: "PDF",  category: "Quality"     },
  { id: "R05", name: "PHIPA Compliance Audit",        description: "PHI access log, consent records, data requests",  freq: "Quarterly", lastRun: "Oct 1",  format: "PDF",  category: "Compliance"  },
  { id: "R06", name: "Accounts Receivable Aging",     description: "Outstanding invoices by age bucket and status",   freq: "Weekly",    lastRun: "Nov 11", format: "XLSX", category: "Finance"     },
  { id: "R07", name: "City Demand Forecast",          description: "AI-generated 30-day demand predictions by city", freq: "Weekly",    lastRun: "Nov 11", format: "CSV",  category: "AI Insights" },
  { id: "R08", name: "Quarterly Business Review",     description: "Executive summary: KPIs, growth, initiatives",   freq: "Quarterly", lastRun: "Oct 1",  format: "PDF",  category: "Executive"   },
];

const SCHEDULED = [
  { report: "Weekly Operations Summary", next: "Mon Nov 18 · 8:00 AM", recipients: 4, freq: "Weekly"    },
  { report: "Revenue & Margin Report",   next: "Dec 1 · 9:00 AM",      recipients: 3, freq: "Monthly"   },
  { report: "PHIPA Compliance Audit",    next: "Jan 1 · 9:00 AM",      recipients: 2, freq: "Quarterly" },
];

const FMT_ICON: Record<Fmt, typeof FileText> = { PDF: FileText, XLSX: FileSpreadsheet, CSV: FileBarChart };
const FMT_COLOR: Record<Fmt, string> = {
  PDF:  "bg-red-500/10 text-red-700",
  XLSX: "bg-[oklch(0.72_0.18_150)]/12 text-[oklch(0.35_0.18_150)]",
  CSV:  "bg-primary/10 text-primary",
};
const CAT_TONE: Record<string, "neutral" | "info" | "good" | "warn" | "purple"> = {
  Operations: "neutral", Finance: "good", Providers: "info",
  Quality: "good", Compliance: "warn", "AI Insights": "purple", Executive: "info",
};

const CATEGORIES = ["All", ...Array.from(new Set(REPORTS.map((r) => r.category)))];

function AdminReports() {
  const [cat, setCat] = useState("All");
  const [generating, setGenerating] = useState<string | null>(null);

  const visible = cat === "All" ? REPORTS : REPORTS.filter((r) => r.category === cat);

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Finance & Reports"
        title="Reports"
        sub="Generate, schedule and download operational reports"
        action={
          <>
            <Btn variant="secondary" size="sm"><RefreshCw className="h-4 w-4" /> Refresh All</Btn>
            <Btn variant="primary"   size="sm"><Plus      className="h-4 w-4" /> Custom Report</Btn>
          </>
        }
      />

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              cat === c
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-[oklch(0.45_0.05_250)] border-[oklch(0.88_0.025_240)] hover:border-primary/40 hover:text-primary"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Report library */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visible.map((r) => {
          const FmtIcon = FMT_ICON[r.format];
          const isGenerating = generating === r.id;
          return (
            <Card key={r.id} className="flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(27,108,168,0.12)] transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${FMT_COLOR[r.format]}`}>
                  <FmtIcon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge tone={CAT_TONE[r.category] ?? "neutral"}>{r.category}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm leading-snug">{r.name}</p>
                <p className="mt-1 text-xs text-[oklch(0.55_0.04_250)] leading-relaxed">{r.description}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-[11px] text-[oklch(0.6_0.04_250)]">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.freq}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Last: {r.lastRun}</span>
                <span className={`ml-auto inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${FMT_COLOR[r.format]}`}>
                  {r.format}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-[oklch(0.91_0.025_240)]">
                <button
                  onClick={() => handleGenerate(r.id)}
                  disabled={isGenerating}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-[oklch(0.46_0.13_245)] transition-colors disabled:opacity-60"
                >
                  {isGenerating
                    ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" /> Generating…</>
                    : <><Play className="h-3.5 w-3.5" /> Generate</>}
                </button>
                <button className="inline-flex items-center justify-center gap-1 rounded-xl border border-[oklch(0.91_0.025_240)] bg-white px-3 py-2 text-xs font-semibold text-[oklch(0.42_0.05_250)] hover:bg-[oklch(0.96_0.02_240)] transition-colors">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Scheduled deliveries */}
      <Card noPad>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
          <div>
            <h2 className="text-base font-bold text-foreground">Scheduled Deliveries</h2>
            <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Automated report emails to stakeholders</p>
          </div>
          <Btn variant="primary" size="sm"><Plus className="h-4 w-4" /> Add Schedule</Btn>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                {["Report", "Frequency", "Next Run", "Recipients", ""].map((h) => (
                  <th key={h} className="py-3 px-5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULED.map((s, i) => (
                <tr key={i} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                  <td className="py-4 px-5 font-semibold text-foreground">{s.report}</td>
                  <td className="py-4 px-5"><Badge tone="neutral">{s.freq}</Badge></td>
                  <td className="py-4 px-5 text-sm text-[oklch(0.45_0.05_250)] whitespace-nowrap flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />{s.next}
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-[oklch(0.45_0.05_250)]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{s.recipients}</span>
                      recipients
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Edit schedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
