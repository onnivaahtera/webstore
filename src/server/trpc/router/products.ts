import { adminProcedure, publicProcedure, router } from "../trpc";
import z from "zod";
import { productSchema } from "../../../types/product";

export const productRouter = router({
  getProduct: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: { name: `${input.url}` },
        include: { category: true },
      });
    }),

  allProducts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({ include: { category: true } });
  }),

  category: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  productsInCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: { category: { name: `${input.category}` } },
      });
    }),

  addProduct: adminProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, price, desc, image, category } = input;

      await ctx.prisma.product.create({
        data: {
          name: name,
          price: price,
          desc: desc,
          image: image,
          category: {
            connect: {
              id: category,
            },
          },
        },
        include: {
          category: true,
        },
      });
      return {
        status: 201,
        message: "Product added",
      };
    }),
  searchProducts: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { name: { contains: input.query } },
      });
    }),
});
