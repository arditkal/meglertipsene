import { NextRequest, NextResponse } from "next/server";

// Stripe checkout is not active yet — payment handled manually via Vipps
export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "Mangler token" }, { status: 400 });
  }
  // Return placeholder — will be replaced with Vipps/Stripe integration
  return NextResponse.json({ error: "Betaling ikke aktivert enda" }, { status: 503 });
}
