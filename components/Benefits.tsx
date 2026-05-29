import { Shield, BarChart2, Clock, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Helt gratis og uforpliktende",
    description:
      "Det koster deg ingenting å sammenligne meglere. Ingen skjulte gebyrer.",
  },
  {
    icon: BarChart2,
    title: "Opptil fem tilbud",
    description:
      "Få tilbud fra flere lokale meglere og forhandle fra en sterk posisjon.",
  },
  {
    icon: Clock,
    title: "Spar tid og penger",
    description:
      "Vi gjør jobben for deg — slipp å ringe meglere og forhandle selv.",
  },
  {
    icon: MapPin,
    title: "Lokale eksperter",
    description:
      "Kun meglere med dokumenterte resultater i ditt nærmarked.",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-14">
          <p className="text-blue-600 font-semibold text-base uppercase tracking-widest mb-3">
            Fordeler
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight">
            Designet for boligselgere
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group flex gap-5 p-7 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/40 transition-all cursor-default"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-gray-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center transition-colors mt-0.5">
                  <Icon size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
