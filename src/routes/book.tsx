import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Lock,
  MapPin,
  Search,
  Shield,
  Syringe,
  Thermometer,
  Activity,
  Sparkles,
} from "lucide-react";
import { IntakeAssistant } from "@/components/ai/IntakeAssistant";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Home Visit — Pediatric Urgent Care™" },
      { name: "description", content: "Book a same-day pediatric home visit in Ontario in 5 simple steps." },
    ],
  }),
  component: BookPage,
});

const STEPS = ["Area", "Visit Type", "Date & Time", "Patient", "Review & Pay"];

const VISIT_TYPES = [
  { id: "sick", title: "Sick Visit", desc: "Fever, infection, rash, ear pain, cough", price: 149, icon: Thermometer, popular: true },
  { id: "vacc", title: "Vaccination", desc: "Routine and travel vaccines", price: 99, icon: Syringe },
  { id: "follow", title: "Follow-up Visit", desc: "Post-illness or post-hospital", price: 119, icon: ClipboardList },
  { id: "well", title: "Well-child Checkup", desc: "Annual development assessment", price: 179, icon: Activity },
];

const CITIES = ["Milton", "Halton Hills", "Hamilton", "Oakville", "Mississauga", "Burlington", "Brampton"];

// Ontario FSA → city + ETA lookup
const FSA_MAP: Record<string, { city: string; eta: number; travel: number }> = {
  L9T: { city: "Milton", eta: 75, travel: 0 }, L9E: { city: "Milton", eta: 75, travel: 0 },
  L7G: { city: "Halton Hills", eta: 95, travel: 15 }, L7J: { city: "Halton Hills", eta: 95, travel: 15 },
  L8E: { city: "Hamilton", eta: 70, travel: 0 }, L8H: { city: "Hamilton", eta: 70, travel: 0 }, L8N: { city: "Hamilton", eta: 70, travel: 0 }, L9C: { city: "Hamilton", eta: 70, travel: 0 },
  L6H: { city: "Oakville", eta: 78, travel: 0 }, L6J: { city: "Oakville", eta: 78, travel: 0 }, L6L: { city: "Oakville", eta: 78, travel: 0 }, L6K: { city: "Oakville", eta: 78, travel: 0 },
  L4Z: { city: "Mississauga", eta: 65, travel: 0 }, L4W: { city: "Mississauga", eta: 65, travel: 0 }, L5B: { city: "Mississauga", eta: 65, travel: 0 }, L5M: { city: "Mississauga", eta: 65, travel: 0 }, L5R: { city: "Mississauga", eta: 65, travel: 0 }, L5V: { city: "Mississauga", eta: 65, travel: 0 },
  L7L: { city: "Burlington", eta: 85, travel: 0 }, L7M: { city: "Burlington", eta: 85, travel: 0 }, L7P: { city: "Burlington", eta: 85, travel: 0 }, L7R: { city: "Burlington", eta: 85, travel: 0 },
  L6P: { city: "Brampton", eta: 90, travel: 10 }, L6R: { city: "Brampton", eta: 90, travel: 10 }, L6S: { city: "Brampton", eta: 90, travel: 10 }, L6T: { city: "Brampton", eta: 90, travel: 10 }, L6V: { city: "Brampton", eta: 90, travel: 10 },
};

function validatePostal(raw: string): { valid: boolean; fsa: string; match: { city: string; eta: number; travel: number } | null } {
  const normalized = raw.toUpperCase().replace(/\s+/g, "").slice(0, 6);
  const valid = /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(normalized);
  const fsa = normalized.slice(0, 3);
  return { valid, fsa, match: valid ? FSA_MAP[fsa] ?? null : null };
}

