import { Phone, Mail, ExternalLink } from "lucide-react";
import type { Megler } from "@/lib/meglere";

function Initialer({ navn }: { navn: string }) {
  const parts = navn.split(" ").filter(Boolean);
  const initials =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : navn.slice(0, 2);
  return initials.toUpperCase();
}

export default function MeglerCard({ megler }: { megler: Megler }) {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 hover:border-blue-100 hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
            color: "#1d4ed8",
          }}
        >
          <Initialer navn={megler.navn} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#0a1628] leading-snug">
            {megler.navn}
          </h3>
          <p className="text-blue-600 font-medium text-base leading-snug">
            {megler.firma}
          </p>
          {megler.tittel && (
            <p className="text-gray-500 text-base leading-snug">{megler.tittel}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="text-2xl font-bold text-[#0a1628]">
            {megler.antall_annonser}
          </span>
          <p className="text-gray-400 text-base leading-tight">annonser</p>
        </div>
      </div>

      {/* Areas */}
      {megler.omrader.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {megler.omrader.slice(0, 5).map((o) => (
            <span
              key={o.navn}
              className="px-3 py-1 rounded-full text-base"
              style={{ background: "#f1f5f9", color: "#475569" }}
            >
              {o.navn}
            </span>
          ))}
          {megler.omrader.length > 5 && (
            <span
              className="px-3 py-1 rounded-full text-base"
              style={{ background: "#f1f5f9", color: "#94a3b8" }}
            >
              +{megler.omrader.length - 5} til
            </span>
          )}
        </div>
      )}

      {/* Contact */}
      <div
        className="flex flex-wrap items-center gap-4 pt-4 mt-auto"
        style={{ borderTop: "1px solid #f1f5f9" }}
      >
        {megler.telefon && (
          <a
            href={`tel:+47${megler.telefon.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors text-base"
          >
            <Phone size={15} />
            {megler.telefon}
          </a>
        )}
        {megler.email && (
          <a
            href={`mailto:${megler.email}`}
            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors text-base truncate"
          >
            <Mail size={15} />
            {megler.email}
          </a>
        )}
        {megler.finn_org_url && (
          <a
            href={megler.finn_org_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-blue-600 hover:text-blue-500 font-medium text-base transition-colors"
          >
            Finn.no
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
