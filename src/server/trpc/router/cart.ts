import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const cartRouter = router({
  productsInCart: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { id: input.id },
      });
    }),
});
