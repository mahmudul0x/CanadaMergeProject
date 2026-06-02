import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  MapPin,
  RefreshCw,
  Sparkles,
  Star,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, PageHeader, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

/* ── Data ── */
const REVENUE = [
  { d: "Oct 14", r: 1240, c: 680 }, { d: "Oct 17", r: 1480, c: 790 },
  { d: "Oct 20", r: 1620, c: 860 }, { d: "Oct 23", r: 1390, c: 730 },
  { d: "Oct 26", r: 1720, c: 910 }, { d: "Oct 29", r: 1880, c: 980 },
  { d: "Nov 1",  r: 1640, c: 870 }, { d: "Nov 4",  r: 2010, c: 1050 },
  { d: "Nov 7",  r: 2240, c: 1150 }, { d: "Nov 10", r: 2050, c: 1060 },
  { d: "Nov 13", r: 2420, c: 1220 },
];

const CITIES = [
  { name: "Milton",      bookings: 38, util: 84 },
  { name: "Oakville",    bookings: 31, util: 79 },
  { name: "Hamilton",    bookings: 27, util: 71 },
  { name: "Mississauga", bookings: 22, util: 76 },
  { name: "Burlington",  bookings: 14, util: 62 },
  { name: "Brampton",    bookings: 10, util: 58 },
];

const VISIT_MIX = [
  { name: "Sick visits",  value: 58, color: "#1B6CA8" },
  { name: "Vaccinations", value: 24, color: "#2ECC8B" },
  { name: "Well-child",   value: 12, color: "#F5A623" },
  { name: "Follow-ups",   value:  6, color: "#9B72CF" },
];

const LIVE_VISITS = [
  { np: "A. Chen",    patient: "Emma T., 6",   city: "Milton",      status: "In Progress", eta: "Now",    initials: "AC" },
  { np: "J. Park",    patient: "Noah B., 5",   city: "Oakville",    status: "En Route",    eta: "12 min", initials: "JP" },
  { np: "S. Rivera",  patient: "Mia R., 1",    city: "Hamilton",    status: "En Route",    eta: "24 min", initials: "SR" },
  { np: "L. Brown",   patient: "Aiden K., 4",  city: "Mississauga", status: "Scheduled",   eta: "1:30 PM",initials: "LB" },
];

const RECENT = [
  { time: "12:48", parent: "Sarah Thompson", child: "Emma (6)",  type: "Sick Visit",  city: "Milton",      price: "$224.87", status: "Confirmed" },
  { time: "12:31", parent: "David Patel",    child: "Aarav (3)", type: "Vaccination", city: "Oakville",    price: "$118.65", status: "Confirmed" },
  { time: "12:14", parent: "Mei Lin",        child: "Sophie (8)",type: "Follow-up",   city: "Hamilton",    price: "$96.05",  status: "Pending"   },
  { time: "11:52", parent: "Jordan Reed",    child: "Theo (2)",  type: "Sick Visit",  city: "Burlington",  price: "$237.30", status: "Confirmed" },
  { time: "11:36", parent: "Priya Shah",     child: "Anika (5)", type: "Well-child",  city: "Brampton",    price: "$169.49", status: "Cancelled" },
];

const ALERTS = [
  { tone: "bad"  as const, title: "Hamilton route over capacity", sub: "Suggest reassigning 3 visits to NP J. Park" },
  { tone: "warn" as const, title: "2 NP timesheets pending approval", sub: "Due by 5:00 PM today" },
  { tone: "info" as const, title: "New 5★ review · Mississauga", sub: "\"Punctual, gentle, professional.\" — D. Patel" },
  { tone: "good" as const, title: "Daily revenue target met", sub: "$2,420 of $2,200 (110%)" },
];

const KPI = [
  { label: "Revenue (MTD)", value: "$48,210", delta: "+18.4% vs last month", up: true,  icon: DollarSign,  tone: "good" as const },
  { label: "Active Bookings", value: "142",   delta: "+12 today",             up: true,  icon: CalendarDays,tone: "neutral" as const },
  { label: "NP Utilization",  value: "78%",   delta: "Target 80% — 2% gap",  up: false, icon: Stethoscope, tone: "warn" as const },
  { label: "Patient NPS",     value: "74",    delta: "+6 vs last month",      up: true,  icon: Star,        tone: "good" as const },
];

