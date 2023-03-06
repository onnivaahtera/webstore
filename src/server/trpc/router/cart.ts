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
          city: !city ? user?.city! : city,
          email: !email ? user?.email! : email,
          fname: !fname ? user?.fname! : fname,
          lname: !lname ? user?.lname! : lname,
          phone: !phone ? user?.phone! : phone,
          postalCode: !postalCode ? user?.postalCode! : postalCode,
          streetAddress: !streetAddress ? user?.streetAddress! : streetAddress,
        },
      });
      return order;
    }),
});
