import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import z from "zod";
import { signUpSchema, updateUserSchema } from "../../../types/user";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { username, email, password, fname, lname } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { username },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User aleredy exists",
        });
      }

      const hashedPassword = await hash(password);

      await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          fname,
          lname,
        },
      });

      return {
        status: 201,
        message: "Account created",
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
        },
      });
      return user;
    }),

  updateUserData: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { fname, lname, username, email } = input;
      await ctx.prisma.user.update({
        where: { username },
        data: {
          fname: fname,
          lname: lname,
          email: email,
        },
      });
      return {
        status: 201,
        message: "Profile updated succsessfully",
      };
    }),
  getOrders: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const results = ctx.prisma.order.findMany({
        where: {
          userId: input.id,
        },
      });
      return results;
    }),
});
