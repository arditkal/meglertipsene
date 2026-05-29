"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";

const mockMeglere = [
  { initials: "KN", name: "Kari Nordmann", firma: "EiendomsMegler 1", rating: "4.9", provisjon: "1.8%", highlight: true },
  { initials: "OH", name: "Ole Hansen", firma: "DNB Eiendom", rating: "4.7", provisjon: "2.1%", highlight: false },
  { initials: "LB", name: "Lisa Berg", firma: "Privatmegleren", rating: "4.8", provisjon: "1.9%", highlight: false },
];

export default function Hero() {
  const [postnummer, setPostnummer] = useState("");
  const router = useRouter();

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: "78vh",
        paddingTop: "64px",
        background:
          "radial-gradient(ellipse at 10% 80%, rgba(37, 99, 235, 0.13) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), linear-gradient(170deg, #07111e 0%, #0c1d38 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center gap-14 w-full">
        {/* Left — text + form */}
        <div className="flex-1 min-w-0">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium mb-8"
            style={{
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#93c5fd",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#60a5fa", boxShadow: "0 0 6px #60a5fa" }}
            />
            Gratis og uforpliktende tjeneste
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight mb-6"
          >
            <span className="text-white">Finn riktig megler.</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Selg boligen smartere.
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-9 max-w-md"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Sammenlign lokale eiendomsmeglere og få opptil fem tilbud direkte.
            Du velger selv — helt gratis.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-[440px]"
            onSubmit={(e) => {
              e.preventDefault();
              const q = postnummer.trim();
              if (q) router.push(`/meglere?q=${encodeURIComponent(q)}`);
            }}
          >
            <input
              type="text"
              value={postnummer}
              onChange={(e) => setPostnummer(e.target.value)}
              placeholder="Område, by eller navn..."
              className="flex-1 text-white placeholder-white/30 rounded-xl px-5 py-3.5 text-base outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(96,165,250,0.5)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,0.12)";
                e.target.style.background = "rgba(255,255,255,0.06)";
              }}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Finn megler
              <ArrowRight size={17} />
            </button>
          </form>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-base"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span>Ingen kredittkort</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>763 meglere i databasen</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>Svar innen 48 timer</span>
          </div>
        </div>

        {/* Right — mockup card */}
        <div className="hidden lg:block w-[370px] shrink-0">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="flex items-center justify-between mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span className="text-base font-medium tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
                Tilbud for din bolig
              </span>
              <span className="text-base">3 av 5</span>
            </div>

            <div className="space-y-2.5">
              {mockMeglere.map((m) => (
                <div
                  key={m.name}
                  className="rounded-xl p-4 flex items-center gap-3 justify-between transition-all"
                  style={{
                    background: m.highlight
                      ? "rgba(37,99,235,0.1)"
                      : "rgba(255,255,255,0.03)",
                    border: m.highlight
                      ? "1px solid rgba(37,99,235,0.35)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0"
                      style={{
                        background: m.highlight
                          ? "rgba(37,99,235,0.3)"
                          : "rgba(255,255,255,0.08)",
                        color: m.highlight ? "#93c5fd" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <div className="text-white font-medium text-base leading-snug">
                        {m.name}
                      </div>
                      <div className="text-base leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {m.firma}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-white font-semibold text-base">{m.provisjon}</div>
                    <div className="flex items-center justify-end gap-1 text-base" style={{ color: "#fbbf24" }}>
                      <Star size={13} fill="#fbbf24" />
                      {m.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full rounded-xl py-3.5 flex items-center justify-center gap-2 text-base font-medium transition-all"
              style={{
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.25)",
                color: "#93c5fd",
              }}
            >
              Se alle tilbud
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
