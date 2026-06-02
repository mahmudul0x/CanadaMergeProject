// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle, ArrowRight, Award, BadgeCheck, Brain, CalendarCheck,
  Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Facebook,
  Globe, Heart, Home as HomeIcon, Instagram, Lock, Mail, MapPin,
  Phone, Quote, ShieldCheck, Smartphone, Sparkles, Star,
  Stethoscope, Thermometer, TrendingUp, UserCheck, Video, X, Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-np-home-visit.jpg";
import heroCheckup from "@/assets/hero-np-checkup.jpg";
import heroToddler from "@/assets/hero-np-toddler.jpg";
import heroVaccine from "@/assets/hero-np-vaccine.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pediatric Urgent Care™ — Expert Care. At Your Door." },
      { name: "description", content: "Board-certified Nurse Practitioners visit your home across Ontario. Same-day pediatric sick visits, vaccinations, and follow-ups. PHIPA compliant." },
    ],
  }),
  component: HomePage,
});

/* ── constants ── */
const CITIES_LIST = ["Milton", "Oakville", "Hamilton", "Halton Hills", "Mississauga", "Burlington", "Brampton"];

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
function HomePage() {
  return (
    <div className="font-sans text-[#0D1B2A] bg-white">
      <SeasonalAlert />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <CareOptions />
      <TelemedicineSection />
      <LocationsSection />
      <WhyTrustUs />
      <TrustBadges />
      <Testimonials />
      <BlogPreview />
      <FAQSection />
      <ParentPortalSection />
      <BottomCTASection />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TOP BANNER (navy bar)
════════════════════════════════════════════════════════ */
function TopBanner() {
  return (
    <div className="bg-[#0D1B2A] text-white text-xs font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />PHIPA &amp; PIPEDA Compliant</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-white/70">Trusted Pediatric Care Across Ontario</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/careers" className="text-white/70 hover:text-white transition-colors">Careers</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">Français</a>
          <Link to="/login" className="flex items-center gap-1.5 bg-[#1B6CA8] hover:bg-[#1558891] text-white px-3 py-1 rounded-full transition-colors">
            <UserCheck className="h-3 w-3" /> Patient Portal Login
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  { src: heroImage,    alt: "Nurse practitioner with child at home",       label: "In-Home Sick Visits",    sub: "Fever, infections & more"       },
  { src: heroCheckup,  alt: "Well-child checkup in bright living room",    label: "Well-Child Checkups",    sub: "Growth & development"            },
  { src: heroToddler,  alt: "Nurse practitioner examining toddler",        label: "Gentle, Kid-Friendly Care", sub: "Comfort of home"              },
  { src: heroVaccine,  alt: "Nurse practitioner giving vaccine to child",  label: "Routine Vaccinations",   sub: "On schedule, at your door"      },
];

function Hero() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#0D1B2A]" style={{ minHeight: "calc(100vh - 105px)" }}>

      {/* ── Full-cover background images ── */}
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Left gradient overlay — makes text readable, fades to transparent at 55% */}
      <div className="absolute inset-0 hidden lg:block" style={{
        background: "linear-gradient(to right, rgba(238,244,251,0.98) 0%, rgba(238,244,251,0.95) 30%, rgba(238,244,251,0.80) 48%, rgba(238,244,251,0.0) 58%)"
      }} />
      {/* Mobile full overlay */}
      <div className="absolute inset-0 lg:hidden bg-[#EEF4FB]/90" />

      {/* ── Content overlay ── */}
      <div className="relative z-10 flex items-center h-full" style={{ minHeight: "calc(100vh - 105px)" }}>
        <div className="w-full lg:w-[52%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16">

          <h1 className="font-display font-extrabold text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight text-[#0D1B2A]">
            Expert Pediatric Care.
            <br />Where &amp; When You
            <br /><span className="text-[#C0392B]">Need It.</span>
          </h1>

          <p className="mt-4 text-[15px] text-[#4A6580] leading-relaxed max-w-[440px]">
            In-clinic, virtual, or in the comfort of your home —<br />
            we make quality care easy for your family.
          </p>

          {/* Feature icons row */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {[
              { icon: CalendarCheck, label: "Same-Day",    sub: "Appointments"        },
              { icon: HomeIcon,      label: "Home Visits", sub: "Across GTA"           },
              { icon: Video,         label: "Telemedicine",sub: "7 Days a Week"        },
              { icon: Heart,         label: "Trusted by",  sub: "Thousands of Parents" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center w-[72px]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#D6E4F0] shadow-sm">
                  <f.icon className="h-5 w-5 text-[#1B6CA8]" />
                </span>
                <p className="mt-1.5 text-[11px] font-bold text-[#0D1B2A] leading-tight">{f.label}</p>
                <p className="text-[10px] text-[#4A6580] leading-tight">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/book"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#1B3A5A] text-white text-[14px] font-bold px-6 py-3 rounded-full shadow-md transition-all">
              Book a Visit <CalendarCheck className="h-4 w-4" />
            </Link>
            <Link to="/symptom-checker"
              className="inline-flex items-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] text-[14px] font-bold px-6 py-3 rounded-full hover:bg-[#0D1B2A] hover:text-white transition-all">
              Virtual Visit <Video className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold text-[#2D6A4F]">
            <ShieldCheck className="h-4 w-4 text-[#2ECC8B]" />
            <span>PHIPA Compliant</span>
            <span className="text-[#B0BEC5] mx-1">•</span>
            <span>Secure</span>
            <span className="text-[#B0BEC5] mx-1">•</span>
            <span>Trusted</span>
          </div>
        </div>
      </div>

      {/* ── Slide dots bottom left ── */}
      <div className="absolute bottom-5 left-6 lg:left-14 z-20 flex gap-1.5">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-[#1B6CA8]" : "w-2 bg-[#1B6CA8]/30 hover:bg-[#1B6CA8]/60"}`} />
        ))}
      </div>

    </section>
  );
}

/* ════════════════════════════════════════════════════════
   TRUST BAR (stats strip)
════════════════════════════════════════════════════════ */
function TrustBar() {
  return (
    <div className="bg-white border-y border-[#D6E4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "2,400+", label: "Families Served" },
            { value: "4.9 ★",  label: "Google Rating",  accent: true },
            { value: "48+",    label: "NPs on Call" },
            { value: "<3 hr",  label: "Avg Arrival Time" },
          ].map((s) => (
            <div key={s.label}>
              <p className={`font-display font-extrabold text-2xl ${s.accent ? "text-[#F5A623]" : "text-[#1B6CA8]"}`}>{s.value}</p>
              <p className="text-xs text-[#4A6580] font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SEASONAL ALERT BANNER  (#10)
════════════════════════════════════════════════════════ */
function SeasonalAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="bg-[#FFF3CD] border-b border-[#F5C842]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-1">
          <AlertTriangle className="h-4 w-4 text-[#B45309] shrink-0" />
          <p className="text-[13px] font-semibold text-[#7C4A00]">
            <strong>Flu Season Alert:</strong> High demand expected across GTA — book early to secure same-day availability.
            <Link to="/book" className="ml-2 underline hover:no-underline font-bold text-[#1B6CA8]">Book now →</Link>
          </p>
        </div>
        <button onClick={() => setVisible(false)} className="shrink-0 text-[#B45309] hover:text-[#7C4A00] transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HOW IT WORKS  (#3)
════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: CalendarCheck,
      iconBg: "#E8F1FA",
      iconColor: "#1B6CA8",
      title: "Book in 2 Minutes",
      body: "Choose your city, visit type, and preferred time slot online. Pay securely. Confirmation in under 15 minutes.",
      tag: "Available 7AM – 10PM daily",
    },
    {
      num: "02",
      icon: UserCheck,
      iconBg: "#ECFDF5",
      iconColor: "#047857",
      title: "NP Confirmed Instantly",
      body: "A certified, insured Nurse Practitioner is assigned and you receive their profile with live ETA tracking.",
      tag: "Usually within 15 minutes",
    },
    {
      num: "03",
      icon: HomeIcon,
      iconBg: "#EEF3FF",
      iconColor: "#1B6CA8",
      title: "Care at Your Door",
      body: "Your NP arrives fully equipped. Assessment, diagnosis, and treatment plan — all in the comfort of your home.",
      tag: "Avg arrival: 2–4 hours",
    },
  ];

  return (
    <section className="bg-[#F7FAFE] py-14 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F1FA] text-[#1B6CA8] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            <Zap className="h-3 w-3" /> Simple Process
          </span>
          <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-[#0D1B2A]">
            Expert Care in 3 Simple Steps
          </h2>
          <p className="mt-2 text-[14px] text-[#4A6580] max-w-xl mx-auto">
            From booking to bedside in hours — no waiting rooms, no stress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px border-t-2 border-dashed border-[#C8D8EC]" />

          {steps.map((s, i) => (
            <div key={s.num} className="bg-white rounded-2xl border border-[#E8EFF7] p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative">
              <span className="absolute top-5 right-5 font-display font-extrabold text-[56px] leading-none text-[#EEF4FB] select-none">{s.num}</span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: s.iconBg }}>
                <s.icon className="h-7 w-7" style={{ color: s.iconColor }} />
              </span>
              <h3 className="mt-5 font-display font-bold text-[17px] text-[#0D1B2A]">{s.title}</h3>
              <p className="mt-2 text-[13px] text-[#4A6580] leading-relaxed">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 bg-[#EEF4FB] text-[#1B6CA8] text-[11px] font-bold px-3 py-1.5 rounded-full">
                <Check className="h-3 w-3" /> {s.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 bg-[#1B6CA8] text-white font-bold px-7 py-3 rounded-full hover:bg-[#155892] transition-colors shadow-md">
            Book Your Visit Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   CARE OPTIONS CAROUSEL
════════════════════════════════════════════════════════ */
const CARE_OPTIONS = [
  { icon: Stethoscope, color: "#1B6CA8", bg: "#E8F1FA", title: "Pediatrics",           desc: "Complete medical care for infants, children & adolescents.", badge: null },
  { icon: UserCheck,   color: "#047857", bg: "#ECFDF5", title: "Walk-In Care",          desc: "No appointment? Walk in for quick, convenient care.",         badge: null },
  { icon: Thermometer, color: "#D52B1E", bg: "#FEF0EE", title: "Pediatric Urgent Care", desc: "Urgent care for non-life threatening illnesses & injuries.",   badge: null },
  { icon: Video,       color: "#6D28D9", bg: "#F0EEFF", title: "Telemedicine",          desc: "See a provider from the comfort of your home.",               badge: null },
  { icon: HomeIcon,    color: "#B45309", bg: "#FEF3C7", title: "Home Visits",           desc: "We come to you. Care for your child at home.",                badge: "NEW" },
];

function CareOptions() {
  const [start, setStart] = useState(0);
  const perPage = 5;
  const canPrev = start > 0;
  const canNext = start + perPage < CARE_OPTIONS.length;

  return (
    <section className="bg-white py-12 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-[#0D1B2A]">
            Care Options for Every Family
          </h2>
          <p className="mt-1.5 text-[14px] text-[#4A6580]">
            Comprehensive pediatric care designed around your needs.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={() => canPrev && setStart(start - 1)}
            disabled={!canPrev}
            className="shrink-0 h-9 w-9 rounded-full border border-[#D6E4F0] bg-white shadow-sm flex items-center justify-center disabled:opacity-25 hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CARE_OPTIONS.slice(start, start + perPage).map((c) => (
              <div
                key={c.title}
                className="border border-[#E8EFF7] rounded-xl p-5 bg-white hover:shadow-md hover:border-[#C8D8EC] transition-all cursor-pointer group text-center flex flex-col items-center"
              >
                {/* Circle icon */}
                <span
                  className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-full"
                  style={{ backgroundColor: c.bg }}
                >
                  <c.icon className="h-7 w-7" style={{ color: c.color }} />
                </span>

                {/* Title + badge */}
                <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-[13px] text-[#0D1B2A] leading-snug">{c.title}</h3>
                  {c.badge && (
                    <span className="bg-[#D52B1E] text-white text-[8px] font-extrabold px-1.5 py-[2px] rounded-sm tracking-wide">
                      {c.badge}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2 text-[12px] text-[#4A6580] leading-snug flex-1">{c.desc}</p>

                {/* Learn more */}
                <Link
                  to="/services"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#1B6CA8] group-hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => canNext && setStart(start + 1)}
            disabled={!canNext}
            className="shrink-0 h-9 w-9 rounded-full border border-[#D6E4F0] bg-white shadow-sm flex items-center justify-center disabled:opacity-25 hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   TELEMEDICINE SECTION  (#7)
════════════════════════════════════════════════════════ */
function TelemedicineSection() {
  return (
    <section className="bg-[#0D1B2A] py-14 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#1B6CA8]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#2ECC8B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/15">
              <Video className="h-3 w-3 text-[#2ECC8B]" /> Virtual Care
            </span>
            <h2 className="font-display font-bold text-[26px] sm:text-[32px] text-white leading-tight">
              See a Pediatric NP<br />
              <span className="text-[#2ECC8B]">from Anywhere in Ontario</span>
            </h2>
            <p className="mt-4 text-[14px] text-white/70 leading-relaxed max-w-lg">
              No travel. No waiting rooms. Connect via secure video with a board-certified Nurse Practitioner for non-emergency concerns — from any device, any time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Available 7AM – 10PM, 7 days a week",
                "PHIPA-compliant encrypted video",
                "Prescriptions issued when appropriate",
                "Lab referrals & follow-up included",
                "Available province-wide in Ontario",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[13px] text-white/80">
                  <span className="h-5 w-5 rounded-full bg-[#2ECC8B]/20 border border-[#2ECC8B]/40 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-[#2ECC8B]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="inline-flex items-center gap-2 bg-[#2ECC8B] text-[#0D1B2A] font-bold px-6 py-3 rounded-full hover:bg-[#27b87c] transition-colors shadow-lg">
                <Video className="h-4 w-4" /> Start a Virtual Visit
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-white/40">From $49 · No insurance required · Receipt provided</p>
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock,       title: "Seen in minutes",  desc: "Average wait under 10 min during peak hours" },
              { icon: ShieldCheck, title: "100% Secure",      desc: "End-to-end encrypted. PHIPA compliant always" },
              { icon: Brain,       title: "AI-Assisted",      desc: "Symptom checker helps prepare before your visit" },
              { icon: Heart,       title: "Kid-Friendly",     desc: "Pediatric specialists who make kids comfortable" },
            ].map((f) => (
              <div key={f.title} className="bg-white/8 border border-white/10 rounded-2xl p-5 hover:bg-white/12 transition-colors">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 mb-3">
                  <f.icon className="h-5 w-5 text-[#2ECC8B]" />
                </span>
                <p className="font-bold text-[13px] text-white">{f.title}</p>
                <p className="text-[12px] text-white/55 mt-1 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   LOCATIONS
════════════════════════════════════════════════════════ */
const LOCATION_DATA = [
  { name: "Milton",   address: "789 Main St E, Milton, ON L9T 3Z3",                 hours: "Mon–Sun: 8AM – 10PM", img: heroToddler },
  { name: "Oakville", address: "2200 Winston Park Dr, Oakville, ON L6H 5R7",        hours: "Mon–Sun: 8AM – 10PM", img: heroCheckup },
  { name: "Hamilton", address: "255 John St S, Hamilton, ON L8P 3H1",               hours: "Mon–Sun: 8AM – 10PM", img: heroVaccine },
  { name: "Halton",   address: "Multiple clinics across Burlington & Halton Hills",  hours: "Mon–Sun: 8AM – 10PM", img: heroImage   },
];

/* GTA map pins — approximate screen positions as % */
const GTA_PINS = [
  { city: "Mississauga", x: 62, y: 48 },
  { city: "Brampton",    x: 52, y: 30 },
  { city: "Oakville",    x: 47, y: 58 },
  { city: "Burlington",  x: 37, y: 65 },
  { city: "Milton",      x: 30, y: 50 },
  { city: "Hamilton",    x: 18, y: 72 },
  { city: "Halton Hills",x: 28, y: 28 },
];

function LocationsSection() {
  return (
    <section className="bg-[#EEF4FB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-[#0D1B2A]">
              Care Across the GTA
            </h2>
            <p className="mt-1 text-[14px] text-[#4A6580]">
              Multiple convenient locations and home visit coverage.
            </p>
          </div>
          <Link to="/locations"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold text-[#0D1B2A] bg-white border border-[#D6E4F0] px-4 py-2 rounded-full shadow-sm hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
            <MapPin className="h-3.5 w-3.5" /> View All Locations
          </Link>
        </div>

        {/* Cards + Map row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_280px] gap-4 items-stretch">

          {/* 4 Location cards */}
          {LOCATION_DATA.map((loc) => (
            <div key={loc.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-[#E8EFF7] hover:border-[#B8D0E8] flex flex-col">

              {/* Photo */}
              <div className="relative overflow-hidden" style={{ height: 160 }}>
                <img
                  src={loc.img}
                  alt={`Pediatric care in ${loc.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-[16px] text-[#0D1B2A]">{loc.name}</h3>
                <p className="text-[12px] text-[#4A6580] mt-1.5 leading-relaxed flex-1">{loc.address}</p>
                <p className="text-[12px] text-[#4A6580] mt-2">{loc.hours}</p>
                <Link to="/book"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1B6CA8] hover:gap-3 transition-all">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}

          {/* Map panel */}
          <div className="hidden lg:flex flex-col rounded-2xl overflow-hidden shadow-sm border border-[#D6E4F0] bg-[#1a2f4e]" style={{ minHeight: 380 }}>

            {/* SVG illustrated GTA map */}
            <div className="relative flex-1">
              <svg viewBox="0 0 280 340" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                {/* Background */}
                <rect width="280" height="340" fill="#1a2f4e" />

                {/* Lake Ontario water */}
                <path d="M0,240 Q40,228 80,234 Q130,240 180,232 Q220,226 260,234 Q270,236 280,238 L280,340 L0,340 Z" fill="#142640" />
                <path d="M0,252 Q50,244 100,250 Q150,256 200,248 Q240,243 280,250 L280,340 L0,340 Z" fill="#0f1e30" opacity="0.7" />

                {/* Shoreline glow */}
                <path d="M0,238 Q60,228 120,234 Q180,240 240,232 Q260,229 280,232" fill="none" stroke="#2d5a8e" strokeWidth="1.5" opacity="0.6" />

                {/* GTA region fill */}
                <path d="M40,80 Q70,60 110,55 Q155,48 195,60 Q225,70 245,100 Q258,125 252,160 Q244,195 220,220 Q190,245 155,248 Q120,250 95,238 Q68,224 52,196 Q36,168 36,130 Q36,104 40,80 Z"
                  fill="#1e3a5f" opacity="0.9" />

                {/* Road network lines */}
                <line x1="70" y1="55" x2="70" y2="245" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="110" y1="50" x2="110" y2="248" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="155" y1="48" x2="155" y2="250" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="200" y1="55" x2="200" y2="242" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="36" y1="120" x2="255" y2="120" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="36" y1="160" x2="252" y2="160" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />
                <line x1="40" y1="200" x2="235" y2="200" stroke="#2a4a6e" strokeWidth="0.8" opacity="0.5" />

                {/* City pins */}
                {GTA_PINS.map((p) => {
                  const cx = (p.x / 100) * 280;
                  const cy = (p.y / 100) * 340;
                  return (
                    <g key={p.city}>
                      {/* Pulse ring */}
                      <circle cx={cx} cy={cy} r={9} fill="#C0392B" opacity="0.25" />
                      {/* Pin body */}
                      <circle cx={cx} cy={cy} r={6} fill="#E74C3C" />
                      {/* Pin shine */}
                      <circle cx={cx} cy={cy} r={2.5} fill="white" opacity="0.9" />
                      {/* City label */}
                      <text x={cx + 9} y={cy + 4} fontSize="7" fill="white" opacity="0.8" fontWeight="600">{p.city}</text>
                    </g>
                  );
                })}
              </svg>

              {/* Live badge top */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-white/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC8B] opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-[#2ECC8B]" />
                  </span>
                  Live Service Area
                </span>
              </div>
            </div>

            {/* View All bottom strip */}
            <div className="px-4 py-3.5 bg-[#142640] border-t border-white/10">
              <Link to="/locations"
                className="flex items-center justify-center gap-2 text-white text-[12px] font-bold hover:text-[#2ECC8B] transition-colors">
                <MapPin className="h-3.5 w-3.5" /> View All Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   TRUST BADGES  (#8)
════════════════════════════════════════════════════════ */
function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, label: "PHIPA Compliant",       sub: "Health data protection"    },
    { icon: BadgeCheck,  label: "CNO Licensed NPs",      sub: "College of Nurses, Ontario" },
    { icon: Lock,        label: "PCI-DSS Level 1",       sub: "Secure payment processing" },
    { icon: Award,       label: "CPS-Aligned Protocols", sub: "Canadian Paediatric Society"},
    { icon: ShieldCheck, label: "PIPEDA Compliant",      sub: "Privacy law compliant"     },
    { icon: Star,        label: "4.9★ Google Verified",  sub: "2,400+ parent reviews"     },
  ];
  return (
    <section className="bg-white py-10 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-[#4A6580] mb-7">
          Trusted credentials &amp; compliance
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center p-4 rounded-2xl border border-[#E8EFF7] bg-[#F7FAFE] hover:border-[#1B6CA8] hover:shadow-sm transition-all">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#D6E4F0] shadow-sm mb-2.5">
                <b.icon className="h-5 w-5 text-[#1B6CA8]" />
              </span>
              <p className="font-bold text-[12px] text-[#0D1B2A] leading-snug">{b.label}</p>
              <p className="text-[11px] text-[#4A6580] mt-0.5">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   TESTIMONIALS  (#1)
════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Sarah M.",    city: "Milton",      initials: "SM", rating: 5,
    quote: "Our NP arrived within 2 hours on a Sunday evening. My daughter had an ear infection and was treated right at home. I can't recommend this enough. The NP was so calm and gentle with her.",
  },
  {
    name: "David K.",    city: "Oakville",    initials: "DK", rating: 5,
    quote: "We used to spend 4 hours in the ER every time our son spiked a fever. Now we just book online and a nurse comes to us within a few hours. It has genuinely changed our lives as parents.",
  },
  {
    name: "Priya S.",    city: "Hamilton",    initials: "PS", rating: 5,
    quote: "The vaccination visit was seamless and professional. Our toddler barely noticed. The NP was incredible with him. Worth every penny and we've already booked again.",
  },
  {
    name: "Jordan R.",   city: "Burlington",  initials: "JR", rating: 5,
    quote: "Booked at 9PM for a sick visit and the NP was at our door by 11PM. Diagnosis confirmed, prescription sent to the pharmacy. My son was sleeping comfortably by midnight.",
  },
  {
    name: "Mei L.",      city: "Mississauga", initials: "ML", rating: 5,
    quote: "The follow-up care after my daughter's hospital visit was exceptional. The NP reviewed her records, checked in thoroughly, and gave us a written summary. True peace of mind.",
  },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const total = TESTIMONIALS.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const shown = [0, 1, 2].map((offset) => TESTIMONIALS[(idx + offset) % total]);

  return (
    <section className="bg-[#F7FAFE] py-14 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#E8F1FA] text-[#1B6CA8] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              <Quote className="h-3 w-3" /> Parent Reviews
            </span>
            <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-[#0D1B2A]">
              Trusted by Ontario Families
            </h2>
            <p className="mt-1.5 text-[14px] text-[#4A6580]">
              Verified reviews from real parents after every visit.
            </p>
          </div>
          {/* Avg rating */}
          <div className="flex items-center gap-3 bg-white border border-[#E8EFF7] rounded-2xl px-5 py-3 shadow-sm">
            <div className="text-center">
              <p className="font-display font-extrabold text-[28px] text-[#F5A623] leading-none">4.9</p>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#F5A623] text-[#F5A623]" />)}
              </div>
            </div>
            <div className="border-l border-[#E8EFF7] pl-3">
              <p className="text-[12px] font-bold text-[#0D1B2A]">Google Rating</p>
              <p className="text-[11px] text-[#4A6580]">2,400+ reviews</p>
              <p className="text-[11px] text-[#2ECC8B] font-bold mt-0.5">✓ Verified</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E8EFF7] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, k) => <Star key={k} className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />)}
              </div>
              {/* Quote */}
              <p className="text-[13px] text-[#4A6580] leading-relaxed flex-1">"{t.quote}"</p>
              {/* Author */}
              <div className="mt-5 pt-4 border-t border-[#EEF2F7] flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B6CA8] text-white text-[12px] font-bold">
                  {t.initials}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#0D1B2A]">{t.name}</p>
                  <p className="text-[11px] text-[#4A6580] flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {t.city}, Ontario
                    <span className="ml-1 text-[#2ECC8B] font-bold">· Verified</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <button onClick={prev} className="h-9 w-9 rounded-full border border-[#D6E4F0] bg-white flex items-center justify-center hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[#1B6CA8]" : "w-2 bg-[#D6E4F0] hover:bg-[#B0C4D8]"}`} />
            ))}
          </div>
          <button onClick={next} className="h-9 w-9 rounded-full border border-[#D6E4F0] bg-white flex items-center justify-center hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors shadow-sm">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   BLOG PREVIEW  (#5)
════════════════════════════════════════════════════════ */
const BLOGS = [
  {
    tag: "Child Health",   tagColor: "#1B6CA8",
    title: "When Should You Call a Pediatric NP vs. Go to the ER?",
    excerpt: "Knowing the difference can save you hours of waiting and reduce unnecessary stress. Here's a parent-friendly guide to help you decide.",
    date: "Nov 10, 2024",   readTime: "4 min read", img: heroCheckup,
  },
  {
    tag: "Vaccinations",   tagColor: "#047857",
    title: "Ontario's 2024–2025 Childhood Vaccination Schedule Explained",
    excerpt: "Everything you need to know about the updated vaccine schedule, what's new, and how at-home vaccination visits work.",
    date: "Nov 5, 2024",    readTime: "5 min read", img: heroVaccine,
  },
  {
    tag: "Flu Season",     tagColor: "#B45309",
    title: "5 Signs Your Child's Cold Has Turned Into Something More Serious",
    excerpt: "Runny nose or something worse? A board-certified NP explains the warning signs parents should never ignore.",
    date: "Oct 28, 2024",   readTime: "3 min read", img: heroToddler,
  },
];

function BlogPreview() {
  return (
    <section className="bg-white py-14 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#E8F1FA] text-[#1B6CA8] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              <TrendingUp className="h-3 w-3" /> Health Resources
            </span>
            <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-[#0D1B2A]">
              Tips from Our Clinical Team
            </h2>
            <p className="mt-1.5 text-[14px] text-[#4A6580]">Evidence-based pediatric health articles for Ontario parents.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1B6CA8] border border-[#D6E4F0] px-4 py-2 rounded-full hover:border-[#1B6CA8] hover:bg-[#EEF4FB] transition-colors">
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOGS.map((b) => (
            <Link to="/blog" key={b.title}
              className="bg-white rounded-2xl border border-[#E8EFF7] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              {/* Image */}
              <div className="h-44 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: b.tagColor }}>
                    {b.tag}
                  </span>
                  <span className="text-[11px] text-[#4A6580]">{b.readTime}</span>
                </div>
                <h3 className="font-display font-bold text-[15px] text-[#0D1B2A] leading-snug flex-1">{b.title}</h3>
                <p className="mt-2 text-[12px] text-[#4A6580] leading-relaxed line-clamp-2">{b.excerpt}</p>
                <div className="mt-4 pt-3 border-t border-[#EEF2F7] flex items-center justify-between">
                  <span className="text-[11px] text-[#4A6580]">{b.date}</span>
                  <span className="text-[12px] font-bold text-[#1B6CA8] group-hover:gap-2 flex items-center gap-1 transition-all">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   FAQ SECTION  (#6)
════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "What cities in Ontario do you serve?",              a: "We currently serve Milton, Halton Hills, Hamilton, Oakville, Mississauga, Burlington, and Brampton. We are expanding monthly — join our waitlist if your city is not listed." },
  { q: "How quickly can a Nurse Practitioner arrive?",      a: "Most visits are confirmed within 15 minutes of booking. Average arrival is 2–4 hours, with same-day availability across all cities, 7 days a week from 7AM to 10PM." },
  { q: "Are your Nurse Practitioners licensed in Ontario?", a: "Yes. Every NP is fully licensed with the College of Nurses of Ontario (CNO), comprehensively insured, and background-checked annually before joining our team." },
  { q: "Do you accept OHIP or private insurance?",          a: "Currently our visits are private-pay. We provide official itemized receipts that can be submitted to most extended health benefit plans and Health Spending Accounts (HSA)." },
  { q: "Can NPs prescribe medications?",                    a: "Yes — Ontario NPs have full prescribing authority. If a prescription is clinically appropriate, your NP can issue it directly during the visit and send it to your pharmacy." },
  { q: "Can I use Telemedicine for my child?",              a: "Absolutely. Virtual visits are available province-wide in Ontario for non-emergency concerns. From $49, available 7AM–10PM, 7 days a week from any device." },
  { q: "What if I need to cancel or reschedule?",           a: "Free cancellation or rescheduling is available up to 2 hours before your scheduled visit. You can manage bookings directly from your Parent Portal account." },
  { q: "Is my health data secure?",                         a: "Yes. All patient data is encrypted end-to-end, stored in Canadian data centres, and protected under PHIPA and PIPEDA. We undergo annual third-party security audits." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="bg-[#F7FAFE] py-14 border-t border-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12">

          {/* Left sticky */}
          <div className="lg:sticky lg:top-28 self-start">
            <span className="inline-flex items-center gap-1.5 bg-[#E8F1FA] text-[#1B6CA8] text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              Common Questions
            </span>
            <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-[#0D1B2A] leading-tight">
              Answers Before<br />You Even Ask
            </h2>
            <p className="mt-3 text-[14px] text-[#4A6580] leading-relaxed">
              Real questions from Ontario parents — answered by our clinical team.
            </p>
            {/* Contact box */}
            <div className="mt-7 bg-white border border-[#E8EFF7] rounded-2xl p-5 shadow-sm">
              <p className="text-[12px] font-bold text-[#0D1B2A] mb-1">Still have questions?</p>
              <p className="text-[12px] text-[#4A6580] mb-4">Our care team responds 7 days a week.</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+18335427227" className="inline-flex items-center gap-2 bg-[#1B6CA8] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#155892] transition-colors">
                  <Phone className="h-3.5 w-3.5" /> 1 (833) 543-7227
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-[#D6E4F0] text-[#0D1B2A] text-[12px] font-semibold px-4 py-2.5 rounded-xl hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
                  <Mail className="h-3.5 w-3.5" /> Email our team
                </Link>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "border-[#1B6CA8] bg-white shadow-sm" : "border-[#E8EFF7] bg-white hover:border-[#B8D0E8]"}`}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-colors
                        ${isOpen ? "bg-[#1B6CA8] text-white" : "bg-[#EEF4FB] text-[#1B6CA8]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-semibold text-[14px] leading-snug ${isOpen ? "text-[#1B6CA8]" : "text-[#0D1B2A]"}`}>
                        {f.q}
                      </span>
                    </div>
                    <span className={`shrink-0 h-7 w-7 rounded-full border flex items-center justify-center transition-all ${isOpen ? "border-[#1B6CA8] bg-[#1B6CA8] text-white rotate-180" : "border-[#D6E4F0] bg-white text-[#4A6580]"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`transition-all duration-300 ${isOpen ? "max-h-40 pb-5" : "max-h-0"} overflow-hidden`}>
                    <p className="px-6 text-[13px] text-[#4A6580] leading-relaxed pl-[52px]">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   WHY TRUST US — 5 icon pillars
════════════════════════════════════════════════════════ */
function WhyTrustUs() {
  const pillars = [
    { icon: Stethoscope, title: "Pediatric Experts",   desc: "Compassionate providers specializing in kids."        },
    { icon: Clock,        title: "Fast & Convenient",   desc: "Same-day appointments and minimal wait times."         },
    { icon: Brain,        title: "Advanced Technology", desc: "AI-powered tools for better care and experiences."     },
    { icon: ShieldCheck,  title: "Secure & Private",    desc: "PHIPA-compliant and privacy focused."                  },
    { icon: Star,         title: "Trusted by Families", desc: "Thousands of 5-star reviews from happy parents."       },
  ];
  return (
    <section className="bg-white border-t border-[#EEF2F7] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display font-bold text-[20px] sm:text-[22px] text-center text-[#0D1B2A] mb-8">
          Why Parents Trust Pediatric Urgent Care™
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-center gap-3 px-2">
              <span className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#EEF4FB] border border-[#E0EAF4]">
                <p.icon className="h-6 w-6 text-[#1B6CA8]" />
              </span>
              <p className="font-bold text-[13px] text-[#0D1B2A] leading-snug">{p.title}</p>
              <p className="text-[12px] text-[#4A6580] leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PARENT PORTAL + AI CHECKER + EMERGENCY
════════════════════════════════════════════════════════ */
function ParentPortalSection() {
  return (
    <section className="bg-[#EEF4FB] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-5">

          {/* ── Left: Parent Portal dark card ── */}
          <div className="bg-[#0D1B2A] rounded-2xl overflow-hidden flex min-h-[300px]">
            {/* Text content */}
            <div className="flex flex-col justify-center p-8 lg:p-10 flex-1">
              <h2 className="font-display font-bold text-[22px] sm:text-[24px] text-white leading-tight">
                Everything You Need in<br />One Parent Portal
              </h2>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Manage your children's health records",
                  "Track vaccinations & growth milestones",
                  "Book appointments & home visits",
                  "Securely store medical documents",
                  "Get reminders & care recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/85">
                    <span className="h-5 w-5 rounded-full bg-[#2ECC8B]/20 border border-[#2ECC8B]/40 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[#2ECC8B]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {/* App buttons */}
              <div className="mt-7 flex items-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 bg-black border border-white/15 text-white px-3.5 py-2 rounded-xl hover:bg-[#111] transition-colors">
                  <Smartphone className="h-5 w-5 shrink-0" />
                  <div className="leading-tight">
                    <p className="text-[9px] text-white/50 uppercase tracking-wide">Download on the</p>
                    <p className="text-[12px] font-bold">App Store</p>
                  </div>
                </a>
                <a href="#" className="inline-flex items-center gap-2 bg-black border border-white/15 text-white px-3.5 py-2 rounded-xl hover:bg-[#111] transition-colors">
                  <Globe className="h-5 w-5 shrink-0" />
                  <div className="leading-tight">
                    <p className="text-[9px] text-white/50 uppercase tracking-wide">Get it on</p>
                    <p className="text-[12px] font-bold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="hidden md:flex items-end justify-center px-6 pb-0 shrink-0 w-40">
              <div className="w-[110px] h-[200px] bg-white rounded-t-[18px] border-t-[3px] border-x-[3px] border-[#1a3050] shadow-2xl overflow-hidden">
                <div className="bg-[#F0F6FF] h-full p-2 space-y-1.5">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <p className="text-[7px] font-bold text-[#0D1B2A]">Hello, Sarah</p>
                    <p className="text-[6px] text-[#4A6580]">My Children</p>
                  </div>
                  {[{ n: "Emma", a: "Age 7" }, { n: "Liam", a: "Age 4" }].map((c) => (
                    <div key={c.n} className="bg-white rounded-lg p-1.5 shadow-sm flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-[#E8F1FA] flex items-center justify-center shrink-0">
                        <span className="text-[6px] font-bold text-[#1B6CA8]">{c.n[0]}</span>
                      </div>
                      <div>
                        <p className="text-[6px] font-bold text-[#0D1B2A]">{c.n}</p>
                        <p className="text-[5px] text-[#4A6580]">{c.a}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-[#1B6CA8] rounded-lg p-2">
                    <p className="text-[6px] font-bold text-white">Upcoming Appointment</p>
                    <p className="text-[5px] text-white/70 mt-0.5">Nov 18 · 10:00 AM</p>
                    <p className="text-[5px] text-white/70">Home Visit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: AI checker + Emergency ── */}
          <div className="flex flex-col gap-4">

            {/* AI Symptom Checker */}
            <div className="bg-[#1B3464] rounded-2xl p-7 flex-1 flex gap-5 items-center">
              <div className="flex-1">
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-white leading-snug">
                  Not Sure What's Wrong?<br />
                  <span className="text-white">Try our AI Symptom Checker</span>
                </h3>
                <p className="mt-3 text-[13px] text-white/70 leading-relaxed">
                  Get instant, personalized guidance based on your child's symptoms.
                </p>
                <Link to="/symptom-checker"
                  className="mt-5 inline-flex items-center gap-2 bg-white text-[#1B3464] text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#EEF4FB] transition-colors shadow-sm">
                  Check Symptoms Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {/* Robot icon */}
              <div className="hidden sm:flex shrink-0 h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                <Brain className="h-10 w-10 text-white/70" />
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-white rounded-2xl border border-[#E8EFF7] p-5 flex items-center gap-4 shadow-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
                <Phone className="h-5 w-5 text-red-500" />
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#0D1B2A]">Need immediate help?</p>
                <p className="text-[12px] text-[#4A6580] mt-0.5 leading-snug">
                  For life-threatening emergencies, call <strong className="text-[#0D1B2A]">911</strong> or go to your nearest emergency room.
                </p>
              </div>
              <a href="tel:911"
                className="shrink-0 inline-flex items-center gap-1.5 border-2 border-red-500 text-red-600 text-[13px] font-extrabold px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
                <Phone className="h-3.5 w-3.5" /> 911
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   BOTTOM CTA BANNER
════════════════════════════════════════════════════════ */
function BottomCTASection() {
  return (
    <section className="bg-[#0D1B2A] py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
              <CalendarCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-[18px] text-white">Ready to Book an Appointment?</p>
              <p className="text-[13px] text-white/50 mt-0.5">Choose the care option that works best for your family.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/book"
              className="inline-flex items-center gap-2 bg-white text-[#0D1B2A] text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-[#EEF4FB] transition-colors shadow-sm">
              Book a Visit <CalendarCheck className="h-4 w-4" />
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Explore All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════ */
function SiteFooter() {
  return (
    <footer className="bg-white border-t border-[#E8EFF7] pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-[180px_1fr_1fr_1fr_200px] gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            {/* Logo mark */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-10 w-10 rounded-xl bg-[#EEF4FB] border border-[#D6E4F0] flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-[#1B6CA8]" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-extrabold text-[13px] text-[#0D1B2A]">Pediatric</p>
                <p className="font-display font-extrabold text-[13px] text-[#1B6CA8]">Urgent Care™</p>
              </div>
            </div>
            <p className="text-[11px] text-[#4A6580] mb-4 leading-snug">Here When Kids Need Us Most</p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Globe, Phone].map((Icon, i) => (
                <a key={i} href="#"
                  className="h-8 w-8 rounded-full border border-[#D6E4F0] flex items-center justify-center text-[#4A6580] hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" links={[
            { label: "Services",     to: "/services"         },
            { label: "Locations",    to: "/locations"        },
            { label: "Telemedicine", to: "/services"         },
            { label: "For Parents",  to: "/parent/dashboard" },
            { label: "Resources",    to: "/blog"             },
            { label: "About Us",     to: "/about"            },
          ]} />

          <FooterCol title="For Parents" links={[
            { label: "Parent Portal",       to: "/parent/dashboard" },
            { label: "AI Symptom Checker",  to: "/symptom-checker"  },
            { label: "Vaccination Info",    to: "/services"         },
            { label: "Forms & Documents",   to: "/parent/documents" },
            { label: "Insurance & Billing", to: "/services"         },
            { label: "FAQ",                 to: "/"                 },
          ]} />

          <FooterCol title="Support" links={[
            { label: "Contact Us",    to: "/contact" },
            { label: "Careers",       to: "/about"   },
            { label: "Privacy Policy",to: "/privacy" },
            { label: "Terms of Use",  to: "/terms"   },
            { label: "Accessibility", to: "/about"   },
          ]} />

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <a href="tel:18335427227" className="flex items-start gap-3 group">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] border border-[#D6E4F0] group-hover:bg-[#1B6CA8] group-hover:border-[#1B6CA8] transition-colors">
                  <Phone className="h-4 w-4 text-[#1B6CA8] group-hover:text-white transition-colors" />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#0D1B2A]">1 (833) 4-KIDS-CARE</p>
                  <p className="text-[12px] text-[#4A6580]">(543-7227)</p>
                </div>
              </a>
              <a href="mailto:info@pediatricurgentcare.ca" className="flex items-start gap-3 group">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] border border-[#D6E4F0] group-hover:bg-[#1B6CA8] group-hover:border-[#1B6CA8] transition-colors">
                  <Mail className="h-4 w-4 text-[#1B6CA8] group-hover:text-white transition-colors" />
                </span>
                <div>
                  <p className="text-[12px] text-[#4A6580] leading-snug">info@pediatricurgentcare.ca</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-[#E8EFF7] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#4A6580]">© 2024 Pediatric Urgent Care™. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-[#4A6580]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />PHIPA Compliant</span>
            <span className="text-[#D6E4F0]">•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />PIPEDA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0D1B2A] mb-3.5">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-[13px] text-[#4A6580] hover:text-[#1B6CA8] transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
