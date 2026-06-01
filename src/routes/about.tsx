import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Clock,
  MapPin,
  Star,
  Quote,
} from "lucide-react";
import founderImg from "@/assets/about-founder.jpg";
import teamImg from "@/assets/about-team.jpg";
import heroToddler from "@/assets/hero-np-toddler.jpg";
import heroCheckup from "@/assets/hero-np-checkup.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Ontario's Pediatric Home-Visit Pioneers | Pediatric Urgent Care™" },
      {
        name: "description",
        content:
          "Founded in 2018 in Milton, Pediatric Urgent Care™ brings board-certified NPs to Ontario homes. Meet our team, mission, and values.",
      },
      { property: "og:title", content: "About Pediatric Urgent Care™ — Ontario's NP-Led Home Visit Service" },
      {
        property: "og:description",
        content: "Meet the team, mission, and milestones behind Ontario's leading pediatric home-visit service.",
      },
      { property: "og:image", content: teamImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <AboutHero />
      <StatsStrip />
      <MissionSection />
      <StorySection />
      <ValuesSection />
      <FounderSection />
      <TeamSection />
      <TimelineSection />
      <CredentialsSection />
      <PressSection />
      <CTASection />
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      <img
        src={teamImg}
        alt="Diverse team of Ontario pediatric nurse practitioners"
        width={1600}
        height={900}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        style={{ objectPosition: "center 30%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(8,20,40,0.94) 0%, rgba(8,20,40,0.78) 45%, rgba(8,20,40,0.35) 80%, rgba(8,20,40,0.15) 100%)",
        }}
      />
      <div className="container-page relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-32 text-white">
        <nav className="text-xs font-semibold tracking-wider uppercase text-white/70" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">About</span>
        </nav>
        <div className="mt-8 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <span aria-hidden className="text-base leading-none">🍁</span>
            Ontario · Est. 2018
          </span>
          <h1 className="mt-5 font-display font-extrabold text-white text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.04] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Reinventing pediatric care, <span style={{ color: "#7CE8B6" }}>one home at a time.</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
            We're Nurse Practitioners, parents, and engineers on a single mission: spare Ontario families the 4-hour
            ER wait — and deliver clinic-grade pediatric care exactly where kids feel safest. At home.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105"
            >
              Book a home visit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/providers"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-foreground transition"
            >
              Meet our NPs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── STATS STRIP ───────────────────────── */
function StatsStrip() {
  const stats = [
    { n: "12,000+", l: "Home visits delivered", icon: HeartHandshake },
    { n: "2,400+", l: "Ontario families", icon: Users },
    { n: "7", l: "Cities served", icon: MapPin },
    { n: "4.96★", l: "Average rating", icon: Star },
    { n: "<3h", l: "Average arrival", icon: Clock },
    { n: "100%", l: "CNO-licensed NPs", icon: ShieldCheck },
  ];
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s) => (
            <div key={s.l} className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display font-extrabold text-2xl leading-none">{s.n}</p>
                <p className="mt-1 text-xs text-secondary-ink">{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── MISSION ───────────────────────── */
function MissionSection() {
  return (
    <section className="section-y">
      <div className="container-page grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Our Mission</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">
            No child should wait <span className="text-primary">4 hours</span> for treatable care.
          </h2>
          <p className="mt-6 text-lg text-secondary-ink leading-relaxed">
            Pediatric ERs across Ontario are overwhelmed. The vast majority of pediatric visits — fevers,
            ear infections, rashes, vaccinations, well-child checkups — don't need an emergency department.
            They need a calm, expert clinician with the right tools, at home.
          </p>
          <p className="mt-4 text-secondary-ink leading-relaxed">
            That's what we built: a province-wide network of board-certified Nurse Practitioners who arrive
            within hours, equipped to assess, diagnose, treat, and document — then send a full visit summary
            to your child's pediatrician.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {[
              "Clinic-grade pediatric care, at home",
              "Same-day, 7 days a week",
              "PHIPA & PIPEDA compliant",
              "Direct pediatrician hand-off",
            ].map((i) => (
              <li key={i} className="inline-flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-success flex-shrink-0" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px]"
            style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #2ECC8B 100%)" }}
          />
          <img
            src={heroToddler}
            alt="Nurse practitioner examining a toddler at home"
            width={1088}
            height={1344}
            loading="lazy"
            className="relative w-full aspect-[4/5] object-cover rounded-[28px] shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ORIGIN STORY ───────────────────────── */
function StorySection() {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page max-w-4xl">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Our Story</span>
        <h2 className="mt-3 text-3xl sm:text-4xl">It started with one impossible night.</h2>
        <div className="mt-8 grid md:grid-cols-[auto_1fr] gap-5">
          <Quote className="h-10 w-10 text-primary/40 flex-shrink-0" />
          <blockquote className="text-lg leading-relaxed text-secondary-ink italic">
            "In 2017, our founder spent six hours in a Milton ER waiting room with a feverish two-year-old —
            only to be told it was a routine ear infection. The next morning, she sketched the model that became
            Pediatric Urgent Care™ on the back of a discharge summary."
          </blockquote>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-display font-bold text-primary">2018</p>
            <p className="mt-1 text-secondary-ink">First home visit in Milton.</p>
          </div>
          <div>
            <p className="font-display font-bold text-primary">2021</p>
            <p className="mt-1 text-secondary-ink">Expanded to Hamilton, Oakville & Burlington.</p>
          </div>
          <div>
            <p className="font-display font-bold text-primary">2025</p>
            <p className="mt-1 text-secondary-ink">7 cities. 12,000+ visits. One unified booking platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── VALUES ───────────────────────── */
function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "Family-first, always",
      body: "Every decision is filtered through one question: does this make life easier for the family at the door?",
    },
    {
      icon: Stethoscope,
      title: "Clinical excellence",
      body: "Every NP is RN(EC)-registered, CNO-licensed, and credentialed in pediatric primary care. No exceptions.",
    },
    {
      icon: ShieldCheck,
      title: "Trust by design",
      body: "PHIPA-compliant from day one. Records encrypted in transit and at rest. Pediatrician hand-off in 24h.",
    },
    {
      icon: Sparkles,
      title: "Calm over chaos",
      body: "Kids learn how to be sick from how we respond. We choose calm — and we train every NP to do the same.",
    },
    {
      icon: HeartHandshake,
      title: "Equity in access",
      body: "Multilingual NPs (English, Mandarin, Punjabi, Arabic, Spanish, more). Underserved postal codes prioritized.",
    },
    {
      icon: Award,
      title: "Transparent pricing",
      body: "Flat published fees. No surprise charges. Itemized receipts for insurance, every time.",
    },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">What We Stand For</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Six values, written down so we can hold ourselves to them.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <article
              key={v.title}
              className="rounded-2xl border border-border bg-surface p-7 hover-lift transition-all hover:border-primary"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.15_220)] text-primary-foreground shadow-soft">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-display font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-secondary-ink leading-relaxed">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FOUNDER ───────────────────────── */
function FounderSection() {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div className="relative max-w-md mx-auto lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[32px]"
            style={{ background: "linear-gradient(135deg, #2ECC8B 0%, #1B6CA8 100%)" }}
          />
          <img
            src={founderImg}
            alt="Dr. Elena Marsh, founder & chief clinical officer"
            width={1024}
            height={1280}
            loading="lazy"
            className="relative w-full aspect-[4/5] object-cover rounded-[28px] shadow-lift"
          />
          <div className="absolute -bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lift border border-border px-5 py-4 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary-ink font-bold">Top 40 Under 40</p>
              <p className="text-sm font-semibold">Ontario Healthcare, 2024</p>
            </div>
          </div>
        </div>
        <div>
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Meet the Founder</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Elena Marsh, NP, MScN</h2>
          <p className="mt-2 text-secondary-ink font-semibold">Founder & Chief Clinical Officer</p>
          <p className="mt-5 text-secondary-ink leading-relaxed">
            Elena is a Nurse Practitioner with 14 years of pediatric experience at McMaster Children's and SickKids.
            She founded Pediatric Urgent Care™ in 2018 after a single ER visit with her own daughter convinced her
            that the system was solving the wrong problem.
          </p>
          <p className="mt-4 text-secondary-ink leading-relaxed">
            Today she leads clinical protocols, NP training, and quality assurance across all seven cities — while
            still personally seeing patients in Milton every Saturday.
          </p>
          <dl className="mt-7 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Experience</dt>
              <dd className="mt-1 font-display text-xl font-extrabold">14 yrs</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Patients seen</dt>
              <dd className="mt-1 font-display text-xl font-extrabold">9,000+</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">Credentials</dt>
              <dd className="mt-1 font-display text-xl font-extrabold">RN(EC)</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TEAM ───────────────────────── */
function TeamSection() {
  const team = [
    { name: "Dr. James Okafor", role: "Medical Director", cred: "MD, FRCPC (Pediatrics)" },
    { name: "Priya Shah, NP", role: "Lead NP, Hamilton", cred: "RN(EC), MScN" },
    { name: "Aisha Khan, NP", role: "Lead NP, Mississauga", cred: "RN(EC), MScN" },
    { name: "Daniel Park, NP", role: "Lead NP, Milton", cred: "RN(EC), MScN" },
    { name: "Maya Patel", role: "VP Operations", cred: "MHA, PMP" },
    { name: "Tomás Riley", role: "Head of Engineering", cred: "B.Eng (Software)" },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Leadership</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">The people behind the visits</h2>
            <p className="mt-4 text-secondary-ink">
              Clinicians, operators, and engineers united by one belief: pediatric care should come to you.
            </p>
          </div>
          <Link
            to="/providers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            See all 10 NPs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="rounded-2xl border border-border bg-surface p-6 hover-lift">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.15_220)] text-primary-foreground font-display font-extrabold text-lg shadow-soft">
                  {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="font-display font-bold">{m.name}</p>
                  <p className="text-sm text-primary font-semibold">{m.role}</p>
                  <p className="text-xs text-secondary-ink mt-0.5">{m.cred}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── TIMELINE ───────────────────────── */
function TimelineSection() {
  const milestones = [
    { year: "2018", title: "First visit in Milton", body: "Elena Marsh runs the first NP home visit out of a hatchback and a clinical bag." },
    { year: "2020", title: "COVID surge response", body: "Pivot to telemedicine + at-home pediatric assessments. 1,200 families served." },
    { year: "2021", title: "Halton + Hamilton launch", body: "Expand to Oakville, Burlington, Halton Hills, and Hamilton with 4 new NPs." },
    { year: "2023", title: "Unified platform", body: "Launched the single online booking system replacing 7 separate city websites." },
    { year: "2024", title: "Mississauga + Brampton", body: "Peel region added. Multilingual NP coverage expanded to 8 languages." },
    { year: "2025", title: "10,000 visits milestone", body: "12,000+ home visits delivered. 4.96★ network-wide rating. PHIPA-audited." },
  ];
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Milestones</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">From one car to seven cities</h2>
        </div>
        <ol className="mt-12 relative border-l-2 border-dashed border-primary/30 ml-3 space-y-10">
          {milestones.map((m) => (
            <li key={m.year} className="pl-8 relative">
              <span className="absolute -left-[11px] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-surface">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <p className="font-display font-extrabold text-primary text-sm tracking-wider">{m.year}</p>
              <h3 className="mt-1 text-lg font-display font-bold">{m.title}</h3>
              <p className="mt-1 text-sm text-secondary-ink max-w-2xl leading-relaxed">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── CREDENTIALS ───────────────────────── */
function CredentialsSection() {
  const creds = [
    { label: "CNO Licensed", desc: "All NPs registered with the College of Nurses of Ontario" },
    { label: "PHIPA Compliant", desc: "Personal Health Information Protection Act audited" },
    { label: "PIPEDA Compliant", desc: "Federal personal information protection standards" },
    { label: "OHIP Eligible Referrals", desc: "Seamless referral pathway to OHIP-funded specialists" },
    { label: "Public Health Reporting", desc: "Direct vaccine reporting to Public Health Ontario" },
    { label: "Better Business Bureau A+", desc: "Accredited business since 2020" },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Credentials & Compliance</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Held to the same standards as any clinic.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creds.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-surface p-5 flex gap-4">
              <ShieldCheck className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold">{c.label}</p>
                <p className="mt-1 text-xs text-secondary-ink leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── PRESS ───────────────────────── */
function PressSection() {
  const quotes = [
    { src: "Toronto Star", text: "A reinvention of how Ontario delivers pediatric primary care." },
    { src: "CBC Hamilton", text: "Easing pressure on overcrowded children's emergency rooms across the GTA." },
    { src: "Macleans Health", text: "The home-visit model that's quietly setting a new standard." },
  ];
  return (
    <section className="section-y bg-foreground text-white relative overflow-hidden">
      <img
        src={heroCheckup}
        alt=""
        aria-hidden
        loading="lazy"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "#7CE8B6" }}>In The News</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">What others are saying</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.src} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <Quote className="h-6 w-6 opacity-60" />
              <blockquote className="mt-3 text-sm leading-relaxed">"{q.text}"</blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-wider opacity-80">— {q.src}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function CTASection() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div
          className="rounded-[32px] p-10 sm:p-16 text-white shadow-lift relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #0EA371 100%)" }}
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #7CE8B6 0%, transparent 70%)" }}
          />
          <div className="relative max-w-2xl">
            <span className="text-xs font-bold tracking-[0.18em] uppercase opacity-90">Ready when you are</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold">
              Bring expert pediatric care home today.
            </h2>
            <p className="mt-4 text-white/90 text-lg max-w-xl">
              Same-day visits across 7 Ontario cities. No waiting rooms. No stress. Just calm, expert NP care at your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white text-foreground px-7 py-4 font-bold shadow-lift hover:scale-[1.02] transition-transform btn-press"
              >
                Book a home visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur px-6 py-3.5 font-semibold hover:bg-white hover:text-foreground transition"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}