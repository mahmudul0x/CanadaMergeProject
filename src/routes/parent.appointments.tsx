import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { Avatar, Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/appointments")({ component: AppointmentsPage });

const APPTS = [
  { id: 1, when: "Tomorrow · 10:00 AM", child: "Emma", type: "Sick Visit", np: "Amelia Chen", status: "Confirmed", tone: "good" as const, addr: "123 Main St, Milton" },
  { id: 2, when: "Nov 30 · 2:00 PM", child: "Emma", type: "Vaccination · MMR", np: "Daniel Park", status: "Scheduled", tone: "info" as const, addr: "123 Main St, Milton" },
  { id: 3, when: "Nov 12 · 9:30 AM", child: "Liam", type: "Well-child Checkup", np: "Amelia Chen", status: "Completed", tone: "neutral" as const, addr: "123 Main St, Milton" },
  { id: 4, when: "Oct 28 · 4:15 PM", child: "Emma", type: "Follow-up Visit", np: "Mei Wong", status: "Completed", tone: "neutral" as const, addr: "123 Main St, Milton" },
];

function AppointmentsPage() {
  return (
    <>
      <PageHeader
        title="Appointments"
        sub="Upcoming and past visits."
        action={
          <Link to="/book" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 btn-press">
            Book new visit
          </Link>
        }
      />
      <div className="space-y-3">
        {APPTS.map((a) => (
          <Card key={a.id}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Calendar className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">{a.when}</p>
                <p className="font-display font-bold mt-1">{a.type}</p>
                <p className="text-sm text-secondary-ink flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {a.addr}</p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar name={a.np} size={28} />
                <span className="text-sm font-semibold">{a.np}</span>
              </div>
              <Badge tone={a.tone}>{a.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}