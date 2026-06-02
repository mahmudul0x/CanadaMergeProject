// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, Building2, CreditCard, Globe, Lock,
  Mail, Phone, Plus, Save, Shield, Trash2, Users,
} from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Btn, Avatar } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

/* ── Data ── */
const TEAM = [
  { name: "Dr. Emily Hart",   email: "emily.h@pediatricuc.ca",   role: "Super Admin", joined: "2021-03-01", status: "Active" as const },
  { name: "Marcus Reid",      email: "marcus.r@pediatricuc.ca",   role: "Admin",       joined: "2022-06-15", status: "Active" as const },
  { name: "Priya Nair",       email: "priya.n@pediatricuc.ca",    role: "Admin",       joined: "2023-01-10", status: "Active" as const },
  { name: "Tom Fischer",      email: "tom.f@pediatricuc.ca",      role: "Read-only",   joined: "2023-08-22", status: "Inactive" as const },
];

const INTEGRATIONS = [
  { name: "Stripe Payments",      desc: "PCI-DSS Level 1 payment processing",   connected: true,  icon: CreditCard },
  { name: "Google Calendar",      desc: "NP schedule sync",                     connected: true,  icon: Globe      },
  { name: "Twilio SMS",           desc: "Appointment reminders",                connected: true,  icon: Phone      },
  { name: "SendGrid Email",       desc: "Transactional emails",                 connected: true,  icon: Mail       },
  { name: "Ontario Health (API)", desc: "Vaccination registry lookup",          connected: false, icon: Shield     },
  { name: "Slack Notifications",  desc: "Ops alerts to #alerts channel",        connected: false, icon: Bell       },
];

const TABS = ["General", "Team", "Billing", "Notifications", "Integrations", "Security"] as const;
type Tab = (typeof TABS)[number];

