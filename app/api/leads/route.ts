import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const db = getAdminClient();

  let query = db
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "alle") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
  }

  const { id, status } = await req.json();
  const db = getAdminClient();

  const { error } = await db
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
