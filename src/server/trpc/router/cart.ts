import z from "zod";
import { protectedProcedure, router } from "../trpc";

export const cartRouter = router({
  addItemToCart: protectedProcedure
    .input(z.object({ id: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.shoppingCart.update({
        where: {
          userId: input.userId,
        },
        data: {
          product: {
            connect: {
              id: input.id,
            },
          },
        },
      });
    }),
});
