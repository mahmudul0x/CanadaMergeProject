// @refresh reset
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Syringe,
  Activity,
  ClipboardList,
  Thermometer,
  Video,
  XCircle,
  Languages,
  Building2,
  Pill,
  Briefcase,
  AlertTriangle,
  CalendarCheck,
  Award,
  Sparkles,
  TrendingUp,
  Home as HomeIcon,
  Heart,
} from "lucide-react";
import heroSick from "@/assets/hero-np-home-visit.jpg";
import heroCheckup from "@/assets/hero-np-checkup.jpg";
import heroToddler from "@/assets/hero-np-toddler.jpg";
import heroVaccine from "@/assets/hero-np-vaccine.jpg";

type NP = { name: string; cred: string; init: string; languages: string[]; specialty: string; visits: number };
type CityInfo = {
  name: string;
  tagline: string;
  eta: string;
  etaMins: number;
  status: "live" | "limited";
  postal: string[];
  neighbourhoods: string[];
  nps: NP[];
  stats: { visits: string; rating: string; families: string };
  travelFee: number;
  lat: number;
  lng: number;
  heroImage: string;
  population: string;
  yearsServing: number;
  hospitals: { name: string; type: string }[];
  highlights: string[];
};

const CITY_DATA: Record<string, CityInfo> = {
  milton: { name: "Milton", tagline: "Same-day pediatric care across Milton and Campbellville — from Bronte Meadows to Willmott.", eta: "65–90 min", etaMins: 75, status: "live", postal: ["L9T", "L9E"], neighbourhoods: ["Bronte Meadows", "Beaty", "Dempsey", "Scott", "Willmott", "Campbellville"], travelFee: 0, lat: 43.5183, lng: -79.8774, stats: { visits: "1,840+", rating: "4.96", families: "620+" }, heroImage: heroSick, population: "133,000+", yearsServing: 4, hospitals: [{ name: "Milton District Hospital", type: "Halton Healthcare partner" }, { name: "McMaster Children's (referral)", type: "Tertiary referral hospital" }], highlights: ["Fastest-growing community in Halton", "Average ETA under 90 min city-wide", "Bilingual NPs (English, Mandarin, Korean)"], nps: [
    { name: "Amelia Chen, NP", cred: "RN(EC), MN", init: "AC", languages: ["English", "Mandarin"], specialty: "Newborn & sick visits", visits: 412 },
    { name: "Daniel Park, NP", cred: "RN(EC), MScN", init: "DP", languages: ["English", "Korean"], specialty: "Vaccinations & well-child", visits: 388 },
  ]},
  halton: { name: "Halton Hills", tagline: "Door-to-door pediatric NP care across Georgetown, Acton, and rural Halton — even in low-density pockets.", eta: "85–105 min", etaMins: 95, status: "live", postal: ["L7G", "L7J"], neighbourhoods: ["Georgetown South", "Glen Williams", "Acton", "Norval", "Stewarttown"], travelFee: 15, lat: 43.6311, lng: -79.9300, stats: { visits: "740+", rating: "4.94", families: "260+" }, heroImage: heroToddler, population: "62,000+", yearsServing: 3, hospitals: [{ name: "Georgetown Hospital", type: "Halton Healthcare partner" }, { name: "Milton District Hospital", type: "Closest pediatric ER" }], highlights: ["Only NP home-visit service in rural Halton", "Visits as far as Glen Williams & Norval", "Trilingual coverage (English, Arabic, French)"], nps: [
    { name: "Sara Ali, NP", cred: "RN(EC)", init: "SA", languages: ["English", "Arabic", "Urdu"], specialty: "Developmental assessment", visits: 245 },
    { name: "Tom Reid, NP", cred: "RN(EC), MN", init: "TR", languages: ["English", "French"], specialty: "Sick visits & follow-up", visits: 198 },
  ]},
  hamilton: { name: "Hamilton", tagline: "Pediatric NPs covering the Mountain, downtown, Stoney Creek, Ancaster, Dundas and Westdale — seven days a week.", eta: "60–80 min", etaMins: 70, status: "live", postal: ["L8E", "L8H", "L8N", "L9C"], neighbourhoods: ["Downtown", "Hamilton Mountain", "Stoney Creek", "Ancaster", "Dundas", "Westdale"], travelFee: 0, lat: 43.2557, lng: -79.8711, stats: { visits: "2,210+", rating: "4.97", families: "780+" }, heroImage: heroCheckup, population: "569,000+", yearsServing: 5, hospitals: [{ name: "McMaster Children's Hospital", type: "Pediatric tertiary referral" }, { name: "Juravinski Hospital", type: "Adult acute (parent care)" }, { name: "Hamilton General", type: "Trauma & ER referral" }], highlights: ["Our largest service area — 3 NPs on rotation", "Direct EMR documentation to McMaster pediatricians", "<70 min average across all six neighbourhoods"], nps: [
    { name: "Priya Shah, NP", cred: "RN(EC), MScN", init: "PS", languages: ["English", "Hindi", "Gujarati"], specialty: "Pediatric urgent care", visits: 510 },
    { name: "Mark Liu, NP", cred: "RN(EC)", init: "ML", languages: ["English", "Cantonese"], specialty: "Vaccinations", visits: 432 },
    { name: "Hannah Brooks, NP", cred: "RN(EC), MN", init: "HB", languages: ["English"], specialty: "Newborn care", visits: 367 },
  ]},
  oakville: { name: "Oakville", tagline: "From Bronte to Glen Abbey, Old Oakville to the Uptown Core — premium pediatric home care.", eta: "70–85 min", etaMins: 78, status: "live", postal: ["L6H", "L6J", "L6L", "L6K"], neighbourhoods: ["Bronte", "Glen Abbey", "Uptown Core", "Old Oakville", "Iroquois Ridge", "River Oaks"], travelFee: 0, lat: 43.4675, lng: -79.6877, stats: { visits: "1,560+", rating: "4.95", families: "540+" }, heroImage: heroVaccine, population: "213,000+", yearsServing: 4, hospitals: [{ name: "Oakville Trafalgar Memorial Hospital", type: "Halton Healthcare partner" }, { name: "McMaster Children's (referral)", type: "Pediatric tertiary referral" }], highlights: ["Concierge-style scheduling with NP continuity", "Highest rebooking rate in the network (62%)", "Coverage Mon–Sun, 7 am to 10 pm"], nps: [
    { name: "Jordan Tate, NP", cred: "RN(EC)", init: "JT", languages: ["English"], specialty: "Sick visits", visits: 388 },
    { name: "Mei Wong, NP", cred: "RN(EC), MN", init: "MW", languages: ["English", "Mandarin"], specialty: "Well-child checkups", visits: 354 },
  ]},
  mississauga: { name: "Mississauga", tagline: "Peel's fastest pediatric response — from Erin Mills and Streetsville to Port Credit and Lorne Park.", eta: "55–75 min", etaMins: 65, status: "live", postal: ["L4Z", "L4W", "L5B", "L5M", "L5R", "L5V"], neighbourhoods: ["Erin Mills", "Port Credit", "Streetsville", "Square One", "Meadowvale", "Cooksville", "Lorne Park"], travelFee: 0, lat: 43.5890, lng: -79.6441, stats: { visits: "3,120+", rating: "4.96", families: "1,040+" }, heroImage: heroSick, population: "717,000+", yearsServing: 5, hospitals: [{ name: "Trillium Health Partners — Mississauga Hospital", type: "Pediatric ER referral" }, { name: "Credit Valley Hospital", type: "Family & newborn referral" }], highlights: ["Largest NP team in the network (3 dedicated NPs)", "Fastest avg ETA across Ontario at 65 minutes", "Punjabi, Urdu, Spanish, Korean coverage"], nps: [
    { name: "Aisha Khan, NP", cred: "RN(EC), MScN", init: "AK", languages: ["English", "Urdu", "Punjabi"], specialty: "Pediatric urgent care", visits: 612 },
    { name: "Carlos Mendez, NP", cred: "RN(EC)", init: "CM", languages: ["English", "Spanish"], specialty: "Vaccinations", visits: 488 },
    { name: "Lina Park, NP", cred: "RN(EC), MN", init: "LP", languages: ["English", "Korean"], specialty: "Follow-up & newborn", visits: 421 },
  ]},
  burlington: { name: "Burlington", tagline: "End-to-end pediatric NP care from Aldershot to Alton Village, Roseland to Headon Forest.", eta: "75–95 min", etaMins: 85, status: "live", postal: ["L7L", "L7M", "L7P", "L7R"], neighbourhoods: ["Aldershot", "Roseland", "Alton Village", "Tyandaga", "Orchard", "Headon Forest"], travelFee: 0, lat: 43.3255, lng: -79.7990, stats: { visits: "1,210+", rating: "4.95", families: "430+" }, heroImage: heroToddler, population: "186,000+", yearsServing: 3, hospitals: [{ name: "Joseph Brant Hospital", type: "Local ER referral" }, { name: "McMaster Children's (referral)", type: "Pediatric tertiary referral" }], highlights: ["Same-day availability 7 days/week", "All NPs trained in newborn jaundice screening", "5★ rated in 96% of Burlington reviews"], nps: [
    { name: "Sam Patel, NP", cred: "RN(EC), MN", init: "SP", languages: ["English", "Gujarati"], specialty: "Sick visits & follow-up", visits: 332 },
    { name: "Olivia Grant, NP", cred: "RN(EC)", init: "OG", languages: ["English"], specialty: "Well-child & vaccinations", visits: 287 },
  ]},
  brampton: { name: "Brampton", tagline: "Pediatric home-visit care across Springdale, Mount Pleasant, Bramalea, Heart Lake and Castlemore.", eta: "80–100 min", etaMins: 90, status: "limited", postal: ["L6P", "L6R", "L6S", "L6T", "L6V"], neighbourhoods: ["Springdale", "Mount Pleasant", "Bramalea", "Heart Lake", "Castlemore", "Downtown"], travelFee: 10, lat: 43.7315, lng: -79.7624, stats: { visits: "980+", rating: "4.93", families: "340+" }, heroImage: heroVaccine, population: "656,000+", yearsServing: 2, hospitals: [{ name: "Brampton Civic Hospital", type: "Pediatric ER referral" }, { name: "Peel Memorial Centre", type: "Urgent care partner" }], highlights: ["Punjabi & Hindi-speaking NPs on every shift", "Currently expanding to L6X & L6Y FSAs", "Direct referral pathway to Brampton Civic"], nps: [
    { name: "Reena Singh, NP", cred: "RN(EC), MScN", init: "RS", languages: ["English", "Punjabi", "Hindi"], specialty: "Pediatric urgent care", visits: 298 },
    { name: "Eric Tan, NP", cred: "RN(EC)", init: "ET", languages: ["English", "Mandarin"], specialty: "Vaccinations", visits: 224 },
  ]},
};

