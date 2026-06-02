// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Clock, UserCheck, ShieldCheck, Phone, Star, Search } from "lucide-react";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Locations — Pediatric Urgent Care™" },
      { name: "description", content: "Pediatric home visits across Milton, Halton, Hamilton, Oakville, Mississauga, Burlington, and Brampton." },
    ],
  }),
  component: LocationsPage,
});

const CITIES = [
  { name: "Mississauga", slug: "mississauga", nps: 9, eta: "65 min", visits: "820+", blurb: "Largest team — fastest average arrival in the GTA.", neighbourhoods: ["Port Credit", "Streetsville", "Erin Mills", "Meadowvale"], featured: true },
  { name: "Brampton", slug: "brampton", nps: 7, eta: "75 min", visits: "510+", blurb: "Bilingual NPs available (English, Punjabi, Hindi).", neighbourhoods: ["Bramalea", "Heart Lake", "Mount Pleasant", "Springdale"] },
  { name: "Oakville", slug: "oakville", nps: 7, eta: "70 min", visits: "490+", blurb: "Trafalgar to Bronte — fast NP response.", neighbourhoods: ["Bronte", "Glen Abbey", "Joshua Creek", "Uptown Core"] },
  { name: "Burlington", slug: "burlington", nps: 6, eta: "80 min", visits: "370+", blurb: "Aldershot to Alton Village full coverage.", neighbourhoods: ["Aldershot", "Alton Village", "Roseland", "Headon Forest"] },
  { name: "Milton", slug: "milton", nps: 6, eta: "85 min", visits: "340+", blurb: "Same-day visits across Milton & rural Halton.", neighbourhoods: ["Old Milton", "Beaty", "Willmott", "Ford"] },
  { name: "Hamilton", slug: "hamilton", nps: 8, eta: "90 min", visits: "430+", blurb: "From Stoney Creek to Ancaster — wide catchment.", neighbourhoods: ["Stoney Creek", "Ancaster", "Dundas", "Westdale"] },
  { name: "Halton Hills", slug: "halton-hills", nps: 5, eta: "95 min", visits: "210+", blurb: "Covering Halton Hills, Acton, and Georgetown.", neighbourhoods: ["Georgetown", "Acton", "Glen Williams", "Norval"] },
];

function LocationsPage() {
  useReveal();
  const [query, setQuery] = useState("");
  const filtered = CITIES.filter((c) =>
    [c.name, ...c.neighbourhoods].join(" ").toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent), radial-gradient(50% 40% at 0% 100%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
          }}
        />
        <div className="relative container-page py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-soft">
                <MapPin className="h-3 w-3" /> Service area
              </span>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
                Serving families <br className="hidden sm:block" />
                <span className="text-primary">across Ontario.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary-ink">
                Board-certified Nurse Practitioners on call across the Greater Toronto and Hamilton Area. Same-day home visits, every day of the week.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Book a visit <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:18005550199"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" /> 1-800-555-0199
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-white/80 p-6 shadow-soft backdrop-blur">
                <Stat value="7" label="Cities live" />
                <Stat value="48+" label="Nurse Practitioners" />
                <Stat value="3,170+" label="Visits delivered" />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-secondary-ink">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> PHIPA compliant · Insurance receipts provided
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="border-y border-border bg-white sticky top-0 z-20">
        <div className="container-page flex flex-col items-stretch gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-ink" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or neighbourhood…"
              aria-label="Search locations"
              className="w-full rounded-full border border-border bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-secondary-ink/70 outline-none transition focus:border-primary focus:bg-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary-ink">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-1 font-semibold text-[#047857]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2ECC8B]" /> All cities accepting bookings
            </span>
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="section-y bg-[#F8FAFC]">
        <div className="container-page">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
              <MapPin className="mx-auto h-8 w-8 text-secondary-ink/50" />
              <p className="mt-3 font-display text-xl font-bold">No matches in our current service area</p>
              <p className="mt-2 text-sm text-secondary-ink">We're expanding monthly — join the waitlist below.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c, i) => (
                <Link
                  key={c.name}
                  to="/locations/$city"
                  params={{ city: c.slug }}
                  className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-[#2ECC8B] transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#047857]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC8B]" /> Accepting
                    </div>
                    {c.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                        <Star className="h-2.5 w-2.5 fill-primary" /> Largest team
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">{c.name}</h2>
                  <p className="mt-1.5 text-sm text-secondary-ink">{c.blurb}</p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-y border-border py-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-ink">
                        <UserCheck className="h-3 w-3" /> NPs
                      </div>
                      <div className="mt-0.5 font-display text-lg font-bold text-foreground">{c.nps}</div>
                    </div>
                    <div className="border-x border-border">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-ink">
                        <Clock className="h-3 w-3" /> Avg
                      </div>
                      <div className="mt-0.5 font-display text-lg font-bold text-foreground">{c.eta}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-secondary-ink">Visits</div>
                      <div className="mt-0.5 font-display text-lg font-bold text-foreground">{c.visits}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.neighbourhoods.slice(0, 3).map((n) => (
                      <span key={n} className="rounded-full bg-[#F4F8FF] px-2.5 py-1 text-[11px] font-medium text-primary">
                        {n}
                      </span>
                    ))}
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-medium text-secondary-ink">
                      +{c.neighbourhoods.length - 3} more
                    </span>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                    See {c.name} page <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-[#0D1B2A] p-10 text-white lg:p-14">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #1B6CA8, transparent)" }}
            />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  <MapPin className="h-3 w-3" /> Expanding monthly
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Don't see your city? Join the waitlist.
                </h2>
                <p className="mt-3 max-w-xl text-white/70">
                  We're rolling out to new Ontario communities every month. Tell us where you live and we'll notify you the moment we're live in your area.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0D1B2A] transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Join waitlist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-secondary-ink">{label}</div>
    </div>
  );
}