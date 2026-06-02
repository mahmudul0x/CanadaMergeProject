import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Download, DollarSign, TrendingUp, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";
import { PageHeader, Card, StatCard, Badge, Btn } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/revenue")({ component: AdminRevenue });

/* ── Data ── */
const MONTHLY = [
  { m: "May",  rev: 38200, cost: 22100 },
  { m: "Jun",  rev: 42800, cost: 24600 },
  { m: "Jul",  rev: 45100, cost: 25900 },
  { m: "Aug",  rev: 48600, cost: 27800 },
  { m: "Sep",  rev: 52300, cost: 29700 },
  { m: "Oct",  rev: 61400, cost: 34200 },
  { m: "Nov",  rev: 71800, cost: 41200 },
];

const SERVICE_MIX = [
  { name: "Sick Visits",   value: 38400, pct: 53, color: "#1B6CA8" },
  { name: "Vaccinations",  value: 17200, pct: 24, color: "#2ECC8B" },
  { name: "Well-child",    value: 10800, pct: 15, color: "#F5A623" },
  { name: "Follow-ups",    value:  5400, pct:  8, color: "#9B72CF" },
];

const PAYOUTS = [
  { id: "PAY-0084", np: "Alicia Chen",  date: "Nov 13", amount: "$4,820", method: "Direct Deposit", status: "Paid"      },
  { id: "PAY-0083", np: "James Park",   date: "Nov 13", amount: "$4,410", method: "Direct Deposit", status: "Paid"      },
  { id: "PAY-0082", np: "Sofia Rivera", date: "Nov 13", amount: "$3,980", method: "Direct Deposit", status: "Paid"      },
  { id: "PAY-0081", np: "Lucas Brown",  date: "Nov 20", amount: "$3,560", method: "Direct Deposit", status: "Scheduled" },
  { id: "PAY-0080", np: "Maya Torres",  date: "Nov 20", amount: "$3,240", method: "Direct Deposit", status: "Scheduled" },
];

const MAX_SVC = Math.max(...SERVICE_MIX.map((s) => s.value));

