import { Bot } from "lucide-react";
import type { ReactNode } from "react";

export type ChatMessage = {
  id: string;
  role: "ai" | "user";
  content: ReactNode;
};

export function AiAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Bot className="h-4 w-4" />
    </span>
  );
}

export function Bubble({ message }: { message: ChatMessage }) {
  const isAi = message.role === "ai";
  return (
    <div
      role="listitem"
      aria-label={isAi ? "Assistant message" : "Your message"}
      className={`flex items-end gap-2 ${isAi ? "justify-start" : "justify-end"}`}
    >
      {isAi && <AiAvatar />}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isAi
            ? "bg-surface text-foreground rounded-bl-sm border border-border"
            : "bg-primary text-primary-foreground rounded-br-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" role="status" aria-label="Assistant is typing">
      <AiAvatar />
      <div className="rounded-2xl rounded-bl-sm border border-border bg-surface px-3.5 py-3 shadow-sm">
        <span className="flex gap-1">
          <Dot delay="0ms" />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-secondary-ink/60"
      style={{ animationDelay: delay }}
    />
  );
}

export function Chip({
  children,
  onClick,
  selected,
}: {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}