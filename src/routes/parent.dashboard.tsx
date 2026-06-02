// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplet,
  FileText,
  HeartPulse,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Plus,
  Stethoscope,
  Syringe,
  Thermometer,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar, Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/dashboard")({ component: ParentDashboard });

type Child = {
  id: string;
  name: string;
  age: number;
  dob: string;
  allergies: number;
  meds: number;
  visits: number;
  weightKg: number;
  heightCm: number;
  bmi: number;
  growth: { m: string; w: number }[];
};

const CHILDREN: Child[] = [
  {
    id: "emma",
    name: "Emma Thompson",
    age: 6,
    dob: "Mar 14, 2019",
    allergies: 2,
    meds: 1,
    visits: 8,
    weightKg: 22.4,
    heightCm: 118,
    bmi: 16.1,
    growth: [
      { m: "Jun", w: 20.1 }, { m: "Jul", w: 20.4 }, { m: "Aug", w: 20.9 },
      { m: "Sep", w: 21.3 }, { m: "Oct", w: 21.8 }, { m: "Nov", w: 22.4 },
    ],
  },
  {
    id: "liam",
    name: "Liam Thompson",
    age: 3,
    dob: "Aug 22, 2022",
    allergies: 0,
    meds: 0,
    visits: 4,
    weightKg: 14.2,
    heightCm: 94,
    bmi: 16.0,
    growth: [
      { m: "Jun", w: 13.1 }, { m: "Jul", w: 13.4 }, { m: "Aug", w: 13.6 },
      { m: "Sep", w: 13.8 }, { m: "Oct", w: 14.0 }, { m: "Nov", w: 14.2 },
    ],
  },
];

const ACTIVITY = [
  { icon: CheckCircle2, tone: "good", title: "Visit completed", sub: "Sick visit · Dr. Amelia Chen, NP", time: "Nov 12 · 4:20 PM" },
  { icon: Syringe, tone: "info", title: "Vaccination administered", sub: "Hep A · 1st dose", time: "Oct 28 · 11:05 AM" },
  { icon: FileText, tone: "neutral", title: "Lab results uploaded", sub: "Strep culture · Negative", time: "Oct 22 · 9:40 AM" },
  { icon: MessageSquare, tone: "info", title: "Message from clinic", sub: "Follow-up instructions sent", time: "Oct 18 · 2:11 PM" },
] as const;

