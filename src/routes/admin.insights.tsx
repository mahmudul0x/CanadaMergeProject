import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  AlertTriangle, ArrowRight, Brain, DollarSign,
  MapPin, RefreshCw, Route, Sparkles, TrendingUp, X,
} from "lucide-react";
import { PageHeader, Card, Badge, Btn } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/insights")({ component: AdminInsightsPage });

/* ── Data ── */
type Tone = "blue" | "amber" | "green" | "purple" | "red";

const INITIAL_INSIGHTS: {
  id: number; tone: Tone; icon: ComponentType<{ className?: string }>;
  title: string; body: string; cta: string; confidence: number; ts: string; category: string;
}[] = [
  {
    id: 1, tone: "blue", icon: TrendingUp,
    title: "Schedule optimization opportunity",
    body: "Demand in Milton peaks between 10 AM–1 PM on Tuesdays and Thursdays. Shifting NP A. Chen's start time 1 hour earlier could absorb ~3 additional visits per week (+$672/wk revenue potential).",
    cta: "Adjust Schedule", confidence: 91, ts: "2 min ago", category: "Scheduling",
  },
  {
    id: 2, tone: "amber", icon: Brain,
    title: "Demand surge forecast · Hamilton",
    body: "Flu season indicators suggest 34% higher visit demand in Hamilton starting Nov 18. Current NP coverage will be insufficient for peak days. Recommend adding one NP to the Hamilton corridor.",
    cta: "View Forecast", confidence: 87, ts: "14 min ago", category: "Forecasting",
  },
  {
    id: 3, tone: "green", icon: DollarSign,
    title: "Upsell opportunity · Well-child visits",
    body: "47 families overdue for annual well-child checkups haven't booked in 11+ months. A targeted outreach campaign could recover ~$7,900 in recurring revenue this quarter.",
    cta: "Launch Campaign", confidence: 95, ts: "1 hr ago", category: "Revenue",
  },
  {
    id: 4, tone: "purple", icon: Route,
    title: "Route consolidation · Brampton / Mississauga",
    body: "NPs in the Brampton–Mississauga corridor are averaging 28 min travel between visits. Geo-clustering bookings by postal zone could reduce travel time by ~35%, adding 2–3 extra visit slots daily.",
    cta: "Optimize Routes", confidence: 83, ts: "3 hr ago", category: "Logistics",
  },
  {
    id: 5, tone: "red", icon: AlertTriangle,
    title: "Quality alert · NP L. Brown",
    body: "3 cancellations in 5 days from NP L. Brown's schedule, with 2 patient complaints citing late arrivals. This pattern warrants a check-in before it affects NPS scores.",
    cta: "Review Profile", confidence: 79, ts: "5 hr ago", category: "Quality",
  },
  {
    id: 6, tone: "blue", icon: MapPin,
    title: "New service area viability · Halton Hills",
    body: "Waitlist signups from Halton Hills have reached 61 families — the threshold for coverage break-even. Expanding service area now could capture first-mover advantage before competitor entry.",
    cta: "View Analysis", confidence: 88, ts: "6 hr ago", category: "Expansion",
  },
];

const TONE_STYLES: Record<Tone, { card: string; icon: string; badge: string; cta: string; bar: string }> = {
  blue:   { card: "border-primary/20 bg-primary/[0.025]",   icon: "bg-primary/12 text-primary",                badge: "bg-primary/10 text-primary",                 cta: "bg-primary text-white hover:bg-[oklch(0.46_0.13_245)]",         bar: "bg-primary" },
  amber:  { card: "border-[oklch(0.65_0.18_75)]/25 bg-[oklch(0.78_0.16_75)]/[0.04]", icon: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.46_0.16_75)]", badge: "bg-[oklch(0.78_0.16_75)]/12 text-[oklch(0.46_0.16_75)]", cta: "bg-[oklch(0.65_0.16_75)] text-white hover:bg-[oklch(0.58_0.16_75)]", bar: "bg-[oklch(0.65_0.16_75)]" },
  green:  { card: "border-[oklch(0.55_0.18_150)]/20 bg-[oklch(0.72_0.18_150)]/[0.03]", icon: "bg-[oklch(0.72_0.18_150)]/12 text-[oklch(0.35_0.18_150)]", badge: "bg-[oklch(0.72_0.18_150)]/12 text-[oklch(0.35_0.18_150)]", cta: "bg-[oklch(0.52_0.18_150)] text-white hover:bg-[oklch(0.46_0.18_150)]", bar: "bg-[oklch(0.55_0.18_150)]" },
  purple: { card: "border-[oklch(0.55_0.18_295)]/20 bg-[oklch(0.55_0.18_295)]/[0.025]", icon: "bg-[oklch(0.55_0.18_295)]/10 text-[oklch(0.45_0.18_295)]", badge: "bg-[oklch(0.55_0.18_295)]/10 text-[oklch(0.45_0.18_295)]", cta: "bg-[oklch(0.52_0.18_295)] text-white hover:bg-[oklch(0.46_0.18_295)]", bar: "bg-[oklch(0.55_0.18_295)]" },
  red:    { card: "border-red-200 bg-red-500/[0.025]", icon: "bg-red-500/10 text-red-600", badge: "bg-red-500/10 text-red-700", cta: "bg-red-600 text-white hover:bg-red-700", bar: "bg-red-500" },
};

