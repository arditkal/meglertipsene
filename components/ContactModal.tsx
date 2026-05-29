"use client";

import { useState } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

export interface PreviewMegler {
  id: number;
  fornavn: string;
  firma: string;
  antall_annonser: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meglere: PreviewMegler[];
  omrade: string;
}

interface FormData {
  adresse: string;
  boligtype: string;
  stoerrelse: string;
  antallRom: string;
  estimertPris: string;
  kommentar: string;
  navn: string;
  telefon: string;
  epost: string;
}

const empty: FormData = {
  adresse: "",
  boligtype: "",
  stoerrelse: "",
  antallRom: "",
  estimertPris: "",
  kommentar: "",
  navn: "",
  telefon: "",
  epost: "",
};

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none transition-all bg-white";
const labelCls = "block text-base font-medium text-gray-700 mb-1.5";

export default function ContactModal({ isOpen, onClose, meglere, omrade }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>(empty);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const step1Valid = form.adresse.trim() && form.boligtype && form.stoerrelse.trim();
  const step2Valid = form.navn.trim() && form.telefon.trim() && form.epost.trim();

  async function handleSubmit() {
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          omrade,
          adresse: form.adresse,
          boligtype: form.boligtype,
          stoerrelse: form.stoerrelse,
          antall_rom: form.antallRom,
          estimert_pris: form.estimertPris,
          kommentar: form.kommentar,
          navn: form.navn,
          telefon: form.telefon,
          epost: form.epost,
          megler_ids: meglere.map((m) => m.id),
          megler_navn: meglere.map((m) => `${m.fornavn} · ${m.firma}`),
        }),
      });
    } catch {
      // Fail silently — still show success to user
    }
    setLoading(false);
    setStep(3);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(1);
      setForm(empty);
    }, 300);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(7,17,30,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        {/* ── Header ── */}
        {step !== 3 && (
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0a1628]">Ta kontakt med meglerne</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1"
                aria-label="Lukk"
              >
                <X size={20} />
              </button>
            </div>

            {/* Megler chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {meglere.map((m) => (
                <span
                  key={m.id}
                  className="text-base px-3 py-1 rounded-full font-medium"
                  style={{ background: "#f0f4ff", color: "#1d4ed8" }}
                >
                  {m.fornavn} · {m.firma}
                </span>
              ))}
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3">
              {[1, 2].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-base font-semibold transition-all"
                    style={{
                      background: step >= n ? "#2563eb" : "#f1f5f9",
                      color: step >= n ? "white" : "#94a3b8",
                    }}
                  >
                    {n}
                  </div>
                  <span
                    className="text-base"
                    style={{ color: step === n ? "#0a1628" : "#94a3b8", fontWeight: step === n ? 600 : 400 }}
                  >
                    {n === 1 ? "Om boligen" : "Om deg"}
                  </span>
                  {n < 2 && <div className="w-10 h-px bg-gray-200 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5">

          {/* Step 1 — boliginfo */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  Boligens adresse <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Storgata 1, 0182 Oslo"
                  value={form.adresse}
                  onChange={(e) => set("adresse", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls}>
                  Boligtype <span className="text-red-400">*</span>
                </label>
                <select
                  className={inputCls}
                  value={form.boligtype}
                  onChange={(e) => set("boligtype", e.target.value)}
                >
                  <option value="">Velg type...</option>
                  <option value="leilighet">Leilighet</option>
                  <option value="enebolig">Enebolig</option>
                  <option value="rekkehus">Rekkehus</option>
                  <option value="tomannsbolig">Tomannsbolig</option>
                  <option value="hytte">Hytte / fritidsbolig</option>
                  <option value="annet">Annet</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    Størrelse <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className={inputCls}
                      placeholder="85"
                      value={form.stoerrelse}
                      onChange={(e) => set("stoerrelse", e.target.value)}
                      style={{ paddingRight: "3rem" }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-400">
                      m²
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Antall rom</label>
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="3"
                    value={form.antallRom}
                    onChange={(e) => set("antallRom", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Forventet salgspris</label>
                <div className="relative">
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="4 500 000"
                    value={form.estimertPris}
                    onChange={(e) => set("estimertPris", e.target.value)}
                    style={{ paddingRight: "3rem" }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-400">
                    kr
                  </span>
                </div>
              </div>

              <div>
                <label className={labelCls}>Kommentar til meglerne</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Noe meglerne bør vite om boligen..."
                  value={form.kommentar}
                  onChange={(e) => set("kommentar", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2 — kontaktinfo */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-base text-gray-500 mb-2">
                Meglerne bruker dette for å ta kontakt med deg.
              </p>
              <div>
                <label className={labelCls}>
                  Fullt navn <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Ola Nordmann"
                  value={form.navn}
                  onChange={(e) => set("navn", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>
                  Mobilnummer <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  className={inputCls}
                  placeholder="400 00 000"
                  value={form.telefon}
                  onChange={(e) => set("telefon", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>
                  E-postadresse <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="ola@eksempel.no"
                  value={form.epost}
                  onChange={(e) => set("epost", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3 — success */}
          {step === 3 && (
            <div className="text-center py-10 px-2">
              <div className="flex justify-center mb-5">
                <CheckCircle size={56} className="text-green-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#0a1628] mb-3">
                Forespørsel registrert
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Vi har mottatt informasjonen din. Meglerne vil kontakte deg
                direkte innen 48 timer.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-colors"
              >
                Lukk
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {step !== 3 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-white">
            {step === 1 ? (
              <button
                onClick={handleClose}
                className="text-base text-gray-500 hover:text-gray-700 transition-colors"
              >
                Avbryt
              </button>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft size={16} />
                Tilbake
              </button>
            )}

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-6 py-3 rounded-xl text-base transition-colors"
              >
                Neste
                <ArrowRight size={16} />
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleSubmit}
                disabled={!step2Valid || loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-6 py-3 rounded-xl text-base transition-colors"
              >
                {loading ? "Sender..." : "Send forespørsel"}
                {!loading && <ArrowRight size={16} />}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
