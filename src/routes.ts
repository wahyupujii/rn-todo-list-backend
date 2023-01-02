import { userRoutes } from "./routes/userRoutes"
import { todoRoutes } from "./routes/todoRoutes"

export const Routes = [
    ...userRoutes,
    ...todoRoutes
]