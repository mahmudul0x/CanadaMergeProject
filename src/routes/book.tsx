// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity, ArrowLeft, ArrowRight, BadgeCheck, Brain,
  CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight,
  ClipboardList, Clock, CreditCard, Lock, MapPin,
  Phone, Search, Shield, ShieldCheck, Sparkles, Stethoscope,
  Syringe, Thermometer, User, Zap,
} from "lucide-react";
import { IntakeAssistant } from "@/components/ai/IntakeAssistant";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Home Visit — Pediatric Urgent Care™" },
      { name: "description", content: "Book a same-day pediatric home visit in Ontario in minutes." },
    ],
  }),
  component: BookPage,
});

/* ── Constants ── */
const STEPS = [
  { label: "Location",    icon: MapPin        },
  { label: "Visit Type",  icon: Stethoscope   },
  { label: "Date & Time", icon: CalendarDays  },
  { label: "Patient",     icon: User          },
  { label: "Review & Pay",icon: CreditCard    },
];

const VISIT_TYPES = [
  { id: "sick",   title: "Sick Visit",         desc: "Fever, infection, rash, ear pain, cough & more",  price: 149, duration: "45–60 min", icon: Thermometer, popular: true  },
  { id: "vacc",   title: "Vaccination",         desc: "All routine Ontario schedule vaccines at home",    price: 99,  duration: "20–30 min", icon: Syringe,     popular: false },
  { id: "follow", title: "Follow-up Visit",     desc: "Post-illness or post-hospital monitoring",        price: 119, duration: "30–45 min", icon: ClipboardList,popular: false },
  { id: "well",   title: "Well-child Checkup",  desc: "Annual growth & developmental assessment",        price: 179, duration: "60–75 min", icon: Activity,    popular: false },
];

const CITIES = ["Milton","Halton Hills","Hamilton","Oakville","Mississauga","Burlington","Brampton"];

const FSA_MAP: Record<string, { city: string; eta: number; travel: number }> = {
  L9T: { city: "Milton",      eta: 75, travel: 0  }, L9E: { city: "Milton",      eta: 75, travel: 0  },
  L7G: { city: "Halton Hills",eta: 95, travel: 15 }, L7J: { city: "Halton Hills",eta: 95, travel: 15 },
  L8E: { city: "Hamilton",    eta: 70, travel: 0  }, L8H: { city: "Hamilton",    eta: 70, travel: 0  },
  L8N: { city: "Hamilton",    eta: 70, travel: 0  }, L9C: { city: "Hamilton",    eta: 70, travel: 0  },
  L6H: { city: "Oakville",    eta: 78, travel: 0  }, L6J: { city: "Oakville",    eta: 78, travel: 0  },
  L6L: { city: "Oakville",    eta: 78, travel: 0  }, L6K: { city: "Oakville",    eta: 78, travel: 0  },
  L4Z: { city: "Mississauga", eta: 65, travel: 0  }, L4W: { city: "Mississauga", eta: 65, travel: 0  },
  L5B: { city: "Mississauga", eta: 65, travel: 0  }, L5M: { city: "Mississauga", eta: 65, travel: 0  },
  L5R: { city: "Mississauga", eta: 65, travel: 0  }, L5V: { city: "Mississauga", eta: 65, travel: 0  },
  L7L: { city: "Burlington",  eta: 85, travel: 0  }, L7M: { city: "Burlington",  eta: 85, travel: 0  },
  L7P: { city: "Burlington",  eta: 85, travel: 0  }, L7R: { city: "Burlington",  eta: 85, travel: 0  },
  L6P: { city: "Brampton",    eta: 90, travel: 10 }, L6R: { city: "Brampton",    eta: 90, travel: 10 },
  L6S: { city: "Brampton",    eta: 90, travel: 10 }, L6T: { city: "Brampton",    eta: 90, travel: 10 },
  L6V: { city: "Brampton",    eta: 90, travel: 10 },
};

function validatePostal(raw: string) {
  const normalized = raw.toUpperCase().replace(/\s+/g, "").slice(0, 6);
  const valid = /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(normalized);
  const fsa = normalized.slice(0, 3);
  return { valid, fsa, match: valid ? FSA_MAP[fsa] ?? null : null };
}

