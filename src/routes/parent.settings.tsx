// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/settings")({ component: () => (
  <>
    <PageHeader title="Settings" sub="Account preferences and notifications." />
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <h3 className="text-lg">Profile</h3>
        <p className="text-sm text-secondary-ink mt-1">Update your account info.</p>
        <div className="mt-4 space-y-3">
          {["Name", "Email", "Phone", "Address"].map((f) => (
            <label key={f} className="block">
              <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-1.5">{f}</span>
              <input className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm" />
            </label>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-lg">Notifications</h3>
        <p className="text-sm text-secondary-ink mt-1">Choose how we keep you updated.</p>
        <ul className="mt-4 space-y-3">
          {["Email confirmations", "SMS reminders", "Vaccination alerts", "Marketing"].map((n, i) => (
            <li key={n} className="flex items-center justify-between">
              <span className="text-sm">{n}</span>
              <input type="checkbox" defaultChecked={i < 3} className="h-4 w-4 accent-[var(--color-primary)]" />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </>
) });