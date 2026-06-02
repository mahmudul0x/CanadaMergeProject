// @refresh reset
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Settings,
  ShieldCheck,
  Users,
  CalendarCheck,
  Stethoscope,
  DollarSign,
  FileBarChart,
  ScrollText,
  LifeBuoy,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/portal/PortalShell";
import { usePortalAuth } from "@/lib/portal-auth";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const NAV: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Overview" },
  { to: "/admin/insights",  label: "AI Insights",  icon: Sparkles,        section: "Overview", badge: 5, badgeTone: "info" },

  { to: "/admin/appointments", label: "Appointments",        icon: CalendarCheck, section: "Operations", badge: 3, badgeTone: "warn" },
  { to: "/admin/users",        label: "Patients & Families", icon: Users,          section: "Operations" },
  { to: "/admin/providers",    label: "Nurse Practitioners", icon: Stethoscope,    section: "Operations" },

  { to: "/admin/revenue", label: "Revenue", icon: DollarSign,   section: "Finance & Reports" },
  { to: "/admin/reports", label: "Reports",  icon: FileBarChart, section: "Finance & Reports" },

  { to: "/admin/audit",    label: "Audit Log", icon: ScrollText, section: "System" },
  { to: "/admin/support",  label: "Support",   icon: LifeBuoy,   section: "System", badge: 18, badgeTone: "bad" },
  { to: "/admin/settings", label: "Settings",  icon: Settings,   section: "System" },
];

function AdminLayout() {
  const { user } = usePortalAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate({ to: "/login", search: { role: "admin", redirect: "" } });
    } else if (path === "/admin") {
      navigate({ to: "/admin/dashboard" });
    }
  }, [user, path, navigate]);

  if (!user) return null;

  return (
    <PortalShell
      variant="dark"
      brand={
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_2px_8px_oklch(0.52_0.13_245/0.5)] shrink-0">
            <ShieldCheck className="h-4.5 w-4.5" />
          </span>
          <div className="leading-tight min-w-0">
            <p className="font-display font-extrabold text-sm text-white leading-none">Pediatric UC</p>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.18em] mt-0.5">Admin Console</p>
          </div>
        </div>
      }
      nav={NAV}
    >
      <Outlet />
    </PortalShell>
  );
}
