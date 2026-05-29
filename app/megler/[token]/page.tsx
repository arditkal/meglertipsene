import { getDb } from "@/lib/db";
import { CheckCircle, Clock, XCircle, Phone, Mail, MapPin, Home } from "lucide-react";
import UnlockSection from "./UnlockSection";
import Stripe from "stripe";

const PRICE_NOK = parseInt(process.env.LEAD_PRICE_NOK ?? "499");

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ session_id?: string }>;
};

export default async function MeglerTokenPage({ params, searchParams }: Props) {
  const { token } = await params;
  const { session_id } = await searchParams;

  const sql = getDb();

  // Auto-expire check
  await sql`
    UPDATE lead_links SET status = 'expired'
    WHERE token = ${token} AND expires_at < now() AND status = 'pending'
  `;

  const rows = await sql`
    SELECT
      ll.id, ll.token, ll.status, ll.expires_at, ll.megler_navn,
      l.omrade, l.adresse, l.boligtype, l.stoerrelse,
      l.antall_rom, l.estimert_pris, l.kommentar,
      l.navn, l.telefon, l.epost
    FROM lead_links ll
    JOIN leads l ON ll.lead_id = l.id
    WHERE ll.token = ${token}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return <NotFoundPage />;
  }

  const link = rows[0];

  // Verify Stripe session if redirect came from checkout
  let paidViaSession = false;
  if (session_id && link.status !== "paid") {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-05-27.dahlia",
      });
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (
        session.payment_status === "paid" &&
        session.metadata?.token === token
      ) {
        await sql`
          UPDATE lead_links SET status = 'paid', stripe_session_id = ${session_id}
          WHERE token = ${token}
        `;
        paidViaSession = true;
      }
    } catch {
      // Invalid session_id, ignore
    }
  }

  const isPaid = link.status === "paid" || paidViaSession;
  const isExpired = link.status === "expired";

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(link.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #0f2347 100%)" }}
    >
      {/* Nav */}
      <div className="px-6 pt-6 pb-4">
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 2L2 10v16h8v-8h8v8h8V10L14 2z" fill="white" fillOpacity="0.9" />
          </svg>
          <span className="text-white font-semibold text-lg tracking-tight">
            meglertipsene
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-lg space-y-4">

          {/* Header card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-base text-gray-500 mb-1">Lead til deg</p>
                <h1 className="text-2xl font-bold text-[#0a1628]">{link.omrade}</h1>
              </div>
              {isPaid ? (
                <span
                  className="flex items-center gap-1.5 text-base font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}
                >
                  <CheckCircle size={15} /> Betalt
                </span>
              ) : isExpired ? (
                <span
                  className="flex items-center gap-1.5 text-base font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#fef2f2", color: "#dc2626" }}
                >
                  <XCircle size={15} /> Utløpt
                </span>
              ) : (
                <span
                  className="flex items-center gap-1.5 text-base font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#fffbeb", color: "#d97706" }}
                >
                  <Clock size={15} />
                  {daysLeft === 0 ? "Utløper i dag" : `${daysLeft} dager igjen`}
                </span>
              )}
            </div>

            {/* Property details */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Home, label: "Type", value: link.boligtype },
                { icon: MapPin, label: "Størrelse", value: link.stoerrelse ? `${link.stoerrelse} m²` : null },
                { icon: Home, label: "Antall rom", value: link.antall_rom || null },
                {
                  icon: Home,
                  label: "Est. pris",
                  value: link.estimert_pris
                    ? `${Number(link.estimert_pris.replace(/\s/g, "")).toLocaleString("nb-NO")} kr`
                    : null,
                },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl p-3"
                    style={{ background: "#f8fafc" }}
                  >
                    <p className="text-base text-gray-400 mb-0.5">{row.label}</p>
                    <p className="font-semibold text-[#0a1628]">{row.value}</p>
                  </div>
                ))}
            </div>

            {link.kommentar && (
              <div
                className="rounded-xl p-4 mb-5"
                style={{ background: "#f0f4ff", border: "1px solid #dbeafe" }}
              >
                <p className="text-base text-blue-700 italic">"{link.kommentar}"</p>
              </div>
            )}

            {/* Paid view */}
            {isPaid && (
              <div className="space-y-3">
                <p className="text-base font-semibold text-gray-400 uppercase tracking-wide">
                  Selgerens kontaktinfo
                </p>
                <div
                  className="rounded-2xl p-5 space-y-4"
                  style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                >
                  {link.navn && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <span className="text-base font-bold text-green-700">
                          {link.navn.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">Navn</p>
                        <p className="font-semibold text-[#0a1628]">{link.navn}</p>
                      </div>
                    </div>
                  )}
                  {link.telefon && (
                    <a
                      href={`tel:+47${link.telefon.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <Phone size={16} className="text-green-700" />
                      </div>
                      <div>
                        <p className="text-base text-gray-500">Mobil</p>
                        <p className="font-semibold text-blue-600 group-hover:text-blue-500">
                          {link.telefon}
                        </p>
                      </div>
                    </a>
                  )}
                  {link.epost && (
                    <a
                      href={`mailto:${link.epost}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <Mail size={16} className="text-green-700" />
                      </div>
                      <div>
                        <p className="text-base text-gray-500">E-post</p>
                        <p className="font-semibold text-blue-600 group-hover:text-blue-500 break-all">
                          {link.epost}
                        </p>
                      </div>
                    </a>
                  )}
                  {link.adresse && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-green-700" />
                      </div>
                      <div>
                        <p className="text-base text-gray-500">Adresse</p>
                        <p className="font-semibold text-[#0a1628]">{link.adresse}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Expired view */}
            {isExpired && !isPaid && (
              <div
                className="rounded-2xl p-5 text-center"
                style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                <p className="font-semibold text-red-700 mb-1">Denne lenken er utløpt</p>
                <p className="text-base text-red-500">
                  Kontakt meglertipsene for å få tilsendt en ny lenke.
                </p>
              </div>
            )}

            {/* Unlock section */}
            {!isPaid && !isExpired && (
              <UnlockSection token={token} price={PRICE_NOK} />
            )}
          </div>

          <p className="text-center text-white/30 text-base">
            Sendt av meglertipsene · {link.megler_navn}
          </p>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #0f2347 100%)" }}
    >
      <div className="text-center text-white">
        <p className="text-2xl font-bold mb-2">Lenken finnes ikke</p>
        <p className="text-white/50 text-base">Den kan ha blitt slettet eller er ugyldig.</p>
      </div>
    </div>
  );
}
