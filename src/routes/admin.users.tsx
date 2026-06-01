import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Search, Download, Plus, Mail, Phone, MoreHorizontal, UserCheck } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

const FAMILIES = [
  { id: "FAM-2401", parent: "Sarah Mitchell", children: 2, city: "Milton", joined: "Jan 2024", visits: 14, ltv: 3140, status: "Active" as const, email: "sarah.m@email.com", phone: "905-555-0142" },
  { id: "FAM-2398", parent: "James Brown", children: 1, city: "Oakville", joined: "Mar 2024", visits: 8, ltv: 1820, status: "Active" as const, email: "j.brown@email.com", phone: "905-555-0188" },
  { id: "FAM-2390", parent: "Priya Patel", children: 3, city: "Hamilton", joined: "Nov 2023", visits: 22, ltv: 4980, status: "VIP" as const, email: "priya.p@email.com", phone: "905-555-0204" },
  { id: "FAM-2381", parent: "Ahmed Khan", children: 1, city: "Mississauga", joined: "Jul 2024", visits: 5, ltv: 1120, status: "Active" as const, email: "ahmed.k@email.com", phone: "905-555-0177" },
  { id: "FAM-2372", parent: "Lucia Garcia", children: 2, city: "Milton", joined: "Feb 2024", visits: 11, ltv: 2480, status: "Active" as const, email: "lucia.g@email.com", phone: "905-555-0156" },
  { id: "FAM-2365", parent: "Min Lee", children: 1, city: "Burlington", joined: "Sep 2023", visits: 6, ltv: 1340, status: "Inactive" as const, email: "min.l@email.com", phone: "905-555-0211" },
  { id: "FAM-2360", parent: "Hannah Roberts", children: 2, city: "Hamilton", joined: "Apr 2024", visits: 9, ltv: 2020, status: "Active" as const, email: "h.roberts@email.com", phone: "905-555-0199" },
];

function AdminUsers() {
  const [q, setQ] = useState("");
  const filtered = FAMILIES.filter(f => q === "" || (f.parent + f.city + f.id).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Patients & Families"
        sub="Every registered family across Southern Ontario."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent"><Download className="h-4 w-4" /> Export CSV</button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> Invite Family</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Families" value="2,412" delta="+38 this month" tone="good" icon={Users} />
        <StatCard label="Active (30d)" value="1,847" delta="76.6% activation" tone="good" icon={UserCheck} />
        <StatCard label="Avg LTV" value="$2,340" delta="+$120 YoY" tone="good" icon={Users} />
        <StatCard label="Children Served" value="3,981" delta="1.65 per family" tone="neutral" icon={Users} />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
          <h3 className="font-display font-extrabold">Families directory</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or city…" className="w-72 rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background text-secondary-ink">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Family</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold text-right">Children</th>
                <th className="px-4 py-3 font-semibold text-right">Visits</th>
                <th className="px-4 py-3 font-semibold text-right">LTV</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-background">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={f.parent} size={32} />
                      <div>
                        <div className="font-semibold">{f.parent}</div>
                        <div className="text-xs text-secondary-ink font-mono">{f.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="flex items-center gap-1.5 text-secondary-ink"><Mail className="h-3 w-3" />{f.email}</div>
                    <div className="flex items-center gap-1.5 text-secondary-ink mt-1"><Phone className="h-3 w-3" />{f.phone}</div>
                  </td>
                  <td className="px-4 py-3">{f.city}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{f.children}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{f.visits}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold">${f.ltv.toLocaleString()}</td>
                  <td className="px-4 py-3 text-secondary-ink">{f.joined}</td>
                  <td className="px-4 py-3"><Badge tone={f.status === "VIP" ? "info" : f.status === "Active" ? "good" : "neutral"}>{f.status}</Badge></td>
                  <td className="px-4 py-3 text-right"><button className="p-1 rounded hover:bg-accent"><MoreHorizontal className="h-4 w-4 text-secondary-ink" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}