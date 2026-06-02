// @refresh reset
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Mic, RotateCcw, Send, Zap } from "lucide-react";
import { AiAvatar, Bubble, Chip, TypingIndicator, type ChatMessage } from "@/components/ai/ChatUI";

export const Route = createFileRoute("/symptom-checker")({
  head: () => ({
    meta: [
      { title: "PediCheck AI Symptom Checker — Pediatric Urgent Care™" },
      { name: "description", content: "Quick triage for your child's symptoms. Not a diagnosis. Always consult a professional." },
      { property: "og:title", content: "PediCheck AI Symptom Checker" },
      { property: "og:description", content: "Conversational pediatric triage in under 2 minutes." },
    ],
  }),
  component: SymptomCheckerPage,
});

function SymptomCheckerPage() {
  return (
    <div className="bg-background min-h-[100dvh] py-10 px-4">
      <div className="mx-auto max-w-[640px]">
        <SymptomChecker />
      </div>
    </div>
  );
}

type Stage = "age" | "symptom" | "duration" | "severity" | "result";
type Outcome = "ok" | "soon" | "urgent";

const SYMPTOMS = ["Fever", "Cough", "Rash", "Ear pain", "Vomiting", "Other"] as const;
const DURATIONS = ["Just started", "1–2 days", "3–5 days", "A week+"] as const;
const SEVERITY = [
  { label: "Fine", emoji: "😊", score: 1 },
  { label: "Unwell", emoji: "😐", score: 2 },
  { label: "Miserable", emoji: "😟", score: 3 },
  { label: "Very Unwell", emoji: "😰", score: 4 },
] as const;

