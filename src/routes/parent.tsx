// @refresh reset
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Calendar,
  FileText,
  Home,
  Settings,
  Stethoscope,
  Syringe,
  TrendingUp,
  Users,
} from "lucide-react";
import { PortalShell, type NavItem, Avatar, ChevronDown } from "@/components/portal/PortalShell";
import { usePortalAuth } from "@/lib/portal-auth";

export const Route = createFileRoute("/parent")({
  component: ParentLayout,
});

const NAV: NavItem[] = [
  { to: "/parent/dashboard", label: "Dashboard", icon: Home },
  { to: "/parent/children", label: "My Children", icon: Users },
  { to: "/parent/appointments", label: "Appointments", icon: Calendar },
  { to: "/parent/vaccinations", label: "Vaccination Tracker", icon: Syringe },
  { to: "/parent/growth", label: "Growth Chart", icon: TrendingUp },
  { to: "/parent/documents", label: "Documents", icon: FileText },
  { to: "/parent/settings", label: "Settings", icon: Settings },
];

function ParentLayout() {
  const { user } = usePortalAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (user && user.role !== "parent") navigate({ to: "/login", search: { role: "parent", redirect: "" } });
    else if (!user) navigate({ to: "/login", search: { role: "parent", redirect: "" } });
    else if (path === "/parent") navigate({ to: "/parent/dashboard" });
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
            <p className="text-[10px] text-secondary-ink font-semibold uppercase tracking-wider">Parent Portal</p>
          </div>
        </div>
      }
      subBrand={
        <div className="flex items-center gap-3">
          <Avatar name={user.name} />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-secondary-ink">Welcome</p>
            <button className="flex items-center gap-1 text-sm font-bold text-foreground truncate">
              {user.name.split(" ")[0]} <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      }
      nav={NAV}
    >
      <Outlet />
    </PortalShell>
  );
}