import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Shield, FileText, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pediatric Urgent Care™" },
      { name: "description", content: "How Pediatric Urgent Care collects, uses, stores, and protects your child's personal health information under PHIPA and PIPEDA." },
      { property: "og:title", content: "Privacy Policy — Pediatric Urgent Care" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-16 lg:py-20 max-w-4xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Legal</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-secondary-ink">Last updated: May 1, 2026 · PHIPA &amp; PIPEDA compliant</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm font-semibold"><Shield className="h-4 w-4 text-primary" /> PHIPA (Ontario)</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm font-semibold"><Lock className="h-4 w-4 text-primary" /> PIPEDA (Federal)</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm font-semibold"><FileText className="h-4 w-4 text-primary" /> Custodian: Pediatric Urgent Care™</span>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl prose-content space-y-10 text-secondary-ink">
          <Block n="1" title="Who we are">
            Pediatric Urgent Care™ ("we", "us") is the Health Information Custodian under the Personal Health Information Protection Act, 2004 (PHIPA) for personal health information (PHI) we collect when delivering pediatric home visits across Ontario.
          </Block>
          <Block n="2" title="Information we collect">
            <ul className="list-disc pl-5 space-y-1">
              <li>Child's name, date of birth, sex, OHIP/insurance, allergies, medications, medical history</li>
              <li>Parent/guardian contact: name, phone, email, home address</li>
              <li>Clinical notes captured by the Nurse Practitioner during the visit (SOAP)</li>
              <li>Payment information processed by Stripe (we never store full card numbers)</li>
              <li>Technical: IP, browser, anonymized analytics (with your consent)</li>
            </ul>
          </Block>
          <Block n="3" title="How we use your information">
            To deliver care, route the closest NP, document the visit, send appointment reminders, share records with your child's primary care provider with your consent, process payments, and improve safety/quality.
          </Block>
          <Block n="4" title="Disclosure">
            We disclose PHI only: (a) with your express consent, (b) to other health-care providers within your child's circle of care, (c) when required by law (CAS, public health, court order), or (d) to protect against serious risk of harm. We never sell PHI.
          </Block>
          <Block n="5" title="Storage &amp; security">
            PHI is stored on Canadian servers, encrypted in transit (TLS 1.3) and at rest (AES-256). Access is role-based and audited. Retention follows the College of Nurses of Ontario standard (10 years past age of majority).
          </Block>
          <Block n="6" title="Your rights">
            You may access, correct, or withdraw consent at any time by emailing our Privacy Officer. Withdrawal does not affect care already provided.
          </Block>
          <Block n="7" title="Cookies &amp; tracking">
            We use essential cookies for authentication and your cookie consent preference. Analytics cookies only run after you accept them via our banner.
          </Block>
          <Block n="8" title="Contact our Privacy Officer">
            <div className="rounded-2xl border border-border bg-surface p-5 not-prose flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="font-display font-bold text-foreground">privacy@pediatricurgentcare.ca</p>
                <p className="text-sm">You may also contact the Information &amp; Privacy Commissioner of Ontario at ipc.on.ca.</p>
              </div>
            </div>
          </Block>
          <p className="text-sm">See also our <Link to="/terms" className="text-primary underline">Terms of Service</Link>.</p>
        </div>
      </section>
    </div>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold text-foreground mb-3"><span className="text-primary">{n}.</span> {title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}