/* ─────────────────────── Main Page ─────────────────────── */
function BookPage() {
  const [step, setStep]           = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [postal, setPostal]       = useState("");
  const [city, setCity]           = useState("");
  const [areaCheck, setAreaCheck] = useState<null | { ok: boolean; reason: string; eta?: number; travel?: number }>(null);
  const [visit, setVisit]         = useState("sick");
  const [date, setDate]           = useState("");
  const [slot, setSlot]           = useState("");
  const [weekend, setWeekend]     = useState(false);
  const [urgent, setUrgent]       = useState(false);
  const [child, setChild]         = useState({ name: "", dob: "", concern: "", duration: "Today", allergies: "", meds: "", notes: "" });
  const [parent, setParent]       = useState({ name: "", phone: "", email: "", address: "" });
  const [consent, setConsent]     = useState(false);

  const selected   = VISIT_TYPES.find((v) => v.id === visit)!;
  const travelFee  = areaCheck?.travel ?? 0;
  const subtotal   = selected.price + (weekend ? 20 : 0) + (urgent ? 30 : 0) + travelFee;
  const hst        = +(subtotal * 0.13).toFixed(2);
  const total      = +(subtotal + hst).toFixed(2);

  const canContinue = useMemo(() => {
    if (step === 0) return areaCheck?.ok === true;
    if (step === 1) return !!visit;
    if (step === 2) return !!date && !!slot;
    if (step === 3) return !!(child.name && child.dob && child.concern && parent.name && parent.phone && parent.email && parent.address && consent);
    return true;
  }, [step, areaCheck, visit, date, slot, child, parent, consent]);

  if (confirmed) return <Confirmation total={total} city={city} visit={selected.title} date={date} slot={slot} child={child.name} />;

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E0EAF4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4A6580] hover:text-[#1B6CA8] transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2.5 text-[12px] text-[#4A6580]">
            <ShieldCheck className="h-4 w-4 text-[#2ECC8B]" /> PHIPA Secure
            <span className="mx-1.5 text-[#D6E4F0]">·</span>
            <Lock className="h-3.5 w-3.5 text-[#1B6CA8]" /> SSL Encrypted
            <span className="mx-1.5 text-[#D6E4F0]">·</span>
            <BadgeCheck className="h-3.5 w-3.5 text-[#1B6CA8]" /> CNO Licensed NPs
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ── Main booking panel ── */}
          <div>
            {/* Step indicator */}
            <div className="bg-white rounded-2xl border border-[#E0EAF4] shadow-sm px-6 py-5 mb-5">
              <div className="flex items-center">
                {STEPS.map((s, i) => {
                  const done   = i < step;
                  const active = i === step;
                  return (
                    <div key={s.label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-all
                          ${done   ? "bg-[#2ECC8B] text-white shadow-sm"
                          : active ? "bg-[#1B6CA8] text-white shadow-[0_2px_8px_rgba(27,108,168,0.35)]"
                          :          "bg-[#EEF4FB] text-[#4A6580]"}`}>
                          {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                        </span>
                        <span className={`hidden sm:block text-[10px] font-bold whitespace-nowrap
                          ${active ? "text-[#1B6CA8]" : done ? "text-[#2ECC8B]" : "text-[#4A6580]"}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-[2px] mx-2 rounded-full transition-all ${done ? "bg-[#2ECC8B]" : "bg-[#E0EAF4]"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step content card */}
            <div className="bg-white rounded-2xl border border-[#E0EAF4] shadow-sm overflow-hidden">
              {/* Step header */}
              <div className="px-7 py-5 border-b border-[#E0EAF4] bg-[#F7FAFE]">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#1B6CA8]">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h1 className="mt-1 font-display font-bold text-[20px] sm:text-[22px] text-[#0D1B2A]">
                  {step === 0 && "Where do you need care?"}
                  {step === 1 && "What does your child need today?"}
                  {step === 2 && "Pick a date & time that works for you"}
                  {step === 3 && "Tell us about your child"}
                  {step === 4 && "Review & confirm your booking"}
                </h1>
              </div>

              <div className="px-7 py-7">
                {/* ── Step 0: Location ── */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Postal code */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-2">
                          Enter Postal Code
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A6580]" />
                          <input
                            placeholder="e.g. L9T 1A1"
                            value={postal}
                            maxLength={7}
                            onChange={(e) => { setPostal(e.target.value); setAreaCheck(null); }}
                            className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] pl-10 pr-4 py-3 text-[14px] font-mono uppercase tracking-wider outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all"
                          />
                        </div>
                      </div>

                      {/* City dropdown */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-2">
                          Or Select City
                        </label>
                        <select
                          value={city}
                          onChange={(e) => { setCity(e.target.value); setAreaCheck(null); }}
                          className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-3 text-[14px] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all"
                        >
                          <option value="">Choose a city…</option>
                          {CITIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (postal) {
                          const r = validatePostal(postal);
                          if (!r.valid) { setAreaCheck({ ok: false, reason: "Invalid postal code format (e.g. L9T 1A1)" }); return; }
                          if (!r.match) { setAreaCheck({ ok: false, reason: `Postal code ${r.fsa} is outside our current service area.` }); return; }
                          setCity(r.match.city);
                          setAreaCheck({ ok: true, reason: r.match.city, eta: r.match.eta, travel: r.match.travel });
                        } else if (city) {
                          const m = Object.values(FSA_MAP).find((v) => v.city === city);
                          setAreaCheck({ ok: true, reason: city, eta: m?.eta ?? 80, travel: m?.travel ?? 0 });
                        } else {
                          setAreaCheck({ ok: false, reason: "Please enter a postal code or select a city." });
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-[#1B6CA8] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#155892] transition-colors shadow-sm"
                    >
                      <MapPin className="h-4 w-4" /> Check Availability
                    </button>

                    {/* Result */}
                    {areaCheck?.ok && (
                      <div className="flex items-start gap-4 rounded-2xl border-2 border-[#2ECC8B]/30 bg-[#ECFDF5] p-5">
                        <div className="h-10 w-10 rounded-full bg-[#2ECC8B]/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-[#059669]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[15px] text-[#065F46]">
                            Great news — we serve {areaCheck.reason}!
                          </p>
                          <div className="mt-2 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#047857]">
                              <Clock className="h-3.5 w-3.5" /> ETA ~{areaCheck.eta} min
                            </span>
                            {(areaCheck.travel ?? 0) > 0 && (
                              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#047857]">
                                <Zap className="h-3.5 w-3.5" /> Travel fee +${areaCheck.travel}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#047857]">
                              <Stethoscope className="h-3.5 w-3.5" /> NPs available today
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {areaCheck && !areaCheck.ok && (
                      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] font-semibold text-red-700">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-red-500" />
                        </div>
                        {areaCheck.reason}
                        <Link to="/contact" className="ml-auto text-[#1B6CA8] hover:underline font-bold shrink-0">Join waitlist →</Link>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Step 1: Visit Type ── */}
                {step === 1 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {VISIT_TYPES.map((v) => {
                      const active = visit === v.id;
                      return (
                        <button key={v.id} onClick={() => setVisit(v.id)}
                          className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 group
                            ${active ? "border-[#1B6CA8] bg-[#EEF4FB] shadow-[0_2px_12px_rgba(27,108,168,0.15)]"
                                     : "border-[#E0EAF4] bg-white hover:border-[#B8D0E8] hover:shadow-sm"}`}>
                          {v.popular && (
                            <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 bg-[#FF6B35] text-white text-[9px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">
                              <Sparkles className="h-2.5 w-2.5" /> Most Booked
                            </span>
                          )}
                          {active && (
                            <span className="absolute top-3.5 left-3.5 h-6 w-6 rounded-full bg-[#1B6CA8] flex items-center justify-center">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </span>
                          )}
                          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors
                            ${active ? "bg-[#1B6CA8] text-white" : "bg-[#EEF4FB] text-[#1B6CA8]"}`}>
                            <v.icon className="h-6 w-6" />
                          </span>
                          <h3 className={`mt-4 font-display font-bold text-[15px] ${active ? "text-[#1B6CA8]" : "text-[#0D1B2A]"}`}>
                            {v.title}
                          </h3>
                          <p className="mt-1 text-[12px] text-[#4A6580] leading-snug">{v.desc}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-display font-extrabold text-[18px] text-[#0D1B2A]">${v.price}</span>
                            <span className="text-[11px] text-[#4A6580] flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {v.duration}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Step 2: Date & Time ── */}
                {step === 2 && (
                  <div className="space-y-6">
                    <MiniCalendar value={date} onChange={setDate} onUrgentToggle={setUrgent} />

                    {date && (
                      <div>
                        <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-3">Available Time Slots</p>
                        <div className="space-y-4">
                          {[
                            { label: "Morning", range: "7:00 AM – 12:00 PM", slots: ["7:30 AM","8:30 AM","9:30 AM","10:30 AM"], disabled: [] },
                            { label: "Afternoon", range: "12:00 PM – 5:00 PM", slots: ["12:30 PM","1:30 PM","2:30 PM","3:30 PM"], disabled: [1] },
                            { label: "Evening",  range: "5:00 PM – 10:00 PM", slots: ["5:30 PM","6:30 PM","7:30 PM","8:30 PM"],  disabled: [] },
                          ].map((group) => (
                            <div key={group.label}>
                              <div className="flex items-center gap-2 mb-2">
                                <p className="text-[12px] font-bold text-[#0D1B2A]">{group.label}</p>
                                <span className="text-[11px] text-[#4A6580]">{group.range}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {group.slots.map((s, i) => {
                                  const isDisabled = group.disabled.includes(i);
                                  const active = slot === s;
                                  return (
                                    <button key={s} disabled={isDisabled} onClick={() => setSlot(s)}
                                      className={`px-4 py-2 rounded-xl text-[13px] font-semibold border transition-all
                                        ${active    ? "bg-[#1B6CA8] text-white border-[#1B6CA8] shadow-sm"
                                        : isDisabled ? "border-[#E0EAF4] text-[#C0CDD8] line-through cursor-not-allowed"
                                        :              "border-[#D6E4F0] text-[#0D1B2A] hover:border-[#1B6CA8] hover:text-[#1B6CA8] bg-white"}`}>
                                      {s}
                                      {isDisabled && <span className="ml-1 text-[10px] text-[#B0C4D8]">Full</span>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Options */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { label: "Weekend booking",  sub: "Saturday or Sunday visit",  val: weekend, set: setWeekend, surcharge: "+$20" },
                        { label: "Priority / Urgent",sub: "Next available NP dispatch", val: urgent,  set: setUrgent,  surcharge: "+$30" },
                      ].map((opt) => (
                        <button key={opt.label} onClick={() => opt.set(!opt.val)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
                            ${opt.val ? "border-[#1B6CA8] bg-[#EEF4FB]" : "border-[#E0EAF4] bg-white hover:border-[#B8D0E8]"}`}>
                          <div className={`h-5 w-5 rounded flex items-center justify-center border-2 transition-all shrink-0
                            ${opt.val ? "bg-[#1B6CA8] border-[#1B6CA8]" : "border-[#B8D0E8]"}`}>
                            {opt.val && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-[#0D1B2A]">{opt.label}</p>
                            <p className="text-[11px] text-[#4A6580]">{opt.sub}</p>
                          </div>
                          <span className="text-[12px] font-bold text-[#1B6CA8] shrink-0">{opt.surcharge}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Patient info ── */}
                {step === 3 && (
                  <div className="space-y-6">
                    {/* AI intake toggle */}
                    <IntakeToggleSection child={child} setChild={setChild} />

                    {/* Child details */}
                    <div>
                      <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-4 flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#1B6CA8] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                        Child Information
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField label="Child's first name" value={child.name} onChange={(v) => setChild({ ...child, name: v })} placeholder="e.g. Emma" />
                        <FormField label="Date of birth" type="date" value={child.dob}  onChange={(v) => setChild({ ...child, dob: v })} />
                        <div className="sm:col-span-2">
                          <FormArea label="Main concern / symptoms" value={child.concern} onChange={(v) => setChild({ ...child, concern: v })} placeholder="Describe your child's symptoms in detail..." />
                        </div>
                        <FormSelect label="Duration of symptoms" value={child.duration} onChange={(v) => setChild({ ...child, duration: v })} options={["Today","1–3 days","3–7 days","1+ week"]} />
                        <FormField label="Known allergies (optional)" value={child.allergies} onChange={(v) => setChild({ ...child, allergies: v })} placeholder="e.g. Penicillin, peanuts" />
                        <div className="sm:col-span-2">
                          <FormField label="Current medications (optional)" value={child.meds} onChange={(v) => setChild({ ...child, meds: v })} placeholder="e.g. Tylenol 160mg given at 8AM" />
                        </div>
                        <div className="sm:col-span-2">
                          <FormArea label="Additional notes (optional)" value={child.notes} onChange={(v) => setChild({ ...child, notes: v })} placeholder="Anything else the NP should know..." />
                        </div>
                      </div>
                    </div>

                    {/* Parent details */}
                    <div className="pt-4 border-t border-[#EEF2F7]">
                      <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-4 flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#1B6CA8] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                        Parent / Guardian
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField label="Full name"    value={parent.name}    onChange={(v) => setParent({ ...parent, name: v })}    placeholder="Your full name" />
                        <FormField label="Phone number" type="tel" value={parent.phone}   onChange={(v) => setParent({ ...parent, phone: v })}   placeholder="+1 (905) 000-0000" />
                        <FormField label="Email address" type="email" value={parent.email}  onChange={(v) => setParent({ ...parent, email: v })}   placeholder="you@email.com" />
                        <FormField label="Home address"  value={parent.address} onChange={(v) => setParent({ ...parent, address: v })} placeholder="Street, City, Province" />
                      </div>

                      <label className="mt-5 flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center transition-all shrink-0
                          ${consent ? "bg-[#1B6CA8] border-[#1B6CA8]" : "border-[#B8D0E8] group-hover:border-[#1B6CA8]"}`}
                          onClick={() => setConsent(!consent)}>
                          {consent && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <p className="text-[13px] text-[#4A6580] leading-relaxed">
                          I consent to the collection and use of health information in accordance with <span className="text-[#1B6CA8] font-semibold">PHIPA</span> and our <Link to="/privacy" className="text-[#1B6CA8] font-semibold hover:underline">Privacy Policy</Link>.
                        </p>
                      </label>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Review & Pay ── */}
                {step === 4 && (
                  <div className="space-y-5">
                    {/* Booking summary */}
                    <div className="rounded-2xl border border-[#E0EAF4] overflow-hidden">
                      <div className="px-5 py-3.5 bg-[#F7FAFE] border-b border-[#E0EAF4]">
                        <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#4A6580]">Booking Summary</p>
                      </div>
                      <div className="p-5 grid sm:grid-cols-2 gap-3">
                        {[
                          { label: "City",      value: city || "—",         icon: MapPin       },
                          { label: "Visit",     value: selected.title,      icon: selected.icon },
                          { label: "Date",      value: date || "—",         icon: CalendarDays },
                          { label: "Time",      value: slot || "—",         icon: Clock        },
                          { label: "Child",     value: child.name || "—",   icon: User         },
                          { label: "NP",        value: "To be assigned",    icon: Stethoscope  },
                        ].map((row) => (
                          <div key={row.label} className="flex items-center gap-2.5">
                            <span className="h-8 w-8 rounded-lg bg-[#EEF4FB] flex items-center justify-center shrink-0">
                              <row.icon className="h-4 w-4 text-[#1B6CA8]" />
                            </span>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wide text-[#4A6580]">{row.label}</p>
                              <p className="text-[13px] font-semibold text-[#0D1B2A]">{row.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="rounded-2xl border border-[#E0EAF4] overflow-hidden">
                      <div className="px-5 py-3.5 bg-[#F7FAFE] border-b border-[#E0EAF4]">
                        <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#4A6580]">Price Breakdown</p>
                      </div>
                      <div className="p-5 space-y-2.5">
                        <PriceRow label={`${selected.title} base fee`} value={`$${selected.price.toFixed(2)}`} />
                        {weekend && <PriceRow label="Weekend surcharge" value="+$20.00" />}
                        {urgent  && <PriceRow label="Priority booking fee" value="+$30.00" />}
                        {travelFee > 0 && <PriceRow label={`Travel fee (${areaCheck?.reason})`} value={`+$${travelFee.toFixed(2)}`} />}
                        <div className="pt-3 border-t border-[#E0EAF4] space-y-2">
                          <PriceRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                          <PriceRow label="HST (13%)" value={`+$${hst.toFixed(2)}`} />
                        </div>
                        <div className="pt-3 border-t border-[#E0EAF4] flex items-center justify-between">
                          <p className="font-display font-bold text-[16px] text-[#0D1B2A]">Total Due Today</p>
                          <p className="font-display font-extrabold text-[22px] text-[#1B6CA8]">${total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="rounded-2xl border border-[#E0EAF4] overflow-hidden">
                      <div className="px-5 py-3.5 bg-[#F7FAFE] border-b border-[#E0EAF4] flex items-center justify-between">
                        <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#4A6580] flex items-center gap-2">
                          <CreditCard className="h-4 w-4" /> Payment
                        </p>
                        <div className="flex items-center gap-1.5">
                          {["VISA","MC","AMEX"].map((c) => (
                            <span key={c} className="text-[9px] font-extrabold border border-[#D6E4F0] px-1.5 py-0.5 rounded text-[#4A6580]">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A6580] mb-1.5">Card Number</label>
                          <input placeholder="1234 5678 9012 3456"
                            className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-3 text-[14px] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all font-mono" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A6580] mb-1.5">Expiry</label>
                            <input placeholder="MM / YY"
                              className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-3 text-[14px] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all font-mono" />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A6580] mb-1.5">CVC</label>
                            <input placeholder="• • •"
                              className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-3 text-[14px] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all font-mono" />
                          </div>
                        </div>
                        <details className="text-[13px]">
                          <summary className="cursor-pointer font-semibold text-[#1B6CA8] hover:text-[#155892] list-none flex items-center gap-1.5">
                            <span className="text-[10px]">▶</span> Have a promo code?
                          </summary>
                          <input placeholder="Enter promo code"
                            className="mt-2.5 w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-2.5 text-[13px] outline-none focus:border-[#1B6CA8] transition-all" />
                        </details>
                      </div>
                    </div>

                    {/* Confirm button */}
                    <button onClick={() => setConfirmed(true)}
                      className="w-full flex items-center justify-center gap-3 bg-[#1B6CA8] hover:bg-[#155892] text-white font-bold text-[16px] py-4 rounded-2xl transition-all shadow-[0_4px_16px_rgba(27,108,168,0.35)] hover:-translate-y-0.5">
                      <Lock className="h-5 w-5" />
                      Confirm & Pay ${total.toFixed(2)}
                    </button>
                    <p className="text-center text-[12px] text-[#4A6580] flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" /> 256-bit SSL</span>
                      <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-[#1B6CA8]" /> Powered by Stripe</span>
                      <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-[#1B6CA8]" /> Card never stored</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-7 py-5 border-t border-[#E0EAF4] bg-[#F7FAFE] flex items-center justify-between gap-3">
                <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold text-[#4A6580] hover:text-[#1B6CA8] disabled:opacity-30 transition-colors rounded-xl hover:bg-white border border-transparent hover:border-[#E0EAF4]">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                {step < STEPS.length - 1 && (
                  <button onClick={() => canContinue && setStep((s) => s + 1)} disabled={!canContinue}
                    className="inline-flex items-center gap-2 bg-[#1B6CA8] hover:bg-[#155892] text-white font-bold px-6 py-2.5 text-[13px] rounded-xl disabled:opacity-40 transition-all shadow-sm">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-6">
            {/* Booking details card */}
            <div className="bg-white rounded-2xl border border-[#E0EAF4] shadow-sm overflow-hidden">
              <div className="bg-[#1B6CA8] px-5 py-4">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/70">Your Booking</p>
                <p className="mt-0.5 font-display font-bold text-[17px] text-white">
                  {selected.title}
                  {city && ` · ${city}`}
                </p>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { icon: MapPin,       label: "Location",  value: city || "Not selected" },
                  { icon: CalendarDays, label: "Date",      value: date || "Not selected" },
                  { icon: Clock,        label: "Time",      value: slot || "Not selected" },
                  { icon: Stethoscope,  label: "Visit",     value: selected.title         },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2.5">
                    <span className="h-7 w-7 rounded-lg bg-[#EEF4FB] flex items-center justify-center shrink-0">
                      <r.icon className="h-3.5 w-3.5 text-[#1B6CA8]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#4A6580]">{r.label}</p>
                      <p className={`text-[13px] font-semibold truncate ${r.value === "Not selected" ? "text-[#B0C4D8]" : "text-[#0D1B2A]"}`}>{r.value}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-[#EEF2F7]">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] text-[#4A6580]">Estimated total</p>
                    <p className="font-display font-extrabold text-[18px] text-[#1B6CA8]">${total.toFixed(2)}</p>
                  </div>
                  <p className="text-[10px] text-[#4A6580] mt-0.5">Includes HST · Receipt provided</p>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="bg-white rounded-2xl border border-[#E0EAF4] shadow-sm p-5 space-y-3">
              {[
                { icon: ShieldCheck, text: "PHIPA-compliant health records", color: "text-[#2ECC8B]" },
                { icon: BadgeCheck,  text: "CNO-licensed Nurse Practitioners", color: "text-[#1B6CA8]" },
                { icon: Lock,        text: "Secure Stripe payment · SSL encrypted", color: "text-[#1B6CA8]" },
                { icon: Phone,       text: "Support 7 days a week, 7AM – 10PM", color: "text-[#1B6CA8]" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2.5 text-[12px] text-[#4A6580]">
                  <t.icon className={`h-4 w-4 shrink-0 ${t.color}`} />
                  {t.text}
                </div>
              ))}
            </div>

            {/* Help */}
            <div className="bg-[#EEF4FB] rounded-2xl border border-[#D6E4F0] p-5">
              <p className="font-bold text-[13px] text-[#0D1B2A]">Need help booking?</p>
              <p className="text-[12px] text-[#4A6580] mt-1">Our team is available 7 days a week.</p>
              <a href="tel:+18335427227" className="mt-3 flex items-center gap-2 bg-white border border-[#D6E4F0] text-[#1B6CA8] text-[12px] font-bold px-4 py-2.5 rounded-xl hover:border-[#1B6CA8] transition-colors">
                <Phone className="h-4 w-4" /> 1 (833) 543-7227
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Calendar ─────────────────────── */
function MiniCalendar({ value, onChange, onUrgentToggle }: { value: string; onChange: (v: string) => void; onUrgentToggle: (v: boolean) => void }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const monthLabel = viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl border border-[#E0EAF4] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#F7FAFE] border-b border-[#E0EAF4]">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="h-8 w-8 rounded-lg border border-[#D6E4F0] flex items-center justify-center hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display font-bold text-[14px] text-[#0D1B2A]">{monthLabel}</p>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="h-8 w-8 rounded-lg border border-[#D6E4F0] flex items-center justify-center hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 px-4 pt-3 pb-1 gap-1">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-[#4A6580]">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-1 px-4 pb-4">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isPast   = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isToday  = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const dateStr  = `${monthLabel} ${d}`;
          const active   = value === dateStr;
          return (
            <button key={i} disabled={isPast} onClick={() => { onChange(dateStr); onUrgentToggle(isToday); }}
              className={`relative aspect-square rounded-xl text-[13px] font-semibold transition-all
                ${active    ? "bg-[#1B6CA8] text-white shadow-sm"
                : isPast    ? "text-[#C0CDD8] cursor-not-allowed"
                : isToday   ? "border-2 border-[#1B6CA8] text-[#1B6CA8] font-bold hover:bg-[#EEF4FB]"
                :             "text-[#0D1B2A] hover:bg-[#EEF4FB] hover:text-[#1B6CA8]"}`}>
              {d}
              {isToday && !active && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#1B6CA8]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────── Form fields ─────────────────────── */
function FormField({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-2.5 text-[13px] text-[#0D1B2A] placeholder:text-[#B0C4D8] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all" />
    </div>
  );
}
function FormArea({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-1.5">{label}</label>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-2.5 text-[13px] text-[#0D1B2A] placeholder:text-[#B0C4D8] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all resize-none" />
    </div>
  );
}
function FormSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4A6580] mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#D6E4F0] bg-[#F7FAFE] px-4 py-2.5 text-[13px] text-[#0D1B2A] outline-none focus:border-[#1B6CA8] focus:ring-2 focus:ring-[#1B6CA8]/15 transition-all">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function PriceRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-bold" : ""}`}>
      <span className={`text-[13px] ${bold ? "text-[#0D1B2A]" : "text-[#4A6580]"}`}>{label}</span>
      <span className={`text-[13px] tabular-nums ${bold ? "text-[#1B6CA8] text-[16px] font-extrabold" : "text-[#0D1B2A] font-semibold"}`}>{value}</span>
    </div>
  );
}

/* ─────────────────────── AI Toggle ─────────────────────── */
function IntakeToggleSection({ child, setChild }: {
  child: { name: string; dob: string; concern: string; duration: string; allergies: string; meds: string; notes: string };
  setChild: (c: typeof child) => void;
}) {
  const [useAi, setUseAi] = useState(false);
  if (useAi) {
    return (
      <div className="rounded-2xl border border-[#1B6CA8]/20 bg-[#EEF4FB] p-5 mb-2">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#1B6CA8] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Intake Assistant
          </p>
          <button onClick={() => setUseAi(false)} className="text-[12px] font-semibold text-[#4A6580] hover:text-[#1B6CA8] transition-colors">
            Use classic form instead
          </button>
        </div>
        <IntakeAssistant
          initial={{ childName: child.name, concern: child.concern, duration: child.duration }}
          onComplete={(d) => setChild({
            ...child, name: d.childName, concern: d.concern, duration: d.duration,
            allergies: d.allergies, meds: d.medications,
            notes: [child.notes, d.associated.length ? `Associated: ${d.associated.join(", ")}` : ""].filter(Boolean).join("\n"),
          })}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#1B6CA8]/30 bg-[#EEF4FB] px-5 py-4">
      <div className="h-10 w-10 rounded-xl bg-[#1B6CA8]/15 flex items-center justify-center shrink-0">
        <Brain className="h-5 w-5 text-[#1B6CA8]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-[#0D1B2A]">Try our AI Intake Assistant</p>
        <p className="text-[12px] text-[#4A6580]">Answer a few quick questions instead of filling the form manually.</p>
      </div>
      <button onClick={() => setUseAi(true)}
        className="shrink-0 inline-flex items-center gap-1.5 bg-[#1B6CA8] text-white text-[12px] font-bold px-4 py-2 rounded-xl hover:bg-[#155892] transition-colors">
        Start <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ─────────────────────── Confirmation ─────────────────────── */
function Confirmation({ total, city, visit, date, slot, child }: { total: number; city: string; visit: string; date: string; slot: string; child: string }) {
  const ref = `PUC-${Math.floor(Math.random() * 90000 + 10000)}`;
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF5] border-4 border-[#2ECC8B]/30 mx-auto">
            <CheckCircle2 className="h-10 w-10 text-[#059669]" />
          </div>
          <h1 className="mt-5 font-display font-extrabold text-[28px] text-[#0D1B2A]">Booking Confirmed!</h1>
          <p className="mt-2 text-[14px] text-[#4A6580]">
            Reference: <span className="font-mono font-bold text-[#0D1B2A]">{ref}</span>
          </p>
        </div>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-[#E0EAF4] shadow-sm overflow-hidden mb-5">
          <div className="bg-[#1B6CA8] px-6 py-4">
            <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Visit Details</p>
          </div>
          <div className="p-6 space-y-3">
            {[
              { label: "City",   value: city || "—",  icon: MapPin       },
              { label: "Visit",  value: visit,         icon: Stethoscope  },
              { label: "Date",   value: date || "—",  icon: CalendarDays },
              { label: "Time",   value: slot || "—",  icon: Clock        },
              { label: "Child",  value: child || "—", icon: User         },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-[#EEF4FB] flex items-center justify-center shrink-0">
                  <r.icon className="h-4 w-4 text-[#1B6CA8]" />
                </span>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-[12px] text-[#4A6580]">{r.label}</span>
                  <span className="text-[13px] font-semibold text-[#0D1B2A]">{r.value}</span>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-[#EEF2F7] flex items-center justify-between">
              <span className="font-bold text-[14px] text-[#0D1B2A]">Amount Paid</span>
              <span className="font-display font-extrabold text-[20px] text-[#1B6CA8]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="bg-[#EEF4FB] rounded-2xl border border-[#D6E4F0] p-4 mb-6 text-center">
          <p className="text-[13px] text-[#4A6580]">
            Confirmation email &amp; SMS will arrive within <strong className="text-[#0D1B2A]">5 minutes</strong>.
            Your assigned NP will be in touch with a live ETA.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1B6CA8] text-white font-bold py-3.5 rounded-xl hover:bg-[#155892] transition-colors shadow-sm">
            <MapPin className="h-4 w-4" /> Track your NP
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-[#D6E4F0] text-[#0D1B2A] font-semibold py-3.5 rounded-xl hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors bg-white">
            <CalendarDays className="h-4 w-4" /> Add to Calendar
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-[13px] text-[#1B6CA8] font-semibold hover:underline">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
