// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/np/document/$visitId")({ component: DocPage });

const TABS = ["Assessment", "Plan", "Notes"] as const;

function DocPage() {
  const { visitId } = Route.useParams();
  const [tab, setTab] = useState<typeof TABS[number]>("Assessment");
  return (
    <>
      <PageHeader title={`Visit Documentation`} sub={`Visit #${visitId} · Emma T., age 6 · Sick Visit · 12:15 PM`} />
      <Card className="p-0 overflow-hidden">
        <div className="border-b border-border flex">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-semibold border-b-2 ${tab === t ? "border-primary text-primary" : "border-transparent text-secondary-ink"}`}>{t}</button>
          ))}
        </div>
        <div className="p-6 space-y-5">
          {tab === "Assessment" && (
            <>
              <TextArea label="Chief complaint" defaultValue="Fever (39.0°C) and cough x 24 hours, decreased appetite." />
              <div className="grid gap-3 sm:grid-cols-5">
                {["Temp", "HR", "RR", "O2 Sat", "BP"].map((v) => <Inp key={v} label={v} />)}
              </div>
              {["HEENT", "Respiratory", "Cardiovascular", "Abdomen", "Skin"].map((s) => <TextArea key={s} label={`Exam · ${s}`} />)}
              <Inp label="Assessment / ICD-10" />
            </>
          )}
          {tab === "Plan" && (
            <>
              <TextArea label="Treatment plan" />
              <RowGrid title="Prescriptions" cols={["Medication", "Dose", "Frequency", "Duration"]} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink mb-2">Vaccines administered</p>
                <ul className="space-y-2">
                  {["MMR", "DTaP", "Flu"].map((v) => (
                    <li key={v} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" className="h-4 w-4 accent-[var(--color-primary)]" />
                      <span>{v}</span>
                      <input placeholder="Lot #" className="ml-auto rounded-lg border border-border bg-surface px-3 py-1.5 text-sm" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Inp label="Referral (specialist)" />
                <Inp label="Follow-up needed (timeframe)" />
              </div>
            </>
          )}
          {tab === "Notes" && (
            <>
              <TextArea label="Private NP notes" />
              <TextArea label="Parent communication notes" />
            </>
          )}
        </div>
        <div className="border-t border-border p-4 flex justify-end gap-3 bg-background/50">
          <button className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold">Save Draft</button>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Submit & Complete Visit</button>
        </div>
      </Card>
    </>
  );
}

function Inp({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-1.5">{label}</span>
      <input defaultValue={defaultValue} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary outline-none" />
    </label>
  );
}
function TextArea({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-1.5">{label}</span>
      <textarea defaultValue={defaultValue} rows={3} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary outline-none resize-y" />
    </label>
  );
}
function RowGrid({ title, cols }: { title: string; cols: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-secondary-ink mb-2">{title}</p>
      <div className="space-y-2">
        {[0, 1].map((r) => (
          <div key={r} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
            {cols.map((c) => <input key={c} placeholder={c} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm" />)}
          </div>
        ))}
        <button className="text-xs font-semibold text-primary">+ Add row</button>
      </div>
    </div>
  );
}