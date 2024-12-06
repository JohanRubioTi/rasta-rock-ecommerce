import { parse } from 'valibot'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure, publicProcedure, valibotParser } from '../trpc'
import { eq, gte, lte, asc, desc, and } from 'drizzle-orm'

import { FilterProductSchema, CreateProductSchema, CreateCategorySchema } from '../schema/product'
import { ProductTable, CategoryTable } from '../db/schema'

export const productRouter = router({
  // Existing routes...
  //
  // Fetch all products without filtering
  all: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const allProducts = await db.select().from(ProductTable).all()
    return allProducts
  }),

  categories: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const allCategories = await db.select().from(CategoryTable).all()
    return allCategories
  }),

  // Filter products based on various criteria
  filter: publicProcedure
    .input(valibotParser(FilterProductSchema)) // Apply the filter schema
    .query(async ({ ctx, input }) => {
      const { db } = ctx
      const { category, minPrice, maxPrice, sortBy, sortOrder } = input || {}

      // Start building the query with Drizzle ORM
      let query = db.select().from(ProductTable)

      // Apply filtering conditions
      const conditions = []
      if (category) {
        conditions.push(eq(ProductTable.category, category))
      }
      if (minPrice !== undefined) {
        conditions.push(gte(ProductTable.price, minPrice))
      }
      if (maxPrice !== undefined) {
        conditions.push(lte(ProductTable.price, maxPrice))
      }
      if (conditions.length > 0) {
        query = query.where(and(...conditions))
      }

      // Apply sorting if specified
      if (sortBy) {
        const orderDirection = sortOrder === 'desc' ? desc : asc
        query = query.orderBy(orderDirection(ProductTable[sortBy]))
      }

      const allProducts = await query.all()
      return allProducts
    }),

  // Create a new product entry
  create: protectedProcedure
    .input(valibotParser(CreateProductSchema)) // Use Drizzle-Valibot for insert schema
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Validate the category ID exists
      const categoryExists = await db
        .select()
        .from(CategoryTable)
        .where(eq(CategoryTable.id, input.category))
        .get()

      if (!categoryExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Category with ID '${input.category}' does not exist.`,
        })
      }

      // Insert the product
      try {
        await db.insert(ProductTable).values(input).run()
        return { success: true, message: 'Product created successfully.' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create product.',
          cause: error,
        })
      }
    }),

  // Update a product
  updateProduct: protectedProcedure
    .input(valibotParser(CreateProductSchema)) // Reuse CreateProductSchema or adapt as necessary
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Check if product exists
      const productExists = await db
        .select()
        .from(ProductTable)
        .where(eq(ProductTable.id, input.id))
        .get()

      if (!productExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with ID '${input.id}' does not exist.`,
        })
      }

      // Update the product
      try {
        await db
          .update(ProductTable)
          .set(input)
          .where(eq(ProductTable.id, input.id))
          .run()
        return { success: true, message: 'Product updated successfully.' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update product.',
          cause: error,
        })
      }
    }),

  // Add a new category
  addCategory: protectedProcedure
    .input(valibotParser(CreateCategorySchema))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Insert the new category
      try {
        await db.insert(CategoryTable).values(input).run()
        return { success: true, message: 'Category added successfully.' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add category.',
          cause: error,
        })
      }
    }),

  // Delete a product
  deleteProduct: protectedProcedure
    .input(valibotParser({ id: 'string' })) // Schema for product ID
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Check if product exists
      const productExists = await db
        .select()
        .from(ProductTable)
        .where(eq(ProductTable.id, input.id))
        .get()

      if (!productExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with ID '${input.id}' does not exist.`,
        })
      }

      // Delete the product
      try {
        await db.delete().from(ProductTable).where(eq(ProductTable.id, input.id)).run()
        return { success: true, message: 'Product deleted successfully.' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete product.',
          cause: error,
        })
      }
    }),

  // Delete a category
  deleteCategory: protectedProcedure
    .input(valibotParser({ id: 'string' })) // Schema for category ID
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      // Check if category exists
      const categoryExists = await db
        .select()
        .from(CategoryTable)
        .where(eq(CategoryTable.id, input.id))
        .get()

      if (!categoryExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with ID '${input.id}' does not exist.`,
        })
      }

      // Delete the category
      try {
        await db.delete().from(CategoryTable).where(eq(CategoryTable.id, input.id)).run()
        return { success: true, message: 'Category deleted successfully.' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete category.',
          cause: error,
        })
      }
    }),
})
