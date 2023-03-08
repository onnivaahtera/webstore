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
        },
      });
      return order;
    }),
});
