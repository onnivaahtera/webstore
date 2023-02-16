import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
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
  confirmOrder: protectedProcedure
    .input(order)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        email,
        phone,
        streetAddress,
        streetNumber,
        postalcode,
        city,
        cardNumber,
        cvc,
        expirationDate,
        product,
      } = input;

      await ctx.prisma.order.create({
        data: {
          email,
          user: {
            connect: {
              email,
            },
          },
          phone,
          streetAddress,
          streetNumber,
          postalcode: parseInt(postalcode),
          city,
          cardNumber: parseInt(cardNumber),
          cvc: parseInt(cvc),
          expirationDate,
        },
      });

      await ctx.prisma.orderedProducts.create({});
    }),
});

/*


  const getTotal = () => {
    const item = products.data;
    const sum = item
      .map((a) => a.price * getItemQuantity(a.id))
      .reduce((a, b) => {
        return a + b;
      });
    return sum;
  };

  const getTax = () => {
    return (24 * getTotal()) / (100 + 24);
  };



*/
