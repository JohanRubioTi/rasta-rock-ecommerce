import { parse } from 'valibot'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure, publicProcedure, valibotParser } from '../trpc'
import { eq } from 'drizzle-orm'

import { ShipmentTrackingTable, UserTable, PaymentTable } from '../db/schema'

// Define shipmentRouter
export const shipmentRouter = router({
  // Fetch all shipments for a specific user
  allForUser: protectedProcedure
    .input(valibotParser({ userId: parse.text() })) // Input schema for user ID
    .query(async ({ ctx, input }) => {
      const { db } = ctx
      const { userId } = input

      // Ensure the user exists
      const userExists = await db.select().from(UserTable).where(eq(UserTable.id, userId)).get()
      if (!userExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `User with ID '${userId}' does not exist.`,
        })
      }

      // Fetch all shipments linked to the user's orders
      const shipments = await db
        .select()
        .from(ShipmentTrackingTable)
        .innerJoin(PaymentTable, eq(PaymentTable.orderId, ShipmentTrackingTable.orderId))
        .where(eq(PaymentTable.userId, userId))
        .all()

      return shipments
    }),

  // Fetch all shipment statuses
  statuses: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx

    // Fetch distinct statuses from the shipment table
    const statuses = await db
      .select({ status: ShipmentTrackingTable.status })
      .from(ShipmentTrackingTable)
      .groupBy(ShipmentTrackingTable.status)
      .all()

    return statuses.map((record) => record.status)
  }),

  // Fetch shipment details for a specific shipment ID
  byShipmentId: protectedProcedure
    .input(valibotParser({ shipmentId: parse.text() })) // Input schema for shipment ID
    .query(async ({ ctx, input }) => {
      const { db } = ctx
      const { shipmentId } = input

      // Fetch the shipment details
      const shipment = await db
        .select()
        .from(ShipmentTrackingTable)
        .where(eq(ShipmentTrackingTable.shipmentId, shipmentId))
        .get()

      if (!shipment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Shipment with ID '${shipmentId}' not found.`,
        })
      }

      return shipment
    }),
})
