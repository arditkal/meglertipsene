"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "For boligeiere",
    items: [
      {
        q: "Er tjenesten virkelig gratis?",
        a: "Ja, helt gratis. Du betaler ingenting for å bruke meglertipsene. Vi tjener en liten henvisningsavgift fra meglerne — men bare hvis du faktisk velger å bruke en av dem.",
      },
      {
        q: "Hvordan fungerer det?",
        a: "Du søker på område eller by, velger hvilke meglere du vil høre fra, og fyller inn kontaktinfo. Meglerne tar kontakt med deg innen 48 timer med tilbud og informasjon om hva de kan gjøre for deg.",
      },
      {
        q: "Hvor mange tilbud kan jeg få?",
        a: "Du kan motta opptil fem tilbud fra ulike meglere. Vi anbefaler å sammenligne minst tre for å få et godt bilde av markedet.",
      },
      {
        q: "Er jeg forpliktet til å bruke en av meglerne?",
        a: "Nei, du er aldri forpliktet. Du bestemmer selv om du vil gå videre med noen av meglerne etter å ha mottatt tilbudene.",
      },
      {
        q: "Hvor raskt får jeg svar?",
        a: "De fleste meglere svarer innen 24–48 timer. Gjennomsnittlig svartid i databasen vår er 48 timer.",
      },
    ],
  },
  {
    title: "Om meglerne",
    items: [
      {
        q: "Hvordan velger dere ut meglerne?",
        a: "Vi samarbeider kun med meglere som har dokumentert salgserfaring, gode kundeanmeldelser og er autorisert av Finanstilsynet. Vi sjekker jevnlig at kvaliteten opprettholdes.",
      },
      {
        q: "Kan jeg søke på en spesifikk megler?",
        a: "Ja — du kan søke på navn, firma eller område i søkefeltet vårt og finne en spesifikk megler direkte.",
      },
      {
        q: "Hva betyr provisjonsprosenten?",
        a: "Provisjonen er meglerens betaling som andel av salgssummen. En provisjon på 1,8 % på en bolig solgt for 4 000 000 kr gir megleren 72 000 kr. I tillegg kommer ofte faste gebyrer — dette vil stå tydelig i tilbudet.",
      },
      {
        q: "Kan meglere betale seg til bedre plassering?",
        a: "Nei. Rangeringen baseres på salgsresultater, antall salg i området og kundeanmeldelser — ikke betaling. Det er viktig for oss å holde listen objektiv.",
      },
    ],
  },
  {
    title: "Personvern og sikkerhet",
    items: [
      {
        q: "Hva skjer med kontaktinformasjonen min?",
        a: "Informasjonen du oppgir deles kun med de meglerne du selv velger å kontakte. Vi selger ikke data til tredjeparter.",
      },
      {
        q: "Følger dere GDPR?",
        a: "Ja. Vi behandler alle personopplysninger i samsvar med personopplysningsloven og GDPR. Du kan lese mer i vår personvernerklæring.",
      },
      {
        q: "Kan jeg slette dataene mine?",
        a: "Ja. Send en e-post til personvern@meglertipsene.no så sletter vi all informasjon knyttet til deg innen 72 timer.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-medium text-base leading-snug">{q}</span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: "rgba(255,255,255,0.35)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <p className="pb-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Faq() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ background: "#07111e" }}>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            paddingTop: "120px",
            paddingBottom: "80px",
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
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              Ofte stilte spørsmål
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              <span className="text-white">Vi svarer på</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                det du lurer på.
              </span>
            </h1>

            <p className="text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Finner du ikke svaret du ser etter? Send oss en e-post på{" "}
              <a
                href="mailto:hei@meglertipsene.no"
                className="transition-colors"
                style={{ color: "#60a5fa" }}
              >
                hei@meglertipsene.no
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-semibold text-white mb-2">{cat.title}</h2>
              <div
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {cat.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
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
              href="/"
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
