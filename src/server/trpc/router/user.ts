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
      const data = await ctx.prisma.user.findUnique({
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
      return data;
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
      return {
        message: "User data updated",
      };
    }),

  updatePassword: protectedProcedure
    .input(
      z.object({
        currPass: z.string().optional(),
        newPass: z.string().optional(),
        newPass2: z.string().optional(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { currPass, newPass, newPass2, email } = input;

      if (!currPass || !newPass || !newPass2)
        return {
          message: `Please fill all fields`,
        };

      if (newPass !== newPass2) return { message: "Passwords don't match" };

      const oldPass = await ctx.prisma.user.findFirst({
        where: { email },
        select: { password: true },
      });

      if (!oldPass)
        return {
          message: "user with this password does not exist",
        };

      const verifiedPass = await verify(oldPass.password, currPass);

      if (verifiedPass === false) return { message: "Wrong password" };

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
      }
    }),
  updateAdminPass: adminProcedure
    .input(
      z.object({
        currPass: z.string().optional(),
        newPass: z.string().optional(),
        newPass2: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { currPass, newPass, newPass2 } = input;

      if (!currPass || !newPass || !newPass2)
        return {
          message: `Please fill all fields`,
        };

      if (newPass !== newPass2) return { message: "Passwords don't match" };

      const oldPass = await ctx.prisma.user.findFirst({
        where: { email: "admin" },
        select: { password: true },
      });

      if (!oldPass)
        return {
          message: "No password",
        };

      const verifiedPass = await verify(oldPass.password, currPass);

      if (verifiedPass === false) return { message: "Wrong password" };

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
