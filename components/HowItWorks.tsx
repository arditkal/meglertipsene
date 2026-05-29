import { ClipboardList, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Fyll ut skjemaet",
    description:
      "Oppgi adressen på boligen du ønsker å selge. Det tar kun to minutter og er helt gratis.",
  },
  {
    icon: Users,
    step: "02",
    title: "Motta tilbud fra meglere",
    description:
      "Vi kobler deg med lokale eiendomsmeglere som sender deg sine beste tilbud direkte.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Velg den beste megleren",
    description:
      "Sammenlign tilbudene og velg megleren som passer deg best. Helt uforpliktende.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
            Hvordan fungerer det?
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
            Tre enkle steg for å finne den rette eiendomsmegleren for deg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6">
                  <Icon size={26} className="text-blue-600" />
                </div>
                <div className="text-blue-600 text-base font-semibold uppercase tracking-widest mb-2">
                  Steg {step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#0d1f2d] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
