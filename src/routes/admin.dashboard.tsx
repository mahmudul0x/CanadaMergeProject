import { createFileRoute, Link } from "@tanstack/react-router";
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
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
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

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

const REVENUE = [
  { d: "Oct 14", r: 1240, v: 9 }, { d: "Oct 17", r: 1480, v: 11 }, { d: "Oct 20", r: 1620, v: 12 },
  { d: "Oct 23", r: 1390, v: 10 }, { d: "Oct 26", r: 1720, v: 13 }, { d: "Oct 29", r: 1880, v: 14 },
  { d: "Nov 1", r: 1640, v: 12 }, { d: "Nov 4", r: 2010, v: 15 }, { d: "Nov 7", r: 2240, v: 17 },
  { d: "Nov 10", r: 2050, v: 15 }, { d: "Nov 13", r: 2420, v: 18 },
];

const CITIES = [
  { name: "Milton", bookings: 38, util: 84 },
  { name: "Oakville", bookings: 31, util: 79 },
  { name: "Hamilton", bookings: 27, util: 71 },
  { name: "Mississauga", bookings: 22, util: 76 },
  { name: "Burlington", bookings: 14, util: 62 },
  { name: "Brampton", bookings: 10, util: 58 },
];

const VISIT_MIX = [
  { name: "Sick visits", value: 58, color: "#1B6CA8" },
  { name: "Vaccinations", value: 24, color: "#2ECC8B" },
  { name: "Well-child", value: 12, color: "#F5A623" },
  { name: "Follow-ups", value: 6, color: "#9B72CF" },
];

const LIVE_VISITS = [
  { np: "A. Chen", patient: "Emma T., 6", city: "Milton", status: "In Progress", eta: "Now" },
  { np: "J. Park", patient: "Noah B., 5", city: "Oakville", status: "En Route", eta: "12 min" },
  { np: "S. Rivera", patient: "Mia R., 1", city: "Hamilton", status: "En Route", eta: "24 min" },
  { np: "L. Brown", patient: "Aiden K., 4", city: "Mississauga", status: "Scheduled", eta: "1:30 PM" },
];

const RECENT = [
  { time: "12:48 PM", parent: "Sarah Thompson", child: "Emma (6)", type: "Sick Visit", city: "Milton", price: "$224.87", status: "Confirmed" },
  { time: "12:31 PM", parent: "David Patel", child: "Aarav (3)", type: "Vaccination", city: "Oakville", price: "$118.65", status: "Confirmed" },
  { time: "12:14 PM", parent: "Mei Lin", child: "Sophie (8)", type: "Follow-up", city: "Hamilton", price: "$96.05", status: "Pending" },
  { time: "11:52 AM", parent: "Jordan Reed", child: "Theo (2)", type: "Sick Visit", city: "Burlington", price: "$237.30", status: "Confirmed" },
  { time: "11:36 AM", parent: "Priya Shah", child: "Anika (5)", type: "Well-child", city: "Brampton", price: "$169.49", status: "Cancelled" },
];

