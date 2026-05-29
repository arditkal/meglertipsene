import { NextRequest, NextResponse } from "next/server";
import { sokMeglere } from "@/lib/meglere";

export function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "24"), 50);

  const meglere = sokMeglere(q, limit);

  const result = meglere.map((m) => ({
    id: m.id,
    fornavn: m.navn.split(" ")[0],
    antall_annonser: m.antall_annonser,
  }));

  return NextResponse.json(result);
}
