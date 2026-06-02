// @refresh reset
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { CalendarDays, Map, FileEdit, BarChart3, Settings, Stethoscope, User } from "lucide-react";
import { PortalShell, type NavItem, Avatar, Badge } from "@/components/portal/PortalShell";
import { usePortalAuth } from "@/lib/portal-auth";

export const Route = createFileRoute("/np")({ component: NPLayout });

const NAV: NavItem[] = [
  { to: "/np/schedule", label: "Today's Schedule", icon: CalendarDays },
  { to: "/np/patient", label: "Patient Details", icon: User },
  { to: "/np/route", label: "Route Map", icon: Map },
  { to: "/np/document", label: "Visit Documentation", icon: FileEdit },
  { to: "/np/stats", label: "My Stats", icon: BarChart3 },
  { to: "/np/settings", label: "Settings", icon: Settings },
];

function NPLayout() {
  const { user } = usePortalAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!user) navigate({ to: "/login", search: { role: "np", redirect: "" } });
    else if (user.role !== "np") navigate({ to: "/login", search: { role: "np", redirect: "" } });
    else if (path === "/np") navigate({ to: "/np/schedule" });
  }, [user, path, navigate]);
  if (!user) return null;
  return (
    <PortalShell
      brand={
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display font-extrabold text-sm">Pediatric UC</p>
            <p className="text-[10px] text-secondary-ink font-semibold uppercase tracking-wider">NP Portal</p>
          </div>
        </div>
      }
      subBrand={
        <div className="flex items-center gap-3">
          <Avatar name={user.name} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user.name}</p>
            <Badge tone="good">NP Certified</Badge>
          </div>
        </div>
      }
      topBadge={
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary">
          5 visits · 3 done · 2 left
        </div>
      }
      nav={NAV}
    >
      <Outlet />
    </PortalShell>
  );
}