// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft, ChevronRight, MapPin, Navigation, Play, FileEdit, CheckCircle2, Star,
  Clock, DollarSign, Stethoscope, TrendingUp, Phone, MessageSquare, Cloud, Zap,
} from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/np/schedule")({ component: SchedulePage });

type Status = "Completed" | "In Progress" | "Upcoming" | "Cancelled";
const VISITS: { id: string; time: string; status: Status; patient: string; type: string; addr: string; dist: string; rating?: number }[] = [
  { id: "v1", time: "07:30 AM", status: "Completed", patient: "Olivia P., age 4", type: "Vaccination · MMR", addr: "12 Pine Rd, Milton", dist: "Start", rating: 5.0 },
  { id: "v2", time: "09:00 AM", status: "Completed", patient: "Mason L., age 8", type: "Sick Visit — Strep test", addr: "44 Oak Ave, Milton", dist: "3.1 km · 10 min", rating: 4.8 },
  { id: "v3", time: "10:30 AM", status: "Completed", patient: "Ava K., age 2", type: "Well-child Checkup", addr: "9 Maple St, Milton", dist: "2.0 km · 7 min", rating: 5.0 },
  { id: "v4", time: "12:15 PM", status: "In Progress", patient: "Emma T., age 6", type: "Sick Visit — Fever & cough", addr: "123 Main St, Milton", dist: "2.4 km · 8 min" },
  { id: "v5", time: "02:30 PM", status: "Upcoming", patient: "Noah B., age 5", type: "Follow-up Visit", addr: "88 Cedar Ln, Milton", dist: "4.0 km · 12 min" },
  { id: "v6", time: "04:00 PM", status: "Upcoming", patient: "Mia R., age 1", type: "Vaccination · DTaP", addr: "21 Birch Blvd, Milton", dist: "3.7 km · 11 min" },
];

const tone: Record<Status, "good" | "info" | "neutral" | "bad"> = { Completed: "good", "In Progress": "info", Upcoming: "neutral", Cancelled: "bad" };

