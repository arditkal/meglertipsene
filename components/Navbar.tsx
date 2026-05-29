"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Eiendomsmegler", href: "/meglere" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Partner", href: "/partner" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(7, 17, 30, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-lg text-white tracking-tight"
          >
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M14 2L2 10v16h8v-8h8v8h8V10L14 2z" fill="white" fillOpacity="0.9" />
            </svg>
            meglertipsene
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/55 hover:text-white transition-colors text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/innlogging"
              className="text-white/60 hover:text-white transition-colors text-base px-3"
            >
              Logg inn
            </Link>
            <Link
              href="#kontakt"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-base font-medium transition-colors"
            >
              Kom i gang
            </Link>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(7, 17, 30, 0.96)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-white/60 hover:text-white transition-colors text-base border-b border-white/5 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/innlogging"
                className="text-center py-3 text-white/60 hover:text-white text-base border border-white/10 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Logg inn
              </Link>
              <Link
                href="#kontakt"
                className="text-center bg-blue-600 text-white py-3 rounded-lg text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Kom i gang
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
