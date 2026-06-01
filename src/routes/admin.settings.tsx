import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <div className="space-y-4">
      <h1 className="font-display font-extrabold text-2xl">Settings</h1>
      <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-secondary-ink">
        Organization, billing, and team management coming soon.
      </div>
    </div>
  );
}