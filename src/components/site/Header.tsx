import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, ChevronDown, Menu, ShieldCheck, UserCheck, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Sick Visits",              to: "/services" },
      { label: "Vaccinations",             to: "/services" },
      { label: "Well-Child Checkups",      to: "/services" },
      { label: "Telemedicine",             to: "/services" },
      { label: "Home Visits",              to: "/services" },
      { label: "Developmental Assessment", to: "/services" },
    ],
  },
  {
    label: "Locations",
    to: "/locations",
    children: [
      { label: "Milton",      to: "/locations/milton"      },
      { label: "Oakville",    to: "/locations/oakville"    },
      { label: "Hamilton",    to: "/locations/hamilton"    },
      { label: "Mississauga", to: "/locations/mississauga" },
      { label: "Burlington",  to: "/locations/burlington"  },
      { label: "Brampton",    to: "/locations/brampton"    },
      { label: "Halton Hills",to: "/locations/halton-hills"},
    ],
  },
  {
    label: "For Parents",
    to: "/parent/dashboard",
    children: [
      { label: "Parent Portal",      to: "/parent/dashboard"    },
      { label: "AI Symptom Checker", to: "/symptom-checker"     },
      { label: "Vaccination Tracker",to: "/parent/vaccinations" },
      { label: "Growth Charts",      to: "/parent/growth"       },
      { label: "Book Appointment",   to: "/book"                },
    ],
  },
  { label: "Telemedicine", to: "/services", children: null },
  {
    label: "Resources",
    to: "/blog",
    children: [
      { label: "Health Blog",   to: "/blog"    },
      { label: "FAQ",           to: "/"        },
      { label: "About Our NPs", to: "/providers" },
    ],
  },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "Our Story",  to: "/about"   },
      { label: "Providers",  to: "/providers" },
      { label: "Careers",    to: "/about"   },
      { label: "Contact",    to: "/contact" },
    ],
  },
] as const;

export function Header() {
  const [open, setOpen]         = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (dropdown) {
      const close = () => setDropdown(null);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [dropdown]);

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? "shadow-md" : ""}`}>
      {/* ── Top banner ── */}
      <div className="bg-[#0D1B2A] text-white text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />
              PHIPA &amp; PIPEDA Compliant
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/70">Trusted Pediatric Care Across Ontario</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about"  className="text-white/70 hover:text-white transition-colors">Careers</Link>
            <span className="text-white/30">|</span>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Français</a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link to="/login"
              className="hidden sm:flex items-center gap-1.5 bg-[#1B6CA8] hover:bg-[#155892] text-white px-3 py-1 rounded-full transition-colors text-[11px] font-semibold">
              <UserCheck className="h-3 w-3" /> Patient Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="bg-white border-b border-[#D6E4F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-[#1B6CA8]" }}
                  className="flex items-center gap-1 px-3 py-2 text-[13.5px] font-semibold text-[#0D1B2A] hover:text-[#1B6CA8] rounded-lg transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 text-[#4A6580]" />}
                </Link>

                {/* Dropdown */}
                {item.children && dropdown === item.label && (
                  <div
                    className="absolute left-0 top-full pt-1 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white border border-[#D6E4F0] rounded-2xl shadow-xl py-2 min-w-50 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={() => setDropdown(null)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#0D1B2A] hover:bg-[#F0F6FF] hover:text-[#1B6CA8] transition-colors font-medium"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <Link to="/book"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1B6CA8] hover:bg-[#155892] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5">
              <CalendarCheck className="h-4 w-4" /> Book an Appointment
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#0D1B2A] hover:bg-[#F0F6FF] transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-27.25 bottom-0 z-40 bg-white overflow-y-auto border-t border-[#D6E4F0] shadow-xl">
          <div className="px-4 py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 rounded-xl text-[15px] font-semibold text-[#0D1B2A] hover:bg-[#F0F6FF] hover:text-[#1B6CA8] border-b border-[#F0F6FF] transition-colors">
                {item.label}
                {item.children && <ChevronDown className="h-4 w-4 text-[#4A6580]" />}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-[#D6E4F0]">
              <Link to="/book" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#1B6CA8] text-white font-bold py-3.5 rounded-full text-base">
                <CalendarCheck className="h-5 w-5" /> Book an Appointment
              </Link>
              <Link to="/login" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 border border-[#D6E4F0] text-[#0D1B2A] font-semibold py-3.5 rounded-full text-base">
                <UserCheck className="h-5 w-5" /> Patient Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
