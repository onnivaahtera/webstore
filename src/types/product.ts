import * as z from "zod";
import { order } from "./shoppingCart";

export const productSchema = z.object({
  name: z.string(),
  url: z.string(),
  price: z.number(),
  desc: z.string(),
  image: z.string(),
  category: z.string(),
});

export type newProduct = {
  name: string;
  url: string;
  price: string;
  desc: string;
  image: string;
  category: string;
};

export interface productCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  url: string;
}

export interface orderType {
  id: number;
  date: Date;
  email: string;
}

export type Product = z.infer<typeof productSchema>;
