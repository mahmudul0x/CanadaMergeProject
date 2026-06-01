import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Download, Calendar, Clock } from "lucide-react";
import { PageHeader, Card, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/reports")({ component: AdminReports });

const REPORTS = [
  { name: "Monthly operations summary", desc: "Visit volume, NP utilization, no-show rate, SLA performance.", frequency: "Monthly", last: "Nov 1, 2025", format: "PDF" },
  { name: "Revenue & margin breakdown", desc: "Revenue by service line, gross margin, cost-per-visit trends.", frequency: "Monthly", last: "Nov 1, 2025", format: "XLSX" },
  { name: "Clinical quality scorecard", desc: "Antibiotic stewardship, diagnostic accuracy, parent satisfaction.", frequency: "Quarterly", last: "Oct 1, 2025", format: "PDF" },
  { name: "PHIPA compliance log", desc: "Access events, breach attempts, data export trail.", frequency: "Monthly", last: "Nov 1, 2025", format: "CSV" },
  { name: "Provider performance review", desc: "Individual NP visit metrics, ratings and continuing education.", frequency: "Quarterly", last: "Oct 1, 2025", format: "PDF" },
  { name: "Geographic demand heatmap", desc: "Booking demand and unfulfilled requests by postal code.", frequency: "Weekly", last: "Nov 13, 2025", format: "PDF" },
  { name: "Vaccine inventory & uptake", desc: "Stock levels, expiry alerts and uptake by region.", frequency: "Weekly", last: "Nov 13, 2025", format: "XLSX" },
  { name: "Cohort retention analysis", desc: "Family retention by acquisition cohort, repeat visit rate.", frequency: "Quarterly", last: "Oct 1, 2025", format: "PDF" },
];

const SCHEDULED = [
  { name: "Weekly demand heatmap", next: "Mon Nov 17, 6:00 AM", recipients: "ops@pediatricuc.ca" },
  { name: "Monthly operations summary", next: "Dec 1, 6:00 AM", recipients: "leadership@pediatricuc.ca" },
  { name: "PHIPA compliance log", next: "Dec 1, 6:00 AM", recipients: "privacy@pediatricuc.ca" },
];

function AdminReports() {
  return (
    <>
      <PageHeader title="Reports" sub="Generate, schedule and download executive and operational reports." />

      <h3 className="font-display font-extrabold text-lg mb-3">Report library</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {REPORTS.map(r => (
          <Card key={r.name} className="!p-5 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileBarChart className="h-5 w-5" /></span>
              <Badge tone="neutral">{r.format}</Badge>
            </div>
            <h4 className="mt-3 font-display font-extrabold">{r.name}</h4>
            <p className="mt-1 text-sm text-secondary-ink flex-1">{r.desc}</p>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-secondary-ink">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.frequency}</span>
              <span>Last: {r.last}</span>
            </div>
            <button className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90">
              <Download className="h-4 w-4" /> Generate
            </button>
          </Card>
        ))}
      </div>

      <h3 className="font-display font-extrabold text-lg mb-3">Scheduled deliveries</h3>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background text-secondary-ink">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold">Report</th>
              <th className="px-4 py-3 font-semibold">Next run</th>
              <th className="px-4 py-3 font-semibold">Recipients</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SCHEDULED.map(s => (
              <tr key={s.name} className="hover:bg-background">
                <td className="px-4 py-3 font-semibold">{s.name}</td>
                <td className="px-4 py-3 text-secondary-ink flex items-center gap-1.5"><Clock className="h-3 w-3" />{s.next}</td>
                <td className="px-4 py-3 text-secondary-ink">{s.recipients}</td>
                <td className="px-4 py-3 text-right"><button className="text-xs text-primary font-semibold hover:underline">Edit schedule</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}