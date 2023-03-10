import { z } from "zod";
import { publicProcedure, router } from "../trpc";
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
        cartItems,
      } = input;
      const sessionId = ctx.session?.user.userId;
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: sessionId,
        },
      });

      const order = await ctx.prisma.order.create({
        data: {
          userId: user?.id!,
          cardNumber,
          cvc,
          expirationDate,
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
        let productId = cartItems[i]?.id!;
        let quantity = cartItems[i]?.quantity!;
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

      return order;
    }),
});
