import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: String(session?.user?.email),
    });
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: "price_1LFiUyHTfvyPUkj49gTjfz9j", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: String(process.env.SUCCESS_URL),
      cancel_url: String(process.env.CANCEL_URL),
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
