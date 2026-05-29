import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      omrade,
      adresse,
      boligtype,
      stoerrelse,
      antall_rom,
      estimert_pris,
      kommentar,
      navn,
      telefon,
      epost,
      megler_ids,
      megler_navn,
    } = body;

    const db = getAdminClient();

    const { data, error } = await db.from("leads").insert([
      {
        omrade: omrade ?? "",
        adresse: adresse ?? "",
        boligtype: boligtype ?? "",
        stoerrelse: stoerrelse ?? "",
        antall_rom: antall_rom ?? "",
        estimert_pris: estimert_pris ?? "",
        kommentar: kommentar ?? "",
        navn: navn ?? "",
        telefon: telefon ?? "",
        epost: epost ?? "",
        megler_ids: megler_ids ?? [],
        megler_navn: megler_navn ?? [],
        status: "ny",
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
