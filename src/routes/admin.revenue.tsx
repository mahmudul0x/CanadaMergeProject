import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, TrendingUp, CreditCard, Receipt, Download } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Card, StatCard, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/revenue")({ component: AdminRevenue });

const MONTHLY = [
  { m: "May", r: 42100, c: 28400 }, { m: "Jun", r: 48700, c: 31200 },
  { m: "Jul", r: 51200, c: 32800 }, { m: "Aug", r: 49800, c: 32100 },
  { m: "Sep", r: 56400, c: 35000 }, { m: "Oct", r: 62300, c: 37400 },
  { m: "Nov", r: 71800, c: 41200 },
];

const BY_SERVICE = [
  { s: "Sick visits", v: 41200 }, { s: "Vaccinations", v: 18400 },
  { s: "Well-child", v: 8200 }, { s: "Follow-ups", v: 4000 },
];

const PAYOUTS = [
  { id: "PO-9821", date: "Nov 12", amount: 18420, status: "Paid", method: "Direct deposit" },
  { id: "PO-9820", date: "Nov 5", amount: 17680, status: "Paid", method: "Direct deposit" },
  { id: "PO-9819", date: "Oct 29", amount: 19120, status: "Paid", method: "Direct deposit" },
  { id: "PO-9818", date: "Oct 22", amount: 16480, status: "Paid", method: "Direct deposit" },
  { id: "PO-9822", date: "Nov 19", amount: 19840, status: "Scheduled", method: "Direct deposit" },
];

function AdminRevenue() {
  return (
    <>
      <PageHeader
        title="Revenue"
        sub="Monthly performance, margins and provider payouts."
        action={<button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent"><Download className="h-4 w-4" /> Download P&L</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Revenue (MTD)" value="$71,800" delta="+15.3% MoM" tone="good" icon={DollarSign} />
        <StatCard label="Gross Margin" value="42.6%" delta="+1.2 pts" tone="good" icon={TrendingUp} />
        <StatCard label="Avg Ticket" value="$224" delta="+$8 YoY" tone="good" icon={Receipt} />
        <StatCard label="Outstanding A/R" value="$4,120" delta="14 invoices" tone="warn" icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-extrabold">Revenue vs. cost</h3>
            <Badge tone="good">+15.3% MoM</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={MONTHLY}>
                <defs>
                  <linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1B6CA8" stopOpacity={0.4} /><stop offset="100%" stopColor="#1B6CA8" stopOpacity={0} /></linearGradient>
                  <linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5A623" stopOpacity={0.3} /><stop offset="100%" stopColor="#F5A623" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="m" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="r" stroke="#1B6CA8" fill="url(#r)" strokeWidth={2} name="Revenue" />
                <Area type="monotone" dataKey="c" stroke="#F5A623" fill="url(#c)" strokeWidth={2} name="Cost" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="font-display font-extrabold mb-4">By service line</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={BY_SERVICE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="s" tick={{ fontSize: 12 }} width={90} />
                <Tooltip />
                <Bar dataKey="v" fill="#1B6CA8" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border"><h3 className="font-display font-extrabold">Provider payouts</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-secondary-ink">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Payout ID</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold text-right">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PAYOUTS.map(p => (
                <tr key={p.id} className="hover:bg-background">
                  <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                  <td className="px-4 py-3 text-secondary-ink">{p.date}</td>
                  <td className="px-4 py-3">{p.method}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold">${p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge tone={p.status === "Paid" ? "good" : "warn"}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}