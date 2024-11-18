import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface ItemProps {
  product_id: string;
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
  value: number;
  formattedValue: string;
  formattedPrice: string;
}

interface StripeLineItemProps {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  },
  quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST'){
    return res.status(405).json({ error: 'Method not allowed'})
  }

  try{
    const { items } = req.body

    const lineItems: StripeLineItemProps[] = items.map((item: ItemProps) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price),
      },
      quantity: item.quantity
    }))

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: lineItems,
    })

    res.status(201).json({ sessionId: checkoutSession.id, checkoutUrl: checkoutSession.url })
  }catch{
    res.status(500).json({ error: 'Fail creating checkout session'})
  }
}