import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const PRICE_NOK = parseInt(process.env.LEAD_PRICE_NOK ?? "499");

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Mangler token" }, { status: 400 });
  }

  const sql = getDb();
  const rows = await sql`
    SELECT ll.*, l.omrade, l.boligtype, l.stoerrelse
    FROM lead_links ll
    JOIN leads l ON ll.lead_id = l.id
    WHERE ll.token = ${token} AND ll.status = 'pending' AND ll.expires_at > now()
    LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Lenken er ugyldig eller utløpt" }, { status: 404 });
  }

  const link = rows[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "nok",
          unit_amount: PRICE_NOK * 100,
          product_data: {
            name: `Lead: ${link.omrade}`,
            description: `${link.boligtype ?? "Bolig"} · ${link.stoerrelse ? link.stoerrelse + " m²" : ""}`.trim().replace(/·\s*$/, ""),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      token,
    },
    success_url: `${baseUrl}/megler/${token}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/megler/${token}`,
  });

  return NextResponse.json({ url: session.url });
}
