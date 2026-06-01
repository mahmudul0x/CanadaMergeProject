import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const KEY = "puc_cookie_consent_v1";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      // ignore (SSR / privacy mode)
    }
  }, []);

  const choose = (choice: "all" | "essential") => {
    try { localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() })); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-surface shadow-lift p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold">We respect your privacy</p>
            <p className="mt-1 text-sm text-secondary-ink leading-relaxed">
              We use essential cookies to operate this site and your account. With your consent, we also use analytics cookies to improve the experience. PHI is never stored in cookies. See our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => choose("all")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground btn-press hover:brightness-110">
                Accept all
              </button>
              <button onClick={() => choose("essential")} className="rounded-full border-2 border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:border-primary">
                Essential only
              </button>
            </div>
          </div>
          <button onClick={() => choose("essential")} aria-label="Close" className="text-secondary-ink hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}