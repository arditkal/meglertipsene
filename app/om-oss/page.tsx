import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Shield, TrendingUp, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Om oss – meglertipsene",
  description:
    "Vi hjelper boligeiere i Norge med å finne den beste eiendomsmegleren. Les om vår historie, våre verdier og hva som driver oss.",
};

const values = [
  {
    icon: Shield,
    title: "Åpenhet",
    desc: "Vi tjener penger når du er fornøyd — ikke ved å selge deg til høystbydende megler. Ingen skjulte agendaer.",
  },
  {
    icon: Users,
    title: "For boligeieren",
    desc: "Tjenesten er alltid gratis for deg som selger. Vi tror alle fortjener tilgang til god rådgivning.",
  },
  {
    icon: TrendingUp,
    title: "Kvalitet fremfor kvantitet",
    desc: "Vi samarbeider kun med meglere som har dokumenterte resultater og fornøyde kunder.",
  },
  {
    icon: Heart,
    title: "Laget i Norge",
    desc: "Vi kjenner det norske boligmarkedet fra innsiden og bygger for norske boligeiere.",
  },
];

const team = [
  { initials: "AK", name: "Ardit Kallaba", role: "Gründer & daglig leder" },
  { initials: "ML", name: "Magnus Laukas", role: "Gründer & megleransvarlig" },
];

const stats = [
  { value: "763+", label: "Meglere i databasen" },
  { value: "12 000+", label: "Boligeiere hjulpet" },
  { value: "4.8", label: "Snittvurdering fra brukere" },
  { value: "48t", label: "Gjennomsnittlig svartid" },
];

export default function OmOss() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: "#07111e" }}>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            paddingTop: "120px",
            paddingBottom: "96px",
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(37,99,235,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(99,102,241,0.07) 0%, transparent 50%), linear-gradient(170deg, #07111e 0%, #0c1d38 100%)",
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
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
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
              Laget i Norge, for Norge
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="text-white">Vi gjør det enklere</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                å selge boligen din.
              </span>
            </h1>

            <p
              className="text-xl leading-relaxed max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              meglertipsene ble startet fordi vi mener boligeiere fortjener et enkelt og ærlig verktøy for å finne riktig megler — uten stress, uten skjulte kostnader.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-white mb-6">Historien vår</h2>
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            <p>
              meglertipsene ble grunnlagt med én tanke i bakhodet: boligsalg er en av de største økonomiske beslutningene folk tar, men prosessen med å velge riktig megler har lenge vært uoversiktlig og tidkrevende.
            </p>
            <p>
              Vi bygde en plattform der boligeiere raskt kan sammenligne lokale meglere basert på erfaring, salgsresultater og pris — og få flere tilbud direkte. Alt gratis og uforpliktende.
            </p>
            <p>
              I dag har vi over 763 meglere i databasen og har hjulpet tusenvis av nordmenn med å ta en smartere beslutning. Vi er stolte av hvert eneste salg som har gått bedre takket være oss.
            </p>
          </div>
        </section>

        {/* Values */}
        <section
          style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Våre verdier</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl p-7"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)" }}>{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Teamet bak</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl p-7 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-5"
                  style={{
                    background: "rgba(37,99,235,0.2)",
                    color: "#93c5fd",
                  }}
                >
                  {person.initials}
                </div>
                <div className="text-white font-semibold text-lg">{person.name}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {person.role}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Klar til å finne din megler?</h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
              Det tar under ett minutt, og det koster ingenting.
            </p>
            <a
              href="/#kontakt"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Kom i gang gratis
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
