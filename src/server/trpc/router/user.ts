import { protectedProcedure, publicProcedure, router } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema, updateUserSchema } from "../../../types/auth";

export const userRouter = router({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { username, email, password, fname, lname } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User aleredy exists",
        });
      }

      const hashedPassword = await hash(password);

      const user = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          fname,
          lname,
          role: "customer",
        },
      });

      return {
        status: 201,
        message: "Account created",
        result: user.email,
      };
    }),

  getUserData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          username: true,
          email: true,
          fname: true,
          lname: true,
          role: true,
        },
      });
      return user;
    }),
  updateUserData: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => {}),
});
