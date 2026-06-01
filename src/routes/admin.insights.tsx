import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Brain, DollarSign, MapPin, RefreshCw, Sparkles, TrendingUp, X } from "lucide-react";
import { useState, type ComponentType } from "react";

export const Route = createFileRoute("/admin/insights")({ component: AdminInsightsPage });

type Tone = "blue" | "amber" | "green" | "purple" | "red";
type Insight = {
  id: string;
  tone: Tone;
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  cta: string;
  confidence: number;
  timestamp: string;
};

const INSIGHTS: Insight[] = [
  {
    id: "i1",
    tone: "blue",
    icon: Brain,
    title: "Scheduling Insight",
    body: "NP Jennifer has 6 visits in Oakville Thursday, but NP Mark has only 2. Consider reassigning 2 Oakville visits to Mark to balance load.",
    cta: "Rebalance",
    confidence: 92,
    timestamp: "2 min ago",
  },
  {
    id: "i2",
    tone: "amber",
    icon: TrendingUp,
    title: "Demand Forecast",
    body: "Based on last 4 weekends, expect 35–40% higher booking volume this Saturday. Consider adding 1 on-call NP in Milton and Hamilton.",
    cta: "Add Coverage",
    confidence: 87,
    timestamp: "14 min ago",
  },
  {
    id: "i3",
    tone: "green",
    icon: DollarSign,
    title: "Revenue Opportunity",
    body: "3 families haven't rebooked in 60+ days. A follow-up reminder could recover an estimated $450 in bookings.",
    cta: "Send Reminder",
    confidence: 78,
    timestamp: "1 hr ago",
  },
  {
    id: "i4",
    tone: "purple",
    icon: MapPin,
    title: "Route Optimization",
    body: "NP Sarah's route Thursday adds 18km of unnecessary backtracking. Reordering stops could save ~40 minutes of travel time.",
    cta: "Optimize Route",
    confidence: 95,
    timestamp: "2 hr ago",
  },
  {
    id: "i5",
    tone: "red",
    icon: AlertTriangle,
    title: "Quality Alert",
    body: "Visit #PUC-2847 received a 2★ rating. Review notes and consider a follow-up with the family.",
    cta: "Review Visit",
    confidence: 100,
    timestamp: "4 hr ago",
  },
];

const TONE_STYLES: Record<Tone, { card: string; chip: string; cta: string }> = {
  blue: {
    card: "border-primary/30 bg-primary/5",
    chip: "bg-primary text-primary-foreground",
    cta: "bg-primary text-primary-foreground hover:opacity-90",
  },
  amber: {
    card: "border-[color:var(--color-warning)]/30 bg-[color:var(--color-warning)]/10",
    chip: "bg-[color:var(--color-warning)] text-white",
    cta: "bg-[color:var(--color-warning)] text-white hover:opacity-90",
  },
  green: {
    card: "border-[color:var(--color-success)]/30 bg-[color:var(--color-success)]/10",
    chip: "bg-[color:var(--color-success)] text-white",
    cta: "bg-[color:var(--color-success)] text-white hover:opacity-90",
  },
  purple: {
    card: "border-[oklch(0.55_0.18_295)]/30 bg-[oklch(0.55_0.18_295)]/10",
    chip: "bg-[oklch(0.55_0.18_295)] text-white",
    cta: "bg-[oklch(0.55_0.18_295)] text-white hover:opacity-90",
  },
  red: {
    card: "border-destructive/30 bg-destructive/5",
    chip: "bg-destructive text-destructive-foreground",
    cta: "bg-destructive text-destructive-foreground hover:opacity-90",
  },
};

function AdminInsightsPage() {
  const [items, setItems] = useState<Insight[]>(INSIGHTS);
  const [refreshing, setRefreshing] = useState(false);

  const dismiss = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));
  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setItems(INSIGHTS);
      setRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Insights
          </h1>
          <p className="text-sm text-secondary-ink">Automated recommendations from PediIQ across operations, revenue, and quality.</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh Insights
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-secondary-ink" />
          <p className="mt-3 font-display font-bold">All caught up</p>
          <p className="text-sm text-secondary-ink">No new insights right now. Check back later.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((insight) => {
            const styles = TONE_STYLES[insight.tone];
            const Icon = insight.icon;
            return (
              <article
                key={insight.id}
                className={`relative rounded-2xl border-2 p-5 transition-shadow hover:shadow-soft ${styles.card}`}
              >
                <button
                  type="button"
                  aria-label="Dismiss insight"
                  onClick={() => dismiss(insight.id)}
                  className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-secondary-ink hover:bg-surface"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-start gap-3 pr-7">
                  <span className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${styles.chip}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-extrabold text-base">{insight.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary-ink">
                        {insight.confidence}% confident · {insight.timestamp}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground leading-relaxed">{insight.body}</p>
                    <button
                      type="button"
                      className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-soft ${styles.cta}`}
                    >
                      {insight.cta} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}