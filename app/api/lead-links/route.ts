import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

// POST /api/lead-links — generate a new link (admin only)
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const { lead_id, megler_id, megler_navn } = await req.json();
  if (!lead_id || !megler_id || !megler_navn) {
    return NextResponse.json({ error: "Mangler felt" }, { status: 400 });
  }

  const token = randomBytes(18).toString("hex"); // 36-char hex
  const sql = getDb();

  const rows = await sql`
    INSERT INTO lead_links (lead_id, megler_id, megler_navn, token)
    VALUES (${lead_id}, ${megler_id}, ${megler_navn}, ${token})
    RETURNING *
  `;

  return NextResponse.json(rows[0]);
}

// GET /api/lead-links?lead_id=xxx — list all links for a lead (admin only)
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const lead_id = req.nextUrl.searchParams.get("lead_id");
  if (!lead_id) return NextResponse.json([]);

  const sql = getDb();

  // Auto-expire overdue links
  await sql`
    UPDATE lead_links SET status = 'expired'
    WHERE lead_id = ${lead_id} AND expires_at < now() AND status = 'pending'
  `;

  const rows = await sql`
    SELECT * FROM lead_links WHERE lead_id = ${lead_id} ORDER BY created_at DESC
  `;

  return NextResponse.json(rows);
}
