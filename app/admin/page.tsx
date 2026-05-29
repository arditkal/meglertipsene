"use client";

import { useEffect, useState, useCallback } from "react";
import { LogOut, RefreshCw, ChevronDown, Link2, Copy, Check, Plus } from "lucide-react";
import type { Lead, LeadLink } from "@/lib/db";

type Filter = "alle" | "ny" | "sendt" | "betalt";

const STATUS_LABEL: Record<string, string> = { ny: "Ny", sendt: "Sendt", betalt: "Betalt" };
const STATUS_COLOR: Record<string, string> = { ny: "#2563eb", sendt: "#d97706", betalt: "#16a34a" };
const STATUS_BG: Record<string, string> = { ny: "#eff6ff", sendt: "#fffbeb", betalt: "#f0fdf4" };

const LINK_STATUS_LABEL: Record<string, string> = { pending: "Venter", paid: "Betalt", expired: "Utløpt" };
const LINK_STATUS_COLOR: Record<string, string> = { pending: "#d97706", paid: "#16a34a", expired: "#94a3b8" };
const LINK_STATUS_BG: Record<string, string> = { pending: "#fffbeb", paid: "#f0fdf4", expired: "#f8fafc" };

type LeadLinkWithMeta = LeadLink & { opened_at?: string | null };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Filter>("alle");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // links per lead_id
  const [linkMap, setLinkMap] = useState<Record<string, LeadLinkWithMeta[]>>({});
  const [linkLoading, setLinkLoading] = useState<Record<string, boolean>>({});
  const [linkError, setLinkError] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const fetchLeads = useCallback(async (f: Filter = filter) => {
    setLoading(true);
    const res = await fetch(`/api/leads?status=${f}`);
    if (res.status === 401) { setAuthed(false); setLoading(false); return; }
    const data = await res.json();
    setLeads(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filter]);

  const fetchLinks = useCallback(async (lead_id: string) => {
    const res = await fetch(`/api/lead-links?lead_id=${lead_id}`);
    if (res.ok) {
      const data = await res.json();
      setLinkMap((prev) => ({ ...prev, [lead_id]: data }));
    }
  }, []);

  useEffect(() => {
    fetch("/api/leads?status=alle").then((r) => {
      if (r.ok) { setAuthed(true); r.json().then((d) => setLeads(d)); }
      else setAuthed(false);
    });
  }, []);

  async function handleExpand(lead_id: string) {
    const next = expanded === lead_id ? null : lead_id;
    setExpanded(next);
    if (next && !linkMap[next]) fetchLinks(next);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); fetchLeads("alle"); }
    else setAuthError("Feil passord");
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
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Lead["status"] } : l)));
  }

  async function generateLink(lead: Lead, megler_id: number, megler_navn: string) {
    const key = `${lead.id}-${megler_id}`;
    setLinkLoading((p) => ({ ...p, [key]: true }));
    setLinkError((p) => ({ ...p, [key]: "" }));
    try {
      const res = await fetch("/api/lead-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: lead.id, megler_id, megler_navn }),
      });
      if (res.ok) {
        await fetchLinks(lead.id);
      } else {
        const data = await res.json();
        setLinkError((p) => ({ ...p, [key]: data.error ?? "Feil ved generering" }));
      }
    } catch {
      setLinkError((p) => ({ ...p, [key]: "Nettverksfeil" }));
    }
    setLinkLoading((p) => ({ ...p, [key]: false }));
  }

  async function copyLink(token: string) {
    const url = `${window.location.origin}/megler/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  }

  // ── Login ──
  if (authed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
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
            {authError && <p className="text-red-500 text-base">{authError}</p>}
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

  const counts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);

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
            <button onClick={() => fetchLeads()} className="flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 transition-colors">
              <RefreshCw size={15} /> Oppdater
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-base text-gray-500 hover:text-red-500 transition-colors">
              <LogOut size={15} /> Logg ut
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["alle", "ny", "sendt", "betalt"] as Filter[]).map((s) => {
            const count = s === "alle" ? leads.length : (counts[s] ?? 0);
            return (
              <button
                key={s}
                onClick={() => { setFilter(s); fetchLeads(s); }}
                className="bg-white rounded-2xl p-5 text-left border transition-all"
                style={{ borderColor: filter === s ? "#2563eb" : "#f1f5f9", boxShadow: filter === s ? "0 0 0 2px #dbeafe" : "none" }}
              >
                <p className="text-3xl font-bold text-[#0a1628]">{count}</p>
                <p className="text-base text-gray-500 capitalize mt-1">{s === "alle" ? "Totalt" : STATUS_LABEL[s]}</p>
              </button>
            );
          })}
        </div>

        {/* Leads */}
        <div className="space-y-3">
          {loading && <div className="text-center py-12 text-gray-400 text-base">Laster...</div>}
          {!loading && leads.length === 0 && <div className="text-center py-12 text-gray-400 text-base">Ingen leads enda.</div>}

          {!loading && leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                onClick={() => handleExpand(lead.id)}
              >
                <span className="text-base font-semibold px-3 py-1 rounded-full shrink-0"
                  style={{ color: STATUS_COLOR[lead.status], background: STATUS_BG[lead.status] }}>
                  {STATUS_LABEL[lead.status] ?? lead.status}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0a1628] truncate">{lead.navn || "–"} — {lead.omrade || "Ukjent område"}</p>
                  <p className="text-base text-gray-400 truncate">{lead.adresse} · {lead.boligtype} · {lead.stoerrelse} m²</p>
                </div>
                <span className="text-base text-gray-400 shrink-0 hidden sm:block">
                  {new Date(lead.created_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                </span>
                <ChevronDown size={18} className="text-gray-300 shrink-0 transition-transform"
                  style={{ transform: expanded === lead.id ? "rotate(180deg)" : "rotate(0)" }} />
              </button>

              {expanded === lead.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-50" style={{ background: "#fafbfc" }}>

                  {/* Selger + Bolig */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-3">Selger</h4>
                      <dl className="space-y-2">
                        <Row label="Navn" value={lead.navn} />
                        <Row label="Telefon" value={lead.telefon} />
                        <Row label="E-post" value={lead.epost} />
                      </dl>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-3">Bolig</h4>
                      <dl className="space-y-2">
                        <Row label="Adresse" value={lead.adresse} />
                        <Row label="Område" value={lead.omrade} />
                        <Row label="Type" value={lead.boligtype} />
                        <Row label="Størrelse" value={lead.stoerrelse ? `${lead.stoerrelse} m²` : ""} />
                        <Row label="Antall rom" value={lead.antall_rom} />
                        <Row label="Est. pris" value={lead.estimert_pris ? `${lead.estimert_pris} kr` : ""} />
                        {lead.kommentar && <Row label="Kommentar" value={lead.kommentar} />}
                      </dl>
                    </div>
                  </div>

                  {/* Lenker til meglere */}
                  {lead.megler_ids?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Link2 size={14} /> Lenker til meglere
                      </h4>
                      <div className="space-y-3">
                        {lead.megler_ids.map((mid, i) => {
                          const mNavn = lead.megler_navn[i] ?? `Megler ${mid}`;
                          const existingLinks = (linkMap[lead.id] ?? []).filter((l) => Number(l.megler_id) === Number(mid));
                          const genKey = `${lead.id}-${mid}`;

                          return (
                            <div key={mid} className="rounded-xl border border-gray-100 bg-white p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-[#0a1628]">{mNavn}</span>
                                <button
                                  onClick={() => generateLink(lead, mid, mNavn)}
                                  disabled={linkLoading[genKey]}
                                  className="flex items-center gap-1.5 text-base font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 transition-colors"
                                >
                                  <Plus size={14} />
                                  {linkLoading[genKey] ? "Genererer..." : "Generer lenke"}
                                </button>
                                {linkError[genKey] && (
                                  <span className="text-base text-red-500">{linkError[genKey]}</span>
                                )}
                              </div>

                              {existingLinks.length === 0 ? (
                                <p className="text-base text-gray-400">Ingen lenker enda.</p>
                              ) : (
                                <div className="space-y-2">
                                  {existingLinks.map((ll) => (
                                    <div key={ll.id} className="rounded-lg p-3 space-y-2"
                                      style={{ background: "#f8fafc" }}>
                                      <div className="flex items-center gap-3 flex-wrap">
                                        {/* Status */}
                                        <span className="text-base font-semibold px-2.5 py-0.5 rounded-full shrink-0"
                                          style={{ color: LINK_STATUS_COLOR[ll.status], background: LINK_STATUS_BG[ll.status] }}>
                                          {LINK_STATUS_LABEL[ll.status]}
                                        </span>
                                        {/* Opened badge */}
                                        <span className="text-base px-2.5 py-0.5 rounded-full shrink-0"
                                          style={{
                                            background: ll.opened_at ? "#f0fdf4" : "#f8fafc",
                                            color: ll.opened_at ? "#16a34a" : "#94a3b8",
                                          }}>
                                          {ll.opened_at
                                            ? `Åpnet ${new Date(ll.opened_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}`
                                            : "Ikke åpnet"}
                                        </span>
                                        {/* Expiry */}
                                        <span className="text-base text-gray-400 shrink-0 hidden sm:block ml-auto">
                                          {ll.status === "expired"
                                            ? "Utløpt"
                                            : `Utløper ${new Date(ll.expires_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "short" })}`}
                                        </span>
                                        {/* Copy */}
                                        <button
                                          onClick={() => copyLink(ll.token)}
                                          className="flex items-center gap-1.5 text-base font-medium shrink-0 transition-colors"
                                          style={{ color: copied === ll.token ? "#16a34a" : "#2563eb" }}
                                        >
                                          {copied === ll.token ? <Check size={14} /> : <Copy size={14} />}
                                          {copied === ll.token ? "Kopiert!" : "Kopier"}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <span className="text-base text-gray-500">Endre status:</span>
                    {(["ny", "sendt", "betalt"] as const).map((s) => (
                      <button key={s} onClick={() => updateStatus(lead.id, s)}
                        className="text-base px-4 py-2 rounded-xl font-medium border transition-all"
                        style={{
                          background: lead.status === s ? STATUS_BG[s] : "white",
                          color: lead.status === s ? STATUS_COLOR[s] : "#64748b",
                          borderColor: lead.status === s ? STATUS_COLOR[s] + "44" : "#e2e8f0",
                          fontWeight: lead.status === s ? 700 : 500,
                        }}>
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