const SERVICES = [
  { id: "sick", title: "Sick Visit", icon: Thermometer, price: 149, desc: "Fever, rash, ear pain, infection" },
  { id: "vacc", title: "Vaccination", icon: Syringe, price: 99, desc: "Routine + travel vaccines" },
  { id: "follow", title: "Follow-up Visit", icon: ClipboardList, price: 119, desc: "Post-illness monitoring" },
  { id: "well", title: "Well-child Checkup", icon: Activity, price: 179, desc: "Annual growth & dev assessment" },
  { id: "tele", title: "Telemedicine", icon: Video, price: 49, desc: "Same-day video consult" },
  { id: "dev", title: "Developmental Assessment", icon: Stethoscope, price: 199, desc: "Milestone screening" },
];

const COMMON_CONDITIONS = [
  { label: "Fever & flu", icon: Thermometer },
  { label: "Ear infections", icon: Activity },
  { label: "Strep throat", icon: Stethoscope },
  { label: "Rashes & eczema", icon: Sparkles },
  { label: "Pink eye", icon: Activity },
  { label: "Stomach bug / dehydration", icon: Pill },
  { label: "Asthma flare-up", icon: Activity },
  { label: "UTIs", icon: Pill },
  { label: "Minor injuries", icon: ShieldCheck },
  { label: "Croup", icon: Stethoscope },
  { label: "Hand, foot & mouth", icon: Sparkles },
  { label: "Newborn jaundice", icon: Heart },
];

