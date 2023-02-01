import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

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
    .input(z.object({}))
    .mutation(({ ctx, input }) => {}),
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
