import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#060f1a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M14 2L2 10v16h8v-8h8v8h8V10L14 2z" fill="white" fillOpacity="0.6" />
            </svg>
            <span className="text-white font-semibold text-lg">meglertipsene</span>
          </Link>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Eiendomsmeglere", href: "/meglere" },
              { label: "Om oss", href: "/om-oss" },
              { label: "Partner", href: "/partner" },
              { label: "Personvern", href: "/personvern" },
              { label: "Vilkår", href: "/vilkar" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-white/30 hover:text-white/65 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-base" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} meglertipsene.no
          </p>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.2)" }}>
            Laget i Norge
          </p>
        </div>
      </div>
    </footer>
  );
}