const EQUIPMENT = [
  "Otoscope (ear exam)",
  "Pulse oximeter",
  "Digital thermometer",
  "Stethoscope (pediatric)",
  "Rapid strep & flu kits",
  "Vaccine cold-chain cooler",
  "Nebulizer & spacer",
  "Phlebotomy supplies",
];

const HOURS = [
  { day: "Monday – Friday", hours: "7:00 AM – 10:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 10:00 PM" },
  { day: "Sunday & Holidays", hours: "9:00 AM – 9:00 PM" },
];

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const data = CITY_DATA[params.city.toLowerCase()];
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Pediatric Home Visits in ${loaderData.name}, Ontario — Pediatric Urgent Care™` },
          { name: "description", content: `Board-certified NPs visit your home in ${loaderData.name}. ${loaderData.eta} avg arrival. From $99. Book in 2 minutes.` },
          { property: "og:title", content: `Pediatric Home Visits in ${loaderData.name}` },
          { property: "og:description", content: `${loaderData.eta} avg arrival across ${loaderData.name}. NP-led care from $99.` },
          { property: "og:url", content: `/locations/${loaderData.name.toLowerCase().replace(/\s+/g, "-")}` },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/locations/${loaderData.name.toLowerCase().replace(/\s+/g, "-")}` }] : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: `Pediatric Urgent Care — ${loaderData.name}`,
            address: { "@type": "PostalAddress", addressLocality: loaderData.name, addressRegion: "ON", addressCountry: "CA" },
            telephone: "+1-905-123-4567",
            geo: { "@type": "GeoCoordinates", latitude: loaderData.lat, longitude: loaderData.lng },
            areaServed: loaderData.neighbourhoods,
            medicalSpecialty: "Pediatrics",
            aggregateRating: { "@type": "AggregateRating", ratingValue: loaderData.stats.rating, reviewCount: 200 },
          }),
        }]
      : [],
  }),
  component: CityPage,
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="text-4xl">City not found</h1>
      <p className="mt-3 text-secondary-ink">We don't yet serve that city.</p>
      <Link to="/locations" className="mt-6 inline-block text-primary underline">See all locations</Link>
    </div>
  ),
});

