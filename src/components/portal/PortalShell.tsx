import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu,
  Search,
  X,
  Command,
} from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
  type ComponentType,
  type ReactNode,
} from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { useNavigate } from "@tanstack/react-router";

export type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  section?: string;
  badge?: string | number;
  badgeTone?: "good" | "warn" | "bad" | "info";
};

type Variant = "light" | "dark";

/* ─────────────────────────────────────────────────────────
   PortalShell
───────────────────────────────────────────────────────── */
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
  const [collapsed, setCollapsed] = useState(false);

  // Group nav by section
  const grouped: { section?: string; items: NavItem[] }[] = [];
  for (const item of nav) {
    const last = grouped[grouped.length - 1];
    if (last && last.section === item.section) last.items.push(item);
    else grouped.push({ section: item.section, items: [item] });
  }

  const isDark = variant === "dark";

  // Sidebar token classes
  const sidebarBg = isDark
    ? "bg-[oklch(0.18_0.045_248)]"
    : "bg-[oklch(0.99_0.006_240)]";
  const sidebarBorder = isDark ? "border-white/8" : "border-[oklch(0.91_0.025_240)]";
  const itemBase = isDark
    ? "text-white/60 hover:bg-white/8 hover:text-white"
    : "text-[oklch(0.42_0.05_250)] hover:bg-[oklch(0.94_0.05_240)] hover:text-primary";
  const itemActive = isDark
    ? "bg-[oklch(0.52_0.13_245)] text-white shadow-[0_2px_8px_oklch(0.52_0.13_245/0.35)]"
    : "bg-primary/10 text-primary font-semibold";
  const sectionLabel = isDark ? "text-white/30" : "text-[oklch(0.6_0.04_250)]";

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const sidebarWidth = collapsed ? "lg:w-[68px]" : "lg:w-[260px]";

  return (
    <div className="h-[100dvh] overflow-hidden bg-[oklch(0.965_0.018_240)] flex">
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-[260px] border-r flex flex-col
          ${sidebarBorder} ${sidebarBg}
          transform transition-[width,transform] duration-300 ease-in-out
          lg:relative lg:flex-shrink-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarWidth}
        `}
      >
        {/* Brand */}
        <div
          className={`flex items-center gap-3 px-4 py-4 border-b ${sidebarBorder} flex-shrink-0`}
        >
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className={`transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:pointer-events-none" : "opacity-100"}`}>
              {brand}
            </div>
          </div>
          <button
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors
              ${isDark ? "text-white/40 hover:bg-white/8 hover:text-white" : "text-[oklch(0.55_0.05_250)] hover:bg-[oklch(0.94_0.05_240)] hover:text-primary"}`}
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Sub-brand / User info */}
        {subBrand && (
          <div
            className={`px-4 py-3.5 border-b ${sidebarBorder} flex-shrink-0 overflow-hidden
              ${collapsed ? "lg:px-2" : ""}`}
          >
            <div className={`transition-opacity duration-200 ${collapsed ? "lg:opacity-0 lg:pointer-events-none" : "opacity-100"}`}>
              {subBrand}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4 scrollbar-thin">
          {grouped.map((g, gi) => (
            <div key={gi}>
              {g.section && !collapsed && (
                <p
                  className={`px-3 mb-1 text-[10px] font-extrabold tracking-[0.18em] uppercase ${sectionLabel} transition-opacity duration-200`}
                >
                  {g.section}
                </p>
              )}
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const active =
                    path === item.to || path.startsWith(item.to + "/");
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        title={collapsed ? item.label : undefined}
                        className={`
                          group relative flex items-center gap-3 rounded-xl text-sm font-medium
                          transition-all duration-150 outline-none
                          focus-visible:ring-2 focus-visible:ring-primary/50
                          ${collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 px-3 py-2.5" : "px-3 py-2.5"}
                          ${active ? itemActive : itemBase}
                        `}
                      >
                        {/* Active indicator bar */}
                        {active && !collapsed && (
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full
                              ${isDark ? "bg-white" : "bg-primary"}`}
                          />
                        )}
                        <item.icon className={`flex-shrink-0 h-[18px] w-[18px] ${active ? "" : "opacity-70 group-hover:opacity-100"}`} />
                        {!collapsed && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}
                        {!collapsed && item.badge !== undefined && (
                          <NavBadge value={item.badge} tone={item.badgeTone ?? "bad"} />
                        )}
                        {/* Collapsed tooltip */}
                        {collapsed && (
                          <span className="pointer-events-none absolute left-full ml-3 z-50 hidden lg:flex
                            items-center whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold
                            bg-[oklch(0.14_0.04_248)] text-white shadow-xl
                            opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                            {item.label}
                            {item.badge !== undefined && (
                              <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                {item.badge}
                              </span>
                            )}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className={`flex-shrink-0 p-2 border-t ${sidebarBorder}`}>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`
              group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
              transition-colors duration-150
              ${collapsed ? "lg:justify-center lg:px-0" : ""}
              ${isDark
                ? "text-white/40 hover:bg-red-500/10 hover:text-red-400"
                : "text-[oklch(0.5_0.05_250)] hover:bg-red-50 hover:text-red-600"
              }
            `}
          >
            <LogOut className="h-[18px] w-[18px] flex-shrink-0 opacity-70 group-hover:opacity-100" />
            {!collapsed && <span>Logout</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 hidden lg:flex
                items-center whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold
                bg-[oklch(0.14_0.04_248)] text-white shadow-xl
                opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 flex flex-col h-[100dvh] overflow-hidden">
        <TopBar
          onMenu={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          collapsed={collapsed}
          userName={user?.name ?? "Guest"}
          topBadge={topBadge}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TopBar
───────────────────────────────────────────────────────── */
function TopBar({
  onMenu,
  onToggleCollapse,
  collapsed,
  userName,
  topBadge,
}: {
  onMenu: () => void;
  onToggleCollapse: () => void;
  collapsed: boolean;
  userName: string;
  topBadge?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[oklch(0.91_0.025_240)] bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-[60px]">
        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenu}
            className="lg:hidden -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[oklch(0.94_0.05_240)] text-[oklch(0.42_0.05_250)] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[oklch(0.94_0.05_240)] text-[oklch(0.5_0.05_250)] hover:text-primary transition-colors"
          >
            {collapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Center — search */}
        <div className="hidden md:flex items-center flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[oklch(0.6_0.04_250)] group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search anything…"
              className="w-full rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.965_0.018_240)] pl-8 pr-10 py-2 text-sm text-foreground placeholder:text-[oklch(0.6_0.04_250)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 rounded-md border border-[oklch(0.88_0.025_240)] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[oklch(0.55_0.05_250)]">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          {topBadge}
          <NotificationsBell />
          <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-[oklch(0.91_0.025_240)]">
            <Avatar name={userName} size={34} />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-foreground">{userName}</p>
              <p className="text-[11px] text-[oklch(0.55_0.05_250)]">Administrator</p>
            </div>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-[oklch(0.6_0.05_250)]" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────
   NotificationsBell
───────────────────────────────────────────────────────── */
const NOTIFICATIONS = [
  { id: 1, dot: "bg-red-500", title: "Hamilton route over capacity", body: "3 visits need reassignment", time: "2m", unread: true },
  { id: 2, dot: "bg-[oklch(0.7_0.19_40)]", title: "2 NP timesheets pending", body: "Due by 5:00 PM today", time: "18m", unread: true },
  { id: 3, dot: "bg-[oklch(0.52_0.13_245)]", title: "New 5★ review · Mississauga", body: "\"Punctual, gentle, professional.\"", time: "1h", unread: true },
  { id: 4, dot: "bg-[oklch(0.72_0.18_150)]", title: "Daily revenue target met", body: "$2,420 of $2,200 (110%)", time: "3h", unread: false },
  { id: 5, dot: "bg-[oklch(0.52_0.13_245)]", title: "Schedule update: Burlington route", body: "NP L. Brown added 2 slots", time: "5h", unread: false },
];

function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[oklch(0.94_0.05_240)] text-[oklch(0.42_0.05_250)] transition-colors"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-[18px] min-w-[18px] rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[360px] rounded-2xl border border-[oklch(0.91_0.025_240)] bg-white shadow-[0_20px_60px_-10px_rgba(27,108,168,0.18)] overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[oklch(0.91_0.025_240)]">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-foreground">Notifications</p>
              {unreadCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button className="text-xs font-semibold text-primary hover:text-primary/80">Mark all read</button>
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-[oklch(0.95_0.018_240)]">
            {NOTIFICATIONS.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3.5 hover:bg-[oklch(0.97_0.012_240)] cursor-pointer transition-colors ${n.unread ? "bg-primary/[0.03]" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${n.unread ? "font-semibold text-foreground" : "text-[oklch(0.4_0.05_250)]"}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">{n.body}</p>
                  </div>
                  <p className="text-[11px] text-[oklch(0.65_0.04_250)] flex-shrink-0">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-[oklch(0.91_0.025_240)] bg-[oklch(0.97_0.012_240)]">
            <button className="w-full text-center text-xs font-semibold text-primary hover:text-primary/80">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   NavBadge (internal)
───────────────────────────────────────────────────────── */
function NavBadge({
  value,
  tone,
}: {
  value: string | number;
  tone: "good" | "warn" | "bad" | "info";
}) {
  const map = {
    bad: "bg-red-500 text-white",
    warn: "bg-[oklch(0.78_0.16_75)] text-foreground",
    good: "bg-[oklch(0.72_0.18_150)] text-foreground",
    info: "bg-primary text-white",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold ${map[tone]}`}
    >
      {value}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Exported shared components
───────────────────────────────────────────────────────── */

export function Avatar({
  name,
  size = 36,
  tone = "primary",
}: {
  name: string;
  size?: number;
  tone?: "primary" | "health" | "warm" | "purple";
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg =
    tone === "health"
      ? "bg-[oklch(0.72_0.18_150)] text-[oklch(0.18_0.04_250)]"
      : tone === "warm"
      ? "bg-[oklch(0.7_0.19_40)] text-white"
      : tone === "purple"
      ? "bg-[oklch(0.55_0.18_295)] text-white"
      : "bg-primary text-white";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold flex-shrink-0 ring-2 ring-white ${bg}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

export function PageHeader({
  title,
  sub,
  action,
  breadcrumb,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
  breadcrumb?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
      <div>
        {breadcrumb && (
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[oklch(0.6_0.04_250)] mb-1">
            {breadcrumb}
          </p>
        )}
        <h1 className="text-2xl sm:text-[1.75rem] font-display font-extrabold text-foreground tracking-tight leading-tight">
          {title}
        </h1>
        {sub && <p className="mt-1.5 text-sm text-[oklch(0.5_0.04_250)]">{sub}</p>}
      </div>
      {action && <div className="flex items-center gap-2 flex-wrap">{action}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  noPad = false,
}: {
  children: ReactNode;
  className?: string;
  noPad?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[oklch(0.91_0.025_240)] bg-white shadow-[0_2px_12px_rgba(27,108,168,0.06)] ${noPad ? "" : "p-6"} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {sub && <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  deltaUp,
  tone = "neutral",
  icon: Icon,
  sub,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaUp?: boolean;
  tone?: "neutral" | "good" | "warn" | "bad";
  icon?: ComponentType<{ className?: string }>;
  sub?: string;
}) {
  const iconBg =
    tone === "good"
      ? "bg-[oklch(0.72_0.18_150)]/10 text-[oklch(0.4_0.18_150)]"
      : tone === "warn"
      ? "bg-[oklch(0.78_0.16_75)]/12 text-[oklch(0.5_0.16_75)]"
      : tone === "bad"
      ? "bg-red-500/10 text-red-600"
      : "bg-primary/10 text-primary";

  const deltaColor =
    deltaUp === true
      ? "text-[oklch(0.42_0.18_150)]"
      : deltaUp === false
      ? "text-red-600"
      : "text-[oklch(0.55_0.04_250)]";

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[oklch(0.6_0.04_250)]">
          {label}
        </p>
        {Icon && (
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 ${iconBg}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-[2rem] font-extrabold tabular-nums leading-none text-foreground">
        {value}
      </p>
      {delta && (
        <p className={`mt-1.5 text-xs font-semibold ${deltaColor}`}>{delta}</p>
      )}
      {sub && <p className="mt-1 text-xs text-[oklch(0.6_0.04_250)]">{sub}</p>}
    </Card>
  );
}

export function Badge({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "info" | "purple";
  dot?: boolean;
}) {
  const map = {
    neutral: "bg-[oklch(0.93_0.02_240)] text-[oklch(0.45_0.05_250)]",
    good: "bg-[oklch(0.72_0.18_150)]/12 text-[oklch(0.35_0.18_150)]",
    warn: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.46_0.16_75)]",
    bad: "bg-red-500/10 text-red-700",
    info: "bg-primary/10 text-primary",
    purple: "bg-[oklch(0.55_0.18_295)]/10 text-[oklch(0.4_0.18_295)]",
  } as const;

  const dotMap = {
    neutral: "bg-[oklch(0.6_0.04_250)]",
    good: "bg-[oklch(0.55_0.18_150)]",
    warn: "bg-[oklch(0.65_0.18_75)]",
    bad: "bg-red-500",
    info: "bg-primary",
    purple: "bg-[oklch(0.55_0.18_295)]",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-bold leading-none ${map[tone]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${dotMap[tone]}`} />}
      {children}
    </span>
  );
}

export function Btn({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
  const variants = {
    primary: "bg-primary text-white hover:bg-[oklch(0.46_0.13_245)] shadow-[0_2px_8px_oklch(0.52_0.13_245/0.3)]",
    secondary:
      "bg-[oklch(0.94_0.05_240)] text-foreground border border-[oklch(0.88_0.03_240)] hover:bg-[oklch(0.91_0.05_240)]",
    ghost: "text-foreground hover:bg-[oklch(0.94_0.05_240)]",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-[0_2px_8px_rgba(239,68,68,0.3)]",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-sm" };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function DataTable({
  columns,
  rows,
  emptyText = "No data",
}: {
  columns: { key: string; label: string; align?: "left" | "right" | "center" }[];
  rows: Record<string, ReactNode>[];
  emptyText?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[oklch(0.91_0.025_240)]">
            {columns.map((c) => (
              <th
                key={c.key}
                className={`py-3 px-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[oklch(0.55_0.04_250)] whitespace-nowrap text-${c.align ?? "left"}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-sm text-[oklch(0.55_0.04_250)]">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0 hover:bg-[oklch(0.975_0.012_240)] transition-colors"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`py-3.5 px-4 text-${c.align ?? "left"}`}
                  >
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ChevronDown };
