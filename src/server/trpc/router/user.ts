import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";
import { signUpSchema, updateUserSchema } from "../../../types/user";
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from "../trpc";
import z from "zod";

export const userRouter = router({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        email,
        password,
        fname,
        lname,
        city,
        postalCode,
        streetAddress,
        phone,
      } = input;
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

      await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fname,
          lname,
          city,
          postalCode,
          streetAddress,
          phone,
          role: "Customer",
        },
      });

      return {
        status: 201,
        message: "Account created",
      };
    }),

  getUserData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          email: true,
          fname: true,
          lname: true,
          id: true,
          city: true,
          postalCode: true,
          streetAddress: true,
          phone: true,
        },
      });
      return user;
    }),

  updateUserData: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { fname, lname, streetAddress, postalCode, city, email, phone } =
        input;
      const userId = ctx.session.user.userId;
      const update = await ctx.prisma.user.updateMany({
        where: { id: userId },
        data: {
          fname,
          lname,
          streetAddress,
          postalCode,
          city,
          email,
          phone,
        },
      });
      return update;
    }),

  updatePassword: protectedProcedure
    .input(
      z.object({
        currPass: z.string(),
        newPass: z.string(),
        newPass2: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { currPass, newPass, newPass2, email } = input;

      const oldPass = await ctx.prisma.user.findFirst({
        where: { email },
        select: { password: true },
      });

      const verifiedPass = await verify(oldPass?.password!, currPass);

      if (verifiedPass === true && newPass === newPass2) {
        await ctx.prisma.user.update({
          where: { email },
          data: {
            password: await hash(newPass),
          },
        });

        return {
          message: "Password changed",
        };
      } else {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Failed",
        });
      }
    }),
  updateAdminPass: adminProcedure
    .input(
      z.object({
        currPass: z.string(),
        newPass: z.string(),
        newPass2: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { currPass, newPass, newPass2 } = input;

      const oldPass = await ctx.prisma.user.findFirst({
        where: { email: "admin" },
        select: { password: true },
      });

      const verifiedPass = await verify(oldPass?.password!, currPass);

      if (verifiedPass === true && newPass === newPass2) {
        await ctx.prisma.user.update({
          where: { email: "admin" },
          data: {
            password: await hash(newPass),
          },
        });

        return {
          message: "Password changed",
        };
      } else {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Failed",
        });
      }
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
