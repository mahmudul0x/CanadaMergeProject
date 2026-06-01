import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Avatar, Badge } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/np/patient")({ component: () => (
  <>
    <PageHeader title="Patient Details" sub="Active visit · Emma Thompson, age 6" />
    <Card>
      <div className="flex items-start gap-4">
        <Avatar name="Emma Thompson" size={64} tone="health" />
        <div>
          <h2 className="text-xl">Emma Thompson</h2>
          <p className="text-sm text-secondary-ink">Age 6 · DOB Mar 14, 2019 · Blood A+</p>
          <div className="mt-3 flex gap-2"><Badge tone="bad">Peanut allergy</Badge><Badge tone="bad">Penicillin</Badge><Badge tone="info">Albuterol PRN</Badge></div>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
        <div><p className="text-xs font-bold uppercase text-secondary-ink mb-1">Chief complaint</p><p>Fever (39.0°C) and cough x 24 hours.</p></div>
        <div><p className="text-xs font-bold uppercase text-secondary-ink mb-1">Parent contact</p><p>Sarah Thompson · (905) 555-0142</p></div>
        <div><p className="text-xs font-bold uppercase text-secondary-ink mb-1">Address</p><p>123 Main St, Milton, ON</p></div>
        <div><p className="text-xs font-bold uppercase text-secondary-ink mb-1">Last visit</p><p>Nov 12, 2024 — Well-child checkup</p></div>
      </div>
    </Card>
  </>
) });