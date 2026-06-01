import { Link } from "@tanstack/react-router";

function MapleLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1.5l1.4 3.2 3.4-.9-1.2 3.3 3 1.7-2.7 2.1 1.6 3.2-3.4-.4-.3 3.4-1.8-1.7-1.8 1.7-.3-3.4-3.4.4 1.6-3.2L5.4 8.8l3-1.7-1.2-3.3 3.4.9L12 1.5zm-1 17.5h2v4h-2z" />
    </svg>
  );
}

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <MapleLeaf className="h-7 w-7 text-maple flex-shrink-0" />
      {!compact && (
        <span className="leading-tight">
          <span className={`block font-display font-bold text-[1rem] ${light ? "text-white" : "text-foreground"}`}>
            Pediatric Urgent Care
            <sup className={`ml-0.5 text-[0.55rem] ${light ? "text-white/60" : "text-secondary-ink"}`}>™</sup>
          </span>
          <span className={`block text-[11px] ${light ? "text-white/60" : "text-secondary-ink"}`}>
            Ontario's Home Visit Specialists
          </span>
        </span>
      )}
    </Link>
  );
}