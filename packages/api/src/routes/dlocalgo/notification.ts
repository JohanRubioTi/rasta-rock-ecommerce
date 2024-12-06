import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../db' // Adjust the path based on your project structure
import { NotificationTable, PaymentTable } from '../../db/schema' // Import relevant tables

// Verify HMAC Signature
function verifyHMACSignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body)
  const calculatedSignature = hmac.digest('hex')
  return calculatedSignature === signature
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  const body = JSON.stringify(req.body)
  const signature = req.headers['x-hmac-signature'] as string
  const secret = process.env.HMAC_SECRET

  if (!secret || !signature) {
    return res.status(400).json({ error: 'Missing signature or secret' })
  }

  if (!verifyHMACSignature(body, signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const { payment_id, status, notification_data } = req.body

  if (!payment_id || !status) {
    return res.status(400).json({ error: 'Invalid payload: Missing required fields' })
  }

  try {
    // Insert notification into NotificationTable
    await db.insert(NotificationTable).values({
      payment_id,
      status,
      notification_data: JSON.stringify(notification_data), // Store as JSON string
      created_at: new Date().toISOString(),
    }).run()

    // Update PaymentTable status
    await db.update(PaymentTable)
      .set({ status })
      .where(PaymentTable.id.equals(payment_id))
      .run()

    res.status(200).json({ message: 'Notification processed successfully' })
  } catch (error) {
    console.error('Error processing notification:', error)
    res.status(500).json({ error: 'Failed to process notification' })
  }
}
