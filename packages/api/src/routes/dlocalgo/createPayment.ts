import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const { amount, currency, order_id, description, success_url, back_url, notification_url } =
      req.body

    const response = await fetch('https://api-sbx.dlocalgo.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DLOCALGO_API_KEY}:${process.env.DLOCALGO_API_SECRET}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        country: 'CO',
        order_id,
        description,
        success_url,
        back_url,
        notification_url,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data })
    }

    res.status(200).json({ payment: data })
  } catch (error) {
    res.status(500).json({ error: 'Fallo al crear pago' })
  }
}
