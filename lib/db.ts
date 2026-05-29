import { sql } from "@vercel/postgres";

export { sql };

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