export function SymptomChecker({ embedded = false }: { embedded?: boolean }) {
  const [stage, setStage] = useState<Stage>("age");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "ai",
      content: "Hi! I'm PediCheck. I can help you figure out how urgent your child's symptoms are. How old is your child?",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [age, setAge] = useState("");
  const [symptom, setSymptom] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [severity, setSeverity] = useState<number>(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const pushAi = (content: ChatMessage["content"], delay = 600) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `ai-${m.length}`, role: "ai", content }]);
    }, delay);
  };
  const pushUser = (content: ChatMessage["content"]) => {
    setMessages((m) => [...m, { id: `u-${m.length}`, role: "user", content }]);
  };

  const handleAge = () => {
    if (!input.trim()) return;
    const value = input.trim();
    pushUser(value);
    setAge(value);
    setInput("");
    setStage("symptom");
    pushAi("Thanks! What's the main thing worrying you today?", 500);
  };

  const handleSymptom = (s: string) => {
    pushUser(s);
    setSymptom(s);
    setStage("duration");
    pushAi(`How long has the ${s.toLowerCase()} been going on?`, 500);
  };

  const handleDuration = (d: string) => {
    pushUser(d);
    setDuration(d);
    setStage("severity");
    pushAi("On a scale, how is your child feeling right now?", 500);
  };

  const handleSeverity = (s: (typeof SEVERITY)[number]) => {
    pushUser(`${s.emoji} ${s.label}`);
    setSeverity(s.score);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      // simple heuristic
      let result: Outcome = "ok";
      const dur = duration;
      if (s.score >= 4) result = "urgent";
      else if (s.score === 3) result = "soon";
      else if (s.score === 2 && (dur === "3–5 days" || dur === "A week+")) result = "soon";
      else result = "ok";
      setOutcome(result);
      setStage("result");
    }, 700);
  };

  const reset = () => {
    setStage("age");
    setMessages([
      {
        id: "m1",
        role: "ai",
        content: "Hi! I'm PediCheck. I can help you figure out how urgent your child's symptoms are. How old is your child?",
      },
    ]);
    setAge("");
    setSymptom("");
    setDuration("");
    setSeverity(0);
    setOutcome(null);
    setInput("");
  };

  return (
    <div className={`rounded-2xl border border-border bg-surface shadow-soft overflow-hidden ${embedded ? "" : ""}`}>
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
        <AiAvatar size={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-base">PediCheck AI</h2>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Beta</span>
          </div>
          <p className="text-[11px] text-secondary-ink">Powered by Pediatric Urgent Care™</p>
          <p className="mt-1 text-[11px] text-secondary-ink italic">
            This is not a medical diagnosis. Always consult a professional.
          </p>
        </div>
      </div>

      {/* Messages / Result */}
      {stage !== "result" ? (
        <>
          <div
            ref={scrollRef}
            role="list"
            aria-label="Conversation"
            className="h-[400px] overflow-y-auto px-4 py-4 space-y-3 bg-background/40"
          >
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}
            {typing && <TypingIndicator />}
          </div>

          {/* Chip suggestions */}
          {!typing && stage === "symptom" && (
            <div className="px-4 pt-3 flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <Chip key={s} onClick={() => handleSymptom(s)}>{s}</Chip>
              ))}
            </div>
          )}
          {!typing && stage === "duration" && (
            <div className="px-4 pt-3 flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <Chip key={d} onClick={() => handleDuration(d)}>{d}</Chip>
              ))}
            </div>
          )}
          {!typing && stage === "severity" && (
            <div className="px-4 pt-3 grid grid-cols-4 gap-2">
              {SEVERITY.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleSeverity(s)}
                  className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-3 text-xs font-medium transition-all hover:border-primary hover:shadow-soft"
                >
                  <span className="text-2xl" aria-hidden>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (stage === "age") handleAge();
            }}
            className="flex items-center gap-2 px-4 py-3 border-t border-border bg-surface"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={stage !== "age"}
              placeholder={stage === "age" ? "e.g. 3 years old" : "Use the buttons above…"}
              aria-label="Message"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
            />
            <button
              type="button"
              aria-label="Voice input"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary-ink hover:text-primary hover:border-primary"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              aria-label="Send"
              disabled={stage !== "age" || !input.trim()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </>
      ) : (
        <div className="p-5">
          {outcome === "ok" && (
            <ResultCard
              tone="green"
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Looks manageable at home for now."
              body="Monitor symptoms. If they worsen or persist beyond 48 hours, book a visit."
              cta={<PrimaryCta to="/book">Book a Visit Anyway</PrimaryCta>}
            />
          )}
          {outcome === "soon" && (
            <ResultCard
              tone="amber"
              icon={<Zap className="h-6 w-6" />}
              title="We recommend a visit within 24 hours."
              body="Your child's symptoms suggest professional evaluation is needed."
              cta={<PrimaryCta to="/book" warm>Book a Visit Now</PrimaryCta>}
            />
          )}
          {outcome === "urgent" && (
            <ResultCard
              tone="red"
              icon={<AlertTriangle className="h-6 w-6" />}
              title="Please seek care today."
              body="Your child's symptoms require prompt attention."
              cta={
                <div className="flex flex-col gap-2">
                  <PrimaryCta to="/book" danger>Book Urgent Visit</PrimaryCta>
                  <p className="text-xs text-destructive font-semibold">
                    Call 911 if breathing difficulty or unresponsiveness.
                  </p>
                </div>
              }
            />
          )}
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-ink hover:text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Start Over
          </button>

          <div className="mt-5 rounded-xl border border-border bg-background/50 p-3 text-xs text-secondary-ink">
            <p className="font-semibold text-foreground mb-1">Your answers</p>
            <p>Age: {age || "—"} · Symptom: {symptom} · Duration: {duration} · Severity: {severity}/4</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  tone,
  icon,
  title,
  body,
  cta,
}: {
  tone: "green" | "amber" | "red";
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: React.ReactNode;
}) {
  const styles = {
    green: "border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/10",
    amber: "border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/10",
    red: "border-destructive/40 bg-destructive/10",
  }[tone];
  const iconBg = {
    green: "bg-[color:var(--color-success)] text-white",
    amber: "bg-[color:var(--color-warning)] text-white",
    red: "bg-destructive text-destructive-foreground",
  }[tone];
  return (
    <div className={`rounded-2xl border-2 p-5 ${styles}`}>
      <div className="flex items-start gap-3">
        <span className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}>
          {icon}
        </span>
        <div className="flex-1">
          <h3 className="font-display font-extrabold text-lg leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-secondary-ink">{body}</p>
          <div className="mt-4">{cta}</div>
        </div>
      </div>
    </div>
  );
}

function PrimaryCta({
  to,
  children,
  warm,
  danger,
}: {
  to: string;
  children: React.ReactNode;
  warm?: boolean;
  danger?: boolean;
}) {
  const tone = danger
    ? "bg-destructive text-destructive-foreground"
    : warm
      ? "bg-[color:var(--color-warm)] text-[color:var(--color-warm-foreground)]"
      : "bg-primary text-primary-foreground";
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-soft transition-opacity hover:opacity-90 ${tone}`}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}