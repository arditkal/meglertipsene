"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function MeglereSearch({ defaultQuery }: { defaultQuery: string }) {
  const [query, setQuery] = useState(defaultQuery);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    startTransition(() => {
      router.push(`/meglere?q=${encodeURIComponent(q)}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-xl">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk på område, by eller meglernavn..."
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none text-base text-[#0a1628] placeholder-gray-400 bg-white transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-colors whitespace-nowrap"
      >
        {isPending ? "Søker..." : "Søk"}
      </button>
    </form>
  );
}
