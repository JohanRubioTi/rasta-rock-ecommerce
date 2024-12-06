import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const { paymentId } = req.query

    const response = await fetch(`https://api-sbx.dlocalgo.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}:${process.env.API_SECRET}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(response.status).json({ error })
    }

    const paymentData = await response.json()
    res.status(200).json(paymentData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment' })
  }
}
