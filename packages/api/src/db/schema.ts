import { InferSelectModel, InferInsertModel, relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'
import { HASH_METHODS } from '../utils/password/hash-methods'

// User Table
export const UserTable = sqliteTable('User', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  address: text('address'),
  zipCode: integer('zip_code'),
  phone: integer('phone'),
  role: text('role', { enum: ['customer', 'admin'] }).default('customer'),
})
export const userRelations = relations(UserTable, ({ many }) => ({
  payments: many(PaymentTable),
  refunds: many(RefundTable),
  accountabilities: many(AccountabilityTable),
  sessions: many(SessionTable),
  authMethods: many(AuthMethodTable),
}))
export type User = InferSelectModel<typeof UserTable>
export type InsertUser = InferInsertModel<typeof UserTable>
export const insertUserSchema = createInsertSchema(UserTable)
export const selectUserSchema = createSelectSchema(UserTable)

// User Key is an authentication method
// Users have a 1-to-many relationship to keys
// The id consists of a provider type combined with a provider id
// https://lucia-auth.com/basics/keys/
export const AuthMethodTable = sqliteTable(
  'AuthMethod',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => UserTable.id),
    hashedPassword: text('hashed_password'),
    hashMethod: text('hash_method', { enum: HASH_METHODS }),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    // The following could be used for password resets, one-time passwords or 2FA
    totpSecret: text('totp_secret'),
    totpExpires: integer('totp_expires', { mode: 'timestamp' }),
    // This is used to prevent brute force attacks and rate limit invalid login attempts
    timeoutUntil: integer('timeout_until', { mode: 'timestamp' }),
    timeoutSeconds: integer('timeout_seconds'),
    // Depending on which providers you connect... you may want to store more data, i.e. username, profile pic, etc
    // Instead of creating separate fields for each, you could add a single field to store any additional data
    // data: text('data', { mode: 'json' })
  },
  (t) => ({
    userIdIdx: index('idx_userKey_userId').on(t.userId),
  })
)
export const userKeyRelations = relations(AuthMethodTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AuthMethodTable.userId],
    references: [UserTable.id],
  }),
}))
export type AuthMethod = InferSelectModel<typeof AuthMethodTable>
export type InsertAuthMethod = InferInsertModel<typeof AuthMethodTable>
export const AuthMethodSchema = createInsertSchema(AuthMethodTable)

export const SessionTable = sqliteTable(
  'Session',
  {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => UserTable.id),
    // DrizzleSQLiteAdapter currently expects this to be an integer and not use { mode: 'timestamp' }
    expiresAt: integer('expires_at').notNull(),
  },
  (t) => ({
    userIdIdx: index('idx_session_userId').on(t.userId),
  })
)
export const sessionRelations = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SessionTable.userId],
    references: [UserTable.id],
  }),
}))
export type Session = InferSelectModel<typeof SessionTable>
export type InsertSession = InferInsertModel<typeof SessionTable>
export const SessionSchema = createInsertSchema(SessionTable)

// Category Table
export const CategoryTable = sqliteTable('Category', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
})
export type Category = InferSelectModel<typeof CategoryTable>
export type InsertCategory = InferInsertModel<typeof CategoryTable>
export const insertCategorySchema = createInsertSchema(CategoryTable)
export const selectCategorySchema = createSelectSchema(CategoryTable)

// Product Table
export const ProductTable = sqliteTable('Product', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  category: text('category')
    .notNull()
    .references(() => CategoryTable.id),
  imageUrl: text('image_url').notNull(),
  stockQuantity: integer('stock_quantity').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull(),
})
export const productRelations = relations(ProductTable, ({ one }) => ({
  category: one(CategoryTable, {
    fields: [ProductTable.category],
    references: [CategoryTable.id],
  }),
}))
export type Product = InferSelectModel<typeof ProductTable>
export type InsertProduct = InferInsertModel<typeof ProductTable>
export const insertProductSchema = createInsertSchema(ProductTable)
export const selectProductSchema = createSelectSchema(ProductTable)

// Video Table
export const VideoTable = sqliteTable('Video', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url').notNull(),
})
export type Video = InferSelectModel<typeof VideoTable>
export type InsertVideo = InferInsertModel<typeof VideoTable>
export const insertVideoSchema = createInsertSchema(VideoTable)
export const selectVideoSchema = createSelectSchema(VideoTable)

