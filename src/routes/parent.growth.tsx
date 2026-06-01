import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Plus } from "lucide-react";
import { Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/growth")({ component: GrowthPage });

const CHILDREN = [{ id: "emma", name: "Emma" }, { id: "liam", name: "Liam" }];

const HEIGHT_DATA: Record<string, { age: number; p5: number; p25: number; p50: number; p75: number; p95: number; child: number }[]> = {
  emma: [
    { age: 2, p5: 82, p25: 85, p50: 87, p75: 89, p95: 92, child: 88 },
    { age: 3, p5: 90, p25: 93, p50: 96, p75: 99, p95: 102, child: 97 },
    { age: 4, p5: 96, p25: 100, p50: 103, p75: 106, p95: 110, child: 105 },
    { age: 5, p5: 102, p25: 106, p50: 110, p75: 114, p95: 118, child: 111 },
    { age: 6, p5: 108, p25: 113, p50: 116, p75: 120, p95: 125, child: 117 },
  ],
  liam: [
    { age: 1, p5: 71, p25: 73, p50: 75, p75: 77, p95: 80, child: 76 },
    { age: 2, p5: 82, p25: 85, p50: 87, p75: 89, p95: 92, child: 87 },
    { age: 3, p5: 90, p25: 93, p50: 96, p75: 99, p95: 102, child: 95 },
  ],
};
const WEIGHT_DATA: Record<string, { age: number; p5: number; p50: number; p95: number; child: number }[]> = {
  emma: [
    { age: 2, p5: 10, p50: 12, p95: 15, child: 13 },
    { age: 3, p5: 12, p50: 14, p95: 18, child: 15 },
    { age: 4, p5: 14, p50: 16, p95: 21, child: 18 },
    { age: 5, p5: 16, p50: 19, p95: 25, child: 20 },
    { age: 6, p5: 18, p50: 22, p95: 30, child: 22 },
  ],
  liam: [
    { age: 1, p5: 8, p50: 10, p95: 12, child: 11 },
    { age: 2, p5: 10, p50: 12, p95: 15, child: 13 },
    { age: 3, p5: 12, p50: 14, p95: 18, child: 14 },
  ],
};

function GrowthPage() {
  const [active, setActive] = useState("emma");
  return (
    <>
      <PageHeader
        title="Growth Chart"
        sub="WHO percentile bands shown for reference."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 btn-press">
            <Plus className="h-4 w-4" /> Add Measurement
          </button>
        }
      />

      <div className="flex gap-2 mb-5 border-b border-border">
        {CHILDREN.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px ${active === c.id ? "border-primary text-primary" : "border-transparent text-secondary-ink"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        <Card>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Current Height</p>
          <p className="mt-2 font-display text-3xl font-extrabold">112 cm</p>
          <p className="text-sm text-secondary-ink">65th percentile</p>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Current Weight</p>
          <p className="mt-2 font-display text-3xl font-extrabold">22 kg</p>
          <p className="text-sm text-secondary-ink">58th percentile</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg mb-3">Height over time (cm)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HEIGHT_DATA[active]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.025 240)" />
                <XAxis dataKey="age" stroke="oklch(0.5 0.04 250)" tick={{ fontSize: 12 }} label={{ value: "Age (years)", position: "bottom", offset: -2, fontSize: 11 }} />
                <YAxis stroke="oklch(0.5 0.04 250)" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="p5" stroke="oklch(0.91 0.025 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="p25" stroke="oklch(0.78 0.04 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="p50" stroke="oklch(0.65 0.06 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="p75" stroke="oklch(0.78 0.04 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="p95" stroke="oklch(0.91 0.025 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="child" stroke="oklch(0.52 0.13 245)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg mb-3">Weight over time (kg)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEIGHT_DATA[active]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.025 240)" />
                <XAxis dataKey="age" stroke="oklch(0.5 0.04 250)" tick={{ fontSize: 12 }} />
                <YAxis stroke="oklch(0.5 0.04 250)" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="p95" stroke="none" fill="oklch(0.78 0.16 160 / 0.15)" />
                <Area type="monotone" dataKey="p5" stroke="none" fill="oklch(1 0 0)" />
                <Line type="monotone" dataKey="p50" stroke="oklch(0.65 0.06 240)" strokeDasharray="3 3" dot={false} />
                <Line type="monotone" dataKey="child" stroke="oklch(0.78 0.16 160)" strokeWidth={3} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border text-left">
            <tr>{["Date", "Age", "Height (cm)", "Weight (kg)"].map((h) => <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-secondary-ink">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {HEIGHT_DATA[active].map((m, i) => (
              <tr key={i}>
                <td className="px-4 py-3">{new Date(Date.now() - (HEIGHT_DATA[active].length - i) * 365 * 86400000).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-secondary-ink">{m.age}y</td>
                <td className="px-4 py-3">{m.child}</td>
                <td className="px-4 py-3">{WEIGHT_DATA[active][i]?.child ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}