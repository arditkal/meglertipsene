import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// One-time setup: creates the leads table.
// Call once after connecting Vercel Postgres: GET /api/setup?secret=YOUR_ADMIN_PASSWORD
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz DEFAULT now(),
      omrade text NOT NULL DEFAULT '',
      adresse text NOT NULL DEFAULT '',
      boligtype text NOT NULL DEFAULT '',
      stoerrelse text NOT NULL DEFAULT '',
      antall_rom text NOT NULL DEFAULT '',
      estimert_pris text NOT NULL DEFAULT '',
      kommentar text NOT NULL DEFAULT '',
      navn text NOT NULL DEFAULT '',
      telefon text NOT NULL DEFAULT '',
      epost text NOT NULL DEFAULT '',
      megler_ids jsonb NOT NULL DEFAULT '[]',
      megler_navn jsonb NOT NULL DEFAULT '[]',
      status text NOT NULL DEFAULT 'ny' CHECK (status IN ('ny', 'sendt', 'betalt'))
    )
  `;

  return NextResponse.json({ ok: true, message: "Tabell opprettet (eller eksisterte allerede)." });
}