function AdminDashboard() {
  return (
    <div className="-m-5 sm:-m-8 p-5 sm:p-8 min-h-[calc(100dvh-4rem)] bg-[oklch(0.16_0.04_245)] text-white space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-white/50">Operations · Live</p>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Command Center</h1>
          <p className="text-sm text-white/60">Wednesday, Nov 13 · across 7 Ontario cities · 24 NPs on shift</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/15">
            <Download className="h-4 w-4" /> Export
          </button>
          <Link
            to="/admin/insights"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" /> AI Insights <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Kpi label="Revenue (MTD)" value="$48,210" delta="+18.4%" up icon={DollarSign} />
        <Kpi label="Active bookings" value="142" delta="+12 today" up icon={CalendarDays} />
        <Kpi label="NP utilization" value="78%" delta="Target 80%" up={false} icon={Stethoscope} />
        <Kpi label="Patient NPS" value="74" delta="+6 vs last mo." up icon={Star} />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <DarkCard className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Revenue & Visits</p>
              <p className="text-lg font-display font-bold text-white">Last 30 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Legend color="#2ECC8B" label="Revenue" />
              <Legend color="#5BA8E8" label="Visits" />
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE} margin={{ top: 5, right: 10, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ECC8B" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2ECC8B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="vis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5BA8E8" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#5BA8E8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.55)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.55)" }} width={40} />
                <Tooltip
                  contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="r" stroke="#2ECC8B" strokeWidth={2.5} fill="url(#rev)" name="Revenue ($)" />
                <Area type="monotone" dataKey="v" stroke="#5BA8E8" strokeWidth={2} fill="url(#vis)" name="Visits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DarkCard>

        <DarkCard>
          <p className="text-xs font-bold uppercase tracking-wider text-white/50">Visit mix</p>
          <p className="text-lg font-display font-bold text-white">This month</p>
          <div className="h-[180px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={VISIT_MIX} dataKey="value" nameKey="name" innerRadius={48} outerRadius={75} paddingAngle={3}>
                  {VISIT_MIX.map((s, i) => (
                    <Cell key={i} fill={s.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5">
            {VISIT_MIX.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-xs text-white/80">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <span className="font-bold tabular-nums">{s.value}%</span>
              </li>
            ))}
          </ul>
        </DarkCard>
      </div>

      {/* City performance + live ops */}
      <div className="grid gap-4 lg:grid-cols-5">
        <DarkCard className="lg:col-span-3">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">By city · bookings this week</p>
              <p className="text-lg font-display font-bold text-white">Demand snapshot</p>
            </div>
            <span className="text-xs text-white/50">142 total</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CITIES} margin={{ top: 5, right: 10, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.55)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.55)" }} width={28} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.06)" }}
                  contentStyle={{ background: "#0D1B2A", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                />
                <Bar dataKey="bookings" fill="#1B6CA8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CITIES.slice(0, 6).map((c) => (
              <div key={c.name} className="rounded-lg bg-white/5 border border-white/10 p-2.5">
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">{c.name}</p>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="font-display font-bold text-white">{c.bookings}</p>
                  <p className={`text-xs font-semibold ${c.util >= 75 ? "text-[#2ECC8B]" : "text-[#F5A623]"}`}>{c.util}% util</p>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.util}%`, background: c.util >= 75 ? "#2ECC8B" : "#F5A623" }} />
                </div>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Live operations</p>
              <p className="text-lg font-display font-bold text-white">Visits in motion</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2ECC8B]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#2ECC8B] opacity-70 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-[#2ECC8B]" />
              </span>
              LIVE
            </span>
          </div>
          <ul className="space-y-2">
            {LIVE_VISITS.map((v, i) => (
              <li key={i} className="rounded-lg bg-white/5 border border-white/10 p-3 flex items-center gap-3">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                  v.status === "In Progress" ? "bg-[#2ECC8B]/20 text-[#2ECC8B]" :
                  v.status === "En Route" ? "bg-[#5BA8E8]/20 text-[#5BA8E8]" : "bg-white/10 text-white/70"
                }`}>
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{v.patient}</p>
                  <p className="text-[11px] text-white/55 truncate">NP {v.np} · {v.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-white/50">{v.status}</p>
                  <p className="text-xs font-bold text-white tabular-nums">{v.eta}</p>
                </div>
              </li>
            ))}
          </ul>
        </DarkCard>
      </div>

      {/* Recent bookings table + alerts */}
      <div className="grid gap-4 lg:grid-cols-5">
        <DarkCard className="lg:col-span-3 overflow-hidden p-0">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Bookings</p>
              <p className="text-lg font-display font-bold text-white">Most recent</p>
            </div>
            <button className="text-xs font-semibold text-[#5BA8E8] hover:text-white">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-white/45 border-y border-white/10">
                  <th className="text-left font-bold px-5 py-2.5">Time</th>
                  <th className="text-left font-bold py-2.5">Parent · Child</th>
                  <th className="text-left font-bold py-2.5">Type</th>
                  <th className="text-left font-bold py-2.5">City</th>
                  <th className="text-right font-bold py-2.5">Amount</th>
                  <th className="text-right font-bold px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {RECENT.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-3 text-white/60 tabular-nums">{r.time}</td>
                    <td className="py-3">
                      <p className="font-semibold text-white">{r.parent}</p>
                      <p className="text-xs text-white/50">{r.child}</p>
                    </td>
                    <td className="py-3">{r.type}</td>
                    <td className="py-3 text-white/70">{r.city}</td>
                    <td className="py-3 text-right font-bold tabular-nums">{r.price}</td>
                    <td className="px-5 py-3 text-right">
                      <StatusPill status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DarkCard>

        <DarkCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">Operations alerts</p>
              <p className="text-lg font-display font-bold text-white">Needs review</p>
            </div>
            <Bell className="h-4 w-4 text-white/40" />
          </div>
          <ul className="space-y-2">
            <Alert tone="bad" title="Hamilton route over capacity" sub="Suggest reassigning 3 visits to NP J. Park" />
            <Alert tone="warn" title="2 NP timesheets pending approval" sub="Due by 5:00 PM today" />
            <Alert tone="info" title="New 5★ review · Mississauga" sub="“Punctual, gentle, professional.” — D. Patel" />
            <Alert tone="good" title="Daily revenue target met" sub="$2,420 of $2,200 (110%)" />
          </ul>
          <Link to="/admin/insights" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#5BA8E8] hover:text-white">
            Open AI insights <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </DarkCard>
      </div>
    </div>
  );
}

/* ───────────────────── helpers ───────────────────── */

function DarkCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[oklch(0.22_0.04_245)] p-5 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

function Kpi({
  label, value, delta, up, icon: Icon,
}: { label: string; value: string; delta: string; up: boolean; icon: typeof Clock }) {
  return (
    <DarkCard>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{label}</p>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#5BA8E8]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">{value}</p>
      <p className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${up ? "text-[#2ECC8B]" : "text-[#F5A623]"}`}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {delta}
      </p>
    </DarkCard>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-white/70">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Confirmed: "bg-[#2ECC8B]/15 text-[#2ECC8B]",
    Pending: "bg-[#F5A623]/15 text-[#F5A623]",
    Cancelled: "bg-red-500/15 text-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${map[status] ?? "bg-white/10 text-white/70"}`}>
      {status === "Confirmed" && <CheckCircle2 className="h-3 w-3" />}
      {status}
    </span>
  );
}

function Alert({ tone, title, sub }: { tone: "bad" | "warn" | "info" | "good"; title: string; sub: string }) {
  const map = {
    bad: { dot: "bg-red-400", icon: TrendingUp },
    warn: { dot: "bg-[#F5A623]", icon: Clock },
    info: { dot: "bg-[#5BA8E8]", icon: Star },
    good: { dot: "bg-[#2ECC8B]", icon: CheckCircle2 },
  } as const;
  const m = map[tone];
  return (
    <li className="flex items-start gap-3 rounded-lg bg-white/5 border border-white/10 p-3">
      <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${m.dot}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/55">{sub}</p>
      </div>
      <m.icon className="h-4 w-4 text-white/30 flex-shrink-0" />
    </li>
  );
}