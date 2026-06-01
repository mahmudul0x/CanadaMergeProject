import { Edit3, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AiAvatar, Bubble, Chip, TypingIndicator, type ChatMessage } from "./ChatUI";

export type IntakeData = {
  childName: string;
  concern: string;
  duration: string;
  associated: string[];
  allergies: string;
  medications: string;
};

type Step = "name" | "concern" | "duration" | "associated" | "allergies" | "meds" | "summary";

const DURATIONS = ["Just today", "1–2 days", "3–5 days", "A week+"];
const ASSOCIATED = ["Fever", "Vomiting", "Rash", "Coughing", "Ear pain", "None"];

export function IntakeAssistant({
  initial,
  onComplete,
}: {
  initial?: Partial<IntakeData>;
  onComplete: (data: IntakeData) => void;
}) {
  const [step, setStep] = useState<Step>("name");
  const [data, setData] = useState<IntakeData>({
    childName: initial?.childName || "",
    concern: initial?.concern || "",
    duration: initial?.duration || "",
    associated: initial?.associated || [],
    allergies: initial?.allergies || "",
    medications: initial?.medications || "",
  });
  const [associatedDraft, setAssociatedDraft] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m0", role: "ai", content: "Hi! Let's gather a few details for your Nurse Practitioner. What's your child's name?" },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const aiSay = (content: ChatMessage["content"], next?: Step) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `ai-${m.length}`, role: "ai", content }]);
      if (next) setStep(next);
    }, 550);
  };

  const userSay = (text: string) => {
    setMessages((m) => [...m, { id: `u-${m.length}`, role: "user", content: text }]);
  };

  const submitText = (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = input.trim();
    if (!v) return;
    setInput("");
    userSay(v);
    if (step === "name") {
      setData((d) => ({ ...d, childName: v }));
      aiSay(`Nice to meet you! What's going on with ${v} today?`, "concern");
    } else if (step === "concern") {
      setData((d) => ({ ...d, concern: v }));
      aiSay(`Got it. How long has this been happening?`, "duration");
    } else if (step === "allergies") {
      setData((d) => ({ ...d, allergies: v }));
      aiSay(`Last question — is ${data.childName || "your child"} taking any medications right now?`, "meds");
    } else if (step === "meds") {
      const final = { ...data, medications: v };
      setData(final);
      aiSay(`Perfect — I've put together a summary for your NP below.`, "summary");
    }
  };

  const chooseDuration = (d: string) => {
    userSay(d);
    setData((prev) => ({ ...prev, duration: d }));
    aiSay(
      `Is ${data.childName || "your child"} also experiencing any of these?`,
      "associated",
    );
  };

  const toggleAssociated = (a: string) => {
    setAssociatedDraft((arr) => {
      if (a === "None") return ["None"];
      const without = arr.filter((x) => x !== "None");
      return without.includes(a) ? without.filter((x) => x !== a) : [...without, a];
    });
  };

  const confirmAssociated = () => {
    const list = associatedDraft.length === 0 ? ["None"] : associatedDraft;
    userSay(list.join(", "));
    setData((d) => ({ ...d, associated: list }));
    aiSay(
      `Thanks. Does ${data.childName || "your child"} have any known allergies to medications? (Type "none" if not)`,
      "allergies",
    );
  };

  const restart = () => {
    setStep("name");
    setMessages([
      { id: "m0", role: "ai", content: "Let's start again. What's your child's name?" },
    ]);
    setData({ childName: "", concern: "", duration: "", associated: [], allergies: "", medications: "" });
    setAssociatedDraft([]);
  };

  if (step === "summary") {
    return (
      <div className="rounded-2xl border border-border bg-surface shadow-soft overflow-hidden animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-success)] text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display font-extrabold text-base">Here's what I've collected for your NP</h3>
            <p className="text-[11px] text-secondary-ink">Please confirm everything looks correct.</p>
          </div>
        </div>
        <dl className="px-5 py-4 grid gap-3 text-sm sm:grid-cols-2">
          <SummaryRow label="Child's name" value={data.childName} />
          <SummaryRow label="Duration" value={data.duration} />
          <div className="sm:col-span-2">
            <SummaryRow label="Main concern" value={data.concern} />
          </div>
          <SummaryRow label="Associated symptoms" value={data.associated.join(", ") || "None"} />
          <SummaryRow label="Allergies" value={data.allergies || "—"} />
          <div className="sm:col-span-2">
            <SummaryRow label="Current medications" value={data.medications || "—"} />
          </div>
        </dl>
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-background/40">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-ink hover:text-primary"
          >
            <Edit3 className="h-3.5 w-3.5" /> Edit answers
          </button>
          <button
            type="button"
            onClick={() => onComplete(data)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90"
          >
            This looks right, continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const inputDisabled = !(step === "name" || step === "concern" || step === "allergies" || step === "meds");

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
        <AiAvatar />
        <div>
          <p className="text-sm font-display font-extrabold">PediIntake Assistant</p>
          <p className="text-[10px] text-secondary-ink">Conversational intake — your answers stay private (PHIPA).</p>
        </div>
      </div>
      <div ref={scrollRef} role="list" className="h-[340px] overflow-y-auto px-4 py-4 space-y-3 bg-background/40">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {!typing && step === "duration" && (
        <div className="px-4 pt-3 flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Chip key={d} onClick={() => chooseDuration(d)}>{d}</Chip>
          ))}
        </div>
      )}
      {!typing && step === "associated" && (
        <div className="px-4 pt-3 space-y-2">
          <div className="flex flex-wrap gap-2">
            {ASSOCIATED.map((a) => (
              <Chip key={a} selected={associatedDraft.includes(a)} onClick={() => toggleAssociated(a)}>{a}</Chip>
            ))}
          </div>
          <button
            type="button"
            onClick={confirmAssociated}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Continue <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      <form onSubmit={submitText} className="flex items-center gap-2 px-4 py-3 border-t border-border bg-surface">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={inputDisabled}
          aria-label="Message"
          placeholder={inputDisabled ? "Tap a chip above…" : "Type your answer…"}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={inputDisabled || !input.trim()}
          className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40"
        >
          Send <ArrowRight className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider font-semibold text-secondary-ink">{label}</dt>
      <dd className="mt-0.5 text-foreground">{value || "—"}</dd>
    </div>
  );
}