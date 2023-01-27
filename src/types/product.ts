import * as z from "zod";

export const productSchema = z.object({
  name: z.string(),
  url: z.string(),
  price: z.number(),
  desc: z.string(),
  image: z.string(),
  category: z.number(),
});

export type newProduct = {
  name: string;
  url: string;
  price: string;
  desc: string;
  image: string;
  category: number;
};

export const productCard = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  image: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export type productCardProps = z.infer<typeof productCard>;