function ParentDashboard() {
  const [active, setActive] = useState(CHILDREN[0].id);
  const child = CHILDREN.find((c) => c.id === active)!;

  return (
    <>
      <PageHeader
        title="Good morning, Sarah"
        sub="Wednesday, November 13 · Here's a snapshot of your family's care."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/symptom-checker"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              <Stethoscope className="h-4 w-4" /> Symptom Checker
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Book Visit
            </Link>
          </div>
        }
      />

      {/* Hero next-visit panel */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-border shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-6 sm:p-7 bg-gradient-to-br from-[oklch(0.52_0.13_245)] to-[oklch(0.42_0.14_245)] text-white relative">
            <span aria-hidden className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="flex items-start justify-between gap-4 relative">
              <div>
                <Badge tone="good"><Activity className="h-3 w-3" /> Confirmed</Badge>
                <h2 className="mt-3 text-white text-2xl sm:text-3xl">Emma's sick visit · Tomorrow, 10:00 AM</h2>
                <p className="mt-1 text-white/85 text-sm">123 Main St, Milton ON · arrives in a ~15-min window</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
              <HeroStat icon={Clock} label="ETA window" value="9:55–10:10" />
              <HeroStat icon={MapPin} label="Distance" value="2.4 km" />
              <HeroStat icon={HeartPulse} label="Provider" value="A. Chen, NP" />
              <HeroStat icon={Stethoscope} label="Visit type" value="Sick visit" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2 relative">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#0D1B2A] px-4 py-2 text-sm font-semibold hover:bg-white/90">
                <MapPin className="h-4 w-4" /> Track arrival
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 text-white px-4 py-2 text-sm font-semibold hover:bg-white/15">
                <Video className="h-4 w-4" /> Join virtual pre-visit
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 text-white px-4 py-2 text-sm font-semibold hover:bg-white/15">
                Reschedule
              </button>
            </div>
          </div>
          <div className="p-6 sm:p-7 bg-surface flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Your Care Team</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name="Amelia Chen" size={48} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">Dr. Amelia Chen, NP</p>
                  <p className="text-xs text-secondary-ink">RN(EC), MN · 4.9★ · 312 visits</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
                  <MessageSquare className="h-3.5 w-3.5" /> Message
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
                  <Phone className="h-3.5 w-3.5" /> Call
                </button>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-warning/10 border border-warning/30 p-3 text-xs flex gap-2 items-start">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-[oklch(0.55_0.16_75)] mt-0.5" />
              <p>
                <span className="font-semibold">2 vaccinations</span> are due for your children this month.
                <Link to="/parent/vaccinations" className="text-primary font-semibold ml-1">Review</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <KpiTile label="Next visit" value="Tomorrow" sub="10:00 AM · Milton" icon={Calendar} tone="primary" />
        <KpiTile label="Vaccinations due" value="2" sub="Within 30 days" icon={Syringe} tone="warn" />
        <KpiTile label="Active prescriptions" value="1" sub="1 refill available" icon={Pill} tone="info" />
        <KpiTile label="Lifetime visits" value="12" sub="Across 2 children" icon={Users} tone="good" />
      </div>

      {/* Children switcher */}
      <div className="mb-5 flex items-center gap-2 overflow-x-auto">
        {CHILDREN.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-3 rounded-full px-3 py-2 border transition-all ${
                isActive ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-surface border-border hover:border-primary"
              }`}
            >
              <Avatar name={c.name} size={28} tone={isActive ? "health" : "primary"} />
              <span className="text-sm font-semibold">{c.name.split(" ")[0]}</span>
              <span className={`text-xs ${isActive ? "text-white/80" : "text-secondary-ink"}`}>age {c.age}</span>
            </button>
          );
        })}
        <Link
          to="/parent/children"
          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-2 text-xs font-semibold text-secondary-ink hover:border-primary hover:text-primary"
        >
          <Plus className="h-3.5 w-3.5" /> Add child
        </Link>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health summary */}
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <Avatar name={child.name} size={56} tone="health" />
              <div>
                <h3 className="text-lg">{child.name}</h3>
                <p className="text-xs text-secondary-ink">DOB {child.dob} · Age {child.age}</p>
              </div>
            </div>
            <Link to="/parent/children" className="text-sm font-semibold text-primary inline-flex items-center gap-1">
              Full profile <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Vital icon={Activity} label="Weight" value={`${child.weightKg} kg`} trend="+0.6" />
            <Vital icon={TrendingUp} label="Height" value={`${child.heightCm} cm`} trend="+1.2" />
            <Vital icon={Droplet} label="BMI" value={child.bmi.toFixed(1)} trend="50th %" />
            <Vital icon={Thermometer} label="Last temp" value="36.8°C" trend="Normal" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Growth — last 6 months</p>
              <span className="text-xs text-secondary-ink">Weight (kg)</span>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={child.growth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B6CA8" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#1B6CA8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EDF5" vertical={false} />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#4A6580" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#4A6580" }} width={32} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #D6E4F0", fontSize: 12 }}
                    formatter={(v: number) => [`${v} kg`, "Weight"]}
                  />
                  <Area type="monotone" dataKey="w" stroke="#1B6CA8" strokeWidth={2.5} fill="url(#growth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Quick actions + alerts */}
        <div className="space-y-6">
          <Card>
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Quick actions</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <QuickAction icon={Plus} label="Book visit" to="/book" />
              <QuickAction icon={Stethoscope} label="AI triage" to="/symptom-checker" />
              <QuickAction icon={FileText} label="Documents" to="/parent/documents" />
              <QuickAction icon={Syringe} label="Vaccines" to="/parent/vaccinations" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Open alerts</p>
              <Badge tone="warn">2 pending</Badge>
            </div>
            <ul className="mt-3 space-y-2.5">
              <AlertRow tone="warn" title="MMR booster overdue" sub="Emma · was due Oct 30" />
              <AlertRow tone="info" title="Refill request approved" sub="Amoxicillin · pickup at home" />
              <AlertRow tone="good" title="Lab results ready" sub="Strep culture · Negative" />
            </ul>
          </Card>
        </div>
      </div>

      {/* Bottom row: vaccinations + activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg">Upcoming vaccinations</h3>
              <p className="text-xs text-secondary-ink">Next 60 days · publicly funded in Ontario</p>
            </div>
            <Link to="/parent/vaccinations" className="text-sm font-semibold text-primary">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {[
              { name: "MMR Booster", who: "Emma (6)", age: "Age 4–6", due: "Nov 30, 2025", overdue: true },
              { name: "DTaP Booster", who: "Emma (6)", age: "Age 4–6", due: "Dec 15, 2025", overdue: false },
              { name: "Influenza (annual)", who: "Liam (3)", age: "Annual", due: "Dec 22, 2025", overdue: false },
            ].map((v) => (
              <li key={v.name} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${v.overdue ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-[oklch(0.55_0.16_75)]"}`}>
                  <Syringe className="h-5 w-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{v.name}</p>
                    {v.overdue && <Badge tone="bad">Overdue</Badge>}
                  </div>
                  <p className="text-xs text-secondary-ink">{v.who} · {v.age} · Due {v.due}</p>
                </div>
                <Link to="/book" className="rounded-full border border-border hover:border-primary hover:text-primary px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1">
                  Book <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Recent activity</h3>
            <Link to="/parent/documents" className="text-sm font-semibold text-primary">All records</Link>
          </div>
          <ol className="relative ml-2">
            <span aria-hidden className="absolute left-[14px] top-0 bottom-0 w-px bg-border" />
            {ACTIVITY.map((a, i) => (
              <li key={i} className="relative pl-9 pb-4 last:pb-0">
                <span className={`absolute left-0 top-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-surface ${toneBg(a.tone)}`}>
                  <a.icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-xs text-secondary-ink">{a.sub}</p>
                <p className="text-[11px] text-secondary-ink/70 mt-0.5">{a.time}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}

/* ───────────────────── Helpers ───────────────────── */

function HeroStat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/70 font-semibold">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-0.5 font-display text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function KpiTile({
  label, value, sub, icon: Icon, tone,
}: {
  label: string; value: string; sub: string; icon: typeof Clock;
  tone: "primary" | "good" | "warn" | "info";
}) {
  const map = {
    primary: "bg-primary/10 text-primary",
    good: "bg-success/10 text-[oklch(0.45_0.18_150)]",
    warn: "bg-warning/15 text-[oklch(0.55_0.16_75)]",
    info: "bg-[oklch(0.94_0.05_240)] text-primary",
  } as const;
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">{label}</p>
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${map[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl sm:text-3xl font-extrabold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-secondary-ink">{sub}</p>
    </Card>
  );
}

function Vital({ icon: Icon, label, value, trend }: { icon: typeof Clock; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-secondary-ink font-semibold">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1 font-display text-lg font-extrabold">{value}</p>
      <p className="text-[11px] text-secondary-ink">{trend}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, label, to }: { icon: typeof Clock; label: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-3 hover:border-primary hover:bg-primary/5 transition-colors"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}

function AlertRow({ tone, title, sub }: { tone: "warn" | "info" | "good"; title: string; sub: string }) {
  const dot = tone === "warn" ? "bg-warning" : tone === "good" ? "bg-success" : "bg-primary";
  return (
    <li className="flex items-start gap-3 rounded-lg border border-border bg-background p-2.5">
      <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${dot}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-secondary-ink">{sub}</p>
      </div>
    </li>
  );
}

function toneBg(tone: string) {
  if (tone === "good") return "bg-success/15 text-[oklch(0.45_0.18_150)]";
  if (tone === "info") return "bg-primary/10 text-primary";
  if (tone === "warn") return "bg-warning/15 text-[oklch(0.55_0.16_75)]";
  return "bg-muted text-secondary-ink";
}