function AdminRevenue() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "ytd">("30d");

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Finance & Reports"
        title="Revenue"
        sub="Financial performance across all Ontario service areas"
        action={
          <>
            <div className="flex items-center gap-1 rounded-xl bg-[oklch(0.965_0.018_240)] p-1 border border-[oklch(0.91_0.025_240)]">
              {(["7d", "30d", "90d", "ytd"] as const).map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${period === p ? "bg-white text-foreground shadow-sm" : "text-[oklch(0.55_0.04_250)] hover:text-foreground"}`}>
                  {p}
                </button>
              ))}
            </div>
            <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Download P&L</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue MTD"    value="$71,800" delta="+16.9% vs last month"  icon={DollarSign}  tone="good"    deltaUp />
        <StatCard label="Gross Margin"   value="42.6%"   delta="+1.2pp vs last month"  icon={TrendingUp}  tone="good"    deltaUp />
        <StatCard label="Avg Ticket"     value="$224"    delta="+$12 vs last month"     icon={Receipt}     tone="neutral" deltaUp />
        <StatCard label="Outstanding A/R" value="$4,120" delta="18 invoices pending"    icon={CreditCard}  tone="warn" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* Revenue vs Cost trend */}
        <Card className="xl:col-span-2 p-0! overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[oklch(0.91_0.025_240)]">
            <div>
              <h2 className="text-base font-bold text-foreground">Revenue vs Cost</h2>
              <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">May – Nov 2024 · Monthly</p>
            </div>
            <div className="flex items-center gap-4">
              <LegendDot color="#1B6CA8" label="Revenue" />
              <LegendDot color="#2ECC8B" label="Cost" />
            </div>
          </div>
          <div className="h-65 px-2 pt-4 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY} margin={{ top: 4, right: 12, left: -8, bottom: 4 }}>
                <defs>
                  <linearGradient id="gRev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B6CA8" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#1B6CA8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCost2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ECC8B" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#2ECC8B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.025 240)" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.6 0.04 250)" }} width={52} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid oklch(0.91 0.025 240)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px rgba(27,108,168,0.12)" }}
                  formatter={(v: number, n: string) => [`$${v.toLocaleString()}`, n === "rev" ? "Revenue" : "Cost"]}
                />
                <Area type="monotone" dataKey="rev" stroke="#1B6CA8" strokeWidth={2.5} fill="url(#gRev2)" dot={false} />
                <Area type="monotone" dataKey="cost" stroke="#2ECC8B" strokeWidth={2} fill="url(#gCost2)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Month summary strip */}
          <div className="grid grid-cols-7 divide-x divide-[oklch(0.91_0.025_240)] border-t border-[oklch(0.91_0.025_240)]">
            {MONTHLY.map((m) => {
              const margin = Math.round(((m.rev - m.cost) / m.rev) * 100);
              const isLatest = m.m === "Nov";
              return (
                <div key={m.m} className={`p-2.5 text-center ${isLatest ? "bg-primary/5" : ""}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.6_0.04_250)]">{m.m}</p>
                  <p className="text-xs font-extrabold text-foreground mt-1 tabular-nums">${(m.rev / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] font-semibold text-[oklch(0.42_0.18_150)] mt-0.5">{margin}%</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Service mix */}
        <Card className="p-0! overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-[oklch(0.91_0.025_240)]">
            <h2 className="text-base font-bold text-foreground">Revenue by Service</h2>
            <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">November 2024</p>
          </div>
          <div className="h-45 px-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SERVICE_MIX} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.6 0.04 250)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={78} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.45 0.05 250)" }} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid oklch(0.91 0.025 240)", borderRadius: 12, fontSize: 12, boxShadow: "0 8px 24px rgba(27,108,168,0.12)" }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {SERVICE_MIX.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="px-6 py-4 space-y-2.5">
            {SERVICE_MIX.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[oklch(0.42_0.05_250)]">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  {s.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-1.5 rounded-full bg-[oklch(0.91_0.025_240)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(s.value / MAX_SVC) * 100}%`, background: s.color }} />
                  </div>
                  <span className="text-xs font-bold text-foreground tabular-nums w-14 text-right">${(s.value / 1000).toFixed(1)}k</span>
                  <span className="text-[11px] text-[oklch(0.6_0.04_250)] w-8">{s.pct}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Provider payouts */}
      <Card noPad>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
          <div>
            <h2 className="text-base font-bold text-foreground">Provider Payouts</h2>
            <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">November 2024 disbursements</p>
          </div>
          <Btn variant="secondary" size="sm"><Download className="h-4 w-4" /> Export</Btn>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.91_0.025_240)]">
                {["Payout ID", "Nurse Practitioner", "Date", "Method", "Amount", "Status"].map((h) => (
                  <th key={h} className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[oklch(0.55_0.04_250)] text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYOUTS.map((p) => (
                <tr key={p.id} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-[oklch(0.55_0.04_250)]">{p.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{p.np}</td>
                  <td className="py-3.5 px-4 text-[oklch(0.5_0.04_250)] whitespace-nowrap">{p.date}</td>
                  <td className="py-3.5 px-4 text-[oklch(0.5_0.04_250)]">{p.method}</td>
                  <td className="py-3.5 px-4 font-bold tabular-nums text-foreground">{p.amount}</td>
                  <td className="py-3.5 px-4">
                    <Badge tone={p.status === "Paid" ? "good" : "warn"} dot>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)]">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[oklch(0.55_0.04_250)]">Total disbursed: <strong className="text-foreground">$16,210</strong></span>
            <span className="text-[oklch(0.55_0.04_250)]">Scheduled: <strong className="text-foreground">$6,800</strong></span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[oklch(0.42_0.18_150)]">
            <ArrowUpRight className="h-3.5 w-3.5" /> All payouts on schedule
          </div>
        </div>
      </Card>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-[oklch(0.5_0.04_250)]">
      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: color }} />{label}
    </span>
  );
}
