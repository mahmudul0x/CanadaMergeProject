// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Pediatric Urgent Care™" },
      { name: "description", content: "Terms of service for Pediatric Urgent Care home visit bookings, payments, cancellations, and clinical scope of practice." },
      { property: "og:title", content: "Terms of Service — Pediatric Urgent Care" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-16 lg:py-20 max-w-4xl">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Legal</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Terms of Service</h1>
          <p className="mt-3 text-secondary-ink">Last updated: May 1, 2026</p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8 text-secondary-ink leading-relaxed">
          {SECTIONS.map((s) => (
            <section key={s.t}>
              <h2 className="font-display text-2xl font-extrabold text-foreground mb-3">{s.t}</h2>
              <p>{s.b}</p>
            </section>
          ))}
          <div className="rounded-2xl border-l-4 border-warning bg-warning/10 p-5">
            <p className="font-display font-bold text-foreground">Emergency notice</p>
            <p className="mt-1 text-sm">This service is not for life-threatening emergencies. If your child has trouble breathing, severe bleeding, unresponsiveness, or seizure activity, call 911 immediately.</p>
          </div>
          <p className="text-sm">Questions? See our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link> or <Link to="/contact" className="text-primary underline">contact us</Link>.</p>
        </div>
      </section>
    </div>
  );
}

const SECTIONS = [
  { t: "1. Scope of service", b: "We provide non-emergency pediatric urgent care via licensed Nurse Practitioners (RN(EC)) in the home setting. Services include sick visits, vaccinations, follow-up visits, well-child checkups, telemedicine, and developmental assessments. We are not a substitute for emergency services." },
  { t: "2. Eligibility", b: "Patients must be aged 0–17 and physically present at the booked address in Ontario at the visit time. A parent or legal guardian (aged 18+) must be present throughout the visit." },
  { t: "3. Booking, pricing & payment", b: "Visit fees are charged at booking. Travel fees, weekend surcharges, and urgent booking premiums are disclosed before payment. Payments are processed by Stripe; HST (13%) is added where applicable. We provide itemized receipts for insurance reimbursement." },
  { t: "4. Cancellations & refunds", b: "Cancel up to 2 hours before your slot for a full refund. Cancellations inside the 2-hour window are charged a $30 fee. No-shows are charged in full. If we cannot reach you, the visit is forfeited." },
  { t: "5. Clinical limitations", b: "Our NPs treat within their scope of practice. If your child requires diagnostics, imaging, IV care, or specialist referral, we will refer you to the appropriate ER, walk-in, or specialist and a no-charge follow-up may be offered." },
  { t: "6. Records", b: "Visit notes are retained per College of Nurses of Ontario standards. Copies of records may be shared with your child's primary care provider with your written consent. See our Privacy Policy for full details." },
  { t: "7. Liability", b: "Our liability is limited to the amount paid for the specific visit. We carry professional liability insurance per CNO requirements. Use of this service does not waive your statutory rights as a patient." },
  { t: "8. Changes", b: "We may update these terms; material changes will be emailed to active account holders 14 days before they take effect." },
  { t: "9. Governing law", b: "These terms are governed by the laws of the Province of Ontario, Canada. Any dispute will be resolved in the courts of Ontario." },
];