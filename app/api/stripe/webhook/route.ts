import { NextRequest, NextResponse } from "next/server";

// Stripe webhook not active yet
export async function POST(_req: NextRequest) {
  return NextResponse.json({ received: true });
}
