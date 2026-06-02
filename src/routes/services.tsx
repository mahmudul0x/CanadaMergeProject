// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  ClipboardList,
  Clock,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  Video,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import sickImg from "@/assets/service-sick-visit.jpg";
import vaccImg from "@/assets/service-vaccination.jpg";
import followImg from "@/assets/service-followup.jpg";
import wellImg from "@/assets/service-wellchild.jpg";
import teleImg from "@/assets/service-telemedicine.jpg";
import devImg from "@/assets/service-developmental.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Pediatric Services — At-Home Care Across Ontario" },
      { name: "description", content: "Same-day sick visits, vaccinations, follow-ups, well-child checkups, telemedicine and developmental assessments — delivered at home by board-certified NPs." },
      { property: "og:title", content: "Pediatric Services — Pediatric Urgent Care™" },
      { property: "og:description", content: "Six clinical services. Transparent pricing from $79. Same-day across Ontario." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

type Service = {
  id: string;
  icon: typeof Thermometer;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  duration: string;
  ages: string;
  includes: string[];
  conditions: string[];
  from: number;
  accent: string;
  popular?: boolean;
};

const SERVICES: Service[] = [
  {
    id: "sick",
    icon: Thermometer,
    title: "Sick Visits",
    tagline: "Same-day · Most popular",
    desc: "When your child wakes up with a fever, an ear pulling, or a rash you can't place — an NP comes to your door with everything needed to diagnose and treat in one visit.",
    image: sickImg,
    duration: "45–60 min",
    ages: "0–17 years",
    includes: ["Full physical examination", "Strep / flu / RSV / COVID swabs", "Otoscope, pulse-ox, thermometer", "Prescriptions when needed", "Written follow-up plan", "Note shared with your pediatrician"],
    conditions: ["Fever", "Ear infections", "Strep throat", "Stomach bugs", "Rashes", "Pink eye", "UTI", "Mild asthma flares"],
    from: 149,
    accent: "oklch(0.65 0.18 25)",
    popular: true,
  },
  {
    id: "vacc",
    icon: Syringe,
    title: "Vaccinations",
    tagline: "Routine + travel",
    desc: "Every vaccine on the Ontario schedule, plus travel immunizations, delivered at home in a calm environment your child knows.",
    image: vaccImg,
    duration: "20–30 min",
    ages: "2 months – 17 years",
    includes: ["Full Ontario routine schedule", "Travel vaccines (typhoid, hep A, yellow fever)", "Cold-chain transport & disposal", "School / daycare documentation", "Comfort techniques for needle anxiety", "Logged to provincial registry"],
    conditions: ["DTaP-IPV-Hib", "MMR", "Varicella", "Meningococcal", "HPV", "Influenza (annual)", "Travel boosters"],
    from: 99,
    accent: "oklch(0.7 0.16 160)",
  },
  {
    id: "follow",
    icon: ClipboardList,
    title: "Follow-up Visits",
    tagline: "Post-ER · Post-hospital",
    desc: "Skip the return trip. Our NP comes to verify recovery, swap dressings, review meds, and catch complications early — without dragging a recovering child anywhere.",
    image: followImg,
    duration: "30–45 min",
    ages: "0–17 years",
    includes: ["Wound and incision checks", "Medication reconciliation", "Vital trend review", "Symptom progression monitoring", "Specialist referrals as needed", "Direct line to your care team"],
    conditions: ["Post-ER discharge", "Surgical follow-up", "Antibiotic re-checks", "Resolving infection", "Asthma exacerbation"],
    from: 119,
    accent: "oklch(0.6 0.15 280)",
  },
  {
    id: "well",
    icon: Activity,
    title: "Well-child Checkups",
    tagline: "Annual · Preventive",
    desc: "A complete annual checkup — measurements, screening, anticipatory guidance — in your living room. Less waiting room, more meaningful conversation.",
    image: wellImg,
    duration: "45–60 min",
    ages: "Newborn – 17 years",
    includes: ["Growth & BMI plotting", "Developmental milestone review", "Hearing & vision screening", "Nutrition & sleep guidance", "Any vaccinations due", "Detailed visit summary"],
    conditions: ["Annual physical", "School readiness", "Sports clearance", "Camp forms", "Newborn checks"],
    from: 179,
    accent: "oklch(0.7 0.15 200)",
  },
  {
    id: "tele",
    icon: Video,
    title: "Telemedicine",
    tagline: "Within 30 minutes",
    desc: "For questions that don't need an in-person exam — rashes, medication queries, post-visit check-ins — a secure video call with an NP in minutes.",
    image: teleImg,
    duration: "15–30 min",
    ages: "0–17 years",
    includes: ["Secure HIPAA-grade video", "Digital prescriptions to your pharmacy", "Written visit summary", "Triage to in-home if needed", "Photo upload for rashes", "No app download required"],
    conditions: ["Medication questions", "Rash review", "Symptom triage", "Mental health check-in", "Travel advice"],
    from: 79,
    accent: "oklch(0.55 0.18 245)",
  },
  {
    id: "dev",
    icon: Brain,
    title: "Developmental Assessment",
    tagline: "Milestone screening",
    desc: "Standardized developmental screening (ASQ-3, M-CHAT) in your child's natural environment, with a written report you can share with school, daycare, or a specialist.",
    image: devImg,
    duration: "60–75 min",
    ages: "6 months – 6 years",
    includes: ["ASQ-3 standardized screen", "M-CHAT-R/F autism screen", "Parent-led history & interview", "Play-based observation", "Written report with scores", "Direct referrals to OT / SLP / Developmental Peds"],
    conditions: ["Speech delay concerns", "Motor milestones", "Social-emotional screening", "Autism red flags", "School readiness"],
    from: 199,
    accent: "oklch(0.65 0.18 320)",
  },
];

function ServicesPage() {
  useReveal();
  return (
    <div>
      <ServicesHero />
      <TrustStrip />
      <ServicesGrid />
      <ServicesDetail />
      <ComparisonTable />
      <ProcessSteps />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container-page py-16 lg:py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Clinical Services</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
            Pediatric care, done<br />on your sofa.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-secondary-ink leading-relaxed">
            Six clinical services. Board-certified Nurse Practitioners. Transparent pricing from $79. Every visit documented and shared with your pediatrician.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105">
              Book a visit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+19051234567" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-surface px-6 py-3.5 font-semibold hover:border-primary">
              <Phone className="h-4 w-4" /> Speak to triage
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <img src={sickImg} alt="NP examining child" width={1280} height={960} className="rounded-2xl shadow-lift aspect-[4/5] object-cover translate-y-4" loading="eager" />
            <div className="space-y-3">
              <img src={vaccImg} alt="Vaccination at home" width={1280} height={960} className="rounded-2xl shadow-lift aspect-square object-cover" loading="lazy" />
              <img src={wellImg} alt="Well-child checkup" width={1280} height={960} className="rounded-2xl shadow-lift aspect-square object-cover" loading="lazy" />
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-surface px-5 py-4 shadow-lift flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-success/15 text-success"><ShieldCheck className="h-5 w-5" /></span>
            <div>
              <p className="font-display font-bold text-sm">CNO licensed NPs</p>
              <p className="text-xs text-secondary-ink">PHIPA compliant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { v: "12,000+", k: "Visits delivered" },
    { v: "4.96★", k: "Average rating" },
    { v: "<3h", k: "Average ETA" },
    { v: "48+", k: "NPs on call" },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.k} className="px-4 py-6 text-center">
            <p className="font-display text-3xl lg:text-4xl font-extrabold text-primary">{s.v}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-secondary-ink">{s.k}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Catalog</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">Choose what your child needs</h2>
          </div>
          <p className="text-sm text-secondary-ink max-w-md">All visits include digital documentation, a follow-up plan, and a copy shared with your child's primary provider.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/services"
              hash={s.id}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft hover:shadow-lift transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.image} alt={s.title} width={1280} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                {s.popular && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-warm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-warm-foreground shadow-soft">
                    Most popular
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">{s.tagline}</p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold text-white">{s.title}</h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-primary shadow-soft">
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-secondary-ink line-clamp-2">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3 text-xs text-secondary-ink">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {s.duration}</span>
                    <span>·</span>
                    <span>{s.ages}</span>
                  </div>
                  <span className="font-display text-lg font-extrabold text-primary">${s.from}<span className="text-xs text-secondary-ink font-normal">/from</span></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesDetail() {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page space-y-20">
        {SERVICES.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={s.id}
              id={s.id}
              className={`reveal grid gap-10 lg:gap-16 items-center lg:grid-cols-2 scroll-mt-24`}
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <div className="relative">
                  <img src={s.image} alt={s.title} width={1280} height={960} loading="lazy" className="rounded-3xl shadow-lift aspect-[5/4] w-full object-cover" />
                  <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-lift">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: s.accent }}>
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs text-secondary-ink">From</p>
                      <p className="font-display text-lg font-extrabold">${s.from}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={reversed ? "lg:order-1" : ""}>
                <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: s.accent }}>{s.tagline}</span>
                <h3 className="mt-2 text-3xl sm:text-4xl font-display font-extrabold">{s.title}</h3>
                <p className="mt-4 text-secondary-ink leading-relaxed">{s.desc}</p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-secondary-ink"><Clock className="h-4 w-4 text-primary" /> {s.duration}</span>
                  <span className="inline-flex items-center gap-1.5 text-secondary-ink"><Stethoscope className="h-4 w-4 text-primary" /> {s.ages}</span>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">What's included</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/15 text-[oklch(0.45_0.15_150)]">
                          <Check className="h-3 w-3" />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">Common reasons to book</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.conditions.map((c) => (
                      <span key={c} className="rounded-full bg-background border border-border px-3 py-1 text-xs">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 font-bold text-warm-foreground shadow-soft btn-press hover:brightness-105">
                    Book {s.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-surface px-6 py-3 font-semibold hover:border-primary">
                    Ask a question
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { k: "Wait time", a: "<3 hours", b: "1–4 hours" },
    { k: "Travel required", a: "None — we come to you", b: "Yes — sick child in car" },
    { k: "Cross-infection risk", a: "Zero (private home)", b: "Shared waiting room" },
    { k: "Visit length", a: "30–60 min undivided", b: "10–15 min rushed" },
    { k: "Notes to your pediatrician", a: "Sent automatically", b: "Patient responsibility" },
    { k: "After-hours availability", a: "7am – 10pm, 7 days", b: "Limited" },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Why home visits</span>
          <h2 className="mt-2 text-3xl sm:text-4xl">Compared to a walk-in clinic</h2>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary-ink"></th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">Pediatric Urgent Care</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary-ink">Typical walk-in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.k}>
                  <td className="px-6 py-4 font-semibold">{r.k}</td>
                  <td className="px-6 py-4 text-foreground"><span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> {r.a}</span></td>
                  <td className="px-6 py-4 text-secondary-ink">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProcessSteps() {
  const steps = [
    { n: "01", t: "Book in 2 minutes", d: "Pick a service, postal code, and a time that works. Pay securely with HST included." },
    { n: "02", t: "We arrive at your door", d: "An NP arrives within your window with everything needed for diagnosis and treatment." },
    { n: "03", t: "Documented & shared", d: "A visit summary is shared with you and forwarded to your child's primary provider." },
  ];
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">How it works</span>
          <h2 className="mt-2 text-3xl sm:text-4xl">Three steps from booking to better</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-border bg-background p-7 hover-lift">
              <p className="font-display text-5xl font-extrabold text-primary/20">{s.n}</p>
              <h3 className="mt-3 text-xl font-display font-extrabold">{s.t}</h3>
              <p className="mt-2 text-sm text-secondary-ink leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is this covered by OHIP?", a: "Home-based pediatric care is not covered by OHIP. Most extended health benefit plans reimburse all or part of the visit fee — we provide an itemized receipt." },
    { q: "What if my child needs a prescription?", a: "Our NPs prescribe within the full pediatric formulary and send the script electronically to the pharmacy you choose." },
    { q: "How fast can you arrive?", a: "Most cities have an average ETA under 90 minutes. The fastest are Mississauga and Hamilton at ~65–70 minutes door-to-door." },
    { q: "Can I see the same NP each time?", a: "Yes — once you've seen an NP you trust, you can request them on future bookings, subject to availability." },
  ];
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">FAQ</span>
        <h2 className="mt-2 text-3xl sm:text-4xl">Common questions</h2>
        <div className="mt-8 divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer flex items-center justify-between font-display font-bold list-none">
                {f.q}
                <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-secondary-ink leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-y bg-[#0D1B2A] text-white relative overflow-hidden">
      <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-warm/30 blur-3xl" />
      <div className="container-page relative text-center max-w-2xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold">Ready when you are.</h2>
        <p className="mt-4 text-white/70">An NP is on call right now in your area. Book in two minutes — no app, no waiting room.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105">
            Book a visit <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/locations" className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur hover:bg-white/10">
            See coverage
          </Link>
        </div>
      </div>
    </section>
  );
}