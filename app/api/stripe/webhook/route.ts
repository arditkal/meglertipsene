import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Mangler stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const token = session.metadata?.token;

    if (token) {
      const sql = getDb();
      await sql`
        UPDATE lead_links
        SET status = 'paid', stripe_session_id = ${session.id}
        WHERE token = ${token}
      `;

      // Also mark the parent lead as betalt
      await sql`
        UPDATE leads SET status = 'betalt'
        WHERE id = (SELECT lead_id FROM lead_links WHERE token = ${token})
        AND status != 'betalt'
      `;
    }
  }

  return NextResponse.json({ received: true });
}
