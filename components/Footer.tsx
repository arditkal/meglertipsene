import Link from "next/link";

const footerLinks = {
  Sider: [
    { label: "Hjem", href: "/" },
    { label: "Eiendomsmeglere", href: "/meglere" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Partner", href: "/partner" },
    { label: "Ofte stilte spørsmål", href: "/faq" },
  ],
  Juridisk: [
    { label: "Personvern", href: "/personvern" },
    { label: "Vilkår for bruk", href: "/vilkar" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#07121c] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 2L2 10v16h8v-8h8v8h8V10L14 2z" fill="white" fillOpacity="0.7" />
              </svg>
              <span className="text-white font-semibold text-lg">meglertipsene</span>
            </Link>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
              Vi hjelper deg med å finne den beste eiendomsmegleren i ditt nærområde. Gratis og uforpliktende tjeneste for boligselgere i Norge.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium text-base mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-300 transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-base">
            &copy; {new Date().getFullYear()} meglertipsene.no. Alle rettigheter forbeholdt.
          </p>
          <p className="text-gray-600 text-base">
            Laget i Norge
          </p>
        </div>
      </div>
    </footer>
  );
}
