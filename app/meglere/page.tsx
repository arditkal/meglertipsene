import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MeglerCard from "@/components/MeglerCard";
import MeglereSearch from "@/components/MeglereSearch";
import { sokMeglere } from "@/lib/meglere";

export const metadata: Metadata = {
  title: "Finn eiendomsmegler – meglertipsene",
  description: "Søk blant 700+ eiendomsmeglere i hele Norge og finn den beste for ditt område.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function MeglerePage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const meglere = query ? sokMeglere(query) : [];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#f8fafc]" style={{ paddingTop: "64px" }}>
        {/* Search header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-base text-blue-600 font-semibold uppercase tracking-widest mb-2">
              Finn megler
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-6">
              {query
                ? `Meglere for "${query}"`
                : "Søk blant eiendomsmeglere"}
            </h1>
            <MeglereSearch defaultQuery={query} />
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {!query && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                Skriv inn et område, by eller meglernavn for å finne meglere.
              </p>
            </div>
          )}

          {query && meglere.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-[#0a1628] mb-3">
                Ingen treff for &ldquo;{query}&rdquo;
              </p>
              <p className="text-gray-500 text-lg">
                Prøv et annet område eller by, f.eks. Majorstuen, Stavanger eller Nordvik.
              </p>
            </div>
          )}

          {meglere.length > 0 && (
            <>
              <p className="text-gray-500 text-base mb-6">
                {meglere.length} megler{meglere.length !== 1 ? "e" : ""} funnet
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {meglere.map((m) => (
                  <MeglerCard key={m.id} megler={m} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
