import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/np/settings")({ component: () => (
  <><PageHeader title="Settings" sub="Profile, availability and notifications." /><Card><p className="text-secondary-ink text-sm">Coming soon.</p></Card></>
) });

export const _ = null;