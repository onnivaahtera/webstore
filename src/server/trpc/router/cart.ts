import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../trpc";
import { order } from "../../../types/shoppingCart";

export const cartRouter = router({
  productsInCart: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: input.id },
        select: { id: true, name: true, price: true, image: true },
      });
    }),
  completeOrder: publicProcedure
    .input(order)
    .mutation(async ({ ctx, input }) => {
      const {
        cardNumber,
        cvc,
        expirationDate,
        city,
        email,
        fname,
        lname,
        phone,
        postalCode,
        streetAddress,
        date,
        totalPrice,
        cartItems,
      } = input;
      const sessionId = ctx.session?.user.userId;
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: sessionId,
        },
      });

      await ctx.prisma.order.create({
        data: {
          userId: user?.id!,
          cardNumber,
          cvc,
          expirationDate,
          totalPrice: totalPrice,
          city: city ?? user?.city!,
          email: email ?? user?.email!,
          fname: fname ?? user?.fname!,
          lname: lname ?? user?.lname!,
          phone: phone ?? user?.phone!,
          postalCode: postalCode ?? user?.postalCode!,
          streetAddress: streetAddress ?? user?.streetAddress!,
          Date: date,
        },
      });
      const connectOrder = await ctx.prisma.order.findFirst({
        where: {
          Date: date,
        },
        select: {
          id: true,
        },
      });

      for (let i = 0; i <= cartItems.length; i++) {
        const productId = cartItems[i]?.id as number;
        const quantity = cartItems[i]?.quantity as number;
        await ctx.prisma.orderedProducts.create({
          data: {
            productId: productId,
            quantity: quantity,
            Order: {
              connect: {
                id: connectOrder?.id,
              },
            },
          },
        });
      }

      return {
        status: 201,
        message: "Order placed successfully",
      };
    }),
  orders: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.orderedProducts.findMany({
      include: {
        Order: true,
      },
    });
  }),
  product: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findMany({
        where: {
          id: input.id,
        },
      });
    }),
  userOrders: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.orderedProducts.findMany({
        where: {
          Order: {
            userId: input.id,
          },
        },
        include: {
          Order: true,
        },
      });
    }),
  userProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findMany({
        where: {
          id: input.id,
        },
      });
    }),
});
