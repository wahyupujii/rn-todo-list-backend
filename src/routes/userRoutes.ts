import { UserController } from "../controller/UserController"

export const userRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/users/login",
        controller: UserController,
        action: "login"
    },
    {
        method: "post",
        route: "/users/register",
        controller: UserController,
        action: "register"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },
]