function BookPage() {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [areaCheck, setAreaCheck] = useState<null | { ok: boolean; reason: string; eta?: number; travel?: number }>(null);

  const [visit, setVisit] = useState<string>("sick");

  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [weekend, setWeekend] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const [child, setChild] = useState({ name: "", dob: "", concern: "", duration: "Today", allergies: "", meds: "", notes: "" });
  const [parent, setParent] = useState({ name: "", phone: "", email: "", address: "" });
  const [consent, setConsent] = useState(false);

  const selected = VISIT_TYPES.find((v) => v.id === visit)!;
  const travelFee = areaCheck?.travel ?? 0;
  const subtotal = selected.price + (weekend ? 20 : 0) + (urgent ? 30 : 0) + travelFee;
  const hst = +(subtotal * 0.13).toFixed(2);
  const total = +(subtotal + hst).toFixed(2);

  const canContinue = useMemo(() => {
    if (step === 0) return areaCheck?.ok === true;
    if (step === 1) return !!visit;
    if (step === 2) return !!date && !!slot;
    if (step === 3)
      return child.name && child.dob && child.concern && parent.name && parent.phone && parent.email && parent.address && consent;
    return true;
  }, [step, areaCheck, visit, date, slot, child, parent, consent]);

  if (confirmed) return <Confirmation total={total} city={city} visit={selected.title} date={date} slot={slot} child={child.name} />;

  return (
    <div className="bg-background min-h-[80vh]">
      <div className="container-page py-10 lg:py-14 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-secondary-ink hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <ProgressBar step={step} />

        <div className="mt-10 rounded-3xl border border-border bg-surface shadow-soft p-6 sm:p-10">
          {step === 0 && (
            <Step title="Let's make sure we serve your area">
              <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">Postal Code</span>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-ink" />
                    <input
                      placeholder="L9T 1A1"
                      value={postal}
                      maxLength={7}
                      onChange={(e) => { setPostal(e.target.value); setAreaCheck(null); }}
                      className="w-full rounded-lg border border-border bg-surface pl-10 pr-3 py-3 text-base font-mono uppercase tracking-wider outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">Or select city</span>
                  <select
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setAreaCheck(null); }}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-3 outline-none focus:border-primary"
                  >
                    <option value="">Select city</option>
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
              </div>
              <button
                onClick={() => {
                  if (postal) {
                    const r = validatePostal(postal);
                    if (!r.valid) { setAreaCheck({ ok: false, reason: "Invalid Canadian postal code format (e.g. L9T 1A1)" }); return; }
                    if (!r.match) { setAreaCheck({ ok: false, reason: `FSA ${r.fsa} is outside our service area — join our waitlist!` }); return; }
                    setCity(r.match.city);
                    setAreaCheck({ ok: true, reason: r.match.city, eta: r.match.eta, travel: r.match.travel });
                    return;
                  }
                  if (city) {
                    const m = Object.values(FSA_MAP).find((v) => v.city === city);
                    setAreaCheck({ ok: true, reason: city, eta: m?.eta ?? 80, travel: m?.travel ?? 0 });
                    return;
                  }
                  setAreaCheck({ ok: false, reason: "Please enter a postal code or select a city" });
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 btn-press"
              >
                Check availability <ArrowRight className="h-4 w-4" />
              </button>
              {areaCheck?.ok && (
                <div className="mt-5 rounded-xl border-2 border-success/40 bg-success/10 p-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-display font-bold text-[oklch(0.35_0.15_150)]">You're covered in {areaCheck.reason}</p>
                      <p className="mt-0.5 text-secondary-ink">ETA <b className="text-foreground">~{areaCheck.eta} min</b>{(areaCheck.travel ?? 0) > 0 && <> · Travel fee <b className="text-foreground">+${areaCheck.travel}</b></>}</p>
                    </div>
                  </div>
                </div>
              )}
              {areaCheck && !areaCheck.ok && (
                <div className="mt-5 rounded-xl border-2 border-destructive/40 bg-destructive/10 p-4 text-sm font-semibold text-destructive">
                  {areaCheck.reason}
                </div>
              )}
            </Step>
          )}

          {step === 1 && (
            <Step title="What does your child need today?">
              <div className="grid gap-4 sm:grid-cols-2">
                {VISIT_TYPES.map((v) => {
                  const active = visit === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVisit(v.id)}
                      className={`relative text-left rounded-2xl border-2 p-5 transition-all ${
                        active ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
                      }`}
                    >
                      {v.popular && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-warm/15 text-[oklch(0.5_0.18_40)] px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                          <Sparkles className="h-3 w-3" /> Most popular
                        </span>
                      )}
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <v.icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-lg">{v.title}</h3>
                      <p className="mt-1 text-sm text-secondary-ink">{v.desc}</p>
                      <p className="mt-3 text-sm font-bold text-primary">from ${v.price}</p>
                      {active && (
                        <span className="absolute top-3 left-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="When works for you?">
              <MiniCalendar value={date} onChange={setDate} onUrgentToggle={setUrgent} />
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary-ink">Morning · 7–11am</p>
                <SlotRow slots={["7:30", "8:30", "9:30", "10:30"]} slot={slot} setSlot={setSlot} urgent={urgent} />
                <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-secondary-ink">Afternoon · 12–4pm</p>
                <SlotRow slots={["12:30", "1:30", "2:30", "3:30"]} slot={slot} setSlot={setSlot} disabled={[1]} />
                <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-secondary-ink">Evening · 5–9pm</p>
                <SlotRow slots={["5:30", "6:30", "7:30 PM", "8:30 PM"]} slot={slot} setSlot={setSlot} />
              </div>
              <label className="mt-6 inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={weekend} onChange={(e) => setWeekend(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />
                This is a weekend booking (+$20)
              </label>
            </Step>
          )}

          {step === 3 && (
            <Step title="Tell us about your child">
              <IntakeToggleSection child={child} setChild={setChild} />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Child's first name" value={child.name} onChange={(v) => setChild({ ...child, name: v })} />
                <TextField label="Date of birth" type="date" value={child.dob} onChange={(v) => setChild({ ...child, dob: v })} />
                <div className="sm:col-span-2">
                  <TextArea label="Main concern / symptoms" value={child.concern} onChange={(v) => setChild({ ...child, concern: v })} />
                </div>
                <SelectField
                  label="Duration of symptoms"
                  value={child.duration}
                  onChange={(v) => setChild({ ...child, duration: v })}
                  options={["Today", "1–3 days", "3–7 days", "1+ week"]}
                />
                <TextField label="Allergies (optional)" value={child.allergies} onChange={(v) => setChild({ ...child, allergies: v })} />
                <div className="sm:col-span-2">
                  <TextField label="Current medications (optional)" value={child.meds} onChange={(v) => setChild({ ...child, meds: v })} />
                </div>
                <div className="sm:col-span-2">
                  <TextArea label="Additional notes (optional)" value={child.notes} onChange={(v) => setChild({ ...child, notes: v })} />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg">Parent / Guardian</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <TextField label="Full name" value={parent.name} onChange={(v) => setParent({ ...parent, name: v })} />
                  <TextField label="Phone" type="tel" value={parent.phone} onChange={(v) => setParent({ ...parent, phone: v })} />
                  <TextField label="Email" type="email" value={parent.email} onChange={(v) => setParent({ ...parent, email: v })} />
                  <TextField label="Home address" value={parent.address} onChange={(v) => setParent({ ...parent, address: v })} />
                </div>

                <label className="mt-6 flex items-start gap-2 text-sm text-secondary-ink">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--color-primary)]" />
                  I consent to the collection of health information as per PHIPA.
                </label>
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step title="Review your booking">
              <div className="rounded-2xl border border-border p-5 bg-background/40">
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <Line label="City" value={city || "Selected"} icon={MapPin} />
                  <Line label="Visit type" value={selected.title} icon={selected.icon} />
                  <Line label="Date" value={date || "—"} icon={CalendarIcon} />
                  <Line label="Time" value={slot || "—"} icon={CalendarIcon} />
                  <Line label="Child" value={child.name || "—"} icon={Activity} />
                  <Line label="Nurse Practitioner" value="To be assigned" icon={Shield} />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border p-5">
                <h4 className="font-display font-bold">Pricing</h4>
                <dl className="mt-3 space-y-2 text-sm">
                  <Row label="Base visit fee" value={`$${selected.price.toFixed(2)}`} />
                  {weekend && <Row label="Weekend surcharge" value="+$20.00" />}
                  {urgent && <Row label="Urgent booking fee" value="+$30.00" />}
                  {travelFee > 0 && <Row label={`Travel fee (${areaCheck?.reason})`} value={`+$${travelFee.toFixed(2)}`} />}
                  <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                  <Row label="HST (13%)" value={`$${hst.toFixed(2)}`} />
                  <div className="pt-2 mt-2 border-t border-border">
                    <Row label="Total" value={`$${total.toFixed(2)}`} bold />
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-2xl border border-border p-5">
                <h4 className="font-display font-bold flex items-center gap-2"><CreditCard className="h-4 w-4 text-primary" /> Payment</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px_120px]">
                  <input placeholder="Card number" className="rounded-lg border border-border px-3 py-3 text-sm focus:border-primary outline-none bg-surface" />
                  <input placeholder="MM / YY" className="rounded-lg border border-border px-3 py-3 text-sm focus:border-primary outline-none bg-surface" />
                  <input placeholder="CVC" className="rounded-lg border border-border px-3 py-3 text-sm focus:border-primary outline-none bg-surface" />
                </div>
                <details className="mt-3 text-sm text-secondary-ink">
                  <summary className="cursor-pointer font-semibold text-primary">Have a promo code?</summary>
                  <input placeholder="Enter code" className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface" />
                </details>
              </div>

              <button
                onClick={() => setConfirmed(true)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm px-7 py-4 text-base font-bold text-warm-foreground shadow-lift hover:brightness-105 btn-press"
              >
                Confirm & Pay ${total.toFixed(2)}
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-secondary-ink">
                <Lock className="h-3.5 w-3.5" /> 256-bit SSL · Powered by Stripe · Your card is never stored.
              </p>
            </Step>
          )}

          <div className="mt-10 flex justify-between gap-3">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-secondary-ink hover:text-primary disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 && (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={!canContinue}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:brightness-110 btn-press"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done ? "bg-success text-white" : active ? "bg-primary text-primary-foreground" : "bg-border text-secondary-ink"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden sm:inline text-xs font-semibold ${active ? "text-primary" : "text-secondary-ink"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mt-3 h-1 rounded-full ${done ? "bg-success" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function MiniCalendar({ value, onChange, onUrgentToggle }: { value: string; onChange: (v: string) => void; onUrgentToggle: (v: boolean) => void }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const monthLabel = today.toLocaleString("en-US", { month: "long", year: "numeric" });
  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between">
        <p className="font-display font-bold">{monthLabel}</p>
        <span className="text-xs text-secondary-ink">Select a date</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-secondary-ink">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const isPast = d < today.getDate();
          const isToday = d === today.getDate();
          const dateStr = `${monthLabel} ${d}`;
          const active = value === dateStr;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => {
                onChange(dateStr);
                onUrgentToggle(isToday);
              }}
              className={`relative aspect-square rounded-lg text-sm font-semibold transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : isPast
                    ? "text-secondary-ink/30 cursor-not-allowed"
                    : "hover:bg-accent text-foreground"
              }`}
            >
              {d}
              {isToday && !active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-warm" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SlotRow({ slots, slot, setSlot, disabled = [], urgent = false }: { slots: string[]; slot: string; setSlot: (s: string) => void; disabled?: number[]; urgent?: boolean }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {slots.map((s, i) => {
        const isDisabled = disabled.includes(i);
        const active = slot === s;
        return (
          <button
            key={s}
            disabled={isDisabled}
            onClick={() => setSlot(s)}
            className={`relative rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : isDisabled
                  ? "border-border text-secondary-ink/40 line-through cursor-not-allowed"
                  : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            {s}
            {urgent && i === 0 && !active && (
              <span className="absolute -top-2 -right-2 rounded-full bg-warm text-warm-foreground text-[9px] font-bold px-1.5 py-0.5 tracking-wider">
                URGENT
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">{label}</span>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y" />
    </label>
  );
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Line({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-secondary-ink">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-lg font-bold" : ""}`}>
      <span className="text-secondary-ink">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function Confirmation({ total, city, visit, date, slot, child }: { total: number; city: string; visit: string; date: string; slot: string; child: string }) {
  return (
    <div className="container-page py-20 max-w-2xl text-center">
      <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-10 w-10 text-success animate-in zoom-in duration-500" />
      </div>
      <h1 className="mt-6 text-4xl">Booking Confirmed!</h1>
      <p className="mt-2 text-secondary-ink">Reference: <span className="font-mono font-bold text-foreground">PUC-{Math.floor(Math.random() * 9000 + 1000)}</span></p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left shadow-soft">
        <p className="text-sm text-secondary-ink">Summary</p>
        <div className="mt-3 grid gap-2 text-sm">
          <Row label="City" value={city || "—"} />
          <Row label="Visit" value={visit} />
          <Row label="Date" value={date || "—"} />
          <Row label="Time" value={slot || "—"} />
          <Row label="Child" value={child || "—"} />
          <div className="pt-2 mt-2 border-t border-border">
            <Row label="Paid" value={`$${total.toFixed(2)}`} bold />
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-secondary-ink">You'll receive a confirmation email and SMS within 5 minutes.</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">Track your NP</button>
        <button className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-primary">Add to Calendar</button>
      </div>

      <Link to="/" className="mt-8 inline-block text-sm text-primary underline underline-offset-4">Back to home</Link>
    </div>
  );
}

function IntakeToggleSection({
  child,
  setChild,
}: {
  child: { name: string; dob: string; concern: string; duration: string; allergies: string; meds: string; notes: string };
  setChild: (c: { name: string; dob: string; concern: string; duration: string; allergies: string; meds: string; notes: string }) => void;
}) {
  const [useAi, setUseAi] = useState(false);

  if (useAi) {
    return (
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> AI Intake Assistant
          </p>
          <button
            type="button"
            onClick={() => setUseAi(false)}
            className="text-xs font-semibold text-secondary-ink hover:text-primary"
          >
            Use classic form instead
          </button>
        </div>
        <IntakeAssistant
          initial={{
            childName: child.name,
            concern: child.concern,
            duration: child.duration,
          }}
          onComplete={(d) =>
            setChild({
              ...child,
              name: d.childName,
              concern: d.concern,
              duration: d.duration,
              allergies: d.allergies,
              meds: d.medications,
              notes: [child.notes, d.associated.length ? `Associated: ${d.associated.join(", ")}` : ""].filter(Boolean).join("\n"),
            })
          }
        />
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>
          <span className="font-semibold">Try our AI Intake Assistant</span> — answer a few quick questions instead of filling the form.
        </span>
      </div>
      <button
        type="button"
        onClick={() => setUseAi(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
      >
        Start chat <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}