function SchedulePage() {
  const completed = VISITS.filter((v) => v.status === "Completed").length;
  const total = VISITS.length;
  const progress = Math.round((completed / total) * 100);
  const current = VISITS.find((v) => v.status === "In Progress");
  const nextUp = VISITS.find((v) => v.status === "Upcoming");

  return (
    <>
      <PageHeader
        title="Good afternoon, Dr. Chen"
        sub="Wednesday, Nov 13, 2025 · Milton region"
        action={
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-semibold text-secondary-ink">
              <Cloud className="h-3.5 w-3.5" /> 4°C · Light snow
            </span>
            <div className="flex items-center gap-1">
              <button className="h-9 w-9 rounded-lg border border-border hover:border-primary inline-flex items-center justify-center"><ChevronLeft className="h-4 w-4" /></button>
              <button className="h-9 w-9 rounded-lg border border-border hover:border-primary inline-flex items-center justify-center"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        }
      />

      {/* Day-at-a-glance hero */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-start gap-5 flex-wrap">
            {/* Progress ring */}
            <ProgressRing value={progress} />
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Day progress</p>
              <p className="font-display text-2xl font-extrabold">{completed} of {total} visits complete</p>
              <p className="text-sm text-secondary-ink mt-0.5">
                On pace · est. wrap-up by <span className="font-semibold text-foreground">4:45 PM</span>
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Stat label="Completed" value={String(completed)} tone="text-[oklch(0.45_0.18_150)]" />
                <Stat label="Remaining" value={String(total - completed - (current ? 1 : 0))} tone="text-primary" />
                <Stat label="Travel" value="~45 min" tone="text-secondary-ink" />
                <Stat label="Avg / visit" value="34 min" tone="text-secondary-ink" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Earnings today</p>
          <p className="mt-1 font-display text-3xl font-extrabold tabular-nums text-foreground">$842.50</p>
          <p className="text-xs text-secondary-ink">$2,140 weekly · target $2,400</p>
          <div className="mt-3 h-2 rounded-full bg-background overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-health" style={{ width: "89%" }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-background border border-border py-2">
              <p className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Rating</p>
              <p className="font-display font-extrabold text-lg inline-flex items-center gap-1">
                4.96 <Star className="h-3.5 w-3.5 fill-current" style={{ color: "#F5A623" }} />
              </p>
            </div>
            <div className="rounded-lg bg-background border border-border py-2">
              <p className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Streak</p>
              <p className="font-display font-extrabold text-lg inline-flex items-center gap-1">
                12d <Zap className="h-3.5 w-3.5 text-[oklch(0.55_0.16_75)]" />
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current + next */}
      {current && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-primary/30 shadow-lift">
          <div className="bg-gradient-to-br from-primary to-[oklch(0.42_0.14_245)] text-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 rounded-full bg-white opacity-70 animate-ping" /><span className="relative h-1.5 w-1.5 rounded-full bg-white" /></span>
                  Active visit
                </span>
                <h2 className="mt-2 text-white text-xl sm:text-2xl">{current.patient}</h2>
                <p className="text-white/85 text-sm">{current.type}</p>
                <p className="text-xs text-white/70 mt-1 inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{current.addr}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Started</p>
                <p className="font-display text-2xl font-extrabold tabular-nums">{current.time}</p>
                <p className="text-xs text-white/70">~18 min elapsed</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/np/document/$visitId" params={{ visitId: current.id }} className="inline-flex items-center gap-1.5 rounded-full bg-white text-primary px-4 py-2 text-sm font-bold hover:bg-white/90">
                <FileEdit className="h-4 w-4" /> Continue Documentation
              </Link>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                <MessageSquare className="h-4 w-4" /> Message Parent
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                <CheckCircle2 className="h-4 w-4" /> Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {nextUp && (
        <Card className="mb-6 border-l-4 border-l-warm">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-warm/15 text-warm">
              <Navigation className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Up next · {nextUp.time}</p>
              <p className="font-display font-bold">{nextUp.patient}</p>
              <p className="text-xs text-secondary-ink">{nextUp.type} · {nextUp.addr} · {nextUp.dist}</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold"><Navigation className="h-3.5 w-3.5" /> Navigate</button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border hover:border-primary px-3 py-2 text-xs font-semibold"><Phone className="h-3.5 w-3.5" /> Call</button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-lg">Today's timeline</h2>
        <Link to="/np/route" className="text-sm font-semibold text-primary inline-flex items-center gap-1">
          Open route map <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative space-y-3">
        <div className="absolute left-[42px] top-2 bottom-2 w-px bg-border hidden sm:block" />
        {VISITS.map((v) => (
          <div key={v.id} className="flex gap-3 sm:gap-5 items-start">
            <div className="hidden sm:flex flex-col items-center w-[78px] flex-shrink-0">
              <p className="text-xs font-bold text-secondary-ink">{v.time}</p>
              <span className={`mt-2 h-3 w-3 rounded-full ring-4 ring-background ${
                v.status === "Completed" ? "bg-success" : v.status === "In Progress" ? "bg-primary animate-pulse" : "bg-border"
              }`} />
            </div>
            <Card className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="sm:hidden text-xs font-bold text-secondary-ink mb-1">{v.time}</p>
                  <p className="font-display font-bold">{v.patient}</p>
                  <p className="text-sm text-secondary-ink">{v.type}</p>
                  <p className="text-xs text-secondary-ink mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{v.addr} · {v.dist}</p>
                </div>
                <Badge tone={tone[v.status]}>{v.status}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {v.status === "Upcoming" && <>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Navigation className="h-3.5 w-3.5" /> Start Navigation</button>
                  <button className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary">View Patient</button>
                  <button className="rounded-lg border border-primary text-primary px-3 py-2 text-xs font-semibold">On My Way</button>
                </>}
                {v.status === "In Progress" && <>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-warm px-3 py-2 text-xs font-semibold text-warm-foreground"><CheckCircle2 className="h-3.5 w-3.5" /> I've Arrived</button>
                  <Link to="/np/document/$visitId" params={{ visitId: v.id }} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><FileEdit className="h-3.5 w-3.5" /> Begin Documentation</Link>
                </>}
                {v.status === "Completed" && <>
                  <Link to="/np/document/$visitId" params={{ visitId: v.id }} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary">View Notes</Link>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-warning/15 text-[oklch(0.5_0.16_75)] px-3 py-2 text-xs font-bold"><Star className="h-3.5 w-3.5 fill-current" /> {v.rating}</span>
                </>}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-success/15 text-[oklch(0.45_0.18_150)]">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display font-bold">You're 89% to today's earnings target</p>
            <p className="text-xs text-secondary-ink">Complete 2 more visits to unlock weekend bonus</p>
          </div>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">
          <Play className="h-4 w-4" /> End Day
        </button>
      </div>
    </>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-[110px] w-[110px] flex-shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} stroke="oklch(0.91 0.025 240)" strokeWidth="9" fill="none" />
        <circle
          cx="50" cy="50" r={r}
          stroke="url(#ring)" strokeWidth="9" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B6CA8" />
            <stop offset="100%" stopColor="#2ECC8B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-display text-2xl font-extrabold tabular-nums">{value}%</p>
        <p className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Done</p>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">{label}</p>
      <p className={`mt-1 font-display text-2xl font-extrabold ${tone}`}>{value}</p>
    </div>
  );
}