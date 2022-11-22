import { publicProcedure, router } from "../trpc";
import z from 'zod'

export const productRouter = router({
    getProduct: publicProcedure
        .input(
            z.object({
                url: z.string()
            })
        )
        .query(({ input, ctx }) => {
            const q = ctx.prisma.product.findMany({
                where: {
                    name: `${input.url}`
                },
                include: {
                    category: true
                },
            })
            return q
        }),
    allProducts: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.product.findMany({
                include: {
                    category: true
                }
            })
        }),
    category: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.category.findMany()
        }),
    productsInCategory: publicProcedure
        .input(
            z.object({
                category: z.string()
            })
        )
        .query(({ input, ctx }) => {
            return ctx.prisma.product.findMany({
                where: {
                    category: {
                        name: `${input.category}`
                    }
                }
            })
        }),
})