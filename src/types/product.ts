import * as z from "zod";

export const productSchema = z.object({
  name: z.string(),
  url: z.string(),
  price: z.number(),
  desc: z.string(),
  image: z.string(),
  category: z.number(),
});

export const productCard = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
});

const newProductSchema = z.object({
  name: z.string(),
  url: z.string(),
  price: z.string(),
  desc: z.string(),
  image: z.string(),
  category: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export type productCardProps = z.infer<typeof productCard>;

export type newProduct = z.infer<typeof newProductSchema>;
