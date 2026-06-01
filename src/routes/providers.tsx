import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, GraduationCap, Languages, MapPin, ShieldCheck, Stethoscope, Star } from "lucide-react";

export const Route = createFileRoute("/providers")({
  head: () => ({
    meta: [
      { title: "Our Nurse Practitioners — Pediatric Urgent Care™" },
      { name: "description", content: "Meet the board-certified Nurse Practitioners (RN(EC)) delivering pediatric home visits across Ontario." },
      { property: "og:title", content: "Our Nurse Practitioners" },
      { property: "og:description", content: "48+ CNO-licensed pediatric NPs across the GTA, Hamilton, and Halton regions." },
      { property: "og:url", content: "/providers" },
    ],
    links: [{ rel: "canonical", href: "/providers" }],
  }),
  component: ProvidersPage,
});

const PROVIDERS = [
  { name: "Amelia Chen, NP", init: "AC", cred: "RN(EC), MN", city: "Milton", focus: "Newborn & sick visits", langs: ["English", "Mandarin"], years: 8, bio: "Former NICU RN, now leading newborn home visits across Halton." },
  { name: "Daniel Park, NP", init: "DP", cred: "RN(EC), MScN", city: "Milton", focus: "Vaccinations & well-child", langs: ["English", "Korean"], years: 6, bio: "Certified in pediatric primary care; CHEO-trained." },
  { name: "Priya Shah, NP", init: "PS", cred: "RN(EC), MScN", city: "Hamilton", focus: "Pediatric urgent care", langs: ["English", "Hindi", "Gujarati"], years: 11, bio: "11 years in pediatric emergency before moving to home-based care." },
  { name: "Mark Liu, NP", init: "ML", cred: "RN(EC)", city: "Hamilton", focus: "Vaccinations", langs: ["English", "Cantonese"], years: 5, bio: "Public health vaccination specialist; loves the under-5s." },
  { name: "Aisha Khan, NP", init: "AK", cred: "RN(EC), MScN", city: "Mississauga", focus: "Pediatric urgent care", langs: ["English", "Urdu", "Punjabi"], years: 9, bio: "Trillium Health Partners alum; multilingual care specialist." },
  { name: "Carlos Mendez, NP", init: "CM", cred: "RN(EC)", city: "Mississauga", focus: "Vaccinations", langs: ["English", "Spanish"], years: 7, bio: "Travels south Mississauga and Port Credit with a smile." },
  { name: "Sam Patel, NP", init: "SP", cred: "RN(EC), MN", city: "Burlington", focus: "Sick visits & follow-up", langs: ["English", "Gujarati"], years: 6, bio: "Joined us from McMaster's pediatric clinic." },
  { name: "Sara Ali, NP", init: "SA", cred: "RN(EC)", city: "Halton Hills", focus: "Developmental assessment", langs: ["English", "Arabic", "Urdu"], years: 8, bio: "Specialist in early developmental screening and referral." },
  { name: "Jordan Tate, NP", init: "JT", cred: "RN(EC)", city: "Oakville", focus: "Sick visits", langs: ["English"], years: 5, bio: "Loves a good fever workup at 9pm. Truly." },
  { name: "Reena Singh, NP", init: "RS", cred: "RN(EC), MScN", city: "Brampton", focus: "Pediatric urgent care", langs: ["English", "Punjabi", "Hindi"], years: 10, bio: "Brampton-born, runs our north Peel team." },
];

function ProvidersPage() {
  return (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-16 lg:py-24">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Clinical Team</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold">Meet your child's care team</h1>
          <p className="mt-5 max-w-2xl text-lg text-secondary-ink">48+ board-certified Nurse Practitioners across Southern Ontario. Every NP is RN(EC) registered, CNO-licensed, and continuously credentialled in pediatric primary care.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { k: "NPs on staff", v: "48+", icon: Stethoscope },
              { k: "Years avg experience", v: "7.4", icon: Award },
              { k: "Languages spoken", v: "14", icon: Languages },
              { k: "CNO licensed", v: "100%", icon: ShieldCheck },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-surface p-5">
                <s.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-display text-2xl font-extrabold">{s.v}</p>
                <p className="text-xs text-secondary-ink">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <h2 className="text-3xl">Our Nurse Practitioners</h2>
            <Link to="/book" className="text-sm font-semibold text-primary">Book a visit →</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.map((p) => (
              <article key={p.name} className="rounded-2xl border border-border bg-surface p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.15_220)] text-primary-foreground font-display font-extrabold text-xl shadow-soft">
                    {p.init}
                  </span>
                  <div className="flex-1">
                    <p className="font-display font-bold">{p.name}</p>
                    <p className="text-xs text-secondary-ink">{p.cred} · {p.years} yrs</p>
                    <div className="mt-1 flex gap-0.5 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{p.bio}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div><dt className="text-secondary-ink">Focus</dt><dd className="font-semibold">{p.focus}</dd></div>
                  <div><dt className="text-secondary-ink inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> City</dt><dd className="font-semibold">{p.city}</dd></div>
                  <div className="col-span-2"><dt className="text-secondary-ink inline-flex items-center gap-1"><Languages className="h-3 w-3" /> Languages</dt><dd className="font-semibold">{p.langs.join(" · ")}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-page max-w-4xl text-center">
          <GraduationCap className="h-10 w-10 text-primary mx-auto" />
          <h2 className="mt-4 text-3xl">Credentialling &amp; quality</h2>
          <p className="mt-3 text-secondary-ink max-w-2xl mx-auto leading-relaxed">
            Every NP carries an active CNO Extended Class registration, $5M professional liability insurance, and clears a vulnerable-sector check. We audit a random sample of visit notes monthly and run quarterly peer-review case rounds.
          </p>
          <Link to="/book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3.5 font-bold text-warm-foreground shadow-lift btn-press hover:brightness-105">
            Book your first visit
          </Link>
        </div>
      </section>
    </div>
  );
}