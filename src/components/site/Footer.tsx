import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Globe, Mail, MapPin, Phone, ShieldCheck, Stethoscope, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E0EAF4]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-[200px_1fr_1fr_1fr_200px] gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-10 w-10 rounded-xl bg-[#EEF4FB] border border-[#D6E4F0] flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-[#1B6CA8]" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-extrabold text-[14px] text-[#0D1B2A]">Pediatric</p>
                <p className="font-display font-extrabold text-[14px] text-[#1B6CA8]">Urgent Care™</p>
              </div>
            </div>
            <p className="text-[12px] text-[#4A6580] mb-4 leading-relaxed">
              Here When Kids Need Us Most
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, Youtube, Globe].map((Icon, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded-full border border-[#D6E4F0] flex items-center justify-center text-[#4A6580] hover:border-[#1B6CA8] hover:text-[#1B6CA8] transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterCol title="Quick Links" links={[
            { label: "Services",     to: "/services"   },
            { label: "Locations",    to: "/locations"  },
            { label: "Telemedicine", to: "/services"   },
            { label: "For Parents",  to: "/parent/dashboard" },
            { label: "Resources",    to: "/blog"       },
            { label: "About Us",     to: "/about"      },
          ]} />

          {/* For Parents */}
          <FooterCol title="For Parents" links={[
            { label: "Parent Portal",       to: "/parent/dashboard" },
            { label: "AI Symptom Checker",  to: "/symptom-checker"  },
            { label: "Vaccination Info",    to: "/services"         },
            { label: "Forms & Documents",   to: "/parent/documents" },
            { label: "Insurance & Billing", to: "/services"         },
            { label: "FAQ",                 to: "/"                 },
          ]} />

          {/* Support */}
          <FooterCol title="Support" links={[
            { label: "Contact Us",    to: "/contact" },
            { label: "Careers",       to: "/about"   },
            { label: "Privacy Policy",to: "/privacy" },
            { label: "Terms of Use",  to: "/terms"   },
            { label: "Accessibility", to: "/about"   },
          ]} />

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0D1B2A] mb-4">Contact</p>
            <div className="space-y-3.5">
              <a href="tel:18335427227" className="flex items-start gap-3 group">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] border border-[#D6E4F0] group-hover:bg-[#1B6CA8] group-hover:border-[#1B6CA8] transition-colors">
                  <Phone className="h-3.5 w-3.5 text-[#1B6CA8] group-hover:text-white transition-colors" />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#0D1B2A] leading-tight">1 (833) 4-KIDS-CARE</p>
                  <p className="text-[12px] text-[#4A6580]">(543-7227)</p>
                </div>
              </a>
              <a href="mailto:info@pediatricurgentcare.ca" className="flex items-start gap-3 group">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] border border-[#D6E4F0] group-hover:bg-[#1B6CA8] group-hover:border-[#1B6CA8] transition-colors">
                  <Mail className="h-3.5 w-3.5 text-[#1B6CA8] group-hover:text-white transition-colors" />
                </span>
                <p className="text-[12px] text-[#4A6580] leading-snug">info@pediatricurgentcare.ca</p>
              </a>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] border border-[#D6E4F0]">
                  <MapPin className="h-3.5 w-3.5 text-[#1B6CA8]" />
                </span>
                <p className="text-[12px] text-[#4A6580] leading-snug">Serving Southern Ontario<br />7 AM – 10 PM, 7 days a week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E0EAF4] bg-[#F7FAFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#4A6580]">© 2024 Pediatric Urgent Care™. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-[#4A6580]">
            <Link to="/privacy" className="hover:text-[#1B6CA8] transition-colors">Privacy Policy</Link>
            <span className="text-[#D6E4F0]">·</span>
            <Link to="/terms" className="hover:text-[#1B6CA8] transition-colors">Terms of Service</Link>
            <span className="text-[#D6E4F0]">·</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />PHIPA Compliant</span>
            <span className="text-[#D6E4F0]">·</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#2ECC8B]" />PIPEDA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0D1B2A] mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-[13px] text-[#4A6580] hover:text-[#1B6CA8] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
