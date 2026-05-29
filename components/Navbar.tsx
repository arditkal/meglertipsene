"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hjem", href: "/" },
  { label: "Eiendomsmegler", href: "/meglere" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Partner", href: "/partner" },
  { label: "Ofte stilte spørsmål", href: "/faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#0d1f2d] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M14 2L2 10v16h8v-8h8v8h8V10L14 2z" fill="white" fillOpacity="0.9" />
            </svg>
            meglertipsene
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="#kontakt"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md text-base font-medium transition-colors"
            >
              Få tilbud gratis
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-300 hover:text-white transition-colors text-base border-b border-white/5 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#kontakt"
              className="block mt-4 bg-blue-600 text-white text-center px-5 py-3 rounded-md text-base font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Få tilbud gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
