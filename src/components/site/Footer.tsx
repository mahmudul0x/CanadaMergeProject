import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Clock, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white">
      <div className="container-page py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
            Ontario's trusted pediatric home visit service.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="text-white hover:text-[#2ECC8B] transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          title="Company"
          links={[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/providers", label: "Our NPs" },
            { to: "/services", label: "Services" },
            { to: "/locations", label: "Locations" },
            { to: "/contact", label: "Careers" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            { to: "/services", label: "Sick Visits" },
            { to: "/services", label: "Vaccinations" },
            { to: "/services", label: "Follow-up Care" },
            { to: "/services", label: "Well-child Checkups" },
            { to: "/services", label: "Telemedicine" },
            { to: "/services", label: "Developmental Assessment" },
          ]}
        />
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#2ECC8B]">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2.5"><Phone className="h-4 w-4 mt-0.5 text-[#2ECC8B]" /><span>(905) 123-4567</span></li>
            <li className="flex items-start gap-2.5"><Mail className="h-4 w-4 mt-0.5 text-[#2ECC8B]" /><span>hello@pediatricurgentcare.ca</span></li>
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-[#2ECC8B]" /><span>Serving all of Southern Ontario</span></li>
            <li className="flex items-start gap-2.5"><Clock className="h-4 w-4 mt-0.5 text-[#2ECC8B]" /><span>Mon–Sun: 7am – 10pm</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2025 Pediatric Urgent Care™. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span className="text-white/30">·</span>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1">PHIPA Compliant <span className="text-maple">🍁</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#2ECC8B]">
        {title}
      </h4>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-white/80 hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}