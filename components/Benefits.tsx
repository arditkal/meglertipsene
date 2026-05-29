import { Shield, BarChart2, Clock, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Helt gratis og uforpliktende",
    description:
      "Det koster deg ingenting å sammenligne meglere. Du bestemmer selv om du vil gå videre etter å ha mottatt tilbudene.",
  },
  {
    icon: BarChart2,
    title: "Sammenlign flere meglere",
    description:
      "Få tilbud fra opptil fem lokale meglere og velg det beste alternativet basert på pris, erfaring og anmeldelser.",
  },
  {
    icon: Clock,
    title: "Spar tid og penger",
    description:
      "Vi gjør jobben for deg. Slipp å kontakte meglere enkeltvis og forhandle om provisjon på egenhånd.",
  },
  {
    icon: MapPin,
    title: "Lokale eksperter",
    description:
      "Vi kobler deg med meglere som kjenner ditt nærområde godt og har dokumenterte resultater i markedet.",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
            Hvorfor velge oss?
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
            Vi gjør boligsalget enklere og mer lønnsomt for deg.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex gap-5 p-7 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mt-0.5">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0d1f2d] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
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