// Payment Table
export const PaymentTable = sqliteTable('Payment', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => UserTable.id),
  amount: real('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status', { enum: ['PENDING', 'COMPLETED', 'FAILED'] }).default('PENDING'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  orderId: text('order_id').notNull().unique(),
  description: text('description'),
  successUrl: text('success_url'),
  backUrl: text('back_url'),
  notificationUrl: text('notification_url'),
})
export const paymentRelations = relations(PaymentTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [PaymentTable.userId],
    references: [UserTable.id],
  }),
  refunds: many(RefundTable),
  accountabilities: many(AccountabilityTable),
}))
export type Payment = InferSelectModel<typeof PaymentTable>
export type InsertPayment = InferInsertModel<typeof PaymentTable>
export const insertPaymentSchema = createInsertSchema(PaymentTable)
export const selectPaymentSchema = createSelectSchema(PaymentTable)

// Refund Table
export const RefundTable = sqliteTable('Refund', {
  id: text('id').primaryKey(),
  paymentId: text('payment_id')
    .notNull()
    .references(() => PaymentTable.id),
  amount: real('amount').notNull(),
  status: text('status', { enum: ['PENDING', 'COMPLETED', 'FAILED'] }).default('PENDING'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})
export const refundRelations = relations(RefundTable, ({ one }) => ({
  payment: one(PaymentTable, {
    fields: [RefundTable.paymentId],
    references: [PaymentTable.id],
  }),
}))
export type Refund = InferSelectModel<typeof RefundTable>
export type InsertRefund = InferInsertModel<typeof RefundTable>
export const insertRefundSchema = createInsertSchema(RefundTable)
export const selectRefundSchema = createSelectSchema(RefundTable)

// Shipment Tracking Table
export const ShipmentTrackingTable = sqliteTable('ShipmentTracking', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => PaymentTable.orderId),
  shipmentId: text('shipment_id').notNull(),
  trackingUrl: text('tracking_url').notNull(),
  status: text('status', { enum: ['PENDING', 'PROCESSING', 'SHIPPED'] }).default('PENDING'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const shipmentTrackingRelations = relations(ShipmentTrackingTable, ({ one }) => ({
  payment: one(PaymentTable, {
    fields: [ShipmentTrackingTable.orderId],
    references: [PaymentTable.orderId],
  }),
}))

export type ShipmentTracking = InferSelectModel<typeof ShipmentTrackingTable>
export type InsertShipmentTracking = InferInsertModel<typeof ShipmentTrackingTable>
export const insertShipmentTrackingSchema = createInsertSchema(ShipmentTrackingTable)
export const selectShipmentTrackingSchema = createSelectSchema(ShipmentTrackingTable)

// Car Table
export const CarTable = sqliteTable('Car', {
  id: text('id').primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  color: text('color').notNull(),
  price: real('price').notNull(),
  mileage: integer('mileage').notNull(),
  fuelType: text('fuelType').notNull(),
})
export type Car = InferSelectModel<typeof CarTable>
export type InsertCar = InferInsertModel<typeof CarTable>
export const insertCarSchema = createInsertSchema(CarTable)
export const selectCarSchema = createSelectSchema(CarTable)

// Accountability Table
export const AccountabilityTable = sqliteTable('Accountability', {
  id: text('id').primaryKey(),
  paymentId: text('payment_id')
    .notNull()
    .references(() => PaymentTable.id),
  userId: text('user_id').references(() => UserTable.id),
  action: text('action', { enum: ['CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE'] }).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  notes: text('notes'),
})
export const accountabilityRelations = relations(AccountabilityTable, ({ one }) => ({
  payment: one(PaymentTable, {
    fields: [AccountabilityTable.paymentId],
    references: [PaymentTable.id],
  }),
  user: one(UserTable, {
    fields: [AccountabilityTable.userId],
    references: [UserTable.id],
  }),
}))
export type Accountability = InferSelectModel<typeof AccountabilityTable>
export type InsertAccountability = InferInsertModel<typeof AccountabilityTable>
export const insertAccountabilitySchema = createInsertSchema(AccountabilityTable)
export const selectAccountabilitySchema = createSelectSchema(AccountabilityTable)
