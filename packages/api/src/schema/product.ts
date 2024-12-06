import {
  Input,
  number,
  optional,
  object,
  picklist,
  string,
  pipe,
  minValue,
  minLength,
  toLowerCase,
} from 'valibot';
import { ProductTable } from '../db/schema';
import { router, publicProcedure, valibotParser } from '../trpc';
import { eq, gte, lte, asc, desc } from 'drizzle-orm';

// Define allowed sorting fields and order options for filtering
const sortingFields = ['price', 'name', 'stock_quantity'] as const;
const sortOrderOptions = ['asc', 'desc'] as const;

// Define ProductFilterSchema for validating filter inputs
export const FilterProductSchema = object({
  category: optional(string()),
  minPrice: optional(number([minValue(0, 'Minimum price must be 0 or higher.')])),
  maxPrice: optional(number([minValue(0, 'Maximum price must be 0 or higher.')])),
  sortBy: optional(picklist(sortingFields)),
  sortOrder: optional(picklist(sortOrderOptions)),
});

// Shared field definitions
const id = string([minLength(1, 'Product ID is required.')]);
const name = string([minLength(1, 'Name is required.'), toLowerCase()]);
const description = string([minLength(1, 'Description is required.'), toLowerCase()]);
const price = number([minValue(0, 'Price must be 0 or higher.')]);
const category = string([minLength(1, 'Category ID is required.')]);
const imageUrl = string([minLength(1, 'Image URL is required.')]);
const stockQuantity = number([minValue(0, 'Stock quantity must be 0 or higher.')]);
const isActive = number([minValue(0, 'isActive must be either 0 (false) or 1 (true).')]);

// Define CreateProductSchema for creating a product
export const CreateProductSchema = object({
  name,
  description,
  price,
  category,
  imageUrl,
  stockQuantity,
  isActive,
});

// Define UpdateProductSchema for updating a product
export const UpdateProductSchema = object({
  id, // ID is mandatory for updates
  name: optional(name),
  description: optional(description),
  price: optional(price),
  category: optional(category),
  imageUrl: optional(imageUrl),
  stockQuantity: optional(stockQuantity),
  isActive: optional(isActive),
});

// Input types for Create and Update schemas
export type CreateProductInput = Input<typeof CreateProductSchema>;
export type UpdateProductInput = Input<typeof UpdateProductSchema>;

// Define InsertCategorySchema for adding a new category
export const CreateCategorySchema = object({
  name,
  description,
});

// Input type for InsertCategorySchema
export type CreateCategoryInput = Input<typeof CreateCategorySchema>;
