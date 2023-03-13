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

export interface productCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  url: string;
}

export interface orderType {
  id: number;
  email: string;
  fname: string;
  lname: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  phone: string;
  cardNumber: string;
  Date: Date;
}

export type Product = z.infer<typeof productSchema>;
