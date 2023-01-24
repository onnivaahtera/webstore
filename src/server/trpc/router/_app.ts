import { router } from "../trpc";
import { authRouter } from "./auth";
import { cartRouter } from "./cart";
import { productRouter } from "./products";
import { userRouter } from "./user";

export const appRouter = router({
  cart: cartRouter,
  product: productRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