function AdminSettings() {
  const [tab, setTab] = useState<Tab>("General");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="System"
        title="Settings"
        sub="Organization, billing, team and integration configuration"
        action={
          <Btn variant="primary" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Btn>
        }
      />

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-[oklch(0.91_0.025_240)] overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-[oklch(0.5_0.04_250)] hover:text-foreground"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* ── General ── */}
      {tab === "General" && (
        <div className="space-y-5 max-w-2xl">
          <Card>
            <CardHeader title="Organization Profile" sub="Public-facing business information" />
            <div className="space-y-4">
              <Field label="Organization name" defaultValue="Pediatric Urgent Care™ Ontario" />
              <Field label="Legal entity"      defaultValue="PUC Health Services Inc." />
              <Field label="Business email"    defaultValue="hello@pediatricurgentcare.ca" type="email" />
              <Field label="Support phone"     defaultValue="+1 (905) 555-0100" type="tel" />
              <Field label="Website"           defaultValue="https://pediatricurgentcare.ca" type="url" />
              <div>
                <label className="block text-xs font-bold text-[oklch(0.45_0.05_250)] mb-1.5 uppercase tracking-wide">Service Areas</label>
                <div className="flex flex-wrap gap-2">
                  {["Milton", "Halton Hills", "Hamilton", "Oakville", "Mississauga", "Burlington", "Brampton"].map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 border border-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      {c}
                      <button className="text-primary/60 hover:text-primary transition-colors">×</button>
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 rounded-full border border-dashed border-[oklch(0.78_0.025_240)] px-3 py-1 text-xs font-semibold text-[oklch(0.55_0.04_250)] hover:border-primary hover:text-primary transition-colors">
                    <Plus className="h-3 w-3" /> Add city
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Compliance & Certifications" sub="Regulatory standing and active certifications" />
            <div className="grid gap-3">
              {[
                { label: "PHIPA Compliance",    status: "Active",  exp: "Ongoing",    tone: "good"    as const },
                { label: "CNO Registration",    status: "Active",  exp: "Mar 2025",   tone: "good"    as const },
                { label: "PCI-DSS Level 1",     status: "Active",  exp: "Jun 2025",   tone: "good"    as const },
                { label: "SOC 2 Type II",       status: "Active",  exp: "Sep 2025",   tone: "good"    as const },
                { label: "PIPEDA",              status: "Active",  exp: "Ongoing",    tone: "good"    as const },
                { label: "Annual Background Checks", status: "3 due", exp: "Dec 2024", tone: "warn"  as const },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-[oklch(0.6_0.04_250)]" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.label}</p>
                      <p className="text-xs text-[oklch(0.6_0.04_250)]">Expires: {c.exp}</p>
                    </div>
                  </div>
                  <Badge tone={c.tone} dot>{c.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── Team ── */}
      {tab === "Team" && (
        <div className="space-y-5 max-w-3xl">
          <Card noPad>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
              <div>
                <h2 className="text-base font-bold text-foreground">Team Members</h2>
                <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5">{TEAM.length} admin accounts</p>
              </div>
              <Btn variant="primary" size="sm"><Plus className="h-4 w-4" /> Invite Member</Btn>
            </div>
            <ul className="divide-y divide-[oklch(0.94_0.018_240)]">
              {TEAM.map((m) => (
                <li key={m.email} className="flex items-center gap-4 px-6 py-4 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                  <Avatar name={m.name} size={38} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{m.name}</p>
                    <p className="text-xs text-[oklch(0.55_0.04_250)]">{m.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-[oklch(0.6_0.04_250)] hidden sm:block">Since {m.joined}</span>
                    <Badge tone={m.role === "Super Admin" ? "bad" : m.role === "Admin" ? "info" : "neutral"}>{m.role}</Badge>
                    <Badge tone={m.status === "Active" ? "good" : "neutral"} dot>{m.status}</Badge>
                    <button className="text-[oklch(0.6_0.04_250)] hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Role Permissions" sub="What each role can access and modify" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[oklch(0.91_0.025_240)]">
                    {["Permission", "Super Admin", "Admin", "Read-only"].map((h) => (
                      <th key={h} className="py-2.5 px-3 text-[10px] font-extrabold uppercase tracking-wider text-[oklch(0.55_0.04_250)] text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["View dashboard",    true,  true,  true  ],
                    ["Manage appointments", true, true, false ],
                    ["Edit NP profiles",  true,  true,  false ],
                    ["Access revenue",    true,  true,  false ],
                    ["Manage team",       true,  false, false ],
                    ["View audit log",    true,  true,  false ],
                    ["Change settings",   true,  false, false ],
                  ].map(([perm, sa, admin, ro]) => (
                    <tr key={perm as string} className="border-b border-[oklch(0.94_0.018_240)] last:border-b-0">
                      <td className="py-3 px-3 text-sm text-foreground">{perm as string}</td>
                      {[sa, admin, ro].map((v, i) => (
                        <td key={i} className="py-3 px-3">
                          <span className={`text-lg ${v ? "text-[oklch(0.42_0.18_150)]" : "text-[oklch(0.75_0.025_240)]"}`}>{v ? "✓" : "—"}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ── Billing ── */}
      {tab === "Billing" && (
        <div className="space-y-5 max-w-2xl">
          <Card>
            <CardHeader title="Current Plan" sub="Enterprise Healthcare — billed annually" />
            <div className="rounded-xl bg-linear-to-br from-primary/8 to-primary/4 border border-primary/15 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-display font-extrabold text-foreground">Enterprise</p>
                  <p className="text-sm text-[oklch(0.5_0.04_250)] mt-0.5">Unlimited NPs · PHIPA compliant · Priority support</p>
                </div>
                <Badge tone="good">Active</Badge>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-3xl font-display font-extrabold text-foreground">$1,200</span>
                <span className="text-sm text-[oklch(0.55_0.04_250)]">/month · billed annually</span>
              </div>
              <div className="mt-4 pt-4 border-t border-primary/12 flex items-center justify-between text-xs text-[oklch(0.55_0.04_250)]">
                <span>Next renewal: January 1, 2025</span>
                <button className="font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Manage plan →</button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Payment Method" sub="Used for plan renewals and overages" />
            <div className="flex items-center gap-4 rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] p-4">
              <CreditCard className="h-8 w-8 text-[oklch(0.52_0.13_245)]" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Visa ending in 4242</p>
                <p className="text-xs text-[oklch(0.55_0.04_250)]">Expires 08/2027 · PCI-DSS Level 1 secure</p>
              </div>
              <Btn variant="secondary" size="sm">Update</Btn>
            </div>
          </Card>

          <Card noPad>
            <div className="px-6 py-4 border-b border-[oklch(0.91_0.025_240)]">
              <h2 className="text-base font-bold text-foreground">Billing History</h2>
            </div>
            <ul className="divide-y divide-[oklch(0.94_0.018_240)]">
              {["Nov 2024", "Oct 2024", "Sep 2024", "Aug 2024"].map((month) => (
                <li key={month} className="flex items-center justify-between px-6 py-4 hover:bg-[oklch(0.975_0.012_240)] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Enterprise Plan — {month}</p>
                    <p className="text-xs text-[oklch(0.55_0.04_250)]">Annual plan · 1/12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">$1,200.00</span>
                    <Badge tone="good">Paid</Badge>
                    <button className="text-xs font-semibold text-primary hover:text-[oklch(0.46_0.13_245)]">Invoice</button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* ── Notifications ── */}
      {tab === "Notifications" && (
        <div className="space-y-5 max-w-2xl">
          <Card>
            <CardHeader title="Alert Preferences" sub="Choose which events trigger admin notifications" />
            <div className="space-y-1">
              {[
                { label: "New booking confirmed",        email: true,  sms: false, push: true  },
                { label: "Booking cancelled",            email: true,  sms: true,  push: true  },
                { label: "NP utilization below 60%",     email: true,  sms: false, push: false },
                { label: "Revenue target reached",       email: true,  sms: false, push: true  },
                { label: "New patient complaint",        email: true,  sms: true,  push: true  },
                { label: "Failed login attempt",         email: true,  sms: true,  push: true  },
                { label: "PHI access outside hours",     email: true,  sms: true,  push: true  },
                { label: "Daily operations summary",     email: true,  sms: false, push: false },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl hover:bg-[oklch(0.975_0.012_240)] px-3 py-3 transition-colors">
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <div className="flex items-center gap-5">
                    {[["Email", n.email], ["SMS", n.sms], ["Push", n.push]].map(([ch, on]) => (
                      <label key={ch as string} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={on as boolean} className="h-4 w-4 rounded accent-primary cursor-pointer" />
                        <span className="text-[11px] text-[oklch(0.55_0.04_250)] font-semibold">{ch as string}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── Integrations ── */}
      {tab === "Integrations" && (
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
          {INTEGRATIONS.map((ig) => (
            <Card key={ig.name} className="flex items-start gap-4">
              <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ig.connected ? "bg-primary/10 text-primary" : "bg-[oklch(0.93_0.02_240)] text-[oklch(0.55_0.04_250)]"}`}>
                <ig.icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-foreground text-sm">{ig.name}</p>
                  <Badge tone={ig.connected ? "good" : "neutral"} dot>{ig.connected ? "Connected" : "Inactive"}</Badge>
                </div>
                <p className="text-xs text-[oklch(0.55_0.04_250)] mt-0.5 mb-3">{ig.desc}</p>
                <Btn variant={ig.connected ? "secondary" : "primary"} size="sm">
                  {ig.connected ? "Configure" : "Connect"}
                </Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Security ── */}
      {tab === "Security" && (
        <div className="space-y-5 max-w-2xl">
          <Card>
            <CardHeader title="Authentication" sub="Login security settings for admin accounts" />
            <div className="space-y-4">
              {[
                { label: "Two-factor authentication (2FA)", desc: "Required for all admin accounts", enabled: true },
                { label: "SSO / SAML",                      desc: "Single sign-on via your identity provider", enabled: false },
                { label: "Session timeout",                 desc: "Auto-logout after 4 hours of inactivity",   enabled: true },
                { label: "IP allowlist",                    desc: "Restrict console access to known IPs",       enabled: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] px-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.label}</p>
                    <p className="text-xs text-[oklch(0.6_0.04_250)] mt-0.5">{s.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input type="checkbox" defaultChecked={s.enabled} className="sr-only peer" />
                    <div className="w-10 h-5.5 bg-[oklch(0.85_0.025_240)] peer-checked:bg-primary rounded-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:after:translate-x-4.5" />
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Data & Privacy" sub="PHIPA compliance and data management controls" />
            <div className="space-y-3">
              <div className="rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] p-4">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" /> Data residency: Canada (ON)
                </p>
                <p className="text-xs text-[oklch(0.55_0.04_250)] mt-1">All PHI stored exclusively in Canadian data centres. Required by PHIPA.</p>
              </div>
              <div className="rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] p-4">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Retention policy: 7 years
                </p>
                <p className="text-xs text-[oklch(0.55_0.04_250)] mt-1">Clinical records retained per PHIPA requirements. Automatic archival after 7 years.</p>
              </div>
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm"><Building2 className="h-4 w-4" /> Export org data</Btn>
                <Btn variant="danger"    size="sm"><Trash2     className="h-4 w-4" /> Request deletion</Btn>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ── Shared field ── */
function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[oklch(0.45_0.05_250)] mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-[oklch(0.91_0.025_240)] bg-[oklch(0.975_0.012_240)] px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
      />
    </div>
  );
}
