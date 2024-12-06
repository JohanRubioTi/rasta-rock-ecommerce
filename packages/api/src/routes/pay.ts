import { protectedProcedure, publicProcedure, router } from '../trpc'

export const paymentRouter = router({
  // other endpoints
  create: protectedProcedure
    .input((raw) => parse(insertPaymentSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.insert(PaymentTable).values(input).run()

      const paymentResponse = await fetch('/api/dlocalgo/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: input.amount,
          currency: input.currency,
          order_id: input.order_id,
          description: `Order ${input.order_id} - example.com`,
          success_url: 'https://example.com/success',
          back_url: 'https://example.com/',
          notification_url: 'https://example.com/notifications',
        }),
      })

      const paymentResult = await paymentResponse.json()
      return paymentResult
    }),

  retrieve: protectedProcedure
    .input((z) => z.object({ paymentId: z.string() })) // Define input schema for paymentId
    .query(async ({ ctx, input }) => {
      const response = await fetch(`/api/retrievePayment?paymentId=${input.paymentId}`, {
        method: 'GET',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to retrieve payment')
      }

      return data
    }),

  refund: protectedProcedure
    .input((raw) => parse(insertRefundSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Insert refund request into database
      const newRefund = await db.insert(RefundTable).values(input).run()

      // Call dLocal API to initiate refund
      const response = await fetch('https://api-sbx.dlocalgo.com/v1/refunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}:${process.env.API_SECRET}`,
        },
        body: JSON.stringify({
          payment_id: input.payment_id,
          amount: input.amount,
        }),
      })

      if (!response.ok) {
        throw new Error('Refund request failed')
      }

      const refundData = await response.json()
      return refundData
    }),
})
