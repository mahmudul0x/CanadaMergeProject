import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, Menu, Search } from "lucide-react";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { useNavigate } from "@tanstack/react-router";

export type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  section?: string;
};

type Variant = "light" | "dark";

export function PortalShell({
  brand,
  subBrand,
  nav,
  topBadge,
  variant = "light",
  children,
}: {
  brand: ReactNode;
  subBrand?: ReactNode;
  nav: NavItem[];
  topBadge?: ReactNode;
  variant?: Variant;
  children: ReactNode;
}) {
  const { user, logout } = usePortalAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopHidden, setDesktopHidden] = useState(false);

  // Group nav by section
  const grouped: { section?: string; items: NavItem[] }[] = [];
  for (const item of nav) {
    const last = grouped[grouped.length - 1];
    if (last && last.section === item.section) last.items.push(item);
    else grouped.push({ section: item.section, items: [item] });
  }

  const isDark = variant === "dark";
  const sidebarBg = isDark ? "bg-[oklch(0.22_0.05_245)]" : "bg-surface";
  const sidebarText = isDark ? "text-white" : "text-foreground";
  const sidebarBorder = isDark ? "border-white/10" : "border-border";
  const itemBase = isDark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-secondary-ink hover:bg-accent hover:text-primary";
  const itemActive = isDark ? "bg-primary text-white" : "bg-primary/10 text-primary";
  const sectionLabel = isDark ? "text-white/40" : "text-secondary-ink";

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] border-r ${sidebarBorder} ${sidebarBg} ${sidebarText} transform transition-all duration-300 lg:relative lg:flex-shrink-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${desktopHidden ? "lg:w-0 lg:-ml-px lg:overflow-hidden lg:border-r-0" : ""}`}
      >
        <div className="flex h-full flex-col">
          <div className={`px-5 py-5 border-b ${sidebarBorder} flex items-center justify-between gap-2`}>
            <div className="min-w-0 flex-1">{brand}</div>
            <button
              onClick={() => setDesktopHidden(true)}
              aria-label="Collapse sidebar"
              className={`hidden lg:inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${isDark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-secondary-ink hover:bg-accent hover:text-primary"}`}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          </div>
          {subBrand && <div className={`px-5 py-4 border-b ${sidebarBorder}`}>{subBrand}</div>}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {grouped.map((g, gi) => (
              <div key={gi}>
                {g.section && (
                  <p className={`px-3 mb-2 text-[10px] font-bold tracking-[0.15em] uppercase ${sectionLabel}`}>
                    {g.section}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {g.items.map((item) => {
                    const active = path === item.to || path.startsWith(item.to + "/");
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            active ? itemActive : itemBase
                          }`}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className={`m-3 mt-0 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${itemBase}`}
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col h-[100dvh]">
        <TopBar
          onMenu={() => setMobileOpen(true)}
          onToggleDesktop={() => setDesktopHidden((v) => !v)}
          desktopHidden={desktopHidden}
          userName={user?.name ?? "Guest"}
          topBadge={topBadge}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 sm:p-8 max-w-[1400px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function TopBar({ onMenu, onToggleDesktop, desktopHidden, userName, topBadge }: { onMenu: () => void; onToggleDesktop: () => void; desktopHidden: boolean; userName: string; topBadge?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 bg-surface/85 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 h-16">
        <div className="flex items-center gap-2">
          <button onClick={onMenu} className="lg:hidden -ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleDesktop}
            aria-label={desktopHidden ? "Show sidebar" : "Hide sidebar"}
            title={desktopHidden ? "Show sidebar" : "Hide sidebar"}
            className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent text-secondary-ink hover:text-primary"
          >
            {desktopHidden ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </button>
        </div>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink" />
            <input
              placeholder="Search…"
              className="w-full rounded-lg border border-border bg-background px-9 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {topBadge}
          <NotificationsBell />
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <Avatar name={userName} />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold">{userName}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const items = [
    { t: "Visit confirmed for tomorrow 10:00 AM", time: "2m" },
    { t: "New review: Sarah M. left you 5★", time: "1h" },
    { t: "Vaccination reminder for Liam", time: "3h" },
    { t: "Payment received — $224.87", time: "Yesterday" },
    { t: "Schedule update: Hamilton route", time: "2d" },
  ];
  useEffect(() => {
    const close = () => setOpen(false);
    if (open) {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [open]);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-label="Notifications"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-warm ring-2 ring-surface" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[320px] rounded-2xl border border-border bg-surface shadow-lift overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="font-bold text-sm">Notifications</p>
            <button className="text-xs text-primary font-semibold">Mark all read</button>
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-border">
            {items.map((n, i) => (
              <li key={i} className="px-4 py-3 hover:bg-background cursor-pointer">
                <p className="text-sm">{n.t}</p>
                <p className="text-xs text-secondary-ink mt-0.5">{n.time} ago</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Avatar({ name, size = 36, tone = "primary" }: { name: string; size?: number; tone?: "primary" | "health" | "warm" }) {
  const initials = name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const bg = tone === "primary" ? "bg-primary" : tone === "health" ? "bg-health text-foreground" : "bg-warm";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 ${bg}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </span>
  );
}

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-secondary-ink">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  tone = "neutral",
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  tone?: "neutral" | "good" | "warn" | "bad";
  icon?: ComponentType<{ className?: string }>;
}) {
  const toneClass =
    tone === "good" ? "text-[oklch(0.45_0.18_150)] bg-success/10"
      : tone === "warn" ? "text-[oklch(0.55_0.16_75)] bg-warning/15"
        : tone === "bad" ? "text-destructive bg-destructive/10"
          : "text-primary bg-primary/10";
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">{label}</p>
        {Icon && (
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${toneClass}`}>
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold tabular-nums">{value}</p>
      {delta && <p className={`mt-1 text-xs font-semibold ${tone === "bad" ? "text-destructive" : tone === "warn" ? "text-warning" : "text-secondary-ink"}`}>{delta}</p>}
    </Card>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "info" }) {
  const map = {
    neutral: "bg-muted text-secondary-ink",
    good: "bg-success/15 text-[oklch(0.4_0.15_150)]",
    warn: "bg-warning/15 text-[oklch(0.5_0.16_75)]",
    bad: "bg-destructive/15 text-destructive",
    info: "bg-primary/10 text-primary",
  } as const;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}>{children}</span>;
}

export { ChevronDown };