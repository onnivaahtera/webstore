import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./products";

export const appRouter = router({
  product: productRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
