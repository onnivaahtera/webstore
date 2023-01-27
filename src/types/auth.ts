import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(3).max(12),
});

export const signUpSchema = loginSchema.extend({
  email: z.string(),
  fname: z.string(),
  lname: z.string(),
});

export const updateUserSchema = z.object({
  email: z.string(),
  username: z.string().min(3).max(12),
  fname: z.string(),
  lname: z.string(),
});

export type IUpdate = z.infer<typeof updateUserSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
