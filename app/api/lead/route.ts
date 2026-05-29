import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();

    await sql`
      INSERT INTO leads
        (omrade, adresse, boligtype, stoerrelse, antall_rom, estimert_pris,
         kommentar, navn, telefon, epost, megler_ids, megler_navn, status)
      VALUES
        (${b.omrade ?? ""}, ${b.adresse ?? ""}, ${b.boligtype ?? ""},
         ${b.stoerrelse ?? ""}, ${b.antall_rom ?? ""}, ${b.estimert_pris ?? ""},
         ${b.kommentar ?? ""}, ${b.navn ?? ""}, ${b.telefon ?? ""}, ${b.epost ?? ""},
         ${JSON.stringify(b.megler_ids ?? [])},
         ${JSON.stringify(b.megler_navn ?? [])},
         'ny')
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead insert error:", err);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
