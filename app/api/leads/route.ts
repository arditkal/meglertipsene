import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  const { rows } =
    status && status !== "alle"
      ? await sql`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC`
      : await sql`SELECT * FROM leads ORDER BY created_at DESC`;

  return NextResponse.json(rows);
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const { id, status } = await req.json();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;

  return NextResponse.json({ ok: true });
}
