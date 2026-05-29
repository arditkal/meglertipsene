"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

export default function UnlockSection({
  token,
  price,
}: {
  token: string;
  price: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUnlock() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Noe gikk galt");
        setLoading(false);
      }
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Blurred contact info preview */}
      <div
        className="rounded-2xl p-5 space-y-3"
        style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
      >
        <p className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Selgerens kontaktinfo
        </p>
        {["Fullt navn", "Mobilnummer", "E-postadresse", "Boligens adresse"].map((label) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-base text-gray-400 w-36 shrink-0">{label}</span>
            <div
              className="h-5 rounded-md flex-1 max-w-[180px]"
              style={{
                background: "linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%)",
                filter: "blur(3px)",
              }}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-base">{error}</p>}

      <button
        onClick={handleUnlock}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 text-white font-semibold text-lg py-4 rounded-2xl transition-all"
        style={{
          background: loading ? "#94a3b8" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
          boxShadow: loading ? "none" : "0 4px 24px rgba(37,99,235,0.35)",
        }}
      >
        <Lock size={18} />
        {loading ? "Videresender til betaling..." : `Lås opp for ${price} kr`}
        {!loading && <ArrowRight size={18} />}
      </button>

      <p className="text-center text-base text-gray-400">
        Sikker betaling via Stripe · Engangsbetaling
      </p>
    </div>
  );
}