/* ── Component ── */
function AdminDashboard() {
  const [chartTab, setChartTab] = useState<"revenue" | "visits">("revenue");
  const now = new Date().toLocaleString("en-CA", {
    weekday: "long", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Overview · Live"
        title="Command Center"
        sub={`${now} · 7 Ontario cities · 24 NPs on shift`}
        action={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-[oklch(0.96_0.02_240)] shadow-sm transition-colors">
              <Download className="h-4 w-4" /> Export
            </button>
            <Link
              to="/admin/insights"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_oklch(0.52_0.13_245/0.35)] hover:bg-[oklch(0.46_0.13_245)] transition-colors"
            >
              <Sparkles className="h-4 w-4" /> AI Insights <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {KPI.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* Revenue / cost chart */}
        <Card className="xl:col-span-2 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <div>
              <h2 className="text-base font-bold text-foreground">Revenue vs Cost</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Last 30 days</p>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-[oklch(0.965_0.018_240)] p-1 border border-[oklch(0.91_0.025_240)]">
              {(["revenue", "visits"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    chartTab === t
                      ? "bg-white text-foreground shadow-sm"
                      : "text-[oklch(0.55_0.04_250)] hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 mt-3 mb-1">
            <ChartLegend color="#1B6CA8" label="Revenue" />
            <ChartLegend color="#2ECC8B" label="Cost" />
          </div>
          <div className="h-[240px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE} margin={{ top: 5, right: 12, left: -12, bottom: 4 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B6CA8" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#1B6CA8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ECC8B" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#2ECC8B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.025 240)" vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} width={44} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid oklch(0.91 0.025 240)", borderRadius: 12, fontSize: 12, color: "oklch(0.18 0.04 250)", boxShadow: "0 8px 24px rgba(27,108,168,0.12)" }}
                  formatter={(v: number, name: string) => [`$${v.toLocaleString()}`, name === "r" ? "Revenue" : "Cost"]}
                />
                <Area type="monotone" dataKey="r" stroke="#1B6CA8" strokeWidth={2.5} fill="url(#gRev)" dot={false} />
                <Area type="monotone" dataKey="c" stroke="#2ECC8B" strokeWidth={2} fill="url(#gCost)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Visit mix donut */}
        <Card className="!p-0 overflow-hidden">
          <div className="px-6 pt-5 pb-0">
            <h2 className="text-base font-bold text-foreground">Visit Mix</h2>
            <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">This month</p>
          </div>
          <div className="h-[180px] mt-2 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={VISIT_MIX} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} strokeWidth={0}>
                  {VISIT_MIX.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid oklch(0.91 0.025 240)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px rgba(27,108,168,0.12)" }}
                  formatter={(v: number, name: string) => [`${v}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="px-6 pb-5 space-y-2">
            {VISIT_MIX.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[oklch(0.38_0.04_250)]">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  {s.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-[oklch(0.94_0.018_240)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                  <span className="text-xs font-bold tabular-nums text-foreground w-8 text-right">{s.value}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* City demand + Live ops */}
      <div className="grid gap-4 xl:grid-cols-5">
        {/* City bar chart */}
        <Card className="xl:col-span-3 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <div>
              <h2 className="text-base font-bold text-foreground">Demand by City</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Bookings this week · 142 total</p>
            </div>
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">
              <RefreshCw className="h-3 w-3" /> Refresh
            </button>
          </div>
          <div className="h-[200px] mt-3 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CITIES} margin={{ top: 4, right: 12, left: -12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.94 0.018 240)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} width={24} />
                <Tooltip
                  cursor={{ fill: "oklch(0.965 0.018 240)" }}
                  contentStyle={{ background: "#fff", border: "1px solid oklch(0.91 0.025 240)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px rgba(27,108,168,0.12)" }}
                />
                <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
                  {CITIES.map((c, i) => (
                    <Cell key={i} fill={c.util >= 75 ? "#1B6CA8" : c.util >= 65 ? "#5BA8E8" : "oklch(0.88 0.03 240)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 pb-5 mt-3 grid grid-cols-3 gap-2">
            {CITIES.map((c) => (
              <div key={c.name} className="rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.6_0.04_250)]">{c.name}</p>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="text-lg font-display font-extrabold text-foreground tabular-nums">{c.bookings}</p>
                  <p className={`text-[11px] font-bold ${c.util >= 75 ? "text-[oklch(0.42_0.18_150)]" : "text-[oklch(0.55_0.16_75)]"}`}>{c.util}%</p>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-[oklch(0.91_0.025_240)] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.util}%`, background: c.util >= 75 ? "#2ECC8B" : "#F5A623" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live visits */}
        <Card className="xl:col-span-2 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[oklch(0.91_0.025_240)]">
            <div>
              <h2 className="text-base font-bold text-foreground">Live Operations</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Visits in motion right now</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.72_0.18_150)]/10 px-2.5 py-1 text-[11px] font-bold text-[oklch(0.35_0.18_150)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[oklch(0.55_0.18_150)] animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-[oklch(0.55_0.18_150)]" />
              </span>
              LIVE
            </span>
          </div>
          <ul className="divide-y divide-[oklch(0.94_0.018_240)]">
            {LIVE_VISITS.map((v, i) => (
              <li key={i} className="flex items-center gap-3.5 px-6 py-3.5 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold
                  ${v.status === "In Progress" ? "bg-[oklch(0.72_0.18_150)]/15 text-[oklch(0.35_0.18_150)]"
                  : v.status === "En Route"    ? "bg-primary/10 text-primary"
                  : "bg-[oklch(0.93_0.02_240)] text-[oklch(0.45_0.05_250)]"}`}>
                  {v.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{v.patient}</p>
                  <p className="text-[11px] text-[oklch(0.55_0.04_250)] truncate flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> NP {v.np} · {v.city}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <Badge tone={v.status === "In Progress" ? "good" : v.status === "En Route" ? "info" : "neutral"} dot>
                    {v.status}
                  </Badge>
                  <p className="text-xs font-bold tabular-nums text-foreground mt-1">{v.eta}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 py-3.5 border-t border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[oklch(0.55_0.04_250)]">4 of 24 NPs active</span>
              <button className="font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">View route map →</button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent bookings + Alerts */}
      <div className="grid gap-4 xl:grid-cols-5">
        {/* Bookings table */}
        <Card className="xl:col-span-3 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
            <div>
              <h2 className="text-base font-bold text-foreground">Recent Bookings</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Last 5 transactions</p>
            </div>
            <Link to="/admin/appointments" className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)] inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.91_0.025_240)]">
                  {["Time", "Patient", "Type", "City", "Amount", "Status"].map((h, i) => (
                    <th key={h} className={`py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.55_0.04_250)] whitespace-nowrap ${i >= 4 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r, i) => (
                  <tr key={i} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                    <td className="py-3.5 px-4 text-xs font-mono text-[oklch(0.55_0.04_250)] tabular-nums">{r.time}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-foreground">{r.parent}</p>
                      <p className="text-[11px] text-[oklch(0.55_0.04_250)]">{r.child}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[oklch(0.42_0.05_250)]">{r.type}</td>
                    <td className="py-3.5 px-4 text-[oklch(0.5_0.04_250)]">{r.city}</td>
                    <td className="py-3.5 px-4 text-right font-bold tabular-nums text-foreground">{r.price}</td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusPill status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="xl:col-span-2 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
            <div>
              <h2 className="text-base font-bold text-foreground">Operations Alerts</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">Needs attention</p>
            </div>
            <Bell className="h-4 w-4 text-[oklch(0.6_0.04_250)]" />
          </div>
          <ul className="divide-y divide-[oklch(0.94_0.018_240)]">
            {ALERTS.map((a, i) => <AlertRow key={i} {...a} />)}
          </ul>
          <div className="px-6 py-3.5 border-t border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)]">
            <Link to="/admin/insights" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">
              Open AI Insights <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function KpiCard({ label, value, delta, up, icon: Icon, tone }: {
  label: string; value: string; delta: string; up: boolean;
  icon: typeof Clock; tone: "good" | "warn" | "neutral";
}) {
  const iconBg = tone === "good" ? "bg-[oklch(0.72_0.18_150)]/10 text-[oklch(0.4_0.18_150)]"
    : tone === "warn" ? "bg-[oklch(0.78_0.16_75)]/12 text-[oklch(0.5_0.16_75)]"
    : "bg-primary/10 text-primary";
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.55_0.04_250)]">{label}</p>
        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-[2rem] font-extrabold tabular-nums leading-none text-foreground">{value}</p>
      <p className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${up ? "text-[oklch(0.42_0.18_150)]" : "text-[oklch(0.5_0.16_75)]"}`}>
        {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        {delta}
      </p>
    </Card>
  );
}

function ChartLegend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[oklch(0.5_0.04_250)]">
      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon?: React.ReactNode }> = {
    Confirmed: { cls: "bg-[oklch(0.72_0.18_150)]/12 text-[oklch(0.35_0.18_150)]", icon: <CheckCircle2 className="h-3 w-3" /> },
    Pending:   { cls: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.46_0.16_75)]" },
    Cancelled: { cls: "bg-red-500/10 text-red-700" },
  };
  const s = map[status] ?? { cls: "bg-[oklch(0.93_0.02_240)] text-[oklch(0.45_0.05_250)]" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
      {s.icon} {status}
    </span>
  );
}

function AlertRow({ tone, title, sub }: { tone: "bad" | "warn" | "info" | "good"; title: string; sub: string }) {
  const cfg = {
    bad:  { dot: "bg-red-500",                        icon: TrendingDown, iconCls: "text-red-400" },
    warn: { dot: "bg-[oklch(0.65_0.18_75)]",          icon: Clock,        iconCls: "text-[oklch(0.55_0.16_75)]" },
    info: { dot: "bg-primary",                        icon: Users,        iconCls: "text-primary" },
    good: { dot: "bg-[oklch(0.55_0.18_150)]",         icon: TrendingUp,   iconCls: "text-[oklch(0.42_0.18_150)]" },
  } as const;
  const c = cfg[tone];
  return (
    <li className="flex items-start gap-3.5 px-6 py-3.5 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
      <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${c.dot}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">{sub}</p>
      </div>
      <c.icon className={`h-4 w-4 shrink-0 mt-0.5 ${c.iconCls}`} />
    </li>
  );
}
