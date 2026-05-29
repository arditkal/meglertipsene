import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — used for inserts from contact form (anon, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — server-side only, uses service role key (bypasses RLS)
// NEVER import this in client components
export function getAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
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
