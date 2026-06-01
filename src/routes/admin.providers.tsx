import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope, Plus, MapPin, Star, TrendingUp, Award } from "lucide-react";
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/providers")({ component: AdminProviders });

const NPS = [
  { name: "Alice Chen", region: "Milton / Oakville", visits: 184, rating: 4.97, util: 88, status: "On Visit" as const, specialty: "Pediatric Acute Care", joined: "2022" },
  { name: "Jordan Park", region: "Oakville / Burlington", visits: 162, rating: 4.94, util: 84, status: "Available" as const, specialty: "Vaccinations & Wellness", joined: "2022" },
  { name: "Maya Singh", region: "Hamilton", visits: 148, rating: 4.91, util: 81, status: "On Visit" as const, specialty: "Respiratory & ENT", joined: "2023" },
  { name: "Riley Wong", region: "Mississauga / Brampton", visits: 139, rating: 4.89, util: 79, status: "Off Duty" as const, specialty: "Adolescent Care", joined: "2023" },
  { name: "Sam Carter", region: "Burlington", visits: 96, rating: 4.85, util: 68, status: "Available" as const, specialty: "General Pediatrics", joined: "2024" },
  { name: "Devon Reyes", region: "Brampton", visits: 71, rating: 4.82, util: 62, status: "Available" as const, specialty: "General Pediatrics", joined: "2024" },
];

function AdminProviders() {
  return (
    <>
      <PageHeader
        title="Nurse Practitioners"
        sub="Performance, coverage and certification status across your provider roster."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90"><Plus className="h-4 w-4" /> Recruit NP</button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active NPs" value="14" delta="+2 this quarter" tone="good" icon={Stethoscope} />
        <StatCard label="Avg Utilization" value="77%" delta="Target: 75%" tone="good" icon={TrendingUp} />
        <StatCard label="Avg Rating" value="4.91 ★" delta="Top 5% nationally" tone="good" icon={Star} />
        <StatCard label="Certifications Due" value="3" delta="Within 60 days" tone="warn" icon={Award} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {NPS.map(np => (
          <Card key={np.name} className="!p-5">
            <div className="flex items-start gap-3">
              <Avatar name={np.name} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-extrabold truncate">{np.name}</h4>
                  <Badge tone={np.status === "On Visit" ? "info" : np.status === "Available" ? "good" : "neutral"}>{np.status}</Badge>
                </div>
                <p className="text-xs text-secondary-ink mt-0.5">{np.specialty}</p>
                <p className="text-xs text-secondary-ink mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{np.region} · since {np.joined}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-ink">Visits</p>
                <p className="font-display text-lg font-extrabold tabular-nums">{np.visits}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-ink">Rating</p>
                <p className="font-display text-lg font-extrabold tabular-nums">{np.rating} ★</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-ink">Util.</p>
                <p className="font-display text-lg font-extrabold tabular-nums">{np.util}%</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-background overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${np.util}%` }} />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent">View Profile</button>
              <button className="flex-1 rounded-lg bg-primary/10 text-primary px-3 py-1.5 text-xs font-semibold hover:bg-primary/15">Message</button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}