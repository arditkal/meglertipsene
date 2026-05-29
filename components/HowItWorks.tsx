import { ClipboardList, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Oppgi boligen din",
    description:
      "Fyll inn adresse og noen detaljer om boligen. Det tar under to minutter.",
  },
  {
    icon: Users,
    number: "02",
    title: "Motta tilbud",
    description:
      "Lokale meglere sender deg sine beste tilbud innen 48 timer.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Velg og selg",
    description:
      "Sammenlign tilbud på pris, erfaring og anmeldelser. Velg fritt.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-14">
          <p className="text-blue-600 font-semibold text-base uppercase tracking-widest mb-3">
            Slik fungerer det
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight">
            Fra adresse til signert kontrakt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white p-8 sm:p-10 relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <span
                    className="text-5xl font-bold tracking-tight"
                    style={{ color: "rgba(0,0,0,0.06)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#0a1628] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 z-10">
                    <div className="w-5 h-5 bg-white border-2 border-gray-200 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
