// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Syringe } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/vaccinations")({ component: VaccinationsPage });

const CHILDREN = [
  { id: "emma", name: "Emma", pct: 78 },
  { id: "liam", name: "Liam", pct: 92 },
];

type Status = "Completed" | "Due Soon" | "Overdue" | "Upcoming";
const VAX: Record<string, { vaccine: string; age: string; status: Status; given?: string; next?: string }[]> = {
  emma: [
    { vaccine: "DTaP (5th)", age: "4–6y", status: "Completed", given: "Jun 12, 2024" },
    { vaccine: "Polio (IPV)", age: "4–6y", status: "Completed", given: "Jun 12, 2024" },
    { vaccine: "MMR (2nd)", age: "4–6y", status: "Due Soon", next: "Nov 30, 2025" },
    { vaccine: "Varicella (2nd)", age: "4–6y", status: "Overdue", next: "Oct 15, 2025" },
    { vaccine: "Flu (annual)", age: "Yearly", status: "Upcoming", next: "Dec 2025" },
  ],
  liam: [
    { vaccine: "DTaP (4th)", age: "15–18m", status: "Completed", given: "Feb 04, 2024" },
    { vaccine: "Hib", age: "12–15m", status: "Completed", given: "Sep 22, 2023" },
    { vaccine: "Flu (annual)", age: "Yearly", status: "Due Soon", next: "Dec 2025" },
  ],
};
const toneFor: Record<Status, "good" | "warn" | "bad" | "neutral"> = {
  Completed: "good", "Due Soon": "warn", Overdue: "bad", Upcoming: "neutral",
};

function VaccinationsPage() {
  const [active, setActive] = useState("emma");
  const child = CHILDREN.find((c) => c.id === active)!;
  const rows = VAX[active];
  return (
    <>
      <PageHeader title="Vaccination Tracker" sub="Track immunizations against the Ontario schedule." />

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

      <Card className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-semibold">{child.name} is <span className="text-primary">{child.pct}%</span> up to date</p>
          <span className="text-xs text-secondary-ink">Ontario routine schedule</span>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-health" style={{ width: `${child.pct}%` }} />
        </div>
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-background border-b border-border">
            <tr className="text-left">
              {["Vaccine", "Recommended", "Status", "Date Given", "Next Due", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-secondary-ink">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.vaccine}>
                <td className="px-4 py-3.5 font-semibold">{r.vaccine}</td>
                <td className="px-4 py-3.5 text-secondary-ink">{r.age}</td>
                <td className="px-4 py-3.5"><Badge tone={toneFor[r.status]}>{r.status}</Badge></td>
                <td className="px-4 py-3.5 text-secondary-ink">{r.given ?? "—"}</td>
                <td className="px-4 py-3.5 text-secondary-ink">{r.next ?? "—"}</td>
                <td className="px-4 py-3.5">
                  {r.status !== "Completed" && (
                    <Link to="/book" className="text-primary font-semibold text-xs">Book →</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
          <Download className="h-4 w-4" /> Download Vaccine Record PDF
        </button>
        <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Syringe className="h-4 w-4" /> Book Vaccination Visit
        </Link>
      </div>
    </>
  );
}