function CityPage() {
  const city = Route.useLoaderData();
  return (
    <div>
      <CityHero city={city} />
      <TrustStrip city={city} />
      <PostalCheckerSection city={city} />
      <ConditionsSection city={city} />
      <PricingSection city={city} />
      <ProcessSection city={city} />
      <NPsSection city={city} />
      <EquipmentHoursSection city={city} />
      <HospitalsSection city={city} />
      <NeighbourhoodsSection city={city} />
      <TestimonialsSection city={city} />
      <EmergencyNotice />
      <FAQSection city={city} />
      <StickyBookCTA city={city} />
    </div>
  );
}

function CityHero({ city }: { city: CityInfo }) {
  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Background image */}
      <img
        src={city.heroImage}
        alt={`Pediatric nurse practitioner home visit in ${city.name}, Ontario`}
        width={1600}
        height={900}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        style={{ objectPosition: "center 35%" }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,20,40,0.92) 0%, rgba(8,20,40,0.78) 40%, rgba(8,20,40,0.35) 75%, rgba(8,20,40,0.15) 100%)" }} />

      <div className="container-page relative z-10 pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold tracking-wider uppercase text-white/70" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2 text-white/40">/</span>
          <Link to="/locations" className="hover:text-white">Locations</Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white">{city.name}</span>
        </nav>

        <div className="mt-8 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-start">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-success/20 backdrop-blur px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[oklch(0.92_0.12_150)] border border-success/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {city.status === "live" ? `Accepting bookings now · Next NP in ${city.etaMins} min` : "Limited capacity today"}
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[64px] font-display font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              Pediatric Home Visits in <span style={{ color: "#7CE8B6" }}>{city.name}</span>, Ontario
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-2xl leading-relaxed">{city.tagline}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105">
                Book in {city.name} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+19051234567" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-foreground transition">
                <Phone className="h-4 w-4" /> (905) 123-4567
              </a>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl text-sm text-white/85">
              {city.highlights.map((h) => (
                <li key={h} className="inline-flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#7CE8B6" }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/95 backdrop-blur p-2 shadow-lift">
            <CityMap city={city} />
            <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
              {[
                { k: "Visits", v: city.stats.visits },
                { k: "Rating", v: `${city.stats.rating}★` },
                { k: "Avg ETA", v: `${city.etaMins}m` },
              ].map((s) => (
                <div key={s.k} className="px-4 py-4 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-secondary-ink font-semibold">{s.k}</p>
                  <p className="mt-1 font-display text-xl font-extrabold">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ city }: { city: CityInfo }) {
  const items = [
    { icon: TrendingUp, label: "Population served", value: city.population },
    { icon: CalendarCheck, label: "Years in city", value: `${city.yearsServing}+` },
    { icon: Clock, label: "Avg arrival", value: `${city.etaMins} min` },
    { icon: Star, label: "Family rating", value: `${city.stats.rating} / 5` },
    { icon: Award, label: "CNO-licensed NPs", value: `${city.nps.length} local` },
    { icon: ShieldCheck, label: "Compliance", value: "PHIPA · PIPEDA" },
  ];
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <it.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-secondary-ink font-bold">{it.label}</p>
                <p className="font-display font-extrabold text-base leading-tight truncate">{it.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CityMap({ city }: { city: CityInfo }) {
  // Stylized SVG map with a pin & service zone radius
  return (
    <div className="relative h-56 rounded-2xl overflow-hidden bg-[linear-gradient(135deg,oklch(0.95_0.03_240),oklch(0.9_0.04_220))]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${city.name}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.55 0.06 240 / 0.2)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id={`zone-${city.name}`}>
            <stop offset="0%" stopColor="oklch(0.55 0.18 245)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.55 0.18 245)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#grid-${city.name})`} />
        <path d="M0 140 Q 100 110 200 130 T 400 120 L 400 220 L 0 220 Z" fill="oklch(0.85 0.08 160 / 0.4)" />
        <circle cx="200" cy="110" r="80" fill={`url(#zone-${city.name})`} />
        <circle cx="200" cy="110" r="80" fill="none" stroke="oklch(0.55 0.18 245)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-primary/30" />
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift">
            <MapPin className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 rounded-full bg-surface/90 backdrop-blur px-3 py-1 text-xs font-semibold border border-border">
        Service radius · ~15 km
      </div>
    </div>
  );
}

function ConditionsSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Common Conditions</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">What we treat in {city.name}</h2>
            <p className="mt-3 max-w-2xl text-secondary-ink">Our NPs are equipped to diagnose and treat the vast majority of pediatric concerns at home — without a referral.</p>
          </div>
          <Link to="/symptom-checker" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Check your child's symptoms <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COMMON_CONDITIONS.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-surface p-4 flex items-center gap-3 hover:border-primary hover:shadow-soft transition">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                <c.icon className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold leading-tight">{c.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-secondary-ink">Not on this list? Most pediatric concerns are in scope — book a visit or message us first.</p>
      </div>
    </section>
  );
}

function ProcessSection({ city }: { city: CityInfo }) {
  const steps = [
    { n: "01", t: "Book in 2 minutes", d: `Choose your visit type and time. ${city.name} availability shown live.`, icon: CalendarCheck },
    { n: "02", t: "NP confirmed", d: `A licensed NP from your area is assigned and shares ETA + profile within 15 minutes.`, icon: Stethoscope },
    { n: "03", t: "Care at your door", d: `Full assessment, treatment, prescription if needed, and post-visit notes sent to your pediatrician.`, icon: HomeIcon },
  ];
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">How a Visit Works</span>
        <h2 className="mt-2 text-3xl sm:text-4xl">From booking to bedside in {city.name}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] border-t-2 border-dashed border-border" aria-hidden />
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-primary text-sm">{s.n}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-4 text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-secondary-ink leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EquipmentHoursSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y">
      <div className="container-page grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl">Equipment our {city.name} NPs bring</h2>
          </div>
          <p className="mt-3 text-secondary-ink">Every NP arrives with a full mobile pediatric assessment kit — the same tools used in a clinic.</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {EQUIPMENT.map((e) => (
              <li key={e} className="inline-flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-success flex-shrink-0" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-surface p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Clock className="h-5 w-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl">Hours in {city.name}</h2>
          </div>
          <p className="mt-3 text-secondary-ink">Same-day visits available every day of the year, including weekends and statutory holidays.</p>
          <dl className="mt-6 divide-y divide-border">
            {HOURS.map((h) => (
              <div key={h.day} className="flex items-center justify-between py-3">
                <dt className="font-semibold">{h.day}</dt>
                <dd className="font-mono text-sm">{h.hours}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">After hours / overnight</p>
            <p className="mt-1 text-sm">For non-urgent overnight concerns, use our <Link to="/services" className="text-primary font-semibold underline">telemedicine service</Link>. For emergencies, call 911 or go to the nearest ER.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HospitalsSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Referral Network</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">{city.name} hospital & referral partners</h2>
            <p className="mt-3 max-w-2xl text-secondary-ink">When escalation is needed, our NPs coordinate directly with these {city.name}-area facilities and send full visit documentation.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {city.hospitals.map((h) => (
            <article key={h.name} className="rounded-2xl border border-border bg-background p-6 hover-lift">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-display font-bold leading-tight">{h.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-secondary-ink font-semibold">{h.type}</p>
                </div>
              </div>
            </article>
          ))}
          <article className="rounded-2xl border-2 border-dashed border-border bg-background p-6 flex flex-col justify-center">
            <p className="text-sm font-semibold">Your pediatrician on file</p>
            <p className="mt-1 text-xs text-secondary-ink">Every visit summary is sent to your child's primary pediatrician within 24 hours — no extra paperwork.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function EmergencyNotice() {
  return (
    <section className="container-page my-10">
      <div className="rounded-2xl border-2 border-warning/40 bg-warning/5 p-6 flex items-start gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-warning/15 text-warning flex-shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-extrabold">When to call 911 instead</p>
          <p className="mt-1 text-sm text-secondary-ink leading-relaxed">
            Severe difficulty breathing, persistent unresponsiveness, seizure lasting over 5 minutes, suspected poisoning, or major trauma require emergency services. Pediatric Urgent Care complements — it does not replace — the ER.
          </p>
        </div>
      </div>
    </section>
  );
}

function PostalCheckerSection({ city }: { city: CityInfo }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; fsa: string }>(null);

  const check = () => {
    const normalized = code.toUpperCase().replace(/\s+/g, "").slice(0, 6);
    const fsa = normalized.slice(0, 3);
    const valid = /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(normalized);
    if (!valid) { setResult({ ok: false, fsa: "—" }); return; }
    setResult({ ok: city.postal.includes(fsa), fsa });
  };

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 sm:p-12 shadow-soft">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div>
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Coverage Check</span>
              <h2 className="mt-3 text-3xl sm:text-4xl">Are we coming to your door?</h2>
              <p className="mt-3 text-secondary-ink">Enter your postal code for an instant coverage check, ETA, and starting price for {city.name}.</p>
              <div className="mt-6 flex gap-3">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setResult(null); }}
                  onKeyDown={(e) => e.key === "Enter" && check()}
                  placeholder="L9T 1A1"
                  maxLength={7}
                  className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-4 text-lg font-mono uppercase tracking-wider outline-none focus:border-primary"
                />
                <button onClick={check} className="rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground shadow-soft btn-press hover:brightness-110">
                  Check
                </button>
              </div>
              {result && result.ok && (
                <div className="mt-5 rounded-2xl border-2 border-success/40 bg-success/10 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                    <div>
                      <p className="font-display font-bold text-lg">You're covered in {city.name} ({result.fsa})</p>
                      <p className="mt-1 text-sm text-secondary-ink">ETA <b className="text-foreground">{city.eta}</b> · Visits from <b className="text-foreground">$99</b> · {city.travelFee === 0 ? "No travel fee" : `+$${city.travelFee} travel`}</p>
                      <Link to="/book" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-warm px-5 py-2.5 text-sm font-bold text-warm-foreground btn-press hover:brightness-105">
                        Continue to booking <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {result && !result.ok && (
                <div className="mt-5 rounded-2xl border-2 border-warning/40 bg-warning/10 p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-warning flex-shrink-0" />
                    <div>
                      <p className="font-display font-bold">Not in {city.name} ({result.fsa})</p>
                      <p className="mt-1 text-sm text-secondary-ink">Check our <Link to="/locations" className="text-primary underline font-semibold">other cities</Link> or <Link to="/contact" className="text-primary underline font-semibold">join the waitlist</Link>.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-surface border border-border p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">FSAs covered in {city.name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {city.postal.map((p) => (
                  <span key={p} className="rounded-md bg-primary/10 text-primary px-3 py-1.5 text-sm font-mono font-bold">{p}</span>
                ))}
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-secondary-ink">Neighbourhoods served</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {city.neighbourhoods.map((n) => (
                  <span key={n} className="rounded-full bg-background border border-border px-3 py-1 text-xs">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Pricing in {city.name}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">Transparent, all-in pricing</h2>
          </div>
          {city.travelFee > 0 && (
            <p className="text-sm text-secondary-ink">+ ${city.travelFee} travel fee applies to {city.name} addresses</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-background p-6 hover-lift">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-right">
                  <p className="text-xs text-secondary-ink">from</p>
                  <p className="font-display text-2xl font-extrabold text-primary">${s.price + city.travelFee}</p>
                </span>
              </div>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-secondary-ink">{s.desc}</p>
              <Link to="/book" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Book this visit <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NPsSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Local Team</span>
        <h2 className="mt-2 text-3xl sm:text-4xl">Your {city.name} Nurse Practitioners</h2>
        <p className="mt-3 max-w-2xl text-secondary-ink">All NPs are RN(EC)-registered, CNO-licensed, and credentialled in pediatric primary care.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {city.nps.map((np) => (
            <div key={np.name} className="rounded-2xl border border-border bg-surface p-6 hover-lift">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.15_220)] text-primary-foreground font-display font-extrabold text-lg shadow-soft">
                  {np.init}
                </span>
                <div className="flex-1">
                  <p className="font-display font-bold">{np.name}</p>
                  <p className="text-xs text-secondary-ink">{np.cred}</p>
                  <div className="mt-1 flex gap-0.5 text-warning">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm"><span className="text-secondary-ink">Focus: </span><b>{np.specialty}</b></p>
              <p className="mt-2 text-sm text-secondary-ink inline-flex items-center gap-1.5"><Languages className="h-3.5 w-3.5" /> {np.languages.join(" · ")}</p>
              <p className="mt-3 text-xs text-secondary-ink border-t border-border pt-3">{np.visits} visits completed in {city.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NeighbourhoodsSection({ city }: { city: CityInfo }) {
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page">
        <h2 className="text-3xl">Neighbourhoods we serve in {city.name}</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {city.neighbourhoods.map((n) => (
            <Link key={n} to="/book" className="group rounded-xl border border-border bg-background p-4 hover:border-primary hover:shadow-soft transition-all">
              <p className="font-semibold">{n}</p>
              <p className="mt-1 text-xs text-secondary-ink group-hover:text-primary">Book a visit →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ city }: { city: CityInfo }) {
  const reviews = [
    { name: `Sarah M.`, role: `Mother of 2 · ${city.name}`, text: `NP arrived within 70 minutes for my son's ear infection. Antibiotics prescribed on the spot. Saved us a 4-hour ER wait and a sleepless night.`, tag: "Sick Visit" },
    { name: `Ravi & Ananya`, role: `Parents of 3 · ${city.name}`, text: `Used them twice — vaccinations and a stomach bug. Professional, kind, and so easy with three kids at home. Our NP even followed up the next morning.`, tag: "Vaccinations" },
    { name: `Megan T.`, role: `New mom · ${city.name}`, text: `The fact that they document everything to our pediatrician afterwards was the cherry on top. They caught early jaundice signs we'd missed.`, tag: "Newborn Care" },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Parent Reviews</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">What {city.name} parents say</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 shadow-soft">
            <div className="flex gap-0.5 text-warning">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <span className="text-sm font-bold">{city.stats.rating}/5</span>
            <span className="text-xs text-secondary-ink">· {city.stats.families} families</span>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="relative rounded-2xl border border-border bg-surface p-7 shadow-soft hover-lift">
              <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{r.tag}</span>
              <div className="flex gap-0.5 text-warning mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="text-sm leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.65_0.15_220)] text-primary-foreground font-display font-bold text-sm">
                  {r.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-secondary-ink">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ city }: { city: CityInfo }) {
  const faqs = useMemo(() => [
    { q: `How fast can an NP arrive in ${city.name}?`, a: `Our current average is ${city.etaMins} minutes from booking to doorstep, within the ${city.eta} window depending on time of day and traffic.` },
    { q: `Do you serve all of ${city.name}?`, a: `We cover FSAs ${city.postal.join(", ")}, including ${city.neighbourhoods.slice(0, 4).join(", ")} and surrounding areas. Use the postal checker above for instant confirmation.` },
    { q: `Is this covered by OHIP?`, a: `Home-based pediatric care is not covered by OHIP. Most extended health benefit plans reimburse all or part of the visit fee — we provide an itemized receipt for submission.` },
    { q: `What if my child needs the ER?`, a: `Our NPs are trained to recognize red flags and will refer or call 911 directly when warranted. We're a complement to — not a replacement for — emergency services.` },
    { q: `Can your NPs prescribe medication?`, a: `Yes. Nurse Practitioners in Ontario are authorized prescribers. Prescriptions are sent electronically to your preferred ${city.name} pharmacy before the NP leaves.` },
    { q: `What ages do you treat?`, a: `Newborns (from day 1 home from hospital) through 17 years. We routinely see infants for jaundice, weight checks, and feeding concerns.` },
    { q: `Will my pediatrician get the visit notes?`, a: `Yes — a full SOAP-format visit summary, including assessment, plan, and any prescriptions, is faxed or emailed to your child's primary pediatrician within 24 hours.` },
    { q: `How do you handle vaccinations in ${city.name}?`, a: `We carry the full Ontario publicly funded schedule plus travel vaccines, kept in a calibrated cold-chain cooler. Records are reported to Public Health Ontario electronically.` },
    { q: `What payment methods do you accept?`, a: `Credit card, debit, and HSA cards. Payment is processed securely at booking. Itemized receipts for insurance reimbursement are emailed immediately.` },
  ], [city]);
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-page max-w-3xl">
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">FAQ</span>
        <h2 className="mt-2 text-3xl sm:text-4xl">{city.name} — Frequently asked</h2>
        <p className="mt-3 text-secondary-ink">Still have a question? <Link to="/contact" className="text-primary font-semibold underline">Contact our {city.name} team</Link>.</p>
        <div className="mt-6 divide-y divide-border">
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

function StickyBookCTA({ city }: { city: CityInfo }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
      <div className="container-page py-3 flex items-center justify-between gap-3">
        <div className="hidden sm:block">
          <p className="font-display font-bold text-sm">Need a visit in {city.name} today?</p>
          <p className="text-xs text-secondary-ink">Next NP available in {city.etaMins} minutes</p>
        </div>
        <Link to="/book" className="ml-auto inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105">
          Book in {city.name} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}