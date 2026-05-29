"use client";

import { useState } from "react";
import { Lock, Phone } from "lucide-react";

export default function UnlockSection({
  token,
  price,
}: {
  token: string;
  price: number;
}) {
  const [showContact, setShowContact] = useState(false);

  const shortCode = token.slice(0, 8).toUpperCase();

  return (
    <div className="space-y-4">
      {/* Blurred contact info preview */}
      <div className="rounded-2xl p-5 space-y-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
        <p className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Selgerens kontaktinfo
        </p>
        {["Fullt navn", "Mobilnummer", "E-postadresse", "Boligens adresse"].map((label) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-base text-gray-400 w-36 shrink-0">{label}</span>
            <div
              className="h-5 rounded-md flex-1 max-w-[180px]"
              style={{
                background: "linear-gradient(90deg, #e2e8f0, #f1f5f9, #e2e8f0)",
                filter: "blur(3px)",
              }}
            />
          </div>
        ))}
      </div>

      {!showContact ? (
        <>
          <button
            onClick={() => setShowContact(true)}
            className="w-full flex items-center justify-center gap-3 text-white font-semibold text-lg py-4 rounded-2xl transition-all"
            style={{
              background: "linear-gradient(135deg, #FF5B24, #E5450F)",
              boxShadow: "0 4px 24px rgba(255,91,36,0.35)",
            }}
          >
            <Lock size={18} />
            Lås opp med Vipps · {price} kr
          </button>
          <p className="text-center text-base text-gray-400">
            Engangsbetaling · Umiddelbar tilgang
          </p>
        </>
      ) : (
        <div
          className="rounded-2xl p-5 space-y-4"
          style={{ background: "#fff7f5", border: "1px solid #ffd5c8" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#FF5B24" }}
            >
              <Phone size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#0a1628]">Betal via Vipps</p>
              <p className="text-base text-gray-500">Vi aktiverer lenken din manuelt innen 1 time</p>
            </div>
          </div>

          <div className="rounded-xl p-4 space-y-2" style={{ background: "white", border: "1px solid #ffe0d6" }}>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Send til Vipps-nummer</span>
              <span className="font-bold text-[#0a1628] text-lg">—</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Beløp</span>
              <span className="font-bold text-[#0a1628]">{price} kr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Melding</span>
              <span className="font-mono font-bold text-blue-700 text-lg tracking-widest">{shortCode}</span>
            </div>
          </div>

          <p className="text-base text-gray-500 text-center">
            Etter betaling sender du koden <span className="font-mono font-bold text-[#0a1628]">{shortCode}</span> til oss,
            så aktiverer vi leaden for deg.
          </p>

          <button
            onClick={() => setShowContact(false)}
            className="w-full py-2.5 rounded-xl text-base text-gray-500 hover:text-gray-700 border border-gray-200 transition-colors"
          >
            Avbryt
          </button>
        </div>
      )}
    </div>
  );
}
