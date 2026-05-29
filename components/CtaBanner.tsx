import Link from "next/link";

export default function CtaBanner() {
  return (
    <section id="kontakt" className="py-24 bg-[#0d1f2d]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
          Klar til å selge boligen din?
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl mb-10 leading-relaxed">
          Fyll ut skjemaet og motta tilbud fra de beste meglerne i ditt område. Helt gratis og uforpliktende.
        </p>
        <Link
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors shadow-lg shadow-blue-900/40"
        >
          Kom i gang gratis
        </Link>
        <p className="text-gray-500 text-base mt-5">
          Gratis og uforpliktende. Ingen kredittkort kreves.
        </p>
      </div>
    </section>
  );
}
