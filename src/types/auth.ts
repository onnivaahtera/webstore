import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  username: z.string(),
  fname: z.string(),
  lname: z.string(),
  role: z.string(),
});

export const updateUserSchema = z.object({
  email: z.string(),
  fname: z.string(),
  lname: z.string(),
});

export type IUpdate = z.infer<typeof updateUserSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
