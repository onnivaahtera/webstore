import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const cartRouter = router({
  productsInCart: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: input.id },
        select: { id: true, name: true, price: true, image: true },
      });
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
