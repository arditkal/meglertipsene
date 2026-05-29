import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        minHeight: "calc(100vh - 64px)",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&w=1920&q=80')",
        backgroundColor: "#1a2e44",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-16">
        <div className="bg-black/45 backdrop-blur-[2px] rounded-2xl px-8 py-10 sm:px-12 sm:py-14 border border-white/10">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-5">
            Selge bolig? Få tilbud fra flere eiendomsmeglere
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl mb-9 leading-relaxed">
            Sammenlign de beste eiendomsmeglerne nær deg, helt gratis og uforpliktende
          </p>
          <Link
            href="#kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-9 py-4 rounded-lg text-lg transition-colors shadow-lg shadow-blue-900/30"
          >
            Få flere tilbud
          </Link>
        </div>
      </div>
    </section>
  );
}
