import { publicProcedure, router } from "../trpc";
import z from 'zod'

export const userRouter = router({
    createUser: publicProcedure
    .input(
        z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            fname: z.string(),
            lname: z.string(),
        })
    )
    .mutation(({ctx, input}) => {
        return ctx.prisma.user.create({
            data: {
                name: `${input.name}`,
                email: '',
                password: '',
                fname: '',
                lname: '',
            }
        })
    })
})