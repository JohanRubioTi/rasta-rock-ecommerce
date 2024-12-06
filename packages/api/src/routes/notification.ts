// Extend trpc router for notifications
import { protectedProcedure, router } from '../trpc'

import { parse } from 'valibot'
import { insertNotificationSchema, selectNotificationSchema } from '../db/schema'

export const notificationRouter = router({
  // Add a new notification
  addNotification: protectedProcedure
    .input((raw) => parse(insertNotificationSchema, raw))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      const newNotification = await db.insert(NotificationTable).values(input).run()
      return newNotification
    }),

  // Fetch all notifications
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const notifications = await db.select().from(NotificationTable).all()
    return notifications
  }),

  // Mark notification as read
  markAsRead: protectedProcedure
    .input((z) => z.object({ id: z.string() })) // Accepts only notification ID
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db
        .update(NotificationTable)
        .set({ is_read: 1 })
        .where(NotificationTable.id.equals(input.id))
        .run()
      return { message: 'Notification marked as read' }
    }),

  // Delete a notification
  deleteNotification: protectedProcedure
    .input((z) => z.object({ id: z.string() })) // Accepts only notification ID
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx
      await db.delete().from(NotificationTable).where(NotificationTable.id.equals(input.id)).run()
      return { message: 'Notification deleted' }
    }),
})
