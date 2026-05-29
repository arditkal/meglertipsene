"use client";

import { useEffect, useState, useCallback } from "react";
import { LogOut, RefreshCw, ChevronDown } from "lucide-react";
import type { Lead } from "@/lib/supabase";

type Filter = "alle" | "ny" | "sendt" | "betalt";

const STATUS_LABEL: Record<string, string> = {
  ny: "Ny",
  sendt: "Sendt",
  betalt: "Betalt",
};

const STATUS_COLOR: Record<string, string> = {
  ny: "#2563eb",
  sendt: "#d97706",
  betalt: "#16a34a",
};

const STATUS_BG: Record<string, string> = {
  ny: "#eff6ff",
  sendt: "#fffbeb",
  betalt: "#f0fdf4",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Filter>("alle");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchLeads = useCallback(async (f: Filter = filter) => {
    setLoading(true);
    const res = await fetch(`/api/leads?status=${f}`);
    if (res.status === 401) { setAuthed(false); setLoading(false); return; }
    const data = await res.json();
    setLeads(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    // Check if already authed by hitting the leads endpoint
    fetch("/api/leads?status=alle").then((r) => {
      if (r.ok) { setAuthed(true); r.json().then((d) => setLeads(d)); }
      else setAuthed(false);
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchLeads("alle");
    } else {
      setAuthError("Feil passord");
    }
    setAuthLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    setAuthed(false);
    setLeads([]);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: status as Lead["status"] } : l))
    );
  }

  // ── Login screen ──
  if (authed === false) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f8fafc" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#0a1628] mb-2">Admin</h1>
          <p className="text-gray-500 text-base mb-6">Logg inn for å se leads.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-base">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 text-white font-semibold py-3 rounded-xl text-base transition-colors"
            >
              {authLoading ? "Logger inn..." : "Logg inn"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (authed === null) return null;

  const counts = leads.reduce(
    (acc, l) => { acc[l.status] = (acc[l.status] ?? 0) + 1; return acc; },
    {} as Record<string, number>
  );

  // ── Main panel ──
  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-[#0a1628]">meglertipsene</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-base">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLeads()}
              className="flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors"
            >
              <RefreshCw size={15} />
              Oppdater
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-base text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={15} />
              Logg ut
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["alle", "ny", "sendt", "betalt"] as Filter[]).map((s) => {
            const count = s === "alle" ? leads.length : (counts[s] ?? 0);
            return (
              <button
                key={s}
                onClick={() => { setFilter(s); fetchLeads(s); }}
                className="bg-white rounded-2xl p-5 text-left border transition-all"
                style={{
                  borderColor: filter === s ? "#2563eb" : "#f1f5f9",
                  boxShadow: filter === s ? "0 0 0 2px #dbeafe" : "none",
                }}
              >
                <p className="text-3xl font-bold text-[#0a1628]">{count}</p>
                <p className="text-base text-gray-500 capitalize mt-1">
                  {s === "alle" ? "Totalt" : STATUS_LABEL[s]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Leads list */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center py-12 text-gray-400 text-base">Laster...</div>
          )}
          {!loading && leads.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-base">
              Ingen leads enda.
            </div>
          )}
          {!loading && leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Summary row */}
              <button
                className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                {/* Status badge */}
                <span
                  className="text-base font-semibold px-3 py-1 rounded-full shrink-0"
                  style={{
                    color: STATUS_COLOR[lead.status],
                    background: STATUS_BG[lead.status],
                  }}
                >
                  {STATUS_LABEL[lead.status] ?? lead.status}
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0a1628] truncate">
                    {lead.navn || "–"} — {lead.omrade || "Ukjent område"}
                  </p>
                  <p className="text-base text-gray-400 truncate">
                    {lead.adresse} · {lead.boligtype} · {lead.stoerrelse} m²
                  </p>
                </div>

                {/* Date */}
                <span className="text-base text-gray-400 shrink-0 hidden sm:block">
                  {new Date(lead.created_at).toLocaleDateString("nb-NO", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <ChevronDown
                  size={18}
                  className="text-gray-300 shrink-0 transition-transform"
                  style={{ transform: expanded === lead.id ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>

              {/* Expanded detail */}
              {expanded === lead.id && (
                <div
                  className="px-6 pb-6 pt-2 border-t border-gray-50"
                  style={{ background: "#fafbfc" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Selger
                      </h4>
                      <dl className="space-y-2">
                        <Row label="Navn" value={lead.navn} />
                        <Row label="Telefon" value={lead.telefon} />
                        <Row label="E-post" value={lead.epost} />
                      </dl>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Bolig
                      </h4>
                      <dl className="space-y-2">
                        <Row label="Adresse" value={lead.adresse} />
                        <Row label="Område" value={lead.omrade} />
                        <Row label="Type" value={lead.boligtype} />
                        <Row label="Størrelse" value={lead.stoerrelse ? `${lead.stoerrelse} m²` : ""} />
                        <Row label="Antall rom" value={lead.antall_rom} />
                        <Row label="Estimert pris" value={lead.estimert_pris ? `${lead.estimert_pris} kr` : ""} />
                        {lead.kommentar && <Row label="Kommentar" value={lead.kommentar} />}
                      </dl>
                    </div>
                  </div>

                  {/* Matched meglere */}
                  {lead.megler_navn?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Matchede meglere
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lead.megler_navn.map((m, i) => (
                          <span
                            key={i}
                            className="text-base px-3 py-1 rounded-full font-medium"
                            style={{ background: "#f0f4ff", color: "#1d4ed8" }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status change */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <span className="text-base text-gray-500">Endre status:</span>
                    {(["ny", "sendt", "betalt"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(lead.id, s)}
                        className="text-base px-4 py-2 rounded-xl font-medium border transition-all"
                        style={{
                          background: lead.status === s ? STATUS_BG[s] : "white",
                          color: lead.status === s ? STATUS_COLOR[s] : "#64748b",
                          borderColor: lead.status === s ? STATUS_COLOR[s] + "44" : "#e2e8f0",
                          fontWeight: lead.status === s ? 700 : 500,
                        }}
                      >
                        {STATUS_LABEL[s]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <dt className="text-base text-gray-400 shrink-0 w-28">{label}</dt>
      <dd className="text-base text-[#0a1628] font-medium">{value}</dd>
    </div>
  );
}
