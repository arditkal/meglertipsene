import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Feil passord" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "lax",
  });
  return res;
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  return NextResponse.json({ ok: true });
}
