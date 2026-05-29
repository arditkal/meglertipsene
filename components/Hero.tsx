"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Star, RotateCcw } from "lucide-react";
import ContactModal, { type PreviewMegler } from "./ContactModal";

// — Mockup data for idle state —
const mockMeglere = [
  { initials: "KN", name: "Kari Nordmann", firma: "EiendomsMegler 1", rating: "4.9", provisjon: "1.8%", highlight: true },
  { initials: "OH", name: "Ole Hansen", firma: "DNB Eiendom", rating: "4.7", provisjon: "2.1%", highlight: false },
  { initials: "LB", name: "Lisa Berg", firma: "Privatmegleren", rating: "4.8", provisjon: "1.9%", highlight: false },
];

const MESSAGES = [
  "Sjekker området ditt...",
  "Finner aktive meglere...",
  "Beste meglere i nærområdet...",
  "Analyserer salgserfaring...",
  "Rangerer etter resultater...",
  "Salg...",
];

const TOTAL_MS = 4000;
const MSG_INTERVAL = TOTAL_MS / MESSAGES.length;

type Phase = "idle" | "loading" | "results";

export default function Hero() {
  const [inputVal, setInputVal] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");
  const [shownCount, setShownCount] = useState(0);
  const [previewMeglere, setPreviewMeglere] = useState<PreviewMegler[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Message ticker during loading
  useEffect(() => {
    if (phase !== "loading") return;

    setShownCount(1);
    let count = 1;

    const timer = setInterval(() => {
      count++;
      setShownCount(count);
      if (count >= MESSAGES.length) clearInterval(timer);
    }, MSG_INTERVAL);

    const done = setTimeout(() => setPhase("results"), TOTAL_MS);

    return () => {
      clearInterval(timer);
      clearTimeout(done);
    };
  }, [phase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputVal.trim();
    if (!q) return;

    setQuery(q);
    setShownCount(0);
    setPreviewMeglere([]);
    setPhase("loading");

    try {
      const res = await fetch(`/api/meglere?q=${encodeURIComponent(q)}&limit=3`);
      const data: PreviewMegler[] = await res.json();
      setPreviewMeglere(data);
    } catch {
      setPreviewMeglere([]);
    }
  }

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
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

        {/* ── IDLE: split layout ── */}
        {phase === "idle" && (
          <div className="flex items-center gap-14">
            {/* Left */}
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

              <h1 className="text-5xl sm:text-6xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight mb-6">
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

              <p className="text-lg sm:text-xl leading-relaxed mb-9 max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
                Sammenlign lokale eiendomsmeglere og få opptil fem tilbud direkte. Du velger selv — helt gratis.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[440px]">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
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

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-base" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span>Ingen kredittkort</span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span>763 meglere i databasen</span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <span>Svar innen 48 timer</span>
              </div>
            </div>

            {/* Right: mockup card */}
            <div className="hidden lg:block w-[370px] shrink-0">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center justify-between mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span className="text-base font-medium" style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Tilbud for din bolig
                  </span>
                  <span className="text-base">3 av 5</span>
                </div>

                <div className="space-y-2.5">
                  {mockMeglere.map((m) => (
                    <div
                      key={m.name}
                      className="rounded-xl p-4 flex items-center gap-3 justify-between"
                      style={{
                        background: m.highlight ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.03)",
                        border: m.highlight ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0"
                          style={{
                            background: m.highlight ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)",
                            color: m.highlight ? "#93c5fd" : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {m.initials}
                        </div>
                        <div>
                          <div className="text-white font-medium text-base leading-snug">{m.name}</div>
                          <div className="text-base leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>{m.firma}</div>
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
        )}

        {/* ── LOADING: progress strek + meldinger ── */}
        {phase === "loading" && (
          <div className="max-w-lg mx-auto animate-fade-in">
            {/* Area label */}
            <p className="text-base mb-10 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
              Søker etter meglere for{" "}
              <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                {query}
              </span>
            </p>

            {/* Progress strek */}
            <div
              className="h-[2px] rounded-full overflow-hidden mb-10"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full animate-progress"
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                }}
              />
            </div>

            {/* Message list */}
            <div className="space-y-4">
              {MESSAGES.slice(0, shownCount).map((msg, i) => {
                const isLatest = i === shownCount - 1;
                return (
                  <div key={i} className="flex items-center gap-3 animate-fade-up">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: isLatest ? "#60a5fa" : "rgba(255,255,255,0.2)",
                        boxShadow: isLatest ? "0 0 6px #60a5fa" : "none",
                      }}
                    />
                    <span
                      className="text-base transition-colors duration-300"
                      style={{
                        color: isLatest ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {msg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RESULTS: 3 meglere + CTA ── */}
        {phase === "results" && (
          <div className="max-w-md mx-auto animate-fade-in">
            {previewMeglere.length > 0 ? (
              <>
                <p className="text-base text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Topp meglere for{" "}
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {query}
                  </span>
                </p>

                <div className="space-y-3 mb-8">
                  {previewMeglere.map((m, i) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-4 p-4 rounded-xl animate-fade-up"
                      style={{
                        background: i === 0 ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.04)",
                        border: i === 0 ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        animationDelay: `${i * 120}ms`,
                        opacity: 0,
                        animationFillMode: "forwards",
                      }}
                    >
                      {/* Rank */}
                      <span
                        className="text-base font-bold w-5 shrink-0 text-center"
                        style={{ color: i === 0 ? "#60a5fa" : "rgba(255,255,255,0.2)" }}
                      >
                        {i + 1}
                      </span>

                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
                        style={{
                          background: i === 0 ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)",
                          color: i === 0 ? "#93c5fd" : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {m.fornavn[0]}
                      </div>

                      {/* Name + firma */}
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-lg leading-tight">
                          {m.fornavn}
                        </div>
                        <div className="text-base truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {m.firma}
                        </div>
                      </div>

                      {/* Sales count */}
                      <div className="text-right shrink-0">
                        <div className="text-white font-bold text-2xl leading-none">
                          {m.antall_annonser}
                        </div>
                        <div className="text-base" style={{ color: "rgba(255,255,255,0.3)" }}>
                          salg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 animate-fade-up"
                  style={{ animationDelay: "360ms", opacity: 0, animationFillMode: "forwards" }}
                >
                  Vil du ta kontakt med disse meglerne? Fortsett her
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => { setPhase("idle"); setInputVal(""); }}
                  className="mt-5 flex items-center justify-center gap-2 text-base mx-auto transition-colors"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >
                  <RotateCcw size={14} />
                  Nytt søk
                </button>
              </>
            ) : (
              /* No results */
              <div className="text-center py-8">
                <p className="text-white text-xl font-semibold mb-3">
                  Ingen treff for &ldquo;{query}&rdquo;
                </p>
                <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Prøv et annet område eller by — f.eks. Majorstuen, Bergen eller Stavanger.
                </p>
                <button
                  onClick={() => { setPhase("idle"); setInputVal(""); }}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl text-base transition-colors"
                >
                  <RotateCcw size={16} />
                  Søk på nytt
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        meglere={previewMeglere}
        omrade={query}
      />
    </section>
  );
}
