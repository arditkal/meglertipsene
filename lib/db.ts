import { neon } from "@neondatabase/serverless";

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export type Lead = {
  id: string;
  created_at: string;
  omrade: string;
  adresse: string;
  boligtype: string;
  stoerrelse: string;
  antall_rom: string;
  estimert_pris: string;
  kommentar: string;
  navn: string;
  telefon: string;
  epost: string;
  megler_ids: number[];
  megler_navn: string[];
  status: "ny" | "sendt" | "betalt";
};

export type LeadLink = {
  id: string;
  lead_id: string;
  megler_id: number;
  megler_navn: string;
  token: string;
  created_at: string;
  expires_at: string;
  status: "pending" | "paid" | "expired";
  stripe_session_id: string | null;
};
