// @refresh reset
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Pediatric Urgent Care™" },
      { name: "description", content: "Health tips, parenting guides, and clinical updates from our Nurse Practitioners." },
    ],
  }),
  component: () => (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-20 text-center">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Blog</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Pediatric health, explained.</h1>
          <p className="mt-4 text-lg text-secondary-ink max-w-xl mx-auto">
            Practical guides from our Nurse Practitioners. New articles weekly.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "When does a fever need a doctor?", c: "Clinical signs", color: "bg-primary/10 text-primary" },
            { t: "Ear infections: what every parent should know", c: "Common illness", color: "bg-health/15 text-[oklch(0.45_0.15_160)]" },
            { t: "Your child's vaccine schedule in Ontario", c: "Vaccinations", color: "bg-warm/15 text-[oklch(0.5_0.18_40)]" },
            { t: "5 signs of dehydration to watch for", c: "Quick guide", color: "bg-primary/10 text-primary" },
            { t: "Travel vaccines: planning ahead", c: "Vaccinations", color: "bg-warm/15 text-[oklch(0.5_0.18_40)]" },
            { t: "Developmental milestones 0-2 years", c: "Development", color: "bg-health/15 text-[oklch(0.45_0.15_160)]" },
          ].map((p) => (
            <article key={p.t} className="rounded-2xl border border-border bg-surface overflow-hidden hover-lift">
              <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-health/20" />
              <div className="p-6">
                <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${p.color}`}>{p.c}</span>
                <h3 className="mt-3 text-lg">{p.t}</h3>
                <p className="mt-2 text-sm text-secondary-ink">5 min read</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  ),
});