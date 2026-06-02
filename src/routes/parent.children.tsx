// @refresh reset
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Avatar, Badge, Card, PageHeader } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/parent/children")({ component: ChildrenPage });

const INITIAL = [
  { id: "emma", name: "Emma Thompson", age: 6, dob: "Mar 14, 2019", blood: "A+", allergies: ["Peanuts", "Penicillin"], meds: ["Albuterol PRN"] },
  { id: "liam", name: "Liam Thompson", age: 3, dob: "Aug 22, 2022", blood: "O+", allergies: [], meds: [] },
];

function ChildrenPage() {
  const [children, setChildren] = useState(INITIAL);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="My Children"
        sub="Manage profiles, allergies and medications."
        action={
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 btn-press">
            <Plus className="h-4 w-4" /> Add Child
          </button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {children.map((c) => (
          <Card key={c.id}>
            <div className="flex items-start gap-4">
              <Avatar name={c.name} size={64} tone="health" />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl truncate">{c.name}</h2>
                <p className="text-sm text-secondary-ink">Age {c.age} · DOB {c.dob} · Blood {c.blood}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-secondary-ink mb-1.5">Allergies</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {c.allergies.length === 0
                    ? <span className="text-secondary-ink text-xs">None reported</span>
                    : c.allergies.map((a) => <Badge key={a} tone="bad">{a}</Badge>)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-secondary-ink mb-1.5">Medications</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {c.meds.length === 0
                    ? <span className="text-secondary-ink text-xs">None</span>
                    : c.meds.map((m) => <Badge key={m} tone="info">{m}</Badge>)}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Edit</button>
              <button className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">View History</button>
            </div>
          </Card>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-surface shadow-lift p-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">Add a child</h3>
              <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-lg hover:bg-accent inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = String(fd.get("name") || "");
                if (!name) return;
                setChildren((cs) => [
                  ...cs,
                  { id: name.toLowerCase(), name, age: 0, dob: String(fd.get("dob") || ""), blood: "—", allergies: [], meds: [] },
                ]);
                setOpen(false);
              }}
              className="mt-5 space-y-3"
            >
              <Input name="name" label="Full name" />
              <Input name="dob" label="Date of birth" type="date" />
              <Input name="gender" label="Gender" />
              <Input name="allergies" label="Allergies (optional)" />
              <Input name="meds" label="Medications (optional)" />
              <button className="w-full rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground">Add child</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Input({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-ink mb-1.5">{label}</span>
      <input name={name} type={type} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  );
}