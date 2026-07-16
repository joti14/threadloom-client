import { z } from "zod";
import { CATEGORY_VALUES } from "@/config/categories";

const csvToList = (val?: string) =>
  (val ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(160, "Keep the short description under 160 characters"),
  description: z.string().min(1, "Full description is required"),
  category: z.enum(CATEGORY_VALUES, { message: "Select a category" }),
  subCategory: z.string().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => Number(v) > 0, "Price must be a number greater than 0"),
  stock: z
    .string()
    .optional()
    .refine(
      (v) => !v || (Number.isInteger(Number(v)) && Number(v) >= 0),
      "Stock must be a non-negative whole number"
    ),
  sizes: z.string().optional(),
  colors: z.string().optional(),
  images: z
    .string()
    .min(1, "At least one image URL is required")
    .refine((v) => {
      const list = csvToList(v);
      return list.length > 0 && list.every((u) => /^https?:\/\/\S+$/.test(u));
    }, "Enter valid image URLs (http/https), separated by commas"),
});

export type AddProductValues = z.infer<typeof addProductSchema>;

/** Transforms validated form values into the POST /api/products payload. */
export function toProductPayload(values: AddProductValues) {
  return {
    title: values.title,
    brand: values.brand,
    shortDescription: values.shortDescription,
    description: values.description,
    category: values.category,
    subCategory: values.subCategory?.trim() || undefined,
    price: Number(values.price),
    stock: values.stock ? Number(values.stock) : 0,
    sizes: csvToList(values.sizes),
    colors: csvToList(values.colors),
    images: csvToList(values.images),
  };
}
