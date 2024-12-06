import { authRouter } from './routes/auth'
import { carsRouter } from './routes/cars'
import { helloRouter } from './routes/hello'
import { userRouter } from './routes/user'
import { productRouter } from './routes/product' // adjust the import path as needed
import { router } from './trpc'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  auth: authRouter,
  car: carsRouter,
  product: productRouter, // Register the productRouter under the "product" namespace
})

export type AppRouter = typeof appRouter
