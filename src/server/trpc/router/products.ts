import { adminProcedure, publicProcedure, router } from "../trpc";
import z from "zod";
import { productSchema } from "../../../types/product";

export const productRouter = router({
  getProduct: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: { url: `${input.url}` },
        include: { category: true },
      });
    }),
  allProducts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({ include: { category: true } });
  }),
  productsInCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: { category: { name: `${input.category}` } },
      });
    }),
  newProduct: adminProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, url, price, desc, image, category } = input;
      await ctx.prisma.product.create({
        data: {
          name,
          url,
          price,
          desc,
          image,
          category: {
            connect: {
              name: category,
            },
          },
        },
      });
    }),
  searchProducts: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { name: { contains: input.query } },
        select: { id: true, name: true, url: true, price: true, image: true },
      });
    }),
});