const CATEGORIES = ["All", "Scheduling", "Forecasting", "Revenue", "Logistics", "Quality", "Expansion"];

function AdminInsightsPage() {
  const [insights, setInsights] = useState(INITIAL_INSIGHTS);
  const [spinning, setSpinning] = useState(false);
  const [activeCat, setActiveCat] = useState("All");

  const visible = activeCat === "All" ? insights : insights.filter((i) => i.category === activeCat);

  const dismiss = (id: number) => setInsights((prev) => prev.filter((i) => i.id !== id));

  const refresh = () => {
    setSpinning(true);
    setTimeout(() => { setInsights(INITIAL_INSIGHTS); setSpinning(false); }, 1400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Overview"
        title="AI Insights"
        sub="Machine-learning recommendations to optimize operations, revenue and quality"
        action={
          <>
            <Btn variant="secondary" size="sm" onClick={refresh}>
              <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
              {spinning ? "Refreshing…" : "Refresh"}
            </Btn>
          </>
        }
      />

      {/* Summary strip */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Active Insights", value: insights.length, color: "text-primary" },
          { label: "Avg Confidence",  value: `${Math.round(insights.reduce((a, i) => a + i.confidence, 0) / (insights.length || 1))}%`, color: "text-[oklch(0.42_0.18_150)]" },
          { label: "Revenue Potential", value: "$8,572", color: "text-[oklch(0.42_0.18_150)]" },
          { label: "Critical Alerts",  value: insights.filter((i) => i.tone === "red").length, color: "text-red-600" },
        ].map((s) => (
          <Card key={s.label} className="text-center py-4!">
            <p className={`text-2xl font-display font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-semibold text-[oklch(0.6_0.04_250)] mt-1 uppercase tracking-wider">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeCat === c
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-[oklch(0.45_0.05_250)] border-[oklch(0.88_0.025_240)] hover:border-primary/40 hover:text-primary"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Insight cards */}
      {visible.length === 0 ? (
        <Card className="py-20 text-center">
          <Sparkles className="h-10 w-10 text-[oklch(0.75_0.04_250)] mx-auto mb-4" />
          <p className="text-base font-bold text-foreground">All caught up</p>
          <p className="text-sm text-[oklch(0.55_0.04_250)] mt-1">No insights in this category right now.</p>
          <div className="mt-5"><Btn variant="secondary" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4" /> Refresh</Btn></div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((ins) => {
            const s = TONE_STYLES[ins.tone];
            return (
              <div key={ins.id} className={`rounded-2xl border p-5 flex flex-col gap-4 transition-all hover:shadow-md ${s.card}`}>
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.icon}`}>
                      <ins.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${s.badge}`}>{ins.category}</span>
                      <p className="text-sm font-bold text-foreground mt-0.5 leading-snug">{ins.title}</p>
                    </div>
                  </div>
                  <button onClick={() => dismiss(ins.id)} aria-label="Dismiss"
                    className="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-lg text-[oklch(0.6_0.04_250)] hover:bg-black/5 hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <p className="text-sm text-[oklch(0.38_0.04_250)] leading-relaxed">{ins.body}</p>

                {/* Confidence bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[oklch(0.6_0.04_250)]">Model confidence</p>
                    <p className="text-xs font-bold text-foreground">{ins.confidence}%</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`} style={{ width: `${ins.confidence}%` }} />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-black/6">
                  <p className="text-[11px] text-[oklch(0.6_0.04_250)]">{ins.ts}</p>
                  <button className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors shadow-sm ${s.cta}`}>
                    {ins.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
