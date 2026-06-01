import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useEffect } from "react";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  Heart,
  Home as HomeIcon,
  MapPin,
  Phone,
  Star,
  Syringe,
  Thermometer,
  UserCheck,
  Video,
  Check,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Award, BadgeCheck, Lock, Quote, Sparkles, FileText, HelpCircle, Mail } from "lucide-react";
import heroImage from "@/assets/hero-np-home-visit.jpg";
import heroCheckup from "@/assets/hero-np-checkup.jpg";
import heroToddler from "@/assets/hero-np-toddler.jpg";
import heroVaccine from "@/assets/hero-np-vaccine.jpg";
import serviceFeaturedImage from "@/assets/service-featured-sick-visit.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pediatric Urgent Care™ — Expert Pediatric Care at Your Door | Ontario" },
      {
        name: "description",
        content:
          "Board-certified Nurse Practitioners visit your home across Ontario within hours. Same-day pediatric sick visits, vaccinations, and follow-ups. PHIPA compliant.",
      },
      { property: "og:title", content: "Pediatric Urgent Care™ — Expert Pediatric Care at Your Door" },
      {
        property: "og:description",
        content: "Ontario's #1 pediatric home visit service. Same-day appointments. NP-led care. PHIPA compliant.",
      },
      {
        property: "og:image",
        content: heroImage,
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <HowItWorks />
      <Services />
      <Locations />
      <SocialProof />
      <PricingCalculator />
      <WhyChooseUs />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ──────────────────────────── HERO ──────────────────────────── */

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Pediatric Urgent Care — home visits across Ontario"
    >
      {/* Full-bleed background carousel */}
      <HeroCarousel />

      {/* Dark gradient for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(8,20,40,0.88) 0%, rgba(8,20,40,0.72) 38%, rgba(8,20,40,0.35) 65%, rgba(8,20,40,0.15) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-t from-black/55 to-transparent"
      />

      <div className="container-page relative z-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 pt-28 pb-24 lg:pt-36 lg:pb-32 min-h-[88vh]">
        {/* Copy */}
        <div className="lg:col-span-7 animate-hero-text text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide uppercase shadow-soft border border-[color:var(--border)]">
            <span aria-hidden className="text-maple text-base leading-none">🍁</span>
            <span className="text-secondary-ink">Ontario Pediatric Home Visit Service</span>
          </span>

          <h1 className="mt-6 font-display font-bold text-white text-[40px] sm:text-[52px] lg:text-[68px] leading-[1.05] tracking-[-0.025em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Expert Pediatric Care,
            <span className="block mt-1">
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#7CE8B6" }}>Right at Your Door.</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-1 h-3 -z-0"
                  style={{ background: "color-mix(in oklab, #2ECC8B 35%, transparent)" }}
                />
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-[580px] text-[17px] lg:text-[19px] leading-[1.65] text-white/90">
            Board-certified Nurse Practitioners arrive at your home within hours — fully equipped to assess,
            diagnose, and treat your child. No waiting rooms. No stress. Just calm, expert care.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              to="/book"
              className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[16px] font-semibold text-white shadow-lift transition-transform hover:scale-[1.02] btn-press"
            >
              Book a Home Visit <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/symptom-checker"
              className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur px-7 text-[16px] font-semibold text-white hover:bg-white hover:text-foreground transition-colors btn-press"
            >
              Check Symptoms Free
            </Link>
          </div>

          {/* Trust signals */}
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-[520px] border-t border-white/25 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-white/70">Rating</dt>
              <dd className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold text-white">4.9</span>
                <Star className="h-4 w-4 fill-current" style={{ color: "#F5A623" }} />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-white/70">Families</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">2,400+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-white/70">Ontario Cities</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">7</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── HERO CAROUSEL ──────────────────────────── */

function HeroCarousel() {
  const slides = [
    {
      src: heroImage,
      alt: "Pediatric nurse practitioner caring for a toddler during a home visit",
      caption: "In-Home Sick Visits",
      sub: "Fever, infections & more",
    },
    {
      src: heroCheckup,
      alt: "Nurse practitioner doing a well-child checkup in a bright living room",
      caption: "Well-Child Checkups",
      sub: "Growth & development",
    },
    {
      src: heroToddler,
      alt: "Male nurse practitioner examining a toddler in a cozy bedroom",
      caption: "Gentle, Kid-Friendly Care",
      sub: "Comfort of home",
    },
    {
      src: heroVaccine,
      alt: "Nurse practitioner administering a vaccine to a smiling child at home",
      caption: "Routine Vaccinations",
      sub: "On schedule, at your door",
    },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (n: number) => setIdx((n + slides.length) % slides.length);

  return (
    <div className="absolute inset-0 z-0 bg-foreground">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={1088}
          height={1344}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? undefined : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
            i === idx ? "opacity-100 animate-kenburns" : "opacity-0"
          }`}
          style={{ objectPosition: "center 35%" }}
        />
      ))}

      {/* Prev / Next */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(idx - 1)}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/15 hover:bg-white/95 hover:text-foreground text-white border border-white/30 backdrop-blur flex items-center justify-center transition"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(idx + 1)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/15 hover:bg-white/95 hover:text-foreground text-white border border-white/30 backdrop-blur flex items-center justify-center transition"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* Slide caption + dots */}
      <div className="absolute bottom-6 right-6 z-30 hidden md:flex flex-col items-end gap-3 text-white">
        <div className="relative h-10 min-w-[220px] text-right">
          {slides.map((s, i) => (
            <div
              key={s.caption}
              className={`absolute right-0 top-0 transition-all duration-700 ${
                i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold opacity-80">
                {s.sub}
              </div>
              <div className="font-display text-lg font-bold leading-tight">{s.caption}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dots on mobile (bottom center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex md:hidden items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── TICKER ──────────────────────────── */

function Ticker() {
  const items = [
    "✦ PHIPA Compliant",
    "Board-Certified NPs",
    "Same-Day Availability",
    "Serving Milton · Halton · Hamilton · Oakville · Mississauga · Burlington · Brampton",
    "4.9★ Google Rating",
    "2,400+ Families Served",
    "Ontario's #1 Pediatric Home Visit Service",
  ];
  const content = items.join("  ·  ");
  return (
    <div className="bg-primary text-white overflow-hidden" style={{ height: 48 }}>
      <div className="flex h-full items-center whitespace-nowrap">
        <div className="flex animate-marquee">
          <span className="px-6 text-sm font-medium tracking-wide">{content}</span>
          <span className="px-6 text-sm font-medium tracking-wide" aria-hidden>{content}</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── HOW IT WORKS ──────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: CalendarCheck,
      iconBg: "#E8F1FA",
      iconColor: "#1B6CA8",
      title: "Book in 2 Minutes",
      body: "Choose your city, visit type, and preferred time slot online. Pay securely. Done.",
      tag: "Available 7am–10pm daily",
    },
    {
      num: "02",
      icon: UserCheck,
      iconBg: "#D1FAE5",
      iconColor: "#2ECC8B",
      title: "NP Confirmed Instantly",
      body: "A certified, insured Nurse Practitioner is assigned and you receive a confirmation with their profile.",
      tag: "Usually within 15 minutes",
    },
    {
      num: "03",
      icon: HomeIcon,
      iconBg: "#E8F1FA",
      iconColor: "#1B6CA8",
      title: "Care at Your Door",
      body: "Your NP arrives fully equipped. Assessment, diagnosis, treatment plan — all at home.",
      tag: "Avg arrival: 2–4 hours",
    },
  ];
  return (
    <Section bg="#FFFFFF">
      <SectionHeading label="THE PROCESS" title="Care in 3 Simple Steps" subtitle="From booking to bedside — we make it effortless." />
      <div className="mt-14 grid gap-6 md:grid-cols-3 relative">
        <div className="hidden md:block absolute top-[88px] left-[16%] right-[16%] border-t-2 border-dashed border-border" aria-hidden />
        {steps.map((s) => (
          <article
            key={s.num}
            className="relative rounded-[20px] border border-border bg-white p-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-lift"
          >
            <span className="absolute right-6 top-4 font-display font-extrabold text-[80px] leading-none select-none" style={{ color: "#E8F1FA" }}>
              {s.num}
            </span>
            <span
              className="relative inline-flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: s.iconBg }}
            >
              <s.icon className="h-6 w-6" style={{ color: s.iconColor }} />
            </span>
            <h3 className="relative mt-6 font-display font-bold text-2xl">{s.title}</h3>
            <p className="relative mt-3 text-[15px] text-secondary-ink leading-relaxed">{s.body}</p>
            <p className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#F4F8FF] px-3 py-1 text-xs font-semibold text-primary">
              {s.tag}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────── SERVICES ──────────────────────────── */

function Services() {
  const featured = {
    icon: Thermometer,
    tag: "Most booked",
    title: "Sick Visits",
    desc: "Fevers, ear infections, strep, rashes, stomach bugs — assessed, diagnosed, and treated at home by a board-certified Nurse Practitioner. Prescriptions sent directly to your pharmacy.",
    price: "From $149",
    duration: "45–60 min visit",
    features: ["Same-day availability", "On-site rapid testing", "E-prescriptions included", "Full visit summary"],
  };
  const services = [
    { icon: Syringe, accent: "#047857", accentBg: "#ECFDF5", title: "Vaccinations", desc: "All routine childhood vaccines on the Ontario schedule, delivered at home.", price: "From $99", duration: "20 min" },
    { icon: ClipboardCheck, accent: "#1D4ED8", accentBg: "#EFF6FF", title: "Follow-up Care", desc: "Post-illness and post-hospital monitoring with structured NP check-ins.", price: "From $119", duration: "30 min" },
    { icon: Heart, accent: "#BE185D", accentBg: "#FDF2F8", title: "Well-child Checkups", desc: "Annual growth, nutrition, and developmental assessments with a written report.", price: "From $179", duration: "60 min" },
    { icon: Video, accent: "#6D28D9", accentBg: "#F5F3FF", title: "Telemedicine", desc: "Secure video consult for non-emergency concerns from any device, day or evening.", price: "From $49", duration: "15 min" },
    { icon: Brain, accent: "#B91C1C", accentBg: "#FEF2F2", title: "Developmental Assessment", desc: "Milestone screening, behavioural review, and pediatric specialist referrals.", price: "From $199", duration: "75 min" },
  ];
  return (
    <Section bg="#F4F8FF">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> What we offer
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl">
            Pediatric care, <span className="text-primary">end to end</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-secondary-ink">
            From sniffles to scheduled checkups — every service is delivered by a board-certified Nurse Practitioner, in the comfort of your home.
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Featured service */}
      <article className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-all hover:shadow-lift lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <img
            src={serviceFeaturedImage}
            alt="Nurse practitioner examining a toddler at home"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-soft">
            <Star className="h-3 w-3 fill-primary text-primary" /> {featured.tag}
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 lg:col-span-6 lg:p-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7]">
                <featured.icon className="h-5 w-5 text-[#B45309]" />
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-secondary-ink">
                <Clock className="h-3.5 w-3.5" /> {featured.duration}
              </div>
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground">{featured.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary-ink">{featured.desc}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {featured.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-secondary-ink">Starting at</div>
              <div className="font-display text-2xl font-bold text-foreground">{featured.price}</div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/services" className="text-sm font-semibold text-primary hover:underline">
                Learn more
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Book now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Supporting services grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: `linear-gradient(90deg, ${s.accent}, var(--primary))` }}
            />
            <div className="flex items-start justify-between">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: s.accentBg }}
              >
                <s.icon className="h-5 w-5" style={{ color: s.accent }} />
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-secondary-ink">
                <Clock className="h-3 w-3" /> {s.duration}
              </div>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 flex-1 text-[14px] leading-relaxed text-secondary-ink">{s.desc}</p>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-secondary-ink">From</div>
                <div className="font-display text-lg font-bold text-foreground">{s.price.replace("From ", "")}</div>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Trust strip */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-white px-6 py-5 text-sm text-secondary-ink">
        <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> PHIPA compliant</div>
        <div className="hidden h-4 w-px bg-border sm:block" />
        <div className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-primary" /> Board-certified NPs</div>
        <div className="hidden h-4 w-px bg-border sm:block" />
        <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-primary" /> Insurance receipts provided</div>
        <div className="hidden h-4 w-px bg-border sm:block" />
        <div className="flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-primary" /> Same-day booking</div>
      </div>
    </Section>
  );
}

/* ──────────────────────────── LOCATIONS ──────────────────────────── */

const CITIES = ["Milton", "Halton Hills", "Hamilton", "Oakville", "Mississauga", "Burlington", "Brampton"];

function Locations() {
  const cityData = [
    { name: "Mississauga", nps: 9, eta: "65 min", x: "58%", y: "52%", featured: true },
    { name: "Brampton", nps: 7, eta: "75 min", x: "50%", y: "32%" },
    { name: "Oakville", nps: 7, eta: "70 min", x: "44%", y: "58%" },
    { name: "Burlington", nps: 6, eta: "80 min", x: "34%", y: "62%" },
    { name: "Milton", nps: 6, eta: "85 min", x: "32%", y: "46%" },
    { name: "Hamilton", nps: 8, eta: "90 min", x: "20%", y: "68%" },
    { name: "Halton Hills", nps: 5, eta: "95 min", x: "24%", y: "30%" },
  ];
  const [activeCity, setActiveCity] = useState(cityData[0].name);
  const active = cityData.find((c) => c.name === activeCity)!;
  return (
    <Section bg="#FFFFFF">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[#F4F8FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <MapPin className="h-3 w-3" /> Where we serve
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl">
            Across Ontario, <span className="text-primary">close to home</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-secondary-ink">
            7 cities. 48+ Nurse Practitioners on call. Tap a city to see live availability and average arrival time.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div className="font-display text-3xl font-bold text-foreground">7</div>
            <div className="text-xs uppercase tracking-wider text-secondary-ink">Cities live</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="font-display text-3xl font-bold text-foreground">48+</div>
            <div className="text-xs uppercase tracking-wider text-secondary-ink">NPs on call</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="font-display text-3xl font-bold text-foreground">&lt;3<span className="text-base">h</span></div>
            <div className="text-xs uppercase tracking-wider text-secondary-ink">Avg arrival</div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* Interactive map */}
        <div className="lg:col-span-7">
          <div
            className="relative h-[460px] overflow-hidden rounded-3xl border border-border"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, #EAF2FB 0%, #DCE8F5 60%, #CFE0F1 100%)",
            }}
          >
            {/* Map texture */}
            <svg className="absolute inset-0 h-full w-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1B6CA8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* Stylized lake silhouette */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 Q15,72 28,78 T55,82 T82,76 L100,82 L100,100 L0,100 Z" fill="#1B6CA8" opacity="0.12" />
              <path d="M0,84 Q20,78 40,84 T80,82 L100,86 L100,100 L0,100 Z" fill="#1B6CA8" opacity="0.18" />
            </svg>
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2ECC8B]" /> Live service area
            </div>
            <div className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-wider text-primary/60">
              Southern Ontario · GTHA
            </div>
            {/* City pins */}
            {cityData.map((d) => {
              const isActive = d.name === activeCity;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setActiveCity(d.name)}
                  aria-label={`Show ${d.name} details`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: d.x, top: d.y }}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                    )}
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ring-4 transition-all ${
                        isActive
                          ? "bg-primary ring-white shadow-lift scale-125"
                          : "bg-white ring-primary/70 group-hover:scale-110"
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold shadow-soft transition-all ${
                      isActive ? "bg-primary text-white" : "bg-white text-primary"
                    }`}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* City panel + list */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Active city card */}
          <div className="rounded-3xl border border-border bg-white p-7 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#047857]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC8B]" /> Accepting bookings
                </div>
                <h3 className="mt-3 font-display text-3xl font-bold text-foreground">{active.name}</h3>
                <p className="text-sm text-secondary-ink">Ontario, Canada</p>
              </div>
              {active.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <Star className="h-3 w-3 fill-primary" /> Largest team
                </span>
              )}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-ink">
                  <UserCheck className="h-3 w-3" /> NPs on team
                </div>
                <div className="mt-1 font-display text-2xl font-bold text-foreground">{active.nps}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary-ink">
                  <Clock className="h-3 w-3" /> Avg arrival
                </div>
                <div className="mt-1 font-display text-2xl font-bold text-foreground">{active.eta}</div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Link
                to="/book"
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Book in {active.name} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/locations/$city"
                params={{ city: active.name.toLowerCase().replace(" ", "-") }}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Details
              </Link>
            </div>
          </div>

          {/* City quick list */}
          <div className="rounded-3xl border border-border bg-[#F8FAFC] p-3">
            <div className="grid grid-cols-2 gap-1.5">
              {cityData.map((c) => {
                const isActive = c.name === activeCity;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onMouseEnter={() => setActiveCity(c.name)}
                    onClick={() => setActiveCity(c.name)}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                      isActive
                        ? "bg-white text-primary shadow-soft"
                        : "text-foreground hover:bg-white/70"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <MapPin className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-secondary-ink"}`} />
                      {c.name}
                    </span>
                    <span className="text-[11px] font-medium text-secondary-ink">{c.eta}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist strip */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-primary/30 bg-[#F4F8FF] px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-3 text-sm text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>
            <span className="font-semibold">Outside our service area?</span>{" "}
            <span className="text-secondary-ink">We're expanding across Ontario every month.</span>
          </span>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Join our waitlist <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ──────────────────────────── SOCIAL PROOF ──────────────────────────── */

function SocialProof() {
  const testimonials = [
    {
      quote: "Our NP arrived within 2 hours on a Sunday evening. My daughter had an ear infection and was in so much pain. She was treated right at home. I can't recommend this service enough.",
      initials: "SM",
      name: "Sarah M.",
      city: "Milton, Ontario",
    },
    {
      quote: "We used to spend 4 hours in the ER every time our son spiked a fever. Now we just book online and a nurse comes to us. It's changed our lives as parents.",
      initials: "DK",
      name: "David K.",
      city: "Oakville, Ontario",
    },
    {
      quote: "The vaccination visit was seamless, professional, and our toddler barely noticed. The NP was incredible with him. Worth every penny.",
      initials: "PS",
      name: "Priya S.",
      city: "Hamilton, Ontario",
    },
  ];
  const stats = [
    { value: "2,400+", label: "Families served" },
    { value: "4.9 ★", label: "Average rating" },
    { value: "98%", label: "Would recommend us" },
    { value: "< 3 hrs", label: "Average arrival time" },
  ];
  return (
    <section
      className="relative overflow-hidden text-white py-20 lg:py-[110px]"
      style={{ background: "radial-gradient(120% 80% at 0% 0%, #143257 0%, #0D1B2A 55%, #07111C 100%)" }}
    >
      {/* Decorative grid */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]">
        <defs>
          <pattern id="proofgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7CE8B6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proofgrid)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(46,204,139,0.18) 0%, transparent 70%)" }}
      />

      <div className="container-page relative">
        {/* Header band */}
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7CE8B6] backdrop-blur">
              <Sparkles className="h-3 w-3" /> What families say
            </span>
            <h2 className="mt-5 font-display font-bold text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.05] text-white">
              Trusted by Ontario families,<br />
              <span style={{ color: "#7CE8B6" }}>night and day.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
              Independently verified reviews from parents across Halton, Hamilton, and Peel — collected after every home visit.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/60">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#7CE8B6]" /> CNO-licensed NPs</span>
              <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-[#7CE8B6]" /> PHIPA compliant</span>
              <span className="inline-flex items-center gap-2"><Award className="h-4 w-4 text-[#7CE8B6]" /> 4.9★ Google reviews</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0D1B2A] px-6 py-7">
              <dt className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight" style={{ color: "#7CE8B6" }}>
                {s.value}
              </dt>
              <dd className="mt-2 text-[12px] uppercase tracking-[0.14em] text-white/55">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* Testimonial cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7CE8B6]/40"
            >
              <Quote
                aria-hidden
                className="absolute right-5 top-5 h-9 w-9 text-white/10 transition-colors group-hover:text-[#7CE8B6]/30"
              />
              <div className="flex gap-1 text-[#F5A623]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-[15px] leading-[1.7] text-white/85">
                "{t.quote}"
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-soft"
                  style={{ background: `linear-gradient(135deg, hsl(${(i * 60 + 200) % 360} 60% 45%), hsl(${(i * 60 + 240) % 360} 55% 35%))` }}
                >
                  {t.initials}
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-white/55 text-[12px] inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {t.city}
                    <span className="mx-1 h-1 w-1 rounded-full bg-white/30" />
                    <BadgeCheck className="h-3 w-3 text-[#7CE8B6]" />
                    <span className="text-[#7CE8B6]">Verified</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── PRICING CALCULATOR ──────────────────────────── */

const VISIT_TYPES = [
  { id: "sick", label: "Sick Visit", price: 149 },
  { id: "vacc", label: "Vaccination", price: 99 },
  { id: "follow", label: "Follow-up", price: 119 },
  { id: "well", label: "Well-child", price: 179 },
  { id: "tele", label: "Telemedicine", price: 49 },
];

function PricingCalculator() {
  const [city, setCity] = useState(CITIES[0]);
  const [visitId, setVisitId] = useState("sick");
  const [weekend, setWeekend] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const visit = VISIT_TYPES.find((v) => v.id === visitId)!;
  const base = visit.price;
  const wk = weekend ? 25 : 0;
  const ur = urgent ? 35 : 0;
  const subtotal = base + wk + ur;
  const hst = +(subtotal * 0.13).toFixed(2);
  const total = +(subtotal + hst).toFixed(2);

  return (
    <Section bg="#F4F8FF">
      <SectionHeading
        label="TRANSPARENT PRICING"
        title="Know your cost before you book."
        subtitle="No hidden fees. No surprises. Just honest, upfront pricing — receipts included for benefits claims."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
        {/* LEFT: configurator */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-soft">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Build your estimate
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Select your city">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-ink" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-white pl-10 pr-9 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  >
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-ink" />
                </div>
              </Field>
              <Field label="Visit type">
                <div className="relative">
                  <ClipboardCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-ink" />
                  <select
                    value={visitId}
                    onChange={(e) => setVisitId(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-white pl-10 pr-9 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  >
                    {VISIT_TYPES.map((v) => <option key={v.id} value={v.id}>{v.label} — ${v.price}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-ink" />
                </div>
              </Field>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">Day</span>
                <TogglePill leftLabel="Weekday" rightLabel="Weekend (+$25)" value={weekend} onChange={setWeekend} />
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">Priority</span>
                <TogglePill leftLabel="Standard" rightLabel="Urgent (+$35)" value={urgent} onChange={setUrgent} />
              </div>
            </div>

            {/* Inclusions */}
            <div className="mt-7 rounded-2xl bg-[#F4F8FF] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">What's included</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-[13px] text-foreground">
                {[
                  "Board-certified NP visit",
                  "Full clinical assessment",
                  "E-prescriptions when needed",
                  "Written visit summary",
                  "Pharmacy coordination",
                  "Insurance-ready receipt",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#2ECC8B]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: invoice */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 overflow-hidden rounded-3xl border border-border bg-white shadow-lift">
            {/* Header */}
            <div className="relative overflow-hidden px-7 py-6 text-white" style={{ background: "linear-gradient(135deg, #0D4A7A, #1B6CA8)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Live estimate</p>
                  <p className="mt-1 font-display text-lg font-bold">{visit.label} · {city}</p>
                </div>
                <FileText className="h-6 w-6 text-white/60" />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-sm text-white/70">Total today</span>
                <span className="font-display font-extrabold text-[44px] tabular-nums leading-none">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-right text-[11px] text-white/55">HST included</p>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              <dl className="space-y-2.5 text-sm">
                <Row label={`${visit.label} base fee`} value={`$${base.toFixed(2)}`} />
                {weekend && <Row label="Weekend surcharge" value="+$25.00" />}
                {urgent && <Row label="Urgent priority" value="+$35.00" />}
                <div className="my-3 border-t border-dashed border-border" />
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="HST (13%)" value={`+$${hst.toFixed(2)}`} />
              </dl>

              <Link
                to="/book"
                className="mt-6 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full text-base font-semibold text-white shadow-lift transition-transform hover:scale-[1.01] btn-press"
                style={{ backgroundColor: "#E8471C" }}
              >
                Book at this price <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-5 flex flex-col gap-2 text-[12px] text-secondary-ink">
                <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> Secure Stripe payment · PCI-DSS Level 1</span>
                <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-primary" /> Itemized receipt for benefits / HSA claims</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" /> Free cancellation up to 2 hours before visit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-2">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground">
      <dt className="text-secondary-ink">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function TogglePill({
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  leftLabel: string;
  rightLabel: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-full border border-border bg-[#F4F8FF] p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-full py-2 transition-colors ${!value ? "bg-primary text-white" : "text-secondary-ink"}`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-full py-2 transition-colors ${value ? "bg-primary text-white" : "text-secondary-ink"}`}
      >
        {rightLabel}
      </button>
    </div>
  );
}

/* ──────────────────────────── WHY CHOOSE US ──────────────────────────── */

function WhyChooseUs() {
  const features = [
    {
      icon: BadgeCheck,
      title: "Board-Certified Nurse Practitioners",
      body: "Every NP is licensed by the College of Nurses of Ontario, fully insured, and background-checked annually.",
      meta: "100% CNO-registered",
    },
    {
      icon: Lock,
      title: "PHIPA-Compliant Records",
      body: "Encrypted end-to-end. Charts stored in Canadian data residency and shared only with your consent.",
      meta: "Audited yearly",
    },
    {
      icon: MapPin,
      title: "Real-Time NP Tracking",
      body: "Live ETA, NP profile, and arrival updates straight to your phone — like you'd expect from a modern service.",
      meta: "Live in-app updates",
    },
    {
      icon: Clock,
      title: "Same-Day Appointments",
      body: "Most bookings confirmed within 15 minutes. Average door-to-door arrival under 3 hours, 7 days a week.",
      meta: "7 AM – 10 PM daily",
    },
    {
      icon: CreditCard,
      title: "Transparent Pricing",
      body: "See the full price before you confirm. HST-inclusive receipts for extended health benefits and HSA claims.",
      meta: "No hidden fees",
    },
    {
      icon: ShieldCheck,
      title: "Backed by Pediatricians",
      body: "Our clinical advisory board reviews protocols quarterly to keep care aligned with Canadian Paediatric Society guidance.",
      meta: "CPS-aligned protocols",
    },
  ];
  return (
    <Section bg="#FFFFFF">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[#F4F8FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Why Pediatric Urgent Care™
          </span>
          <h2 className="mt-5 font-display font-bold text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] text-foreground">
            Healthcare built around <span className="text-primary">your family's life</span>.
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[16px] text-secondary-ink leading-relaxed">
            We know you're busy. We know the ER is stressful. We built a calmer, faster, and more accountable way to care for your child at home.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="group relative flex flex-col bg-white p-7 transition-colors hover:bg-[#F8FBFF]"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F1FA] text-primary transition-transform group-hover:scale-105">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-[18px] font-bold leading-snug text-foreground">{f.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-secondary-ink">{f.body}</p>
            <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-semibold text-[#047857]">
              <Check className="h-3 w-3" /> {f.meta}
            </p>
          </article>
        ))}
      </div>

      {/* Compliance bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-[#F4F8FF] px-6 py-5 text-sm sm:flex-row">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-secondary-ink">
          <span className="inline-flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" /> Trusted credentials:
          </span>
          <span>College of Nurses of Ontario</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>PHIPA & PIPEDA</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>Canadian Paediatric Society aligned</span>
        </div>
        <Link
          to="/providers"
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Meet our NPs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ──────────────────────────── FAQ ──────────────────────────── */

const FAQS = [
  {
    q: "What cities in Ontario do you serve?",
    a: "We currently serve Milton, Halton Hills, Hamilton, Oakville, Mississauga, Burlington, and Brampton. We are expanding regularly — join our waitlist if you don't see your city.",
  },
  {
    q: "How quickly can a Nurse Practitioner arrive?",
    a: "Most visits are confirmed within 15 minutes of booking. Average arrival time is 2–4 hours, with same-day availability in all cities.",
  },
  {
    q: "Are your Nurse Practitioners licensed in Ontario?",
    a: "Yes. All NPs are licensed with the College of Nurses of Ontario, fully insured, and background-checked.",
  },
  {
    q: "Do you accept OHIP or private insurance?",
    a: "Currently our visits are private pay. We provide official receipts that can be submitted to most extended health benefits plans for reimbursement.",
  },
  {
    q: "How does payment work?",
    a: "You pay securely online at the time of booking via credit or debit card through Stripe. A full receipt is emailed immediately.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes. Free cancellation or rescheduling is available up to 2 hours before your scheduled visit.",
  },
  {
    q: "What if my child needs a prescription?",
    a: "Ontario NPs have full prescribing authority. If a prescription is clinically appropriate, your NP can issue it directly during the visit.",
  },
  {
    q: "Can I request the same NP for future visits?",
    a: "Yes. Once you've had a great experience with an NP, you can request them for future bookings through your parent portal.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section bg="#F4F8FF">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left rail */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <HelpCircle className="h-3 w-3" /> Common questions
            </span>
            <h2 className="mt-5 font-display font-bold text-[30px] sm:text-[40px] leading-[1.1] text-foreground">
              Answers, before<br />you even ask.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-secondary-ink">
              Real questions from Ontario parents — answered by our clinical team. Can't find what you're looking for?
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Still need help?</p>
              <p className="mt-2 text-sm text-secondary-ink">Our care team responds 7 days a week.</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href="tel:+19051234567"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                >
                  <Phone className="h-3.5 w-3.5" /> (905) 123-4567
                </a>
                <a
                  href="mailto:hello@pediatricurgentcare.ca"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" /> Email our team
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Accordion */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft divide-y divide-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`transition-colors ${isOpen ? "bg-[#F8FBFF]" : "bg-white"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-colors ${
                          isOpen ? "bg-primary text-white" : "bg-[#E8F1FA] text-primary"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-semibold text-[16px] leading-snug ${isOpen ? "text-primary" : "text-foreground"}`}>
                        {f.q}
                      </span>
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "border-primary bg-primary text-white rotate-180"
                          : "border-border bg-white text-secondary-ink"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[60px] text-[15px] text-secondary-ink leading-[1.7]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────── FINAL CTA ──────────────────────────── */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-[110px] text-white">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg, #0D4A7A 0%, #1B6CA8 50%, #0D4A7A 100%)" }}
      />
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]">
        <defs>
          <pattern id="ctagrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctagrid)" />
      </svg>
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,232,182,0.28) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)" }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7CE8B6] animate-pulse" /> Now accepting bookings
            </span>
            <h2 className="mt-5 font-display font-bold text-[36px] sm:text-[52px] lg:text-[60px] leading-[1.02] text-white">
              Your child deserves care<br />
              <span style={{ color: "#7CE8B6" }}>without the wait.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/80">
              Book a home visit today — a certified Nurse Practitioner at your door in hours, not days.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/book"
                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[16px] font-semibold text-primary shadow-lift hover:scale-[1.02] btn-press transition-transform"
              >
                Book a home visit <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+19051234567"
                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/5 px-7 text-[16px] font-semibold text-white backdrop-blur hover:bg-white hover:text-primary btn-press transition-colors"
              >
                <Phone className="h-4 w-4" /> (905) 123-4567
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/75">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[#7CE8B6]" /> 7 AM – 10 PM, 7 days a week</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#7CE8B6]" /> All Southern Ontario cities</span>
              <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-[#7CE8B6]" /> PHIPA-secure booking</span>
            </div>
          </div>

          {/* Right info card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7CE8B6]/15 text-[#7CE8B6]">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Average wait today</p>
                  <p className="font-display text-2xl font-bold text-white">2h 14m to your door</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-5 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-white">15<span className="text-base">min</span></p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">Avg booking confirm</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">48+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">NPs on call</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">4.9★</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/60">Parent rating</p>
                </div>
              </div>
              <p className="mt-5 text-[12px] text-white/55 text-center">
                Not a medical emergency? For life-threatening symptoms, call 911 immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── SHARED ──────────────────────────── */

function Section({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <section style={{ backgroundColor: bg }} className="py-16 lg:py-[100px]">
      <div className="container-page">{children}</div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
  center,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {label && (
        <p className="text-xs font-semibold tracking-[0.25em] text-primary">{label}</p>
      )}
      <h2 className="mt-3 font-display font-bold text-[30px] sm:text-[42px] leading-[1.1]">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-secondary-ink leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}