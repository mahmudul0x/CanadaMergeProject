import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pediatric Urgent Care™" },
      { name: "description", content: "Call, email, or message us. Mon–Sun · 7am–10pm." },
    ],
  }),
  component: () => (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-20 text-center">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Contact</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">We're here to help.</h1>
          <p className="mt-4 text-lg text-secondary-ink max-w-xl mx-auto">
            Reach us 7 days a week. For medical emergencies, call 911.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form className="rounded-3xl border border-border bg-surface p-8 shadow-soft space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="Your name" className="rounded-lg border border-border bg-surface px-3 py-3 outline-none focus:border-primary" />
              <input placeholder="Email" className="rounded-lg border border-border bg-surface px-3 py-3 outline-none focus:border-primary" />
            </div>
            <input placeholder="Subject" className="w-full rounded-lg border border-border bg-surface px-3 py-3 outline-none focus:border-primary" />
            <textarea rows={6} placeholder="Message" className="w-full rounded-lg border border-border bg-surface px-3 py-3 outline-none focus:border-primary resize-y" />
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 btn-press">Send message</button>
          </form>
          <div className="space-y-4">
            {[
              { icon: Phone, l: "Phone", v: "(905) 123-4567" },
              { icon: Mail, l: "Email", v: "care@pediatricuc.ca" },
              { icon: MapPin, l: "Coverage", v: "Southern Ontario · 7 cities" },
            ].map((c) => (
              <div key={c.l} className="rounded-2xl border border-border bg-surface p-6 flex items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink">{c.l}</p>
                  <p className="mt-1 font-display font-bold">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ),
});