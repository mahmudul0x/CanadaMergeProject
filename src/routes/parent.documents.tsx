import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText, Trash2, Upload } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/documents")({ component: DocumentsPage });

const CATEGORIES = ["All", "Lab Results", "Prescriptions", "Referrals", "Visit Notes", "Other"] as const;
const INITIAL = [
  { id: 1, name: "Blood panel - Emma.pdf", date: "Nov 10, 2025", type: "PDF", cat: "Lab Results" as const },
  { id: 2, name: "Albuterol prescription.pdf", date: "Oct 24, 2025", type: "PDF", cat: "Prescriptions" as const },
  { id: 3, name: "Visit note Nov 12.pdf", date: "Nov 12, 2024", type: "PDF", cat: "Visit Notes" as const },
  { id: 4, name: "ENT referral.jpg", date: "Sep 03, 2025", type: "IMG", cat: "Referrals" as const },
  { id: 5, name: "X-ray report.pdf", date: "Aug 21, 2025", type: "PDF", cat: "Lab Results" as const },
];

function DocumentsPage() {
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("All");
  const [docs, setDocs] = useState(INITIAL);
  const filtered = filter === "All" ? docs : docs.filter((d) => d.cat === filter);

  return (
    <>
      <PageHeader title="Document Vault" sub="Securely stored medical records and notes." />

      <label className="block rounded-2xl border-2 border-dashed border-border bg-surface p-10 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Upload className="h-6 w-6" />
        </span>
        <p className="mt-4 font-display font-bold">Drop medical documents here or click to upload</p>
        <p className="text-sm text-secondary-ink">PDF, JPG, PNG up to 20MB each</p>
        <input type="file" multiple className="sr-only" />
      </label>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-secondary-ink hover:border-primary hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <Card className="sm:col-span-2 lg:col-span-3 text-center">
            <FileText className="mx-auto h-10 w-10 text-secondary-ink/40" />
            <p className="mt-3 font-display font-bold">No documents in this category</p>
            <p className="text-sm text-secondary-ink">Upload a file to get started.</p>
          </Card>
        )}
        {filtered.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{d.name}</p>
                <p className="text-xs text-secondary-ink">{d.date}</p>
                <div className="mt-2 flex gap-1.5">
                  <Badge tone="info">{d.type}</Badge>
                  <Badge>{d.cat}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button onClick={() => setDocs((ds) => ds.filter((x) => x.id !== d.id))} className="inline-flex items-center justify-center rounded-lg border border-border h-9 w-9 hover:border-destructive hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}