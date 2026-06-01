import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all bg-surface/95 backdrop-blur-md ${
        scrolled ? "border-b border-border shadow-soft" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-[60px] items-center justify-between gap-4 lg:h-[72px]">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="px-3 py-2 text-sm font-medium rounded-md text-foreground hover:text-primary transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:+19051234567"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" /> (905) 123-4567
          </a>
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-[#154f7d] btn-press transition-colors"
          >
            Book Home Visit
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 z-40 bg-surface animate-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="container-page py-6 flex flex-col gap-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-4 rounded-lg text-lg font-medium border-b border-border"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:+19051234567"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-base font-semibold"
            >
              <Phone className="h-4 w-4" /> (905) 123-4567
            </a>
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center items-center rounded-full bg-primary px-4 py-4 text-base font-semibold text-primary-foreground"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}