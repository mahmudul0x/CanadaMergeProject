// @refresh reset
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Stethoscope, Users, Shield } from "lucide-react";
import { usePortalAuth, type Role } from "@/lib/portal-auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    role: ((s.role as string) || "parent") as Role,
    redirect: (s.redirect as string) || "",
  }),
  component: LoginPage,
});

const ROLE_CONFIG: Record<Role, { title: string; desc: string; demo: string; icon: typeof Users; redirect: string }> = {
  parent: { title: "Parent Portal", desc: "Track your child's care, appointments, and records.", demo: "sarah@example.com", icon: Users, redirect: "/parent/dashboard" },
  np: { title: "Nurse Practitioner Portal", desc: "Today's visits, documentation, and stats.", demo: "amelia@pediatricuc.ca", icon: Stethoscope, redirect: "/np/schedule" },
  admin: { title: "Admin Dashboard", desc: "Operations, bookings, NPs and revenue.", demo: "admin@pediatricuc.ca", icon: Shield, redirect: "/admin" },
};

function LoginPage() {
  const { role } = Route.useSearch();
  const navigate = useNavigate();
  const { login } = usePortalAuth();
  const [selected, setSelected] = useState<Role>(role);
  const cfg = ROLE_CONFIG[selected];
  const [email, setEmail] = useState(cfg.demo);
  const [password, setPassword] = useState("demo1234");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selected);
    navigate({ to: ROLE_CONFIG[selected].redirect });
  };

  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Stethoscope className="h-6 w-6" />
          </span>
          <p className="mt-6 font-display text-2xl font-extrabold">Pediatric Urgent Care™</p>
          <p className="text-sm opacity-80">Expert Care. At Your Door.</p>
        </div>
        <blockquote className="font-display text-3xl leading-snug max-w-md">
          “The best healthcare visit we've ever had — calm, professional, and right at our kitchen table.”
        </blockquote>
        <div>
          <p className="text-sm font-semibold">Priya Shah · Hamilton, ON</p>
          <p className="text-xs opacity-70">Verified parent · ★★★★★</p>
        </div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-health/30 blur-3xl" />
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-muted mb-8">
            {(Object.keys(ROLE_CONFIG) as Role[]).map((r) => {
              const Icon = ROLE_CONFIG[r].icon;
              const active = r === selected;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setSelected(r); setEmail(ROLE_CONFIG[r].demo); }}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-all ${
                    active ? "bg-surface text-primary shadow-soft" : "text-secondary-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {r === "np" ? "NP" : r}
                </button>
              );
            })}
          </div>

          <h1 className="text-3xl">{cfg.title}</h1>
          <p className="mt-2 text-secondary-ink">{cfg.desc}</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Field icon={Mail} label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
            </Field>
            <Field icon={Lock} label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-secondary-ink">
                <input type="checkbox" className="accent-[var(--color-primary)]" /> Remember me
              </label>
              <a href="#" className="text-primary font-semibold">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-soft hover:brightness-110 btn-press"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-secondary-ink">
              Demo mode — any email/password works to enter the {selected} portal.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .login-input { width:100%; border:1px solid var(--color-border); background: var(--color-surface);
          padding: 0.75rem 0.85rem 0.75rem 2.5rem; border-radius: 8px; font-size: 0.95rem; outline: none;
          transition: border-color .15s ease, box-shadow .15s ease; }
        .login-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">{label}</span>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink pointer-events-none" />
        {children}
      </div>
    </label>
  );
}

export { redirect };