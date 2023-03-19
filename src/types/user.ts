import * as z from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(3).max(20),
});

export const signUpSchema = loginSchema.extend({
  fname: z.string(),
  lname: z.string(),
  streetAddress: z.string(),
  postalCode: z.string(),
  city: z.string(),
  phone: z.string(),
});

export const updateUserSchema = z.object({
  fname: z.string().optional(),
  lname: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export type passType = {
  currPass: string;
  newPass: string;
  newPass2: string;
};

export type userSchema = z.infer<typeof updateUserSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
