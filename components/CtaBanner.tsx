import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section
      id="kontakt"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), linear-gradient(170deg, #07111e 0%, #0c1d38 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-base font-semibold uppercase tracking-widest mb-4"
          style={{ color: "#93c5fd" }}
        >
          Klar til å starte?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
          Finn din megler i dag.
          <br />
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Det tar to minutter.</span>
        </h2>
        <p
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Fyll inn boligens adresse og motta tilbud fra de beste meglerne i ditt område.
        </p>
        <Link
          href="#"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Kom i gang gratis
          <ArrowRight size={19} />
        </Link>
        <p className="text-base mt-5" style={{ color: "rgba(255,255,255,0.25)" }}>
          Ingen kredittkort. Ingen forpliktelser.
        </p>
      </div>
    </section>
  );
}
