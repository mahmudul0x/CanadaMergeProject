import { Link } from "@tanstack/react-router";
import { MessageCircle, Minus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AiAvatar, Bubble, Chip, TypingIndicator, type ChatMessage } from "./ChatUI";

const PRICING = [
  { type: "Sick Visit", price: "$149" },
  { type: "Vaccination", price: "$99" },
  { type: "Follow-up", price: "$119" },
  { type: "Well-child", price: "$179" },
];

const CITIES = ["Milton", "Oakville", "Mississauga", "Burlington", "Brampton", "Hamilton", "Halton"];

const QUICK_REPLIES = ["Book a visit", "Check pricing", "Our locations", "Talk to a human"] as const;

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "ai",
      content: "Hi! I'm PediAssist. I can help with bookings, pricing, or general questions. What do you need?",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const aiSay = (content: ChatMessage["content"]) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `ai-${m.length}-${Date.now()}`, role: "ai", content }]);
    }, 500);
  };

  const userSay = (text: string) => {
    setMessages((m) => [...m, { id: `u-${m.length}-${Date.now()}`, role: "user", content: text }]);
  };

  const handleReply = (reply: string) => {
    setShowQuick(false);
    userSay(reply);
    switch (reply) {
      case "Book a visit":
        aiSay(
          <span>
            I'll take you to our booking page!{" "}
            <Link to="/book" className="underline font-semibold text-primary">
              Click here →
            </Link>
          </span>,
        );
        break;
      case "Check pricing":
        aiSay(
          <div>
            <p className="mb-2">Here's our standard pricing:</p>
            <ul className="space-y-1">
              {PRICING.map((p) => (
                <li key={p.type} className="flex justify-between gap-3 text-xs">
                  <span>{p.type}</span>
                  <span className="font-semibold">{p.price}</span>
                </li>
              ))}
            </ul>
          </div>,
        );
        break;
      case "Our locations":
        aiSay(
          <div>
            <p className="mb-2">We serve these cities:</p>
            <ul className="space-y-1">
              {CITIES.map((c) => (
                <li key={c}>
                  <Link
                    to="/locations/$city"
                    params={{ city: c.toLowerCase() }}
                    className="text-primary underline text-xs"
                  >
                    Book in {c} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>,
        );
        break;
      case "Talk to a human":
        aiSay(
          <span>
            Call us: <span className="font-semibold">(905) 123-4567</span>
            <br />
            Email:{" "}
            <a href="mailto:hello@pediatricurgentcare.ca" className="text-primary underline">
              hello@pediatricurgentcare.ca
            </a>
          </span>,
        );
        break;
    }
  };

  const handleFreeInput = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    setInput("");
    setShowQuick(false);
    userSay(v);
    aiSay(
      <span>
        Thanks for your question! For specific medical guidance, please{" "}
        <Link to="/book" className="text-primary underline font-semibold">
          book a visit
        </Link>{" "}
        or call (905) 123-4567.
      </span>,
    );
  };

  return (
    <div className="absolute" style={{ zIndex: 9999 }}>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3">
        {open && (
          <div
            role="dialog"
            aria-label="PediAssist chat"
            className="w-[320px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100dvh-7rem)] rounded-2xl border border-border bg-surface shadow-lift flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-gradient-to-br from-primary/10 to-transparent">
              <AiAvatar />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-extrabold">PediAssist</p>
                <p className="text-[10px] text-secondary-ink flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-secondary-ink hover:bg-accent"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} role="list" className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-background/40">
              {messages.map((m) => (
                <Bubble key={m.id} message={m} />
              ))}
              {typing && <TypingIndicator />}
              {showQuick && !typing && (
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((r) => (
                    <Chip key={r} onClick={() => handleReply(r)}>{r}</Chip>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleFreeInput} className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                aria-label="Message PediAssist"
                className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open PediAssist chat"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}